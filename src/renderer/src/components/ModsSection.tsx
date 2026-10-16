import { useId, useMemo, useState } from 'react'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import { usePersistedState } from '../lib/navState'
import { toast, toastError } from '../lib/toast'
import Section from './Section'
import Dialog from './Dialog'
import { Field } from './Field'
import { GB_PAGE_SIZE } from '@shared/gamebanana'
import type { GbModSummary, GbSort, MediaDetail, ModJobStatus, ModTarget } from '@shared/types'

// A game's Mods tab: GameBanana mods for the linked GameBanana game, and the
// ones NaviHUB installed into this game's emulator. Every GameBanana request
// is a button press (Search, Load mods, opening a mod, Install, Check for
// updates); adult content is filtered out in main before any of it arrives.

const SORTS: { key: GbSort; label: string }[] = [
  { key: 'downloads', label: 'Most downloaded' },
  { key: 'likes', label: 'Most liked' },
  { key: 'newest', label: 'Newest' }
]

const ACTIVE_JOB = new Set<ModJobStatus['state']>(['downloading', 'extracting', 'awaiting', 'installing'])

function fmtBytes(n: number): string {
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(1)} GB`
  if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(1)} MB`
  return `${Math.max(1, Math.round(n / 1024))} KB`
}

function fmtDate(epochSec: number | null): string {
  if (!epochSec) return ''
  return new Date(epochSec * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

// ---- linking the GameBanana game ----

function GamePicker({ mediaId, title, onDone }: { mediaId: number; title: string; onDone: () => void }) {
  const qc = useQueryClient()
  const [query, setQuery] = useState(title)
  const [results, setResults] = useState<{ id: number; name: string; iconUrl: string | null }[] | null>(null)
  const [busy, setBusy] = useState(false)

  async function search(): Promise<void> {
    setBusy(true)
    try {
      setResults(await api.mods.searchGames(query))
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  async function use(gameId: number): Promise<void> {
    try {
      await api.mods.setLink(mediaId, gameId)
      await qc.invalidateQueries({ queryKey: qk.games.modLink(mediaId) })
      onDone()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <div>
      <form
        className="flex flex-wrap items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          void search()
        }}
      >
        <Field label="Find this game on GameBanana" className="min-w-64 flex-1">
          <input className="input w-full" value={query} onChange={(e) => setQuery(e.target.value)} />
        </Field>
        <button type="submit" className="btn" disabled={busy || !query.trim()}>
          {busy ? 'Searching…' : 'Search'}
        </button>
      </form>
      {results && results.length === 0 && <p className="mt-3 text-sm text-gray-400">No GameBanana game by that name.</p>}
      {results && results.length > 0 && (
        <ul className="mt-3 space-y-2">
          {results.map((g) => (
            <li key={g.id} className="flex items-center gap-3 rounded-lg border border-base-700 p-2">
              {g.iconUrl ? <img src={g.iconUrl} alt="" className="h-8 w-8 rounded" loading="lazy" /> : null}
              <span className="min-w-0 flex-1 truncate text-sm">{g.name}</span>
              <button type="button" className="btn-ghost text-xs" onClick={() => void use(g.id)}>
                Use this game
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ---- the install job ----

function JobBanner({ mediaId }: { mediaId: number }) {
  const qc = useQueryClient()
  const { data: job } = useQuery({
    queryKey: qk.games.modJob,
    queryFn: () => api.mods.status(),
    // Slowly while awaiting: main cancels an unanswered confirmation after
    // half an hour, and the banner must not keep offering "Install here".
    refetchInterval: (q) =>
      q.state.data && ACTIVE_JOB.has(q.state.data.state) ? (q.state.data.state === 'awaiting' ? 10_000 : 700) : false
  })
  const [variant, setVariant] = useState(0)
  const [busy, setBusy] = useState(false)
  const variantId = useId()
  if (!job || job.mediaId !== mediaId) return null

  async function confirm(): Promise<void> {
    if (!job) return
    setBusy(true)
    try {
      const res = await api.mods.confirm(job.id, variant)
      if (res.installId != null) toast(`Installed ${job.modName}.`, 'success')
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
      await qc.invalidateQueries({ queryKey: qk.games.modJob })
      await qc.invalidateQueries({ queryKey: qk.games.modInstalled(mediaId) })
    }
  }

  async function cancel(): Promise<void> {
    if (!job) return
    await api.mods.cancel(job.id)
    await qc.invalidateQueries({ queryKey: qk.games.modJob })
  }

  if (job.state === 'done' || job.state === 'cancelled') return null
  if (job.state === 'error') {
    return (
      <div role="alert" className="mb-4 rounded-lg border border-signal-anomaly/40 bg-signal-anomaly/10 p-3 text-sm">
        Could not install {job.modName}: {job.message}
      </div>
    )
  }

  const pct = job.totalBytes > 0 ? Math.min(100, Math.round((job.bytes / job.totalBytes) * 100)) : null
  return (
    <div className="mb-4 rounded-lg border border-accent/40 bg-accent/5 p-4 text-sm" role="status">
      <p className="font-semibold">{job.modName}</p>
      {job.state === 'downloading' && (
        <p className="mt-1 text-xs text-gray-300">
          Downloading {job.fileName} — {fmtBytes(job.bytes)} of {fmtBytes(job.totalBytes)}
          {pct != null ? ` (${pct}%)` : ''}
        </p>
      )}
      {job.state === 'extracting' && <p className="mt-1 text-xs text-gray-300">Unpacking {job.fileName}…</p>}
      {job.state === 'installing' && <p className="mt-1 text-xs text-gray-300">Copying files…</p>}
      {job.state === 'awaiting' && job.plan && (
        <div className="mt-2 space-y-3">
          <p className="text-xs text-gray-300">
            {job.plan.fileCount} files will be added to a new folder in
            <span className="mt-1 block break-all font-mono text-gray-200">{job.plan.destination}</span>
            Nothing already there is changed.
          </p>
          {job.plan.variants.length > 1 && (
            <Field label="This archive holds several versions — install" id={variantId}>
              <select className="input max-w-md" value={variant} onChange={(e) => setVariant(Number(e.target.value))}>
                {job.plan.variants.map((v) => (
                  <option key={v.index} value={v.index}>
                    {v.label}
                  </option>
                ))}
              </select>
            </Field>
          )}
          <div className="flex gap-2">
            <button type="button" className="btn-primary" disabled={busy} onClick={() => void confirm()}>
              Install here
            </button>
            <button type="button" className="btn-ghost" disabled={busy} onClick={() => void cancel()}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {job.state !== 'awaiting' && (
        <button type="button" className="btn-ghost mt-2 text-xs" onClick={() => void cancel()}>
          Stop
        </button>
      )}
    </div>
  )
}

// ---- one mod ----

function ModDialog({
  modId,
  mediaId,
  targets,
  onClose
}: {
  modId: number
  mediaId: number
  targets: ModTarget[]
  onClose: () => void
}) {
  const qc = useQueryClient()
  const titleId = useId()
  const { data: mod, isLoading, isError } = useQuery({
    queryKey: qk.gamebanana.modDetail(modId),
    queryFn: () => api.mods.detail(modId),
    // A network read: opening the mod fetches it once; regaining focus or a
    // remount within the cache's lifetime does not.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
  const usable = targets.filter((t) => !t.blocked)
  const [romId, setRomId] = useState<number | null>(usable[0]?.romId ?? null)
  const [shown, setShown] = useState(0)

  async function install(fileId: number): Promise<void> {
    if (romId == null) return
    try {
      await api.mods.install({ mediaId, romId, modId, fileId })
      await qc.invalidateQueries({ queryKey: qk.games.modJob })
      onClose()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <Dialog labelledBy={titleId} onClose={onClose} panelClassName="card max-h-[90vh] w-full max-w-3xl overflow-y-auto p-6">
      <div className="flex items-start justify-between gap-3">
        <h2 id={titleId} className="text-xl font-semibold">
          {mod?.name ?? 'Mod'}
        </h2>
        <button type="button" className="btn-ghost" aria-label="Close" title="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      {isLoading && <p className="mt-4 text-sm text-gray-400" role="status">Loading…</p>}
      {(isError || (!isLoading && !mod)) && (
        <p className="mt-4 text-sm text-gray-400">This mod is not available.</p>
      )}
      {mod && (
        <div className="mt-3 space-y-4">
          <p className="text-xs text-gray-400">
            {[mod.category, mod.submitter && `by ${mod.submitter}`, mod.version, fmtDate(mod.dateUpdated)]
              .filter(Boolean)
              .join(' / ')}
            {' / '}
            {mod.likes} likes / {mod.downloads} downloads
          </p>
          {mod.images.length > 0 && (
            <div>
              <img src={mod.images[shown]} alt={`${mod.name} screenshot ${shown + 1}`} className="max-h-96 w-full rounded-lg object-contain bg-base-900" />
              {mod.images.length > 1 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {mod.images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      aria-label={`Show screenshot ${i + 1}`}
                      aria-pressed={i === shown}
                      className={`h-12 w-16 overflow-hidden rounded border ${i === shown ? 'border-accent' : 'border-base-600'}`}
                      onClick={() => setShown(i)}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {mod.summary && <p className="text-sm text-gray-200">{mod.summary}</p>}
          {mod.body.length > 0 && (
            <div className="max-h-64 space-y-2 overflow-y-auto text-sm text-gray-300">
              {mod.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {mod.license && <p className="text-xs text-gray-400">Licence: {mod.license}</p>}

          <div>
            <h3 className="mb-2 text-sm font-semibold">Files</h3>
            {usable.length === 0 ? (
              <p className="text-xs text-gray-400">
                {targets[0]?.blocked ?? 'Link a game file on the Playtime tab to install mods.'}{' '}
                <Link className="underline" to="/games/emulators">Emulators</Link>
              </p>
            ) : usable.length > 1 ? (
              <Field label="Install into" className="mb-3 max-w-md">
                <select className="input w-full" value={romId ?? ''} onChange={(e) => setRomId(Number(e.target.value))}>
                  {usable.map((t) => (
                    <option key={t.romId} value={t.romId}>
                      {t.emulatorName} — {t.romName}
                    </option>
                  ))}
                </select>
              </Field>
            ) : (
              <p className="mb-2 text-xs text-gray-400">Installs into {usable[0].emulatorName}.</p>
            )}
            <ul className="space-y-2">
              {mod.files.map((f) => (
                <li key={f.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-base-700 p-2 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="break-all">{f.name}</p>
                    <p className="text-xs text-gray-400">
                      {[fmtBytes(f.size), f.description, f.version].filter(Boolean).join(' / ')}
                    </p>
                  </div>
                  {!f.avClean ? (
                    <span className="text-xs text-signal-caution">Not marked virus-free</span>
                  ) : (
                    <button
                      type="button"
                      className="btn text-xs"
                      disabled={romId == null}
                      onClick={() => void install(f.id)}
                    >
                      Install
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <button type="button" className="btn-ghost text-xs" onClick={() => void api.app.openExternal(mod.profileUrl)}>
            Open on GameBanana
          </button>
        </div>
      )}
    </Dialog>
  )
}

// ---- installed ----

// mediaId null lists mods whose game was deleted from the library (the
// Emulators page), so they can still be disabled or uninstalled.
export function InstalledMods({ mediaId, title = 'Installed' }: { mediaId: number | null; title?: string }) {
  const qc = useQueryClient()
  const { data } = useQuery({
    queryKey: qk.games.modInstalled(mediaId ?? 0),
    queryFn: () => api.mods.installed(mediaId)
  })
  const [updates, setUpdates] = useState<Set<number> | null>(null)
  const [busy, setBusy] = useState(false)
  if (!data || data.length === 0) return null

  async function refresh(): Promise<void> {
    await qc.invalidateQueries({ queryKey: qk.games.modInstalled(mediaId ?? 0) })
  }

  function report(verb: string, res: { removed: number; kept: string[] }): void {
    toast(
      res.kept.length > 0
        ? `${verb} ${res.removed} files; ${res.kept.length} changed files were left where they are.`
        : `${verb} ${res.removed} files.`,
      res.kept.length > 0 ? 'warning' : 'success'
    )
  }

  async function uninstall(id: number, name: string): Promise<void> {
    const ok = await confirmDialog(
      `Uninstall ${name}? NaviHUB removes only the files it installed; anything changed or added since stays.`,
      { confirmLabel: 'Uninstall', danger: true }
    )
    if (!ok) return
    try {
      report('Removed', await api.mods.uninstall(id))
      await refresh()
    } catch (e) {
      toastError(e)
    }
  }

  async function toggle(id: number, enabled: boolean): Promise<void> {
    try {
      report(enabled ? 'Enabled —' : 'Disabled — moved', await api.mods.setEnabled(id, enabled))
      await refresh()
    } catch (e) {
      toastError(e)
    }
  }

  async function check(): Promise<void> {
    if (mediaId == null) return
    setBusy(true)
    try {
      const ids = await api.mods.checkUpdates(mediaId)
      setUpdates(new Set(ids))
      toast(ids.length > 0 ? `${ids.length} mods have updates on GameBanana.` : 'Every mod is up to date.', 'success')
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Section
      title={title}
      subtitle={`${data.length} mod${data.length === 1 ? '' : 's'}`}
      actions={
        mediaId == null ? undefined : (
          <button type="button" className="btn-ghost text-xs" disabled={busy} onClick={() => void check()}>
            {busy ? 'Checking…' : 'Check for updates'}
          </button>
        )
      }
    >
      <ul className="space-y-2">
        {data.map((m) => (
          <li key={m.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-base-700 p-3 text-sm">
            <div className="min-w-0 flex-1">
              <p className="font-medium">
                {m.name}
                {m.version ? <span className="ml-2 text-xs text-gray-400">{m.version}</span> : null}
                {!m.enabled && <span className="ml-2 chip text-xs">Disabled</span>}
                {updates?.has(m.id) && <span className="ml-2 chip text-xs text-accent">Update available</span>}
              </p>
              <p className="break-all font-mono text-[11px] text-gray-500">{m.location}</p>
              <p className="text-xs text-gray-400">
                {m.fileCount} files{m.emulatorName ? ` / ${m.emulatorName}` : ''}
              </p>
            </div>
            <button type="button" className="btn-ghost text-xs" onClick={() => void toggle(m.id, !m.enabled)}>
              {m.enabled ? 'Disable' : 'Enable'}
            </button>
            <button type="button" className="btn-ghost text-xs" onClick={() => void uninstall(m.id, m.name)}>
              Uninstall
            </button>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// ---- browse ----

function ModCard({ mod, onOpen }: { mod: GbModSummary; onOpen: () => void }) {
  return (
    <li className="min-w-0">
      <button type="button" className="group block w-full text-left" onClick={onOpen} aria-label={`Open ${mod.name}`}>
        <div className="aspect-video overflow-hidden rounded-lg bg-base-700">
          {mod.thumbUrl ? (
            <img src={mod.thumbUrl} alt="" className="h-full w-full object-cover motion-safe:transition-transform group-hover:scale-105" loading="lazy" />
          ) : null}
        </div>
        <p className="mt-2 truncate text-sm font-medium group-hover:text-accent">{mod.name}</p>
        <p className="truncate text-xs text-gray-400">
          {[mod.category, mod.submitter].filter(Boolean).join(' / ')}
        </p>
        <p className="text-xs text-gray-500">
          {mod.likes} likes{mod.dateUpdated ? ` / ${fmtDate(mod.dateUpdated)}` : ''}
          {mod.obsolete ? ' / obsolete' : ''}
        </p>
      </button>
    </li>
  )
}

function Browse({ mediaId, gameId, targets }: { mediaId: number; gameId: number; targets: ModTarget[] }) {
  const [loaded, setLoaded] = usePersistedState(`mods.loaded.${mediaId}.${gameId}`, false)
  const [sort, setSort] = usePersistedState<GbSort>('mods.sort', 'downloads')
  const [filter, setFilter] = usePersistedState('mods.filter', '')
  const [open, setOpen] = useState<number | null>(null)
  const list = useInfiniteQuery({
    queryKey: qk.gamebanana.modList(gameId, sort),
    queryFn: ({ pageParam }) => api.mods.list(gameId, sort, pageParam),
    // Every loaded page is one GameBanana request: never re-run them on focus,
    // or on the remount that Back to the Mods tab causes (loaded persists).
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialPageParam: 1,
    getNextPageParam: (last) => (last.complete || last.page * GB_PAGE_SIZE >= last.total ? undefined : last.page + 1),
    enabled: loaded
  })
  const mods = useMemo(() => {
    const seen = new Set<number>()
    const needle = filter.trim().toLocaleLowerCase()
    return (list.data?.pages ?? [])
      .flatMap((p) => p.mods)
      .filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
      .filter((m) => !needle || m.name.toLocaleLowerCase().includes(needle) || (m.category ?? '').toLocaleLowerCase().includes(needle))
  }, [list.data, filter])
  const gameName = list.data?.pages[0]?.gameName

  if (!loaded) {
    return (
      <div className="card p-6 text-center">
        <p className="text-sm text-gray-300">Mods for this game are on GameBanana.</p>
        <button type="button" className="btn-primary mt-3" onClick={() => setLoaded(true)}>
          Load mods
        </button>
      </div>
    )
  }

  return (
    <Section title="Browse" subtitle={gameName ?? undefined}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {SORTS.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={sort === s.key}
            className={sort === s.key ? 'pill pill-active' : 'pill'}
            onClick={() => setSort(s.key)}
          >
            {s.label}
          </button>
        ))}
        <Field label="Filter loaded mods" hiddenLabel className="contents">
          <input
            type="search"
            className="input ml-auto w-56"
            placeholder="Filter loaded mods…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Field>
      </div>
      {list.isError && (
        <p role="alert" className="text-sm text-gray-400">
          Could not reach GameBanana.{' '}
          <button type="button" className="btn ml-2" onClick={() => void list.refetch()}>
            Try again
          </button>
        </p>
      )}
      {list.isLoading && (
        <p className="text-sm text-gray-400" role="status">
          Loading mods…
        </p>
      )}
      {list.data && mods.length === 0 && <p className="text-sm text-gray-400">No mods to show.</p>}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {mods.map((m) => (
          <ModCard key={m.id} mod={m} onOpen={() => setOpen(m.id)} />
        ))}
      </ul>
      {list.hasNextPage && (
        <button
          type="button"
          className="btn mt-5"
          disabled={list.isFetchingNextPage}
          onClick={() => void list.fetchNextPage()}
        >
          {list.isFetchingNextPage ? 'Loading…' : 'Load more'}
        </button>
      )}
      {open != null && <ModDialog modId={open} mediaId={mediaId} targets={targets} onClose={() => setOpen(null)} />}
    </Section>
  )
}

export default function ModsSection({ m }: { m: MediaDetail }) {
  const qc = useQueryClient()
  const { data: link, isLoading } = useQuery({ queryKey: qk.games.modLink(m.id), queryFn: () => api.mods.link(m.id) })
  const { data: targets } = useQuery({ queryKey: qk.games.modTargets(m.id), queryFn: () => api.mods.targets(m.id) })
  const [changing, setChanging] = useState(false)

  async function unlink(): Promise<void> {
    try {
      await api.mods.setLink(m.id, null)
      await qc.invalidateQueries({ queryKey: qk.games.modLink(m.id) })
    } catch (e) {
      toastError(e)
    }
  }

  if (isLoading) return <p className="text-sm text-gray-500" role="status">Loading…</p>

  return (
    <div>
      <JobBanner mediaId={m.id} />
      <InstalledMods mediaId={m.id} />
      {targets && targets.length === 0 && (
        <p className="mb-4 text-xs text-gray-400">
          To install mods, link this game&apos;s game file on the Playtime tab and add its emulator on the{' '}
          <Link className="underline" to="/games/emulators">Emulators</Link> page.
        </p>
      )}
      {!link || changing ? (
        <Section title="GameBanana">
          <GamePicker mediaId={m.id} title={m.title} onDone={() => setChanging(false)} />
        </Section>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span>Linked to GameBanana game {link.gameId}.</span>
            <button type="button" className="btn-ghost text-xs" onClick={() => void api.app.openExternal(link.profileUrl)}>
              Open on GameBanana
            </button>
            <button type="button" className="btn-ghost text-xs" onClick={() => setChanging(true)}>
              Change
            </button>
            <button type="button" className="btn-ghost text-xs" onClick={() => void unlink()}>
              Unlink
            </button>
          </div>
          <Browse mediaId={m.id} gameId={link.gameId} targets={targets ?? []} />
        </>
      )}
    </div>
  )
}
