import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'
import { Button } from '../Button/Button'

const meta = {
  title: 'Navigation/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { title: 'Dashboard' } }
export const WithSubtitle: Story = {
  args: { title: 'Dashboard', subtitle: 'Welcome back, Alex' },
}
export const WithActions: Story = {
  args: {
    title: 'Reports',
    actions: (
      <>
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">New Report</Button>
      </>
    ),
  },
}
export const WithBreadcrumbs: Story = {
  args: {
    title: 'Monthly Report',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Reports', href: '/reports' }, { label: 'Monthly Report' }],
    actions: <Button size="sm">Export</Button>,
  },
}
