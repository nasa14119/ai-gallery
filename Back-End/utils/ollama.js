import { ollama } from "ollama-ai-provider"
import { generateText } from "ai"
import { SYSTEM } from "../const/ai";

const model = ollama("llama2"); 
export class Ollama {
    async getDescription (prompt = "") {
        console.log("loading...")
        const res = await generateText({
            model, 
            system: SYSTEM, 
            prompt
        })
        console.clear()
        return [res.text.replace(/\n/, "")]
    }
}