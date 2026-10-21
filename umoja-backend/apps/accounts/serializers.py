from rest_framework import serializers
from django.db import transaction
from .models import User, MemberProfile
from .validators.kenyan_phone import normalize_kenyan_msisdn


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    full_name = serializers.CharField(max_length=128)
    password = serializers.CharField(write_only=True, min_length=8)
    msisdn = serializers.CharField(max_length=20)

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value.lower()

    def validate_msisdn(self, value):
        try:
            msisdn = normalize_kenyan_msisdn(value)
        except ValueError as e:
            raise serializers.ValidationError(str(e))

        if MemberProfile.objects.filter(msisdn=msisdn).exists():
            raise serializers.ValidationError('This phone number is already registered to another account.')

        return msisdn

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data['full_name'],
        )
        # The FIRST number registered is the primary M-Pesa number.
        MemberProfile.objects.create(
            user=user,
            msisdn=validated_data['msisdn'],
            msisdn_verified=False,
            status=MemberProfile.Status.PENDING,
        )
        from apps.notifications.services import notify_welcome
        notify_welcome(user.id)
        return user
