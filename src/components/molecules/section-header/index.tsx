import { Heading } from '@/components/atoms/heading'
import { Reveal } from '@/components/atoms/reveal'
import { cn } from '@/lib/cn'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  /** onDark: fundo escuro · onBrand: faixa verde */
  tone?: 'onDark' | 'onBrand'
  align?: 'start' | 'center'
  /** Anima a entrada (as faixas verdes do layout original não animam) */
  reveal?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  tone = 'onDark',
  align = 'start',
  reveal = true,
  className,
}: SectionHeaderProps) {
  const Wrapper = reveal ? Reveal : 'div'
  const centered = align === 'center'

  return (
    <header className={cn(centered && 'text-center', className)}>
      <Wrapper>
        <Heading>{title}</Heading>
      </Wrapper>
      {subtitle && (
        <Wrapper>
          <p
            className={cn(
              'mb-11 max-w-[640px]',
              centered && 'mx-auto',
              tone === 'onBrand' ? 'text-brand-ink' : 'text-fg-muted',
            )}
          >
            {subtitle}
          </p>
        </Wrapper>
      )}
    </header>
  )
}
