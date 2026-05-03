import { ReactNode, useState, useEffect, useRef } from 'react'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
}

interface DropdownItemProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  danger?: boolean
}

export function DropdownItem({ label, onClick, disabled = false, danger = false }: DropdownItemProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
        'w-full px-4 py-2 text-left text-sm transition-colors',
        'hover:bg-border focus-visible:outline-none focus-visible:bg-border',
        danger ? 'text-error' : 'text-foreground',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export function Dropdown({ trigger, children, align = 'left', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [open])

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={[
            'absolute z-20 mt-1 min-w-[160px] rounded-md border border-border bg-background shadow-md',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          {children}
        </div>
      )}
    </div>
  )
}
