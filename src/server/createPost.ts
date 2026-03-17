import { db } from "#/database";
import { Category, posts } from "#/database/schema";
import { getCurrentUserFn } from "#/utils/auth";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
// import { CreatePostInput } from "./validators/post";

export const categorySchema = z.enum(Category);

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long") ?? "",
  content: z.string().min(100, "Content is required"),
  category: categorySchema,
  image: z.string().optional(),
});

export type CreatePostInput = z.infer<typeof postSchema>;

export const createPost = createServerFn({ method: "POST" })
  .inputValidator(postSchema)
  .handler(async ({ data }) => {
    //destructure the validated data
    const { title, content, category, image } = data;

    //get user from context
    const user = await getCurrentUserFn();
    if (!user) {
      throw new Error("Unauthorized");
    }

    //create post in database
    try {
      const newPost = await db.insert(posts).values({
        title,
        category: category as any,
        content,
        image,
        user_id: user.id,
      });
      console.log("Post created successfully", newPost);
      return { success: true, message: "Post created successfully!" };
    } catch (error) {
      console.log("Error creating post:", error);
    }
  });
