import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from './Sidebar'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    {children}
  </ThemeProvider>
)

describe('Sidebar', () => {
  it('renders children', () => {
    render(<Sidebar>nav content</Sidebar>, { wrapper: Wrapper })
    expect(screen.getByText('nav content')).toBeInTheDocument()
  })

  it('renders logo slot when provided', () => {
    render(
      <Sidebar logo={<span>MyApp</span>}>nav</Sidebar>,
      { wrapper: Wrapper }
    )
    expect(screen.getByText('MyApp')).toBeInTheDocument()
  })

  it('renders footer slot when provided', () => {
    render(
      <Sidebar footer={<span>user@example.com</span>}>nav</Sidebar>,
      { wrapper: Wrapper }
    )
    expect(screen.getByText('user@example.com')).toBeInTheDocument()
  })

  it('renders collapsed toggle button', () => {
    render(<Sidebar>nav</Sidebar>, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /collapse/i })).toBeInTheDocument()
  })

  it('collapses when toggle is clicked', async () => {
    const { container } = render(<Sidebar>nav</Sidebar>, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole('button', { name: /collapse/i }))
    expect(container.firstChild).toHaveAttribute('data-collapsed', 'true')
  })

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
})
