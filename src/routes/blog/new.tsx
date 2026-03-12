import { Category } from "#/database/schema";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/new")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="page-wrap px-4 pb-8 pt-14 ">
      <section className="mb-4">
        <div className="flex items-center gap-2">
          <p className="island-kicker mb-2">Create New Post</p>
          <Link
            className="rounded-md bg-black px-2 py-2 text-white hover:text-white"
            to="/blog"
          >
            All posts
          </Link>
        </div>
      </section>
      <div className="bg-slate-100 flex items-center justify-center rounded-md">
        <div className="py-5">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Create New Post
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Fill in the details below to publish a new post
            </p>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Title
                </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter post title"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
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
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Content
                </label>

                <textarea
                  name="content"
                  id="content"
                  placeholder="Enter post content"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                ></textarea>
              </div>

              {/* Image */}
              <div className="space-y-2 col-span-full">
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-gray-700"
                >
                  File/Image
                </label>

                <input
                  type="file"
                  name="image"
                  id="image"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
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
        </div>
      </div>
    </div>
  );
}
