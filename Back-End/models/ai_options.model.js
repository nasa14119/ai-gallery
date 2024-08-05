import mongoose from "mongoose";

const ai_option_schema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId, 
  image_model: {
    type: String, 
    require: true, 
    default: "OPENAI",
    enum: ["STABLE", "OPENAI"]
  },
  text_model: {
    type: String, 
    require: true,
    default: "OPENAI", 
    enum: ["OLLAMA", "OPENAI"]
  },
  cache_image: {
    type: String,
    require: false, 
  },
  bucked: {
    type: String, 
    require: false, 
  },
  ai_tokens: {
    openai: {
      type: String,
      trim: true,
      default: ""
    },
    stable_diffusion: {
      type: String,
      trim: true,
      default: ""
    },
  },
});

export default mongoose.model("Ai_options", ai_option_schema); 