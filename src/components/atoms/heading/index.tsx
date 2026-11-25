import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

export const headingVariants = cva('font-display', {
  variants: {
    size: {
      display: 'text-[clamp(2.4rem,5vw,3.7rem)] leading-[1.08] font-bold',
      section: 'mb-3.5 text-[clamp(2rem,4vw,2.9rem)] font-bold',
      card: 'text-[1.1rem] font-bold',
      group: 'text-base font-bold text-brand',
    },
  },
  defaultVariants: { size: 'section' },
})

type Level = 'h1' | 'h2' | 'h3'

export type HeadingProps = ComponentProps<'h2'> &
  VariantProps<typeof headingVariants> & {
    as?: Level
  }

/** Título: o nível semântico (as) é independente do tamanho visual (size) */
export function Heading({ as: Tag = 'h2', size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />
}
