'use client'

import Link from 'next/link'
import { Search, Bell, Menu, Plus, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Topbar({
  title,
  onMenu,
}: {
  title: string
  onMenu: () => void
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden min-w-0 flex-col md:flex">
        <h1 className="truncate text-base font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground">Welcome back, here&apos;s your stock overview</p>
      </div>

      <div className="relative ml-auto w-full max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search products, documents..."
          className="h-9 w-full rounded-lg border border-input bg-card pr-3 pl-9 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20 focus:outline-none"
        />
      </div>

      <Button size="sm" className="hidden shadow-sm sm:inline-flex">
        <Plus data-icon="inline-start" />
        New Document
      </Button>

      <button
        type="button"
        className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-5" />
        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary ring-2 ring-background" />
      </button>

      <button
        type="button"
        className="flex items-center gap-2.5 rounded-lg py-1 pr-1 pl-1.5 transition-colors hover:bg-muted"
        aria-label="Account menu"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          RM
        </span>
        <span className="hidden text-left leading-tight lg:block">
          <span className="block text-sm font-medium text-foreground">Rhea Martin</span>
          <span className="block text-[0.7rem] text-muted-foreground">Warehouse Lead</span>
        </span>
      </button>

      <Link
        href="/login"
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Sign out"
      >
        <LogOut className="size-5" />
      </Link>
    </header>
  )
}
