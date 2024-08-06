import { Router } from "express";
import { getAiOptions } from "../middlewares/getAiOptions.js";
import { authRequired } from "../middlewares/validateToken.js";
import { getPromptAi, getImageAi } from "../models/ai.model.js";
import { validateSchema } from "../middlewares/validatorRequest.js";
import { text_prompt } from "../schemas/ai.schema.js";
import { getHashFile } from "../utils/fs.js";

const app = Router();
app.use("*", authRequired, getAiOptions);
app.get("/", (req, res) => {
  return res.status(200).json(req.ai_options);
});
app.post("/text", validateSchema(text_prompt), async (req, res) => {
  const { text_model, openai } = req.ai_options;
  const { prompt } = req.body;
  if (text_model === "OPENAI" && !openai)
    return res.status(401).send({ message: "Api key need to be provided" });
  try {
    const ai_gen_text = await getPromptAi(prompt, {
      model: text_model,
      apiKey: openai,
    });
    res.status(200).send({ text: ai_gen_text });
  } catch (error) {
    res.status(500).send({ message: "Error in request" });
  }
});
app.post("/image", validateSchema(text_prompt), async (req, res) => {
  const { image_model, openai, stable_diffusion } = req.ai_options;
  const { prompt } = req.body;
  let apiKey; 
  if (image_model === "OPENAI" && !openai)
    return res.status(401).send({ message: "Api key need to be provided" });
  if (image_model === "STABLE" && !stable_diffusion)
    return res.status(401).send({ message: "Api key need to be provided" });
  if(image_model === "OPENAI") apiKey = openai
  if(image_model === "STABLE") apiKey = stable_diffusion
  try {
    const ai_gen_image = await getImageAi(prompt, {
      model: image_model,
      apiKey,
    });
    res.status(200).sendFile(getHashFile(ai_gen_image)+".png");
  } catch (error) {
    res.status(500).send({ message: "Error in request" });
  }
});
app.get("/cached-image", (req, res) =>{
  const cache = req.ai_options.cache_image
  if(!cache) res.status(404).send({message: "No image cached"}); 
  res.sendFile(getHashFile(cache+".png"))
})
export default app;
