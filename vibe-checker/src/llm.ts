import { readFileSync } from "fs";
import path from "path";
import axios from "axios"; 
import { ContextData } from "./types/types";
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export async function analyzeCode(props: ContextData): Promise<string | null> {
    try {
        const promptPath = path.join(__dirname, '..', 'src', 'resources', 'prompt.txt');
        const prompt = readFileSync(promptPath, "utf-8");

        const code = {
            file_name: props.file_name,
            language: props.language,
            line_count: props.line_count,
            code_to_review: props.input
        };

        console.log("Sending code to DeepSeek for analysis:", code);

        const response = await axios.post(
            process.env.DEEPSEEK_API_URL || "https://api.deepseek.com",
            {
                prompt,
                code
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const results = response.data;
        if (!results || !results.issues) {
            console.error("No results returned from DeepSeek.");
            return null;
        }

        console.log("Analysis results received:", results);
        return JSON.stringify(results);
    } catch (error) {
        console.error("Error during code analysis:", error);
        return null;
    }
}
