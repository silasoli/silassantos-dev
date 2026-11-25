import { cn } from '@/lib/cn'

/** Bolinha verde pulsando (selo "Disponível") */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('size-[9px] shrink-0 rounded-full bg-brand animate-pulse-ring', className)}
    />
  )
}
