import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { yearLabel } from '@shared/history/calendars'
import { regionLabel } from '@shared/history/schema'
import type { HistoryRefInfo, HistoryYear } from '@shared/types'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { RefLink, RefRow } from '../components/history/HistoryBits'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useHistoryImageRefresh } from '../lib/historyUi'

// The world in one year: every event under way, the states standing and who
// held their offices, births and deaths. Everything shown is a page title or a
// date the pages already cite; the year adds no text of its own.

const CALENDAR_NOTE: Record<HistoryYear['calendar'], string> = {
  julian: 'Days in this year are given in the Julian calendar, as the sources give them.',
  reform: 'The Gregorian reform: days before 15 October are Julian, days from then Gregorian.',
  gregorian: 'Days in this year are Gregorian.'
}

function calendarLine(data: HistoryYear): string {
  const parts = [CALENDAR_NOTE[data.calendar]]
  const span = (a: number, b: number): string => (a === b ? String(a) : `${a} to ${b}`)
  if (data.lunarHijri) parts.push(`${span(...data.lunarHijri)} AH`)
  if (data.solarHijri) parts.push(`${span(data.solarHijri.from, data.solarHijri.to)} SH${data.solarHijri.proleptic ? ' (proleptic)' : ''}`)
  return parts.join(' · ')
}

function RefSection({ title, people }: { title: string; people: HistoryRefInfo[] }) {
  if (people.length === 0) return null
  return (
    <section aria-labelledby={`year-${title}`}>
      <h2 id={`year-${title}`} className="mb-3 text-sm font-semibold text-ink">
        {title}
      </h2>
      <ul className="space-y-2.5">
        {people.map((p) => (
          <li key={p.ref}>
            <RefRow info={p} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function HistoryYearPage() {
  const { year: param } = useParams()
  const year = param && /^-?\d{1,4}$/.test(param) ? Number(param) : null
  const { data, isLoading, isError, refetch, dataUpdatedAt } = useQuery({
    queryKey: qk.history.year(year ?? 0),
    queryFn: () => api.history.year(year!),
    enabled: year !== null
  })
  useHistoryImageRefresh(dataUpdatedAt)

  if (year === null) return <PageStatus>That is not a year.</PageStatus>
  if (isLoading) return <PageStatus>Loading {yearLabel(year)}…</PageStatus>
  if (isError || !data) {
    return (
      <PageStatus>
        This year could not be loaded.{' '}
        <button type="button" className="underline" onClick={() => void refetch()}>
          Retry
        </button>
      </PageStatus>
    )
  }

  const states = data.states
  const empty = data.events.length === 0 && data.periods.length === 0 && states.length === 0 && data.born.length === 0 && data.died.length === 0
  return (
    <div className="mx-auto max-w-[1100px] p-6">
      <PageHeader title={data.label} subtitle={calendarLine(data)} back={{ to: '/history', label: 'History' }} className="mb-4" />
      <nav aria-label="Years" className="mb-6 flex flex-wrap items-center gap-2">
        <Link to={`/history/year/${year - 1}`} className="btn-ghost text-sm">
          Previous year ({yearLabel(year - 1)})
        </Link>
        <Link to={`/history/year/${year + 1}`} className="btn-ghost text-sm">
          Next year ({yearLabel(year + 1)})
        </Link>
        <Link to={`/history/map?year=${year}`} className="btn text-sm">
          Open the map at this year
        </Link>
      </nav>

      {empty ? (
        <EmptyState title={`Nothing dated to ${data.label} yet`} body="Years fill in as research sessions add pages." />
      ) : (
        <div className="space-y-10">
          {data.events.length > 0 && (
            <section aria-labelledby="year-events">
              <h2 id="year-events" className="mb-3 text-sm font-semibold text-ink">
                Under way
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {data.events.map((g) => (
                  <div key={g.region}>
                    <h3 className={`mb-2 text-xs font-semibold uppercase tracking-[0.16em] ${g.region === 'iran' ? 'text-accent' : 'text-signal-link'}`}>
                      {regionLabel(g.region)}
                    </h3>
                    <ul className="space-y-2.5">
                      {g.items.map((i) => (
                        <li key={i.ref}>
                          <RefRow info={i} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {states.length > 0 && (
            <section aria-labelledby="year-states">
              <h2 id="year-states" className="mb-3 text-sm font-semibold text-ink">
                States
              </h2>
              <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                {states.map(({ state, holders }) => (
                  <li key={state.ref}>
                    <RefRow info={state} />
                    {holders.length > 0 && (
                      <ul className="mt-1 space-y-0.5 pl-[52px] text-xs text-ink-secondary">
                        {holders.map((h, i) => (
                          <li key={`${h.person.ref}-${i}`}>
                            <span className="text-ink-muted">{h.title}:</span> <RefLink info={h.person} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.periods.length > 0 && <RefSection title="Periods" people={data.periods} />}
          <div className="grid gap-8 sm:grid-cols-2">
            <RefSection title="Born" people={data.born} />
            <RefSection title="Died" people={data.died} />
          </div>
        </div>
      )}
    </div>
  )
}
