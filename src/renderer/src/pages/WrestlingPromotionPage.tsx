import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import CoverImage from '../components/CoverImage'
import { Group, Pill } from '../components/PillGroup'
import { promotionCfg } from '@shared/wrestling'
import type { WrestlingEvent, WrestlingEventFilter } from '@shared/types'

const SORTS: { key: NonNullable<WrestlingEventFilter['sort']>; label: string }[] = [
  { key: 'date', label: 'Newest' },
  { key: 'dateAsc', label: 'Oldest' },
  { key: 'name', label: 'Name' },
  { key: 'rating', label: 'My rating' }
]

function EventCard({ event }: { event: WrestlingEvent }): JSX.Element {
  return (
    <Link to={`/wrestling/event/${event.id}`} className="card group overflow-hidden">
      <CoverImage
        path={event.posterPath}
        alt={event.name}
        className="aspect-[2/3] w-full object-cover"
        rounded=""
      />
      <div className="p-3">
        <p className="truncate font-medium transition-colors group-hover:text-accent">
          {event.name}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">
          {event.eventDate?.slice(0, 4) ?? '—'}
          {event.matchCount > 0 ? ` · ${event.matchCount} matches` : ''}
          {event.videoCount > 0 ? ' · owned' : ''}
        </p>
      </div>
    </Link>
  )
}

export default function WrestlingPromotionPage(): JSX.Element {
  const { promo = '' } = useParams()
  const cfg = promotionCfg(promo)

  const [search, setSearch] = usePersistedState('wrestling.search', '')
  const [sort, setSort] = usePersistedState<NonNullable<WrestlingEventFilter['sort']>>(
    'wrestling.sort',
    'date'
  )
  const [decade, setDecade] = usePersistedState<number | null>('wrestling.decade', null)
  const [year, setYear] = usePersistedState<number | null>('wrestling.year', null)
  const [ownedOnly, setOwnedOnly] = usePersistedState('wrestling.owned', false)
  const debounced = useDebouncedValue(search)

  const filter: WrestlingEventFilter = {
    promotion: cfg?.id ?? null,
    search: debounced || null,
    sort,
    ownedOnly: ownedOnly || undefined,
    // A picked year wins over its decade — the rail narrows, it doesn't stack.
    yearFrom: year ?? decade ?? undefined,
    yearTo: year ?? (decade != null ? decade + 9 : undefined)
  }
  const { data: events, isLoading } = useQuery({
    queryKey: qk.wrestling.events(filter),
    queryFn: () => api.wrestling.events(filter),
    enabled: !!cfg
  })
  // Years come from their own count query, not from the filtered results —
  // otherwise picking 1997 would leave 1997 as the only year on the rail.
  const { data: years } = useQuery({
    queryKey: qk.wrestling.yearCounts(cfg?.id ?? ''),
    queryFn: () => api.wrestling.yearCounts(cfg!.id),
    enabled: !!cfg
  })

  const { visible, sentinelRef } = useIncrementalList(events ?? [])

  if (!cfg) return <PageStatus>Unknown promotion.</PageStatus>

  // Decades and years are built from the promotion's own span, so a defunct
  // promotion never offers years it never ran.
  const allYears = years ?? []
  const decades = [...new Set(allYears.map((y) => Math.floor(y.year / 10) * 10))].sort(
    (a, b) => b - a
  )
  const yearsInDecade = allYears.filter(
    (y) => decade == null || (y.year >= decade && y.year <= decade + 9)
  )

  return (
    <div className="p-6">
      <PageHeader
        back={{ to: '/wrestling', label: 'Wrestling' }}
        title={cfg.short}
        subtitle={cfg.name}
      />

      <div className="mb-5 space-y-4">
        <input
          className="input max-w-md"
          placeholder="Search events…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-6">
          <Group label="Sort">
            {SORTS.map((s) => (
              <Pill key={s.key} active={sort === s.key} onClick={() => setSort(s.key)} label={s.label} />
            ))}
          </Group>
          {decades.length > 1 && (
            <Group label="Decade">
              <Pill
                active={decade == null}
                onClick={() => {
                  setDecade(null)
                  setYear(null)
                }}
                label="All"
              />
              {decades.map((d) => (
                <Pill
                  key={d}
                  active={decade === d}
                  onClick={() => {
                    setDecade(decade === d ? null : d)
                    // A year from the old decade would filter everything away.
                    setYear(null)
                  }}
                  label={`${d}s`}
                />
              ))}
            </Group>
          )}
          {yearsInDecade.length > 1 && (
            <Group label="Year">
              <Pill active={year == null} onClick={() => setYear(null)} label="All" />
              {yearsInDecade.map((y) => (
                <Pill
                  key={y.year}
                  active={year === y.year}
                  onClick={() => setYear(year === y.year ? null : y.year)}
                  label={`${y.year} (${y.count})`}
                />
              ))}
            </Group>
          )}
          <Group label="Collection">
            <Pill active={!ownedOnly} onClick={() => setOwnedOnly(false)} label="All" />
            <Pill active={ownedOnly} onClick={() => setOwnedOnly(true)} label="Owned" />
          </Group>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : !events?.length ? (
        <EmptyState
          title="No events"
          body={
            debounced || decade != null || year != null || ownedOnly
              ? 'Nothing matches those filters.'
              : `${cfg.short} has not been imported yet.`
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {visible.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
          <div ref={sentinelRef} />
        </>
      )}
    </div>
  )
}
