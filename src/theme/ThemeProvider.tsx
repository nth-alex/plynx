import { createContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react'
import type { Theme, ThemeContextType } from './types'
import { flattenThemeTokens, mergeThemes } from './utils'
import { baseTheme } from './tokens/base'

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  initialTheme: Theme
  themes?: Theme[]
}

export function ThemeProvider({
  children,
  initialTheme,
  themes = [initialTheme],
}: ThemeProviderProps) {
  const [currentTheme, setCurrentThemeState] = useState<Theme>(() =>
    mergeThemes(baseTheme, initialTheme)
  )

  const availableThemes = useMemo(
    () => new Map(themes.map((t) => [t.name, mergeThemes(baseTheme, t)])),
    [themes]
  )

  useEffect(() => {
    const root = document.documentElement
    const tokens = flattenThemeTokens(currentTheme)
    for (const [key, value] of Object.entries(tokens)) {
      root.style.setProperty(key, value)
    }
    root.setAttribute('data-theme', currentTheme.name)
    return () => {
      for (const key of Object.keys(tokens)) {
        root.style.removeProperty(key)
      }
    }
  }, [currentTheme])

  const setTheme = useCallback((themeOrName: Theme | string) => {
    const resolved =
      typeof themeOrName === 'string'
        ? availableThemes.get(themeOrName)
        : mergeThemes(baseTheme, themeOrName)

    if (!resolved) {
      console.warn(`[@plynx/ui] Theme "${themeOrName}" not found.`)
      return
    }
    setCurrentThemeState(resolved)
  }, [availableThemes])

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  )
}
