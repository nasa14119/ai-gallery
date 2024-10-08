import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { SYSTEM } from "../const/ai.js";
import { getHash } from "./fs.js";
export class OpenAi {
  constructor(api) {
    this.API_KEY = api;
  }
  async getDescription(prompt = "") {
    try {
      const openai = createOpenAI({
        apiKey: this.API_KEY,
        compatibility: "strict",
      });
      const res = await generateText({
        model: openai("gpt-3.5-turbo-0125"),
        system: SYSTEM,
        prompt,
      });
      console.log(res)
      return [res.text.replace(/\n/, "")];
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong prossesing request")
    }
  }
  async getImage(prompt) {
    if (!prompt) throw Error("No prompt was provided");
    try {
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
      const hash = getHash();
      return {
        data: data[0].b64_json,
        hash,
      };
    } catch (error) {
      console.log(error)
    }
  }
}
