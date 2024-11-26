from rest_framework import serializers

from .models import TelegramBot


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
        ]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("token", None)
        return super().update(instance, validated_data)
