import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--page-bg)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--card-bg)] p-8 shadow-sm">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
            Join us and start your journey today.
          </p>
        </div>

        {/* Form */}
        <form action="/register" method="post" className="space-y-5">
          
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              className="h-11 rounded-lg border border-[var(--line)] bg-[var(--input-bg)] px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className="h-11 rounded-lg border border-[var(--line)] bg-[var(--input-bg)] px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              className="h-11 rounded-lg border border-[var(--line)] bg-[var(--input-bg)] px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="text-xs text-[var(--sea-ink-soft)]">
              Must be at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              className="h-11 rounded-lg border border-[var(--line)] bg-[var(--input-bg)] px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-[var(--sea-ink-soft)]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}