import { buttonVariants } from '@/components/atoms/button'
import { Heading } from '@/components/atoms/heading'
import { Logo } from '@/components/atoms/logo'

/**
 * Usada em dois lugares: no 404.html estático (status 404 de verdade na Vercel) e como
 * notFoundComponent do router. Por isso usa <a> comum e não o Link do TanStack Router.
 */
export function NotFoundPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <Logo href="/" />
        <Heading as="h1" size="section" className="text-brand">
          Página não encontrada
        </Heading>
        <p className="text-fg-muted">O endereço que você abriu não existe neste site.</p>
        <a href="/" className={buttonVariants()}>
          Voltar para o início
        </a>
      </div>
    </main>
  )
}
