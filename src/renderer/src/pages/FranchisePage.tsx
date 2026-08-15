import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useSettings, useStatuses } from '../lib/hooks'
import { useFlipList } from '../lib/useFlip'
import { GAME } from '../lib/mediaConfig'
import { toast } from '../lib/toast'
import { mediaUrl } from '@shared/mediaUrl'
import {
  franchiseBackgroundKey,
  franchiseCfg,
  matchLibrary,
  metaScoreFor,
  type FranchiseCfg,
  type FranchiseEntry
} from '@shared/franchises'
import type { MediaItem } from '@shared/types'
import PageHeader from '../components/PageHeader'
import CoverImage from '../components/CoverImage'
import FranchiseBackground from '../components/FranchiseBackground'

type SortKey = 'release' | 'year' | 'story' | 'score' | 'meta'
type SortState = { key: SortKey; dir: 'asc' | 'desc' }

// One curated franchise: the canon checklist over the user's library with
// live re-sortable columns, a cover timeline, the character showcase, trivia,
// and ONE pinned page background (curated hero, or the user's own file).
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
  const { data: settings } = useSettings()
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
    api.franchise.ensureArt(cfg.id).then((r) => setCaching(r.started))
  }, [cfg.id])
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

  // ---- page background: the user's file (settings row) beats the curated hero ----
  const bgKey = franchiseBackgroundKey(cfg.id)
  const override = settings?.[bgKey]?.trim() || null
  const backgroundUrl = override ? mediaUrl(override) : art(cfg.heroUrl)
  async function setBackground(): Promise<void> {
    const rel = await api.files.pickImage()
    if (!rel) return
    await api.settings.set(bgKey, rel)
    await qc.invalidateQueries({ queryKey: qk.settings.all })
    toast('Background set', 'success')
  }
  async function resetBackground(): Promise<void> {
    await api.settings.set(bgKey, '') // settingsRepo has no delete; '' = unset
    await qc.invalidateQueries({ queryKey: qk.settings.all })
  }

  // ---- finished check ----
  // Positional, from settings: statuses[1] is "completed" whatever the user
  // renamed it to (the HomePage convention) — plus the progress fallback the
  // detail page uses. isCompletedStatus() would silently break on renames.
  const completedStatus = statuses[1]
  const isFinished = (m: MediaItem): boolean =>
    (m.status != null && m.status === completedStatus) ||
    (!!m.totalUnits && m.progress >= m.totalUnits)

  // ---- sorting: clickable column headers, rows FLIP into place ----
  const hasStory = cfg.entries.some((e) => e.chrono != null)
  const [sort, setSort] = usePersistedState<SortState>(`franchise.${cfg.id}.sort`, {
    key: 'release',
    dir: 'asc'
  })
  const clickHeader = (key: SortKey): void =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : // Scores read best high-first; the rest low-first.
          { key, dir: key === 'score' || key === 'meta' ? 'desc' : 'asc' }
    )
  const entries = useMemo(() => {
    const item = (e: FranchiseEntry): MediaItem | null => matched.get(e.id) ?? null
    const rows = [...cfg.entries] // authored order IS release order (tested)
    const flip = sort.dir === 'asc' ? 1 : -1
    // Nullable numeric sorts: rows without a value ALWAYS sink to the bottom,
    // in release order, whichever direction is active.
    const byNullable = (val: (e: FranchiseEntry) => number | null) =>
      rows.sort((a, b) => {
        const va = val(a)
        const vb = val(b)
        if (va == null && vb == null) return 0
        if (va == null) return 1
        if (vb == null) return -1
        return (va - vb) * flip
      })
    switch (sort.key) {
      case 'year':
        return rows.sort((a, b) => (a.year - b.year) * flip)
      case 'story':
        return byNullable((e) => e.chrono ?? null)
      case 'score':
        return byNullable((e) => item(e)?.score ?? null)
      case 'meta':
        return byNullable((e) => metaScoreFor(e, item(e)))
      default:
        return flip === 1 ? rows : rows.reverse()
    }
  }, [cfg, sort, matched])
  const ranked = sort.key === 'score' || sort.key === 'meta'
  const listRef = useRef<HTMLDivElement>(null)
  useFlipList(listRef, entries.map((e) => e.id).join('|'))

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

  const headers: { key: SortKey; label: string; title: string; className: string }[] = [
    { key: 'release', label: 'Title', title: 'Release order', className: 'flex-1 text-left' },
    { key: 'year', label: 'Year', title: 'Sort by year', className: 'w-12 text-right' },
    ...(hasStory
      ? [{ key: 'story' as SortKey, label: 'Story', title: 'In-universe order', className: 'w-14 text-right' }]
      : []),
    { key: 'score', label: '★', title: 'Your score', className: 'w-12 text-right' },
    { key: 'meta', label: 'MC', title: 'Metacritic', className: 'w-12 text-right' }
  ]

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
          actions={
            <div className="flex gap-2">
              <button className="btn-ghost text-sm" onClick={setBackground} title="Pick an image file for this page's background">
                Set background
              </button>
              {override && (
                <button className="btn-ghost text-sm" onClick={resetBackground} title="Back to the curated artwork">
                  Reset
                </button>
              )}
            </div>
          }
          className="mb-4"
        />

        {/* Stats */}
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

        {/* Rows left (half width), timeline + characters right; trivia below. */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div>
            {/* Sortable header row */}
            <div className="mb-1 flex items-center gap-3 px-3 text-xs uppercase tracking-wide text-gray-500">
              {ranked && <span className="w-6 shrink-0" />}
              <span className="w-10 shrink-0" />
              {headers.map((h) => {
                const active = sort.key === h.key
                return (
                  <button
                    key={h.key}
                    className={`shrink-0 hover:text-gray-200 ${h.className} ${active ? '' : ''}`}
                    style={active ? { color: cfg.color } : undefined}
                    title={h.title}
                    onClick={() => clickHeader(h.key)}
                  >
                    {h.label}
                    {active && <span className="ml-0.5">{sort.dir === 'asc' ? '▴' : '▾'}</span>}
                  </button>
                )
              })}
            </div>
            <div ref={listRef} className="space-y-1">
              {entries.map((entry, i) => (
                <EntryRow
                  key={entry.id}
                  entry={entry}
                  item={matched.get(entry.id) ?? null}
                  rank={ranked ? i + 1 : null}
                  showStory={hasStory}
                  finished={isFinished}
                  accent={cfg.color}
                />
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <Timeline cfg={cfg} matched={matched} isFinished={isFinished} />
            {cfg.characters.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-3 text-lg font-semibold">Characters</h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {cfg.characters.map((c) => (
                    <CharacterCard key={c.id} cfg={cfg} character={c} art={art} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

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
  showStory,
  finished,
  accent
}: {
  entry: FranchiseEntry
  item: MediaItem | null
  rank: number | null
  showStory: boolean
  finished: (m: MediaItem) => boolean
  accent: string
}) {
  const meta = metaScoreFor(entry, item)
  const done = item != null && finished(item)
  return (
    <div
      data-flip-key={entry.id}
      className={`flex items-center gap-3 rounded-md border border-transparent bg-base-800/70 px-3 py-2 transition-colors hover:border-base-600 ${
        item ? '' : 'opacity-50 grayscale'
      }`}
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
            <Link to={`/games/${item.id}`} className="truncate font-medium hover:text-accent">
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
          {entry.note ?? ''}
          {!item ? (entry.note ? ' · ' : '') + 'not in library' : item.status ? `${entry.note ? ' · ' : ''}${item.status}` : ''}
        </p>
      </div>
      <span className="w-12 shrink-0 text-right text-sm text-gray-400">{entry.year}</span>
      {showStory && (
        <span className="w-14 shrink-0 text-right text-sm text-gray-400">
          {entry.chrono != null ? `#${entry.chrono}` : ''}
        </span>
      )}
      <span className="w-12 shrink-0 text-right text-sm" title="Your score">
        {item?.score != null ? (
          <>
            <span style={{ color: accent }}>★</span> {item.score}
          </>
        ) : (
          ''
        )}
      </span>
      <span className="w-12 shrink-0 text-right text-sm text-gray-400" title="Metacritic">
        {meta ?? ''}
      </span>
    </div>
  )
}

// A horizontally scrollable year strip of COVERS: fixed px per year, tiles
// placed at their release year and stacked into lanes when they would
// overlap. Owned = library cover (accent ring + ✓ when finished, links to the
// game); missing = greyed placeholder tile.
const PX_PER_YEAR = 34
const TILE_W = 30
const TILE_H = 42
const LANE_H = TILE_H + 6

function Timeline({
  cfg,
  matched,
  isFinished
}: {
  cfg: FranchiseCfg
  matched: Map<string, MediaItem>
  isFinished: (m: MediaItem) => boolean
}) {
  const min = Math.min(...cfg.entries.map((e) => e.year)) - 1
  const max = Math.max(...cfg.entries.map((e) => e.year)) + 1
  const width = (max - min) * PX_PER_YEAR + TILE_W
  // Lane packing: sorted by year, each tile takes the lowest lane whose last
  // occupant ends before this tile starts.
  const laneEnds: number[] = []
  const placed = [...cfg.entries]
    .sort((a, b) => a.year - b.year)
    .map((e) => {
      const x = (e.year - min) * PX_PER_YEAR
      let lane = laneEnds.findIndex((end) => end <= x)
      if (lane < 0) lane = laneEnds.push(0) - 1
      laneEnds[lane] = x + TILE_W + 4
      return { e, x, lane }
    })
  const lanes = Math.max(1, laneEnds.length)
  const decades: number[] = []
  for (let y = Math.ceil(min / 10) * 10; y <= max; y += 10) decades.push(y)
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">Timeline</h2>
      <div className="overflow-x-auto rounded-md border border-base-700 bg-base-800/70 px-3 pb-5 pt-3">
        <div className="relative" style={{ width, height: lanes * LANE_H + 14 }}>
          {placed.map(({ e, x, lane }) => {
            const item = matched.get(e.id) ?? null
            const done = item != null && isFinished(item)
            const top = (lanes - 1 - lane) * LANE_H
            const tile = item ? (
              <CoverImage path={item.coverPath} alt="" className="h-full w-full" rounded="rounded-sm" />
            ) : (
              <div className="h-full w-full rounded-sm bg-base-700 opacity-50" />
            )
            const cls = 'absolute block overflow-hidden rounded-sm transition-transform hover:z-10 hover:scale-125'
            const style = {
              left: x,
              top,
              width: TILE_W,
              height: TILE_H,
              boxShadow: done ? `0 0 0 2px ${cfg.color}` : undefined
            }
            const label = `${e.title} (${e.year})${done ? ' — finished' : item ? '' : ' — not in library'}`
            return item ? (
              <Link key={e.id} to={`/games/${item.id}`} className={cls} style={style} title={label} aria-label={label}>
                {tile}
              </Link>
            ) : (
              <div key={e.id} className={cls} style={style} title={label}>
                {tile}
              </div>
            )
          })}
          <div className="absolute inset-x-0 h-px bg-base-600" style={{ top: lanes * LANE_H + 2 }} />
          {decades.map((y) => (
            <span
              key={y}
              className="absolute -translate-x-1/2 text-[10px] text-gray-500"
              style={{ left: (y - min) * PX_PER_YEAR + TILE_W / 2, top: lanes * LANE_H + 4 }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CharacterCard({
  cfg,
  character,
  art
}: {
  cfg: FranchiseCfg
  character: FranchiseCfg['characters'][number]
  art: (url: string) => string
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
        <p className="text-[11px] text-gray-500">
          Appears in: {games.map((g) => g.year).join(', ')}
        </p>
      )}
    </div>
  )
}
