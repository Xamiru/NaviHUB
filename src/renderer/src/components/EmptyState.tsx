import type { ReactNode } from 'react'

// The empty/first-run card. When a screen is empty, its ONE filled button
// belongs here in `action` — not in the header above it.
export default function EmptyState({
  title,
  body,
  action,
  className = 'card p-12 text-center'
}: {
  title: string
  body?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <p className="mb-1 text-lg font-medium">{title}</p>
      {body && <div className="text-sm text-gray-500">{body}</div>}
      {action && <div className="mx-auto mt-5 flex justify-center gap-2">{action}</div>}
    </div>
  )
}
