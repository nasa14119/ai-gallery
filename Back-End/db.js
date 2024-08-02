import mongoose from "mongoose";
import { env } from "./utils/env.js";

const url = `mongodb+srv://${env.USER_DB}:${env.PASSWORD_DB}@cluster0.mkomxse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
export async function connectDB(){
    try {
        await mongoose.connect(url); 
        console.log("connected to db")
    } catch (error) {
        console.log(error)
        connectDB(); 
    }
}
