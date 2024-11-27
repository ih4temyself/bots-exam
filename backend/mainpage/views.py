import os

from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mainpage.models import Plan
from telegrambot.models import TelegramBot

from .serializers import PlanSerializer


class MainPageViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        return Response({"message": "Welcome to the main page!"})


class PlansView(APIView):
    def get(self, request):
        plans = Plan.objects.all()
        serializer = PlanSerializer(plans, many=True)
        return Response({"bots": serializer.data}, status=status.HTTP_200_OK)


class BotLogsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = []
        try:
            user_bots = TelegramBot.objects.filter(user=request.user)
            if not user_bots.exists():
                return Response({"logs": []}, status=status.HTTP_200_OK)

            bot_ids = [str(bot.id) for bot in user_bots]
            bot_names = [bot.name for bot in user_bots]

            log_file_path = "logs/telegrambot.log"

            if not os.path.exists(log_file_path):
                return Response(
                    {"error": "Log file not found."}, status=status.HTTP_404_NOT_FOUND
                )

            with open(log_file_path, "r") as log_file:
                for line in log_file:
                    # Check if the line contains any of the user's bot IDs or names
                    if any(f"bot ID: {bot_id}" in line for bot_id in bot_ids) or any(
                        f"bot: {bot_name}" in line for bot_name in bot_names
                    ):
                        logs.append(line.strip())

            # Limit to the last 10 logs
            logs = logs[-10:]
        except Exception as e:
            return Response(
                {"error": f"Error reading log file: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"logs": logs}, status=status.HTTP_200_OK)
