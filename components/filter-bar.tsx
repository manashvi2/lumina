'use client'

import { ChevronDown } from 'lucide-react'

export type Filters = {
  type: string
  status: string
  warehouse: string
  category: string
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-none">
      <label htmlFor={id} className="px-0.5 text-[0.7rem] font-medium text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-full appearance-none rounded-lg border border-input bg-card pr-8 pl-3 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-ring/60 focus:border-ring focus:ring-3 focus:ring-ring/20 focus:outline-none sm:w-44"
        >
          <option value="All">All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}

export function FilterBar({
  filters,
  onChange,
  onReset,
  docTypes,
  statuses,
  warehouses,
  categories,
}: {
  filters: Filters
  onChange: (next: Filters) => void
  onReset: () => void
  docTypes: string[]
  statuses: string[]
  warehouses: string[]
  categories: string[]
}) {
  const set = (key: keyof Filters) => (value: string) =>
    onChange({ ...filters, [key]: value })

  const isFiltered = Object.values(filters).some((v) => v !== 'All')

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <Select label="Document Type" value={filters.type} options={docTypes} onChange={set('type')} />
        <Select label="Status" value={filters.status} options={statuses} onChange={set('status')} />
        <Select label="Warehouse" value={filters.warehouse} options={warehouses} onChange={set('warehouse')} />
        <Select label="Category" value={filters.category} options={categories} onChange={set('category')} />
        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="h-9 rounded-lg px-3 text-sm font-medium text-primary transition-colors hover:bg-accent sm:ml-auto"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
