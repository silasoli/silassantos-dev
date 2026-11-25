import { Container } from '@/components/atoms/container'
import { ContactCard } from '@/components/molecules/contact-card'
import { SectionHeader } from '@/components/molecules/section-header'
import type { ContactChannel, SectionCopy } from '@/content/types'

export interface ContactSectionProps {
  copy: SectionCopy
  channels: ContactChannel[]
}

export function ContactSection({ copy, channels }: ContactSectionProps) {
  return (
    <section id={copy.id} className="pt-5 pb-[70px] text-center md:pb-[100px]">
      <Container>
        <SectionHeader
          title={copy.title}
          subtitle={copy.subtitle}
          align="center"
          className="[&_h2]:text-brand"
        />
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-5 md:grid-cols-3">
          {channels.map((channel) => (
            <ContactCard key={channel.kind} {...channel} />
          ))}
        </div>
      </Container>
    </section>
  )
}
