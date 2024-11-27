from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Plan
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
            with open("logs/telegrambot.log", "r") as log_file:
                logs = log_file.readlines()
                logs = logs[-6:]
        except Exception as e:
            return Response({"error": f"Error reading log file: {str(e)}"}, status=500)

        return Response({"logs": logs}, status=200)
