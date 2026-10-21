from django.db import models
import uuid


class FundPeriod(models.Model):
    class Status(models.TextChoices):
        OPEN = 'OPEN', 'Open'
        CLOSED = 'CLOSED', 'Closed'
        DISTRIBUTED = 'DISTRIBUTED', 'Distributed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=32, unique=True)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.OPEN)
    distribution_amount_minor = models.BigIntegerField(default=0)
    rule_version = models.CharField(max_length=32, default='v1')
    rule_snapshot = models.JSONField(default=dict)
    closed_at = models.DateTimeField(null=True, blank=True)
    distributed_at = models.DateTimeField(null=True, blank=True)


class MemberEntitlement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    period = models.ForeignKey(FundPeriod, on_delete=models.PROTECT, related_name='entitlements')
    member = models.ForeignKey('accounts.User', on_delete=models.PROTECT)
    eligible_contribution_minor = models.BigIntegerField()
    computed_entitlement_minor = models.BigIntegerField()
    rounding_adjustment_minor = models.BigIntegerField(default=0)
    calculated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'member_entitlements'
        constraints = [
            models.UniqueConstraint(fields=['period', 'member'], name='uniq_entitlement_per_period'),
        ]


class Payout(models.Model):
    class Status(models.TextChoices):
        PROPOSED = 'PROPOSED', 'Proposed'
        APPROVED = 'APPROVED', 'Approved'
        PROCESSING = 'PROCESSING', 'Processing'
        PAID = 'PAID', 'Paid'
        FAILED = 'FAILED', 'Failed'
        UNKNOWN = 'UNKNOWN', 'Unknown'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    period = models.ForeignKey(FundPeriod, on_delete=models.PROTECT, related_name='payouts')
    member = models.ForeignKey('accounts.User', on_delete=models.PROTECT)
    amount_minor = models.BigIntegerField()
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.PROPOSED)
    provider_ref = models.CharField(max_length=128, blank=True)
    approved_by_id = models.UUIDField(null=True, blank=True)
    executed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class PayoutApproval(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    period = models.ForeignKey(FundPeriod, on_delete=models.PROTECT)
    prepared_by_id = models.UUIDField()
    approved_by_id = models.UUIDField()
    approved_at = models.DateTimeField(auto_now_add=True)
    total_approved_minor = models.BigIntegerField()
