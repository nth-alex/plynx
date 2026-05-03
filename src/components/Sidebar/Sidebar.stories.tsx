import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { NavItem } from '../NavItem/NavItem'
import { NavGroup } from '../NavGroup/NavGroup'

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar logo={<strong>Plynx</strong>} footer={<span>user@example.com</span>}>
        <NavGroup label="Main">
          <NavItem label="Dashboard" href="/" isActive />
          <NavItem label="Analytics" href="/analytics" badge={4} />
          <NavItem label="Reports" href="/reports" />
        </NavGroup>
        <NavGroup label="Settings" className="mt-4">
          <NavItem label="Profile" href="/profile" />
          <NavItem label="Security" href="/security" />
        </NavGroup>
      </Sidebar>
    </div>
  ),
}
