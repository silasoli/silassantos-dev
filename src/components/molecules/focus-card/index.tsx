import { Heading } from '@/components/atoms/heading'
import { Reveal } from '@/components/atoms/reveal'
import type { FocusArea } from '@/content/types'

export interface FocusCardProps extends FocusArea {
  /** Posição na lista, exibida como "01", "02"... */
  index: number
}

export function FocusCard({ index, title, description }: FocusCardProps) {
  return (
    <Reveal>
      <article className="h-full rounded-card border border-line-card bg-card px-6 py-[26px] transition-[border-color,transform] duration-[250ms] hover:-translate-y-1 hover:border-brand">
        <span className="font-display text-2xl font-extrabold text-brand">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Heading as="h3" size="card" className="mt-2.5 mb-2">
          {title}
        </Heading>
        <p className="text-[0.92rem] text-fg-muted">{description}</p>
      </article>
    </Reveal>
  )
}
