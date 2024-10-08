import { Router } from "express";
import { CloudFlare } from "../utils/cloudflare.js";
import Ai from "../models/ai_options.model.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateBucketData } from "../middlewares/validatorRequest.js";
import { getBucketData } from "../middlewares/getBucketData.js";
import { addImage } from "../controllers/images.controller.js";

const app = Router();

app.get("/img/:hash", authRequired, getBucketData, async (req, res) => {
  const cloudflare = new CloudFlare(req.bucket);
  try {
    const file = await cloudflare.getImageFromBucket(req.params.hash);
    console.log(file);
    file.pipe(res);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.put(
  "/api/save/bucket",
  authRequired,
  validateBucketData,
  async (req, res) => {
    try {
      const bucketDb = await Ai.findOne({ user: req.user.id });
      const newData = { ...bucketDb.bucket, ...req.new_bucket };
      console.log(newData);
      bucketDb.bucket = newData;
      await bucketDb.save();
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
app.delete("/api/save/bucket", authRequired, async (req, res) => {
  try {
    const bucketDb = await Ai.findOne({ user: req.user.id });
    bucketDb.bucket = null;
    await bucketDb.save();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get("/api/save/bucket", authRequired, getBucketData, async (req, res) => {
  const isEmpty = Object.values(req.bucket).every((v) => v === "");
  if (isEmpty) return res.status(404).send(null);
  res.send({ ...req.bucket });
});

app.get(
  "/api/save/cached-image",
  authRequired,
  getBucketData,
  async (req, res, next) => {
    try {
      // Getting cache hash
      const dbData = await Ai.findOne({ user: req.user.id });
      const cache_hash = dbData.cache_image;
      dbData.cache_image = "";
      console.log(req.bucket);
      if (!cache_hash) throw new Error("No cached image save");
      await dbData.save();
      // Inicialize bucket with credentials
      const bucket = new CloudFlare(req.bucket);
      await bucket.sendToBucketHash(cache_hash);
      // Get src to save image in mongo
      const src = `${process.env.PAGE_URL}/${cache_hash}`;
      req.body.src = src;
      req.body.size = "";
      req.body.title = "";
      next();
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  addImage
);

export default app;
