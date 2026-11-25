import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

export const badgeVariants = cva('inline-block', {
  variants: {
    variant: {
      /** Nível na linha do tempo (preto com texto verde, sobre card branco) */
      solid: 'rounded-full bg-ink px-2.5 py-0.5 text-xs font-semibold text-brand',
      /** Tecnologias de um projeto (contorno discreto, sobre fundo escuro) */
      outline: 'rounded-md border border-line-tag px-[9px] py-[3px] text-[0.78rem] text-fg-soft',
    },
  },
  defaultVariants: { variant: 'outline' },
})

export type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
