import { cn } from '@/lib/cn'

/** Letra gigante só com contorno, decorando o fundo do topo */
export function GhostLetter({ letter = 'S', className }: { letter?: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute top-[30px] right-[4%] hidden font-display text-[34rem] leading-none font-extrabold text-transparent select-none [-webkit-text-stroke:1px_var(--color-line-ghost)] lg:block',
        className,
      )}
    >
      {letter}
    </span>
  )
}
