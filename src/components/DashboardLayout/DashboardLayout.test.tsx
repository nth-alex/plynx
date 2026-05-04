import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardLayout } from './DashboardLayout'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme } from '../../theme/tokens/base'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>{children}</ThemeProvider>
)

describe('DashboardLayout', () => {
  it('renders sidebar and content', () => {
    render(
      <DashboardLayout sidebar={<aside>Sidebar</aside>}>
        <header>Header</header>
        <main>Content</main>
      </DashboardLayout>,
      { wrapper: Wrapper }
    )
    expect(screen.getByText('Sidebar')).toBeInTheDocument()
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
