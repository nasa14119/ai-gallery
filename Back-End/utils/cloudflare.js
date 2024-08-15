import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { readFile } from "node:fs/promises";
import { __dirname } from "./fs.js";

export class CloudFlare {
  constructor(options) {
    const credentials = {
      accessKeyId: options.accessKeyId, 
      secretAccessKey: options.secretAccessKey
    }

    this.client = new S3Client({
      region: "auto",
      credentials, 
      endpoint: options.endpoint
    });
    this.bucket = options.bucket_name ?? "ai-images";
  }
  async sendToBucketHash(hash) {
    const file = await readFile(`${__dirname}/Back-End/img/${hash}.png`);
    const comand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: hash,
      ContentType: "image/png",
      Body: file.buffer,
    });
    const res = await this.client.send(comand);
    return res;
  }
  async getImageFromBucket(hash) {
    const params = {
      Bucket: this.bucket,
      Key: hash,
    }
    const comand = new GetObjectCommand(params); 
    try {
      const res = await this.client.send(comand);
      return res.Body;
    } catch (error) {
      if (error.Code === "NoSuchKey") {
        throw new Error("File not found");
      }
    }
  }
}