import { createServerFn } from "@tanstack/react-start";
import { db } from "#/database";
import { users } from "#/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { z } from "zod";
import type { TUser } from "types/types";


const RegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email(),
  password: z.string().min(6),
});

export interface RegisterUserResponse {
  success: boolean;
  message?: string;
}
export const registerUser = createServerFn({ method: "POST" })
  .inputValidator(RegisterSchema)
  .handler(async ({ data }: { data: TUser }): Promise<RegisterUserResponse> => {
    const { name, email, password } = data;

    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email!))
      .limit(1);

    console.log("queried email data", existingEmail);

    if (existingEmail.length > 0) {
      throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password!, 10);

    // Insert user into database
    await db.insert(users).values({
      name: name!,
      email: email!,
      password: hashedPassword!,
    });

    return { success: true, message: "Registered successfully!" };
  });
