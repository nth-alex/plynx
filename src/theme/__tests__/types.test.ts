import { describe, it, expect } from 'vitest'
import type { Theme } from '../types'

describe('Theme type', () => {
  it('accepts a valid theme object', () => {
    const theme: Theme = {
      name: 'test',
      tokens: {
        colors: {
          primary: 'hsl(0 0% 0%)',
          secondary: 'hsl(0 0% 20%)',
          accent: 'hsl(220 90% 56%)',
          background: 'hsl(0 0% 100%)',
          foreground: 'hsl(0 0% 10%)',
          border: 'hsl(0 0% 90%)',
        },
      },
    }
    expect(theme.name).toBe('test')
  })

  it('allows partial tokens (only colors required)', () => {
    const minimal: Theme = {
      name: 'minimal',
      tokens: {
        colors: {
          primary: 'hsl(0 0% 0%)',
          secondary: 'hsl(0 0% 20%)',
          accent: 'hsl(220 90% 56%)',
          background: 'hsl(0 0% 100%)',
          foreground: 'hsl(0 0% 10%)',
          border: 'hsl(0 0% 90%)',
        },
      },
    }
    expect(minimal.tokens.spacing).toBeUndefined()
  })
})
