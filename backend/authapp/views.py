from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

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

