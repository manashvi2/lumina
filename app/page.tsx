'use client'

import { useMemo, useState } from 'react'
import { Settings as SettingsIcon, User as UserIcon } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { KpiCards } from '@/components/kpi-cards'
import { FilterBar, type Filters } from '@/components/filter-bar'
import { ActivityTable } from '@/components/activity-table'
import {
  activity,
  docTypes,
  statuses,
  warehouses,
  categories,
  type DocType,
} from '@/lib/inventory-data'

type View = {
  title: string
  description: string
  presetType: DocType | 'All'
  showKpis: boolean
  kind: 'operations' | 'placeholder'
}

const views: Record<string, View> = {
  Dashboard: {
    title: 'Dashboard',
    description: 'Overview of inventory levels and warehouse operations.',
    presetType: 'All',
    showKpis: true,
    kind: 'operations',
  },
  Products: {
    title: 'Products',
    description: 'Browse every product moving through your warehouses.',
    presetType: 'All',
    showKpis: true,
    kind: 'operations',
  },
  Receipts: {
    title: 'Receipts',
    description: 'Incoming stock awaiting or completed at your docks.',
    presetType: 'Receipt',
    showKpis: false,
    kind: 'operations',
  },
  'Delivery Orders': {
    title: 'Delivery Orders',
    description: 'Outbound orders scheduled for customer delivery.',
    presetType: 'Delivery',
    showKpis: false,
    kind: 'operations',
  },
  Transfers: {
    title: 'Transfers',
    description: 'Internal stock moves between warehouses and floors.',
    presetType: 'Internal',
    showKpis: false,
    kind: 'operations',
  },
  Adjustments: {
    title: 'Adjustments',
    description: 'Manual stock corrections and cycle-count changes.',
    presetType: 'Adjustment',
    showKpis: false,
    kind: 'operations',
  },
  'Move History': {
    title: 'Move History',
    description: 'Full audit trail of every stock movement.',
    presetType: 'All',
    showKpis: false,
    kind: 'operations',
  },
  Settings: {
    title: 'Settings',
    description: 'Manage warehouses, document numbering, and preferences.',
    presetType: 'All',
    showKpis: false,
    kind: 'placeholder',
  },
  Profile: {
    title: 'Profile',
    description: 'Update your account details and notification preferences.',
    presetType: 'All',
    showKpis: false,
    kind: 'placeholder',
  },
}

function baselineFilters(view: View): Filters {
  return {
    type: view.presetType,
    status: 'All',
    warehouse: 'All',
    category: 'All',
  }
}

export default function Page() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>(baselineFilters(views.Dashboard))

  const view = views[activeNav] ?? views.Dashboard

  const rows = useMemo(
    () =>
      activity.filter(
        (r) =>
          (filters.type === 'All' || r.type === filters.type) &&
          (filters.status === 'All' || r.status === filters.status) &&
          (filters.warehouse === 'All' || r.warehouse === filters.warehouse) &&
          (filters.category === 'All' || r.category === filters.category),
      ),
    [filters],
  )

  function selectNav(name: string) {
    setActiveNav(name)
    setSidebarOpen(false)
    const next = views[name] ?? views.Dashboard
    setFilters(baselineFilters(next))
  }

  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <Sidebar
        active={activeNav}
        onSelect={selectNav}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={view.title} onMenu={() => setSidebarOpen(true)} />

        <main className="flex-1 space-y-5 p-4 sm:p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">{view.title}</h2>
            <p className="text-sm text-muted-foreground">{view.description}</p>
          </div>

          {view.kind === 'placeholder' ? (
            <PlaceholderView name={view.title} />
          ) : (
            <>
              {view.showKpis && <KpiCards />}

              <FilterBar
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(baselineFilters(view))}
                docTypes={docTypes}
                statuses={statuses}
                warehouses={warehouses}
                categories={categories}
              />

              <ActivityTable rows={rows} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function PlaceholderView({ name }: { name: string }) {
  const Icon = name === 'Profile' ? UserIcon : SettingsIcon
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
        <Icon className="size-6" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{name} coming soon</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          This section is part of the demo. The operations views are fully interactive.
        </p>
      </div>
    </div>
  )
}
