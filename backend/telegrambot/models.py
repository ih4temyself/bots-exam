import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone


class TelegramBot(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="telegram_bots", on_delete=models.CASCADE
    )
    token = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    config = models.JSONField(default=dict, blank=True)
    admin_id = models.BigIntegerField()

    @property
    def bot_type(self):
        return self.config.get("bot_type", "1")

    def __str__(self):
        return f"{self.name} ({self.user.username})"


class MessageModel(models.Model):
    type = models.CharField(max_length=50)
    message = models.TextField(max_length=1000, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.type}: {self.message}"


class ScheduledMessage(models.Model):
    bot = models.ForeignKey(
        TelegramBot, related_name="scheduled_messages", on_delete=models.CASCADE
    )
    message_text = models.TextField()
    send_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ScheduledMessage for {self.bot.name} at {self.send_at}"
