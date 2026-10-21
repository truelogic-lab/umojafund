from django.db import models
import uuid


class Contribution(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        FAILED = 'FAILED', 'Failed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    member = models.ForeignKey('accounts.User', on_delete=models.PROTECT)
    payment_attempt = models.OneToOneField('payments.PaymentAttempt', on_delete=models.PROTECT, related_name='contribution')
    journal_entry = models.OneToOneField('ledger.JournalEntry', on_delete=models.PROTECT, null=True, blank=True)
    amount_minor = models.BigIntegerField()
    period_id = models.CharField(max_length=32, db_index=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.PENDING)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
