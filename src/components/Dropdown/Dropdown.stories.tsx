import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, DropdownItem } from './Dropdown'
import { Button } from '../Button/Button'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dropdown trigger={<Button variant="outline" size="sm">Actions ▾</Button>}>
      <DropdownItem label="Edit" onClick={() => {}} />
      <DropdownItem label="Duplicate" onClick={() => {}} />
      <DropdownItem label="Delete" danger onClick={() => {}} />
    </Dropdown>
  ),
}

export const AlignRight: Story = {
  render: () => (
    <div className="flex justify-end">
      <Dropdown trigger={<Button variant="outline" size="sm">Menu ▾</Button>} align="right">
        <DropdownItem label="Profile" />
        <DropdownItem label="Settings" />
        <DropdownItem label="Sign out" danger />
      </Dropdown>
    </div>
  ),
}
