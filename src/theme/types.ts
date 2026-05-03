export interface ColorTokens {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  border: string
  success?: string
  warning?: string
  error?: string
  info?: string
  [key: string]: string | undefined
}

export interface SpacingTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  [key: string]: string
}

export interface RadiusTokens {
  xs: string
  sm: string
  md: string
  lg: string
  [key: string]: string
}

export interface TypographyTokens {
  fontFamily?: {
    sans?: string
    mono?: string
    [key: string]: string | undefined
  }
  fontSize?: Record<string, string>
  fontWeight?: Record<string, string | number>
  lineHeight?: Record<string, string>
}

export interface ShadowTokens {
  [key: string]: string
}

export interface ThemeTokens {
  colors: ColorTokens
  spacing?: SpacingTokens
  radius?: RadiusTokens
  typography?: TypographyTokens
  shadows?: ShadowTokens
}

export interface Theme {
  name: string
  tokens: ThemeTokens
}

export interface ThemeContextType {
  currentTheme: Theme
  setTheme: (theme: Theme | string) => void
  availableThemes: Map<string, Theme>
}
