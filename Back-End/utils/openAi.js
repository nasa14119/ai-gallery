import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { SYSTEM } from "../const/ai.js";
import { safeImg } from "./fs.js";
export class OpenAi {
  constructor(api) {
    this.API_KEY = api;
  }
  async getDescription(prompt = "") {
    const openai = createOpenAI({
      apiKey: this.API_KEY,
      compatibility: "strict",
    });
    console.log("loading...");
    const res = await generateText({
      model: openai("gpt-3.5-turbo-0125"),
      system: SYSTEM,
      prompt,
    });
    console.clear();
    return [res.text.replace(/\n/, "")];
  }
  async getImage(prompt) {
    if (!prompt) throw Error("No prompt was provided");
    const response = await fetch(
      `https://api.openai.com/v1/images/generations
`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          "upstash-forward-Authorization": `Bearer ${this.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json",
        }),
      }
    );
    const { data } = await response.json();
    let isSafe = true
    safeImg(data[0].b64_json).catch(() => (isSafe = false)); 
  }
}
const x = new OpenAi(
  "sk-proj-7qSFPOi1a6LLk4lehBgLT3BlbkFJ8h2Pgd6Tn0EA4Q69P0Mg"
);
console.log(await x.getImage("Montain"));
