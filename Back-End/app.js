import express  from "express";
import auth from "./routes/auth.routes.js"
import images from "./routes/images.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"; 
import imagesModel from "./models/images.model.js";
const app = express(); 

//configs of express
app.use(express.json()); 
app.use(cors({credentials: true, origin:"http://localhost:3000"})); 
app.use(cookieParser()); 
app.use('/api', auth)
app.use('/api', images); 

export default app; 