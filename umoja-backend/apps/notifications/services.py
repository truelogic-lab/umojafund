from .models import Notification


def notify_contribution_confirmed(user_id, amount_minor, period_id):
    amount_kes = amount_minor / 100
    Notification.objects.create(
        user_id=user_id,
        type=Notification.Type.TRANSACTION,
        title='Contribution received',
        message=f'Your contribution of KSh {amount_kes:,.2f} for period {period_id} was confirmed.',
        link='/dashboard/contributions',
    )


def notify_payout_paid(user_id, amount_minor, period_code):
    amount_kes = amount_minor / 100
    Notification.objects.create(
        user_id=user_id,
        type=Notification.Type.PAYOUT,
        title='Payout processed',
        message=f'Your payout of KSh {amount_kes:,.2f} for period {period_code} was sent to your M-Pesa.',
        link='/dashboard/payouts',
    )


def notify_welcome(user_id):
    Notification.objects.create(
        user_id=user_id,
        type=Notification.Type.SYSTEM,
        title='Welcome to Umoja Fund',
        message='Your account is ready. Start by contributing KSh 2.00 today.',
        link='/dashboard/contribute',
    )
