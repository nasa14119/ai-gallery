import { Router } from "express"
import { getAiOptions } from "../middlewares/getAiOptions.js";
import { authRequired } from "../middlewares/validateToken.js";

const app = Router(); 
app.use("*", authRequired, getAiOptions)
app.get("/",(req, res) => {
  return res.status(200).json(req.ai_options)
})
export default app