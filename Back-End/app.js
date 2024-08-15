import path from "path"
import express  from "express";
import auth from "./routes/auth.routes.js"
import images from "./routes/images.routes.js"
import ai from "./routes/ai.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"; 
import saveImgRouter from "./routes/save.routes.js"

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

process.env.NODE_ENV !== "PRODUCTION" && app.use("/", (req, res, next) => {console.log(req.path); next()})
app.use('/api', auth)
app.use('/api', images); 
app.use('/api/ai', ai); 
app.use('/', saveImgRouter)

if(process.env.NODE_ENV === "PRODUCTION"){
  const __dirname = path.resolve(); 
  app.use(express.static(path.join(__dirname, "/Front-End/dist"))); 

  app.get("*", (req, res) => {
    return res.sendFile(path.resolve(__dirname,"Front-End", "dist", "index.html"))
  })
}else {
  app.get("/", (req, res) =>{
    res.send("Welcome to the api for the app of images"); 
  })
}

export default app; 