import { Category } from "#/database/schema";
import { createPost } from "#/server/posts/createPost";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blog/new")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim() ?? "";
    const content = formData.get("content")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "";
    const imageFile = formData.get("image") as File;

    if (!title || !content || !category || !imageFile) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await createPost({
        data: formData,
      });
      if (response?.success) {
        navigate({ to: "/blog" });
      }
    } catch (error) {
      setError(
        "Failed to create post: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };

  return (
    <div className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-0 sm:p-8">
        <div className="flex items-center justify-between gap-2">
          <p className="island-kicker mb-2">Create New Post</p>
          <Link
            className="rounded-md bg-black px-2 py-2 text-white hover:text-white"
            to="/blog"
          >
            All posts
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title">Title</label>

              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => {
                  e.target.value;
                }}
                placeholder="Enter post title"
                className="w-full rounded-lg border border-(--line) bg-(--bg) px-4 py-2.5 text-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                onChange={(e) => {
                  e.target.value;
                }}
                className="w-full rounded-lg border border-(--line) bg-(--bg) px-4 py-2.5 text-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              >
                <option value="">Select a category</option>

                {Object.values(Category).map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {/* Description */}
            <div className="space-y-2 col-span-full">
              <label htmlFor="content">Content</label>

              <textarea
                name="content"
                id="content"
                onChange={(e) => {
                  e.target.value;
                }}
                placeholder="Enter post content"
                className="w-full px-4 py-2.5 border border-(--line) bg-(--bg) text-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              ></textarea>
            </div>

            {/* Image */}
            <div className="space-y-2 col-span-full">
              <label htmlFor="image">File/Image</label>

              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={(e) => {
                  e.target.files;
                }}
                className="w-full px-4 py-2.5 border border-(--line) bg-(--bg) text-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Create Post
          </button>
        </form>
      </section>
    </div>
  );
}
