# Sidebar Menu Improvements

**Date:** 2026-05-04  
**Status:** Approved

## Overview

Improve the existing `Sidebar`, `NavItem`, and `NavGroup` components to support collapsed icon/initial mode with tooltips, collapsible nav groups with hierarchy lines, and a better-positioned collapse toggle button.

## Architecture

Introduce a `SidebarContext` that carries `collapsed: boolean`. `Sidebar` creates the context from its local `useState` and wraps its children in the provider. `NavItem` and `NavGroup` consume the context via a `useSidebarContext()` hook that throws if used outside a `Sidebar`.

**New file:** `src/components/Sidebar/SidebarContext.tsx`  
**Modified files:** `Sidebar.tsx`, `NavItem.tsx`, `NavGroup.tsx`

No breaking changes to the public API.

## NavItem: Collapsed Behavior

When `collapsed` is `true`, `NavItem` switches to a compact centered layout:

- **With icon:** render the icon centered; set `title` attribute to the full label for tooltip
- **Without icon:** derive a 2-letter initial from the label (`"Dashboard"` → `"Da"`) and render it as a small pill styled with `bg-accent/10 text-accent`
- **Tooltip:** native `title` attribute — no extra library, works accessibly
- **Badge:** hidden in collapsed state
- **Layout:** switches from `flex items-center gap-3 px-3 py-2` to `flex items-center justify-center px-0 py-2 w-full`

## NavGroup: Collapsible + Hierarchy Lines

`NavGroup` gains local expand/collapse state (`useState<boolean>(true)`, open by default).

- The group label row becomes a `<button>` — clicking toggles the group
- A chevron icon (▾ open / ▸ closed) sits on the right of the label row
- Children container gets `border-l border-border ml-3 pl-3` for a vertical hierarchy line
- When sidebar `collapsed` is `true`: `NavGroup` renders nothing (no label, no children, no line) — items stand alone at full width

## Collapse Toggle Button

The existing full-width bottom button is kept in flow (no `position: absolute`). Changes:

- Left-aligned: `justify-start` instead of `justify-center`
- Icon replaced: inline SVG chevron (`ChevronLeft` / `ChevronRight`) instead of plain text arrows `←` / `→`
- Padding adjusted to `px-4` so the icon aligns with nav item content
