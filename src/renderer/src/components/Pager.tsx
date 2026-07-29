import type { ReactNode } from 'react'

// Prev/Next pager for sectioned lists (cast, theme songs). Renders nothing for
// a single page.
export default function Pager({
  page,
  pageCount,
  onChange,
  label
}: {
  page: number // 0-based
  pageCount: number
  onChange: (page: number) => void
  label?: ReactNode // overrides "Page x of y"
}) {
  if (pageCount <= 1) return null
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn-ghost px-3 py-1 text-xs"
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>
      <span className="text-xs text-gray-500">{label ?? `Page ${page + 1} of ${pageCount}`}</span>
      <button
        className="btn-ghost px-3 py-1 text-xs"
        disabled={page >= pageCount - 1}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  )
}
