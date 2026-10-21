from django.db import transaction
from django.db.models import Sum
from .models import FundPeriod, MemberEntitlement, Payout, PayoutApproval
from apps.contributions.models import Contribution


class PayoutError(Exception):
    pass


def compute_entitlements(*, period_id):
    period = FundPeriod.objects.get(id=period_id)

    if period.status != FundPeriod.Status.CLOSED:
        raise PayoutError('Period must be closed before computing entitlements.')

    eligible = list(
        Contribution.objects
        .filter(period_id=period.code, status=Contribution.Status.CONFIRMED)
        .values('member_id')
        .annotate(total_minor=Sum('amount_minor'))
    )

    total_minor = sum(e['total_minor'] for e in eligible)
    if total_minor <= 0:
        raise PayoutError('No confirmed contributions in this period.')

    # Deterministic order: largest contributor first, UUID as tie-breaker
    eligible.sort(key=lambda e: (-e['total_minor'], str(e['member_id'])))

    distribution = period.distribution_amount_minor
    computed = []
    running = 0

    for row in eligible:
        share = (row['total_minor'] * distribution) // total_minor
        computed.append({
            'member_id': row['member_id'],
            'eligible_contribution_minor': row['total_minor'],
            'computed_entitlement_minor': share,
        })
        running += share

    remainder = distribution - running
    if remainder > 0:
        for row in computed[:remainder]:
            row['computed_entitlement_minor'] += 1

    with transaction.atomic():
        MemberEntitlement.objects.filter(period=period).delete()
        MemberEntitlement.objects.bulk_create([
            MemberEntitlement(
                period=period,
                member_id=row['member_id'],
                eligible_contribution_minor=row['eligible_contribution_minor'],
                computed_entitlement_minor=row['computed_entitlement_minor'],
                rounding_adjustment_minor=0,
            ) for row in computed
        ])

        Payout.objects.filter(period=period, status=Payout.Status.PROPOSED).delete()
        Payout.objects.bulk_create([
            Payout(
                period=period,
                member_id=row['member_id'],
                amount_minor=row['computed_entitlement_minor'],
                status=Payout.Status.PROPOSED,
            ) for row in computed
        ])

    return computed


@transaction.atomic
def approve_period(*, period_id, prepared_by, approved_by):
    if prepared_by == approved_by:
        raise PayoutError('Maker and checker must be different users.')

    period = FundPeriod.objects.select_for_update().get(id=period_id)
    proposed = Payout.objects.filter(period=period, status=Payout.Status.PROPOSED)
    total = proposed.aggregate(t=Sum('amount_minor'))['t'] or 0

    if total != period.distribution_amount_minor:
        raise PayoutError(
            f'Total proposed {total} != distribution {period.distribution_amount_minor}.'
        )

    PayoutApproval.objects.create(
        period=period,
        prepared_by_id=prepared_by,
        approved_by_id=approved_by,
        total_approved_minor=total,
    )

    proposed.update(status=Payout.Status.APPROVED)
    return period
