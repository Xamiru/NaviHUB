import type { ReactNode } from 'react'

// Uppercase-headed content section shared by the detail/stats/home pages.
// `subtitle` renders right-aligned beside the heading (e.g. a small fact).
export default function Section({
  title,
  subtitle,
  className = 'mb-8',
  children
}: {
  title: string
  subtitle?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <section className={className}>
      <div className="mb-3 flex items-center gap-3">
        <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">
          {title}
        </h2>
        <span className="h-px flex-1 bg-line-subtle" aria-hidden="true" />
        {subtitle && <span className="text-xs text-ink-muted">{subtitle}</span>}
      </div>
      {children}
    </section>
  )
}
