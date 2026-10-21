import logging
import uuid
from datetime import datetime, timezone
from django.conf import settings
from django.db import transaction

from .models import PaymentAttempt, ProviderEvent
from .mpesa_client import stk_push, MpesaError

log = logging.getLogger('payments')


class ContributionError(Exception):
    pass


def _mock_stk_push(*, phone, amount_kes, internal_ref, description):
    checkout_id = f'MOCK-{uuid.uuid4().hex[:16].upper()}'
    merchant_id = f'MERCHANT-{uuid.uuid4().hex[:8].upper()}'
    return {
        'merchant_request_id': merchant_id,
        'checkout_request_id': checkout_id,
        'customer_message': f'Mock request sent to {phone}. Enter PIN on your phone (simulated).',
    }


def initiate_contribution(*, user, amount_minor):
    if amount_minor < 200:
        raise ContributionError('Minimum contribution is KSh 2.00.')

    profile = getattr(user, 'profile', None)
    if not profile:
        raise ContributionError('No member profile found for this account.')

    msisdn = profile.msisdn
    if not msisdn:
        raise ContributionError('No M-Pesa number linked to this account.')

    internal_ref = f'UMJ-{uuid.uuid4().hex[:12].upper()}'

    try:
        with transaction.atomic():
            attempt = PaymentAttempt.objects.create(
                member=user,
                internal_ref=internal_ref,
                amount_minor=amount_minor,
                msisdn=msisdn,
                purpose='CONTRIBUTION',
                status=PaymentAttempt.Status.INITIATED,
            )

            if getattr(settings, 'MPESA_MODE', 'mock') == 'real':
                result = stk_push(
                    phone=msisdn,
                    amount_kes=amount_minor // 100,
                    internal_ref=internal_ref,
                    description='Umoja contribution',
                )
            else:
                result = _mock_stk_push(
                    phone=msisdn,
                    amount_kes=amount_minor // 100,
                    internal_ref=internal_ref,
                    description='Umoja contribution',
                )

            attempt.checkout_request_id = result['checkout_request_id']
            attempt.merchant_request_id = result['merchant_request_id']
            attempt.status = PaymentAttempt.Status.PENDING
            attempt.save(update_fields=[
                'checkout_request_id', 'merchant_request_id', 'status', 'updated_at'
            ])

            return attempt, result

    except MpesaError as e:
        if 'attempt' in locals():
            attempt.status = PaymentAttempt.Status.FAILED
            attempt.result_desc = str(e)[:255]
            attempt.save(update_fields=['status', 'result_desc', 'updated_at'])
        raise ContributionError(str(e))


def simulate_callback_for(attempt, *, succeed=True):
    from apps.contributions.services import confirm_contribution
    from apps.payouts.models import FundPeriod

    period = (
        FundPeriod.objects
        .filter(status=FundPeriod.Status.OPEN)
        .order_by('-starts_at')
        .first()
    )
    period_code = period.code if period else 'DEFAULT'

    result_code = '0' if succeed else '1032'
    result_desc = 'Success' if succeed else 'Cancelled by user'

    event, created = ProviderEvent.objects.get_or_create(
        provider='MPESA',
        external_id=f'{attempt.checkout_request_id}:{result_code}',
        event_type='STK_CALLBACK',
        defaults={
            'payload': {
                'Body': {
                    'stkCallback': {
                        'CheckoutRequestID': attempt.checkout_request_id,
                        'ResultCode': result_code,
                        'ResultDesc': result_desc,
                    }
                }
            },
            'signature_valid': True,
        },
    )

    if not created:
        return attempt

    if not succeed:
        attempt.status = PaymentAttempt.Status.FAILED
        attempt.result_code = result_code
        attempt.result_desc = result_desc
        attempt.save(update_fields=['status', 'result_code', 'result_desc', 'updated_at'])
        event.processed_at = datetime.now(timezone.utc)
        event.save(update_fields=['processed_at'])
        return attempt

    confirm_contribution(
        payment_attempt_id=attempt.id,
        provider_event_id=event.id,
        period_id=period_code,
    )
    return attempt
