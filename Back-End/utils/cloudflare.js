import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { readFile } from "node:fs/promises"
import { __dirname } from "./fs.js"

export class CloudFlare {
  constructor(credentials, bucket = "ai-images"){
    this.client  = new S3Client({
      region: "auto",
      ...credentials, 
    })
    this.bucket = bucket
  }
  async sendToBucketHash(hash){
    const file = await readFile(`${__dirname}/Back-End/img/${hash}.png`)
    const comand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: hash, 
      ContentType: "image/png",
      Body: file.buffer, 
    })
    this.client.send(comand)
  }
}