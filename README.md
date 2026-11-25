# SILAS santos .DEV

Site pessoal e portfólio de **Silas Santos**, desenvolvedor Back-End / Full Stack Sênior.

Migrado de HTML estático para React com atomic design.

## Stack

- **Vite 7**, **React 19** e **TypeScript** (strict)
- **Tailwind CSS v4**, com tokens da marca em `src/styles/tokens.css`
- **class-variance-authority**, **tailwind-merge** e **Radix Slot** para as variantes dos componentes (padrão shadcn/ui)
- **TanStack Router** (rotas por arquivo em `src/routes`)
- **ESLint** e **Prettier**
- Deploy na **Vercel** pela integração Git (painel da Vercel)

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera dist/ e checa os tipos
npm run lint
npm run format   # confere a formatação (format:write corrige)
```

## Estrutura (atomic design)

```
src/
├── styles/
│   ├── tokens.css        # 0. Tokens: cores, fontes, raios, sombras, breakpoints, animações
│   └── globals.css       #    Tailwind + estilos base
├── components/
│   ├── atoms/            # 1. Peças indivisíveis: Button, Badge, Chip, Heading, Wave, Logo, Reveal...
│   ├── molecules/        # 2. Combinações de átomos: ProjectCard, TimelineItem, PhotoFrame, NavLinks...
│   ├── organisms/        # 3. Seções completas: SiteHeader, Hero, TimelineSection, ProjectsSection...
│   └── templates/        # 4. Esqueleto da página: OnePageTemplate (topo + main + rodapé)
├── pages/                # 5. Template + organismos + conteúdo (único lugar que importa src/content)
├── content/              #    Textos e dados tipados: perfil, trajetória, stack, projetos, formação, contato
├── routes/               #    Rotas do TanStack Router (só apontam para as páginas)
├── hooks/                #    useInView (animação de entrada)
└── lib/                  #    cn() = clsx + tailwind-merge configurado com os tokens
```

### Regras

1. **Cada camada só importa das camadas de baixo.** Átomo não importa molécula, molécula não importa organismo.
2. **Componentes não conhecem o conteúdo.** Recebem tudo por props (inclusive ids de seção e links), e só `pages/` importa `src/content`. Assim dá para escrever teste e story de qualquer componente com dados falsos.
3. **Nada de cor solta.** Toda cor vem de um token (`bg-brand`, `text-fg-muted`, `border-line-card`...). Se faltar uma, ela nasce em `tokens.css` e é registrada em `src/lib/cn.ts`.
4. **Variantes com `cva`**, tipadas, em vez de montar nomes de classe com strings.
5. **Uma pasta por componente**, com `index.tsx`. Testes (`index.test.tsx`) e stories (`index.stories.tsx`) ficam ao lado.

## Como editar o conteúdo

Os textos ficam em `src/content/`. Para trocar um projeto, uma data ou um texto, edite só o arquivo correspondente:

| Arquivo | Seção |
| --- | --- |
| `profile.ts` | Topo, menu, redes sociais e rodapé |
| `timeline.ts` | Minha trajetória |
| `focus-areas.ts` | O que eu faço |
| `stack.ts` | Stack |
| `projects.ts` | Meus projetos |
| `education.ts` | Formação |
| `contact.ts` | Contato |
| `sections.ts` | Ids das seções (usados no HTML, no menu e nos botões) |

Arquivos estáticos ficam em `public/`: `curriculo.pdf`, `img/foto.jpg`, ícones e `og-image.png`.

> Não coloque arquivos em `public/assets/`: essa pasta é dos arquivos com hash que o Vite gera e fica em cache por 1 ano. Um arquivo trocado ali continuaria aparecendo na versão antiga.

## Página 404

O `404.html` (entrada em `src/not-found.tsx`) é gerado no build. A Vercel serve esse arquivo, com status 404, em qualquer endereço que não existe. A mesma `NotFoundPage` é o `notFoundComponent` do router.

## Prévia de compartilhamento (LinkedIn, WhatsApp)

As metas `og:image`, `og:url` e `canonical` precisam de URL absoluta. No build, o `%SITE_URL%` do `index.html` é trocado por:

1. `SITE_URL`, se estiver definido (no `.env` ou nas variáveis de ambiente da Vercel), ou
2. o domínio de produção do projeto na Vercel (`VERCEL_PROJECT_PRODUCTION_URL`, que a Vercel expõe no build).

Com domínio próprio, defina `SITE_URL` na Vercel (veja `.env.example`). Rodando local sem `SITE_URL`, as metas ficam relativas.

## Deploy (Vercel)

O deploy é feito pela integração Git da Vercel, configurada no painel (não há GitHub Actions).

1. No painel da Vercel: **Add New → Project**, importe este repositório do GitHub. O `vercel.json` já define framework (Vite), comando de build (`npm run build`) e pasta de saída (`dist`).
2. Push na `main` publica em produção. Push em outras branches e PRs geram deploys de preview.
3. Domínio próprio (opcional): adicione em **Settings → Domains** e defina `SITE_URL` em **Settings → Environment Variables** (veja a seção de prévia de compartilhamento acima).

O build da Vercel roda `vite build && tsc --noEmit`: erro de tipo bloqueia o deploy. Lint e Prettier não rodam na Vercel, então rode `npm run lint` e `npm run format` antes do push.
