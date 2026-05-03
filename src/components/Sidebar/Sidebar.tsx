import React, { ReactNode, useState } from 'react'

interface SidebarProps {
  children: ReactNode
  logo?: ReactNode
  footer?: ReactNode
  className?: string
}

export function Sidebar({ children, logo, footer, className = '' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      data-collapsed={collapsed}
      className={[
        'flex flex-col border-r border-border bg-background transition-all duration-200',
        collapsed ? 'w-16' : 'w-56',
        className,
      ].join(' ')}
    >
      {logo && (
        <div className={['flex items-center border-b border-border px-4 py-4', collapsed ? 'justify-center' : ''].join(' ')}>
          {logo}
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {!collapsed && children}
      </nav>

      {footer && !collapsed && (
        <div className="border-t border-border px-4 py-4 text-sm">
          {footer}
        </div>
      )}

      <button
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-center border-t border-border py-3 text-secondary hover:bg-border hover:text-foreground transition-colors"
      >
        {collapsed ? '→' : '←'}
      </button>
    </aside>
  )
}
