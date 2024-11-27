import datetime

from asgiref.sync import sync_to_async  # Import sync_to_async
from django.utils import timezone  # Import Django's timezone module
from telegram import Update
from telegram.ext import ContextTypes

from telegrambot.models import ScheduledMessage


async def schedule_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    bot_instance = context.bot_data.get("bot_instance")  # Retrieve bot instance
    if not bot_instance:
        await update.message.reply_text("Bot instance not found.")
        return

    try:
        time_str, *message_parts = context.args
        message_text = " ".join(message_parts)
        schedule_time = datetime.datetime.strptime(time_str, "%H:%M").time()

        now = timezone.now()
        send_time = datetime.datetime.combine(now.date(), schedule_time)
        send_time = timezone.make_aware(send_time)
        if send_time < now:
            send_time += datetime.timedelta(days=1)

        await sync_to_async(ScheduledMessage.objects.create)(
            bot=bot_instance, message_text=message_text, send_at=send_time
        )

        await update.message.reply_text(f"Message scheduled at {send_time}.")
    except ValueError:
        await update.message.reply_text("Usage: /schedule HH:MM Message text")


async def send_scheduled_message(context: ContextTypes.DEFAULT_TYPE):
    job_data = context.job.context
    await context.bot.send_message(chat_id=job_data["chat_id"], text=job_data["text"])


async def current_time(update: Update, context: ContextTypes.DEFAULT_TYPE):
    now = timezone.localtime()  # Get current time in the local timezone
    await update.message.reply_text(
        f"The current time is {now.strftime('%Y-%m-%d %H:%M:%S')}."
    )
