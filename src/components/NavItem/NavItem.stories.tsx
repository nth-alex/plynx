import type { Meta, StoryObj } from '@storybook/react'
import { NavItem } from './NavItem'

const meta = {
  title: 'Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { label: 'Dashboard', href: '/dashboard' } }
export const Active: Story = { args: { label: 'Dashboard', href: '/dashboard', isActive: true } }
export const WithBadge: Story = { args: { label: 'Alerts', href: '/alerts', badge: 12 } }
export const WithIcon: Story = {
  args: {
    label: 'Settings',
    href: '/settings',
    icon: <span style={{ fontSize: '1rem' }}>⚙️</span>,
  },
}
