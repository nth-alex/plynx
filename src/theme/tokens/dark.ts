import type { Theme } from '../types'

export const darkTheme: Theme = {
  name: 'dark',
  tokens: {
    colors: {
      primary:    'hsl(0 0% 98%)',
      secondary:  'hsl(0 0% 64%)',
      accent:     'hsl(220 90% 60%)',
      background: 'hsl(0 0% 9%)',
      foreground: 'hsl(0 0% 98%)',
      border:     'hsl(0 0% 20%)',
      success:    'hsl(142 71% 50%)',
      warning:    'hsl(38 92% 55%)',
      error:      'hsl(0 84% 65%)',
      info:       'hsl(206 100% 60%)',
    },
  },
}
