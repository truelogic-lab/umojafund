from django.db import models
from django.core.exceptions import ValidationError
import uuid


class LedgerAccount(models.Model):
    class AccountType(models.TextChoices):
        ASSET = 'ASSET', 'Asset'
        LIABILITY = 'LIABILITY', 'Liability'
        EQUITY = 'EQUITY', 'Equity'
        REVENUE = 'REVENUE', 'Revenue'
        EXPENSE = 'EXPENSE', 'Expense'

    code = models.CharField(max_length=32, unique=True)
    name = models.CharField(max_length=128)
    account_type = models.CharField(max_length=16, choices=AccountType.choices)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'ledger_accounts'
        ordering = ['code']

    def __str__(self):
        return f'{self.code} - {self.name}'


class JournalEntry(models.Model):
    class State(models.TextChoices):
        DRAFT = 'DRAFT', 'Draft'
        POSTED = 'POSTED', 'Posted'
        REVERSED = 'REVERSED', 'Reversed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=255)
    state = models.CharField(max_length=16, choices=State.choices, default=State.DRAFT)
    idempotency_key = models.CharField(max_length=128, unique=True, null=True, blank=True)
    posted_at = models.DateTimeField(null=True, blank=True)
    reversed_by = models.OneToOneField(
        'self', null=True, blank=True,
        on_delete=models.PROTECT, related_name='reverses'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'journal_entries'
        ordering = ['-created_at']


class JournalLine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    entry = models.ForeignKey(JournalEntry, on_delete=models.PROTECT, related_name='lines')
    account = models.ForeignKey(LedgerAccount, on_delete=models.PROTECT, related_name='journal_lines')
    debit_minor = models.BigIntegerField(default=0)
    credit_minor = models.BigIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'journal_lines'

    def clean(self):
        if self.debit_minor < 0 or self.credit_minor < 0:
            raise ValidationError('Amounts must be non-negative.')
        if self.debit_minor > 0 and self.credit_minor > 0:
            raise ValidationError('A line cannot be both debit and credit.')
        if self.debit_minor == 0 and self.credit_minor == 0:
            raise ValidationError('A line must have a non-zero amount.')
