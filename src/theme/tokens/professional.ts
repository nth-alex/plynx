import type { Theme } from '../types'

export const professionalTheme: Theme = {
  name: 'professional',
  tokens: {
    colors: {
      primary:    'hsl(222 47% 24%)',
      secondary:  'hsl(222 30% 45%)',
      accent:     'hsl(210 100% 48%)',
      background: 'hsl(220 18% 95%)',
      foreground: 'hsl(222 47% 15%)',
      border:     'hsl(220 14% 88%)',
      success:    'hsl(142 55% 38%)',
      warning:    'hsl(38 82% 44%)',
      error:      'hsl(0 72% 52%)',
      info:       'hsl(210 100% 48%)',
      card: 'hsl(220 18% 100%)',
    },
    radius: {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
    },
    shadows: {
      xs: '0 1px 2px 0 rgb(34 47 61 / 0.08)',
      sm: '0 1px 3px 0 rgb(34 47 61 / 0.12), 0 1px 2px -1px rgb(34 47 61 / 0.08)',
      md: '0 4px 6px -1px rgb(34 47 61 / 0.12), 0 2px 4px -2px rgb(34 47 61 / 0.08)',
      lg: '0 10px 15px -3px rgb(34 47 61 / 0.12), 0 4px 6px -4px rgb(34 47 61 / 0.08)',
    },
  },
}
