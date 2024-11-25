from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import TelegramBot


from .serializers import TelegramBotSerializer


class TelegramBotViewSet(viewsets.ModelViewSet):
    serializer_class = TelegramBotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TelegramBot.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
