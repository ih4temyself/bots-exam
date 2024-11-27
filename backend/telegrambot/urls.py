from django.urls import include, path
from rest_framework import routers

from telegrambot.views import ScheduledMessageViewSet, TelegramBotViewSet

router = routers.DefaultRouter()
router.register(r"", TelegramBotViewSet, basename="bots")
router.register(
    r"scheduled-messages", ScheduledMessageViewSet, basename="scheduled-messages"
)

urlpatterns = [
    path("", include(router.urls)),
]
