import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { Field } from '../components/Field'
import { RefRow } from '../components/history/HistoryBits'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { historyPath, useHistoryImageRefresh } from '../lib/historyUi'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { toast } from '../lib/toast'
import type { HistoryNoteRow, HistoryRequest } from '@shared/types'

// Notes left on History pages and pages the user asked for. Notes marked
// "correction" and open requests are the to-do list for the next research
// session: copy them into the chat and the session fixes the committed content
// or builds the requested pages.

type View = 'correction' | 'all' | 'requests'

const VIEWS: { key: View; label: string }[] = [
  { key: 'correction', label: 'Corrections' },
  { key: 'all', label: 'All notes' },
  { key: 'requests', label: 'Requests' }
]

function sessionText(notes: HistoryNoteRow[], requests: HistoryRequest[]): string {
  const parts: string[] = []
  if (notes.length > 0) parts.push(notes.map((n) => `- ${n.target.title} (${n.ref}): ${n.body}`).join('\n'))
  const open = requests.filter((r) => !r.doneAt)
  if (open.length > 0) {
    parts.push(
      ['Requested pages:', ...open.map((r) => `- ${r.query}${r.resolved ? ` (now ${r.resolved.ref})` : ''}${r.body ? `: ${r.body}` : ''}`)].join('\n')
    )
  }
  return parts.join('\n\n')
}

export default function HistoryCorrectionsPage() {
  const [params] = useSearchParams()
  const [view, setView] = usePersistedState<View>('history.notes.kind', params.get('tab') === 'requests' ? 'requests' : 'correction')
  const noteKind = view === 'all' ? 'all' : 'correction'
  const notesQuery = useQuery({
    queryKey: qk.history.notes(noteKind),
    queryFn: () => api.history.notes(noteKind === 'all' ? undefined : 'correction')
  })
  const requestsQuery = useQuery({ queryKey: qk.history.requests, queryFn: () => api.history.requests() })
  useHistoryImageRefresh(Math.max(notesQuery.dataUpdatedAt, requestsQuery.dataUpdatedAt))
  // Each view waits on and fails with its own query; the copy takes whatever
  // has loaded, so a broken notes read never hides the requests.
  const shown = view === 'requests' ? requestsQuery : notesQuery
  if (shown.isLoading) return <PageStatus>Loading…</PageStatus>
  const notes = notesQuery.data ?? []
  const requests = requestsQuery.data ?? []
  const openRequests = requests.filter((r) => !r.doneAt).length
  const copyCount = notes.length + openRequests
  const copy = async (): Promise<void> => {
    await navigator.clipboard.writeText(sessionText(notes, requests))
    const what = [
      notes.length > 0 ? `${notes.length} ${noteKind === 'all' ? 'note' : 'correction'}${notes.length === 1 ? '' : 's'}` : null,
      openRequests > 0 ? `${openRequests} ${openRequests === 1 ? 'request' : 'requests'}` : null
    ]
    toast(`Copied ${what.filter(Boolean).join(' and ')}`, 'success')
  }
  return (
    <div className="mx-auto max-w-4xl p-6">
      <PageHeader
        title="Corrections and requests"
        actions={
          copyCount > 0 ? (
            <button type="button" className="btn-primary" onClick={() => void copy()}>
              Copy for a research session
            </button>
          ) : undefined
        }
        className="mb-5"
      />
      <div className="mb-5 flex gap-2" role="group" aria-label="Show">
        {VIEWS.map((v) => (
          <button key={v.key} type="button" className={`pill ${view === v.key ? 'pill-active' : ''}`} aria-pressed={view === v.key} onClick={() => setView(v.key)}>
            {v.label}
            {v.key === 'requests' && openRequests > 0 ? <span className="ml-1.5 tabular-nums">{openRequests}</span> : null}
          </button>
        ))}
      </div>
      {shown.isError ? (
        <PageStatus>
          {view === 'requests' ? 'Your page requests could not be loaded.' : 'Your notes could not be loaded.'}{' '}
          <button type="button" className="underline" onClick={() => void shown.refetch()}>
            Retry
          </button>
        </PageStatus>
      ) : view === 'requests' ? (
        <RequestsView requests={requests} />
      ) : notes.length === 0 ? (
        <EmptyState title={view === 'correction' ? 'No corrections' : 'No notes'} body="Write one under Your notes on any History page." />
      ) : (
        <ul className="space-y-3">
          {notes.map((n) => (
            <li key={n.ref} className="card p-4">
              <RefRow info={n.target} extra={<span className="text-xs tabular-nums text-ink-muted">{n.updatedAt.slice(0, 10)}</span>} />
              <p className="mt-3 whitespace-pre-wrap text-sm text-ink-secondary" dir="auto">
                {n.body}
              </p>
              {n.kind === 'correction' && view === 'all' && <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal-caution">Correction</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RequestsView({ requests }: { requests: HistoryRequest[] }) {
  const queryClient = useQueryClient()
  const [name, setName] = usePersistedState('history.request.name', '')
  const [body, setBody] = useState('')
  const refresh = (): Promise<void> => queryClient.invalidateQueries({ queryKey: qk.history.requests })

  const add = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!name.trim()) return
    await api.history.addRequest(name, body)
    setName('')
    setBody('')
    await refresh()
  }
  const setDone = async (r: HistoryRequest, done: boolean): Promise<void> => {
    if (!(await api.history.setRequestDone(r.id, done))) toast(`“${r.query}” is already an open request`, 'warning')
    await refresh()
  }
  const remove = async (r: HistoryRequest): Promise<void> => {
    if (!(await confirmDialog(`Remove the request for “${r.query}”?`, { confirmLabel: 'Remove', danger: true }))) return
    await api.history.removeRequest(r.id)
    await refresh()
  }

  return (
    <>
      <form className="card mb-5 flex flex-wrap items-end gap-3 p-4" onSubmit={(e) => void add(e)}>
        <Field label="Name to look up" className="min-w-[14rem] flex-1">
          <input className="input w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Kingdom of Benin" />
        </Field>
        <Field label="Note (optional)" className="min-w-[14rem] flex-[2]">
          <input className="input w-full" value={body} onChange={(e) => setBody(e.target.value)} placeholder="What you want to know" />
        </Field>
        <button type="submit" className="btn-primary" disabled={!name.trim()}>
          Request page
        </button>
      </form>
      {requests.length === 0 ? (
        <EmptyState title="No requests" body="Ask for a page here, or from Ctrl+K when a History search finds nothing." />
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => {
            const to = r.resolved ? historyPath(r.resolved.ref) : null
            return (
              <li key={r.id} className={`card p-4 ${r.doneAt ? 'opacity-70' : ''}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-ink" dir="auto">
                      {r.query}
                    </span>
                    <span className="block text-xs tabular-nums text-ink-muted">
                      Requested {r.createdAt.slice(0, 10)}
                      {r.doneAt ? ` · done ${r.doneAt.slice(0, 10)}` : ''}
                    </span>
                  </span>
                  {to && r.resolved ? (
                    <Link to={to} className="text-xs font-medium text-signal-link hover:underline">
                      Now available: {r.resolved.title}
                    </Link>
                  ) : null}
                  <button type="button" className="btn-ghost text-xs" onClick={() => void setDone(r, !r.doneAt)}>
                    {r.doneAt ? 'Reopen' : 'Mark done'}
                  </button>
                  <button type="button" className="btn-ghost text-xs" aria-label={`Remove the request for ${r.query}`} title="Remove" onClick={() => void remove(r)}>
                    Remove
                  </button>
                </div>
                {r.body ? (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-ink-secondary" dir="auto">
                    {r.body}
                  </p>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
