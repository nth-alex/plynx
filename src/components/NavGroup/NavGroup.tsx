import { ReactNode } from 'react'

interface NavGroupProps {
  label: string
  children: ReactNode
  className?: string
}

export function NavGroup({ label, children, className = '' }: NavGroupProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
        {label}
      </p>
      {children}
    </div>
  )
}
