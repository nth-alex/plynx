import { ReactNode } from 'react'

interface DashboardLayoutProps {
  sidebar: ReactNode
  children: ReactNode
  className?: string
}

export function DashboardLayout({ sidebar, children, className = '' }: DashboardLayoutProps) {
  return (
    <div className={`flex h-screen w-full overflow-hidden bg-background ${className}`}>
      {sidebar}
      <div className="flex flex-1 flex-col overflow-hidden py-3 pr-3">
        {children}
      </div>
    </div>
  )
}
