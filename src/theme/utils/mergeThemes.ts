import type { Theme } from '../types'

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target }
  for (const key in source) {
    const val = source[key]
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = deepMerge(
        (result[key] as Record<string, unknown>) ?? {},
        val as Record<string, unknown>
      )
    } else {
      result[key] = val
    }
  }
  return result
}

export function mergeThemes(base: Theme, override: Theme): Theme {
  return {
    name: override.name,
    tokens: deepMerge(
      base.tokens as unknown as Record<string, unknown>,
      override.tokens as unknown as Record<string, unknown>
    ) as Theme['tokens'],
  }
}

export function flattenThemeTokens(theme: Theme): Record<string, string> {
  const result: Record<string, string> = {}

  const flatten = (obj: Record<string, unknown>, parentKey: string) => {
    for (const key in obj) {
      const value = obj[key]
      const varName = `${parentKey}-${key}`
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        flatten(value as Record<string, unknown>, varName)
      } else if (typeof value === 'string' || typeof value === 'number') {
        result[varName] = String(value)
      }
    }
  }

  // Each top-level token group gets its own prefix
  const tokenGroups: Record<string, string> = {
    colors: '--color',
    spacing: '--spacing',
    radius: '--radius',
    shadows: '--shadow',
  }

  for (const [group, prefix] of Object.entries(tokenGroups)) {
    const tokens = (theme.tokens as Record<string, unknown>)[group]
    if (tokens && typeof tokens === 'object') {
      flatten(tokens as Record<string, unknown>, prefix)
    }
  }

  // Typography needs special handling
  const typo = theme.tokens.typography
  if (typo?.fontFamily) {
    for (const [key, val] of Object.entries(typo.fontFamily)) {
      if (val) result[`--font-family-${key}`] = val
    }
  }

  return result
}
