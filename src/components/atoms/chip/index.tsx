import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type ChipProps = ComponentProps<'span'> & {
  icon?: ReactNode
}

/** Pílula de tecnologia da seção Stack */
export function Chip({ icon, children, className, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line-chip bg-chip px-3.5 py-[7px] text-[0.88rem]',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  )
}
