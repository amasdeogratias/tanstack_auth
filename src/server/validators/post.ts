import { z } from "zod";
import { Category } from "#/database/schema";

export const categorySchema = z.enum(Category);

export const createPostSchema = z.object({
  user_id: z.number().int(),
  title: z.string().min(1).max(255),
  category: categorySchema,
  content: z.string().min(1),
  image: z.string().url().optional().nullable(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
