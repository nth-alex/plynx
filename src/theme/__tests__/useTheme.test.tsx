import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { ThemeProvider } from '../ThemeProvider'
import { useTheme } from '../hooks/useTheme'
import { baseTheme } from '../tokens/base'

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider initialTheme={baseTheme} themes={[baseTheme]}>
    {children}
  </ThemeProvider>
)

describe('useTheme', () => {
  it('returns current theme name', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.currentTheme.name).toBe('base')
  })

  it('throws when used outside ThemeProvider', () => {
    const { result } = renderHook(() => {
      try { return useTheme() } catch (e) { return e }
    })
    expect(result.current).toBeInstanceOf(Error)
  })

  it('exposes availableThemes map', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.availableThemes.has('base')).toBe(true)
  })
})
