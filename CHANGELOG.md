# Changelog

All notable changes to this project will be documented here.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] — 2026-05-03

### Added

**Theme System**
- `ThemeProvider` component for runtime theme management via React Context
- `useTheme` hook for consuming the current theme in any component
- Base theme with full design token set (colors, spacing, radius, typography, shadows)
- `darkTheme` — dark mode variant
- `professionalTheme` — navy-toned corporate theme with tighter radius
- `mergeThemes` and `flattenThemeTokens` utility functions

**Core Components**
- `Button` — primary, secondary, outline, ghost variants; sm/md/lg sizes; loading state
- `Input` — label, error state, hint, help text, disabled state
- `Card` — header, footer, default and elevated variants

**Layout & Navigation**
- `DashboardLayout` — sidebar + content area wrapper
- `Sidebar` — collapsible navigation panel with logo and footer slots
- `Header` — top bar with title, breadcrumbs, subtitle, and actions slot
- `PageContent` — scrollable main content area
- `NavItem` — navigation link with active state, icon, and badge
- `NavGroup` — labeled group of nav items

**Additional Components**
- `Badge` — status indicator with success/warning/error/info variants and dot mode
- `Alert` — dismissable feedback message with all status variants
- `Tabs` — accessible content switcher with disabled tab support
- `Modal` — overlay dialog with Escape key and overlay click dismiss
- `Dropdown` — floating menu with outside click dismiss
- `Tooltip` — hover label with directional positioning

**Documentation**
- Storybook with interactive theme switcher
- Design system stories: Colors, Typography, Spacing & Radius
- Getting Started and Themes documentation pages
- Analytics Dashboard recipe story
