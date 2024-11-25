import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone

# from django_cryptography.fields import encrypt


# class TelegramBot(models.Model):
#     user = models.ForeignKey(
#         settings.AUTH_USER_MODEL, related_name="telegram_bots", on_delete=models.CASCADE
#     )
#     token = encrypt(models.CharField(max_length=255, unique=True))
#     name = models.CharField(max_length=100)
#     description = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(default=timezone.now)
#     is_active = models.BooleanField(default=True)

#     config = models.JSONField(default=dict, blank=True)

#     webhook_secret = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

#     def __str__(self):
#         return f"{self.name} ({self.user.username})"

#     def webhook_url(self):
#         return f"https://yourdomain.com/webhook/{self.webhook_secret}/"
