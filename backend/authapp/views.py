import google.auth
from google.auth.transport.requests import Request
from google.oauth2 import id_token
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer
from .models import Profile


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = self.get_serializer().Meta.model.objects.get(username=response.data["username"])
        Profile.objects.get_or_create(user=user)
        response.data["profile"] = {
            "id": user.profile.id,
            "created_at": user.date_joined,
        }
        return response


class MyInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not hasattr(user, "profile"):
            Profile.objects.create(user=user, balance=0.00)
        profile = user.profile

        data = {
            "name": f"{user.first_name} {user.last_name}",
            "email": user.email,
            "created_at": user.date_joined,
            "balance": profile.balance,
        }
        return Response(data)


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')

        try:
            idinfo = id_token.verify_oauth2_token(token, Request(), settings.GOOGLE_CLIENT_ID)

            try:
                user = get_user_model().objects.get(email=idinfo['email'])
            except get_user_model().DoesNotExist:
                user = get_user_model().objects.create_user(
                    username=idinfo['email'],
                    email=idinfo['email'],
                    first_name=idinfo.get('given_name', ''),
                    last_name=idinfo.get('family_name', '')
                )

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({'access_token': access_token})

        except ValueError as e:
            return Response({'error': 'Invalid token'}, status=400)