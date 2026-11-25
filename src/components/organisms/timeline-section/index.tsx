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
        listClassName="auto-cols-[minmax(280px,320px)] gap-[22px] px-1 pt-1.5 pb-[110px] scroll-px-1"
      >
        {entries.map((entry) => (
          <TimelineItem key={`${entry.period}-${entry.level}`} {...entry} />
        ))}
      </HorizontalScroller>
    </BrandBand>
  )
}
