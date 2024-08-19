import { putBucketBody } from "../schemas/ai.schema.js";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (errors) {
    const messages = errors.errors.map((v) => `${v.path[0]}: ${v.message}`);
    return res.status(400).json({ message: messages.join(" and ") });
  }
};
export const validateBucketData = (req, res, next) => {
  try {
    const data = putBucketBody.parse(req.body);
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    req.new_bucket = data;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
