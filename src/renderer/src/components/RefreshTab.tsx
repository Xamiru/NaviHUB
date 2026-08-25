import { useState } from 'react'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useRefreshRun } from '../lib/useRefreshRun'
import { toastError } from '../lib/toast'
import { Group, Pill } from './PillGroup'
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import { REFRESH_ASPECTS, aspectsForTypes } from '@shared/refresh'
import type { RefreshAspect } from '@shared/refresh'
import type { MediaType, RefreshPreview, RefreshRunStatus } from '@shared/types'
import QuietWorkspace from './QuietWorkspace'
import OperationFlow from './OperationFlow'

// The Refresh tab on /bulk: re-run each title's importer, writing only the
// aspects you pick. The counterpart to the Import tab — that one fills the
// shelf, this one updates what is already on it.
//
// Preview is a plain await in the handler, not a query: it is a COUNT, and an
// enabled query would re-run it on every remount (the Import tab's posture).
export default function RefreshTab(): React.JSX.Element {
  const [types, setTypes] = usePersistedState<MediaType[]>('refresh.types', ['tv'])
  const [aspects, setAspects] = usePersistedState<RefreshAspect[]>('refresh.aspects', ['banner'])
  const [onlyMissing, setOnlyMissing] = usePersistedState('refresh.onlyMissing', true)
  const [preview, setPreview] = usePersistedState<RefreshPreview | null>('refresh.preview', null)
  const [checking, setChecking] = useState(false)
  const run = useRefreshRun()

  const offered = aspectsForTypes(types)
  // A tick the current types can't serve is dropped from the request rather
  // than silently ignored by the runner.
  const active = aspects.filter((a) => offered.includes(a))
  const req = { types, aspects: active, onlyMissing }
  const canRun = types.length > 0 && active.length > 0
  const running = run.status?.state === 'running'
  const finished = run.status?.state === 'done'

  function toggleType(t: MediaType): void {
    setTypes(types.includes(t) ? types.filter((x) => x !== t) : [...types, t])
    setPreview(null)
  }

  function toggleAspect(a: RefreshAspect): void {
    setAspects(aspects.includes(a) ? aspects.filter((x) => x !== a) : [...aspects, a])
    setPreview(null)
  }

  async function check(): Promise<void> {
    setChecking(true)
    try {
      setPreview(await api.refresh.preview(req))
    } catch (e) {
      toastError(e)
    } finally {
      setChecking(false)
    }
  }

  async function start(): Promise<void> {
    try {
      await api.refresh.start(req)
      setPreview(null)
    } catch (e) {
      toastError(e)
    }
    await run.kick()
  }

  async function stop(): Promise<void> {
    await api.refresh.cancel()
    await run.kick()
  }

  return (
    <div className="space-y-6">
      <OperationFlow
        label="Library refresh stages"
        steps={[
          { label: 'Configure', state: preview || running || finished ? 'complete' : 'active' },
          { label: 'Check', state: running || finished ? 'complete' : preview ? 'active' : 'pending' },
          { label: 'Run', state: finished ? 'complete' : running ? 'active' : 'pending' }
        ]}
      />
      <QuietWorkspace
        title="Configure refresh"
        description="Choose which existing titles and fields should be refreshed before counting the work."
      >
        <div className="space-y-4">
        <Group label="Media types">
          {MEDIA_CONFIGS.map((cfg) => (
            <Pill
              key={cfg.key}
              active={types.includes(cfg.key)}
              onClick={() => toggleType(cfg.key)}
              label={cfg.plural}
            />
          ))}
        </Group>

        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            What to refresh
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {REFRESH_ASPECTS.map((a) => {
              const supported = offered.includes(a.key)
              const on = supported && aspects.includes(a.key)
              return (
                <button
                  key={a.key}
                  className={`${on ? 'chip-toggle chip-toggle-active' : 'chip-toggle'} text-left ${
                    supported ? '' : 'opacity-40'
                  }`}
                  disabled={!supported}
                  aria-pressed={on}
                  title={
                    supported
                      ? a.hint
                      : `No selected type can serve this — ${a.label.toLowerCase()} needs ${a.types.join(', ')}`
                  }
                  onClick={() => toggleAspect(a.key)}
                >
                  <span className="block text-sm">{a.label}</span>
                  <span className="block text-[10px] text-gray-500">{a.hint}</span>
                </button>
              )
            })}
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 accent-accent"
            checked={onlyMissing}
            onChange={(e) => {
              setOnlyMissing(e.target.checked)
              setPreview(null)
            }}
          />
          <span>
            Skip titles that already have it
            <span className="mt-0.5 block text-xs text-gray-500">
              On: a top-up — only titles missing something you ticked. Off: re-pull everything, which
              is what you want when the source itself changed.
            </span>
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button className="btn-ghost" onClick={check} disabled={!canRun || checking || run.running}>
            {checking ? 'Counting…' : 'Check how many'}
          </button>
          <button className="btn-primary" onClick={start} disabled={!canRun || run.running}>
            Start refresh
          </button>
          {preview && (
            <span className="text-sm text-gray-400">
              {preview.total === 0
                ? 'Nothing to do — every matching title already has it.'
                : `${preview.total} title${preview.total === 1 ? '' : 's'} would be refreshed`}
              {preview.unsupported > 0 && (
                <span className="text-gray-500">
                  {' '}
                  · {preview.unsupported} can&apos;t be (imported from a source that no longer exists)
                </span>
              )}
            </span>
          )}
        </div>

        <p className="text-[10px] leading-relaxed text-gray-600">
          A refresh only rewrites what you tick. Your status, score, progress, notes and favourites
          are never touched, and neither are cast, studios, genres or relations. Episodes cost one
          request per season, so a whole-library TV refresh takes a while — it can be paused or
          stopped from the Tasks page.
        </p>
        </div>
      </QuietWorkspace>

      {run.status && run.status.state !== 'idle' && (
        <RefreshRunCard status={run.status} onStop={stop} />
      )}
    </div>
  )
}

function RefreshRunCard({
  status,
  onStop
}: {
  status: RefreshRunStatus
  onStop: () => Promise<void>
}): React.JSX.Element {
  const pct = status.total ? Math.round((status.done / status.total) * 100) : 0
  const tally = `${status.refreshed} refreshed${status.skipped ? ` · ${status.skipped} skipped` : ''}${
    status.failed ? ` · ${status.failed} failed` : ''
  }`

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm font-medium">
          {status.state === 'running'
            ? `Refreshing — ${status.done} of ${status.total}`
            : status.state === 'done'
              ? 'Refresh finished'
              : status.state === 'cancelled'
                ? 'Refresh stopped'
                : 'Refresh failed'}
        </p>
        {status.state === 'running' && (
          <button className="btn-ghost text-xs" onClick={onStop}>
            Stop
          </button>
        )}
      </div>

      <p className="mt-0.5 truncate text-xs text-gray-500">
        {status.state === 'running' ? (status.message ?? '…') : tally}
      </p>

      <div className="mt-3 h-1.5 rounded-full bg-base-700">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>

      {status.state === 'error' && status.message && (
        <p className="mt-2 text-xs text-red-400">{status.message}</p>
      )}

      {status.failures.length > 0 && status.state !== 'running' && (
        <div className="mt-4">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Didn&apos;t refresh — retry these from their own pages
          </p>
          <div className="max-h-48 space-y-1 overflow-y-auto pr-1">
            {status.failures.map((f) => (
              <div key={f.id} className="flex items-baseline gap-2 text-xs">
                <span className="min-w-0 flex-1 truncate text-gray-300">{f.title}</span>
                <span className="shrink-0 text-gray-500">{f.error}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
