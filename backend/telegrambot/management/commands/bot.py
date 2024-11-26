import asyncio
import logging
import threading
import time

from django.core.management.base import BaseCommand
from django.db import connection
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from telegrambot.models import TelegramBot

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
            # Schedule the start_bot coroutine
            asyncio.run_coroutine_threadsafe(self.start_bot(), self.loop)
            # Run the event loop until it's stopped
            self.loop.run_forever()
        except Exception as e:
            logger.error(f"Error running bot {self.bot_instance.name}: {e}")
        finally:
            # Ensure all tasks are completed and the loop is closed
            self.stop_event_loop()

    async def start_bot(self):
        self.application = ApplicationBuilder().token(self.bot_instance.token).build()

        # Add handlers here
        self.application.add_handler(CommandHandler("start", self.start_command))
        self.application.add_handler(
            MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message)
        )

        # Start the application
        await self.application.initialize()
        await self.application.start()

        # Start polling for updates
        await self.application.updater.start_polling()

        # Wait until the application is stopped
        await self.application.updater.wait_until_stopped()

        # Clean up
        await self.application.stop()
        await self.application.shutdown()

        # Stop the event loop
        self.loop.stop()

    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        await update.message.reply_text("Hello! This is your bot.")

    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        await update.message.reply_text("You said: " + update.message.text)

    def stop(self):
        if self.application and self.loop and self.loop.is_running():
            # Schedule application.stop() in the event loop
            asyncio.run_coroutine_threadsafe(self.application.stop(), self.loop)

    def stop_event_loop(self):
        # Cancel all pending tasks and close the loop
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

        # Start initial bots
        active_bots = TelegramBot.objects.filter(is_active=True)
        for bot in active_bots:
            self.start_bot(bot)

        # Set up a loop to monitor bot status changes
        try:
            while self.running:
                time.sleep(5)  # Adjust the sleep time as needed

                # Refresh bots from the database
                with connection.cursor():
                    current_active_bots = TelegramBot.objects.filter(is_active=True)
                    active_bot_ids = set(bot.id for bot in current_active_bots)
                    existing_bot_ids = set(self.bot_threads.keys())

                    # Start new bots
                    for bot in current_active_bots:
                        if bot.id not in self.bot_threads:
                            self.start_bot(bot)

                    # Stop deactivated bots
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
