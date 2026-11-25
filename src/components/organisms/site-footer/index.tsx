import { Container } from '@/components/atoms/container'
import { Logo } from '@/components/atoms/logo'

export interface SiteFooterProps {
  /** Link do logo (topo da página) */
  homeHref: string
  owner: string
}

export function SiteFooter({ homeHref, owner }: SiteFooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-[30px]">
      <Container className="flex flex-wrap items-center justify-between gap-5 text-[0.85rem] text-fg-muted">
        <Logo href={homeHref} />
        <span>
          © {year} {owner}
        </span>
      </Container>
    </footer>
  )
}
