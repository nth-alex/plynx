import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from './Tooltip'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>{children}</ThemeProvider>
)

describe('Tooltip', () => {
  it('hides tooltip content by default', () => {
    render(
      <Tooltip content="Helpful text">
        <button>Hover me</button>
      </Tooltip>,
      { wrapper: Wrapper }
    )
    expect(screen.queryByText('Helpful text')).not.toBeInTheDocument()
  })

  it('shows tooltip on mouse enter', async () => {
    render(
      <Tooltip content="Helpful text">
        <button>Hover me</button>
      </Tooltip>,
      { wrapper: Wrapper }
    )
    await userEvent.hover(screen.getByRole('button'))
    expect(screen.getByText('Helpful text')).toBeInTheDocument()
  })

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Helpful text">
        <button>Hover me</button>
      </Tooltip>,
      { wrapper: Wrapper }
    )
    await userEvent.hover(screen.getByRole('button'))
    await userEvent.unhover(screen.getByRole('button'))
    expect(screen.queryByText('Helpful text')).not.toBeInTheDocument()
  })

  it('sets aria-describedby on trigger element', () => {
    render(
      <Tooltip content="Helpful text">
        <button>Hover me</button>
      </Tooltip>,
      { wrapper: Wrapper }
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-describedby')
  })
})
