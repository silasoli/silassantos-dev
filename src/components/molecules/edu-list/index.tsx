import { Heading } from '@/components/atoms/heading'
import { Reveal } from '@/components/atoms/reveal'
import type { EducationGroup } from '@/content/types'

export function EduList({ title, items }: EducationGroup) {
  return (
    <Reveal className="rounded-card border border-line-card bg-card p-[26px]">
      <Heading as="h3" size="group" className="mb-3.5 text-[1.05rem]">
        {title}
      </Heading>
      <ul>
        {items.map((item) => (
          <li key={item.title} className="border-b border-line-divider py-2.5 last:border-b-0">
            <strong className="block font-semibold">{item.title}</strong>
            <span className="text-[0.88rem] text-fg-muted">{item.detail}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
