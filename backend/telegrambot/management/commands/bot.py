import asyncio
import logging
import threading
import time

from asgiref.sync import sync_to_async  # Import sync_to_async
from django.core.management.base import BaseCommand
from django.db import connection
from django.utils import timezone
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from telegrambot.handlers import type1_handlers, type2_handlers
from telegrambot.models import ScheduledMessage, TelegramBot

logger = logging.getLogger(__name__)


class BotThread(threading.Thread):
    def __init__(self, bot_instance):
        threading.Thread.__init__(self)
        self.bot_instance = bot_instance
        self.loop = None
        self.application = None

    def run(self):
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)
        try:
            asyncio.run_coroutine_threadsafe(self.start_bot(), self.loop)
            self.loop.run_forever()
        except Exception as e:
            logger.error(f"Error running bot {self.bot_instance.name}: {e}")
        finally:
            self.stop_event_loop()

    async def start_bot(self):
        self.application = ApplicationBuilder().token(self.bot_instance.token).build()

        self.application.bot_data["admin_id"] = self.bot_instance.admin_id
        self.application.bot_data["bot_instance"] = self.bot_instance

        bot_type = self.bot_instance.config.get("bot_type", "1")
        if bot_type == "1":
            self.add_type1_handlers()
        elif bot_type == "2":
            self.add_type2_handlers()
            self.application.create_task(self.check_scheduled_messages())
        else:
            logger.error(
                f"Unknown bot type: {bot_type} for bot {self.bot_instance.name}"
            )

        await self.application.initialize()
        await self.application.start()
        await self.application.updater.start_polling()
        await self.application.updater.wait_until_stopped()
        await self.application.stop()
        await self.application.shutdown()

        self.loop.stop()

    def add_type1_handlers(self):
        self.application.add_handler(
            MessageHandler(
                filters.TEXT & ~filters.COMMAND, type1_handlers.message_resender
            )
        )

    def add_type2_handlers(self):
        self.application.add_handler(
            CommandHandler("schedule", type2_handlers.schedule_message)
        )
        self.application.add_handler(
            CommandHandler("time", type2_handlers.current_time)
        )

    async def check_scheduled_messages(self):
        """
        Periodically checks for scheduled messages and sends them if their time has arrived.
        """
        while True:
            now = timezone.now()
            messages = await sync_to_async(list)(
                ScheduledMessage.objects.filter(bot=self.bot_instance, send_at__lte=now)
            )
            for message in messages:
                try:
                    await self.application.bot.send_message(
                        chat_id=self.bot_instance.admin_id,
                        text=message.message_text,
                    )
                    await sync_to_async(message.delete)()
                    logger.info(
                        f"Sent scheduled message for bot {self.bot_instance.name}"
                    )
                except Exception as e:
                    logger.error(
                        f"Failed to send scheduled message for bot {self.bot_instance.name}: {e}"
                    )
            await asyncio.sleep(60)

    def stop(self):
        if self.application and self.loop and self.loop.is_running():
            asyncio.run_coroutine_threadsafe(self.application.stop(), self.loop)

    def stop_event_loop(self):
        if self.loop and not self.loop.is_closed():
            pending = asyncio.all_tasks(self.loop)
            for task in pending:
                task.cancel()
                try:
                    self.loop.run_until_complete(task)
                except asyncio.CancelledError:
                    pass
            self.loop.run_until_complete(self.loop.shutdown_asyncgens())
            self.loop.close()
            self.loop = None


class Command(BaseCommand):
    help = "Run Telegram bots"

    def handle(self, *args, **options):
        logger.info("Starting Telegram bots...")
        self.bot_threads = {}
        self.running = True

        active_bots = TelegramBot.objects.filter(is_active=True)
        for bot in active_bots:
            self.start_bot(bot)

        try:
            while self.running:
                time.sleep(5)

                with connection.cursor():
                    current_active_bots = TelegramBot.objects.filter(is_active=True)
                    active_bot_ids = set(bot.id for bot in current_active_bots)
                    existing_bot_ids = set(self.bot_threads.keys())

                    for bot in current_active_bots:
                        if bot.id not in self.bot_threads:
                            self.start_bot(bot)

                    for bot_id in existing_bot_ids - active_bot_ids:
                        self.stop_bot(bot_id)

        except KeyboardInterrupt:
            self.running = False
            self.stop_all_bots()
            logger.info("Stopped all bots.")

    def start_bot(self, bot_instance):
        logger.info(f"Starting bot: {bot_instance.name}")
        bot_thread = BotThread(bot_instance)
        bot_thread.start()
        self.bot_threads[bot_instance.id] = bot_thread

    def stop_bot(self, bot_id):
        logger.info(f"Stopping bot ID: {bot_id}")
        bot_thread = self.bot_threads.pop(bot_id, None)
        if bot_thread:
            bot_thread.stop()

    def stop_all_bots(self):
        for bot_id in list(self.bot_threads.keys()):
            self.stop_bot(bot_id)
