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
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">{title}</h2>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
      {children}
    </section>
  )
}
