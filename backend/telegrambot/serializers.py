from rest_framework import serializers
from .models import TelegramBot

class TelegramBotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramBot
        fields = ['id', 'user', 'name','token',
                  'description', 'created_at',
                  'is_active', 'config']

    def create(self, validated_data):
        # Create a new TelegramBot instance
        telegram_bot = TelegramBot(
            user=self.context['request'].user,  # Set the user from the request context
            name=validated_data["name"],
            token=validated_data["token"],
            description=validated_data.get("description"),
            is_active=validated_data.get("is_active", True),  # Default to True if not provided
            config=validated_data.get("config", {})
        )
        telegram_bot.save()  # Save the instance to the database
        return telegram_bot