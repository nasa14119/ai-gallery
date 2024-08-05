import { ollama } from "ollama-ai-provider"
import { generateText } from "ai"
import { SYSTEM } from "../const/ai.js";

const model = ollama("llama2"); 
export class Ollama {
    async getDescription (prompt = "") {
        try {
            const res = await generateText({
                model, 
                temperature: 0.8,
                system: SYSTEM, 
                prompt
            })
            return [res.text.replace(/\n/, "")]
        } catch (error) {
            throw new Error("Error sending request")            
        }
    }
}