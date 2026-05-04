import type {Meta, StoryObj} from "@storybook/react"
import {DashboardLayout} from "../../src/components/DashboardLayout/DashboardLayout"
import {Sidebar} from "../../src/components/Sidebar/Sidebar"
import {Header} from "../../src/components/Header/Header"
import {PageContent} from "../../src/components/PageContent/PageContent"
import {NavGroup} from "../../src/components/NavGroup/NavGroup"
import {NavItem} from "../../src/components/NavItem/NavItem"
import {Card} from "../../src/components/Card/Card"
import {Badge} from "../../src/components/Badge/Badge"
import {Alert} from "../../src/components/Alert/Alert"
import {Tabs} from "../../src/components/Tabs/Tabs"
import {Button} from "../../src/components/Button/Button"

function StatCard({label, value, trend}: {label: string; value: string; trend: string}) {
  const isUp = trend.startsWith("+")
  return (
    <Card variant="elevated">
      <p className="text-sm text-secondary mb-1">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className={`text-xs mt-1 ${isUp ? "text-success" : "text-error"}`}>{trend} from last month</p>
    </Card>
  )
}

function AnalyticsDashboard() {
  return (
    <DashboardLayout
      sidebar={
        <Sidebar logo={<strong className="text-foreground text-base">Plynx</strong>}>
          <NavGroup label="Overview">
            <NavItem label="Dashboard" href="#" isActive />
            <NavItem label="Analytics" href="#" badge={3} />
          </NavGroup>
          <NavGroup label="Manage" className="mt-4">
            <NavItem label="Users" href="#" />
            <NavItem label="Reports" href="#" />
            <NavItem label="Exports" href="#" />
          </NavGroup>
          <NavGroup label="Settings" className="mt-4">
            <NavItem label="Profile" href="#" />
            <NavItem label="Billing" href="#" />
          </NavGroup>
        </Sidebar>
      }
    >
      <PageContent>
        <Header
          title="Analytics"
          subtitle="Track your key metrics"
          breadcrumbs={[{label: "Home", href: "#"}, {label: "Analytics"}]}
          actions={
            <>
              <Button variant="outline" size="sm">
                Export CSV
              </Button>
              <Button size="sm">New Report</Button>
            </>
          }
        />
        <div className="space-y-4 p-4">
          {/* Alert */}
          <Alert status="info">
            Data is updated every 15 minutes.{" "}
            <a href="#" className="underline">
              View changelog
            </a>
          </Alert>

          {/* Stats row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Revenue" value="$84,231" trend="+12%" />
            <StatCard label="Active Users" value="3,842" trend="+5%" />
            <StatCard label="Conversion" value="3.2%" trend="-0.4%" />
            <StatCard label="Avg Session" value="4m 12s" trend="+8%" />
          </div>

          {/* Tabs section */}
          <Card
            header={
              <div className="flex items-center justify-between">
                <span>Traffic Overview</span>
                <Badge status="success" dot>
                  Live
                </Badge>
              </div>
            }
          >
            <Tabs
              tabs={[
                {
                  id: "week",
                  label: "This Week",
                  content: (
                    <div className="py-8 text-center text-secondary text-sm">
                      Chart placeholder — integrate Recharts or Chart.js here
                    </div>
                  ),
                },
                {
                  id: "month",
                  label: "This Month",
                  content: <div className="py-8 text-center text-secondary text-sm">Monthly chart placeholder</div>,
                },
                {
                  id: "year",
                  label: "This Year",
                  content: <div className="py-8 text-center text-secondary text-sm">Yearly chart placeholder</div>,
                },
              ]}
            />
          </Card>

          {/* Bottom grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card header="Top Pages">
              <div className="flex flex-col gap-3 text-sm">
                {["/dashboard", "/analytics", "/settings", "/reports"].map((path, i) => (
                  <div key={path} className="flex justify-between items-center">
                    <span className="font-mono text-foreground">{path}</span>
                    <Badge status="info">{(4 - i) * 1234}</Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card header="Recent Alerts">
              <div className="flex flex-col gap-2">
                <Alert status="warning">API response time above threshold</Alert>
                <Alert status="success">Deployment completed successfully</Alert>
                <Alert status="error">Failed login attempts detected</Alert>
              </div>
            </Card>
          </div>
        </div>
      </PageContent>
    </DashboardLayout>
  )
}

const meta = {
  title: "Recipes/Analytics Dashboard",
  component: AnalyticsDashboard,
  parameters: {layout: "fullscreen"},
} satisfies Meta<typeof AnalyticsDashboard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DarkTheme: Story = {
  globals: {theme: "dark"},
}

export const Professional: Story = {
  globals: {theme: "professional"},
}
