"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeCode = analyzeCode;
const fs_1 = require("fs");
const openai_1 = __importDefault(require("openai"));
const path_1 = require("path");
const openai = new openai_1.default({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.API_KEY
});
const promptPath = (0, path_1.join)(__dirname, "resources", "prompt.txt");
const prompt = (0, fs_1.readFileSync)(promptPath, "utf-8");
async function analyzeCode(props) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "deepseek-chat",
        temperature: 0.0,
        response_format: {
            'type': 'json_object'
        }
    });
    const results = completion.choices[0].message.content;
    return results;
}
//# sourceMappingURL=deepseek.js.map