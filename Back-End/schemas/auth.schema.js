import {z} from "zod"; 
export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is nedded"
    }), 
    password: z.string({
        required_error: "Password is nedded"
    }).min(10 , {
        message: "Password must be of minimun 10 caracters"
    })
})

export const loginSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }), 
    password: z.string({
        required_error: "Password is required"
    }).min(10 , {
        message: "Password must be of minimun 10 caracters"
    })
})