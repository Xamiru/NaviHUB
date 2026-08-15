import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useStatuses } from '../lib/hooks'
import { GAME } from '../lib/mediaConfig'
import { mediaUrl } from '@shared/mediaUrl'
import {
  franchiseCfg,
  matchLibrary,
  metaScoreFor,
  type FranchiseCfg,
  type FranchiseEntry
} from '@shared/franchises'
import type { FranchiseArtStatus, MediaItem } from '@shared/types'
import PageHeader from '../components/PageHeader'
import CoverImage from '../components/CoverImage'
import FranchiseBackground from '../components/FranchiseBackground'
import { confirmDialog } from '../lib/confirm'

type OrderKey = 'release' | 'story' | 'score' | 'meta'

// One curated franchise: the canon checklist over the user's library, four
// orderings, a release timeline, the character showcase, and the full-page
// hover/click background that this feature exists to prototype.
export default function FranchisePage() {
  const { id = '' } = useParams()
  const cfg = franchiseCfg(id)
  if (!cfg) {
    return (
      <div className="p-6">
        <PageHeader
          title="Unknown franchise"
          back={{ to: '/games/franchises', label: 'Franchises' }}
        />
        <p className="text-gray-400">No franchise is registered under this id.</p>
      </div>
    )
  }
  return <FranchiseView cfg={cfg} />
}

function FranchiseView({ cfg }: { cfg: FranchiseCfg }) {
  const qc = useQueryClient()
  // Same key + filter as HomePage's per-type list — one shared cache entry
  // (keep the filter shape byte-identical, see CLAUDE.md).
  const { data: games = [] } = useQuery({
    queryKey: qk.media.home('game'),
    queryFn: () => api.media.list({ mediaType: 'game' })
  })
  const statuses = useStatuses(GAME)
  const matched = useMemo(() => matchLibrary(cfg.entries, games), [cfg, games])

  // ---- curated art cache: fire once, poll while running, then re-fetch ----
  const { data: artMap = {} } = useQuery({
    queryKey: qk.franchise.artMap(cfg.id),
    queryFn: () => api.franchise.artMap(cfg.id)
  })
  const [caching, setCaching] = useState(false)
  const ensuredRef = useRef<string | null>(null)
  useEffect(() => {
    if (ensuredRef.current === cfg.id) return
    ensuredRef.current = cfg.id
    api.franchise.ensureArt(cfg.id).then((r) => {
      if (!r.started) return
      // Seed THIS run's starting state before enabling the poll. artStatus is
      // one global key shared by every franchise (and every visit), so the
      // first read would otherwise be whatever the last run left behind — a
      // terminal { running: false } that ends the poll on its first tick and
      // leaves the page on remote URLs for the whole visit.
      qc.setQueryData<FranchiseArtStatus>(qk.franchise.artStatus, {
        running: true,
        franchiseId: cfg.id,
        done: 0,
        total: 0
      })
      setCaching(true)
    })
  }, [cfg.id, qc])
  const { data: artStatus } = useQuery({
    queryKey: qk.franchise.artStatus,
    queryFn: () => api.franchise.artStatus(),
    enabled: caching,
    refetchInterval: caching ? 1500 : false
  })
  useEffect(() => {
    if (caching && artStatus && !artStatus.running) {
      setCaching(false)
      qc.invalidateQueries({ queryKey: qk.franchise.artMap(cfg.id) })
    }
  }, [caching, artStatus, qc, cfg.id])
  // Cached local file when available, the remote URL until then.
  const art = (url: string): string => {
    const cached = artMap[url]
    return (cached && mediaUrl(cached)) || url
  }

  // ---- finished check ----
  // Positional, from settings: statuses[1] is "completed" whatever the user
  // renamed it to (the HomePage convention) — plus the progress fallback the
  // detail page uses. isCompletedStatus() would silently break on renames.
  const completedStatus = statuses[1]
  const isFinished = (m: MediaItem): boolean =>
    (m.status != null && m.status === completedStatus) ||
    (!!m.totalUnits && m.progress >= m.totalUnits)

  // ---- ordering ----
  const hasStory = cfg.entries.some((e) => e.chrono != null)
  const [order, setOrder] = usePersistedState<OrderKey>(`franchise.${cfg.id}.order`, 'release')
  const entries = useMemo(() => {
    const byRelease = [...cfg.entries] // authored order IS release order (tested)
    const item = (e: FranchiseEntry): MediaItem | undefined => matched.get(e.id)
    switch (order) {
      case 'story':
        return byRelease.sort((a, b) => (a.chrono ?? 0) - (b.chrono ?? 0))
      case 'score': {
        const score = (e: FranchiseEntry): number | null => item(e)?.score ?? null
        return byRelease.sort((a, b) => (score(b) ?? -1) - (score(a) ?? -1))
      }
      case 'meta':
        return byRelease.sort(
          (a, b) => (metaScoreFor(b, item(b) ?? null) ?? -1) - (metaScoreFor(a, item(a) ?? null) ?? -1)
        )
      default:
        return byRelease
    }
  }, [cfg, order, matched])
  const ranked = order === 'score' || order === 'meta'

  // ---- background: hover previews (debounced), click locks ----
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [lockedId, setLockedId] = usePersistedState<string | null>(
    `franchise.${cfg.id}.locked`,
    null
  )
  const hoverTimer = useRef<number | null>(null)
  const hoverEnter = (entryId: string): void => {
    if (hoverTimer.current != null) window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setHoverId(entryId), 150)
  }
  const hoverLeave = (): void => {
    if (hoverTimer.current != null) window.clearTimeout(hoverTimer.current)
    hoverTimer.current = null
    setHoverId(null)
  }
  useEffect(
    () => () => {
      if (hoverTimer.current != null) window.clearTimeout(hoverTimer.current)
    },
    []
  )
  const activeId = hoverId ?? lockedId
  const activeEntry = activeId ? cfg.entries.find((e) => e.id === activeId) ?? null : null
  const activeItem = activeEntry ? matched.get(activeEntry.id) ?? null : null
  // The user's background override for the active entry (owned entries only).
  const { data: override = [] } = useQuery({
    queryKey: qk.pictures.list(activeItem?.id ?? 0, 'background'),
    queryFn: () => api.pictures.list(activeItem!.id, 'background'),
    enabled: activeItem != null
  })
  // Precedence: user override > curated art > library cover > nothing.
  const backgroundUrl = activeEntry
    ? override[0]
      ? mediaUrl(override[0].filePath)
      : activeEntry.bgUrl
        ? art(activeEntry.bgUrl)
        : activeItem?.coverPath
          ? mediaUrl(activeItem.coverPath)
          : null
    : null

  async function setBackground(m: MediaItem): Promise<void> {
    const prior = await api.pictures.list(m.id, 'background')
    const added = await api.pictures.addFromFiles(m.id, 'background')
    if (added.length === 0) return // picker cancelled
    // Single-override semantics: keep only the last file picked.
    for (const img of [...prior, ...added.slice(0, -1)]) await api.pictures.remove(img.id)
    qc.invalidateQueries({ queryKey: qk.pictures.all })
  }

  async function clearBackground(m: MediaItem): Promise<void> {
    const prior = await api.pictures.list(m.id, 'background')
    if (prior.length === 0) return
    if (!(await confirmDialog(`Remove the custom background for ${m.title}?`))) return
    for (const img of prior) await api.pictures.remove(img.id)
    qc.invalidateQueries({ queryKey: qk.pictures.all })
  }

  // ---- stats ----
  const owned = cfg.entries.map((e) => matched.get(e.id)).filter((m): m is MediaItem => !!m)
  const finished = owned.filter(isFinished)
  const scored = owned.filter((m) => m.score != null)
  const avgScore = scored.length
    ? (scored.reduce((s, m) => s + (m.score ?? 0), 0) / scored.length).toFixed(1)
    : null
  const totalHours = Math.round(owned.reduce((s, m) => s + (m.progress ?? 0), 0))
  const favorite =
    owned.filter((m) => m.favorite).sort((a, b) => (b.score ?? -1) - (a.score ?? -1))[0] ?? null

  return (
    <div className="relative min-h-full">
      <FranchiseBackground url={backgroundUrl} />
      <div className="relative z-10 p-6">
        <PageHeader
          back={{ to: '/games/franchises', label: 'Franchises' }}
          title={<span style={{ color: cfg.color }}>{cfg.name}</span>}
          subtitle={
            <>
              {cfg.studio} — {cfg.tagline}
            </>
          }
          className="mb-4"
        />

        {/* Stats hero */}
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="chip">
            Finished {finished.length} of {cfg.entries.length}
          </span>
          <span className="chip">Owned {owned.length}</span>
          {avgScore != null && <span className="chip">Avg score {avgScore}</span>}
          {totalHours > 0 && <span className="chip">{totalHours} h played</span>}
          {favorite && (
            <span className="chip" title="Your favorite entry">
              ♥ {favorite.title}
            </span>
          )}
          {caching && artStatus?.running && (
            <span className="chip text-gray-400">
              Caching art {artStatus.done}/{artStatus.total}
            </span>
          )}
        </div>

        {/* Order pills */}
        <div className="mb-4 flex flex-wrap gap-2">
          {(
            [
              ['release', 'Release'],
              ...(hasStory ? ([['story', 'Story']] as const) : []),
              ['score', 'Your score'],
              ['meta', 'Meta score']
            ] as [OrderKey, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              className={`pill ${order === key ? 'pill-active' : ''}`}
              onClick={() => setOrder(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Canon list */}
        <div className="mb-8 space-y-1">
          {entries.map((entry, i) => (
            <EntryRow
              key={entry.id}
              entry={entry}
              item={matched.get(entry.id) ?? null}
              rank={ranked ? i + 1 : null}
              order={order}
              finished={(m) => isFinished(m)}
              locked={lockedId === entry.id}
              accent={cfg.color}
              onHoverEnter={() => hoverEnter(entry.id)}
              onHoverLeave={hoverLeave}
              onToggleLock={() => setLockedId(lockedId === entry.id ? null : entry.id)}
              onSetBackground={setBackground}
              onClearBackground={clearBackground}
            />
          ))}
        </div>

        <Timeline
          cfg={cfg}
          matched={matched}
          isFinished={isFinished}
          onHoverEnter={hoverEnter}
          onHoverLeave={hoverLeave}
          onToggleLock={(entryId) => setLockedId(lockedId === entryId ? null : entryId)}
        />

        {/* Characters */}
        {cfg.characters.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">Characters</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {cfg.characters.map((c) => (
                <CharacterCard
                  key={c.id}
                  cfg={cfg}
                  character={c}
                  art={art}
                  onPickGame={(entryId) => setLockedId(entryId)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Trivia */}
        {cfg.trivia.length > 0 && (
          <section className="mb-6 space-y-3">
            <h2 className="text-lg font-semibold">Lore &amp; trivia</h2>
            {cfg.trivia.map((t) => (
              <div key={t.title} className="card p-4">
                <h3 className="mb-2 font-semibold" style={{ color: cfg.color }}>
                  {t.title}
                </h3>
                {t.body.split('\n\n').map((p, i) => (
                  <p key={i} className="mb-2 text-sm leading-relaxed text-gray-300 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

function EntryRow({
  entry,
  item,
  rank,
  order,
  finished,
  locked,
  accent,
  onHoverEnter,
  onHoverLeave,
  onToggleLock,
  onSetBackground,
  onClearBackground
}: {
  entry: FranchiseEntry
  item: MediaItem | null
  rank: number | null
  order: OrderKey
  finished: (m: MediaItem) => boolean
  locked: boolean
  accent: string
  onHoverEnter: () => void
  onHoverLeave: () => void
  onToggleLock: () => void
  onSetBackground: (m: MediaItem) => void
  onClearBackground: (m: MediaItem) => void
}) {
  const meta = metaScoreFor(entry, item)
  const done = item != null && finished(item)
  return (
    <div
      className={`group flex items-center gap-3 rounded-md border border-transparent bg-base-800/60 px-3 py-2 transition-colors hover:border-base-600 ${
        item ? '' : 'opacity-50 grayscale'
      } ${locked ? 'border-base-500' : ''}`}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      onClick={onToggleLock}
    >
      {rank != null && (
        <span className="w-6 shrink-0 text-right font-mono text-sm text-gray-500">{rank}</span>
      )}
      {item ? (
        <CoverImage path={item.coverPath} alt="" className="h-14 w-10 shrink-0" />
      ) : (
        <div className="flex h-14 w-10 shrink-0 items-center justify-center rounded-md bg-base-700 text-gray-600">
          ○
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {item ? (
            <Link
              to={`/games/${item.id}`}
              className="truncate font-medium hover:text-accent"
              onClick={(e) => e.stopPropagation()}
            >
              {entry.title}
            </Link>
          ) : (
            <span className="truncate font-medium">{entry.title}</span>
          )}
          {done && (
            <span title="Finished" style={{ color: accent }}>
              ✓
            </span>
          )}
          {entry.spinOff && <span className="chip py-0 text-[11px]">spin-off</span>}
          {entry.remake && <span className="chip py-0 text-[11px]">remake</span>}
        </div>
        <p className="truncate text-xs text-gray-400">
          {order === 'story' && entry.chrono != null ? `Story #${entry.chrono} · ` : ''}
          {entry.year}
          {entry.note ? ` — ${entry.note}` : ''}
          {!item ? ' · not in library' : item.status ? ` · ${item.status}` : ''}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-sm">
        {item?.score != null && (
          <span title="Your score">
            <span style={{ color: accent }}>★</span> {item.score}
          </span>
        )}
        {meta != null && (
          <span className="text-gray-400" title="Metacritic">
            MC {meta}
          </span>
        )}
      </div>
      {item && (
        <div className="hidden shrink-0 gap-1 group-hover:flex" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn-ghost px-2 py-1 text-xs"
            title="Set a custom background for this game"
            onClick={() => onSetBackground(item)}
          >
            Set bg
          </button>
          <button
            className="btn-ghost px-2 py-1 text-xs"
            title="Remove the custom background"
            onClick={() => onClearBackground(item)}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

// Hand-rolled year band: dots positioned by year, stacked when a year repeats.
// Dot states: filled accent = finished, outlined accent = owned, gray = not in
// library. Dots share the hover/lock handlers, so brushing the timeline drives
// the page background too.
function Timeline({
  cfg,
  matched,
  isFinished,
  onHoverEnter,
  onHoverLeave,
  onToggleLock
}: {
  cfg: FranchiseCfg
  matched: Map<string, MediaItem>
  isFinished: (m: MediaItem) => boolean
  onHoverEnter: (entryId: string) => void
  onHoverLeave: () => void
  onToggleLock: (entryId: string) => void
}) {
  const years = cfg.entries.map((e) => e.year)
  const min = Math.min(...years)
  const max = Math.max(...years)
  const span = Math.max(1, max - min)
  const seen = new Map<number, number>()
  const decadeTicks: number[] = []
  for (let y = Math.ceil(min / 10) * 10; y <= max; y += 10) decadeTicks.push(y)
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">Timeline</h2>
      <div className="h-24 rounded-md border border-base-700 bg-base-800/60 px-8">
        {/* Inner track: absolute children position against THIS box, so the
            px-8 padding actually insets the 0%/100% dots. */}
        <div className="relative h-full">
          <div className="absolute inset-x-0 top-1/2 h-px bg-base-600" />
          {decadeTicks.map((y) => (
            <span
              key={y}
              className="absolute bottom-1 -translate-x-1/2 text-[10px] text-gray-500"
              style={{ left: `${((y - min) / span) * 100}%` }}
            >
              {y}
            </span>
          ))}
          {cfg.entries.map((e) => {
            const item = matched.get(e.id) ?? null
            const stack = seen.get(e.year) ?? 0
            seen.set(e.year, stack + 1)
            const state = item ? (isFinished(item) ? 'finished' : 'owned') : 'missing'
            return (
              <button
                key={e.id}
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-transform hover:scale-150"
                style={{
                  left: `${((e.year - min) / span) * 100}%`,
                  top: `calc(50% - ${stack * 14}px)`,
                  borderColor: state === 'missing' ? 'rgb(75 85 99)' : cfg.color,
                  background: state === 'finished' ? cfg.color : 'transparent'
                }}
                title={`${e.title} (${e.year})`}
                aria-label={`${e.title} (${e.year})`}
                onMouseEnter={() => onHoverEnter(e.id)}
                onMouseLeave={onHoverLeave}
                onClick={() => onToggleLock(e.id)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CharacterCard({
  cfg,
  character,
  art,
  onPickGame
}: {
  cfg: FranchiseCfg
  character: FranchiseCfg['characters'][number]
  art: (url: string) => string
  onPickGame: (entryId: string) => void
}) {
  const [open, setOpen] = useState(false)
  const games = character.appearsIn
    .map((id) => cfg.entries.find((e) => e.id === id))
    .filter((e): e is FranchiseEntry => !!e)
  return (
    <div className="card w-44 shrink-0 p-3">
      <img
        src={art(character.portraitUrl)}
        alt={character.name}
        className="mb-2 h-40 w-full rounded-md bg-base-700 object-cover object-top"
        loading="lazy"
        draggable={false}
      />
      <p className="truncate font-semibold" title={character.name}>
        {character.name}
      </p>
      <p className="mb-1 truncate text-xs" style={{ color: cfg.color }}>
        {character.role}
      </p>
      <button
        className="mb-1 text-left text-xs text-gray-400"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="mr-1">{open ? '▾' : '▸'}</span>
        {open ? character.blurb : `${character.blurb.slice(0, 60)}…`}
      </button>
      {open && (
        <div className="flex flex-wrap gap-1">
          {games.map((g) => (
            <button
              key={g.id}
              className="chip py-0 text-[10px]"
              title={`Show ${g.title} as the page background`}
              onClick={() => onPickGame(g.id)}
            >
              {g.year}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
