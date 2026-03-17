import type { Category } from "#/database/schema";

export type TUser = {
  name?: string;
  email?: string;
  password?: string;
};

export type TPost = {
  title: string;
  content: string;
  category: Category;
  image?: string;
  user_id?: number;
};
