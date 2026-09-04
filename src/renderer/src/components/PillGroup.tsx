import type { ReactNode } from 'react'
import { Fieldset } from './Field'

// The quiz-setup idiom: a labelled row of single-select pills. Shared by the
// quiz/tournament setup screens — replaces four identical local copies.
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
  disabled = false
}: {
  active: boolean
  onClick: () => void
  label: string
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`${active ? 'pill pill-active' : 'pill'} disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {label}
    </button>
  )
}
