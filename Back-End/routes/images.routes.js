import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {addImage, deleteImage, getImage, getImages, updateImage} from "../controllers/images.controller.js"
import {validateSchema} from "../middlewares/validatorRequest.js"
import {createPostShema, updateSchema} from "../schemas/images.schema.js"
const router = Router(); 

router.get('/images', authRequired, getImages); 
router.get('/image/:id', authRequired, getImage); 
router.post('/image', authRequired, validateSchema(createPostShema), addImage); 
router.put('/image/:id',authRequired,validateSchema(updateSchema),  updateImage); 
router.delete('/image/:id',authRequired, deleteImage); 

export default router; 