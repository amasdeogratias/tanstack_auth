import crypto from "crypto"
import { db } from "#/database"
import { eq } from "drizzle-orm"
import { serialize, parse } from "cookie"
import { sessions } from "#/database/schema"

const SESSION_COOKIE = "session_token"

export function generateToken() {
  return crypto.randomBytes(32).toString("hex")
}

export async function createSession(userId: number) {

  const token = generateToken()

  const expires = new Date()
//   expires.setDate(expires.getDate() + 7)
    expires.setHours(expires.getHours() + 1) // For testing, set to 1 hour

  await db.insert(sessions).values({
    token: token,
    user_id: userId,
    expires_at: expires,
  })

  return serialize(SESSION_COOKIE, token, {
    httpOnly: true,
    path: "/",
    expires,
  })
}

export async function getSession(cookie: string | null) {

  const cookies = parse(cookie || "")
  const token = cookies[SESSION_COOKIE]

  if (!token) return null

//   const session = await db.query.sessions.findFirst({
//     where: (s: any, { eq }: any) => eq(s.token, token),
//   })
const session = await db.select().from(sessions).where(eq(sessions.token, token)).limit(1).then(res => res[0])

  if (!session) return null

  if (new Date(session.expires_at) < new Date()) {
    return null
  }

  return session
}



export async function destroySession(request: Request) {

  const cookies = parse(request.headers.get("cookie") || "")
  const token = cookies[SESSION_COOKIE]

  if (token) {
    await db.delete(sessions).where(eq(sessions.token, token))
  }

  return serialize(SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
  })
}