import type { FocusArea, SectionCopy } from './types'

export const focusCopy: SectionCopy = {
  title: 'O que eu faço',
  subtitle: 'As áreas em que tenho mais experiência.',
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Pagamentos',
    description:
      'Plataformas multi-tenant com Pix, saques, depósitos e cartão, integradas a gateways e instituições financeiras.',
  },
  {
    title: 'Arquitetura',
    description:
      'Microsserviços, migração de monólitos, CQRS, BFFs, Clean Architecture e mensageria com RabbitMQ.',
  },
  {
    title: 'Produção',
    description:
      'Linha de frente em incidentes: gargalos, deadlocks, reprocessamento de filas e planos pós-incidente.',
  },
  {
    title: 'Liderança',
    description:
      'Tech Leader em pequenos times: sprints, estimativas, code review e mentoria de juniores.',
  },
]
