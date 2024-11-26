import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import TelegramBot

logger = logging.getLogger("telegrambot")


@receiver(post_save, sender=TelegramBot)
def log_bot_status_change(sender, instance, created, **kwargs):
    if created:
        logger.info(
            f"Created new bot '{instance.name}' for user '{instance.user.username}'"
        )
    else:
        status = "activated" if instance.is_active else "deactivated"
        logger.info(f"Bot '{instance.name}' has been {status}.")
