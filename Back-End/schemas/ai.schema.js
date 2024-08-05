import { z } from "zod";

export const text_prompt = z.object({
  prompt: z.string().min(1)
})