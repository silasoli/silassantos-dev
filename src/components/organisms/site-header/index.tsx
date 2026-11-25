import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Container } from '@/components/atoms/container'
import { Logo } from '@/components/atoms/logo'
import { NavLinks } from '@/components/molecules/nav-links'
import { SocialLinks } from '@/components/molecules/social-links'
import type { NavItem, SocialLink } from '@/content/types'

export interface SiteHeaderProps {
  /** Link do logo (topo da página) */
  homeHref: string
  navigation: NavItem[]
  socials: SocialLink[]
}

export function SiteHeader({ homeHref, navigation, socials }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Esc fecha o menu do celular
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/88 backdrop-blur-[10px]">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Logo href={homeHref} />
        <NavLinks
          id="nav-links"
          items={navigation}
          open={menuOpen}
          onNavigate={() => setMenuOpen(false)}
        />
        <SocialLinks links={socials} className="hidden md:flex" />
        <button
          type="button"
          className="cursor-pointer text-fg md:hidden"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </Container>
    </header>
  )
}
