import {z} from "zod"

export const createPostShema = z.object({
  title: z
    .string({
      required_error: "Title is nedded",
    })
    .trim()
    .optional(),
  size: z
    .union([
      z.literal("thick"),
      z.literal("big"),
      z.literal("tall"),
      z.literal(""),
    ],{required_error: "opcion failure"})
    .optional(),
  src: z
    .string({
      required_error: "Source is nedded",
    })
    .trim()
    .url({
      required_error: "Link to image nedded",
    }),
});

export const updateSchema = z.object({
  title: z
    .string({
      required_error: "Title is nedded",
    })
    .trim()
    .optional(),
  src: z
    .string({
      required_error: "Source is nedded",
    })
    .trim()
    .url({
      required_error: "Link to image nedded",
    })
    .optional(),
});