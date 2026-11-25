import { useId, type ReactNode } from 'react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

import { useScrollEdges } from '@/hooks/use-scroll-edges'
import { cn } from '@/lib/cn'

export interface HorizontalScrollerProps {
  /** Nome da lista para leitores de tela */
  label: string
  /** Itens da lista: cada filho deve ser um <li> */
  children: ReactNode
  /** Classes da lista (<ol>): colunas, espaçamentos, padding */
  listClassName?: string
  className?: string
}

/**
 * Lista com rolagem horizontal no estilo do layout da marca: sem barra de rolagem visível, com
 * esmaecimento escuro nas pontas que ainda têm conteúdo e setas "»" verdes para avançar.
 * Continua rolável por toque, trackpad e teclado (a lista recebe foco).
 */
export function HorizontalScroller({
  label,
  children,
  listClassName,
  className,
}: HorizontalScrollerProps) {
  const listId = useId()
  const { ref, canScrollStart, canScrollEnd, scrollByPage } = useScrollEdges<HTMLOListElement>()

  return (
    <div className={cn('relative', className)}>
      <ol
        id={listId}
        ref={ref}
        tabIndex={0}
        aria-label={label}
        className={cn(
          'grid snap-x snap-mandatory grid-flow-col overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          listClassName,
        )}
      >
        {children}
      </ol>

      <EdgeFade side="start" visible={canScrollStart} />
      <EdgeFade side="end" visible={canScrollEnd} />

      <ScrollArrow
        side="start"
        visible={canScrollStart}
        controls={listId}
        onClick={() => scrollByPage(-1)}
      />
      <ScrollArrow
        side="end"
        visible={canScrollEnd}
        controls={listId}
        onClick={() => scrollByPage(1)}
      />
    </div>
  )
}

function EdgeFade({ side, visible }: { side: 'start' | 'end'; visible: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-y-0 w-[clamp(40px,14vw,220px)] from-transparent to-surface transition-opacity duration-300',
        side === 'end' ? 'right-0 bg-linear-to-r' : 'left-0 bg-linear-to-l',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    />
  )
}

interface ScrollArrowProps {
  side: 'start' | 'end'
  visible: boolean
  controls: string
  onClick: () => void
}

function ScrollArrow({ side, visible, controls, onClick }: ScrollArrowProps) {
  const Icon = side === 'end' ? ChevronsRight : ChevronsLeft
  return (
    <button
      type="button"
      onClick={onClick}
      aria-controls={controls}
      aria-label={side === 'end' ? 'Ver próximos' : 'Ver anteriores'}
      // Some quando não há mais para onde rolar, mas sai da ordem do Tab em vez de sumir do DOM
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'absolute top-[34%] grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-brand transition-[opacity,transform] duration-300 hover:scale-110',
        side === 'end' ? 'right-2 md:right-4' : 'left-2 md:left-4',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <Icon className="size-8" strokeWidth={2.75} />
    </button>
  )
}
