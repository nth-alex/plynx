import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    error:    { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { placeholder: 'Enter text...' } }
export const WithLabel: Story = { args: { label: 'Email', placeholder: 'your@email.com', type: 'email' } }
export const WithHelpText: Story = {
  args: { label: 'Password', type: 'password', placeholder: '••••••••', helpText: 'At least 8 characters' },
}
export const WithError: Story = {
  args: { label: 'Email', placeholder: 'your@email.com', error: true, hint: 'Invalid email format' },
}
export const Disabled: Story = { args: { label: 'Read only', value: 'cannot edit', disabled: true } }
