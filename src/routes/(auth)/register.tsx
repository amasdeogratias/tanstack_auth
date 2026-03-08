import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { registerUser } from "#/server/registerUser";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString().trim() ?? "";

    try {
      const res = await registerUser({
        data: { name, email, password },
      });

      console.log("Register response:", res);

      if (res.success) {
        navigate({ to: "/login" });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-subtle) px-4">
      <div className="w-full max-w-md rounded-2xl border border-(--line) bg-(--bg) p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
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
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-(--sea-ink)"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full rounded-lg border border-(--line) bg-(--bg) px-4 py-2.5 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              onChange={(e) => {
                e.target.value;
              }}
              //   required
            />
          </div>

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
              required
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
              className="w-full rounded-lg border border-(--line) bg-(--bg) px-4 py-2.5 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              onChange={(e) => {
                e.target.value;
              }}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-(--primary) py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 cursor-pointer"
          >
            Save
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-(--sea-ink-soft)">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-(--primary) hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
