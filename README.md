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
| `Sidebar` | Collapsible navigation panel with logo and footer slots |
| `Header` | Top bar with title, breadcrumbs, and actions |
| `PageContent` | Scrollable main content area |

### Navigation
| Component | Description |
|-----------|-------------|
| `NavItem` | Navigation link with active state, icon, and badge |
| `NavGroup` | Labeled section grouping nav items |

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

## License

MIT
