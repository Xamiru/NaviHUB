import type { ReactNode } from 'react'

// The quiz-setup idiom: a labelled row of single-select pills. Shared by the
// quiz/tournament setup screens — replaces four identical local copies.
export function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="label mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function Pill({
  active,
  onClick,
  label
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button onClick={onClick} className={active ? 'pill pill-active' : 'pill'}>
      {label}
    </button>
  )
}
