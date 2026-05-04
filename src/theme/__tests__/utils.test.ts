import { describe, it, expect } from 'vitest'
import { mergeThemes, flattenThemeTokens } from '../utils'
import { baseTheme } from '../tokens/base'
import type { Theme } from '../types'

describe('mergeThemes', () => {
  it('overrides colors from base with custom values', () => {
    const override: Theme = {
      name: 'custom',
      tokens: {
        colors: { ...baseTheme.tokens.colors, primary: 'hsl(220 90% 56%)' },
      },
    }
    const merged = mergeThemes(baseTheme, override)
    expect(merged.tokens.colors.primary).toBe('hsl(220 90% 56%)')
  })

  it('preserves base tokens not in override', () => {
    const override: Theme = {
      name: 'partial',
      tokens: {
        colors: { ...baseTheme.tokens.colors, accent: 'hsl(0 90% 56%)' },
      },
    }
    const merged = mergeThemes(baseTheme, override)
    expect(merged.tokens.spacing).toEqual(baseTheme.tokens.spacing)
    expect(merged.tokens.radius).toEqual(baseTheme.tokens.radius)
  })
})

describe('flattenThemeTokens', () => {
  it('maps color tokens to CSS variable names', () => {
    const flat = flattenThemeTokens(baseTheme)
    expect(flat['--color-primary']).toBe('0 0% 9%')
    expect(flat['--color-background']).toBe('59deg 6% 93%')
  })

  it('maps spacing tokens to CSS variable names', () => {
    const flat = flattenThemeTokens(baseTheme)
    expect(flat['--spacing-md']).toBe('1rem')
    expect(flat['--spacing-xs']).toBe('0.25rem')
  })

  it('maps radius tokens to CSS variable names', () => {
    const flat = flattenThemeTokens(baseTheme)
    expect(flat['--radius-lg']).toBe('0.75rem')
  })
})
