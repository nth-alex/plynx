import type { Theme } from '../types'

export const baseTheme: Theme = {
  name: 'base',
  tokens: {
    colors: {
      primary: 'hsl(0 0% 9%)',
      secondary: 'hsl(0 0% 32%)',
      accent: 'hsl(220 90% 56%)',
      background: 'hsl(59deg 6% 93%)',
      foreground: 'hsl(0 0% 9%)',
      border: 'hsl(0 0% 89%)',
      success: 'hsl(142 71% 45%)',
      warning: 'hsl(38 92% 50%)',
      error: 'hsl(0 84% 60%)',
      info: 'hsl(206 100% 50%)',
      card: 'hsl(0 0% 100%)',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    radius: {
      xs: '0.25rem',
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
    },
    typography: {
      fontFamily: {
        sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        mono: '"Menlo", "Monaco", "Courier New", monospace',
      },
    },
    shadows: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
  },
}
