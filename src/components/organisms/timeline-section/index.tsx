import { BrandBand } from '@/components/molecules/brand-band'
import { SectionHeader } from '@/components/molecules/section-header'
import { TimelineItem } from '@/components/molecules/timeline-item'
import type { SectionCopy, TimelineEntry } from '@/content/types'

export interface TimelineSectionProps {
  copy: SectionCopy
  entries: TimelineEntry[]
}

export function TimelineSection({ copy, entries }: TimelineSectionProps) {
  return (
    <BrandBand id={copy.id} shape="gentle">
      <SectionHeader title={copy.title} subtitle={copy.subtitle} tone="onBrand" reveal={false} />

      {/* tabIndex permite rolar a linha do tempo pelo teclado (setas) */}
      <ol
        tabIndex={0}
        aria-label="Linha do tempo profissional"
        className="grid snap-x snap-mandatory auto-cols-[minmax(300px,1fr)] grid-flow-col gap-[22px] overflow-x-auto px-1 pt-1.5 pb-[110px] [scrollbar-color:var(--color-ink)_transparent] [scrollbar-width:thin]"
      >
        {entries.map((entry) => (
          <TimelineItem key={`${entry.period}-${entry.level}`} {...entry} />
        ))}
      </ol>

      <p className="mt-7 flex items-center gap-1.5 text-[0.85rem] text-brand-ink">
        Arraste para o lado para ver mais &rarr;
      </p>
    </BrandBand>
  )
}
