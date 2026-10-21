import hashlib
import secrets
import logging
from datetime import timedelta
from django.utils import timezone
from django.conf import settings

log = logging.getLogger(__name__)

OTP_LENGTH = 6
OTP_TTL_MINUTES = 10
MAX_ATTEMPTS = 5


def _hash_otp(otp: str, msisdn: str) -> str:
    return hashlib.sha256(f'{otp}:{msisdn}'.encode()).hexdigest()


def generate_otp() -> str:
    return ''.join(str(secrets.randbelow(10)) for _ in range(OTP_LENGTH))


def request_verification_otp(profile):
    """
    Generate a 6-digit OTP and store its hash on the profile.
    In mock mode, log the OTP to the console so we can enter it.
    In real mode, this is where you would call the Safaricom SMS API.
    """
    if profile.msisdn_verified:
        return {'status': 'already_verified'}

    otp = generate_otp()
    profile.verification_otp_hash = _hash_otp(otp, profile.msisdn)
    profile.verification_otp_expires_at = timezone.now() + timedelta(minutes=OTP_TTL_MINUTES)
    profile.verification_attempts = 0
    profile.save(update_fields=[
        'verification_otp_hash',
        'verification_otp_expires_at',
        'verification_attempts',
    ])

    mode = getattr(settings, 'MPESA_MODE', 'mock')
    if mode == 'mock':
        log.warning(
            '\n\n══════════════════════════════════════════════════════\n'
            f'   OTP for {profile.user.email} → {profile.msisdn}\n'
            f'   CODE: {otp}\n'
            f'   Expires in {OTP_TTL_MINUTES} minutes\n'
            '══════════════════════════════════════════════════════\n'
        )
        print(f'\n╔════════════════════════════════════════════════════╗')
        print(f'║  OTP for {profile.msisdn:<12}                  ║')
        print(f'║  CODE: {otp}                                  ║')
        print(f'║  Expires in {OTP_TTL_MINUTES} minutes                          ║')
        print(f'╚════════════════════════════════════════════════════╝\n')

    return {
        'status': 'sent',
        'expires_in': OTP_TTL_MINUTES * 60,
    }


def verify_otp(profile, otp: str):
    """
    Verify the OTP against the stored hash.
    Returns (success: bool, message: str).
    """
    if profile.msisdn_verified:
        return True, 'Already verified.'

    if not profile.verification_otp_hash or not profile.verification_otp_expires_at:
        return False, 'No verification in progress. Request a new code.'

    if timezone.now() > profile.verification_otp_expires_at:
        return False, 'Verification code has expired. Request a new one.'

    if profile.verification_attempts >= MAX_ATTEMPTS:
        return False, 'Too many incorrect attempts. Request a new code.'

    expected = _hash_otp(otp.strip(), profile.msisdn)
    if not secrets.compare_digest(expected, profile.verification_otp_hash):
        profile.verification_attempts += 1
        profile.save(update_fields=['verification_attempts'])
        remaining = MAX_ATTEMPTS - profile.verification_attempts
        return False, f'Incorrect code. {remaining} attempts remaining.'

    profile.msisdn_verified = True
    profile.status = profile.Status.VERIFIED
    profile.verification_otp_hash = ''
    profile.verification_otp_expires_at = None
    profile.verification_attempts = 0
    profile.save(update_fields=[
        'msisdn_verified',
        'status',
        'verification_otp_hash',
        'verification_otp_expires_at',
        'verification_attempts',
    ])

    return True, 'M-Pesa number verified successfully.'
