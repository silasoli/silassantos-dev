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
    // overflow-x-clip: a linha do tempo vaza até a borda da tela sem criar rolagem na página
    <BrandBand id={copy.id} shape="gentle" className="overflow-x-clip">
      <SectionHeader title={copy.title} subtitle={copy.subtitle} tone="onBrand" reveal={false} />

      <HorizontalScroller
        label="Linha do tempo profissional"
        // Margem negativa à direita: a trilha vai do início do conteúdo até a borda da tela
        className="mr-[calc((100%-100vw)/2)]"
        listClassName="auto-cols-[minmax(280px,320px)] gap-[22px] pt-1.5 pr-[clamp(24px,6vw,96px)] pb-[110px] pl-1 scroll-pl-1"
      >
        {entries.map((entry) => (
          <TimelineItem key={`${entry.period}-${entry.level}`} {...entry} />
        ))}
      </HorizontalScroller>
    </BrandBand>
  )
}
