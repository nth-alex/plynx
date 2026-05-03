import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSidebarContext } from './SidebarContext'

describe('useSidebarContext', () => {
  it('returns collapsed: false when used outside a Sidebar', () => {
    const { result } = renderHook(() => useSidebarContext())
    expect(result.current.collapsed).toBe(false)
  })
})
