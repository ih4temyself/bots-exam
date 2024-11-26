from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class MainPageViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        return Response({"message": "Welcome to the main page!"})


class PlansView(APIView):
    def get(self, request):
        plans = [
            {
                "id": 1,
                "name": "Basic Plan",
                "price": '$10',
                "bots": '1 bot',
                "memory": '512 MB',
                "messages": '100 msgs/month',
                "features": [
                    "Limited bot customization\n",
                    "Basic analytics\n",
                    "Limited access to bot templates\n"
                ],
                "selected": "no"
            },
            {
                "id": 2,
                "name": "Standard Plan",
                "price": '$25',
                "bots": '5 bots',
                "memory": '2 GB',
                "messages": '1,000 msgs/month',
                "features": [
                    "Full bot customization\n",
                    "Advanced analytics\n",
                    "Access to premium templates\n"
                ],
                "selected": 'no'
            },
            {
                "id": 3,
                "name": "Pro Plan",
                "price": '$50',
                "bots": '15 bots',
                "memory": '5 GB',
                "messages": '5,000 msgs/month',
                "features": [
                    "Custom API integrations\n",
                    "Priority support\n",
                    "Advanced message tracking\n"
                ],
                "selected": 'yes'
            },
            {
                "id": 4,
                "name": "Enterprise Plan",
                "price": '$150',
                "bots": '50 bots',
                "memory": '20 GB',
                "messages": '20,000 msgs/month',
                "features": [
                    "Unlimited bots and memory\n",
                    "Dedicated account manager\n",
                    "Full analytics with AI insights\n"
                ],
                "selected": 'dev'
            }
        ]
        return Response({"bots": plans}, status=status.HTTP_200_OK)
