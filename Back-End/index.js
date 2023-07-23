import app from "./app.js";
import {connectDB} from "./db.js"; 
import { env } from "./utils/env.js";
import imagesModel from "./models/images.model.js";
let PORT = env.PORT ?? 3000; 
connectDB(); 
app.listen(PORT)
console.log(`Listening on port ${PORT}`); 
