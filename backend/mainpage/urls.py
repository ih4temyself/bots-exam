from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BotLogsView, MainPageViewSet, PlansView

router = DefaultRouter()
router.register(r"main", MainPageViewSet, basename="main")

urlpatterns = [
    path("", include(router.urls)),
    path("plans/", PlansView.as_view(), name="plans"),
    path("bots/logs/", BotLogsView.as_view(), name="bot-logs"),
]
