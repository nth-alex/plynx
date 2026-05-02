# Phase 1 — Project Setup & Architecture Foundation

**Duration:** 2–3 hours  
**Goal:** Initialize the npm package with all tooling configured and Storybook running  
**Milestone:** `npm run dev` opens Storybook with the introduction page

---

## Files Created This Phase

```
/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── vitest.config.ts
├── .gitignore
├── src/
│   ├── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── index.ts
├── tests/
│   └── setup.ts
├── .storybook/
│   ├── main.ts
│   └── preview.ts
└── stories/
    └── Introduction.mdx
```

---

## Task 1 — Initialize package and install dependencies

**Files:** `package.json`, `tsconfig.json`, `.gitignore`

- [ ] Create `package.json`

```json
{
  "name": "@plynx/ui",
  "version": "0.1.0",
  "description": "Modern React dashboard UI kit with flexible theming",
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "files": ["dist"],
  "sideEffects": ["./dist/styles.css"],
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "tsc && vite build",
    "build:storybook": "storybook build",
    "test": "vitest",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "keywords": ["react", "dashboard", "ui-kit", "components", "theming"],
  "license": "MIT",
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/addon-interactions": "^8.0.0",
    "@storybook/react-vite": "^8.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "jsdom": "^23.0.0",
    "postcss": "^8.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "vite-plugin-dts": "^3.6.0",
    "vitest": "^1.0.0"
  }
}
```

- [ ] Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.stories.tsx", "**/*.test.tsx"]
}
```

- [ ] Create `.gitignore`

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
storybook-static/
coverage/
```

- [ ] Install dependencies

```bash
npm install
```

- [ ] Initialize git and create first commit

```bash
git init
git add package.json tsconfig.json .gitignore
git commit -m "init: initialize @plynx/ui package"
```

---

## Task 2 — Configure Tailwind CSS

**Files:** `tailwind.config.ts`, `postcss.config.js`, `src/styles/globals.css`

- [ ] Create `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
        border: 'hsl(var(--color-border) / <alpha-value>)',
        success: 'hsl(var(--color-success) / <alpha-value>)',
        warning: 'hsl(var(--color-warning) / <alpha-value>)',
        error: 'hsl(var(--color-error) / <alpha-value>)',
        info: 'hsl(var(--color-info) / <alpha-value>)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      fontFamily: {
        sans: ['var(--font-family-sans)'],
        mono: ['var(--font-family-mono)'],
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] Create `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] Create `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Fallback CSS variables — overridden at runtime by ThemeProvider */
:root {
  --color-primary: 0 0% 9%;
  --color-secondary: 0 0% 32%;
  --color-accent: 220 90% 56%;
  --color-background: 0 0% 100%;
  --color-foreground: 0 0% 9%;
  --color-border: 0 0% 89%;
  --color-success: 142 71% 45%;
  --color-warning: 38 92% 50%;
  --color-error: 0 84% 60%;
  --color-info: 206 100% 50%;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --radius-xs: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'Menlo', 'Monaco', 'Courier New', monospace;

  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] Commit

```bash
git add tailwind.config.ts postcss.config.js src/styles/globals.css
git commit -m "chore: configure tailwind css with css variable design tokens"
```

---

## Task 3 — Configure build tools (Vite + Vitest)

**Files:** `vite.config.ts`, `vitest.config.ts`, `tests/setup.ts`

- [ ] Create `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PlynxUI',
      fileName: (format) => `index.${format === 'es' ? 'es' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: (info) =>
          info.name === 'style.css' ? 'styles.css' : info.name!,
      },
    },
  },
})
```

- [ ] Create `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] Create `tests/setup.ts`

```typescript
import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
```

- [ ] Verify build pipeline works

```bash
npm run type-check
```

Expected: No errors

- [ ] Commit

```bash
git add vite.config.ts vitest.config.ts tests/setup.ts
git commit -m "chore: configure vite library build and vitest"
```

---

## Task 4 — Set up Storybook

**Files:** `.storybook/main.ts`, `.storybook/preview.ts`, `stories/Introduction.mdx`

- [ ] Run Storybook initializer

```bash
npx storybook@latest init --type react --builder vite --skip-install --no-dev
```

- [ ] Replace `.storybook/main.ts` with

```typescript
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
}

export default config
```

- [ ] Replace `.storybook/preview.ts` with

```typescript
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
}

export default preview
```

- [ ] Create `stories/Introduction.mdx`

```mdx
import { Meta } from '@storybook/blocks'

<Meta title="Getting Started/Introduction" />

# Plynx UI

A modern React dashboard UI kit with a flexible theming system.

## Installation

```bash
npm install @plynx/ui
```

## Usage

```tsx
import { ThemeProvider, Button } from '@plynx/ui'
import { minimalTheme } from '@plynx/ui/themes'
import '@plynx/ui/styles'

export default function App() {
  return (
    <ThemeProvider theme={minimalTheme}>
      <Button>Click me</Button>
    </ThemeProvider>
  )
}
```

## Available Themes

| Theme | Description |
|-------|-------------|
| `minimalTheme` | Clean, minimal with light colors |
| `darkTheme` | Dark mode variant |
| `professionalTheme` | Bold, data-dense enterprise theme |
```

- [ ] Verify Storybook starts

```bash
npm run dev
```

Expected: Browser opens at `http://localhost:6006` showing "Getting Started/Introduction"

- [ ] Commit

```bash
git add .storybook stories/Introduction.mdx
git commit -m "chore: configure storybook with react-vite builder"
```

---

## Task 5 — Create folder structure and index exports

**Files:** `src/index.ts`, `src/types/index.ts`

- [ ] Create `src/types/index.ts`

```typescript
// Shared utility types — extended as components are added
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type Status = 'success' | 'warning' | 'error' | 'info'
```

- [ ] Create `src/index.ts` (stub — expanded in later phases)

```typescript
// Components — uncomment as each phase is completed
// export * from './components/Button/Button'
// export * from './components/Input/Input'
// export * from './components/Card/Card'

// Theme — uncomment when Phase 2 (theme system) is complete
// export { ThemeProvider } from './theme/ThemeProvider'
// export { useTheme } from './theme/hooks/useTheme'
// export { baseTheme } from './theme/tokens/base'
// export type { Theme, ThemeTokens, ThemeContextType } from './theme/types'

// Types
export type { Size, Variant, Status } from './types'
```

- [ ] Commit

```bash
git add src/index.ts src/types/index.ts
git commit -m "chore: scaffold folder structure and public index exports"
```

---

## Phase 1 Checklist

- [ ] `npm install` completes without errors
- [ ] `npm run type-check` passes
- [ ] `npm run test` runs (no tests yet — passes vacuously)
- [ ] `npm run dev` opens Storybook at localhost:6006
- [ ] Introduction page renders
- [ ] All files committed to git

**Next:** [Phase 2 — Theme System](./phase-2-theme-system.md)
