from django.db import models
import uuid


class PaymentAttempt(models.Model):
    class Status(models.TextChoices):
        INITIATED = 'INITIATED', 'Initiated'
        PENDING = 'PENDING', 'Pending'
        SUCCESS = 'SUCCESS', 'Success'
        FAILED = 'FAILED', 'Failed'
        TIMEOUT = 'TIMEOUT', 'Timeout'
        REVERSED = 'REVERSED', 'Reversed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    member = models.ForeignKey('accounts.User', on_delete=models.PROTECT)
    internal_ref = models.CharField(max_length=64, unique=True)
    amount_minor = models.BigIntegerField()
    msisdn = models.CharField(max_length=20)
    purpose = models.CharField(max_length=32, default='CONTRIBUTION')
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.INITIATED)
    provider_request_id = models.CharField(max_length=128, blank=True)
    checkout_request_id = models.CharField(max_length=128, blank=True, db_index=True)
    merchant_request_id = models.CharField(max_length=128, blank=True)
    result_code = models.CharField(max_length=16, blank=True)
    result_desc = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payment_attempts'


class ProviderEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.CharField(max_length=32, default='MPESA')
    event_type = models.CharField(max_length=64)
    external_id = models.CharField(max_length=128, db_index=True)
    payload = models.JSONField()
    signature_valid = models.BooleanField(default=False)
    processed_at = models.DateTimeField(null=True, blank=True)
    processing_error = models.TextField(blank=True)
    received_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'provider_events'
        constraints = [
            models.UniqueConstraint(fields=['provider', 'external_id', 'event_type'], name='uniq_provider_event'),
        ]
