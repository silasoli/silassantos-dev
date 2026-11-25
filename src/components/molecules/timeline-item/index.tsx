import { Badge } from '@/components/atoms/badge'
import { Heading } from '@/components/atoms/heading'
import type { TimelineEntry } from '@/content/types'

/**
 * Card branco + ponto na linha + período, para a linha do tempo horizontal.
 * O card tem a altura do próprio conteúdo e fica encostado na linha (mt-auto), como no layout da marca.
 */
export function TimelineItem({ period, level, title, activities }: TimelineEntry) {
  return (
    // O último item alinha pelo fim (snap-end) para a rolagem conseguir parar no final da trilha
    <li className="group/item relative flex snap-start flex-col last:snap-end">
      <article className="mt-auto rounded-card bg-white px-6 pt-6 pb-[22px] text-ink shadow-card">
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

      {/* A linha cobre o vão até o próximo card; no último item ela termina no card */}
      <span
        aria-hidden="true"
        className="absolute -right-[22px] -bottom-[50px] left-0 h-1 bg-ink group-last/item:right-0"
      >
        <span className="absolute top-1/2 left-1/2 size-[22px] -translate-1/2 rounded-full border-[5px] border-ink bg-brand" />
      </span>
      <span className="absolute inset-x-0 -bottom-[92px] text-center font-display font-bold">
        {period}
      </span>
    </li>
  )
}
