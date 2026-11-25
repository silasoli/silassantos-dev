import { useCallback, useEffect, useRef, useState } from 'react'

/** Folga em px para considerar que chegou na ponta (arredondamento de zoom e subpixel) */
const EDGE_TOLERANCE = 4

/**
 * Acompanha a rolagem horizontal de um elemento: diz se ainda há conteúdo à esquerda e à
 * direita, e oferece scrollByPage para os botões de seta.
 */
export function useScrollEdges<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanScrollStart(el.scrollLeft > EDGE_TOLERANCE)
    setCanScrollEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - EDGE_TOLERANCE)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    // Recalcula quando muda o tamanho da tela ou do conteúdo (fontes carregando, por exemplo)
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [update])

  /** Rola quase uma "página" (80% da largura visível) para um dos lados */
  const scrollByPage = useCallback((direction: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [])

  return { ref, canScrollStart, canScrollEnd, scrollByPage }
}
