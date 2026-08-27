import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useRefreshRun } from '../lib/useRefreshRun'
import { toast, toastError } from '../lib/toast'
import { qk } from '../lib/queryKeys'
import { useSettings } from '../lib/hooks'
import { Group, Pill } from './PillGroup'
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import { REFRESH_ASPECTS, aspectsForTypes } from '@shared/refresh'
import type { RefreshAspect } from '@shared/refresh'
import type { MediaType, RefreshPreview, RefreshRunStatus } from '@shared/types'
import QuietWorkspace from './QuietWorkspace'
import OperationFlow from './OperationFlow'

type RefreshSetup = 'missing-covers' | 'missing-hero' | 'tv-episodes' | 'custom'

const ALL_MEDIA_TYPES = MEDIA_CONFIGS.map((cfg) => cfg.key)

const REFRESH_SETUPS: Array<{
  key: Exclude<RefreshSetup, 'custom'>
  label: string
  description: string
  types: MediaType[]
  aspects: RefreshAspect[]
  onlyMissing: boolean
}> = [
  {
    key: 'missing-covers',
    label: 'Fill missing covers',
    description: 'Check every shelf for titles without poster art.',
    types: ALL_MEDIA_TYPES,
    aspects: ['cover'],
    onlyMissing: true
  },
  {
    key: 'missing-hero',
    label: 'Fill missing hero art',
    description: 'Find missing AniList banners and TMDB backdrops.',
    types: ['anime', 'manga', 'movie', 'tv'],
    aspects: ['banner'],
    onlyMissing: true
  },
  {
    key: 'tv-episodes',
    label: 'Update TV episodes',
    description: 'Build missing season and episode catalogues for TV shows.',
    types: ['tv'],
    aspects: ['episodes'],
    onlyMissing: true
  }
]

// The Refresh tab on /bulk: re-run each title's importer, writing only the
// aspects you pick. The counterpart to the Import tab — that one fills the
// shelf, this one updates what is already on it.
//
// Preview is a plain await in the handler, not a query: it is a COUNT, and an
// enabled query would re-run it on every remount (the Import tab's posture).
export default function RefreshTab(): React.JSX.Element {
  const [setup, setSetup] = usePersistedState<RefreshSetup>(
    'refresh.setup',
    'missing-covers'
  )
  const [types, setTypes] = usePersistedState<MediaType[]>('refresh.types', ['tv'])
  const [aspects, setAspects] = usePersistedState<RefreshAspect[]>('refresh.aspects', ['banner'])
  const [onlyMissing, setOnlyMissing] = usePersistedState('refresh.onlyMissing', true)
  const [preview, setPreview] = usePersistedState<RefreshPreview | null>('refresh.preview', null)
  const [previewKey, setPreviewKey] = usePersistedState('refresh.previewKey', '')
  const [checking, setChecking] = useState(false)
  const run = useRefreshRun()

  const preset = REFRESH_SETUPS.find((item) => item.key === setup)
  const selectedTypes = preset?.types ?? types
  const selectedAspects = preset?.aspects ?? aspects
  const selectedOnlyMissing = preset?.onlyMissing ?? onlyMissing
  const offered = aspectsForTypes(selectedTypes)
  // A tick the current types can't serve is dropped from the request rather
  // than silently ignored by the runner.
  const active = selectedAspects.filter((a) => offered.includes(a))
  const req = { types: selectedTypes, aspects: active, onlyMissing: selectedOnlyMissing }
  const requestKey = JSON.stringify(req)
  const reviewedPreview = previewKey === requestKey ? preview : null
  const canReview = selectedTypes.length > 0 && active.length > 0
  const running = run.status?.state === 'running'
  const finished = run.status?.state === 'done'

  function toggleType(t: MediaType): void {
    setTypes(types.includes(t) ? types.filter((x) => x !== t) : [...types, t])
    setPreview(null)
  }

  function chooseSetup(next: RefreshSetup): void {
    setSetup(next)
    setPreview(null)
  }

  function customizeSetup(): void {
    if (preset) {
      setTypes([...preset.types])
      setAspects([...preset.aspects])
      setOnlyMissing(preset.onlyMissing)
    }
    chooseSetup('custom')
  }

  function toggleAspect(a: RefreshAspect): void {
    setAspects(aspects.includes(a) ? aspects.filter((x) => x !== a) : [...aspects, a])
    setPreview(null)
  }

  async function check(): Promise<void> {
    const checkedKey = requestKey
    setChecking(true)
    try {
      setPreview(await api.refresh.preview(req))
      setPreviewKey(checkedKey)
    } catch (e) {
      toastError(e)
    } finally {
      setChecking(false)
    }
  }

  async function start(): Promise<void> {
    if (!reviewedPreview || reviewedPreview.total === 0) return
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
      <QuietWorkspace
        title="Online metadata"
        description="Revisit the original source for titles already in your library. Choose a quick setup or keep your own selection."
      >
        <div className="space-y-4">
          <OperationFlow
            label="Online metadata refresh stages"
            steps={[
              {
                label: 'Choose',
                state: reviewedPreview || running || finished ? 'complete' : 'active'
              },
              {
                label: 'Review',
                state: running || finished ? 'complete' : reviewedPreview ? 'active' : 'pending'
              },
              { label: 'Refresh', state: finished ? 'complete' : running ? 'active' : 'pending' }
            ]}
          />

          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Quick setup
            </div>
            <div className="divide-y divide-base-700 border-y border-base-700">
              {REFRESH_SETUPS.map((item) => (
                <button
                  key={item.key}
                  className="flex w-full items-start gap-3 px-1 py-3 text-left hover:bg-base-700/30"
                  aria-pressed={setup === item.key}
                  onClick={() => chooseSetup(item.key)}
                >
                  <span
                    className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border ${
                      setup === item.key ? 'border-accent bg-accent' : 'border-base-500'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white">{item.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-gray-400">
                      {item.description}
                    </span>
                  </span>
                </button>
              ))}
              <button
                className="flex w-full items-start gap-3 px-1 py-3 text-left hover:bg-base-700/30"
                aria-pressed={setup === 'custom'}
                onClick={customizeSetup}
              >
                <span
                  className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border ${
                    setup === 'custom' ? 'border-accent bg-accent' : 'border-base-500'
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-white">My custom refresh</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-gray-400">
                    Choose the shelves and fields yourself. NaviHUB remembers this setup for next time.
                  </span>
                </span>
              </button>
            </div>
          </div>

          {setup === 'custom' && (
            <div className="space-y-4 border-l-2 border-accent/30 pl-4">
              <Group label="Shelves">
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
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Fields
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        setAspects([...offered])
                        setPreview(null)
                      }}
                    >
                      All
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        setAspects([])
                        setPreview(null)
                      }}
                    >
                      None
                    </button>
                  </div>
                </div>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {REFRESH_ASPECTS.filter((a) => offered.includes(a.key)).map((a) => {
                    const on = aspects.includes(a.key)
                    return (
                      <button
                        key={a.key}
                        className={`${on ? 'chip-toggle chip-toggle-active' : 'chip-toggle'} text-left`}
                        aria-pressed={on}
                        onClick={() => toggleAspect(a.key)}
                      >
                        <span className="block text-sm">{a.label}</span>
                        <span className="block text-xs text-gray-400">{a.hint}</span>
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
                  Only titles missing a selected field
                  <span className="mt-0.5 block text-xs text-gray-400">
                    Turn this off when the source changed and you want to replace existing values.
                  </span>
                </span>
              </label>
            </div>
          )}

          <div className="border-t border-base-700 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              {!reviewedPreview ? (
                <button
                  className="btn-primary"
                  onClick={check}
                  disabled={!canReview || checking || run.running}
                >
                  {checking ? 'Reviewing…' : 'Review selection'}
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={start}
                  disabled={reviewedPreview.total === 0 || run.running}
                >
                  Refresh {reviewedPreview.total} title{reviewedPreview.total === 1 ? '' : 's'}
                </button>
              )}
              <div className="text-sm text-gray-400" aria-live="polite">
                {reviewedPreview ? (
                  <>
                    {reviewedPreview.total === 0
                      ? 'Nothing needs this refresh.'
                      : `${reviewedPreview.total} title${reviewedPreview.total === 1 ? '' : 's'} ready to refresh.`}
                    {reviewedPreview.unsupported > 0 && (
                      <span className="text-gray-500">
                        {' '}
                        {reviewedPreview.unsupported} skipped because their old source is unavailable.
                      </span>
                    )}
                  </>
                ) : (
                  'Reviewing counts the titles first. Nothing changes until you confirm.'
                )}
              </div>
            </div>
            <p className="mt-3 max-w-4xl text-xs leading-relaxed text-gray-400">
              Refresh changes only the selected source fields. Your status, score, progress, notes,
              favourites, cast, studios, genres and relations stay untouched. TV episode refreshes
              take longer because each season needs its own request; active work can be stopped from
              Tasks.
            </p>
          </div>
        </div>
      </QuietWorkspace>

      {run.status && run.status.state !== 'idle' && (
        <RefreshRunCard status={run.status} onStop={stop} />
      )}

      <LocalLibraryMaintenance />
    </div>
  )
}

function LocalLibraryMaintenance(): React.JSX.Element {
  const qc = useQueryClient()
  const { data: settings } = useSettings()
  const [scanning, setScanning] = useState(false)
  const [fetchingArt, setFetchingArt] = useState(false)
  const busy = scanning || fetchingArt
  const hasMusicRoot = !!settings?.['music.dir']?.trim()

  const { data: scanStatus } = useQuery({
    queryKey: qk.music.scanStatus,
    queryFn: () => api.music.scanStatus(),
    enabled: scanning,
    refetchInterval: scanning ? 400 : false
  })
  const { data: artStatus } = useQuery({
    queryKey: qk.music.artStatus,
    queryFn: () => api.music.artStatus(),
    enabled: fetchingArt,
    refetchInterval: fetchingArt ? 500 : false
  })

  async function scanMusic(): Promise<void> {
    setScanning(true)
    try {
      const summary = hasMusicRoot ? await api.music.scan() : await api.music.pickRoot()
      if (summary) {
        const skipped = summary.skippedRootFiles
          ? ` · ${summary.skippedRootFiles} loose root file${summary.skippedRootFiles === 1 ? '' : 's'} skipped`
          : ''
        toast(
          `Scanned ${summary.tracks} tracks · ${summary.added} new · ${summary.removed} removed${skipped}`,
          'success'
        )
      }
      qc.invalidateQueries({ queryKey: qk.music.all })
      qc.invalidateQueries({ queryKey: qk.settings.all })
    } catch (error) {
      toastError(error)
    } finally {
      setScanning(false)
    }
  }

  async function findMusicArt(): Promise<void> {
    setFetchingArt(true)
    try {
      const result = await api.music.artFetchMissing()
      const found = `${result.updated} image${result.updated === 1 ? '' : 's'} found`
      if (result.cancelled) {
        toast(`Art fetch stopped — ${found}; ${result.total - result.done} not attempted`)
      } else if (result.failed) {
        toast(
          `Art fetch finished — ${found}; ${result.failed} failed; ${result.missing} had no match`
        )
      } else {
        toast(
          `Art fetch done — ${found}${result.missing ? `; ${result.missing} had no match` : ''}`,
          'success'
        )
      }
      qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (error) {
      toastError(error)
    } finally {
      setFetchingArt(false)
    }
  }

  const scanDetail = scanning
    ? scanStatus?.phase === 'tags'
      ? `Reading tags ${scanStatus.done}/${scanStatus.total}`
      : scanStatus?.phase === 'writing'
        ? 'Updating the library and reconnecting Spotify tracks'
        : 'Finding music files'
    : 'Discover new and deleted files, rebuild artist and album placement, and reconnect imported Spotify tracks.'
  const artDetail = fetchingArt
    ? `Checking artwork ${artStatus?.done ?? 0}/${artStatus?.total ?? '…'}`
    : 'Retry blank artist photos and album covers with the current strict provider chain.'

  return (
    <QuietWorkspace
      title="Local files"
      description="Maintain the music NaviHUB reads from this computer. These actions never contact a title importer."
      actions={
        <Link className="btn-ghost" to="/music">
          Open Sonic archive
        </Link>
      }
    >
      <div className="divide-y divide-base-700 border-y border-base-700">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white">Music folder</p>
            {hasMusicRoot && (
              <p className="mt-1 break-all text-xs text-gray-500">{settings?.['music.dir']}</p>
            )}
            <p className="mt-1 text-xs leading-relaxed text-gray-400" aria-live="polite">
              {scanDetail}
            </p>
          </div>
          <button className="btn-ghost" disabled={busy} onClick={() => void scanMusic()}>
            {scanning ? 'Scanning…' : hasMusicRoot ? 'Scan music folder' : 'Choose music folder…'}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white">Missing music artwork</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-400" aria-live="polite">
              {artDetail}
            </p>
          </div>
          <button
            className="btn-ghost"
            disabled={busy}
            onClick={() => void findMusicArt()}
          >
            {fetchingArt ? 'Finding artwork…' : 'Find missing artwork'}
          </button>
        </div>
      </div>

      {fetchingArt && (
        <button className="btn-ghost mt-3 text-xs" onClick={() => api.music.artCancel()}>
          Stop artwork lookup
        </button>
      )}
    </QuietWorkspace>
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
    <section className="card p-5" aria-live="polite">
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

      <p className="mt-0.5 break-words text-xs text-gray-400">
        {status.state === 'running' ? (status.message ?? '…') : tally}
      </p>

      <div
        className="mt-3 h-1.5 rounded-full bg-base-700"
        role="progressbar"
        aria-label="Library refresh progress"
        aria-valuemin={0}
        aria-valuemax={status.total}
        aria-valuenow={status.done}
      >
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
    </section>
  )
}
