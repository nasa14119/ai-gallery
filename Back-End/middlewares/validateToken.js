import jwt  from "jsonwebtoken";
import { env } from "../utils/env.js";
export const authRequired = (req, res, next) => {
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "No token atorization acces denied"}); 

    jwt.verify(token, env.SECRET_TOKEN, (err, user)=>{
        if(err) return res.status(403).json({message: "Invalid token"}); 
        req.user = user; 
        next(); 
    })
}