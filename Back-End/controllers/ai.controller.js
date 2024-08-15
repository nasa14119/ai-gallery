export const checkApiKey = async (req, res, next) => {
  const { image_model , openai, stable_diffusion} = req.ai_options;
  let apiKey; 
  if (image_model === "OPENAI" && !openai) {
    return res.status(401).send({ message: "Api key need to be provided" })
  };
  if (image_model === "STABLE" && !stable_diffusion) {
    return res.status(401).send({ message: "Api key need to be provided" })
  };
  if(image_model === "OPENAI") apiKey = openai
  if(image_model === "STABLE") apiKey = stable_diffusion
  
  //if apikey still not set
  if(apiKey === undefined) res.status(500).send({message: "No image model option provided"}); 

  req.options_image = {
    model: image_model,
    apiKey
  }
  
  next()
}