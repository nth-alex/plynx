import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../Button/Button'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated'] },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'A simple card with no header or footer.' },
}
export const WithHeader: Story = {
  args: { header: 'Card Title', children: 'Card body content goes here.' },
}
export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Card Title',
    children: 'Card body content goes here.',
    footer: 'Last updated 2 minutes ago',
  },
}
export const Elevated: Story = {
  args: { variant: 'elevated', header: 'Elevated Card', children: 'Has a shadow for depth.' },
}
export const WithActions: Story = {
  args: {
    header: 'Confirm action',
    children: 'Are you sure you want to delete this item? This action cannot be undone.',
    footer: (
      <div className="flex gap-3">
        <Button size="sm" variant="primary">Delete</Button>
        <Button size="sm" variant="outline">Cancel</Button>
      </div>
    ),
  },
}
