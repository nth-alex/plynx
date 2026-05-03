# Plynx UI

> A modern React dashboard UI kit with a flexible theming system

[![npm version](https://img.shields.io/npm/v/plynx)](https://www.npmjs.com/package/plynx)
[![license](https://img.shields.io/npm/l/plynx)](./LICENSE)

[npm](https://www.npmjs.com/package/plynx) · [GitHub](https://github.com/your-username/plynx-ui)

---

## Features

- **15+ Components** — Button, Input, Card, Sidebar, Header, Modal, Tabs, and more
- **3 Curated Themes** — Minimal, Dark, Professional — each fully styled, no extra config
- **Flexible Theming** — Switch themes at runtime via React Context
- **TypeScript First** — All components and tokens fully typed
- **Tailwind CSS** — Utility-first styling with CSS variable design tokens
- **Storybook Docs** — Interactive component showcase with live theme switching

---

## Installation

```bash
npm install plynx
```

---

## Quick Start

```tsx
// main.tsx
import { ThemeProvider, baseTheme, darkTheme, professionalTheme } from 'plynx'
import 'plynx/styles'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider
    initialTheme={baseTheme}
    themes={[baseTheme, darkTheme, professionalTheme]}
  >
    <App />
  </ThemeProvider>
)

// App.tsx
import { Button, Card, Input } from 'plynx'

export function App() {
  return (
    <Card header="Welcome">
      <Input label="Email" placeholder="you@example.com" type="email" />
      <Button className="mt-4">Get started</Button>
    </Card>
  )
}
```

---

## Themes

| Theme | Description |
|-------|-------------|
| `baseTheme` | Clean, minimal with light neutral tones |
| `darkTheme` | Dark mode variant with light text |
| `professionalTheme` | Navy-toned corporate theme with tighter radius |

Switch themes at runtime:

```tsx
import { useTheme } from 'plynx'

function ThemeToggle() {
  const { setTheme, currentTheme } = useTheme()
  return (
    <button onClick={() => setTheme(currentTheme.name === 'dark' ? 'base' : 'dark')}>
      Toggle dark mode
    </button>
  )
}
```

---

## Components

### Core
| Component | Description |
|-----------|-------------|
| `Button` | Variants: primary, secondary, outline, ghost · Sizes: sm, md, lg |
| `Input` | With label, error state, and help text |
| `Card` | With header, footer, and elevated variant |

### Layout
| Component | Description |
|-----------|-------------|
| `DashboardLayout` | Full page shell: sidebar + header + content |
| `Sidebar` | Collapsible navigation panel with logo, footer, and built-in toggle |
| `Header` | Top bar with title, breadcrumbs, and actions |
| `PageContent` | Scrollable main content area |

### Navigation
| Component | Description |
|-----------|-------------|
| `NavItem` | Navigation link with active state, icon, badge, and collapsed tooltip |
| `NavGroup` | Collapsible labeled section with hierarchy lines |

### Hooks
| Hook | Description |
|------|-------------|
| `useSidebarContext` | Returns `{ collapsed: boolean }` — safe to call outside `Sidebar` (defaults to `false`) |

### Feedback & Interaction
| Component | Description |
|-----------|-------------|
| `Badge` | Status indicators with success / warning / error / info |
| `Alert` | Dismissable feedback messages |
| `Modal` | Accessible overlay dialog |
| `Tabs` | Content switcher with keyboard support |
| `Dropdown` | Floating menu triggered by a button |
| `Tooltip` | Hover label with directional positioning |

---

## Sidebar

`Sidebar` manages its own collapsed state and exposes it via `SidebarContext`. Child `NavItem` and `NavGroup` components read this context automatically — no wiring required.

```tsx
import { Sidebar, NavItem, NavGroup } from 'plynx'
import { LayoutDashboard, Settings } from 'lucide-react'

<Sidebar logo={<strong>Plynx</strong>} footer={<span>user@example.com</span>}>
  <NavGroup label="Main">
    <NavItem label="Dashboard" href="/" icon={<LayoutDashboard size={16} />} isActive />
    <NavItem label="Settings" href="/settings" icon={<Settings size={16} />} badge={3} />
  </NavGroup>
</Sidebar>
```

**Collapsed state** — when the user clicks the built-in toggle button, the sidebar narrows to icon-only mode (`w-16`). In this state:

- `NavItem` shows only the icon (or a 2-letter initial if no icon is provided) and renders a portal-based tooltip on hover
- `NavGroup` hides its label and expand/collapse button, rendering only its children
- The `footer` slot is hidden

**`useSidebarContext`** — read the collapsed state anywhere inside the tree:

```tsx
import { useSidebarContext } from 'plynx'

function MyNavItem() {
  const { collapsed } = useSidebarContext()
  return <span>{collapsed ? '…' : 'Full label'}</span>
}
```

**`NavGroup`** — collapsible by default (starts open). Click the label row to toggle. Shows a left-border hierarchy line when expanded.

```tsx
<NavGroup label="Settings" className="mt-4">
  <NavItem label="Profile" href="/profile" icon={<User size={16} />} />
  <NavItem label="Security" href="/security" icon={<Shield size={16} />} />
</NavGroup>
```

> **Peer dependency** — `lucide-react` is a peer dependency. Install it alongside `plynx` if you use Lucide icons in nav items:
> ```bash
> npm install lucide-react
> ```

---

## License

MIT
