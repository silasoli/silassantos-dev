import type { ComponentType, SVGProps } from 'react'

import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '@/components/atoms/brand-icons'
import { IconButton } from '@/components/atoms/icon-button'
import type { SocialLink, SocialNetwork } from '@/content/types'
import { cn } from '@/lib/cn'

export const socialIcons: Record<SocialNetwork, ComponentType<SVGProps<SVGSVGElement>>> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  whatsapp: WhatsAppIcon,
}

export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  return (
    <div className={cn('flex gap-3', className)}>
      {links.map(({ network, label, href }) => {
        const Icon = socialIcons[network]
        return (
          <IconButton key={network} label={label} asChild>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon />
            </a>
          </IconButton>
        )
      })}
    </div>
  )
}
