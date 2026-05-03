export { ThemeProvider, ThemeContext } from './ThemeProvider'
export { useTheme } from './hooks/useTheme'
export { mergeThemes, flattenThemeTokens } from './utils'

// Pre-built themes
export { baseTheme } from './tokens/base'
export { darkTheme } from './tokens/dark'
export { professionalTheme } from './tokens/professional'

export type {
  Theme,
  ThemeTokens,
  ThemeContextType,
  ColorTokens,
  SpacingTokens,
  RadiusTokens,
  TypographyTokens,
  ShadowTokens,
} from './types'
