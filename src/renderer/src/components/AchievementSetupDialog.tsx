import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDialog, useDebouncedValue } from '../lib/hooks'
import { toast, toastError } from '../lib/toast'
import type { AchievementProvider, AchievementSetupResult } from '@shared/types'

// Picking which provider's achievement set a title should track, and which of
// that provider's games it is. Steam is for PC titles (the set comes from the
// Web API, unlocks are read out of the crack's emulator); RetroAchievements is
// for anything played through an emulator.

export default function AchievementSetupDialog({
  mediaId,
  provider,
  onClose,
  onDone
}: {
  mediaId: number
  provider: AchievementProvider
  onClose: () => void
  onDone: (result: AchievementSetupResult) => void
}) {
  const panelRef = useDialog(onClose)
  const [busy, setBusy] = useState(false)
  const [manualId, setManualId] = useState('')

  async function run(fn: () => Promise<AchievementSetupResult>): Promise<void> {
    setBusy(true)
    try {
      onDone(await fn())
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-6 overflow-y-auto"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-setup-title"
        tabIndex={-1}
        className="card w-full max-w-2xl p-6 mt-10"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="achievement-setup-title" className="text-lg font-medium">
              {provider === 'steam' ? 'Steam achievements' : 'RetroAchievements'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {provider === 'steam'
                ? 'Pick the Steam game this title is, and the achievement list is fetched once and cached.'
                : 'Pick the RetroAchievements game this title is. Your unlock history syncs with it.'}
            </p>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close" title="Close">
            ✕
          </button>
        </div>

        {provider === 'steam' ? (
          <SteamPicker mediaId={mediaId} busy={busy} onPick={(appid) => run(() => api.achievements.setupSteam(mediaId, appid))} />
        ) : (
          <RaPicker busy={busy} onPick={(gameId) => run(() => api.achievements.setupRa(mediaId, gameId))} />
        )}

        {/* The escape hatch for anything the pickers can't find. */}
        <div className="mt-6 border-t border-base-700/60 pt-4">
          <label className="label" htmlFor="manual-provider-id">
            {provider === 'steam' ? 'Or enter a Steam app id' : 'Or enter a RetroAchievements game id'}
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="manual-provider-id"
              className="input flex-1"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              placeholder={provider === 'steam' ? '1091500' : '4321'}
              inputMode="numeric"
            />
            <button
              className="btn"
              disabled={busy || !manualId.trim()}
              onClick={() =>
                run(() =>
                  provider === 'steam'
                    ? api.achievements.setupSteam(mediaId, manualId.trim())
                    : api.achievements.setupRa(mediaId, manualId.trim())
                )
              }
            >
              Use this id
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {provider === 'steam'
              ? 'The number in the game’s Steam store URL.'
              : 'The number in the game’s retroachievements.org URL.'}
          </p>
        </div>

        {busy && <p className="mt-4 text-sm text-gray-400">Fetching the achievement list…</p>}
      </div>
    </div>
  )
}

function SteamPicker({
  mediaId,
  busy,
  onPick
}: {
  mediaId: number
  busy: boolean
  onPick: (appid: string) => void
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.achievements.resolveSteam(mediaId),
    queryFn: () => api.achievements.resolveSteam(mediaId)
  })

  if (isLoading) return <p className="text-sm text-gray-500">Looking this game up on Steam…</p>
  if (isError) return <p className="text-sm text-gray-500">Steam search failed — enter an app id below.</p>
  if (!data?.length) {
    return <p className="text-sm text-gray-500">Steam has no match for this title — enter an app id below.</p>
  }

  return (
    <ul className="space-y-1 max-h-80 overflow-y-auto">
      {data.map((c) => (
        <li key={c.appid}>
          <button
            className="w-full text-left flex items-center gap-3 rounded px-2 py-2 hover:bg-base-700/60 disabled:opacity-50"
            disabled={busy}
            onClick={() => onPick(c.appid)}
          >
            {c.coverUrl ? (
              <img src={c.coverUrl} alt="" className="h-10 w-20 rounded object-cover shrink-0" />
            ) : (
              <span className="h-10 w-20 rounded bg-base-700 shrink-0" />
            )}
            <span className="min-w-0">
              <span className="block truncate">{c.name}</span>
              <span className="block text-xs text-gray-500">
                App {c.appid}
                {c.exact ? ' · already linked to this title' : ''}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function RaPicker({ busy, onPick }: { busy: boolean; onPick: (gameId: string) => void }) {
  const [consoleId, setConsoleId] = useState('')
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 400)

  const { data: consoles, isError: consolesFailed } = useQuery({
    queryKey: qk.achievements.raConsoles,
    queryFn: () => api.achievements.raConsoles(),
    // The console list never changes within a session.
    staleTime: Infinity
  })

  const { data: results, isFetching } = useQuery({
    queryKey: qk.achievements.raSearch(debounced, consoleId),
    queryFn: () => api.achievements.raSearch(debounced, consoleId),
    enabled: !!consoleId && debounced.trim().length > 1
  })

  if (consolesFailed) {
    return (
      <p className="text-sm text-gray-500">
        Could not reach RetroAchievements. Check your username and API key in Settings, or enter a
        game id below.
      </p>
    )
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <select
          className="input w-56"
          value={consoleId}
          onChange={(e) => setConsoleId(e.target.value)}
          aria-label="System"
        >
          <option value="">Pick a system…</option>
          {(consoles ?? []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          className="input flex-1 min-w-48"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search that system’s games…"
          disabled={!consoleId}
        />
      </div>

      {/* RA has no free-text search endpoint, so this pulls the system's whole
          game list once and filters it here — worth saying, because the first
          search on a big system takes a moment. */}
      {isFetching && <p className="mt-3 text-sm text-gray-500">Searching…</p>}
      {results && results.length === 0 && !isFetching && (
        <p className="mt-3 text-sm text-gray-500">Nothing matched on that system.</p>
      )}
      {results && results.length > 0 && (
        <ul className="mt-3 space-y-1 max-h-72 overflow-y-auto">
          {results.map((g) => (
            <li key={g.gameId}>
              <button
                className="w-full text-left flex items-center gap-3 rounded px-2 py-2 hover:bg-base-700/60 disabled:opacity-50"
                disabled={busy}
                onClick={() => onPick(g.gameId)}
              >
                {g.iconUrl ? (
                  <img src={g.iconUrl} alt="" className="h-10 w-10 rounded object-cover shrink-0" />
                ) : (
                  <span className="h-10 w-10 rounded bg-base-700 shrink-0" />
                )}
                <span className="min-w-0">
                  <span className="block truncate">{g.title}</span>
                  <span className="block text-xs text-gray-500">{g.consoleName ?? `Game ${g.gameId}`}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

// Shared by the section below: one place that says what a setup run found.
export function reportSetup(result: AchievementSetupResult): void {
  const from =
    result.schemaSource === 'local'
      ? ' from the game’s own files'
      : result.schemaSource === 'community'
        ? ' from Steam’s public page'
        : ''
  const found =
    result.importedFromFiles > 0
      ? ` · ${result.importedFromFiles} already earned`
      : result.schemaSource && result.filesFound === 0
        ? ' · no emulator save files found yet'
        : ''
  toast(`${result.total} achievements tracked${from}${found}`, 'success')
  if (result.unmatched) {
    toast(
      `${result.unmatched} achievement${result.unmatched === 1 ? '' : 's'} could not be matched to an id and ${result.unmatched === 1 ? 'was' : 'were'} skipped.`,
      'error'
    )
  }
}
