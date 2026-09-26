import { TrendingUp, TrendingDown } from 'lucide-react'
import { kpis } from '@/lib/inventory-data'
import { cn } from '@/lib/utils'

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        const Trend = kpi.trend === 'up' ? TrendingUp : TrendingDown
        return (
          <div
            key={kpi.label}
            className="group rounded-xl border border-border bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <span className={cn('flex size-9 items-center justify-center rounded-lg', kpi.accent)}>
                <Icon className="size-4.5" />
              </span>
              <span
                className={cn(
                  'flex items-center gap-0.5 text-xs font-medium',
                  kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600',
                )}
              >
                <Trend className="size-3.5" />
                {kpi.delta}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              {kpi.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{kpi.label}</p>
          </div>
        )
      })}
    </div>
  )
}
