import { ReactNode, useState } from 'react'
import { SidebarContext } from './SidebarContext'

interface SidebarProps {
  children: ReactNode
  logo?: ReactNode
  footer?: ReactNode
  className?: string
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export function Sidebar({ children, logo, footer, className = '' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed }}>
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
          {children}
        </nav>

        {!collapsed && footer && (
          <div className="border-t border-border px-4 py-4 text-sm">
            {footer}
          </div>
        )}

        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center justify-start border-t border-border px-4 py-3 text-secondary hover:bg-border hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </aside>
    </SidebarContext.Provider>
  )
}
