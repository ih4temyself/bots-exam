from rest_framework import serializers

from telegrambot.models import MessageModel, ScheduledMessage, TelegramBot

# from .bot import function to post message


class TelegramBotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramBot
        fields = [
            "id",
            "name",
            "token",
            "description",
            "created_at",
            "is_active",
            "config",
            "admin_id",
        ]

    def create(self, validated_data):
        # Set the user from the request context
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class MessageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageModel
        fields = ["id", "type", "message", "created_at"]

    # def create(self, validated_data):
    #     function from bot.py to post message


class ScheduledMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledMessage
        fields = ["id", "bot", "message_text", "send_at", "created_at"]

    def create(self, validated_data):
        return super().create(validated_data)
