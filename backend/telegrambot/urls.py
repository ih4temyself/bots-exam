
from django.urls import path, include
from rest_framework import routers

from .views import TelegramBotViewSet

router = routers.DefaultRouter()
router.register(r'', TelegramBotViewSet, basename='bots')

urlpatterns = [
    path('', include(router.urls))
]