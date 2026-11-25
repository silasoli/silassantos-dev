import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { NotFoundPage } from '@/pages/not-found'
import './styles/globals.css'

/** Entrada do 404.html: a Vercel serve este arquivo, com status 404, em endereços que não existem */
const rootElement = document.getElementById('app')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <NotFoundPage />
    </StrictMode>,
  )
}
