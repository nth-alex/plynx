import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    {children}
  </ThemeProvider>
)

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Input label="Email" />, { wrapper: Wrapper })
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<Input />, { wrapper: Wrapper })
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(screen.getByRole('textbox')).toHaveValue('hello')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('shows hint text when error is true', () => {
    render(<Input error hint="Invalid email" />, { wrapper: Wrapper })
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('shows helpText when no error', () => {
    render(<Input helpText="We will never share your email" />, { wrapper: Wrapper })
    expect(screen.getByText('We will never share your email')).toBeInTheDocument()
  })

  it('does not set aria-invalid when no error', () => {
    render(<Input />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('sets aria-invalid when error is true', () => {
    render(<Input error />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links aria-describedby to hint span when error and hint are provided', () => {
    render(<Input error hint="Invalid email" />, { wrapper: Wrapper })
    const input = screen.getByRole('textbox')
    const hint = screen.getByText('Invalid email')
    expect(input).toHaveAttribute('aria-describedby', hint.id)
  })

  it('links aria-describedby to helpText span when no error and helpText is provided', () => {
    render(<Input helpText="We will never share your email" />, { wrapper: Wrapper })
    const input = screen.getByRole('textbox')
    const help = screen.getByText('We will never share your email')
    expect(input).toHaveAttribute('aria-describedby', help.id)
  })

  it('does not set aria-describedby when no hint or helpText', () => {
    render(<Input />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby')
  })
})
