import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    {children}
  </ThemeProvider>
)

describe('Header', () => {
  it('renders title', () => {
    render(<Header title="Dashboard" />, { wrapper: Wrapper })
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<Header title="Dashboard" subtitle="Welcome back" />, { wrapper: Wrapper })
    expect(screen.getByText('Welcome back')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(
      <Header title="Dashboard" actions={<button>Export</button>} />,
      { wrapper: Wrapper }
    )
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument()
  })

  it('renders breadcrumbs when provided', () => {
    render(
      <Header
        title="Reports"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Reports' }]}
      />,
      { wrapper: Wrapper }
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getAllByText('Reports').length).toBeGreaterThan(0)
  })
})
