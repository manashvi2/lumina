'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Boxes, Eye, EyeOff, LoaderCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('rhea.martin@cratewise.io')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    // Demo flow: no backend auth, route straight to the dashboard.
    setTimeout(() => router.push('/'), 600)
  }

  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-sidebar p-10 lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Boxes className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">Cratewise</p>
            <p className="text-[0.7rem] text-muted-foreground">Inventory Suite</p>
          </div>
        </div>

        <div className="max-w-md space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Every crate, receipt, and transfer in one place.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Track stock levels, manage warehouse operations, and keep your team
            moving with a real-time view of your entire inventory.
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-sidebar-border bg-card/50 p-3 text-sm">
            <ShieldCheck className="size-4 shrink-0 text-primary" />
            <span className="text-muted-foreground">
              Secured with role-based access for your whole warehouse team.
            </span>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Boxes className="size-5" />
            </span>
            <p className="text-base font-semibold tracking-tight">Cratewise</p>
          </div>

          <div className="mb-6 space-y-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back. Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary transition-colors hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-10 w-full rounded-lg border border-input bg-card pr-10 pl-3 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                defaultChecked
                className="size-4 rounded border-input text-primary accent-primary focus:ring-ring/20"
              />
              Keep me signed in
            </label>

            <Button type="submit" className="w-full shadow-sm" disabled={submitting}>
              {submitting && <LoaderCircle data-icon="inline-start" className="animate-spin" />}
              {submitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Need an account?{' '}
            <button
              type="button"
              className="font-medium text-primary transition-colors hover:underline"
            >
              Contact your administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
