import { sectionIds } from './sections'
import type { Project, SectionCopy } from './types'

export const projectsCopy: SectionCopy = {
  id: sectionIds.projetos,
  title: 'Meus projetos',
  subtitle: 'Alguns projetos pessoais. O código de todos está no GitHub.',
}

/** Mesmos projetos em destaque no README do GitHub */
export const projects: Project[] = [
  {
    name: 'users-import-devops-k8s',
    description:
      'API de usuários com importação assíncrona via RabbitMQ, cache com Redis e idempotência, deploy em Kubernetes, observabilidade com Prometheus/Grafana e testes de carga com k6.',
    tags: ['NestJS', 'RabbitMQ', 'MongoDB', 'Redis', 'Kubernetes', 'GitHub Actions'],
    repoUrl: 'https://github.com/silasoli/users-import-devops-k8s',
  },
  {
    name: 'opencommerce-api',
    description:
      'API de e-commerce com pedidos, produtos e integrações com Asaas (pagamentos), Nuvemshop, Melhor Envio e ViaCEP.',
    tags: ['NestJS', 'PostgreSQL', 'TypeORM', 'Docker', 'GitHub Actions'],
    repoUrl: 'https://github.com/silasoli/opencommerce-api',
  },
  {
    name: 'your-lib-api',
    description:
      'Gerenciador de biblioteca pessoal: livros, empréstimos e lista de espera com notificações por e-mail.',
    tags: ['NestJS', 'MongoDB', 'Docker', 'GitHub Actions'],
    repoUrl: 'https://github.com/silasoli/your-lib-api',
  },
  {
    name: 'easy-budget-api',
    description: 'MVP que padroniza a criação de orçamentos para o setor de construção civil.',
    tags: ['NestJS', 'MongoDB', 'JWT', 'Swagger'],
    repoUrl: 'https://github.com/silasoli/easy-budget-api',
  },
]
