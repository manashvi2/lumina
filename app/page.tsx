'use client'

import { useMemo, useState } from 'react'
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
} from '@/lib/inventory-data'

const defaultFilters: Filters = {
  type: 'All',
  status: 'All',
  warehouse: 'All',
  category: 'All',
}

export default function Page() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>(defaultFilters)

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

  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <Sidebar
        active={activeNav}
        onSelect={(name) => {
          setActiveNav(name)
          setSidebarOpen(false)
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={activeNav} onMenu={() => setSidebarOpen(true)} />

        <main className="flex-1 space-y-5 p-4 sm:p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Overview of inventory levels and warehouse operations.
            </p>
          </div>

          <KpiCards />

          <FilterBar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
            docTypes={docTypes}
            statuses={statuses}
            warehouses={warehouses}
            categories={categories}
          />

          <ActivityTable rows={rows} />
        </main>
      </div>
    </div>
  )
}
