import { cn } from '@/lib/cn'

export interface LogoProps {
  /** Destino do clique: o topo da página ("#inicio") ou a home ("/") */
  href: string
  className?: string
}

/** Marca "SILAS santos .DEV" em texto */
export function Logo({ href, className }: LogoProps) {
  return (
    <a
      href={href}
      aria-label="Silas Santos, início"
      className={cn(
        'flex items-center gap-0.5 font-display text-[1.35rem] font-extrabold tracking-[0.02em]',
        className,
      )}
    >
      SILAS
      <span className="font-semibold tracking-[0.04em]">santos</span>
      <span className="ml-1.5 rounded-[4px] bg-brand px-[7px] py-0.5 text-[0.8rem] text-ink">
        .DEV
      </span>
    </a>
  )
}
