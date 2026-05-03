import type { Meta, StoryObj } from '@storybook/react'

const textSizes = [
  { label: 'Display',    className: 'text-4xl font-bold',     sample: 'Dashboard Overview' },
  { label: 'Heading 1',  className: 'text-3xl font-bold',     sample: 'Page Title' },
  { label: 'Heading 2',  className: 'text-2xl font-semibold', sample: 'Section Title' },
  { label: 'Heading 3',  className: 'text-xl font-semibold',  sample: 'Card Title' },
  { label: 'Large body', className: 'text-lg',                sample: 'Introductory paragraph text' },
  { label: 'Body',       className: 'text-base',              sample: 'Regular body text — most content uses this size' },
  { label: 'Small',      className: 'text-sm',                sample: 'Labels, metadata, secondary text' },
  { label: 'XSmall',     className: 'text-xs',                sample: 'Captions, timestamps, hints' },
]

const fontWeights = [
  { label: 'Normal (400)',   className: 'font-normal' },
  { label: 'Medium (500)',   className: 'font-medium' },
  { label: 'Semibold (600)', className: 'font-semibold' },
  { label: 'Bold (700)',     className: 'font-bold' },
]

function TypographyShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Type Scale</h2>
        <div className="flex flex-col gap-6">
          {textSizes.map(({ label, className, sample }) => (
            <div key={label} className="flex items-baseline gap-4">
              <span className="w-28 shrink-0 text-xs text-secondary font-mono">{label}</span>
              <p className={`${className} text-foreground`}>{sample}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Font Weights</h2>
        <div className="flex flex-col gap-4">
          {fontWeights.map(({ label, className }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="w-36 shrink-0 text-xs text-secondary font-mono">{label}</span>
              <p className={`${className} text-base text-foreground`}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Monospace</h2>
        <p className="font-mono text-sm text-foreground bg-border/30 rounded-md px-4 py-3">
          const theme = useTheme()
        </p>
      </div>
    </div>
  )
}

const meta = {
  title: 'Design System/Typography',
  component: TypographyShowcase,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TypographyShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {}
