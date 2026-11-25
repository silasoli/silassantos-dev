import { Container } from '@/components/atoms/container'
import { FocusCard } from '@/components/molecules/focus-card'
import { SectionHeader } from '@/components/molecules/section-header'
import type { FocusArea, SectionCopy } from '@/content/types'

export interface FocusSectionProps {
  copy: SectionCopy
  areas: FocusArea[]
}

export function FocusSection({ copy, areas }: FocusSectionProps) {
  return (
    <section id={copy.id} className="py-[70px] md:py-[100px]">
      <Container>
        <SectionHeader title={copy.title} subtitle={copy.subtitle} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, index) => (
            <FocusCard key={area.title} index={index} {...area} />
          ))}
        </div>
      </Container>
    </section>
  )
}
