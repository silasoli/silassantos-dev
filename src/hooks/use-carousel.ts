import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'

/** Folga em px para considerar que chegou na ponta (arredondamento de zoom e subpixel) */
const EDGE_TOLERANCE = 4
/** Quanto o mouse precisa andar para virar arraste (abaixo disso é só um clique) */
const DRAG_THRESHOLD = 4
/** Arraste maior que isso avança para o próximo card na direção do gesto */
const SWIPE_DISTANCE = 40

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface DragState {
  pointerId: number
  startX: number
  startLeft: number
  moved: boolean
}

/**
 * Carrossel horizontal sobre uma lista rolável:
 * - diz se ainda há conteúdo antes e depois (para o esmaecimento e as setas);
 * - as setas avançam uma "página" de cards inteiros, com animação própria (o scroll suave nativo
 *   briga com o scroll-snap e fica aos trancos);
 * - com o mouse, dá para arrastar para o lado; ao soltar, para no card mais próximo na direção
 *   do gesto. Toque, trackpad e teclado continuam com a rolagem nativa + scroll-snap.
 */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const frame = useRef<number | null>(null)
  const drag = useRef<DragState | null>(null)

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
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [update])

  /** Posições de rolagem em que cada card fica alinhado no início (já limitadas ao máximo) */
  const snapPositions = useCallback(() => {
    const el = ref.current
    if (!el) return [0]
    const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
    const max = el.scrollWidth - el.clientWidth
    const positions = Array.from(el.children, (child) =>
      Math.min(max, Math.max(0, (child as HTMLElement).offsetLeft - padding)),
    )
    return [...new Set(positions.map(Math.round))].sort((a, b) => a - b)
  }, [])

  const stopAnimation = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = null
  }, [])

  /** Rola até a posição com easing; o snap fica desligado durante a animação e volta no fim */
  const animateTo = useCallback(
    (target: number) => {
      const el = ref.current
      if (!el) return
      stopAnimation()

      const start = el.scrollLeft
      const distance = target - start
      const restoreSnap = () => {
        el.style.scrollSnapType = ''
      }

      if (Math.abs(distance) < 1 || prefersReducedMotion()) {
        el.scrollLeft = target
        restoreSnap()
        return
      }

      el.style.scrollSnapType = 'none'
      const duration = Math.min(700, Math.max(350, Math.abs(distance) * 0.6))
      const startTime = performance.now()

      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration)
        el.scrollLeft = start + distance * easeInOutCubic(progress)
        if (progress < 1) {
          frame.current = requestAnimationFrame(step)
        } else {
          frame.current = null
          el.scrollLeft = target
          restoreSnap()
        }
      }
      frame.current = requestAnimationFrame(step)
    },
    [stopAnimation],
  )

  /** Avança ou volta quantos cards cabem inteiros na tela */
  const scrollByPage = useCallback(
    (direction: 1 | -1) => {
      const el = ref.current
      if (!el) return
      const positions = snapPositions()
      const current = positions.reduce(
        (best, pos, i) =>
          Math.abs(pos - el.scrollLeft) < Math.abs(positions[best] - el.scrollLeft) ? i : best,
        0,
      )
      const first = el.children[0] as HTMLElement | undefined
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      const perPage = first
        ? Math.max(1, Math.floor((el.clientWidth + gap) / (first.offsetWidth + gap)))
        : 1
      const next = Math.min(positions.length - 1, Math.max(0, current + direction * perPage))
      animateTo(positions[next])
    },
    [animateTo, snapPositions],
  )

  // ---------- Arrastar com o mouse ----------

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<T>) => {
      const el = ref.current
      if (!el || event.pointerType !== 'mouse' || event.button !== 0) return
      stopAnimation()
      drag.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startLeft: el.scrollLeft,
        moved: false,
      }
    },
    [stopAnimation],
  )

  const onPointerMove = useCallback((event: ReactPointerEvent<T>) => {
    const el = ref.current
    const state = drag.current
    if (!el || !state || event.pointerId !== state.pointerId) return
    const dx = event.clientX - state.startX
    if (!state.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      state.moved = true
      // Captura o ponteiro para o arraste continuar mesmo se o mouse sair da lista
      try {
        el.setPointerCapture(state.pointerId)
      } catch {
        // Ponteiro já liberado (ex.: soltou fora da janela): segue sem captura
      }
      el.style.scrollSnapType = 'none'
      setIsDragging(true)
    }
    el.scrollLeft = state.startLeft - dx
  }, [])

  const endDrag = useCallback(
    (event: ReactPointerEvent<T>) => {
      const el = ref.current
      const state = drag.current
      if (!el || !state || event.pointerId !== state.pointerId) return
      drag.current = null
      if (!state.moved) return

      if (el.hasPointerCapture(state.pointerId)) el.releasePointerCapture(state.pointerId)
      setIsDragging(false)

      const positions = snapPositions()
      const dragged = state.startLeft - el.scrollLeft // > 0: puxou para a direita (voltar)
      const left = el.scrollLeft
      let target: number
      if (Math.abs(dragged) >= SWIPE_DISTANCE) {
        // Segue a direção do gesto: próximo card depois (ou antes) da posição atual
        target =
          dragged < 0
            ? (positions.find((pos) => pos > left) ?? positions[positions.length - 1])
            : ([...positions].reverse().find((pos) => pos < left) ?? 0)
      } else {
        target = positions.reduce((a, b) => (Math.abs(b - left) < Math.abs(a - left) ? b : a))
      }
      animateTo(target)
    },
    [animateTo, snapPositions],
  )

  /** Roda do mouse ou trackpad no meio da animação: a pessoa assume o controle */
  const onWheel = useCallback(() => {
    if (!frame.current || !ref.current) return
    stopAnimation()
    ref.current.style.scrollSnapType = ''
  }, [stopAnimation])

  /** Evita selecionar texto ao começar a arrastar com o mouse */
  const onMouseDown = useCallback((event: ReactMouseEvent<T>) => {
    if (event.button === 0) event.preventDefault()
  }, [])

  return {
    ref,
    canScrollStart,
    canScrollEnd,
    isDragging,
    scrollByPage,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onMouseDown,
      onWheel,
    },
  }
}
