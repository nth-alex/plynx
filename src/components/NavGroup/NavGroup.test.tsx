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
