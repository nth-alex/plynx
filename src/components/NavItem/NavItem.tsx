import React, { ReactNode, AnchorHTMLAttributes } from 'react'

interface NavItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  label: string
  href: string
  icon?: ReactNode
  badge?: number | string
  isActive?: boolean
}

export const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ label, href, icon, badge, isActive = false, className = '', ...props }, ref) => {
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
