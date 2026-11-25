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
/** Quanto o mouse precisa andar com o botão apertado para virar arraste (abaixo disso é clique) */
const DRAG_THRESHOLD = 5
/** Arraste maior que isso avança para o próximo card na direção do gesto */
const SWIPE_DISTANCE = 40
/** Velocidade (px/ms) a partir da qual uma puxada curta conta como "arremesso" */
const FLICK_VELOCITY = 0.35

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface DragState {
  pointerId: number
  startX: number
  startLeft: number
  moved: boolean
  /** Últimas posições do mouse, para medir a velocidade na hora de soltar */
  lastX: number
  lastTime: number
  velocity: number
}

/**
 * Carrossel horizontal sobre uma lista rolável:
 * - diz se ainda há conteúdo antes e depois (esmaecimento e setas) e qual card está no início;
 * - setas e bolinhas levam a um card com animação própria (o scroll suave nativo briga com o
 *   scroll-snap e fica aos trancos);
 * - com o mouse, arrasta só com o botão apertado; ao soltar, encaixa no card seguinte se o gesto
 *   foi longo ou rápido, ou volta para o mais próximo. Toque, trackpad e teclado seguem nativos.
 */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [positions, setPositions] = useState<number[]>([0])
  const [activeIndex, setActiveIndex] = useState(0)
  const frame = useRef<number | null>(null)
  const drag = useRef<DragState | null>(null)

  /** Posições de rolagem em que cada card fica alinhado no início (já limitadas ao máximo) */
  const measurePositions = useCallback(() => {
    const el = ref.current
    if (!el) return [0]
    const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
    const max = el.scrollWidth - el.clientWidth
    const list = Array.from(el.children, (child) =>
      Math.round(Math.min(max, Math.max(0, (child as HTMLElement).offsetLeft - padding))),
    )
    return [...new Set(list)].sort((a, b) => a - b)
  }, [])

  const nearestIndex = (list: number[], left: number) =>
    list.reduce(
      (best, pos, i) => (Math.abs(pos - left) < Math.abs(list[best] - left) ? i : best),
      0,
    )

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanScrollStart(el.scrollLeft > EDGE_TOLERANCE)
    setCanScrollEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - EDGE_TOLERANCE)
    setActiveIndex(nearestIndex(measurePositions(), el.scrollLeft))
  }, [measurePositions])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const remeasure = () => {
      setPositions(measurePositions())
      update()
    }
    remeasure()
    el.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(remeasure)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [measurePositions, update])

  const stopAnimation = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = null
  }, [])

  /** Rola até a posição com easing; o snap fica desligado durante a animação e volta no fim */
  const animateTo = useCallback(
    (target: number, durationHint?: number) => {
      const el = ref.current
      if (!el) return
      stopAnimation()

      const start = el.scrollLeft
      const distance = target - start
      const finish = () => {
        el.scrollLeft = target
        el.style.scrollSnapType = ''
        frame.current = null
      }

      if (Math.abs(distance) < 1 || prefersReducedMotion()) {
        finish()
        return
      }

      el.style.scrollSnapType = 'none'
      const duration = durationHint ?? Math.min(650, Math.max(320, Math.abs(distance) * 0.55))
      const startTime = performance.now()

      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration)
        el.scrollLeft = start + distance * easeOutCubic(progress)
        if (progress < 1) frame.current = requestAnimationFrame(step)
        else finish()
      }
      frame.current = requestAnimationFrame(step)
    },
    [stopAnimation],
  )

  /** Vai para o card de índice `index` (usado pelas bolinhas) */
  const scrollToIndex = useCallback(
    (index: number) => {
      const list = measurePositions()
      animateTo(list[Math.min(list.length - 1, Math.max(0, index))])
    },
    [animateTo, measurePositions],
  )

  /** Avança ou volta quantos cards cabem inteiros na tela */
  const scrollByPage = useCallback(
    (direction: 1 | -1) => {
      const el = ref.current
      if (!el) return
      const list = measurePositions()
      const first = el.children[0] as HTMLElement | undefined
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      const perPage = first
        ? Math.max(1, Math.floor((el.clientWidth + gap) / (first.offsetWidth + gap)))
        : 1
      const current = nearestIndex(list, el.scrollLeft)
      animateTo(list[Math.min(list.length - 1, Math.max(0, current + direction * perPage))])
    },
    [animateTo, measurePositions],
  )

  // ---------- Arrastar com o mouse ----------

  /** Encerra o arraste e encaixa no card certo */
  const finishDrag = useCallback(() => {
    const el = ref.current
    const state = drag.current
    drag.current = null
    if (!el || !state) return
    if (el.hasPointerCapture?.(state.pointerId)) el.releasePointerCapture(state.pointerId)
    if (!state.moved) return
    setIsDragging(false)

    const list = measurePositions()
    const left = el.scrollLeft
    const dragged = state.startLeft - left // < 0: puxou para a esquerda (avançar)
    // Velocidade > 0: mouse indo para a esquerda (conteúdo avançando).
    // Se o mouse parou antes de soltar, não é arremesso.
    const idle = performance.now() - state.lastTime > 100
    const velocity = idle ? 0 : -state.velocity
    const flick = Math.abs(velocity) >= FLICK_VELOCITY
    const forward = flick ? velocity > 0 : dragged < 0

    let target: number
    if (flick || Math.abs(dragged) >= SWIPE_DISTANCE) {
      target = forward
        ? (list.find((pos) => pos > left + 1) ?? list[list.length - 1])
        : ([...list].reverse().find((pos) => pos < left - 1) ?? 0)
    } else {
      target = list[nearestIndex(list, left)]
    }
    // Arremesso rápido termina mais rápido; puxada lenta, um pouco mais devagar
    const remaining = Math.abs(target - left)
    const duration = flick
      ? Math.min(450, Math.max(220, remaining / Math.abs(velocity)))
      : undefined
    animateTo(target, duration)
  }, [animateTo, measurePositions])

  // Soltar o botão em qualquer lugar da página encerra o arraste (inclusive fora da lista)
  useEffect(() => {
    const onWindowPointerUp = (event: PointerEvent) => {
      if (drag.current && event.pointerId === drag.current.pointerId) finishDrag()
    }
    window.addEventListener('pointerup', onWindowPointerUp)
    window.addEventListener('pointercancel', onWindowPointerUp)
    window.addEventListener('blur', finishDrag)
    return () => {
      window.removeEventListener('pointerup', onWindowPointerUp)
      window.removeEventListener('pointercancel', onWindowPointerUp)
      window.removeEventListener('blur', finishDrag)
    }
  }, [finishDrag])

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<T>) => {
      const el = ref.current
      if (!el || event.pointerType !== 'mouse' || event.button !== 0) return
      stopAnimation()
      el.style.scrollSnapType = ''
      drag.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startLeft: el.scrollLeft,
        moved: false,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocity: 0,
      }
    },
    [stopAnimation],
  )

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const el = ref.current
      const state = drag.current
      if (!el || !state || event.pointerId !== state.pointerId) return

      // Sem o botão apertado não existe arraste: só passar o mouse nunca mexe na lista
      if ((event.buttons & 1) === 0) {
        finishDrag()
        return
      }

      const dx = event.clientX - state.startX
      if (!state.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return
        state.moved = true
        try {
          el.setPointerCapture(state.pointerId)
        } catch {
          // Ponteiro já liberado: segue sem captura
        }
        el.style.scrollSnapType = 'none'
        setIsDragging(true)
      }

      const now = performance.now()
      const dt = now - state.lastTime
      if (dt > 0) {
        // Média suavizada, para um tremido no fim não decidir a direção
        const instant = (event.clientX - state.lastX) / dt
        state.velocity = state.velocity * 0.6 + instant * 0.4
      }
      state.lastX = event.clientX
      state.lastTime = now

      el.scrollLeft = state.startLeft - dx
    },
    [finishDrag],
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
    /** Quantidade de paradas possíveis (uma bolinha para cada) */
    stops: positions.length,
    activeIndex,
    scrollByPage,
    scrollToIndex,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onLostPointerCapture: finishDrag,
      onMouseDown,
      onWheel,
    },
  }
}
