from django.http import JsonResponse
from django.db import connection


def health(request):
    try:
        connection.ensure_connection()
        return JsonResponse({'status': 'ok', 'db': 'ok'})
    except Exception:
        return JsonResponse({'status': 'degraded', 'db': 'error'}, status=503)
