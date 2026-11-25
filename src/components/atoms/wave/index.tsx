import { cn } from '@/lib/cn'

const shapes = {
  /** Onda da faixa "Minha trajetória" */
  gentle: 'M0 70 L0 40 C 300 0, 600 10, 900 30 S 1300 50, 1440 10 L1440 70 Z',
  /** Onda da faixa "Meus projetos" */
  rolling: 'M0 70 L0 30 C 360 70, 720 0, 1080 20 S 1380 40, 1440 30 L1440 70 Z',
} as const

export type WaveShape = keyof typeof shapes

export interface WaveProps {
  shape?: WaveShape
  /** Vira a onda de cabeça para baixo (fechamento da faixa) */
  flip?: boolean
  className?: string
}

/** Onda verde que abre e fecha as faixas da marca */
export function Wave({ shape = 'gentle', flip = false, className }: WaveProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      className={cn('block h-[70px] w-full text-brand', flip && '-mt-px rotate-180', className)}
    >
      <path d={shapes[shape]} fill="currentColor" />
    </svg>
  )
}
