import { Container } from '@/components/atoms/container'
import { EduList } from '@/components/molecules/edu-list'
import { SectionHeader } from '@/components/molecules/section-header'
import type { EducationGroup, SectionCopy } from '@/content/types'

export interface EducationSectionProps {
  copy: SectionCopy
  groups: EducationGroup[]
}

export function EducationSection({ copy, groups }: EducationSectionProps) {
  return (
    <section id={copy.id} className="py-[70px] md:py-[100px]">
      <Container>
        <SectionHeader title={copy.title} subtitle={copy.subtitle} />
        <div className="mt-[30px] grid grid-cols-1 gap-[22px] md:grid-cols-2">
          {groups.map((group) => (
            <EduList key={group.title} {...group} />
          ))}
        </div>
      </Container>
    </section>
  )
}
