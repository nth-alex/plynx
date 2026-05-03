import { ReactNode } from 'react'

interface PageContentProps {
  children: ReactNode
  padding?: boolean
  className?: string
}

export function PageContent({ children, padding = true, className = '' }: PageContentProps) {
  return (
    <main
      className={[
        'flex-1 overflow-y-auto bg-background',
        padding ? 'p-6' : '',
        className,
      ].join(' ')}
    >
      {children}
    </main>
  )
}
