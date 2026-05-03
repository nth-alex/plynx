# Sidebar Menu Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add collapsed icon/initial mode with tooltips to NavItem, collapsible sections with hierarchy lines to NavGroup, and fix the Sidebar collapse toggle button alignment and icon.

**Architecture:** Introduce `SidebarContext` carrying `collapsed: boolean`; `Sidebar` provides it via a context provider wrapping its children; `NavItem` and `NavGroup` consume it via `useSidebarContext()`. Each component handles its own collapsed rendering internally. No breaking API changes.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest, @testing-library/react, @testing-library/user-event

---

## Files

| Action | Path |
|--------|------|
| Create | `src/components/Sidebar/SidebarContext.tsx` |
| Create | `src/components/Sidebar/SidebarContext.test.tsx` |
| Modify | `src/components/Sidebar/Sidebar.tsx` |
| Modify | `src/components/Sidebar/Sidebar.test.tsx` |
| Modify | `src/components/NavItem/NavItem.tsx` |
| Modify | `src/components/NavItem/NavItem.test.tsx` |
| Modify | `src/components/NavGroup/NavGroup.tsx` |
| Modify | `src/components/NavGroup/NavGroup.test.tsx` |

---

### Task 1: SidebarContext

**Files:**
- Create: `src/components/Sidebar/SidebarContext.tsx`
- Create: `src/components/Sidebar/SidebarContext.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/Sidebar/SidebarContext.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSidebarContext } from './SidebarContext'

describe('useSidebarContext', () => {
  it('throws when used outside a Sidebar', () => {
    expect(() => renderHook(() => useSidebarContext())).toThrow(
      'useSidebarContext must be used within a Sidebar'
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Sidebar/SidebarContext.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create SidebarContext.tsx**

Create `src/components/Sidebar/SidebarContext.tsx`:

```tsx
import { createContext, useContext } from 'react'

interface SidebarContextValue {
  collapsed: boolean
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebarContext(): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebarContext must be used within a Sidebar')
  return ctx
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/Sidebar/SidebarContext.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Sidebar/SidebarContext.tsx src/components/Sidebar/SidebarContext.test.tsx
git commit -m "feat: add SidebarContext with useSidebarContext hook"
```

---

### Task 2: Update Sidebar — provide context and fix toggle button

**Files:**
- Modify: `src/components/Sidebar/Sidebar.tsx`
- Modify: `src/components/Sidebar/Sidebar.test.tsx`

- [ ] **Step 1: Write the failing test**

Add this test inside the `describe('Sidebar', ...)` block in `src/components/Sidebar/Sidebar.test.tsx`:

```tsx
it('children remain in DOM when sidebar is collapsed', async () => {
  render(
    <Sidebar>
      <span data-testid="child">content</span>
    </Sidebar>,
    { wrapper: Wrapper }
  )
  await userEvent.click(screen.getByRole('button', { name: /collapse/i }))
  expect(screen.getByTestId('child')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Sidebar/Sidebar.test.tsx
```

Expected: FAIL — element not found after collapse (current code hides children when collapsed).

- [ ] **Step 3: Update Sidebar.tsx**

Replace the full contents of `src/components/Sidebar/Sidebar.tsx` with:

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/Sidebar/Sidebar.test.tsx
```

Expected: all PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Sidebar/Sidebar.tsx src/components/Sidebar/Sidebar.test.tsx
git commit -m "feat: wire SidebarContext into Sidebar and update collapse toggle button"
```

---

### Task 3: Update NavItem — collapsed rendering

**Files:**
- Modify: `src/components/NavItem/NavItem.tsx`
- Modify: `src/components/NavItem/NavItem.test.tsx`

- [ ] **Step 1: Write the failing tests**

Replace the full contents of `src/components/NavItem/NavItem.test.tsx` with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavItem } from './NavItem'
import { SidebarContext } from '../Sidebar/SidebarContext'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    <SidebarContext.Provider value={{ collapsed: false }}>
      {children}
    </SidebarContext.Provider>
  </ThemeProvider>
)

const CollapsedWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    <SidebarContext.Provider value={{ collapsed: true }}>
      {children}
    </SidebarContext.Provider>
  </ThemeProvider>
)

describe('NavItem', () => {
  it('renders label', () => {
    render(<NavItem label="Dashboard" href="/dashboard" />, { wrapper: Wrapper })
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders as an anchor element', () => {
    render(<NavItem label="Dashboard" href="/dashboard" />, { wrapper: Wrapper })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard')
  })

  it('applies active styles when isActive is true', () => {
    const { container } = render(
      <NavItem label="Dashboard" href="/dashboard" isActive />,
      { wrapper: Wrapper }
    )
    expect(container.querySelector('a')).toHaveClass('bg-accent/10')
  })

  it('renders icon when provided', () => {
    render(
      <NavItem label="Dashboard" href="/dashboard" icon={<span data-testid="icon">🏠</span>} />,
      { wrapper: Wrapper }
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders badge when provided', () => {
    render(<NavItem label="Alerts" href="/alerts" badge={3} />, { wrapper: Wrapper })
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  describe('collapsed', () => {
    it('shows icon when icon is provided and hides label', () => {
      render(
        <NavItem label="Dashboard" href="/dashboard" icon={<span data-testid="icon">🏠</span>} />,
        { wrapper: CollapsedWrapper }
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    })

    it('shows 2-letter initial when no icon is provided', () => {
      render(<NavItem label="Dashboard" href="/dashboard" />, { wrapper: CollapsedWrapper })
      expect(screen.getByText('Da')).toBeInTheDocument()
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    })

    it('initial has accent styles', () => {
      const { container } = render(
        <NavItem label="Dashboard" href="/dashboard" />,
        { wrapper: CollapsedWrapper }
      )
      expect(container.querySelector('.bg-accent\\/10')).toBeInTheDocument()
    })

    it('link has title attribute with full label', () => {
      render(<NavItem label="Dashboard" href="/dashboard" />, { wrapper: CollapsedWrapper })
      expect(screen.getByRole('link')).toHaveAttribute('title', 'Dashboard')
    })

    it('does not render badge', () => {
      render(
        <NavItem label="Alerts" href="/alerts" badge={3} />,
        { wrapper: CollapsedWrapper }
      )
      expect(screen.queryByText('3')).not.toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run tests to verify new collapsed tests fail**

```bash
npx vitest run src/components/NavItem/NavItem.test.tsx
```

Expected: existing tests FAIL (NavItem has no context yet), collapsed tests FAIL.

- [ ] **Step 3: Update NavItem.tsx**

Replace the full contents of `src/components/NavItem/NavItem.tsx` with:

```tsx
import React, { ReactNode, AnchorHTMLAttributes } from 'react'
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

    if (collapsed) {
      return (
        <a
          ref={ref}
          href={href}
          title={label}
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/NavItem/NavItem.test.tsx
```

Expected: all PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/NavItem/NavItem.tsx src/components/NavItem/NavItem.test.tsx
git commit -m "feat: add collapsed icon/initial rendering to NavItem"
```

---

### Task 4: Update NavGroup — collapsible + hierarchy lines

**Files:**
- Modify: `src/components/NavGroup/NavGroup.tsx`
- Modify: `src/components/NavGroup/NavGroup.test.tsx`

- [ ] **Step 1: Write the failing tests**

Replace the full contents of `src/components/NavGroup/NavGroup.test.tsx` with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavGroup } from './NavGroup'
import { NavItem } from '../NavItem/NavItem'
import { SidebarContext } from '../Sidebar/SidebarContext'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    <SidebarContext.Provider value={{ collapsed: false }}>
      {children}
    </SidebarContext.Provider>
  </ThemeProvider>
)

const CollapsedWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    <SidebarContext.Provider value={{ collapsed: true }}>
      {children}
    </SidebarContext.Provider>
  </ThemeProvider>
)

describe('NavGroup', () => {
  it('renders group label', () => {
    render(
      <NavGroup label="Analytics">
        <NavItem label="Overview" href="/analytics" />
      </NavGroup>,
      { wrapper: Wrapper }
    )
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <NavGroup label="Settings">
        <NavItem label="Profile" href="/profile" />
        <NavItem label="Security" href="/security" />
      </NavGroup>,
      { wrapper: Wrapper }
    )
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('renders label as a button', () => {
    render(
      <NavGroup label="Settings">
        <NavItem label="Profile" href="/profile" />
      </NavGroup>,
      { wrapper: Wrapper }
    )
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()
  })

  it('children are visible by default', () => {
    render(
      <NavGroup label="Settings">
        <NavItem label="Profile" href="/profile" />
      </NavGroup>,
      { wrapper: Wrapper }
    )
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('hides children when label button is clicked', async () => {
    render(
      <NavGroup label="Settings">
        <NavItem label="Profile" href="/profile" />
      </NavGroup>,
      { wrapper: Wrapper }
    )
    await userEvent.click(screen.getByRole('button', { name: /settings/i }))
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })

  it('shows children again when label button is clicked twice', async () => {
    render(
      <NavGroup label="Settings">
        <NavItem label="Profile" href="/profile" />
      </NavGroup>,
      { wrapper: Wrapper }
    )
    await userEvent.click(screen.getByRole('button', { name: /settings/i }))
    await userEvent.click(screen.getByRole('button', { name: /settings/i }))
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('renders nothing when sidebar is collapsed', () => {
    render(
      <NavGroup label="Settings">
        <NavItem label="Profile" href="/profile" />
      </NavGroup>,
      { wrapper: CollapsedWrapper }
    )
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify new ones fail**

```bash
npx vitest run src/components/NavGroup/NavGroup.test.tsx
```

Expected: existing tests FAIL (NavGroup has no context yet), new tests FAIL.

- [ ] **Step 3: Update NavGroup.tsx**

Replace the full contents of `src/components/NavGroup/NavGroup.tsx` with:

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/NavGroup/NavGroup.test.tsx
```

Expected: all PASS

- [ ] **Step 5: Run full test suite**

```bash
npx vitest run
```

Expected: all PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/NavGroup/NavGroup.tsx src/components/NavGroup/NavGroup.test.tsx
git commit -m "feat: make NavGroup collapsible with hierarchy lines"
```
