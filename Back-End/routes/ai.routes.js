import { Router } from "express";
import { getAiOptions } from "../middlewares/getAiOptions.js";
import { authRequired } from "../middlewares/validateToken.js";
import { getPromptAi } from "../models/ai.model.js";
import { validateSchema } from "../middlewares/validatorRequest.js";
import { text_prompt } from "../schemas/ai.schema.js";

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
  const ai_gen_text = await getPromptAi(prompt, {
    model: text_model,
    apiKey: openai,
  }).catch(res.status(500).send({ message: "Error in request" }));
  res.status(200).send({ text: ai_gen_text });
});
export default app;
