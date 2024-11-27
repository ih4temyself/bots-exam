from telegram import Update
from telegram.ext import ContextTypes


async def message_resender(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Resends incoming messages to the admin's Telegram ID.
    """
    admin_id = context.bot_data.get("admin_id")
    if admin_id:
        try:
            await context.bot.send_message(
                chat_id=admin_id,
                text=f"Message from {update.effective_user.username}: {update.message.text}",
            )
        except Exception as e:
            await update.message.reply_text("Failed to send message to admin.")
    else:
        await update.message.reply_text("Admin ID not set.")
