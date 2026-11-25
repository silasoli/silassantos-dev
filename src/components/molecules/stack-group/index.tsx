import { Chip } from '@/components/atoms/chip'
import { DevIcon } from '@/components/atoms/dev-icon'
import { Heading } from '@/components/atoms/heading'
import { Reveal } from '@/components/atoms/reveal'
import type { StackGroup as StackGroupData } from '@/content/types'

export function StackGroup({ title, items }: StackGroupData) {
  return (
    <Reveal className="rounded-card border border-line-card bg-card p-6">
      <Heading as="h3" size="group" className="mb-4">
        {title}
      </Heading>
      <ul className="flex flex-wrap gap-2.5" aria-label={title}>
        {items.map((item) => (
          <li key={item.name}>
            <Chip icon={item.icon ? <DevIcon name={item.icon} /> : undefined}>{item.name}</Chip>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
