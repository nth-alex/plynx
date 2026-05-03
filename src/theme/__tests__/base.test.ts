import { describe, it, expect } from 'vitest'
import { baseTheme } from '../tokens/base'

describe('baseTheme', () => {
  it('has a name', () => {
    expect(baseTheme.name).toBe('base')
  })

  it('has all required color tokens', () => {
    const c = baseTheme.tokens.colors
    expect(c.primary).toBeDefined()
    expect(c.secondary).toBeDefined()
    expect(c.accent).toBeDefined()
    expect(c.background).toBeDefined()
    expect(c.foreground).toBeDefined()
    expect(c.border).toBeDefined()
  })

  it('has spacing tokens with correct scale', () => {
    const s = baseTheme.tokens.spacing!
    expect(s.xs).toBe('0.25rem')
    expect(s.sm).toBe('0.5rem')
    expect(s.md).toBe('1rem')
    expect(s.lg).toBe('1.5rem')
    expect(s.xl).toBe('2rem')
  })

  it('has border radius tokens', () => {
    const r = baseTheme.tokens.radius!
    expect(r.xs).toBe('0.25rem')
    expect(r.sm).toBe('0.375rem')
    expect(r.md).toBe('0.5rem')
    expect(r.lg).toBe('0.75rem')
  })

  it('has typography tokens', () => {
    expect(baseTheme.tokens.typography?.fontFamily?.sans).toBeDefined()
  })

  it('has shadow tokens', () => {
    const sh = baseTheme.tokens.shadows!
    expect(sh.sm).toBeDefined()
    expect(sh.md).toBeDefined()
  })
})
