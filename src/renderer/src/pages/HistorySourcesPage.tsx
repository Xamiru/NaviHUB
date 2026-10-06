import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { SOURCE_TYPES } from '@shared/history/schema'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { Field } from '../components/Field'
import { PersonalBadge } from '../components/history/HistoryBits'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'

// Every source History quotes or cites: books, articles, primary documents,
// institution pages. Wikipedia and Wikidata never appear here — they are
// finding aids only.

export default function HistorySourcesPage() {
  const { data, isLoading } = useQuery({ queryKey: qk.history.sources, queryFn: () => api.history.sources() })
  const [filter, setFilter] = usePersistedState('history.sources.filter', '')
  const [type, setType] = usePersistedState<string>('history.sources.type', 'all')
  const q = useDebouncedValue(filter, 150).trim().toLowerCase()
  const rows = useMemo(
    () =>
      (data ?? []).filter(
        (r) => (type === 'all' || r.type === type) && (!q || `${r.title} ${r.contributors}`.toLowerCase().includes(q))
      ),
    [data, q, type]
  )
  const types = useMemo(() => [...new Set((data ?? []).map((r) => r.type))], [data])

  if (isLoading) return <PageStatus>Loading sources…</PageStatus>
  return (
    <div className="mx-auto max-w-[1400px] p-6">
      <PageHeader
        title="Sources"
        subtitle="Every work History quotes or cites, with how often. Each quote on a page links back here."
        className="mb-5"
      />
      {!data?.length ? (
        <EmptyState title="No sources yet" body="Sources arrive with each research session." />
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <button type="button" className={`pill ${type === 'all' ? 'pill-active' : ''}`} aria-pressed={type === 'all'} onClick={() => setType('all')}>
              All <span className={type === 'all' ? 'opacity-70' : 'text-gray-500'}>{data.length}</span>
            </button>
            {types.map((t) => (
              <button key={t} type="button" className={`pill ${type === t ? 'pill-active' : ''}`} aria-pressed={type === t} onClick={() => setType(t)}>
                {SOURCE_TYPES[t as keyof typeof SOURCE_TYPES] ?? t}
              </button>
            ))}
            <div className="ml-auto w-72">
              <Field label="Filter sources" hiddenLabel>
                <input className="input" placeholder="Title or author" value={filter} onChange={(e) => setFilter(e.target.value)} />
              </Field>
            </div>
          </div>
          <div className="card overflow-x-auto p-0">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">History sources</caption>
              <thead className="border-b border-line-subtle text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                <tr>
                  <th scope="col" className="px-4 py-2 font-semibold">Title</th>
                  <th scope="col" className="px-4 py-2 font-semibold">By</th>
                  <th scope="col" className="px-4 py-2 font-semibold">Type</th>
                  <th scope="col" className="px-4 py-2 font-semibold">Year</th>
                  <th scope="col" className="px-4 py-2 text-right font-semibold">Citations</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-line-subtle/60">
                    <td className="px-4 py-2">
                      <Link to={`/history/source/${r.id}`} dir="auto" className="text-ink hover:text-accent">
                        {r.title}
                      </Link>
                      {r.personal && <PersonalBadge className="ml-2" />}
                    </td>
                    <td className="px-4 py-2 text-ink-secondary">{r.contributors}</td>
                    <td className="px-4 py-2 text-ink-secondary">{SOURCE_TYPES[r.type as keyof typeof SOURCE_TYPES] ?? r.type}</td>
                    <td className="px-4 py-2 tabular-nums text-ink-muted">{r.date.slice(0, 4)}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-ink-secondary">{r.cited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && <p className="p-6 text-sm text-ink-muted">No sources match.</p>}
          </div>
        </>
      )}
    </div>
  )
}
