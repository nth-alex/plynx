import React from 'react'
import { Decorator } from '@storybook/react'
import { ThemeProvider } from '../src/theme/ThemeProvider'
import { baseTheme } from '../src/theme/tokens/base'
import { darkTheme } from '../src/theme/tokens/dark'
import { professionalTheme } from '../src/theme/tokens/professional'

const themeMap = new Map([
  ['base', baseTheme],
  ['dark', darkTheme],
  ['professional', professionalTheme],
])

export const ThemeDecorator: Decorator = (Story, context) => {
  const themeName = context.globals.theme ?? 'base'
  const theme = themeMap.get(themeName) ?? baseTheme

  return (
    <ThemeProvider
      initialTheme={theme}
      themes={[baseTheme, darkTheme, professionalTheme]}
    >
      <div style={{ background: 'var(--color-background)', minHeight: '100%', padding: '1rem' }}>
        <Story />
      </div>
    </ThemeProvider>
  )
}
