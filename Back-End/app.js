import path from "path"
import express  from "express";
import auth from "./routes/auth.routes.js"
import images from "./routes/images.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"; 

const app = express(); 

//configs of express
app.use(express.json()); 
app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
); 
app.use(cookieParser()); 

if(process.env.NODE_ENV === "PRODUCTION"){
  const __dirname = path.resolve(); 
  app.use(express.static(path.join(__dirname, "/Front-End/dist"))); 

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname,"Front-End", "dist", "index.html")))
}else {
  app.get("/", (req, res) =>{
    res.send("Welcome to the api for the app of images"); 
  })
}
app.use('/api', auth)
app.use('/api', images); 

export default app; 