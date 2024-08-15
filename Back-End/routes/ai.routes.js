import { Router } from "express";
import { getAiOptions } from "../middlewares/getAiOptions.js";
import { authRequired } from "../middlewares/validateToken.js";
import { getPromptAi, getImageAi } from "../models/ai.model.js";
import { validateSchema } from "../middlewares/validatorRequest.js";
import { text_prompt } from "../schemas/ai.schema.js";
import { getHashFile } from "../utils/fs.js";
import { cacheImage } from "../utils/cache.js";
import { checkApiKey } from "../controllers/ai.controller.js";

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

app.post("/image", validateSchema(text_prompt), checkApiKey ,async (req, res) => {
  const { prompt } = req.body;
  try {
    const ai_gen_image = await getImageAi(prompt, req.options_image );
    const path_cache_image = await cacheImage(ai_gen_image, req.user.id)
    res.status(200).sendFile(path_cache_image)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error in request" });
  }
});

app.get("/cached-image", async (req, res) =>{
  const cache = req.ai_options.cache_image
  if(!cache) return res.status(204).json({message:"No cache in db"});
  try {
    const file_path = await getHashFile(cache); 
    return res.sendFile(file_path)
  } catch (err) {
    return res.status(204).json({message:"No file found"});
  } 
})
app.get("/text/is-auth", (req, res) =>{
  const { openai , text_model, image_model } = req.ai_options;
  if(text_model === "OPENAI" || image_model === "OPENAI" ){
    return res.status(200).send({isAuth: !!openai})
  } 
  res.sendStatus(404); 

})
export default app;
