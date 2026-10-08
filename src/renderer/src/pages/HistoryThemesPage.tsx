import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { RefRow } from '../components/history/HistoryBits'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useHistoryImageRefresh } from '../lib/historyUi'

// Themes across time: threads such as oil in Iran or constitutionalism that run
// through events, people and states of many decades. Each theme's page lays its
// thread out as one cross-century timeline.

export default function HistoryThemesPage() {
  const { data, isLoading, isError, refetch, dataUpdatedAt } = useQuery({ queryKey: qk.history.themes, queryFn: () => api.history.themes() })
  useHistoryImageRefresh(dataUpdatedAt)

  if (isLoading) return <PageStatus>Loading themes…</PageStatus>
  return (
    <div className="mx-auto max-w-[1100px] p-6">
      <PageHeader
        title="Themes"
        subtitle="Threads that run through the decades: the events, people and states of one story, in order."
        className="mb-5"
      />
      {isError ? (
        <PageStatus>
          The themes could not be loaded.{' '}
          <button type="button" className="underline" onClick={() => void refetch()}>
            Retry
          </button>
        </PageStatus>
      ) : !data?.length ? (
        <EmptyState title="No themes yet" body="Themes arrive with research sessions, like every other History page." />
      ) : (
        <ul className="divide-y divide-line-subtle rounded-lg border border-line-subtle bg-base-900/40">
          {data.map((t) => (
            <li key={t.info.ref} className="px-4 py-3">
              <RefRow
                info={t.info}
                extra={
                  <span className="text-xs tabular-nums text-ink-muted">
                    {t.entries} entries{t.from !== null && t.to !== null ? ` · ${t.from} to ${t.to}` : ''}
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
