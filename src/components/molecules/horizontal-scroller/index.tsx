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
 * Lista com rolagem horizontal no estilo do layout da marca: sem barra de rolagem visível, com o
 * conteúdo esmaecendo nas pontas que ainda têm mais itens e setas "»" para avançar.
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
          'edge-fade-mask grid snap-x snap-mandatory grid-flow-col overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          // Largura do esmaecimento em cada ponta: aparece só onde ainda há conteúdo
          canScrollStart ? '[--edge-fade-start:clamp(32px,9vw,120px)]' : '[--edge-fade-start:0px]',
          canScrollEnd ? '[--edge-fade-end:clamp(32px,9vw,120px)]' : '[--edge-fade-end:0px]',
          listClassName,
        )}
      >
        {children}
      </ol>

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

interface ScrollArrowProps {
  side: 'start' | 'end'
  visible: boolean
  controls: string
  onClick: () => void
}

function ScrollArrow({ side, visible, controls, onClick }: ScrollArrowProps) {
  const isEnd = side === 'end'
  const Icon = isEnd ? ChevronsRight : ChevronsLeft

  return (
    <button
      type="button"
      onClick={onClick}
      aria-controls={controls}
      aria-label={isEnd ? 'Ver próximos' : 'Ver anteriores'}
      // Quando some, sai da ordem do Tab e dos leitores de tela, mas continua no DOM para animar
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'group absolute top-[38%] grid size-12 cursor-pointer place-items-center rounded-full bg-ink text-brand shadow-float',
        'transition-[opacity,translate,scale,background-color] duration-300 ease-out',
        'hover:scale-105 hover:bg-surface-raised active:scale-95',
        isEnd ? 'right-1 md:-right-6' : 'left-1 md:-left-6',
        // Entra deslizando a partir da ponta da lista; sai do mesmo jeito
        visible
          ? '-translate-y-1/2 opacity-100'
          : cn(
              'pointer-events-none -translate-y-1/2 opacity-0',
              isEnd ? 'translate-x-3' : '-translate-x-3',
            ),
      )}
    >
      <Icon
        strokeWidth={2.5}
        className={cn(
          'size-6 transition-transform duration-300 ease-out',
          isEnd ? 'group-hover:translate-x-0.5' : 'group-hover:-translate-x-0.5',
        )}
      />
    </button>
  )
}
