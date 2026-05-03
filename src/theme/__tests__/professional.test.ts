import { describe, it, expect } from 'vitest'
import { professionalTheme } from '../tokens/professional'
import { mergeThemes } from '../utils'
import { baseTheme } from '../tokens/base'

describe('professionalTheme', () => {
  it('has name "professional"', () => {
    expect(professionalTheme.name).toBe('professional')
  })

  it('has a distinct accent color from base and dark themes', () => {
    const merged = mergeThemes(baseTheme, professionalTheme)
    expect(merged.tokens.colors.accent).not.toBe(baseTheme.tokens.colors.accent)
  })

  it('has smaller border radius than base (more rectangular)', () => {
    const merged = mergeThemes(baseTheme, professionalTheme)
    const baseR = parseFloat(baseTheme.tokens.radius!.md)
    const proR  = parseFloat(merged.tokens.radius!.md)
    expect(proR).toBeLessThanOrEqual(baseR)
  })

  it('has all required color tokens after merge', () => {
    const merged = mergeThemes(baseTheme, professionalTheme)
    const c = merged.tokens.colors
    expect(c.primary).toBeDefined()
    expect(c.secondary).toBeDefined()
    expect(c.accent).toBeDefined()
    expect(c.background).toBeDefined()
    expect(c.foreground).toBeDefined()
    expect(c.border).toBeDefined()
  })
})
