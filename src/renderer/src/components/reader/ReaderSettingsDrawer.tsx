import type { ReactNode } from 'react'

// The reader settings panel, shared by the manga and book readers.
//
// A flex SIBLING of the reading column, not an overlay — the MiningPanel
// idiom: opening it narrows the page instead of covering it, so you can see a
// setting take effect on the page while you drag it. That is the whole reason
// this replaced the bottom-anchored popover, which sat on top of the thing it
// was changing and had to stay small.
//
// Escape is deliberately NOT wired here. Both readers already own a keydown
// chain that closes the topmost thing (help → chapter list → settings → mining
// panel → back to series); a useDialog here would double-fire it.
export default function ReaderSettingsDrawer({
  title = 'Reader settings',
  onClose,
  children
}: {
  title?: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div
      className="panel-in h-full w-[320px] shrink-0 overflow-y-auto border-l border-base-700 bg-base-900 p-4"
      role="dialog"
      aria-label={title}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">{title}</h2>
        <button className="text-gray-400 hover:text-white" aria-label="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

// A labelled slider row. Reader settings are mostly enumerations (PopoverRow +
// PopoverOption), but brightness and gap are genuinely continuous, and a row of
// preset pills for them would be a worse control than the one the value wants.
export function DrawerSlider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          {label}
        </span>
        <span className="text-xs tabular-nums text-gray-400">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
        aria-label={label}
      />
    </div>
  )
}
