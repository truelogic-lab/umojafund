from django.core.management.base import BaseCommand
from apps.ledger.models import LedgerAccount


class Command(BaseCommand):
    help = 'Seed canonical ledger accounts.'

    def handle(self, *args, **options):
        seed = [
            ('1000', 'M-Pesa Cash', LedgerAccount.AccountType.ASSET),
            ('1010', 'Bank Cash', LedgerAccount.AccountType.ASSET),
            ('2000', 'Member Liability', LedgerAccount.AccountType.LIABILITY),
            ('4000', 'Contribution Revenue', LedgerAccount.AccountType.REVENUE),
            ('5000', 'Payout Expense', LedgerAccount.AccountType.EXPENSE),
        ]
        for code, name, account_type in seed:
            LedgerAccount.objects.get_or_create(
                code=code,
                defaults={'name': name, 'account_type': account_type},
            )
        self.stdout.write(self.style.SUCCESS('Ledger accounts seeded.'))
