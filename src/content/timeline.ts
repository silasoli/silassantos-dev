import { sectionIds } from './sections'
import type { SectionCopy, TimelineEntry } from './types'

export const timelineCopy: SectionCopy = {
  id: sectionIds.trajetoria,
  title: 'Minha trajetória',
  subtitle: 'De júnior a sênior e Tech Leader, sempre com Node.js no centro.',
}

/** Sem nomes de empresas (mesma regra do README). Fonte da verdade: currículo. */
export const timeline: TimelineEntry[] = [
  {
    period: '2021 – 2022',
    level: 'Estágio → Júnior',
    title: 'Desenvolvedor Back-End',
    activities: [
      'APIs REST com NestJS, TypeScript, MongoDB e Jest',
      'Importação de dados e geração de arquivos CSV/Excel',
      'Comunicação em tempo real com WebSockets',
    ],
  },
  {
    period: '2022 – 2023',
    level: 'Júnior',
    title: 'Desenvolvedor Full Stack',
    activities: [
      'APIs com TypeScript, TypeORM e PostgreSQL',
      'Deploy em Kubernetes no Google Cloud com CI/CD',
      'Migração de RethinkDB para PostgreSQL',
      'Mentoria de desenvolvedores juniores',
    ],
  },
  {
    period: '2023 – 2024',
    level: 'Pleno',
    title: 'Desenvolvedor Full Stack',
    activities: [
      'Microsserviços voltados a alta disponibilidade',
      'Processamento de grandes volumes de arquivos e dados',
      'Módulos de autenticação, segurança e KPIs financeiros',
    ],
  },
  {
    period: '2024 – 2025',
    level: 'Pleno · Tech Leader',
    title: 'Desenvolvedor Full Stack',
    activities: [
      'Migração de monólito para microsserviços',
      'Integração com gateways de pagamento',
      'Refatoração do cashout com ganho de performance',
      'Liderança técnica: sprints, estimativas e code review',
    ],
  },
  {
    period: '2024 – 2025',
    level: 'Sênior',
    title: 'Desenvolvedor Full Stack',
    activities: [
      'Microsserviços serverless na AWS',
      'BFFs com NestJS e Clean Architecture',
      'Integrações com Fiserv, FIS e Matera',
      'Interfaces em React.js com Atomic Design',
    ],
  },
  {
    period: '2025 – 2026',
    level: 'Sênior',
    title: 'Desenvolvedor Full Stack',
    activities: [
      'Plataforma de pagamentos multi-tenant (Pix, saques, depósitos, cartão)',
      'Integrações Pix (SPB/DICT), MED e processamento assíncrono',
      'Arquitetura CQRS e resolução de incidentes em produção',
      'Expansão da plataforma para o México (SPEI)',
    ],
  },
  {
    period: '2026',
    level: 'Sênior · Part-time',
    title: 'Desenvolvedor Full Stack',
    activities: [
      'Liderança do desenvolvimento dos projetos MeanTime e Avelloz',
      'Definições técnicas e organização das entregas',
      'Code review e acompanhamento do time',
    ],
  },
]
