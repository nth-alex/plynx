import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NavItem } from './NavItem'
import { SidebarContext } from '../Sidebar/SidebarContext'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    {children}
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
    it('shows icon when icon is provided and hides label as link text', () => {
      render(
        <NavItem label="Dashboard" href="/dashboard" icon={<span data-testid="icon">🏠</span>} />,
        { wrapper: CollapsedWrapper }
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.queryByText('Da')).not.toBeInTheDocument()
    })

    it('shows 2-letter initial when no icon is provided', () => {
      render(<NavItem label="Dashboard" href="/dashboard" />, { wrapper: CollapsedWrapper })
      expect(screen.getByText('Da')).toBeInTheDocument()
    })

    it('initial has accent styles', () => {
      const { container } = render(
        <NavItem label="Dashboard" href="/dashboard" />,
        { wrapper: CollapsedWrapper }
      )
      expect(container.querySelector('.bg-accent\\/10')).toBeInTheDocument()
    })

    it('link has aria-label with full label', () => {
      render(<NavItem label="Dashboard" href="/dashboard" />, { wrapper: CollapsedWrapper })
      expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    })

    it('shows tooltip with full label on hover', () => {
      const { container } = render(
        <NavItem label="Dashboard" href="/dashboard" />,
        { wrapper: CollapsedWrapper }
      )
      fireEvent.mouseEnter(container.firstChild!)
      expect(screen.getByRole('tooltip')).toHaveTextContent('Dashboard')
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
