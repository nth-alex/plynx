import type { Meta, StoryObj } from '@storybook/react'
import { NavGroup } from './NavGroup'
import { NavItem } from '../NavItem/NavItem'

const meta = {
  title: 'Navigation/NavGroup',
  component: NavGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof NavGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ width: 220 }}>
      <NavGroup label="Analytics">
        <NavItem label="Overview" href="/overview" isActive />
        <NavItem label="Reports" href="/reports" badge={3} />
        <NavItem label="Exports" href="/exports" />
      </NavGroup>
    </div>
  ),
}
