import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * O tailwind-merge precisa conhecer os tokens customizados (text-fg-muted, rounded-card...)
 * para resolver conflitos corretamente quando um componente recebe className de fora.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        'brand',
        'brand-strong',
        'brand-deep',
        'brand-ink',
        'surface',
        'surface-raised',
        'card',
        'chip',
        'ink',
        'white',
        'fg',
        'fg-soft',
        'fg-muted',
        'ink-soft',
        'line-subtle',
        'line-ghost',
        'line',
        'line-card',
        'line-divider',
        'line-strong',
        'line-chip',
        'line-tag',
      ],
      radius: ['card', 'photo'],
      shadow: ['card', 'float'],
      font: ['sans', 'display'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
