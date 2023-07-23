import { Router } from "express";
import { login, logout, profile, register, validateToken , updateData, deleteUser} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorRequest.js";
import { registerSchema , loginSchema} from "../schemas/auth.schema.js";
const router = Router(); 

router.post('/login', validateSchema(loginSchema) ,login); 
router.post('/register', validateSchema(registerSchema),  register); 
router.post('/logout', logout); 
router.get('/profile', authRequired , profile); 
router.put('/profile', authRequired , updateData);
router.delete('/profile', authRequired , deleteUser);
router.get('/verify-token', validateToken)

export default router; 