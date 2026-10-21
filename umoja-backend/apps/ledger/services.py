from django.db import transaction
from django.db.models import Sum
from django.utils import timezone
from .models import LedgerAccount, JournalEntry, JournalLine


class LedgerError(Exception):
    pass


def _validate_lines(lines):
    if not lines:
        raise LedgerError('Journal entry requires at least two lines.')
    total_debit = 0
    total_credit = 0
    for line in lines:
        debit = int(line.get('debit_minor', 0))
        credit = int(line.get('credit_minor', 0))
        if debit < 0 or credit < 0:
            raise LedgerError('Line amounts must be non-negative integers.')
        if debit > 0 and credit > 0:
            raise LedgerError('A line cannot be both debit and credit.')
        if debit == 0 and credit == 0:
            raise LedgerError('Line amount must be non-zero.')
        total_debit += debit
        total_credit += credit
    if total_debit != total_credit:
        raise LedgerError(f'Unbalanced entry. Debit={total_debit}, Credit={total_credit}.')
    return total_debit


@transaction.atomic
def post_journal_entry(*, reference, description, lines, idempotency_key=None):
    if idempotency_key:
        existing = JournalEntry.objects.filter(idempotency_key=idempotency_key).first()
        if existing:
            if existing.state == JournalEntry.State.POSTED:
                return existing
            raise LedgerError('Idempotency key exists but entry not yet posted.')

    if JournalEntry.objects.filter(reference=reference).exists():
        raise LedgerError(f'Reference {reference} already exists.')

    _validate_lines(lines)

    account_ids = [line['account_id'] for line in lines]
    accounts = {a.id: a for a in LedgerAccount.objects.filter(id__in=account_ids, is_active=True)}
    if len(accounts) != len(set(account_ids)):
        raise LedgerError('One or more accounts are missing or inactive.')

    entry = JournalEntry.objects.create(
        reference=reference,
        description=description,
        state=JournalEntry.State.POSTED,
        idempotency_key=idempotency_key,
        posted_at=timezone.now(),
    )

    JournalLine.objects.bulk_create([
        JournalLine(
            entry=entry,
            account_id=line['account_id'],
            debit_minor=int(line.get('debit_minor', 0)),
            credit_minor=int(line.get('credit_minor', 0)),
        ) for line in lines
    ])

    agg = entry.lines.aggregate(
        td=Sum('debit_minor'),
        tc=Sum('credit_minor'),
    )
    if agg['td'] != agg['tc']:
        raise LedgerError('Post-persist imbalance detected. Manual review required.')

    return entry


@transaction.atomic
def reverse_journal_entry(*, original, reason, reference):
    if original.state != JournalEntry.State.POSTED:
        raise LedgerError('Only posted entries can be reversed.')
    if JournalEntry.objects.filter(reference=reference).exists():
        raise LedgerError(f'Reversal reference {reference} already exists.')

    reversal = JournalEntry.objects.create(
        reference=reference,
        description=f'Reversal of {original.reference}: {reason}',
        state=JournalEntry.State.POSTED,
        posted_at=timezone.now(),
    )

    JournalLine.objects.bulk_create([
        JournalLine(
            entry=reversal,
            account_id=line.account_id,
            debit_minor=line.credit_minor,
            credit_minor=line.debit_minor,
        ) for line in original.lines.all()
    ])

    original.state = JournalEntry.State.REVERSED
    original.reversed_by = reversal
    original.save(update_fields=['state', 'reversed_by'])

    return reversal
