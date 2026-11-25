import { cn } from '@/lib/cn'

export interface DevIconProps {
  /** Nome do ícone no Devicon sem o prefixo, ex.: "nodejs-plain colored" */
  name: string
  className?: string
}

/** Ícone de tecnologia via Devicon (CSS carregado no index.html) */
export function DevIcon({ name, className }: DevIconProps) {
  return <i aria-hidden="true" className={cn(`devicon-${name}`, 'text-[1.1rem]', className)} />
}
