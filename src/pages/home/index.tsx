import { ContactSection } from '@/components/organisms/contact-section'
import { EducationSection } from '@/components/organisms/education-section'
import { FocusSection } from '@/components/organisms/focus-section'
import { Hero } from '@/components/organisms/hero'
import { ProjectsSection } from '@/components/organisms/projects-section'
import { StackSection } from '@/components/organisms/stack-section'
import { TimelineSection } from '@/components/organisms/timeline-section'
import { OnePageTemplate } from '@/components/templates/one-page'
import {
  anchor,
  contactChannels,
  contactCopy,
  education,
  educationCopy,
  focusAreas,
  focusCopy,
  footer,
  headerSocials,
  navigation,
  profile,
  projects,
  projectsCopy,
  sectionIds,
  stackCopy,
  stackGroups,
  timeline,
  timelineCopy,
} from '@/content'

const homeHref = anchor(sectionIds.inicio)

/** Página = template + organismos + conteúdo. É o único lugar que conhece src/content. */
export function HomePage() {
  return (
    <OnePageTemplate
      header={{ homeHref, navigation, socials: headerSocials }}
      footer={{ homeHref, ...footer }}
    >
      <Hero id={sectionIds.inicio} profile={profile} contactHref={anchor(sectionIds.contato)} />
      <TimelineSection copy={timelineCopy} entries={timeline} />
      <FocusSection copy={focusCopy} areas={focusAreas} />
      <StackSection copy={stackCopy} groups={stackGroups} />
      <ProjectsSection copy={projectsCopy} projects={projects} />
      <EducationSection copy={educationCopy} groups={education} />
      <ContactSection copy={contactCopy} channels={contactChannels} />
    </OnePageTemplate>
  )
}
