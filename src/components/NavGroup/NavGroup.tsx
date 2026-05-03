import { ReactNode, useState } from 'react'
import { useSidebarContext } from '../Sidebar/SidebarContext'

interface NavGroupProps {
  label: string
  children: ReactNode
  className?: string
}

export function NavGroup({ label, children, className = '' }: NavGroupProps) {
  const { collapsed } = useSidebarContext()
  const [open, setOpen] = useState(true)

  if (collapsed) return null

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary hover:text-foreground transition-colors w-full"
        aria-expanded={open}
      >
        <span>{label}</span>
        <span aria-hidden="true">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="border-l border-border ml-3 pl-3 flex flex-col gap-1">
          {children}
        </div>
      )}
    </div>
  )
}
