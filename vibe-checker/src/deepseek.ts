import { readFileSync } from "fs";
import OpenAI from "openai";
import { join } from "path";
import { ContextData } from "./types/types";

const openai = new OpenAI({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.API_KEY
});

const promptPath = join(__dirname, "resources", "prompt.txt");
const prompt = readFileSync(promptPath, "utf-8");

export async function analyzeCode(props: ContextData): Promise<String | null> {

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "deepseek-chat",
        temperature: 0.0

    });

    const results = completion.choices[0].message.content;
    return results;
}
