import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    {children}
  </ThemeProvider>
)

describe('Card', () => {
  it('renders children', () => {
    render(<Card>content</Card>, { wrapper: Wrapper })
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders header when provided as string', () => {
    render(<Card header="My Card">body</Card>, { wrapper: Wrapper })
    expect(screen.getByText('My Card')).toBeInTheDocument()
  })

  it('renders header when provided as ReactNode', () => {
    render(<Card header={<span>Custom header</span>}>body</Card>, { wrapper: Wrapper })
    expect(screen.getByText('Custom header')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(<Card footer="Footer text">body</Card>, { wrapper: Wrapper })
    expect(screen.getByText('Footer text')).toBeInTheDocument()
  })

  it('has a border', () => {
    const { container } = render(<Card>body</Card>, { wrapper: Wrapper })
    expect(container.firstChild).toHaveClass('border')
  })

  it('applies elevated shadow for elevated variant', () => {
    const { container } = render(<Card variant="elevated">body</Card>, { wrapper: Wrapper })
    expect(container.firstChild).toHaveClass('shadow-md')
  })
})
