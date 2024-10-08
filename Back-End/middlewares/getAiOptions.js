import Ai from "../models/ai_options.model.js"
export const getAiOptions = async (req, _, next) => {
  let options = await Ai.findOne({user: req.user.id}); 
  if(!options) {
    options = await new Ai({user:req.user.id}).save()
  }; 
  const values = {
    image_model: options.image_model,
    text_model: options.text_model,
    openai:options.ai_tokens.openai,
    stable_diffusion:options.ai_tokens.stable_diffusion,
    cache_image: options.cache_image ? options.cache_image : null,
  }
  req.ai_options = values
  next()
}