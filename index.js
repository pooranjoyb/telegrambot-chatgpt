import { Configuration, OpenAIApi } from "openai";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv"

dotenv.config();

// Open AI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const bot = new TelegramBot(process.env.BOTKEY, { polling: true });

bot.on('message', async (msg) => {
    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${msg.text}`,
            temperature: 0.5,
            frequency_penalty: 0.5,
            max_tokens: 3000
          });
        // send a message to the chat acknowledging receipt of their message
        bot.sendMessage(msg.chat.id, response.data.choices[0].text);
    }catch(error){
        bot.sendMessage(msg.chat.id, error.message);
    }

});