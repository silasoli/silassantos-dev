import { useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface PhotoFrameProps {
  src: string
  alt: string
  /** Mostradas no lugar da foto se ela não carregar */
  initials: string
  /** Elemento sobreposto à moldura (ex.: StatCard) */
  children?: ReactNode
  className?: string
}

/** Foto com fundo verde e moldura branca deslocada */
export function PhotoFrame({ src, alt, initials, children, className }: PhotoFrameProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative aspect-[1/1.05]', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-[22px] translate-y-[22px] rounded-photo border-[14px] border-fg"
      />
      <div className="absolute inset-0 grid place-items-center overflow-hidden rounded-photo bg-brand">
        {failed ? (
          <span
            role="img"
            aria-label={alt}
            className="font-display text-[6rem] font-extrabold text-ink"
          >
            {initials}
          </span>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="size-full object-cover object-top"
          />
        )}
      </div>
      {children}
    </div>
  )
}
