from django.apps import AppConfig


class MainpageConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "mainpage"

    def ready(self):
        import telegrambot.handlers
        import telegrambot.signals
