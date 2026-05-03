import type { Meta, StoryObj } from '@storybook/react'
import { PageContent } from './PageContent'

const meta = {
  title: 'Layout/PageContent',
  component: PageContent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PageContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PageContent>
      <p>Page content area with default padding.</p>
    </PageContent>
  ),
}

export const NoPadding: Story = {
  render: () => (
    <PageContent padding={false}>
      <p>Page content area with no padding.</p>
    </PageContent>
  ),
}
