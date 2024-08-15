import db from "../models/ai_options.model.js"
export const getBucketData = async (req, res, next) => {
  let options = await db.findOne({user: req.user.id}); 
  console.log(options.bucket)
  if(!options.bucket){
    return res.sendStatus(401)
  }
  req.bucket = {...options.bucket}
  next()
}