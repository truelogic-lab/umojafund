import logging
from datetime import timedelta
from django.utils import timezone
from django.db import transaction

from apps.payments.models import PaymentAttempt, ProviderEvent
from apps.payments.mpesa_client import query_status, MpesaError
from apps.contributions.services import confirm_contribution

log = logging.getLogger('payments')


def reconcile_pending_attempts():
    cutoff = timezone.now() - timedelta(minutes=2)
    pending = PaymentAttempt.objects.filter(
        status__in=[PaymentAttempt.Status.INITIATED, PaymentAttempt.Status.PENDING],
        updated_at__lt=cutoff,
    ).exclude(checkout_request_id='')

    refreshed = 0
    for attempt in pending:
        try:
            result = query_status(attempt.checkout_request_id)
        except MpesaError as e:
            log.warning('reconcile_query_failed', extra={'attempt_id': str(attempt.id), 'error': str(e)})
            continue

        result_code = str(result.get('ResultCode', ''))
        if result_code == '0' and result.get('ResultDesc', '').lower().startswith('the service request is processed successfully'):
            _reconcile_success(attempt, result)
        elif result_code in ('1032', '1037', '1'):
            with transaction.atomic():
                attempt.status = PaymentAttempt.Status.TIMEOUT
                attempt.result_code = result_code
                attempt.result_desc = result.get('ResultDesc', '')[:255]
                attempt.save(update_fields=['status', 'result_code', 'result_desc', 'updated_at'])
        refreshed += 1

    log.info('reconcile_run_complete', extra={'refreshed': refreshed})
    return refreshed


def _reconcile_success(attempt, result):
    external_id = f"{attempt.checkout_request_id}:0"
    event, created = ProviderEvent.objects.get_or_create(
        provider='MPESA',
        external_id=external_id,
        event_type='RECONCILE_QUERY',
        defaults={'payload': result, 'signature_valid': True},
    )
    if not created and event.processed_at:
        return
    confirm_contribution(
        payment_attempt_id=attempt.id,
        provider_event_id=event.id,
        period_id='DEFAULT',
    )
