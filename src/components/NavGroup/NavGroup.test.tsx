import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavGroup } from './NavGroup'
import { NavItem } from '../NavItem/NavItem'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    {children}
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
})
