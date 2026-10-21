import json
import logging
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.db import transaction

from apps.payments.models import PaymentAttempt, ProviderEvent
from apps.contributions.services import confirm_contribution

log = logging.getLogger('payments')


@csrf_exempt
@require_POST
def mpesa_callback(request):
    try:
        payload = json.loads(request.body.decode('utf-8'))
    except (ValueError, UnicodeDecodeError):
        log.warning('mpesa_callback_invalid_body')
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Invalid JSON'}, status=400)

    body = payload.get('Body', {})
    stk = body.get('stkCallback', {})
    checkout_id = stk.get('CheckoutRequestID')
    result_code = str(stk.get('ResultCode', ''))
    result_desc = stk.get('ResultDesc', '')

    if not checkout_id:
        log.warning('mpesa_callback_missing_checkout')
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Missing CheckoutRequestID'}, status=400)

    external_id = f"{checkout_id}:{result_code}"

    event, created = ProviderEvent.objects.get_or_create(
        provider='MPESA',
        external_id=external_id,
        event_type='STK_CALLBACK',
        defaults={
            'payload': payload,
            'signature_valid': True,
        },
    )

    if not created:
        log.info('mpesa_callback_duplicate', extra={'external_id': external_id})
        return JsonResponse({'ResultCode': 0, 'ResultDesc': 'Already processed'})

    attempt = PaymentAttempt.objects.filter(checkout_request_id=checkout_id).first()
    if not attempt:
        event.processing_error = 'No matching PaymentAttempt'
        event.save(update_fields=['processing_error'])
        log.warning('mpesa_callback_unmatched', extra={'checkout_id': checkout_id})
        return JsonResponse({'ResultCode': 0, 'ResultDesc': 'Received but unmatched'})

    if result_code != '0':
        attempt.status = PaymentAttempt.Status.FAILED
        attempt.result_code = result_code
        attempt.result_desc = result_desc[:255]
        attempt.save(update_fields=['status', 'result_code', 'result_desc', 'updated_at'])
        event.processed_at = event.received_at
        event.save(update_fields=['processed_at'])
        log.info('mpesa_payment_failed', extra={'checkout_id': checkout_id, 'code': result_code})
        return JsonResponse({'ResultCode': 0, 'ResultDesc': 'Recorded as failed'})

    try:
        confirm_contribution(
            payment_attempt_id=attempt.id,
            provider_event_id=event.id,
            period_id=_current_period_code(),
        )
    except Exception as e:
        event.processing_error = str(e)[:500]
        event.save(update_fields=['processing_error'])
        log.exception('mpesa_callback_confirm_failed', extra={'checkout_id': checkout_id})
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Ledger error'}, status=500)

    log.info('mpesa_payment_confirmed', extra={'checkout_id': checkout_id, 'amount': attempt.amount_minor})
    return JsonResponse({'ResultCode': 0, 'ResultDesc': 'Processed'})


def _current_period_code():
    from apps.payouts.models import FundPeriod
    period = FundPeriod.objects.filter(status=FundPeriod.Status.OPEN).order_by('-starts_at').first()
    if period:
        return period.code
    return 'DEFAULT'
