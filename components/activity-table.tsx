import { PackageCheck, Truck, ArrowLeftRight, SlidersHorizontal } from 'lucide-react'
import { statusStyles, type MoveRecord, type DocType } from '@/lib/inventory-data'
import { cn } from '@/lib/utils'

const typeIcon: Record<DocType, typeof PackageCheck> = {
  Receipt: PackageCheck,
  Delivery: Truck,
  Internal: ArrowLeftRight,
  Adjustment: SlidersHorizontal,
}

function StatusPill({ status }: { status: MoveRecord['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        statusStyles[status],
      )}
    >
      {status}
    </span>
  )
}

export function ActivityTable({ rows }: { rows: MoveRecord[] }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-xs">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
          <p className="text-xs text-muted-foreground">Latest stock movements across all warehouses</p>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground tabular-nums">
          {rows.length} {rows.length === 1 ? 'record' : 'records'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {['Document ID', 'Type', 'Product', 'Quantity', 'Status', 'Warehouse', 'Date'].map(
                (h) => (
                  <th
                    key={h}
                    className={cn(
                      'px-5 py-3 text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase',
                      h === 'Quantity' && 'text-right',
                    )}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-muted-foreground">
                  No movements match the selected filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const Icon = typeIcon[row.type]
                return (
                  <tr
                    key={row.id}
                    className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-5 py-3.5 font-medium text-foreground tabular-nums">{row.id}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <Icon className="size-4 text-primary/70" />
                        {row.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-foreground">{row.product}</td>
                    <td
                      className={cn(
                        'px-5 py-3.5 text-right font-medium tabular-nums',
                        row.quantity < 0 ? 'text-red-600' : 'text-foreground',
                      )}
                    >
                      {row.quantity > 0 ? '+' : ''}
                      {row.quantity.toLocaleString()} {row.unit}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={row.status} />
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.warehouse}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">{row.date}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
