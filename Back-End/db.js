import mongoose from "mongoose";
import { env } from "./utils/env.js";

const url = `mongodb+srv://${env.USER_DB}:${env.PASSWORD_DB}@photos.oy5uxw8.mongodb.net/?retryWrites=true&w=majority`
export async function connectDB(){
    try {
        await mongoose.connect(url); 
        console.log("connected to db")
    } catch (error) {
        console.log(error)
        connectDB(); 
    }
}
