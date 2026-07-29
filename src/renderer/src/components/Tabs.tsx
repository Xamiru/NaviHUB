import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// THE tab idiom — one look for every tab row in the app (this replaced four
// competing implementations; don't add a fifth).
//
// Horizontal: underline tabs on a hairline rail (the Movies/TV look).
// Vertical: the sidebar/Settings inset-bar treatment.
// A tab with `to` renders a Link (URL owns the state — list sibling tabs);
// otherwise it's a button driving `onChange` (page-local state).

export interface TabDef<K extends string = string> {
  key: K
  label: string
  count?: number // dim trailing number
  to?: string
}

export default function Tabs<K extends string>({
  tabs,
  value,
  onChange,
  orientation = 'horizontal',
  actions,
  className = ''
}: {
  tabs: TabDef<K>[]
  value: K
  onChange?: (key: K) => void
  orientation?: 'horizontal' | 'vertical'
  actions?: ReactNode // right-aligned slot on the horizontal rail
  className?: string
}) {
  const horizontal = orientation === 'horizontal'
  const railClass = horizontal
    ? `flex items-center gap-1 border-b border-base-700 ${className}`
    : `flex flex-wrap gap-1 md:flex-col ${className}`

  const tabClass = (active: boolean): string =>
    horizontal
      ? `px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${
          active
            ? 'border-accent text-white'
            : 'border-transparent text-gray-400 hover:text-white'
        }`
      : `rounded-md px-3 py-2 text-left text-sm transition-colors ${
          active
            ? 'bg-accent/10 text-accent md:shadow-[inset_2px_0_0_0_rgb(var(--accent))]'
            : 'text-gray-400 hover:bg-base-800 hover:text-white'
        }`

  return (
    <div role="tablist" aria-orientation={orientation} className={railClass}>
      {tabs.map((t) => {
        const active = t.key === value
        const body = (
          <>
            {t.label}
            {t.count != null && <span className="ml-1.5 text-xs opacity-60">{t.count}</span>}
          </>
        )
        return t.to ? (
          <Link key={t.key} to={t.to} role="tab" aria-selected={active} className={tabClass(active)}>
            {body}
          </Link>
        ) : (
          <button
            key={t.key}
            role="tab"
            aria-selected={active}
            className={tabClass(active)}
            onClick={() => onChange?.(t.key)}
          >
            {body}
          </button>
        )
      })}
      {actions && horizontal && <div className="ml-auto flex items-center gap-2 pb-1">{actions}</div>}
    </div>
  )
}
