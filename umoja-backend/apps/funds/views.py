from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class ChamaDetailsView(APIView):
    """
    Returns the member's chama details.
    For now, most accounts have no chama → returns chama: null.
    When chama membership exists, populate from the DB.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Placeholder: chama membership model doesn't exist yet.
        # When it does, query it here:
        #   membership = ChamaMember.objects.filter(user=request.user).select_related('chama').first()
        return Response({
            'chama': None,
            'members': [],
            'activities': [],
        })
