"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.API_KEY
});
async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "deepseek-chat",
    });
    console.log(completion.choices[0].message.content);
}
module.exports = main;
//# sourceMappingURL=deepseek.js.map