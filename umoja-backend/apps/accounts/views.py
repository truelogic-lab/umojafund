from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from .models import MemberProfile
from .validators.kenyan_phone import normalize_kenyan_msisdn


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': str(user.id),
                'email': user.email,
                'full_name': user.full_name,
                'is_staff': user.is_staff,
            },
        }, status=status.HTTP_201_CREATED)


class CheckMsisdnView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        raw = request.data.get('msisdn', '')
        try:
            msisdn = normalize_kenyan_msisdn(raw)
        except ValueError as e:
            return Response({'valid': False, 'reason': str(e)}, status=400)

        exists = MemberProfile.objects.filter(msisdn=msisdn).exists()
        return Response({
            'valid': True,
            'normalized': msisdn,
            'available': not exists,
            'reason': None if not exists else 'This phone number is already registered.',
        })


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = getattr(request.user, 'profile', None)
        return Response({
            'id': str(request.user.id),
            'email': request.user.email,
            'full_name': request.user.full_name,
            'is_staff': request.user.is_staff,
            'msisdn': profile.msisdn if profile else None,
            'msisdn_verified': profile.msisdn_verified if profile else False,
            'status': profile.status if profile else None,
        })


class MyMsisdnView(APIView):
    """
    Returns the member's primary M-Pesa number exactly as it lives in the
    database. The frontend cannot override this — it only displays it.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = getattr(request.user, 'profile', None)
        if not profile or not profile.msisdn:
            return Response({
                'msisdn': None,
                'verified': False,
                'display': None,
                'reason': 'No M-Pesa number linked to this account.',
            })

        msisdn = profile.msisdn
        return Response({
            'msisdn': msisdn,
            'verified': profile.msisdn_verified,
            'display': (
                msisdn[:3] + ' ' + msisdn[3:6] + ' ' + msisdn[6:9] + ' ' + msisdn[9:]
            ),
            'reason': None,
        })


class RequestMsisdnVerificationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from .otp_service import request_verification_otp
        profile = getattr(request.user, 'profile', None)
        if not profile:
            return Response(
                {'detail': 'No member profile found.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        result = request_verification_otp(profile)
        if result['status'] == 'already_verified':
            return Response({'detail': 'Your number is already verified.'}, status=200)
        return Response(result, status=200)


class ConfirmMsisdnVerificationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from .otp_service import verify_otp
        profile = getattr(request.user, 'profile', None)
        if not profile:
            return Response(
                {'detail': 'No member profile found.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp = request.data.get('otp', '').strip()
        if not otp:
            return Response({'detail': 'Verification code required.'}, status=400)

        success, message = verify_otp(profile, otp)
        if success:
            return Response({
                'verified': True,
                'msisdn': profile.msisdn,
                'message': message,
            }, status=200)
        return Response({'verified': False, 'detail': message}, status=400)
