import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString().trim()
    const password = formData.get('password')?.toString().trim()

    if (!email || !password) {
      setError('Both email and password are required.')
      return
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-subtle)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
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
              className="text-sm font-medium text-[var(--sea-ink)]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              onChange={(e) => {
                e.target.value
              }}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--sea-ink)]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              onChange={(e) => {
                e.target.value
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--primary)] py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-[var(--sea-ink-soft)]">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-[var(--primary)] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
