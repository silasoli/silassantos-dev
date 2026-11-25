/**
 * Tipos do conteúdo do site. Os textos ficam em src/content e os componentes só recebem dados:
 * para mudar um texto, data ou projeto, não precisa mexer em componente nenhum.
 */

import type { SectionHref, SectionId } from './sections'

export interface NavItem {
  label: string
  href: SectionHref
}

export type SocialNetwork = 'linkedin' | 'github' | 'whatsapp'

export interface SocialLink {
  network: SocialNetwork
  label: string
  href: string
}

export interface Profile {
  name: string
  greeting: string
  role: string
  lead: string
  availability: string
  photo: { src: string; alt: string; initials: string }
  highlight: { value: string; label: string }
  resume: {
    href: string
    /** Nome do arquivo baixado: precisa identificar o candidato na pasta do recrutador */
    fileName: string
  }
}

export interface TimelineEntry {
  period: string
  level: string
  title: string
  activities: string[]
}

export interface FocusArea {
  title: string
  description: string
}

export interface StackItem {
  name: string
  /** Classe do Devicon sem o prefixo "devicon-", ex.: "nodejs-plain colored" */
  icon?: string
}

export interface StackGroup {
  title: string
  items: StackItem[]
}

export interface Project {
  name: string
  description: string
  tags: string[]
  repoUrl: string
}

export interface EducationItem {
  title: string
  detail: string
}

export interface EducationGroup {
  title: string
  items: EducationItem[]
}

export type ContactKind = 'email' | 'linkedin' | 'whatsapp'

export interface ContactChannel {
  kind: ContactKind
  label: string
  value: string
  href: string
  external?: boolean
}

export interface SectionCopy {
  id?: SectionId
  title: string
  subtitle?: string
}
