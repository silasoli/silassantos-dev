/**
 * Ids das seções da página: única fonte para os ids no HTML, o menu e os botões que rolam até
 * uma seção. Renomear aqui atualiza tudo, e um id que não existe vira erro de TypeScript.
 */
export const sectionIds = {
  inicio: 'inicio',
  trajetoria: 'trajetoria',
  stack: 'stack',
  projetos: 'projetos',
  formacao: 'formacao',
  contato: 'contato',
} as const

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds]

export type SectionHref = `#${SectionId}`

/** Link para uma seção da página, ex.: anchor('contato') → '#contato' */
export function anchor(id: SectionId): SectionHref {
  return `#${id}`
}
