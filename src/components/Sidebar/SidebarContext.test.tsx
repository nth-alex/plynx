import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSidebarContext } from './SidebarContext'

describe('useSidebarContext', () => {
  it('throws when used outside a Sidebar', () => {
    expect(() => renderHook(() => useSidebarContext())).toThrow(
      'useSidebarContext must be used within a Sidebar'
    )
  })
})
