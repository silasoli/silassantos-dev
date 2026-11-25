import { sectionIds } from './sections'
import type { ContactChannel, SectionCopy } from './types'

export const contactCopy: SectionCopy = {
  id: sectionIds.contato,
  title: 'Entre em contato',
  subtitle: 'Disponível para oportunidades remotas, CLT ou PJ. Vamos conversar?',
}

export const contactChannels: ContactChannel[] = [
  {
    kind: 'email',
    label: 'E-mail',
    value: 'silasoliv39@gmail.com',
    href: 'mailto:silasoliv39@gmail.com',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    value: 'in/silasoli',
    href: 'https://www.linkedin.com/in/silasoli/',
    external: true,
  },
  {
    kind: 'whatsapp',
    label: 'WhatsApp',
    value: '(75) 99138-3124',
    href: 'https://wa.me/5575991383124',
    external: true,
  },
]
