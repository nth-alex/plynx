import { ReactNode } from 'react'

interface Breadcrumb {
  label: string
  href?: string
}

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  breadcrumbs?: Breadcrumb[]
  className?: string
}

export function Header({ title, subtitle, actions, breadcrumbs, className = '' }: HeaderProps) {
  return (
    <header
      className={[
        'border-b border-border bg-background px-6 py-4',
        className,
      ].join(' ')}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex items-center gap-1 text-xs text-secondary">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1">
                {idx > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-foreground transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-secondary">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  )
}
