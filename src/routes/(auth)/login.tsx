import { loginUser } from "#/server/users/loginUser";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/login")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/blog" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString().trim() ?? "";

    try {
      const res = await loginUser({
        data: { email, password },
      });
      if (res) {
        // Handle successful login, e.g., redirect to dashboard
        navigate({ to: "/blog" });
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-subtle) px-4">
      <div className="w-full max-w-md rounded-2xl border border-(--line) bg-(--bg) p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="mt-2 text-sm text-(--sea-ink-soft)">
            Enter your details below to get started.
          </p>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-(--sea-ink)"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-(--line) bg-(--bg) px-4 py-2.5 text-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              onChange={(e) => {
                e.target.value;
              }}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-(--sea-ink)"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-(--line) bg-(--bg) px-4 py-2.5 text-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
              onChange={(e) => {
                e.target.value;
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-(--primary) py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--primary)/40 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-(--sea-ink-soft)">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-(--primary) hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
