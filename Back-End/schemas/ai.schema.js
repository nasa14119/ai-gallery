import { z } from "zod";

export const text_prompt = z.object({
  prompt: z.string().min(1)
})
export const putBucketBody = z.object({
  bucket_name: z.string().optional(),
  endpoint: z.string().optional(), 
  accessKeyId: z.string().optional(),
  secretAccessKey: z.string().optional(),
})