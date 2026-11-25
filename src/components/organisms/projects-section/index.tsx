import { BrandBand } from '@/components/molecules/brand-band'
import { ProjectCard } from '@/components/molecules/project-card'
import { SectionHeader } from '@/components/molecules/section-header'
import type { Project, SectionCopy } from '@/content/types'

export interface ProjectsSectionProps {
  copy: SectionCopy
  projects: Project[]
}

export function ProjectsSection({ copy, projects }: ProjectsSectionProps) {
  return (
    <BrandBand
      id={copy.id}
      shape="rolling"
      backdropClassName="bg-surface-raised"
      className="pb-[100px]"
    >
      <SectionHeader title={copy.title} subtitle={copy.subtitle} tone="onBrand" reveal={false} />
      <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </BrandBand>
  )
}
