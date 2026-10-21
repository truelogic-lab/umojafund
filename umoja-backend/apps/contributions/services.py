from django.db import transaction
from django.utils import timezone
from apps.ledger.models import LedgerAccount
from apps.ledger.services import post_journal_entry
from apps.payments.models import PaymentAttempt, ProviderEvent
from .models import Contribution
import logging

log = logging.getLogger('payments')


@transaction.atomic
def confirm_contribution(*, payment_attempt_id, provider_event_id, period_id):
    attempt = PaymentAttempt.objects.select_for_update().get(id=payment_attempt_id)

    event = ProviderEvent.objects.select_for_update().get(id=provider_event_id)
    if event.processed_at:
        return Contribution.objects.filter(payment_attempt=attempt).first()

    existing = Contribution.objects.filter(payment_attempt=attempt).first()
    if existing and existing.status == Contribution.Status.CONFIRMED:
        return existing

    cash_account = LedgerAccount.objects.get(code='1000')
    liability_code = f"2000{str(attempt.member_id).replace('-', '')[:8]}"
    liability_account, _ = LedgerAccount.objects.get_or_create(
        code=liability_code,
        defaults={
            'name': f'Member Liability {attempt.member_id}',
            'account_type': LedgerAccount.AccountType.LIABILITY,
        },
    )

    entry = post_journal_entry(
        reference=f'CONTRIB-{attempt.internal_ref}',
        description='M-Pesa contribution confirmed',
        idempotency_key=f'contrib-{attempt.internal_ref}',
        lines=[
            {'account_id': cash_account.id, 'debit_minor': attempt.amount_minor, 'credit_minor': 0},
            {'account_id': liability_account.id, 'debit_minor': 0, 'credit_minor': attempt.amount_minor},
        ],
    )

    contribution, _ = Contribution.objects.update_or_create(
        payment_attempt=attempt,
        defaults={
            'member_id': attempt.member_id,
            'amount_minor': attempt.amount_minor,
            'period_id': period_id,
            'status': Contribution.Status.CONFIRMED,
            'journal_entry': entry,
            'confirmed_at': timezone.now(),
        },
    )

    attempt.status = PaymentAttempt.Status.SUCCESS
    attempt.save(update_fields=['status', 'updated_at'])

    event.processed_at = timezone.now()
    event.save(update_fields=['processed_at'])

    from apps.notifications.services import notify_contribution_confirmed
    notify_contribution_confirmed(
        user_id=attempt.member_id,
        amount_minor=attempt.amount_minor,
        period_id=period_id,
    )

    log.info('contribution_confirmed', extra={
        'contribution_id': str(contribution.id),
        'entry_id': str(entry.id),
    })
    return contribution
