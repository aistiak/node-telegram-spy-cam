var takePic = require("./takePic");
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_TOKEN, MY_TELEGRAM_CHAT_ID, ACTIVATION_TEXT } = process.env

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const { text } = msg;
    try {
        if (chatId == MY_TELEGRAM_CHAT_ID && text == ACTIVATION_TEXT) {
            bot.sendMessage(chatId, 'wait');
            const filename = await takePic();
            const url = `${__dirname}/${filename}`;
            bot.sendPhoto(chatId, url);
        }
    } catch (error) {
        console.log(error);
        bot.sendMessage(chatId, error);
        bot.sendMessage(chatId, 'an exception occurred');
    }

});