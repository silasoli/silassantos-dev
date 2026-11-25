import { cn } from '@/lib/cn'

export interface StatCardProps {
  value: string
  label: string
  className?: string
}

/** Card flutuante com um número de destaque ("5+ anos") */
export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line-strong bg-surface-raised px-[18px] py-3.5 text-[0.85rem] shadow-float',
        className,
      )}
    >
      <strong className="block font-display text-[1.6rem] leading-[1.1] text-brand">{value}</strong>
      {label}
    </div>
  )
}
