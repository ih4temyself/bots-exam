from rest_framework import serializers
from .models import TelegramBot

class TelegramBotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramBot
        fields = ['id', 'name', 'token', 'description', 'created_at', 'is_active', 'config']

    def create(self, validated_data):
        # Set the user from the request context
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
