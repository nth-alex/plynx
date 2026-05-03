import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dropdown, DropdownItem } from './Dropdown'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>{children}</ThemeProvider>
)

describe('Dropdown', () => {
  it('menu is hidden by default', () => {
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem label="Item 1" />
      </Dropdown>,
      { wrapper: Wrapper }
    )
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })

  it('opens when trigger is clicked', async () => {
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem label="Item 1" />
      </Dropdown>,
      { wrapper: Wrapper }
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('closes on Escape key', async () => {
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem label="Item 1" />
      </Dropdown>,
      { wrapper: Wrapper }
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })

  it('DropdownItem fires onClick when clicked', async () => {
    const onClick = vi.fn()
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem label="Delete" onClick={onClick} />
      </Dropdown>,
      { wrapper: Wrapper }
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByText('Delete'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('DropdownItem with danger prop has error color class', async () => {
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem label="Delete" danger />
      </Dropdown>,
      { wrapper: Wrapper }
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Delete')).toHaveClass('text-error')
  })
})
