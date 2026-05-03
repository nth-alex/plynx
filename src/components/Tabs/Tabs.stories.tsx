import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { id: 'overview', label: 'Overview', content: <p className="text-foreground">Overview panel content</p> },
      { id: 'settings', label: 'Settings', content: <p className="text-foreground">Settings panel content</p> },
      { id: 'logs',     label: 'Logs',     content: <p className="text-foreground">Logs panel content</p> },
    ],
  },
}

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { id: 'active', label: 'Active', content: <p>Active content</p> },
      { id: 'disabled', label: 'Disabled', content: <p>Disabled content</p>, disabled: true },
    ],
  },
}
