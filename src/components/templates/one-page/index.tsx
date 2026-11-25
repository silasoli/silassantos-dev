import type { ReactNode } from 'react'

import { SiteFooter, type SiteFooterProps } from '@/components/organisms/site-footer'
import { SiteHeader, type SiteHeaderProps } from '@/components/organisms/site-header'

export interface OnePageTemplateProps {
  header: SiteHeaderProps
  footer: SiteFooterProps
  children: ReactNode
}

/** Esqueleto da página única: topo fixo, seções e rodapé */
export function OnePageTemplate({ header, footer, children }: OnePageTemplateProps) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader {...header} />
      {/* tabIndex -1: o "Pular para o conteúdo" move o foco do teclado para cá (Safari inclusive) */}
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter {...footer} />
    </>
  )
}
