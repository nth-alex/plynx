import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDashboard, BarChart2, FileText, User, Shield, Settings } from 'lucide-react'
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
          <NavItem label="Dashboard" href="/" icon={<LayoutDashboard size={16} />} isActive />
          <NavItem label="Analytics" href="/analytics" icon={<BarChart2 size={16} />} badge={4} />
          <NavItem label="Reports" href="/reports" icon={<FileText size={16} />} />
        </NavGroup>
        <NavGroup label="Settings" className="mt-4">
          <NavItem label="Profile" href="/profile" icon={<User size={16} />} />
          <NavItem label="Security" href="/security" icon={<Shield size={16} />} />
          <NavItem label="Preferences" href="/preferences" icon={<Settings size={16} />} />
        </NavGroup>
      </Sidebar>
    </div>
  ),
}
