import express  from "express";
import auth from "./routes/auth.routes.js"
import images from "./routes/images.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"; 

const app = express(); 

//configs of express
app.use(express.json()); 
app.use(cors({credentials: true, origin : "https://mygalleryofimages.onrender.com"})); 
app.use(cookieParser()); 
app.get("/", (req, res) =>{
  res.send("Welcome to the api for the app of images"); 
})
app.use('/api', auth)
app.use('/api', images); 

export default app; 