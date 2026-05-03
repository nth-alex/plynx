// src/theme/ThemeProvider.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './hooks/useTheme'
import { baseTheme } from './tokens/base'
import type { Theme } from './types'

const darkTheme: Theme = {
  name: 'dark',
  tokens: {
    colors: {
      ...baseTheme.tokens.colors,
      background: 'hsl(0 0% 7%)',
      foreground: 'hsl(0 0% 98%)',
    },
  },
}

function NameDisplay() {
  const { currentTheme } = useTheme()
  return <span>{currentTheme.name}</span>
}

function ThemeSwitcher() {
  const { setTheme } = useTheme()
  return <button onClick={() => setTheme('dark')}>Switch</button>
}

describe('ThemeProvider', () => {
  it('renders children', () => {
    render(
      <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
        <span>hello</span>
      </ThemeProvider>
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('provides the initial theme name to children', () => {
    render(
      <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
        <NameDisplay />
      </ThemeProvider>
    )
    expect(screen.getByText('base')).toBeInTheDocument()
  })

  it('sets data-theme attribute on root', () => {
    render(
      <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
        <div />
      </ThemeProvider>
    )
    expect(document.documentElement.getAttribute('data-theme')).toBe('base')
  })

  it('switches theme by name', async () => {
    render(
      <ThemeProvider initialTheme={baseTheme} themes={[baseTheme, darkTheme]}>
        <NameDisplay />
        <ThemeSwitcher />
      </ThemeProvider>
    )
    expect(screen.getByText('base')).toBeInTheDocument()
    await act(async () => {
      screen.getByText('Switch').click()
    })
    expect(screen.getByText('dark')).toBeInTheDocument()
  })
})
