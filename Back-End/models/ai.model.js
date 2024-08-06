import { Ollama } from "../utils/ollama.js"
import { OpenAi } from "../utils/openAi.js"
export const OPTIONS_OLLAMA = {
    model: "OLLAMA"
}
export const OPTIONS_OPENAI = {
    model: "OPENAI", 
    apiKey: ""
}
export const getPromptAi = async (prompt = "", options = OPTIONS_OLLAMA) => {
    const getText = async (ai) => {
        const [res] = await ai.getDescription(prompt); 
        return res
    } 
    if(options.model === OPTIONS_OLLAMA.model){
        const ai = new Ollama();
        return await getText(ai); 
    }
    if(options.model === OPTIONS_OPENAI.model){
        const ai = new OpenAi(options.apiKey); 
        return await getText(ai)
    }
    throw new Error("Something went wrong"); 
}
export const getImageAi = async (prompt = "", options = OPTIONS_OPENAI) => {
    let ai; 
    if(options.model === "OPENAI") ai = new OpenAi(options.apiKey)
        
    return "4a303439354fb75f71cc054b3db6503cbdc5.png"
}