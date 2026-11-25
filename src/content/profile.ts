import { anchor, sectionIds } from './sections'
import type { NavItem, Profile, SocialLink } from './types'

export const profile: Profile = {
  name: 'Silas Santos',
  greeting: 'Prazer, eu sou',
  role: 'Desenvolvedor Back-End / Full Stack Sênior',
  lead:
    'Desenvolvo desde 2021 com Node.js, NestJS e TypeScript no back-end e React.js no front-end. ' +
    'Tenho experiência com sistemas de pagamento, microsserviços, mensageria e cloud, além de atuação ' +
    'como Tech Leader e mentoria de desenvolvedores.',
  availability: 'Disponível para novas oportunidades · Remoto',
  photo: {
    src: '/img/foto.jpg',
    alt: 'Foto de Silas Santos',
    initials: 'SS',
  },
  highlight: { value: '5+ anos', label: 'desenvolvendo com Node.js' },
  resume: {
    href: '/curriculo.pdf',
    fileName: 'Silas_Santos_Curriculo.pdf',
  },
}

export const navigation: NavItem[] = [
  { label: 'Trajetória', href: anchor(sectionIds.trajetoria) },
  { label: 'Stack', href: anchor(sectionIds.stack) },
  { label: 'Projetos', href: anchor(sectionIds.projetos) },
  { label: 'Formação', href: anchor(sectionIds.formacao) },
  { label: 'Contato', href: anchor(sectionIds.contato) },
]

/** Redes que aparecem no topo (sem Instagram, por decisão) */
export const headerSocials: SocialLink[] = [
  { network: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/silasoli/' },
  { network: 'github', label: 'GitHub', href: 'https://github.com/silasoli' },
]

export const footer = {
  owner: 'Silas Santos',
}
