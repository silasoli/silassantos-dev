import type { ComponentProps } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

export const buttonVariants = cva(
  'inline-flex items-center font-semibold whitespace-nowrap transition-[transform,background-color,color] duration-200 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-ink hover:bg-brand-strong',
        outline: 'border-2 border-brand text-brand hover:bg-brand hover:text-ink',
      },
      size: {
        md: 'gap-2 rounded-[10px] px-6 py-3 text-[0.95rem] [&_svg]:size-[18px]',
        sm: 'gap-1.5 rounded-lg px-3.5 py-2 text-[0.85rem] [&_svg]:size-4',
      },
      lift: {
        true: 'hover:-translate-y-0.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      lift: true,
    },
  },
)

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Renderiza o filho (ex.: <a>) com o visual de botão */
    asChild?: boolean
  }

export function Button({ className, variant, size, lift, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, lift }), className)}
      {...props}
    />
  )
}
