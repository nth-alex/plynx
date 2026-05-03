import type { Meta, StoryObj } from '@storybook/react'
import { useTheme } from '../../src/theme'

function ColorSwatch({ name, cssVar }: { name: string; cssVar: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        style={{ background: `hsl(var(${cssVar}))` }}
        className="h-10 w-16 rounded-md border border-border shadow-xs shrink-0"
      />
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-secondary font-mono">{cssVar}</p>
      </div>
    </div>
  )
}

const colorTokens = [
  { name: 'Primary',    cssVar: '--color-primary' },
  { name: 'Secondary',  cssVar: '--color-secondary' },
  { name: 'Accent',     cssVar: '--color-accent' },
  { name: 'Background', cssVar: '--color-background' },
  { name: 'Foreground', cssVar: '--color-foreground' },
  { name: 'Border',     cssVar: '--color-border' },
  { name: 'Success',    cssVar: '--color-success' },
  { name: 'Warning',    cssVar: '--color-warning' },
  { name: 'Error',      cssVar: '--color-error' },
  { name: 'Info',       cssVar: '--color-info' },
]

function ColorPalette() {
  const { currentTheme } = useTheme()

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Color Palette — {currentTheme.name}
      </h2>
      <p className="text-sm text-secondary mb-6">
        Use the Theme selector in the toolbar to see how colors change per theme.
      </p>
      <div className="flex flex-col gap-4">
        {colorTokens.map((token) => (
          <ColorSwatch key={token.cssVar} name={token.name} cssVar={token.cssVar} />
        ))}
      </div>
    </div>
  )
}

const meta = {
  title: 'Design System/Colors',
  component: ColorPalette,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColorPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Palette: Story = {}
