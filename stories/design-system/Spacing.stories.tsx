import type { Meta, StoryObj } from '@storybook/react'

const spacingScale = [
  { token: '--spacing-xs', name: 'xs', rem: '0.25rem', px: '4px' },
  { token: '--spacing-sm', name: 'sm', rem: '0.5rem',  px: '8px' },
  { token: '--spacing-md', name: 'md', rem: '1rem',    px: '16px' },
  { token: '--spacing-lg', name: 'lg', rem: '1.5rem',  px: '24px' },
  { token: '--spacing-xl', name: 'xl', rem: '2rem',    px: '32px' },
]

const radiusScale = [
  { token: '--radius-xs', name: 'xs', value: '0.25rem' },
  { token: '--radius-sm', name: 'sm', value: '0.375rem' },
  { token: '--radius-md', name: 'md', value: '0.5rem' },
  { token: '--radius-lg', name: 'lg', value: '0.75rem' },
]

function SpacingAndRadius() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Spacing Scale</h2>
        <p className="text-sm text-secondary mb-6">
          Use these spacing values via Tailwind's <code className="font-mono">gap-xs</code>,{' '}
          <code className="font-mono">p-md</code> etc. utilities.
        </p>
        <div className="flex flex-col gap-4">
          {spacingScale.map(({ token, name, rem, px }) => (
            <div key={token} className="flex items-center gap-4">
              <span className="w-10 shrink-0 text-xs font-mono text-secondary">{name}</span>
              <div
                className="bg-accent/60 rounded-xs h-4 shrink-0"
                style={{ width: rem }}
              />
              <span className="text-xs text-secondary">{rem} / {px}</span>
              <span className="text-xs text-secondary font-mono ml-auto">{token}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Border Radius Scale</h2>
        <p className="text-sm text-secondary mb-6">
          Radius values change per theme (e.g., Professional uses tighter radii).
        </p>
        <div className="flex flex-col gap-4">
          {radiusScale.map(({ token, name, value }) => (
            <div key={token} className="flex items-center gap-4">
              <span className="w-10 shrink-0 text-xs font-mono text-secondary">{name}</span>
              <div
                className="w-16 h-10 bg-accent/20 border border-accent/40"
                style={{ borderRadius: `var(${token})` }}
              />
              <span className="text-xs text-secondary">{value}</span>
              <span className="text-xs text-secondary font-mono ml-auto">{token}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: 'Design System/Spacing & Radius',
  component: SpacingAndRadius,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SpacingAndRadius>

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {}
