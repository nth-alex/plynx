import React, { ReactNode } from 'react'

type CardVariant = 'default' | 'elevated'

export interface CardProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  variant?: CardVariant
  className?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, header, footer, variant = 'default', className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          'rounded-lg border border-border bg-background overflow-hidden',
          variant === 'elevated' ? 'shadow-md' : '',
          className,
        ].filter(Boolean).join(' ')}
      >
        {header !== undefined && (
          <div className="border-b border-border px-6 py-4">
            {typeof header === 'string' ? (
              <h3 className="text-base font-semibold text-foreground">{header}</h3>
            ) : (
              header
            )}
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer !== undefined && (
          <div className="border-t border-border px-6 py-4 text-sm text-secondary">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'
