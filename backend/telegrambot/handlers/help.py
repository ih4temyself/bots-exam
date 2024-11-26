from aiogram import types


async def handle_help(message: types.Message):
    await message.answer("Help command test")
