import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

/** Centraliza o conteúdo em até 1160px */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('container-site', className)} {...props} />
}
