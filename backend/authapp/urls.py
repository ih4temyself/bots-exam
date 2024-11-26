from django.urls import path
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterView, MyInfoView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/myinfo/", MyInfoView.as_view(), name="my-info"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/logout/", TokenBlacklistView.as_view(), name="token_blacklist"),
]
