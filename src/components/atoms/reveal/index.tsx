import type { ComponentProps } from 'react'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/cn'

/**
 * Aparece com fade e leve subida quando entra na tela (uma vez só).
 *
 * É um invólucro: a transição de entrada (700 ms) fica nele, e o conteúdo mantém as próprias
 * transições de hover. Não aplique hover no Reveal; aplique no filho.
 */
export function Reveal({ className, ...props }: ComponentProps<'div'>) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
      {...props}
    />
  )
}
