import { describe, it, expect } from 'vitest'
import { darkTheme } from '../tokens/dark'
import { mergeThemes } from '../utils'
import { baseTheme } from '../tokens/base'

describe('darkTheme', () => {
  it('has name "dark"', () => {
    expect(darkTheme.name).toBe('dark')
  })

  it('has a dark background color', () => {
    const merged = mergeThemes(baseTheme, darkTheme)
    const bg = merged.tokens.colors.background
    expect(bg).toContain('hsl')
    const match = bg.match(/hsl\([\d.]+\s+[\d.]+%\s+([\d.]+)%/)
    if (match) {
      expect(Number(match[1])).toBeLessThan(20)
    }
  })

  it('has a light foreground color (high contrast on dark bg)', () => {
    const merged = mergeThemes(baseTheme, darkTheme)
    const fg = merged.tokens.colors.foreground
    const match = fg.match(/hsl\([\d.]+\s+[\d.]+%\s+([\d.]+)%/)
    if (match) {
      expect(Number(match[1])).toBeGreaterThan(80)
    }
  })

  it('inherits spacing from base theme after merge', () => {
    const merged = mergeThemes(baseTheme, darkTheme)
    expect(merged.tokens.spacing).toEqual(baseTheme.tokens.spacing)
  })

  it('inherits radius from base theme after merge', () => {
    const merged = mergeThemes(baseTheme, darkTheme)
    expect(merged.tokens.radius).toEqual(baseTheme.tokens.radius)
  })
})
