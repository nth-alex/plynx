import type { Meta, StoryObj } from '@storybook/react'
import { DashboardLayout } from './DashboardLayout'
import { Sidebar } from '../Sidebar/Sidebar'
import { Header } from '../Header/Header'
import { PageContent } from '../PageContent/PageContent'
import { NavGroup } from '../NavGroup/NavGroup'
import { NavItem } from '../NavItem/NavItem'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'

const meta = {
  title: 'Layout/DashboardLayout',
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DashboardLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Complete: Story = {
  render: () => (
    <DashboardLayout
      sidebar={
        <Sidebar logo={<strong style={{ fontSize: '1.1rem' }}>Plynx</strong>}>
          <NavGroup label="Main">
            <NavItem label="Dashboard" href="/" isActive />
            <NavItem label="Analytics" href="/analytics" badge={4} />
            <NavItem label="Reports" href="/reports" />
          </NavGroup>
          <NavGroup label="Settings" className="mt-4">
            <NavItem label="Profile" href="/profile" />
          </NavGroup>
        </Sidebar>
      }
      header={
        <Header
          title="Dashboard"
          subtitle="Welcome back, Alex"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
          actions={
            <>
              <Button variant="outline" size="sm">Export</Button>
              <Button size="sm">New Report</Button>
            </>
          }
        />
      }
    >
      <PageContent>
        <div className="grid grid-cols-3 gap-6">
          <Card header="Total Revenue" variant="elevated">
            <p className="text-2xl font-bold text-foreground">$48,295</p>
            <p className="text-sm text-secondary mt-1">+12% from last month</p>
          </Card>
          <Card header="Active Users" variant="elevated">
            <p className="text-2xl font-bold text-foreground">3,842</p>
            <p className="text-sm text-secondary mt-1">+5% from last month</p>
          </Card>
          <Card header="Open Tickets" variant="elevated">
            <p className="text-2xl font-bold text-foreground">17</p>
            <p className="text-sm text-secondary mt-1">-3 from yesterday</p>
          </Card>
        </div>
      </PageContent>
    </DashboardLayout>
  ),
}
