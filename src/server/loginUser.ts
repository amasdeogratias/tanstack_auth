import { createServerFn } from "@tanstack/react-start";
import { db } from "#/database";
import { users } from "#/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createSession } from "#/utils/session";

export interface LoginUserResponse {
  success: boolean;
  message?: string;
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginUser = createServerFn({ method: "POST" })
    .inputValidator(LoginSchema)
    .handler(async ({ data }: { data: { email: string; password: string } }) => {
        const { email, password } = data;
        // Implementation for user login logic
        // 1. Check if user exists
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (user.length === 0) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // Create session
        const cookie = await createSession(user[0].id)

        return new Response(JSON.stringify(user), {
        headers: {
            'Set-Cookie': cookie,
        },
        })
    });