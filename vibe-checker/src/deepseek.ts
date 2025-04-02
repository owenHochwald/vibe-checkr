import { readFileSync } from "fs";
import OpenAI from "openai";
import { join } from "path";

const openai = new OpenAI({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.API_KEY
});

const promptPath = join(__dirname, "resources", "prompt.txt");
const prompt = readFileSync(promptPath, "utf-8");

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "deepseek-chat",
    });

    console.log(completion.choices[0].message.content);
}

module.exports = main;