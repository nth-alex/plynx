import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavItem } from './NavItem'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    {children}
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
})
