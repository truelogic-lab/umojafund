import logging
from django.db import transaction
from django.db.models import Sum
from django.utils import timezone

from .models import FundPeriod, Payout
from apps.ledger.models import LedgerAccount
from apps.ledger.services import post_journal_entry

log = logging.getLogger('ledger')


class PayoutExecutionError(Exception):
    pass


def _account_balance_minor(account):
    agg = account.journal_lines.aggregate(
        debit=Sum('debit_minor'),
        credit=Sum('credit_minor'),
    )
    return (agg['debit'] or 0) - (agg['credit'] or 0)


@transaction.atomic
def execute_payout_batch(*, period_id):
    period = FundPeriod.objects.select_for_update().get(id=period_id)

    approved = Payout.objects.filter(period=period, status=Payout.Status.APPROVED)
    total = approved.aggregate(t=Sum('amount_minor'))['t'] or 0

    if total == 0:
        raise PayoutExecutionError('No approved payouts to execute.')

    payout_expense = LedgerAccount.objects.get(code='5000')
    cash_account = LedgerAccount.objects.get(code='1000')  # M-Pesa Cash, our real float

    available = _account_balance_minor(cash_account)
    if available < total:
        raise PayoutExecutionError(
            f'Insufficient M-Pesa cash. Need {total}, have {available}.'
        )

    results = {'paid': 0, 'failed': 0, 'unknown': 0}

    for payout in approved.select_for_update():
        try:
            post_journal_entry(
                reference=f'PAYOUT-{payout.id}',
                description=f'Payout for period {period.code}',
                idempotency_key=f'payout-{payout.id}',
                lines=[
                    {'account_id': payout_expense.id, 'debit_minor': payout.amount_minor, 'credit_minor': 0},
                    {'account_id': cash_account.id, 'debit_minor': 0, 'credit_minor': payout.amount_minor},
                ],
            )
            payout.status = Payout.Status.PAID
            payout.executed_at = timezone.now()
            payout.provider_ref = f'SIM-{payout.id.hex[:12].upper()}'
            payout.save(update_fields=['status', 'executed_at', 'provider_ref'])
            from apps.notifications.services import notify_payout_paid
            notify_payout_paid(payout.member_id, payout.amount_minor, period.code)
            results['paid'] += 1

        except Exception:
            log.exception('payout_failed', extra={'payout_id': str(payout.id)})
            payout.status = Payout.Status.UNKNOWN
            payout.save(update_fields=['status'])
            results['unknown'] += 1

    if results['unknown'] == 0:
        period.status = FundPeriod.Status.DISTRIBUTED
        period.distributed_at = timezone.now()
        period.save(update_fields=['status', 'distributed_at'])

    log.info('payout_batch_complete', extra={**results, 'period': period.code})
    return results
