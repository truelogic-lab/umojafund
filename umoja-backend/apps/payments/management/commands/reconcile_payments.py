from django.core.management.base import BaseCommand
from apps.payments.reconciliation import reconcile_pending_attempts


class Command(BaseCommand):
    help = 'Reconcile pending M-Pesa attempts whose callbacks never arrived.'

    def handle(self, *args, **opts):
        count = reconcile_pending_attempts()
        self.stdout.write(self.style.SUCCESS(f'Reconciled {count} attempts.'))
