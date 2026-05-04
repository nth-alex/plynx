import {ReactNode, useState} from "react"
import {PanelLeftClose, PanelLeftOpen} from "lucide-react"
import {SidebarContext} from "./SidebarContext"

interface SidebarProps {
  children: ReactNode
  logo?: ReactNode
  footer?: ReactNode
  className?: string
}

export function Sidebar({children, logo, footer, className = ""}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarContext.Provider value={{collapsed}}>
      <aside
        data-collapsed={collapsed}
        className={[
          "flex flex-col bg-background transition-all duration-200",
          collapsed ? "w-16" : "w-56",
          className,
        ].join(" ")}
      >
        {logo && (
          <div
            className={[
              "flex items-center border-border px-4 py-4",
              collapsed ? "justify-center" : "justify-between",
            ].join(" ")}
          >
            {logo}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-2 py-4">{children}</nav>

        {!collapsed && footer && <div className="border-t border-border px-4 py-4 text-sm">{footer}</div>}

        <div className="border-border px-2 py-3">
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((c) => !c)}
            className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-secondary transition-colors duration-150 hover:bg-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {collapsed ? (
              <PanelLeftOpen size={16} aria-hidden="true" />
            ) : (
              <PanelLeftClose size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </aside>
    </SidebarContext.Provider>
  )
}
