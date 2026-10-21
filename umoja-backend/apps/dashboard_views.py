from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum
from apps.contributions.models import Contribution
from apps.payouts.models import Payout


class DashboardSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        confirmed = (
            Contribution.objects
            .filter(member=request.user, status=Contribution.Status.CONFIRMED)
            .aggregate(t=Sum('amount_minor'))['t'] or 0
        )
        paid_out = (
            Payout.objects
            .filter(member=request.user, status=Payout.Status.PAID)
            .aggregate(t=Sum('amount_minor'))['t'] or 0
        )
        pending = (
            Payout.objects
            .filter(member=request.user, status__in=[Payout.Status.PROPOSED, Payout.Status.APPROVED, Payout.Status.PROCESSING])
            .aggregate(t=Sum('amount_minor'))['t'] or 0
        )
        return Response({
            'balances': {
                'total_contributions_minor': confirmed,
                'paid_out_minor': paid_out,
                'pending_payout_minor': pending,
                'chama_share_minor': 0,
            }
        })
