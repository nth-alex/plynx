import React, { ReactNode, AnchorHTMLAttributes, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSidebarContext } from '../Sidebar/SidebarContext'

interface NavItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  label: string
  href: string
  icon?: ReactNode
  badge?: number | string
  isActive?: boolean
}

export const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ label, href, icon, badge, isActive = false, className = '', ...props }, ref) => {
    const { collapsed } = useSidebarContext()
    const containerRef = useRef<HTMLDivElement>(null)
    const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null)

    if (collapsed) {
      const showTooltip = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setTooltipPos({ top: rect.top + rect.height / 2, left: rect.right + 8 })
        }
      }

      return (
        <div ref={containerRef} onMouseEnter={showTooltip} onMouseLeave={() => setTooltipPos(null)}>
          <a
            ref={ref}
            href={href}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'flex items-center justify-center px-0 py-2 w-full rounded-md',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive
                ? 'bg-accent/10 text-accent'
                : 'text-secondary hover:bg-border hover:text-foreground',
              className,
            ].join(' ')}
            {...props}
          >
            {icon ? (
              <span className="h-4 w-4 shrink-0" aria-hidden="true">{icon}</span>
            ) : (
              <span className="rounded px-1.5 py-0.5 text-xs font-semibold bg-accent/10 text-accent">
                {label.slice(0, 2)}
              </span>
            )}
          </a>
          {tooltipPos && createPortal(
            <div
              style={{ position: 'fixed', top: tooltipPos.top, left: tooltipPos.left, transform: 'translateY(-50%)' }}
              className="pointer-events-none z-50"
            >
              <span
                role="tooltip"
                className="block animate-tooltip-in whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background"
              >
                {label}
              </span>
            </div>,
            document.body
          )}
        </div>
      )
    }

    return (
      <a
        ref={ref}
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={[
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          isActive
            ? 'bg-accent/10 text-accent'
            : 'text-secondary hover:bg-border hover:text-foreground',
          className,
        ].join(' ')}
        {...props}
      >
        {icon && (
          <span className="h-4 w-4 shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex-1 truncate">{label}</span>
        {badge !== undefined && (
          <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">
            {badge}
          </span>
        )}
      </a>
    )
  }
)

NavItem.displayName = 'NavItem'
