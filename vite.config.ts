import { resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

/**
 * Endereço público do site, usado nas metas de compartilhamento (og:image, og:url, canonical),
 * que precisam de URL absoluta para o LinkedIn e o WhatsApp mostrarem a prévia.
 * Ordem: SITE_URL (.env ou variável de ambiente) → domínio de produção que a Vercel expõe no build.
 * Sem nenhum dos dois (rodando local), as metas ficam com caminho relativo.
 */
function resolveSiteUrl(env: Record<string, string>) {
  const vercelDomain = env.VERCEL_PROJECT_PRODUCTION_URL
  const url = env.SITE_URL || (vercelDomain ? `https://${vercelDomain}` : '')
  return url.replace(/\/+$/, '')
}

/**
 * Troca %SITE_URL% nos HTMLs pelo endereço público. Sem endereço, remove canonical e og:url
 * (um href="/" relativo não tem utilidade e o Vite tentaria tratá-lo como arquivo).
 */
function siteUrlPlugin(siteUrl: string): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => {
        const withoutAbsoluteOnlyTags = siteUrl
          ? html
          : html
              .replace(/^\s*<link rel="canonical"[^>]*>\n/m, '')
              .replace(/^\s*<meta property="og:url"[^>]*>\n/m, '')
        return withoutAbsoluteOnlyTags.replaceAll('%SITE_URL%', siteUrl)
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  // Prefixo '' carrega todas as variáveis (.env e ambiente), não só as VITE_*
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      siteUrlPlugin(resolveSiteUrl(env)),
      // Gera src/routeTree.gen.ts a partir de src/routes
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      viteReact(),
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          // A Vercel serve o 404.html com status 404 para qualquer endereço que não existe
          notFound: resolve(import.meta.dirname, '404.html'),
        },
      },
    },
  }
})
