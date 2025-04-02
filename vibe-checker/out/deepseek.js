"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const openai_1 = __importDefault(require("openai"));
const path_1 = require("path");
const openai = new openai_1.default({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.API_KEY
});
const promptPath = (0, path_1.join)(__dirname, "resources", "prompt.txt");
const prompt = (0, fs_1.readFileSync)(promptPath, "utf-8");
async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "deepseek-chat",
    });
    console.log(completion.choices[0].message.content);
}
module.exports = main;
//# sourceMappingURL=deepseek.js.map