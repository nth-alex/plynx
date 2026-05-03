// Components
export { Button } from './components/Button/Button'
export { Input } from './components/Input/Input'
export { Card } from './components/Card/Card'

// Layout & Navigation (phase 4)
export { DashboardLayout } from './components/DashboardLayout/DashboardLayout'
export { Sidebar } from './components/Sidebar/Sidebar'
export { Header } from './components/Header/Header'
export { NavItem } from './components/NavItem/NavItem'
export { NavGroup } from './components/NavGroup/NavGroup'
export { PageContent } from './components/PageContent/PageContent'

// Theme system
export {
  ThemeProvider,
  ThemeContext,
  useTheme,
  baseTheme,
  mergeThemes,
} from './theme'
export type { Theme, ThemeTokens, ThemeContextType } from './theme'

// Types
export type { Size, Variant, Status } from './types'
