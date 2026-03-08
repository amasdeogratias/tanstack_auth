import { mysqlTable, varchar, int, datetime } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: datetime("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});


export const sessions = mysqlTable("sessions", {
    id: int("id").primaryKey().autoincrement(),
    user_id: int("user_id").notNull().references(() => users.id),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expires_at: datetime("expires_at").notNull(),
    createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
})
