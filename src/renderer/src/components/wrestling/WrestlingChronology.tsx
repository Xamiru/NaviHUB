import { Link } from 'react-router-dom'
import type { WrestlingNeighbour } from '@shared/types'

// Wikipedia's chronology footer: step to the promotion's previous/next show,
// and to the same series a year either side. Both are derived from the library,
// so a missing arrow honestly means "not imported", never a dead link.

function Step({
  event,
  side,
  label
}: {
  event: WrestlingNeighbour | null
  side: 'prev' | 'next'
  label: string
}): JSX.Element {
  const year = event?.eventDate?.slice(0, 4)
  const content = (
    <>
      <span className="block text-xs uppercase tracking-wider text-gray-600">{label}</span>
      <span className="block truncate text-sm">
        {event ? (
          <>
            {side === 'prev' && <span className="text-gray-500">← </span>}
            {event.name}
            {year ? <span className="text-gray-500"> ({year})</span> : null}
            {side === 'next' && <span className="text-gray-500"> →</span>}
          </>
        ) : (
          <span className="text-gray-600">—</span>
        )}
      </span>
    </>
  )
  const align = side === 'prev' ? 'text-left' : 'text-right'
  if (!event) return <div className={`min-w-0 flex-1 ${align}`}>{content}</div>
  return (
    <Link
      to={`/wrestling/event/${event.id}`}
      className={`min-w-0 flex-1 hover:text-accent ${align}`}
    >
      {content}
    </Link>
  )
}

export default function WrestlingChronologyNav({
  prev,
  next,
  seriesName,
  seriesPrev,
  seriesNext
}: {
  prev: WrestlingNeighbour | null
  next: WrestlingNeighbour | null
  seriesName: string | null
  seriesPrev: WrestlingNeighbour | null
  seriesNext: WrestlingNeighbour | null
}): JSX.Element | null {
  const hasSeries = !!(seriesPrev || seriesNext)
  if (!prev && !next && !hasSeries) return null

  return (
    <div className="card mt-8 divide-y divide-base-700">
      <div className="flex items-start gap-4 p-4">
        <Step event={prev} side="prev" label="Previous event" />
        <Step event={next} side="next" label="Next event" />
      </div>
      {hasSeries && (
        <div className="flex items-start gap-4 p-4">
          <Step event={seriesPrev} side="prev" label={`Previous ${seriesName ?? 'in series'}`} />
          <Step event={seriesNext} side="next" label={`Next ${seriesName ?? 'in series'}`} />
        </div>
      )}
    </div>
  )
}
