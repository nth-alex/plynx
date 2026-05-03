import { describe, it, expect } from 'vitest'
import { render, act } from '@testing-library/react'
import { ThemeProvider } from '../ThemeProvider'
import { useTheme } from '../hooks/useTheme'
import { baseTheme } from '../tokens/base'
import { darkTheme } from '../tokens/dark'
import { professionalTheme } from '../tokens/professional'

function ThemeDisplay() {
  const { currentTheme } = useTheme()
  return <span>{currentTheme.name}</span>
}

describe('Theme switching integration', () => {
  it('switches between all 3 themes without error', async () => {
    const themes = [baseTheme, darkTheme, professionalTheme]
    let setThemeFn: ((t: string) => void) | null = null

    function Capture() {
      const { setTheme } = useTheme()
      setThemeFn = setTheme
      return <ThemeDisplay />
    }

    render(
      <ThemeProvider initialTheme={baseTheme} themes={themes}>
        <Capture />
      </ThemeProvider>
    )

    expect(document.documentElement.getAttribute('data-theme')).toBe('base')

    await act(async () => { setThemeFn?.('dark') })
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    await act(async () => { setThemeFn?.('professional') })
    expect(document.documentElement.getAttribute('data-theme')).toBe('professional')

    await act(async () => { setThemeFn?.('base') })
    expect(document.documentElement.getAttribute('data-theme')).toBe('base')
  })
})
