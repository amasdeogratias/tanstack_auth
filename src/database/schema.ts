import {
  mysqlTable,
  varchar,
  int,
  datetime,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export enum Category {
  Agriculture = "Agriculture",
  Business = "Business",
  Education = "Education",
  Entertainment = "Entertainment",
  Art = "Art",
  Investment = "Investment",
  Uncategorized = "Uncategorized",
  Weather = "Weather",
}

export function enumToMysqlEnum<T extends Record<string, any>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}

export const categoryEnum = mysqlEnum("category", enumToMysqlEnum(Category));

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
  user_id: int("user_id")
    .notNull()
    .references(() => users.id),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires_at: datetime("expires_at").notNull(),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const posts = mysqlTable("posts", {
  id: int("id").primaryKey().autoincrement(),
  user_id: int("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  category: categoryEnum,
  content: varchar("content", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  ),
});
