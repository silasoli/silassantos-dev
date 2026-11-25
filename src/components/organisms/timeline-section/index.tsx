import { BrandBand } from '@/components/molecules/brand-band'
import { HorizontalScroller } from '@/components/molecules/horizontal-scroller'
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

      <HorizontalScroller
        label="Linha do tempo profissional"
        // Colunas que cabem inteiras: 1 card no celular, 2 no tablet e 3 no desktop.
        // Assim a rolagem sempre para com cards completos, sem nenhum cortado.
        listClassName="[--cols:1] md:[--cols:2] lg:[--cols:3] auto-cols-[calc((100%_-_(var(--cols)_-_1)_*_22px)_/_var(--cols))] gap-[22px] px-1 pt-1.5 pb-[110px] scroll-px-1"
      >
        {entries.map((entry) => (
          <TimelineItem key={`${entry.period}-${entry.level}`} {...entry} />
        ))}
      </HorizontalScroller>
    </BrandBand>
  )
}
