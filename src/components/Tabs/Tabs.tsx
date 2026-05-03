import React, { useState, ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className = '' }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTab ?? tabs[0]?.id ?? '')

  const activeTab = tabs.find((t) => t.id === activeId)

  return (
    <div className={className}>
      <div role="tablist" className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeId === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => setActiveId(tab.id)}
            className={[
              'px-4 py-2.5 text-sm font-medium transition-colors',
              'border-b-2 -mb-px',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              activeId === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-secondary hover:text-foreground',
              tab.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`tab-panel-${activeId}`}
        role="tabpanel"
        className="py-4"
      >
        {activeTab?.content}
      </div>
    </div>
  )
}
