'use client'

import {
  LayoutDashboard,
  Package,
  PackageCheck,
  Truck,
  ArrowLeftRight,
  SlidersHorizontal,
  History,
  Settings,
  User,
  Boxes,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = { name: string; icon: LucideIcon; badge?: string }

const primaryNav: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Products', icon: Package },
  { name: 'Receipts', icon: PackageCheck, badge: '12' },
  { name: 'Delivery Orders', icon: Truck, badge: '19' },
  { name: 'Transfers', icon: ArrowLeftRight, badge: '8' },
  { name: 'Adjustments', icon: SlidersHorizontal },
  { name: 'Move History', icon: History },
]

const secondaryNav: NavItem[] = [
  { name: 'Settings', icon: Settings },
  { name: 'Profile', icon: User },
]

function NavButton({
  item,
  active,
  onSelect,
}: {
  item: NavItem
  active: boolean
  onSelect: (name: string) => void
}) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={() => onSelect(item.name)}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon
        className={cn(
          'size-4.5 shrink-0 transition-colors',
          active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
        )}
      />
      <span className="flex-1 text-left">{item.name}</span>
      {item.badge && (
        <span
          className={cn(
            'rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold tabular-nums',
            active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          {item.badge}
        </span>
      )}
    </button>
  )
}

export function Sidebar({
  active,
  onSelect,
  open,
  onClose,
}: {
  active: string
  onSelect: (name: string) => void
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-66 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Boxes className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-foreground">Cratewise</p>
              <p className="text-[0.7rem] text-muted-foreground">Inventory Suite</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
          <p className="px-3 pt-2 pb-1 text-[0.65rem] font-semibold tracking-wider text-muted-foreground uppercase">
            Operations
          </p>
          {primaryNav.map((item) => (
            <NavButton
              key={item.name}
              item={item}
              active={active === item.name}
              onSelect={onSelect}
            />
          ))}
          <p className="px-3 pt-4 pb-1 text-[0.65rem] font-semibold tracking-wider text-muted-foreground uppercase">
            Account
          </p>
          {secondaryNav.map((item) => (
            <NavButton
              key={item.name}
              item={item}
              active={active === item.name}
              onSelect={onSelect}
            />
          ))}
        </nav>

        <div className="m-3 rounded-xl bg-accent p-4">
          <p className="text-sm font-semibold text-foreground">Storage at 78%</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            North Depot is nearing capacity.
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-primary/15">
            <div className="h-full w-[78%] rounded-full bg-primary" />
          </div>
        </div>
      </aside>
    </>
  )
}
