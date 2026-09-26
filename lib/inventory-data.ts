import {
  Boxes,
  TriangleAlert,
  PackageCheck,
  Truck,
  ArrowLeftRight,
  type LucideIcon,
} from 'lucide-react'

export type DocType = 'Receipt' | 'Delivery' | 'Internal' | 'Adjustment'
export type Status = 'Draft' | 'Waiting' | 'Ready' | 'Done' | 'Canceled'

export type MoveRecord = {
  id: string
  type: DocType
  product: string
  quantity: number
  unit: string
  status: Status
  warehouse: string
  category: string
  date: string
}

export const kpis: {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down'
  icon: LucideIcon
  accent: string
}[] = [
  {
    label: 'Total Products in Stock',
    value: '18,432',
    delta: '+4.6%',
    trend: 'up',
    icon: Boxes,
    accent: 'text-primary bg-primary/10',
  },
  {
    label: 'Low / Out of Stock Items',
    value: '27',
    delta: '+6',
    trend: 'down',
    icon: TriangleAlert,
    accent: 'text-amber-600 bg-amber-500/10',
  },
  {
    label: 'Pending Receipts',
    value: '12',
    delta: '-2',
    trend: 'up',
    icon: PackageCheck,
    accent: 'text-sky-600 bg-sky-500/10',
  },
  {
    label: 'Pending Deliveries',
    value: '19',
    delta: '+3',
    trend: 'down',
    icon: Truck,
    accent: 'text-emerald-600 bg-emerald-500/10',
  },
  {
    label: 'Internal Transfers Scheduled',
    value: '8',
    delta: '+1',
    trend: 'up',
    icon: ArrowLeftRight,
    accent: 'text-violet-600 bg-violet-500/10',
  },
]

export const statusStyles: Record<Status, string> = {
  Done: 'bg-emerald-500/12 text-emerald-700 ring-emerald-600/20',
  Waiting: 'bg-amber-500/12 text-amber-700 ring-amber-600/20',
  Ready: 'bg-sky-500/12 text-sky-700 ring-sky-600/20',
  Draft: 'bg-slate-500/10 text-slate-600 ring-slate-500/20',
  Canceled: 'bg-red-500/12 text-red-700 ring-red-600/20',
}

export const docTypes: DocType[] = ['Receipt', 'Delivery', 'Internal', 'Adjustment']
export const statuses: Status[] = ['Draft', 'Waiting', 'Ready', 'Done', 'Canceled']
export const warehouses = [
  'Main Warehouse',
  'Production Floor',
  'North Depot',
  'Overflow Yard',
]
export const categories = [
  'Raw Materials',
  'Finished Goods',
  'Components',
  'Packaging',
]

export const activity: MoveRecord[] = [
  {
    id: 'RCP-10428',
    type: 'Receipt',
    product: 'Steel Rods (12mm)',
    quantity: 1200,
    unit: 'pcs',
    status: 'Done',
    warehouse: 'Main Warehouse',
    category: 'Raw Materials',
    date: 'Sep 24, 2026',
  },
  {
    id: 'DLV-20915',
    type: 'Delivery',
    product: 'Wooden Chairs',
    quantity: 340,
    unit: 'pcs',
    status: 'Ready',
    warehouse: 'North Depot',
    category: 'Finished Goods',
    date: 'Sep 24, 2026',
  },
  {
    id: 'INT-30541',
    type: 'Internal',
    product: 'Copper Wire (2.5mm)',
    quantity: 860,
    unit: 'm',
    status: 'Waiting',
    warehouse: 'Production Floor',
    category: 'Components',
    date: 'Sep 23, 2026',
  },
  {
    id: 'ADJ-40122',
    type: 'Adjustment',
    product: 'Cardboard Boxes (L)',
    quantity: -75,
    unit: 'pcs',
    status: 'Done',
    warehouse: 'Overflow Yard',
    category: 'Packaging',
    date: 'Sep 23, 2026',
  },
  {
    id: 'RCP-10427',
    type: 'Receipt',
    product: 'Aluminium Sheets',
    quantity: 500,
    unit: 'sheets',
    status: 'Draft',
    warehouse: 'Main Warehouse',
    category: 'Raw Materials',
    date: 'Sep 22, 2026',
  },
  {
    id: 'DLV-20914',
    type: 'Delivery',
    product: 'Office Desks',
    quantity: 120,
    unit: 'pcs',
    status: 'Canceled',
    warehouse: 'North Depot',
    category: 'Finished Goods',
    date: 'Sep 22, 2026',
  },
  {
    id: 'INT-30540',
    type: 'Internal',
    product: 'Steel Rods (12mm)',
    quantity: 400,
    unit: 'pcs',
    status: 'Done',
    warehouse: 'Production Floor',
    category: 'Raw Materials',
    date: 'Sep 21, 2026',
  },
  {
    id: 'RCP-10426',
    type: 'Receipt',
    product: 'Plastic Pellets',
    quantity: 2400,
    unit: 'kg',
    status: 'Waiting',
    warehouse: 'Main Warehouse',
    category: 'Raw Materials',
    date: 'Sep 21, 2026',
  },
  {
    id: 'DLV-20913',
    type: 'Delivery',
    product: 'Copper Wire (2.5mm)',
    quantity: 1500,
    unit: 'm',
    status: 'Ready',
    warehouse: 'Overflow Yard',
    category: 'Components',
    date: 'Sep 20, 2026',
  },
  {
    id: 'ADJ-40121',
    type: 'Adjustment',
    product: 'Wooden Chairs',
    quantity: 18,
    unit: 'pcs',
    status: 'Done',
    warehouse: 'North Depot',
    category: 'Finished Goods',
    date: 'Sep 20, 2026',
  },
]
