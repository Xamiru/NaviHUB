import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import HubCard from '../components/HubCard'
import WrestlingImportPanel from '../components/wrestling/WrestlingImportPanel'
import { WRESTLING_PROMOTIONS } from '@shared/wrestling'

// The wrestling hub: one card per promotion plus the install/refresh flow.
// Promotions come from shared/wrestling.ts, so adding one needs no page change.
export default function WrestlingHomePage(): JSX.Element {
  const [showImport, setShowImport] = usePersistedState('wrestling.showImport', false)
  const { data: overview, isLoading } = useQuery({
    queryKey: qk.wrestling.overview,
    queryFn: () => api.wrestling.overview()
  })
  const { data: recent } = useQuery({
    queryKey: qk.wrestling.recent,
    queryFn: () => api.wrestling.recentlyAdded()
  })
  const { data: years } = useQuery({
    queryKey: qk.wrestling.allYears,
    queryFn: () => api.wrestling.allYears()
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>

  const installed = (overview?.totals.events ?? 0) > 0
  const byPromo = new Map(overview?.promotions.map((p) => [p.promotion, p]) ?? [])

  return (
    <div className="p-6">
      <PageHeader
        title="Wrestling"
        subtitle={
          installed
            ? `${overview!.totals.events.toLocaleString()} events · ${overview!.totals.matches.toLocaleString()} matches · ${overview!.totals.wrestlers.toLocaleString()} wrestlers`
            : 'A wiki of every pay-per-view, and your own collection'
        }
        actions={
          installed ? (
            <button className="btn" onClick={() => setShowImport((v) => !v)}>
              {showImport ? 'Hide import' : 'Update wiki'}
            </button>
          ) : undefined
        }
      />

      {!installed ? (
        <EmptyState
          title="The wiki is empty"
          body="Import events, cards and wrestlers from Wikipedia to get started."
          action={
            <div className="w-full max-w-xl text-left">
              <WrestlingImportPanel installed={false} />
            </div>
          }
        />
      ) : (
        <>
          {showImport && (
            <div className="mb-8">
              <WrestlingImportPanel installed onDone={() => undefined} />
            </div>
          )}

          {(recent?.events.length || recent?.loose.length) && (
            <Section
              title="Recently added"
              subtitle={<Link to="/wrestling/collection" className="hover:text-accent">Collection →</Link>}
            >
              <div className="flex flex-wrap gap-2">
                {recent!.events.slice(0, 6).map((e) => (
                  <Link key={`e${e.id}`} to={`/wrestling/event/${e.id}`} className="chip hover:text-accent">
                    {e.name}
                    <span className="ml-1 text-gray-500">{e.videoCount}</span>
                  </Link>
                ))}
                {recent!.loose.slice(0, 6).map((m) => (
                  <Link
                    key={`m${m.id}`}
                    to="/wrestling/collection"
                    className="chip hover:text-accent"
                    title={m.showLabel ?? 'Loose match'}
                  >
                    {m.title}
                  </Link>
                ))}
              </div>
            </Section>
          )}

          <Section title="Promotions">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
              {WRESTLING_PROMOTIONS.map((p) => {
                const stats = byPromo.get(p.id)
                const span =
                  stats?.firstYear != null
                    ? `${stats.firstYear}–${stats.lastYear ?? ''}`
                    : 'Not imported yet'
                return (
                  <HubCard
                    key={p.id}
                    to={`/wrestling/p/${p.id}`}
                    title={p.short}
                    badge={stats ? String(stats.eventCount) : undefined}
                    body={p.name}
                    meta={
                      <span className="text-xs text-gray-500">
                        {span}
                        {stats && stats.ownedCount > 0 ? ` · ${stats.ownedCount} owned` : ''}
                      </span>
                    }
                  />
                )
              })}
            </div>
          </Section>

          {!!years?.length && (
            <Section title="By year" subtitle={`${years.length} years covered`}>
              <div className="flex flex-wrap gap-1.5">
                {years.map((y) => (
                  <Link key={y.year} to={`/wrestling/year/${y.year}`} className="pill">
                    {y.year}
                    <span className="ml-1 text-gray-500">{y.count}</span>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          {overview!.totals.rated > 0 && (
            <Section title="Your ratings" subtitle={`${overview!.totals.rated} rated`}>
              <Link to="/wrestling/rated" className="text-sm text-accent hover:text-accent-hover">
                Highest-rated matches →
              </Link>
            </Section>
          )}
        </>
      )}
    </div>
  )
}
