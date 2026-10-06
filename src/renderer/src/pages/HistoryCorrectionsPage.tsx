import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { RefRow } from '../components/history/HistoryBits'
import { api } from '../lib/api'
import { useHistoryImageRefresh } from '../lib/historyUi'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { toast } from '../lib/toast'

// Notes left on History pages. Notes marked "correction" are the to-do list
// for the next research session: copy them into the chat and the session
// fixes the committed content.

export default function HistoryCorrectionsPage() {
  const [kind, setKind] = usePersistedState<'correction' | 'all'>('history.notes.kind', 'correction')
  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: qk.history.notes(kind),
    queryFn: () => api.history.notes(kind === 'all' ? undefined : 'correction')
  })
  useHistoryImageRefresh(dataUpdatedAt)
  if (isLoading) return <PageStatus>Loading…</PageStatus>
  const notes = data ?? []
  const copy = async (): Promise<void> => {
    const text = notes.map((n) => `- ${n.target.title} (${n.ref}): ${n.body}`).join('\n')
    await navigator.clipboard.writeText(text)
    toast(`Copied ${notes.length} ${notes.length === 1 ? 'note' : 'notes'}`, 'success')
  }
  return (
    <div className="mx-auto max-w-4xl p-6">
      <PageHeader
        title="Corrections and notes"
        subtitle="Mark a page note as a correction and it collects here, ready to hand to the next research session."
        actions={
          notes.length > 0 ? (
            <button type="button" className="btn-primary" onClick={() => void copy()}>
              Copy for a research session
            </button>
          ) : undefined
        }
        className="mb-5"
      />
      <div className="mb-5 flex gap-2" role="group" aria-label="Show">
        {(['correction', 'all'] as const).map((k) => (
          <button key={k} type="button" className={`pill ${kind === k ? 'pill-active' : ''}`} aria-pressed={kind === k} onClick={() => setKind(k)}>
            {k === 'correction' ? 'Corrections' : 'All notes'}
          </button>
        ))}
      </div>
      {notes.length === 0 ? (
        <EmptyState title={kind === 'correction' ? 'No corrections' : 'No notes'} body="Write one under Your notes on any History page." />
      ) : (
        <ul className="space-y-3">
          {notes.map((n) => (
            <li key={n.ref} className="card p-4">
              <RefRow info={n.target} extra={<span className="text-xs tabular-nums text-ink-muted">{n.updatedAt.slice(0, 10)}</span>} />
              <p className="mt-3 whitespace-pre-wrap text-sm text-ink-secondary" dir="auto">
                {n.body}
              </p>
              {n.kind === 'correction' && kind === 'all' && <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal-caution">Correction</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
