import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>{children}</ThemeProvider>
)

const tabs = [
  { id: 'overview', label: 'Overview', content: <p>Overview content</p> },
  { id: 'settings', label: 'Settings', content: <p>Settings content</p> },
  { id: 'logs',     label: 'Logs',     content: <p>Logs content</p> },
]

describe('Tabs', () => {
  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} />, { wrapper: Wrapper })
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Settings' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Logs' })).toBeInTheDocument()
  })

  it('shows first tab content by default', () => {
    render(<Tabs tabs={tabs} />, { wrapper: Wrapper })
    expect(screen.getByText('Overview content')).toBeInTheDocument()
    expect(screen.queryByText('Settings content')).not.toBeInTheDocument()
  })

  it('switches content when a different tab is clicked', async () => {
    render(<Tabs tabs={tabs} />, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole('tab', { name: 'Settings' }))
    expect(screen.getByText('Settings content')).toBeInTheDocument()
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument()
  })

  it('marks active tab with aria-selected=true', async () => {
    render(<Tabs tabs={tabs} />, { wrapper: Wrapper })
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.click(screen.getByRole('tab', { name: 'Logs' }))
    expect(screen.getByRole('tab', { name: 'Logs' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'false')
  })
})
