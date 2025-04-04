import { readFileSync } from "fs";
import OpenAI from "openai";
import path, { join } from "path";
import { ContextData } from "./types/types";
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env') });


export async function analyzeCode(props: ContextData): Promise<String | null> {

    const openai = new OpenAI({
        baseURL: process.env.BASE_URL,
        apiKey: process.env.API_KEY
    });

    const promptPath = path.join(__dirname, '..', 'src', 'resources', 'prompt.txt');

    const prompt = readFileSync(promptPath, "utf-8");

    const code = {
        "file_name" : props.file_name,
        "language" : props.language,
        "line_count" : props.line_count,
        "code_to_review" : props.input
    };

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: prompt },
            { role: 'user', content: JSON.stringify(code) }
        ],
        model: "deepseek-chat",
        response_format: {
            'type': 'json_object'
        }

    });

    const results = completion.choices[0].message.content;
    return results;
}
