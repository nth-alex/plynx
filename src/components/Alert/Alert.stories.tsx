import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = { args: { status: 'success', children: 'Your changes have been saved.' } }
export const Warning: Story = { args: { status: 'warning', title: 'Warning', children: 'This action may affect other users.' } }
export const Error: Story = { args: { status: 'error', title: 'Error', children: 'Something went wrong. Please try again.' } }
export const Info: Story = { args: { status: 'info', children: 'Your trial ends in 7 days.' } }
export const Dismissable: Story = {
  args: {
    status: 'success',
    title: 'Success',
    children: 'Profile updated.',
    onDismiss: () => alert('dismissed'),
  },
}
