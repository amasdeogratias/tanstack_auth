import { db } from "#/database";
import { Category, posts } from "#/database/schema";
import { getCurrentUserFn } from "#/utils/auth";
import { createServerFn } from "@tanstack/react-start";
import path from "path";
import { z } from "zod";
// import { CreatePostInput } from "./validators/post";
import fs from "fs/promises";

export const categorySchema = z.enum(Category);

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long") ?? "",
  content: z.string().min(100, "Content is required"),
  category: categorySchema,
  image: z.string().optional(),
});

export type CreatePostInput = z.infer<typeof postSchema>;

export const createPost = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    //get user from context
    const user = await getCurrentUserFn();
    if (!user) {
      throw new Error("Unauthorized");
    }

    if (!(data instanceof FormData)) {
      throw new Error("Invalid input data");
    }
    //destructure the validated data
    const title = data.get("title")?.toString().trim() ?? "";
    const content = data.get("content")?.toString().trim() ?? "";
    const category = data.get("category")?.toString().trim() ?? "";

    if (!title || !content || !category) {
      throw new Error("All fields are required");
    }

    // Access the file object
    const file = data.get("image") as File | null;
    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      

      // Save the file to the server
      await fs.writeFile(filePath, buffer);

      //update image url
      imageUrl = `/uploads/${fileName}`;
    }

    //create post in database
    try {
      const newPost = await db.insert(posts).values({
        title,
        category: category as any,
        content,
        image: imageUrl,
        user_id: user.id,
      });
      console.log("Post created successfully", newPost);
      return { success: true, message: "Post created successfully!" };
    } catch (error) {
      console.log("Error creating post:", error);
    }
  });
