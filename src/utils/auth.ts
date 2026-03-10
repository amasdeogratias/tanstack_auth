import { db } from "#/database";
import { users } from "#/database/schema";
import { destroySession, getSession } from "./session";
import { eq } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { log } from "console";

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const cookie = headers.get("cookie");
    const session = await getSession(cookie);

    if (!session) {
      return;
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user_id))
      .then((r) => r[0]);

    return user;
  },
);

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const headers = getRequestHeaders();
    const cookie = headers.get("cookie");
    await destroySession(cookie);
  } catch (error) {
    log("Error during logout:", error);
  }
});
