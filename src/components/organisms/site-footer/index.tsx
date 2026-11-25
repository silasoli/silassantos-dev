import { Container } from '@/components/atoms/container'
import { Logo } from '@/components/atoms/logo'

export interface SiteFooterProps {
  /** Link do logo (topo da página) */
  homeHref: string
  owner: string
  credit: string
}

export function SiteFooter({ homeHref, owner, credit }: SiteFooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-[30px]">
      <Container className="flex flex-wrap items-center justify-between gap-5 text-[0.85rem] text-fg-muted">
        <Logo href={homeHref} className="text-fg" />
        <span>
          © {year} {owner} · {credit}
        </span>
      </Container>
    </footer>
  )
}
