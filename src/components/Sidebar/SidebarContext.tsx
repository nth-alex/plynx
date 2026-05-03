import { createContext, useContext } from 'react'

interface SidebarContextValue {
  collapsed: boolean
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebarContext(): SidebarContextValue {
  return useContext(SidebarContext) ?? { collapsed: false }
}
