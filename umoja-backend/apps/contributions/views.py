from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

from .models import Contribution
from apps.payments.orchestrator import (
    initiate_contribution,
    simulate_callback_for,
    ContributionError,
)


class ContributionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Contribution.objects.filter(member=request.user).order_by('-created_at')[:100]
        return Response([
            {
                'id': str(c.id),
                'amount_minor': c.amount_minor,
                'status': c.status,
                'period_id': c.period_id,
                'confirmed_at': c.confirmed_at,
                'created_at': c.created_at,
            } for c in qs
        ])


class ContributionInitiateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Only 'amount_minor' is read. Any msisdn in the body is ignored.
        try:
            amount_minor = int(request.data.get('amount_minor', 0))
        except (TypeError, ValueError):
            return Response(
                {'detail': 'Invalid amount.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            attempt, result = initiate_contribution(user=request.user, amount_minor=amount_minor)
        except ContributionError as e:
            return Response(
                {'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if getattr(settings, 'MPESA_MODE', 'mock') == 'mock':
            simulate_callback_for(attempt, succeed=True)

        return Response({
            'internal_ref': attempt.internal_ref,
            'checkout_request_id': attempt.checkout_request_id,
            'msisdn': attempt.msisdn,  # echo back the DB value
            'customer_message': result.get('customer_message', ''),
            'status': 'PENDING' if getattr(settings, 'MPESA_MODE', 'mock') == 'real' else 'CONFIRMED',
        }, status=status.HTTP_201_CREATED)
