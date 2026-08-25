import type { ReactNode } from 'react'

export default function QuietWorkspace({
  title,
  description,
  children,
  actions,
  className = ''
}: {
  title: string
  description?: ReactNode
  children: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <section className={`card mb-6 p-5 sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-base-700 pb-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description && <div className="mt-1 text-sm text-gray-400">{description}</div>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}
