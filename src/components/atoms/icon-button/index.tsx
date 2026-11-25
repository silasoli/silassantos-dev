import type { ComponentProps } from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/cn'

export type IconButtonProps = ComponentProps<'button'> & {
  /** Texto para leitores de tela: o botão só tem ícone */
  label: string
  asChild?: boolean
}

/** Botão redondo só com ícone (redes sociais do topo) */
export function IconButton({ label, asChild = false, className, ...props }: IconButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      aria-label={label}
      className={cn(
        'grid size-[34px] place-items-center rounded-full bg-fg text-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand [&_svg]:size-[17px]',
        className,
      )}
      {...props}
    />
  )
}
