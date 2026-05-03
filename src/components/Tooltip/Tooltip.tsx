import React, { ReactNode, useState, useId, cloneElement, isValidElement } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const sideClasses: Record<string, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
  left:   'right-full top-1/2 -translate-y-1/2 mr-1',
  right:  'left-full top-1/2 -translate-y-1/2 ml-1',
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const id = useId()

  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        'aria-describedby': id,
        onMouseEnter: () => setVisible(true),
        onMouseLeave: () => setVisible(false),
        onFocus: () => setVisible(true),
        onBlur: () => setVisible(false),
      })
    : children

  return (
    <span className="relative inline-flex">
      {trigger}
      {visible && (
        <span
          id={id}
          role="tooltip"
          className={[
            'absolute z-30 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background',
            sideClasses[side],
          ].join(' ')}
        >
          {content}
        </span>
      )}
    </span>
  )
}
