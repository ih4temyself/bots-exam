import logging

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import TelegramBot
from .serializers import TelegramBotSerializer

logger = logging.getLogger("telegrambot")


class TelegramBotViewSet(viewsets.ModelViewSet):
    serializer_class = TelegramBotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TelegramBot.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"], url_path="activate")
    def activate_bot(self, request, pk=None):
        bot = self.get_object()
        if bot.is_active:
            return Response(
                {"detail": "Bot is already active."}, status=status.HTTP_400_BAD_REQUEST
            )

        bot.is_active = True
        bot.save()
        return Response(
            {"detail": "Bot activated successfully."}, status=status.HTTP_200_OK
        )

    @action(detail=True, methods=["post"], url_path="deactivate")
    def deactivate_bot(self, request, pk=None):
        bot = self.get_object()
        if not bot.is_active:
            return Response(
                {"detail": "Bot is already inactive."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bot.is_active = False
        bot.save()
        return Response(
            {"detail": "Bot deactivated successfully."}, status=status.HTTP_200_OK
        )
