import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>{children}</ThemeProvider>
)

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge>Active</Badge>, { wrapper: Wrapper })
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders with status variant', () => {
    const { container } = render(<Badge status="success">OK</Badge>, { wrapper: Wrapper })
    expect(container.firstChild).toHaveClass('bg-success/10')
  })

  it('renders dot variant', () => {
    const { container } = render(<Badge dot status="error">Error</Badge>, { wrapper: Wrapper })
    expect(container.querySelector('[aria-hidden]')).toBeInTheDocument()
  })
})
