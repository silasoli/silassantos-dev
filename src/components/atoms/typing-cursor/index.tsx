import { cn } from '@/lib/cn'

/** Cursor "_" piscando no fim do cargo */
export function TypingCursor({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('inline-block animate-blink', className)}>
      _
    </span>
  )
}
