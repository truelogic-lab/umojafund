from celery import shared_task
import logging

log = logging.getLogger('payments')


@shared_task(bind=True, max_retries=3)
def reconcile_pending_payments(self):
    from apps.payments.reconciliation import reconcile_pending_attempts
    try:
        count = reconcile_pending_attempts()
        return {'reconciled': count}
    except Exception as exc:
        log.exception('reconcile_task_error')
        raise self.retry(exc=exc, countdown=60)
