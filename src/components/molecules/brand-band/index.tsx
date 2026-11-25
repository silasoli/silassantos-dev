import type { ReactNode } from 'react'

import { Container } from '@/components/atoms/container'
import { Wave, type WaveShape } from '@/components/atoms/wave'
import { cn } from '@/lib/cn'

export interface BrandBandProps {
  id?: string
  shape?: WaveShape
  /** Cor do fundo atrás da onda de abertura (a da seção anterior) */
  backdropClassName?: string
  className?: string
  children: ReactNode
}

/** Faixa verde da marca, aberta e fechada por ondas */
export function BrandBand({ id, shape, backdropClassName, className, children }: BrandBandProps) {
  return (
    <>
      <Wave shape={shape} className={backdropClassName} />
      <section id={id} className={cn('bg-brand pt-[30px] pb-[90px] text-ink', className)}>
        <Container>{children}</Container>
      </section>
      <Wave shape={shape} flip />
    </>
  )
}
