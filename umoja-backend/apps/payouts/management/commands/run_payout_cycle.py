from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from datetime import timedelta

from apps.accounts.models import User
from apps.payouts.models import FundPeriod
from apps.payouts.services import compute_entitlements, approve_period
from apps.payouts.executor import execute_payout_batch


class Command(BaseCommand):
    help = 'Run a full payout cycle: compute, approve, execute.'

    def add_arguments(self, parser):
        parser.add_argument('--period', required=True, help='Period code, e.g. 2025-10')
        parser.add_argument('--distribution-minor', type=int, required=True)
        parser.add_argument('--prepared-by', required=True, help='Email of preparing admin')
        parser.add_argument('--approved-by', required=True, help='Email of approving admin')

    def handle(self, *args, **opts):
        try:
            prepared = User.objects.get(email=opts['prepared_by'])
        except User.DoesNotExist:
            raise CommandError(f"User not found: {opts['prepared_by']}")

        try:
            approver = User.objects.get(email=opts['approved_by'])
        except User.DoesNotExist:
            raise CommandError(f"User not found: {opts['approved_by']}")

        if prepared.id == approver.id:
            raise CommandError('Maker and checker must be different users.')

        period, _ = FundPeriod.objects.update_or_create(
            code=opts['period'],
            defaults={
                'starts_at': timezone.now() - timedelta(days=30),
                'ends_at': timezone.now(),
                'status': FundPeriod.Status.CLOSED,
                'distribution_amount_minor': opts['distribution_minor'],
                'rule_version': 'v1',
                'rule_snapshot': {'type': 'pro_rata', 'version': 'v1'},
            },
        )

        computed = compute_entitlements(period_id=period.id)
        self.stdout.write(self.style.SUCCESS(f'Computed {len(computed)} entitlements.'))

        approve_period(
            period_id=period.id,
            prepared_by=prepared.id,
            approved_by=approver.id,
        )
        self.stdout.write(self.style.SUCCESS('Approved by second admin.'))

        results = execute_payout_batch(period_id=period.id)
        self.stdout.write(self.style.SUCCESS(f'Execution results: {results}'))
