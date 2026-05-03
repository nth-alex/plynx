import React, { InputHTMLAttributes, ReactNode, useId } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  hint?: ReactNode
  helpText?: ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = false, hint, helpText, disabled, className = '', ...props }, ref) => {
    const id = useId()
    const descriptionId = (error && hint) || (!error && helpText) ? `${id}-description` : undefined

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={descriptionId}
          className={[
            'w-full rounded-md border bg-background px-3 py-2 text-foreground',
            'text-sm transition-colors duration-150',
            'placeholder:text-secondary',
            'focus:outline-none focus:ring-2 focus:ring-accent',
            error
              ? 'border-error focus:ring-error'
              : 'border-border',
            disabled ? 'cursor-not-allowed opacity-50' : '',
            className,
          ].filter(Boolean).join(' ')}
          {...props}
        />
        {error && hint && (
          <span id={`${id}-description`} className="text-xs text-error">{hint}</span>
        )}
        {!error && helpText && (
          <span id={`${id}-description`} className="text-xs text-secondary">{helpText}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
