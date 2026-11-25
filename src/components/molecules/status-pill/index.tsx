import { StatusDot } from '@/components/atoms/status-dot'
import { cn } from '@/lib/cn'

/** Selo "Disponível para novas oportunidades" */
export function StatusPill({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-raised px-3.5 py-[7px] text-[0.85rem] text-fg-muted',
        className,
      )}
    >
      <StatusDot />
      {children}
    </span>
  )
}
