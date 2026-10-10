import type { ReactNode } from 'react'
import { Fieldset } from './Field'

// The quiz-setup idiom: a labelled row of single-select pills. Shared by the
// quiz/tournament setup screens — replaces four identical local copies.
// FilterPills below is the compact detail-page form of the same idea.
export function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Fieldset legend={label}>
      <div className="flex flex-wrap gap-2">{children}</div>
    </Fieldset>
  )
}

export function Pill({
  active,
  onClick,
  label,
  disabled = false,
  className = ''
}: {
  active: boolean
  onClick: () => void
  label: string
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`${active ? 'pill pill-active' : 'pill'} disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {label}
    </button>
  )
}

// A compact row of single-select filter pills (type, language, sort) for
// detail pages, named by a screen-reader-only legend.
export function FilterPills({
  label,
  options,
  value,
  onChange,
  className = ''
}: {
  label: string
  options: { key: string; label: string }[]
  value: string
  onChange: (key: string) => void
  className?: string
}) {
  return (
    <Fieldset legend={label} legendClassName="sr-only" className={className}>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <Pill
            key={o.key}
            active={value === o.key}
            onClick={() => onChange(o.key)}
            label={o.label}
            className="!py-0.5 !text-xs"
          />
        ))}
      </div>
    </Fieldset>
  )
}
