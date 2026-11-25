import { sectionIds } from './sections'
import type { EducationGroup, SectionCopy } from './types'

export const educationCopy: SectionCopy = {
  id: sectionIds.formacao,
  title: 'Formação',
}

export const education: EducationGroup[] = [
  {
    title: 'Acadêmica',
    items: [
      {
        title: 'Pós-graduação em Arquitetura de Sistemas',
        detail: 'Instituto Infnet · em andamento, previsão 2027',
      },
      { title: 'Graduação em Sistemas de Informação', detail: 'Rede UniFTC · 2025' },
      { title: 'Técnico em Análise e Desenvolvimento de Sistemas', detail: 'SENAI · 2020' },
    ],
  },
  {
    title: 'Cursos',
    items: [
      { title: 'Node.js Microservices: NestJS, RabbitMQ and Cloud Services', detail: 'Udemy' },
      { title: 'NestJS do Zero com TypeORM, Mongoose, Prisma e Swagger', detail: 'Udemy' },
      { title: 'Unit Testing for TypeScript & Node.js Developers with Jest', detail: 'Udemy' },
      { title: 'Descubra a Nuvem AWS', detail: 'DIO' },
      { title: 'Oficina: API de CRUD com NestJS e MongoDB', detail: 'Ministrante · UniFTC' },
    ],
  },
]
