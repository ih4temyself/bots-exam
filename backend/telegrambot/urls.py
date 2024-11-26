from django.urls import include, path
from rest_framework import routers

from telegrambot.views import TelegramBotViewSet

router = routers.DefaultRouter()
router.register(r"", TelegramBotViewSet, basename="bots")

urlpatterns = [
    path("", include(router.urls)),
]
