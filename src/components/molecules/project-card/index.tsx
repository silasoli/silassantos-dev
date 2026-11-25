import { Badge } from '@/components/atoms/badge'
import { GitHubIcon } from '@/components/atoms/brand-icons'
import { Button } from '@/components/atoms/button'
import { Heading } from '@/components/atoms/heading'
import type { Project } from '@/content/types'

export function ProjectCard({ name, description, tags, repoUrl }: Project) {
  return (
    <article className="flex flex-col gap-3.5 rounded-card bg-ink p-[26px] text-fg transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <Heading as="h3" size="card" className="min-w-0 text-[1.2rem] text-brand">
          {name}
        </Heading>
        <Button asChild size="sm" lift={false} className="shrink-0">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} no GitHub`}
          >
            <GitHubIcon />
            GitHub
          </a>
        </Button>
      </div>
      <p className="flex-1 text-[0.94rem] text-fg-muted">{description}</p>
      <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
    </article>
  )
}
