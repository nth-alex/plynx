import React, { ReactNode } from 'react'

interface DashboardLayoutProps {
  sidebar: ReactNode
  header?: ReactNode
  children: ReactNode
  className?: string
}

export function DashboardLayout({ sidebar, header, children, className = '' }: DashboardLayoutProps) {
  return (
    <div className={`flex h-screen w-full overflow-hidden bg-background ${className}`}>
      {sidebar}
      <div className="flex flex-1 flex-col overflow-hidden">
        {header}
        {children}
      </div>
    </div>
  )
}
