import { z } from "zod";

export const text_prompt = z.object({
  prompt: z.string().min(1),
});
export const putBucketBody = z.object({
  bucket_name: z
    .string()
    .transform((e) => (e === "" ? undefined : e))
    .optional(),
  endpoint: z
    .string()
    .transform((e) => (e === "" ? undefined : e))
    .optional(),
  accessKeyId: z
    .string()
    .transform((e) => (e === "" ? undefined : e))
    .optional(),
  secretAccessKey: z
    .string()
    .transform((e) => (e === "" ? undefined : e))
    .optional(),
});
