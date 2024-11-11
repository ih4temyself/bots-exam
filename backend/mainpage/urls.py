from django.urls import include, path
from rest_framework.routers import DefaultRouter

from mainpage.views import MainPageViewSet

router = DefaultRouter()
router.register(r"main", MainPageViewSet, basename="main")

urlpatterns = [
    path("", include(router.urls)),
]
