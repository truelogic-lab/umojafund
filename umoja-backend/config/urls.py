from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.accounts.views import (
    MeView,
    RegisterView,
    CheckMsisdnView,
    MyMsisdnView,
    RequestMsisdnVerificationView,
    ConfirmMsisdnVerificationView,
)
from apps.contributions.views import ContributionInitiateView, ContributionListView
from apps.dashboard_views import DashboardSummaryView
from apps.funds.views import ChamaDetailsView
from apps.payments.webhooks import mpesa_callback
from apps.notifications.views import (
    NotificationListView,
    NotificationUnreadCountView,
    NotificationMarkReadView,
    NotificationMarkAllReadView,
    NotificationDeleteView,
)
from apps.health import health

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/v1/health/', health),

    # Auth
    path('api/v1/auth/login/', TokenObtainPairView.as_view()),
    path('api/v1/auth/register/', RegisterView.as_view()),
    path('api/v1/auth/refresh/', TokenRefreshView.as_view()),
    path('api/v1/auth/check-msisdn/', CheckMsisdnView.as_view()),

    # Me
    path('api/v1/me/', MeView.as_view()),
    path('api/v1/me/msisdn/', MyMsisdnView.as_view()),
    path('api/v1/me/msisdn/verify/request/', RequestMsisdnVerificationView.as_view()),
    path('api/v1/me/msisdn/verify/confirm/', ConfirmMsisdnVerificationView.as_view()),

    # Financial
    path('api/v1/dashboard/summary/', DashboardSummaryView.as_view()),
    path('api/v1/chama/', ChamaDetailsView.as_view()),
    path('api/v1/contributions/', ContributionListView.as_view()),
    path('api/v1/contributions/initiate/', ContributionInitiateView.as_view()),

    # Webhooks
    path('api/v1/webhooks/mpesa/', mpesa_callback),

    # Notifications
    path('api/v1/notifications/', NotificationListView.as_view()),
    path('api/v1/notifications/unread/', NotificationUnreadCountView.as_view()),
    path('api/v1/notifications/<uuid:notification_id>/read/', NotificationMarkReadView.as_view()),
    path('api/v1/notifications/mark-all-read/', NotificationMarkAllReadView.as_view()),
    path('api/v1/notifications/<uuid:notification_id>/', NotificationDeleteView.as_view()),
]
