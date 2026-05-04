import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useSidebarContext } from '../Sidebar/SidebarContext'

interface NavGroupProps {
  label: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  defaultOpen?: boolean
}

export function NavGroup({ label, icon, children, className = '', defaultOpen = true }: NavGroupProps) {
  const { collapsed } = useSidebarContext()
  const [open, setOpen] = useState(defaultOpen)

  if (collapsed) return <>{children}</>

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={[
          'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          open
            ? 'bg-border text-foreground'
            : 'text-secondary hover:bg-border hover:text-foreground',
        ].join(' ')}
      >
        {icon && (
          <span className="h-4 w-4 shrink-0" aria-hidden="true">{icon}</span>
        )}
        <span className="flex-1 truncate text-left">{label}</span>
        {open
          ? <ChevronDown size={16} aria-hidden="true" />
          : <ChevronRight size={16} aria-hidden="true" />
        }
      </button>
      {open && (
        <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
          {children}
        </div>
      )}
    </div>
  )
}
