import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert } from './Alert'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>{children}</ThemeProvider>
)

describe('Alert', () => {
  it('renders message', () => {
    render(<Alert status="success">Saved successfully.</Alert>, { wrapper: Wrapper })
    expect(screen.getByText('Saved successfully.')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Alert status="error" title="Error">Something went wrong.</Alert>, { wrapper: Wrapper })
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const onDismiss = vi.fn()
    render(
      <Alert status="info" onDismiss={onDismiss}>Note</Alert>,
      { wrapper: Wrapper }
    )
    await userEvent.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('does not render dismiss button when onDismiss is not provided', () => {
    render(<Alert status="info">Note</Alert>, { wrapper: Wrapper })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
