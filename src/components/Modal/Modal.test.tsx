import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>{children}</ThemeProvider>
)

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={() => {}} title="Dialog">body</Modal>, { wrapper: Wrapper })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(<Modal isOpen onClose={() => {}} title="My Dialog">body</Modal>, { wrapper: Wrapper })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('My Dialog')).toBeInTheDocument()
    expect(screen.getByText('body')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<Modal isOpen onClose={onClose} title="Test">body</Modal>, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders footer when provided', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Confirm" footer={<button>Confirm</button>}>
        Are you sure?
      </Modal>,
      { wrapper: Wrapper }
    )
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
  })
})
