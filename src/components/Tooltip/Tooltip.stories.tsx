import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button/Button'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  render: () => (
    <Tooltip content="This is a tooltip" side="top">
      <Button variant="outline" size="sm">Hover me (top)</Button>
    </Tooltip>
  ),
}

export const Bottom: Story = {
  render: () => (
    <Tooltip content="Tooltip on the bottom" side="bottom">
      <Button variant="outline" size="sm">Hover me (bottom)</Button>
    </Tooltip>
  ),
}

export const Left: Story = {
  render: () => (
    <Tooltip content="Tooltip on the left" side="left">
      <Button variant="outline" size="sm">Hover me (left)</Button>
    </Tooltip>
  ),
}

export const Right: Story = {
  render: () => (
    <Tooltip content="Tooltip on the right" side="right">
      <Button variant="outline" size="sm">Hover me (right)</Button>
    </Tooltip>
  ),
}
