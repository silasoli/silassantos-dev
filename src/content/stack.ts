import { sectionIds } from './sections'
import type { SectionCopy, StackGroup } from './types'

export const stackCopy: SectionCopy = {
  id: sectionIds.stack,
  title: 'Stack',
  subtitle: 'Tecnologias que uso no dia a dia.',
}

/**
 * Só o que o Silas usa (mesma lista do currículo e do README). Não adicionar: Go, ArgoCD, Kafka,
 * GraphQL, Express, React Native. Java e Spring Boot entraram em 27/11/2026 (projeto Avelloz).
 */
export const stackGroups: StackGroup[] = [
  {
    title: 'Linguagens e frameworks',
    items: [
      { name: 'Node.js', icon: 'nodejs-plain colored' },
      { name: 'TypeScript', icon: 'typescript-plain colored' },
      { name: 'JavaScript', icon: 'javascript-plain colored' },
      { name: 'NestJS', icon: 'nestjs-original colored' },
      { name: 'React.js', icon: 'react-original colored' },
      { name: 'Java', icon: 'java-plain colored' },
      { name: 'Spring Boot', icon: 'spring-original colored' },
    ],
  },
  {
    title: 'Bancos de dados e ORMs',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql-plain colored' },
      { name: 'MongoDB', icon: 'mongodb-plain colored' },
      { name: 'Redis', icon: 'redis-plain colored' },
      { name: 'DynamoDB', icon: 'dynamodb-plain colored' },
      { name: 'BigQuery', icon: 'googlecloud-plain colored' },
      { name: 'Prisma', icon: 'prisma-original' },
      { name: 'TypeORM' },
    ],
  },
  {
    title: 'Arquitetura e mensageria',
    items: [
      { name: 'RabbitMQ', icon: 'rabbitmq-original colored' },
      { name: 'OpenAPI / Swagger', icon: 'swagger-plain colored' },
      { name: 'Microsserviços' },
      { name: 'Clean Architecture' },
      { name: 'CQRS' },
      { name: 'BFF' },
      { name: 'REST' },
      { name: 'WebSockets' },
      { name: 'Serverless' },
    ],
  },
  {
    title: 'Cloud, DevOps e testes',
    items: [
      { name: 'AWS', icon: 'amazonwebservices-plain-wordmark colored' },
      { name: 'Google Cloud', icon: 'googlecloud-plain colored' },
      { name: 'Docker', icon: 'docker-plain colored' },
      { name: 'Kubernetes', icon: 'kubernetes-plain colored' },
      { name: 'GitHub Actions', icon: 'githubactions-plain colored' },
      { name: 'Git', icon: 'git-plain colored' },
      { name: 'Jest', icon: 'jest-plain colored' },
      { name: 'Supertest' },
    ],
  },
  {
    title: 'Observabilidade e testes de carga',
    items: [
      { name: 'Prometheus', icon: 'prometheus-original colored' },
      { name: 'Grafana', icon: 'grafana-plain colored' },
      { name: 'k6', icon: 'k6-plain colored' },
    ],
  },
]
