import Ai from "../models/ai_options.model.js"
import { getHashFile, removeCache, saveImgBase64 } from "./fs.js";

export const cacheImage = async ({hash, data}, id) => {
  const db = await Ai.findOne({user: id}); 
  const { cache_image } = db; 
  if( cache_image ) await removeCache(cache_image)
  db.cache_image = hash
  await db.save(); 
  await saveImgBase64(data, hash); 
  return getHashFile(hash) + ".png"
}