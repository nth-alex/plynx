import React, { ReactNode } from 'react'
import type { Status } from '../../types'

interface AlertProps {
  status: Status
  title?: string
  children: ReactNode
  onDismiss?: () => void
  className?: string
}

const alertStyles: Record<Status, { bg: string; border: string; icon: string }> = {
  success: { bg: 'bg-success/10', border: 'border-success/30', icon: '✓' },
  warning: { bg: 'bg-warning/10', border: 'border-warning/30', icon: '⚠' },
  error:   { bg: 'bg-error/10',   border: 'border-error/30',   icon: '✕' },
  info:    { bg: 'bg-info/10',    border: 'border-info/30',    icon: 'ℹ' },
}

const textStyles: Record<Status, string> = {
  success: 'text-success',
  warning: 'text-warning',
  error:   'text-error',
  info:    'text-info',
}

export function Alert({ status, title, children, onDismiss, className = '' }: AlertProps) {
  const styles = alertStyles[status]

  return (
    <div
      role="alert"
      className={[
        'flex gap-3 rounded-lg border p-4',
        styles.bg,
        styles.border,
        className,
      ].join(' ')}
    >
      <span className={`shrink-0 text-sm font-bold ${textStyles[status]}`} aria-hidden="true">
        {styles.icon}
      </span>
      <div className="flex-1">
        {title && (
          <p className={`mb-1 text-sm font-semibold ${textStyles[status]}`}>{title}</p>
        )}
        <div className="text-sm text-foreground">{children}</div>
      </div>
      {onDismiss && (
        <button
          aria-label="Dismiss"
          onClick={onDismiss}
          className={`shrink-0 text-sm opacity-60 hover:opacity-100 transition-opacity ${textStyles[status]}`}
        >
          ✕
        </button>
      )}
    </div>
  )
}
