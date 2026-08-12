import { useQuery } from '@tanstack/react-query'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { WRESTLING_PROMOTIONS, promotionName } from '@shared/wrestling'
import type { WrestlingEvent } from '@shared/types'

// "1997 in professional wrestling": every promotion's shows for one year, in
// order, so the Monday Night Wars read as one calendar instead of two lists.

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const PROMO_COLOR = new Map(WRESTLING_PROMOTIONS.map((p) => [p.id, p.color]))

function EventRow({ event }: { event: WrestlingEvent }): JSX.Element {
  const day = event.eventDate ? Number(event.eventDate.slice(8, 10)) : null
  return (
    <Link
      to={`/wrestling/event/${event.id}`}
      className="flex items-baseline gap-3 border-b border-base-700 py-2 last:border-0 hover:text-accent"
    >
      <span className="w-7 shrink-0 text-right text-xs text-gray-500">{day ?? '—'}</span>
      <span
        className="shrink-0 text-xs font-medium"
        // Per-promotion accent: a content color, literal by convention.
        style={{ color: PROMO_COLOR.get(event.promotion) }}
      >
        {promotionName(event.promotion)}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm">{event.name}</span>
      <span className="shrink-0 text-xs text-gray-500">
        {event.matchCount > 0 ? `${event.matchCount} matches` : ''}
        {event.videoCount > 0 ? ' · owned' : ''}
      </span>
    </Link>
  )
}

export default function WrestlingYearPage(): JSX.Element {
  const { year = '' } = useParams()
  const navigate = useNavigate()
  const y = Number(year)

  const filter = { yearFrom: y, yearTo: y, sort: 'dateAsc' as const }
  const { data: events, isLoading } = useQuery({
    queryKey: qk.wrestling.events(filter),
    queryFn: () => api.wrestling.events(filter),
    enabled: Number.isFinite(y)
  })
  const { data: years } = useQuery({
    queryKey: qk.wrestling.allYears,
    queryFn: () => api.wrestling.allYears()
  })

  if (!Number.isFinite(y)) return <PageStatus>Not a year.</PageStatus>
  if (isLoading) return <PageStatus>Loading…</PageStatus>

  // Steps walk the years we actually HOLD, so a gap in the library skips rather
  // than landing on an empty page.
  const covered = (years ?? []).map((r) => r.year).sort((a, b) => a - b)
  const prevYear = [...covered].reverse().find((c) => c < y) ?? null
  const nextYear = covered.find((c) => c > y) ?? null

  const byMonth = new Map<number, WrestlingEvent[]>()
  for (const e of events ?? []) {
    const m = e.eventDate ? Number(e.eventDate.slice(5, 7)) - 1 : -1
    const arr = byMonth.get(m) ?? []
    arr.push(e)
    byMonth.set(m, arr)
  }
  const promotions = new Set((events ?? []).map((e) => e.promotion))

  return (
    <div className="p-6">
      <PageHeader
        back={{ to: '/wrestling', label: 'Wrestling' }}
        title={`${y} in professional wrestling`}
        subtitle={
          events?.length
            ? `${events.length} events across ${promotions.size} promotion${promotions.size === 1 ? '' : 's'}`
            : undefined
        }
        actions={
          <>
            <button
              className="btn"
              disabled={prevYear == null}
              onClick={() => prevYear != null && navigate(`/wrestling/year/${prevYear}`)}
            >
              ← {prevYear ?? 'Earlier'}
            </button>
            <button
              className="btn"
              disabled={nextYear == null}
              onClick={() => nextYear != null && navigate(`/wrestling/year/${nextYear}`)}
            >
              {nextYear ?? 'Later'} →
            </button>
          </>
        }
      />

      {!events?.length ? (
        <EmptyState
          title={`Nothing from ${y}`}
          body="No events that year have been imported yet."
        />
      ) : (
        <div className="space-y-6">
          {MONTHS.map((label, i) => {
            const rows = byMonth.get(i)
            if (!rows?.length) return null
            return (
              <section key={label}>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
                  {label}
                </h2>
                <div className="card px-4 py-1">
                  {rows.map((e) => (
                    <EventRow key={e.id} event={e} />
                  ))}
                </div>
              </section>
            )
          })}
          {/* Undated events still belong to the year via their row, but have no
              month to sit under. */}
          {byMonth.get(-1)?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
                Undated
              </h2>
              <div className="card px-4 py-1">
                {byMonth.get(-1)!.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  )
}
