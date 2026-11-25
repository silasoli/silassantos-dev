import { Badge } from '@/components/atoms/badge'
import { Heading } from '@/components/atoms/heading'
import type { TimelineEntry } from '@/content/types'

/** Card branco + ponto na linha + período, para a linha do tempo horizontal */
export function TimelineItem({ period, level, title, activities }: TimelineEntry) {
  return (
    <li className="relative flex snap-start flex-col">
      <article className="flex-1 rounded-card bg-white px-6 pt-6 pb-[22px] text-ink shadow-card">
        <Badge variant="solid" className="mb-3">
          {level}
        </Badge>
        <Heading as="h3" size="card" className="mb-1 text-[1.12rem]">
          {title}
        </Heading>
        <ul className="text-[0.9rem] text-ink-soft">
          {activities.map((activity) => (
            <li
              key={activity}
              className="relative mb-1.5 pl-4 before:absolute before:top-[0.62em] before:left-0 before:size-[7px] before:rounded-full before:bg-brand-deep"
            >
              {activity}
            </li>
          ))}
        </ul>
      </article>

      <span aria-hidden="true" className="absolute -right-[22px] -bottom-[50px] left-0 h-1 bg-ink">
        <span className="absolute top-1/2 left-1/2 size-[22px] -translate-1/2 rounded-full border-[5px] border-ink bg-brand" />
      </span>
      <span className="absolute inset-x-0 -bottom-[92px] text-center font-display font-bold">
        {period}
      </span>
    </li>
  )
}
