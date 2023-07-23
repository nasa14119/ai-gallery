import mongoose from "mongoose";
import { string } from "zod";

const ImageSchema = new mongoose.Schema({
    src: {
        type: String, 
        require: true,
    },
    title: {
        type: String, 
        default: "No title added"
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        require: true,
    }, 
    size:{
        type:String, 
        default: "", 
        role:{
            type: string, 
            enum:[
                "thick", 
                "big", 
                "tall", 
                ""
            ]
        }
    }
})

export default mongoose.model("Images", ImageSchema); 