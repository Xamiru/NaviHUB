import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { GameRun, GameRunInput, GameRunNote, GameRunNoteInput } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { localInputDate, useHobbyAction } from '../lib/hobbyForms'
import { confirmDialog } from '../lib/confirm'
import { fmtDurationSec } from '../lib/useGameSession'
import Section from './Section'
import { Field } from './Field'
import Pager from './Pager'

const KINDS = { first: 'First playthrough', replay: 'Replay', newGamePlus: 'New Game Plus' }
const freshRun = (): GameRunInput => ({
  title: 'First playthrough',
  kind: 'first',
  state: 'active',
  difficulty: '',
  build: '',
  objective: '',
  stoppedAt: '',
  notes: ''
})

export function GameResumeCard({ mediaId, onOpen }: { mediaId: number; onOpen: () => void }) {
  const query = useQuery({
    queryKey: qk.games.runs(mediaId),
    queryFn: () => api.playthroughs.list(mediaId)
  })
  if (query.isLoading) return <p className="mb-6 text-sm text-ink-muted">Loading playthrough…</p>
  if (query.isError)
    return (
      <p className="mb-6 text-sm" role="alert">
        Could not load playthrough.{' '}
        <button className="btn" onClick={() => void query.refetch()}>
          Retry playthrough
        </button>
      </p>
    )
  const active = query.data?.find((r) => r.state === 'active')
  return (
    <Section title={active ? 'Resume your playthrough' : 'Playthrough journal'} className="mb-6">
      {active ? (
        <>
          <p className="text-lg font-semibold">{active.title}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {KINDS[active.kind]}
            {active.difficulty && ` · ${active.difficulty}`} · {fmtDurationSec(active.totalSeconds)}{' '}
            tracked
          </p>
          {active.stoppedAt && (
            <p className="mt-3 whitespace-pre-wrap text-sm">
              <strong>Where I stopped:</strong> {active.stoppedAt}
            </p>
          )}
          {active.objective && (
            <p className="mt-2 whitespace-pre-wrap text-sm">
              <strong>Next objective:</strong> {active.objective}
            </p>
          )}
          {active.build && (
            <p className="mt-2 whitespace-pre-wrap text-sm text-ink-muted">
              <strong>Build:</strong> {active.build}
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-ink-muted">
          Keep your current objective, build, and notes together for your next session.
        </p>
      )}
      <button className="btn mt-3" onClick={onOpen}>
        {active ? 'Update playthrough' : 'Manage playthroughs'}
      </button>
    </Section>
  )
}

export default function GamePlaythroughSection({ mediaId }: { mediaId: number }) {
  const qc = useQueryClient()
  const [selected, setSelected] = usePersistedState<number | null>(`game.run.${mediaId}`, null)
  const [page, setPage] = usePersistedState(`game.history.${mediaId}`, 0)
  const [editor, setEditor] = useState<GameRun | 'new' | null>(null)
  const [note, setNote] = useState<{ runId: number; value: GameRunNote | null } | null>(null)
  const action = useHobbyAction()
  const query = useQuery({
    queryKey: qk.games.runs(mediaId),
    queryFn: () => api.playthroughs.list(mediaId)
  })
  const history = useQuery({
    queryKey: qk.games.runHistory(mediaId, selected, page),
    queryFn: () => api.playthroughs.history(mediaId, selected, page)
  })
  const refresh = () => qc.invalidateQueries({ queryKey: qk.games.all })
  if (query.isLoading) return <p className="text-sm text-ink-muted">Loading playthroughs…</p>
  if (query.isError || !query.data)
    return (
      <p role="alert">
        Could not load playthroughs.{' '}
        <button className="btn" onClick={() => void query.refetch()}>
          Retry playthroughs
        </button>
      </p>
    )
  const runs = query.data
  const current = runs.find((r) => r.id === selected) ?? runs.find((r) => r.state === 'active')
  return (
    <Section title="Playthrough journal" className="my-8">
      <p className="mb-4 max-w-3xl text-sm text-ink-muted">
        Keep first runs, replays, and New Game Plus separate. New tracked sessions join the active
        playthrough chosen when you launch.
      </p>
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <Field label="View playthrough">
          <select
            className="input"
            value={selected ?? ''}
            onChange={(e) => {
              setSelected(e.target.value ? Number(e.target.value) : null)
              setPage(0)
            }}
          >
            <option value="">All playthroughs and unassigned sessions</option>
            {runs.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.state})
              </option>
            ))}
          </select>
        </Field>
        <button className="btn-primary" onClick={() => setEditor('new')}>
          New playthrough
        </button>
        <button
          className="btn"
          disabled={!current}
          onClick={() => current && setNote({ runId: current.id, value: null })}
        >
          Add journal entry
        </button>
      </div>
      {editor && (
        <RunEditor
          key={editor === 'new' ? 'new' : editor.id}
          value={editor === 'new' ? freshRun() : editor}
          onClose={() => setEditor(null)}
          onSave={async (input) => {
            const id = await api.playthroughs.save(
              mediaId,
              editor === 'new' ? null : editor.id,
              input
            )
            setSelected(id)
            setPage(0)
            setEditor(null)
            await refresh()
          }}
        />
      )}
      {runs.length === 0 && (
        <p className="py-4 text-sm text-ink-muted">
          No playthroughs yet. Create one to save a resume point. Your older tracked sessions are
          listed below.
        </p>
      )}
      {runs
        .filter((r) => selected === null || r.id === selected)
        .map((r) => (
          <article className="border-b border-line-subtle py-4" key={r.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-sm text-ink-muted">
                {r.state} · {KINDS[r.kind]} · {fmtDurationSec(r.totalSeconds)} · {r.sessionCount}{' '}
                sessions
              </p>
            </div>
            {r.difficulty && <p className="mt-2 text-sm">Difficulty: {r.difficulty}</p>}
            {r.build && <p className="mt-2 whitespace-pre-wrap text-sm">Build: {r.build}</p>}
            {r.stoppedAt && (
              <p className="mt-2 whitespace-pre-wrap text-sm">
                <strong>Where I stopped:</strong> {r.stoppedAt}
              </p>
            )}
            {r.objective && (
              <p className="mt-2 whitespace-pre-wrap text-sm">
                <strong>Next objective:</strong> {r.objective}
              </p>
            )}
            {r.notes && (
              <p className="mt-2 whitespace-pre-wrap text-sm text-ink-muted">{r.notes}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn" onClick={() => setEditor(r)}>
                Edit <span className="sr-only">{r.title}</span>
              </button>
              {r.state !== 'active' && (
                <button
                  className="btn"
                  disabled={action.busy}
                  onClick={() =>
                    void action.run(async () => {
                      await api.playthroughs.save(mediaId, r.id, { ...r, state: 'active' })
                      await refresh()
                    })
                  }
                >
                  Make active <span className="sr-only">{r.title}</span>
                </button>
              )}
              <button
                className="btn-ghost"
                disabled={action.busy}
                onClick={() =>
                  void action.run(async () => {
                    if (
                      !(await confirmDialog(
                        `Delete “${r.title}” and its journal entries? Tracked sessions and total playtime will remain.`,
                        { confirmLabel: 'Delete playthrough', danger: true }
                      ))
                    )
                      return
                    await api.playthroughs.remove(mediaId, r.id)
                    if (selected === r.id) setSelected(null)
                    setPage(0)
                    await refresh()
                  })
                }
              >
                Delete <span className="sr-only">{r.title}</span>
              </button>
            </div>
          </article>
        ))}
      {note && (
        <RunNoteEditor
          key={note.value?.id ?? `new-${note.runId}`}
          value={note.value ?? { entryDate: localInputDate(), body: '' }}
          onClose={() => setNote(null)}
          onSave={async (value) => {
            await api.playthroughs.saveNote(mediaId, note.runId, note.value?.id ?? null, value)
            setNote(null)
            setPage(0)
            await refresh()
          }}
        />
      )}
      <h3 className="mb-3 mt-8 text-lg font-semibold">Journal entries</h3>
      {history.isLoading ? (
        <p className="text-sm text-ink-muted">Loading history…</p>
      ) : history.isError || !history.data ? (
        <p role="alert">
          Could not load history.{' '}
          <button className="btn" onClick={() => void history.refetch()}>
            Retry history
          </button>
        </p>
      ) : (
        <>
          {!history.data.notes.length && (
            <p className="text-sm text-ink-muted">No journal entries on this page.</p>
          )}
          {history.data.notes.map((n) => (
            <article key={n.id} className="border-b border-line-subtle py-3">
              <p className="text-xs text-ink-muted">
                {n.entryDate} · {runs.find((r) => r.id === n.runId)?.title}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm">{n.body}</p>
              <div className="mt-2 flex gap-2">
                <button className="btn-ghost" onClick={() => setNote({ runId: n.runId, value: n })}>
                  Edit entry <span className="sr-only">{n.entryDate}</span>
                </button>
                <button
                  className="btn-ghost"
                  disabled={action.busy}
                  onClick={() =>
                    void action.run(async () => {
                      if (!(await confirmDialog('Delete this journal entry?', { danger: true })))
                        return
                      await api.playthroughs.removeNote(mediaId, n.runId, n.id)
                      setPage(0)
                      await refresh()
                    })
                  }
                >
                  Delete entry <span className="sr-only">{n.entryDate}</span>
                </button>
              </div>
            </article>
          ))}
          <h3 className="mb-3 mt-8 text-lg font-semibold">Tracked sessions</h3>
          {!history.data.sessions.length && (
            <p className="text-sm text-ink-muted">
              No tracked sessions on this page. Sessions appear after a linked game exits.
            </p>
          )}
          <ul className="divide-y divide-line-subtle">
            {history.data.sessions.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm">
                    {new Date(s.startedAt.replace(' ', 'T') + 'Z').toLocaleString()} ·{' '}
                    {fmtDurationSec(s.duration)}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {s.runTitle ?? 'Unassigned session'}
                  </p>
                </div>
                <Field label={`Playthrough for session ${s.id}`} hiddenLabel>
                  <select
                    className="input max-w-xs"
                    disabled={action.busy}
                    value={s.runId ?? ''}
                    onChange={(e) => {
                      const id = e.target.value ? Number(e.target.value) : null
                      void action.run(async () => {
                        await api.playthroughs.assignSession(mediaId, s.id, id)
                        await refresh()
                      })
                    }}
                  >
                    <option value="">Unassigned</option>
                    {runs.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </Field>
              </li>
            ))}
          </ul>
          <Pager
            page={page}
            pageCount={Math.ceil(Math.max(history.data.sessionTotal, history.data.noteTotal) / 50)}
            onChange={setPage}
          />
        </>
      )}
    </Section>
  )
}

function RunEditor({
  value,
  onClose,
  onSave
}: {
  value: GameRunInput
  onClose: () => void
  onSave: (v: GameRunInput) => Promise<void>
}) {
  const [form, setForm] = useState(value)
  const action = useHobbyAction()
  return (
    <form
      className="my-5 space-y-4 border-y border-line-subtle py-5"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(form))
      }}
    >
      <h3 className="text-lg font-semibold">Playthrough details</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Playthrough name">
          <input
            className="input"
            required
            maxLength={200}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <Field label="Run type">
          <select
            className="input"
            value={form.kind}
            onChange={(e) => setForm({ ...form, kind: e.target.value as GameRunInput['kind'] })}
          >
            {Object.entries(KINDS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Run status" description="Making this active pauses the other active run.">
          <select
            className="input"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value as GameRunInput['state'] })}
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </Field>
      </div>
      <Field label="Difficulty">
        <input
          className="input"
          maxLength={200}
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ['stoppedAt', 'Where I stopped'],
            ['objective', 'Next objective'],
            ['build', 'Build and equipment'],
            ['notes', 'Run notes']
          ] as const
        ).map(([key, label]) => (
          <Field key={key} label={label}>
            <textarea
              className="input min-h-24"
              maxLength={key === 'notes' ? 10000 : 2000}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </Field>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" disabled={action.busy || !form.title.trim()} type="submit">
          Save playthrough
        </button>
        <button className="btn-ghost" disabled={action.busy} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  )
}
function RunNoteEditor({
  value,
  onClose,
  onSave
}: {
  value: GameRunNoteInput
  onClose: () => void
  onSave: (v: GameRunNoteInput) => Promise<void>
}) {
  const [form, setForm] = useState(value)
  const action = useHobbyAction()
  return (
    <form
      className="my-5 space-y-3 border-y border-line-subtle py-5"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(form))
      }}
    >
      <Field label="Entry date">
        <input
          className="input max-w-xs"
          type="date"
          required
          value={form.entryDate}
          onChange={(e) => setForm({ ...form, entryDate: e.target.value })}
        />
      </Field>
      <Field label="Journal entry">
        <textarea
          className="input min-h-32"
          maxLength={10000}
          required
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </Field>
      <div className="flex gap-2">
        <button className="btn-primary" disabled={action.busy || !form.body.trim()} type="submit">
          Save journal entry
        </button>
        <button className="btn-ghost" type="button" disabled={action.busy} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  )
}
