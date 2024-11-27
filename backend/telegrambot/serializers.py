from rest_framework import serializers
from .models import TelegramBot, MessageModel
# from .bot import function to post message

class TelegramBotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramBot
        fields = ['id', 'name', 'token', 'description', 'created_at', 'is_active', 'config']

    def create(self, validated_data):
        # Set the user from the request context
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class MessageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageModel
        fields = ['id', 'type', 'message', 'created_at']

    # def create(self, validated_data):
    #     function from bot.py to post message