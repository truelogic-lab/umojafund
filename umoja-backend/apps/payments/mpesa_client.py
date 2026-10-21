import base64
import requests
from datetime import datetime
from django.conf import settings


class MpesaError(Exception):
    pass


def _base_url():
    if settings.MPESA_ENV == 'production':
        return 'https://api.safaricom.co.ke'
    return 'https://sandbox.safaricom.co.ke'


def _access_token():
    url = f'{_base_url()}/oauth/v1/generate?grant_type=client_credentials'
    creds = f'{settings.MPESA_CONSUMER_KEY}:{settings.MPESA_CONSUMER_SECRET}'
    encoded = base64.b64encode(creds.encode()).decode()
    r = requests.get(url, headers={'Authorization': f'Basic {encoded}'}, timeout=15)
    if r.status_code != 200:
        raise MpesaError(f'Token request failed: {r.status_code} {r.text}')
    return r.json()['access_token']


def _password(shortcode, passkey, timestamp):
    raw = f'{shortcode}{passkey}{timestamp}'.encode()
    return base64.b64encode(raw).decode()


def stk_push(*, phone, amount_kes, internal_ref, description):
    token = _access_token()
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    payload = {
        'BusinessShortCode': settings.MPESA_SHORTCODE,
        'Password': _password(settings.MPESA_SHORTCODE, settings.MPESA_PASSKEY, timestamp),
        'Timestamp': timestamp,
        'TransactionType': 'CustomerPayBillOnline',
        'Amount': int(amount_kes),
        'PartyA': phone,
        'PartyB': settings.MPESA_SHORTCODE,
        'PhoneNumber': phone,
        'CallBackURL': settings.MPESA_CALLBACK_URL,
        'AccountReference': internal_ref[:12],
        'TransactionDesc': description[:13],
    }
    r = requests.post(
        f'{_base_url()}/mpesa/stkpush/v1/processrequest',
        json=payload,
        headers={'Authorization': f'Bearer {token}'},
        timeout=20,
    )
    if r.status_code != 200:
        raise MpesaError(f'STK push failed: {r.status_code} {r.text}')
    data = r.json()
    if data.get('ResponseCode') != '0':
        raise MpesaError(f'STK rejected: {data.get("ResponseDescription")}')
    return {
        'merchant_request_id': data['MerchantRequestID'],
        'checkout_request_id': data['CheckoutRequestID'],
        'customer_message': data.get('CustomerMessage', ''),
    }


def query_status(checkout_request_id):
    token = _access_token()
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    payload = {
        'BusinessShortCode': settings.MPESA_SHORTCODE,
        'Password': _password(settings.MPESA_SHORTCODE, settings.MPESA_PASSKEY, timestamp),
        'Timestamp': timestamp,
        'CheckoutRequestID': checkout_request_id,
    }
    r = requests.post(
        f'{_base_url()}/mpesa/stkpushquery/v1/query',
        json=payload,
        headers={'Authorization': f'Bearer {token}'},
        timeout=20,
    )
    if r.status_code != 200:
        raise MpesaError(f'Status query failed: {r.status_code} {r.text}')
    return r.json()
