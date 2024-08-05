import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: false,
    trim: true,
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

export default mongoose.model("User", userSchema); 