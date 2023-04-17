import {Configuration, OpenAIApi} from "openai";
import dotenv from "dotenv"

dotenv.config();

// Open AI Configuration
const OpenAIconfig = new Configuration({
    apiKey : process.env.API_KEY
});

const openai = new OpenAIApi(OpenAIconfig);

async function runCompletion(message){
    const completion = await openai.createCompletion({
        model:"text-davinci-003",
        max_tokens: 200,
        prompt: message,
    });
    return completion.data.choices[0].text;
}
