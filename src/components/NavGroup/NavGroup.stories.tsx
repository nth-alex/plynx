import type { Meta, StoryObj } from '@storybook/react'
import { BarChart2, Code2, FileText, User } from 'lucide-react'
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
      <NavGroup label="Analytics" icon={<BarChart2 size={16} />}>
        <NavItem label="Overview" href="/overview" isActive />
        <NavItem label="Reports" href="/reports" badge={3} />
        <NavItem label="Exports" href="/exports" />
      </NavGroup>
    </div>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <div style={{ width: 220 }}>
      <NavGroup label="Settings">
        <NavItem label="Profile" href="/profile" icon={<User size={16} />} />
        <NavItem label="Billing" href="/billing" />
      </NavGroup>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div style={{ width: 220 }}>
      <NavGroup label="Build">
        <NavGroup label="Compute" icon={<Code2 size={16} />}>
          <NavItem label="Workers & Pages" href="/workers" />
          <NavItem label="Observability" href="/observability" />
          <NavItem label="Containers" href="/containers" />
        </NavGroup>
        <NavItem label="Analytics" href="/analytics" icon={<BarChart2 size={16} />} />
        <NavItem label="Pages" href="/pages" icon={<FileText size={16} />} />
      </NavGroup>
    </div>
  ),
}
