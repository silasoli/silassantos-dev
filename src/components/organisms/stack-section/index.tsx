import { Container } from '@/components/atoms/container'
import { SectionHeader } from '@/components/molecules/section-header'
import { StackGroup } from '@/components/molecules/stack-group'
import type { SectionCopy, StackGroup as StackGroupData } from '@/content/types'

export interface StackSectionProps {
  copy: SectionCopy
  groups: StackGroupData[]
}

export function StackSection({ copy, groups }: StackSectionProps) {
  return (
    <section id={copy.id} className="bg-surface-raised py-[70px] md:py-[100px]">
      <Container>
        <SectionHeader title={copy.title} subtitle={copy.subtitle} />
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
          {groups.map((group) => (
            <StackGroup key={group.title} {...group} />
          ))}
        </div>
      </Container>
    </section>
  )
}
