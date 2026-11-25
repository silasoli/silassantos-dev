import type { ComponentType, SVGProps } from 'react'
import { Mail } from 'lucide-react'

import { LinkedInIcon, WhatsAppIcon } from '@/components/atoms/brand-icons'
import { Reveal } from '@/components/atoms/reveal'
import type { ContactChannel, ContactKind } from '@/content/types'

const icons: Record<ContactKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: Mail,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
}

export function ContactCard({ kind, label, value, href, external }: ContactChannel) {
  const Icon = icons[kind]
  return (
    <Reveal>
      <a
        href={href}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        className="group flex h-full flex-col items-center gap-2.5 rounded-card border-2 border-brand px-5 py-[26px] transition-[background-color,color,transform] duration-200 hover:-translate-y-1 hover:bg-brand hover:text-ink"
      >
        <Icon className="size-[30px] text-brand transition-colors duration-200 group-hover:text-ink" />
        <strong className="font-display text-[1.05rem]">{label}</strong>
        <span className="text-[0.88rem] break-all text-fg-muted transition-colors duration-200 group-hover:text-ink">
          {value}
        </span>
      </a>
    </Reveal>
  )
}
