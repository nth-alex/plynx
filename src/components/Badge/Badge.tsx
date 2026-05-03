import { ReactNode } from 'react'
import type { Status } from '../../types'

type BadgeVariant = 'default' | 'outline'

interface BadgeProps {
  children: ReactNode
  status?: Status
  variant?: BadgeVariant
  dot?: boolean
  className?: string
}

const statusClasses: Record<Status, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error:   'bg-error/10 text-error',
  info:    'bg-info/10 text-info',
}

const statusDotClasses: Record<Status, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error:   'bg-error',
  info:    'bg-info',
}

export function Badge({ children, status, variant = 'default', dot = false, className = '' }: BadgeProps) {
  const colorClasses = status ? statusClasses[status] : 'bg-border text-secondary'

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'outline' ? `border ${colorClasses.replace(/bg-[^ ]+/, '')} border-current` : colorClasses,
        className,
      ].join(' ')}
    >
      {dot && status && (
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${statusDotClasses[status]}`}
        />
      )}
      {children}
    </span>
  )
}
