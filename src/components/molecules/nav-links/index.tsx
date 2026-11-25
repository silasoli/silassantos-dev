import type { NavItem } from '@/content/types'
import { cn } from '@/lib/cn'

export interface NavLinksProps {
  id?: string
  items: NavItem[]
  /** Só vale no celular: abre o menu em lista */
  open?: boolean
  onNavigate?: () => void
  className?: string
}

/** Links da navegação: em lista no celular (quando aberto) e em linha a partir de 761px */
export function NavLinks({ id, items, open = false, onNavigate, className }: NavLinksProps) {
  return (
    <nav
      id={id}
      aria-label="Seções do site"
      className={cn(
        'absolute inset-x-0 top-[72px] flex-col border-b border-line bg-surface text-[0.92rem]',
        open ? 'flex' : 'hidden',
        'md:static md:flex md:flex-row md:gap-7 md:border-0 md:bg-transparent',
        className,
      )}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="border-t border-line-subtle px-6 py-3.5 text-fg-muted transition-colors duration-200 hover:text-brand md:border-0 md:p-0"
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
