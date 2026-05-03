import type { Preview } from '@storybook/react-vite'
import { ThemeDecorator } from './ThemeDecorator'
import '../src/styles/globals.css'

const preview: Preview = {
  decorators: [ThemeDecorator],
  globalTypes: {
    theme: {
      description: 'UI Kit theme',
      defaultValue: 'base',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'base',         title: 'Minimal (base)' },
          { value: 'dark',         title: 'Dark' },
          { value: 'professional', title: 'Professional' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
