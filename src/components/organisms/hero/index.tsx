import { Download } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import { Container } from '@/components/atoms/container'
import { GhostLetter } from '@/components/atoms/ghost-letter'
import { Heading } from '@/components/atoms/heading'
import { TypingCursor } from '@/components/atoms/typing-cursor'
import { PhotoFrame } from '@/components/molecules/photo-frame'
import { StatCard } from '@/components/molecules/stat-card'
import { StatusPill } from '@/components/molecules/status-pill'
import type { Profile } from '@/content/types'

export interface HeroProps {
  id: string
  profile: Profile
  contactHref: string
}

export function Hero({ id, profile, contactHref }: HeroProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden pt-[50px] pb-20 md:pt-[90px] md:pb-[110px]"
    >
      <GhostLetter />
      <Container className="relative grid grid-cols-1 items-center gap-[60px] lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <StatusPill className="mb-[26px]">{profile.availability}</StatusPill>

          <Heading as="h1" size="display">
            {profile.greeting}
            <br />
            <span className="relative inline-block pb-2 text-brand">
              {profile.name}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1.5 rounded-md bg-brand"
              />
            </span>
          </Heading>

          <p className="mt-[22px] mb-5 text-[clamp(1.1rem,2.2vw,1.45rem)] font-medium text-brand">
            {profile.role}
            <TypingCursor />
          </p>

          <p className="max-w-[560px] text-[1.02rem] text-fg-muted">{profile.lead}</p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button asChild>
              <a href={contactHref}>Entre em contato</a>
            </Button>
            <Button asChild variant="outline">
              <a href={profile.resume.href} download={profile.resume.fileName}>
                <Download strokeWidth={2} />
                Baixar currículo
              </a>
            </Button>
          </div>
        </div>

        <PhotoFrame
          src={profile.photo.src}
          alt={profile.photo.alt}
          initials={profile.photo.initials}
          className="order-first mb-[30px] w-[min(300px,80%)] justify-self-center lg:order-none lg:mb-0 lg:w-[min(380px,100%)]"
        >
          <StatCard
            value={profile.highlight.value}
            label={profile.highlight.label}
            className="absolute right-0 -bottom-[26px] md:-right-[18px]"
          />
        </PhotoFrame>
      </Container>
    </section>
  )
}
