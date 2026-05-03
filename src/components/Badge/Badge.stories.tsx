import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Badge' } }
export const Success: Story = { args: { children: 'Active', status: 'success' } }
export const Warning: Story = { args: { children: 'Pending', status: 'warning' } }
export const Error: Story = { args: { children: 'Failed', status: 'error' } }
export const Info: Story = { args: { children: 'Processing', status: 'info' } }
export const WithDot: Story = { args: { children: 'Live', status: 'success', dot: true } }
export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge status="success" dot>Active</Badge>
      <Badge status="warning" dot>Pending</Badge>
      <Badge status="error" dot>Failed</Badge>
      <Badge status="info" dot>Processing</Badge>
      <Badge>Default</Badge>
    </div>
  ),
}
