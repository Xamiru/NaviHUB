import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useSettings } from '../lib/hooks'
import { useFlipList } from '../lib/useFlip'
import { configFor, pathForMedia } from '../lib/mediaConfig'
import { useFranchiseLibrary } from '../lib/useFranchiseLibrary'
import { toast } from '../lib/toast'
import { mediaUrl } from '@shared/mediaUrl'
import {
  communityScoreFor,
  entryMediaType,
  franchiseBackgroundKey,
  franchiseCfg,
  franchiseMediaTypes,
  matchLibrary,
  nextRouteEntry,
  type FranchiseCfg,
  type FranchiseEntry
} from '@shared/franchises'
import type { MediaItem, MediaType } from '@shared/types'
import PageHeader from '../components/PageHeader'
import CoverImage from '../components/CoverImage'
import FranchiseBackground from '../components/FranchiseBackground'
import { HeartIcon } from '../components/PlayerIcons'

type SortKey = 'release' | 'year' | 'story' | 'route' | 'score' | 'meta'
type SortState = { key: SortKey; dir: 'asc' | 'desc' }

// One curated franchise: the canon checklist over the user's library (every
// media type the franchise spans) with live re-sortable columns, a cover
// timeline, the character showcase, trivia, and ONE pinned page background
// (curated hero, or the user's own file).
export default function FranchisePage() {
  const { id = '' } = useParams()
  const cfg = franchiseCfg(id)
  if (!cfg) {
    return (
      <div className="p-6">
        <PageHeader
          title="Unknown franchise"
          back={{ to: '/franchises', label: 'Franchises' }}
        />
        <p className="text-gray-400">No franchise is registered under this id.</p>
      </div>
    )
  }
  return <FranchiseView cfg={cfg} />
}

function FranchiseView({ cfg }: { cfg: FranchiseCfg }) {
  const qc = useQueryClient()
  const types = useMemo(() => franchiseMediaTypes(cfg), [cfg])
  const { items, isLoading, error, refetch, isFinished } = useFranchiseLibrary(types)
  const { data: settings } = useSettings()
  const matched = useMemo(() => matchLibrary(cfg.entries, items), [cfg, items])

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

  // ---- media-type filter (only offered when the franchise spans several) ----
  const [typeFilter, setTypeFilter] = usePersistedState<MediaType | 'all'>(
    `franchise.${cfg.id}.type`,
    'all'
  )
  const activeType = typeFilter !== 'all' && types.includes(typeFilter) ? typeFilter : 'all'
  const visible = useMemo(
    () =>
      activeType === 'all' ? cfg.entries : cfg.entries.filter((e) => entryMediaType(e) === activeType),
    [cfg, activeType]
  )

  // ---- sorting: clickable column headers, rows FLIP into place ----
  const hasStory = cfg.entries.some((e) => e.chrono != null)
  const hasRoute = cfg.entries.some((e) => e.route != null)
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
    const rows = [...visible] // authored order IS release order (tested)
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
      case 'route':
        return byNullable((e) => e.route ?? null)
      case 'score':
        return byNullable((e) => item(e)?.score ?? null)
      case 'meta':
        return byNullable((e) => communityScoreFor(e, item(e)))
      default:
        return flip === 1 ? rows : rows.reverse()
    }
  }, [visible, sort, matched])
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
  // Game progress is hours; other types count episodes, chapters or pages.
  const totalHours = Math.round(
    owned.filter((m) => m.mediaType === 'game').reduce((s, m) => s + (m.progress ?? 0), 0)
  )
  const favorite =
    owned.filter((m) => m.favorite).sort((a, b) => (b.score ?? -1) - (a.score ?? -1))[0] ?? null
  const next = nextRouteEntry(cfg, (e) => {
    const m = matched.get(e.id)
    return !!m && isFinished(m)
  })

  const headers: { key: SortKey; label: string; title: string; className: string }[] = [
    { key: 'release', label: 'Title', title: 'Release order', className: 'flex-1 text-left' },
    { key: 'year', label: 'Year', title: 'Sort by year', className: 'w-12 text-right' },
    ...(hasStory
      ? [{ key: 'story' as SortKey, label: 'Story', title: 'In-universe order', className: 'w-14 text-right' }]
      : []),
    ...(hasRoute
      ? [{ key: 'route' as SortKey, label: 'Route', title: 'Suggested order', className: 'w-14 text-right' }]
      : []),
    { key: 'score', label: '★', title: 'Your score', className: 'w-12 text-right' },
    { key: 'meta', label: 'Rating', title: 'Community rating', className: 'w-14 text-right' }
  ]

  if (isLoading || error) {
    return (
      <div className="relative min-h-full">
        <FranchiseBackground url={backgroundUrl} />
        <div className="relative z-10 p-6">
          <PageHeader back={{ to: '/franchises', label: 'Franchises' }} title={cfg.name} />
          {isLoading ? (
            <p className="text-sm text-gray-400" role="status">Loading your library…</p>
          ) : (
            <div className="card p-6" role="alert">
              <p className="text-sm text-red-300">
                Could not load your library{error instanceof Error ? ` — ${error.message}` : '.'}
              </p>
              <button className="btn-ghost mt-3" onClick={refetch}>Try again</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-full">
      <FranchiseBackground url={backgroundUrl} />
      <div className="relative z-10 p-6">
        <PageHeader
          back={{ to: '/franchises', label: 'Franchises' }}
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
          {next && <span className="chip">Next up: {next.title}</span>}
          {totalHours > 0 && <span className="chip">{totalHours} h played</span>}
          {favorite && (
            <span className="chip gap-1.5" title="Your favorite entry">
              <HeartIcon className="h-3.5 w-3.5 text-accent" /> {favorite.title}
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
            {types.length > 1 && (
              <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
                {(['all', ...types] as const).map((t) => (
                  <button
                    key={t}
                    className={`pill !py-0.5 !text-xs ${activeType === t ? 'pill-active' : ''}`}
                    aria-pressed={activeType === t}
                    onClick={() => setTypeFilter(t)}
                  >
                    {t === 'all' ? 'All' : configFor(t).plural}
                  </button>
                ))}
              </div>
            )}
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
                  showRoute={hasRoute}
                  showType={types.length > 1}
                  finished={isFinished}
                  accent={cfg.color}
                />
              ))}
            </div>
          </div>

          {/* Right half: vertical timeline | vertical character list */}
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <Timeline cfg={cfg} entries={visible} matched={matched} isFinished={isFinished} />
            {cfg.characters.length > 0 && (
              <section className="min-w-0">
                <h2 className="mb-3 text-lg font-semibold">Characters</h2>
                <div className="space-y-2">
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
  showRoute,
  showType,
  finished,
  accent
}: {
  entry: FranchiseEntry
  item: MediaItem | null
  rank: number | null
  showStory: boolean
  showRoute: boolean
  showType: boolean
  finished: (m: MediaItem) => boolean
  accent: string
}) {
  const meta = communityScoreFor(entry, item)
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
        <CoverImage path={item.coverPath} alt="" className="h-14 w-10 shrink-0" thumbWidth={80} />
      ) : (
        <div className="flex h-14 w-10 shrink-0 items-center justify-center rounded-md bg-base-700 text-gray-600">
          ○
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {item ? (
            <Link
              to={pathForMedia(item)}
              className="truncate font-medium hover:text-accent"
              title={entry.title}
            >
              {entry.title}
            </Link>
          ) : (
            <span className="truncate font-medium" title={entry.title}>
              {entry.title}
            </span>
          )}
          {done && (
            <span title="Finished" style={{ color: accent }}>
              ✓
            </span>
          )}
        </div>
        {/* Chips share the second line with the note so the title keeps the width. */}
        <div className="flex min-w-0 items-center gap-1.5">
          {showType && (
            <span className="chip shrink-0 py-0 text-[11px]">
              {configFor(entryMediaType(entry)).singular}
            </span>
          )}
          {entry.spinOff && <span className="chip shrink-0 py-0 text-[11px]">spin-off</span>}
          {entry.remake && <span className="chip shrink-0 py-0 text-[11px]">remake</span>}
          {entry.adaptation && <span className="chip shrink-0 py-0 text-[11px]">adaptation</span>}
          {entry.optional && <span className="chip shrink-0 py-0 text-[11px]">optional</span>}
          <p className="min-w-0 truncate text-xs text-gray-400">
            {entry.note ?? ''}
            {!item ? (entry.note ? ' · ' : '') + 'not in library' : item.status ? `${entry.note ? ' · ' : ''}${item.status}` : ''}
          </p>
        </div>
      </div>
      <span className="w-12 shrink-0 text-right text-sm text-gray-400">{entry.year}</span>
      {showStory && (
        <span className="w-14 shrink-0 text-right text-sm text-gray-400">
          {entry.chrono != null ? `#${entry.chrono}` : ''}
        </span>
      )}
      {showRoute && (
        <span className="w-14 shrink-0 text-right text-sm text-gray-400">
          {entry.route != null ? `#${entry.route}` : ''}
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
      <span className="w-14 shrink-0 text-right text-sm text-gray-400" title="Community rating">
        {meta ?? ''}
      </span>
    </div>
  )
}

// A vertical timeline: a spine with the release year beside each cover,
// spacing proportional to the gap between releases (clamped, so a 40-year
// franchise stays scannable). Owned = library cover (accent ring + ✓ when
// finished, links to the title); missing = greyed placeholder tile. Decade
// changes get a small divider label.
function Timeline({
  cfg,
  entries,
  matched,
  isFinished
}: {
  cfg: FranchiseCfg
  entries: FranchiseEntry[]
  matched: Map<string, MediaItem>
  isFinished: (m: MediaItem) => boolean
}) {
  const sorted = [...entries].sort((a, b) => a.year - b.year)
  return (
    <section className="min-w-0">
      <h2 className="mb-3 text-lg font-semibold">Timeline</h2>
      <div className="relative pl-14">
        {/* the spine */}
        <div className="absolute bottom-2 left-[3.25rem] top-2 w-px bg-base-600" />
        {sorted.map((e, i) => {
          const item = matched.get(e.id) ?? null
          const done = item != null && isFinished(item)
          const prev = sorted[i - 1]
          const gapYears = prev ? e.year - prev.year : 0
          const marginTop = i === 0 ? 0 : Math.min(8 + gapYears * 6, 44)
          const decade = Math.floor(e.year / 10) * 10
          const newDecade = i === 0 || Math.floor(prev.year / 10) * 10 !== decade
          const sameYear = prev != null && prev.year === e.year
          const tile = item ? (
            <CoverImage path={item.coverPath} alt="" className="h-24 w-16" thumbWidth={128} />
          ) : (
            <div className="flex h-24 w-16 items-center justify-center rounded-md bg-base-700 text-gray-600 opacity-60">
              ○
            </div>
          )
          const label = `${e.title} (${e.year})${done ? ' — finished' : item ? '' : ' — not in library'}`
          const body = (
            <div className="flex items-center gap-3">
              <div
                className="shrink-0 overflow-hidden rounded-md transition-transform hover:scale-105"
                style={{ boxShadow: done ? `0 0 0 2px ${cfg.color}` : undefined }}
              >
                {tile}
              </div>
              <div className="min-w-0">
                <p className={`truncate text-sm font-medium ${item ? '' : 'text-gray-400'}`}>{e.title}</p>
                <p className="truncate text-xs text-gray-500">
                  {e.spinOff ? 'spin-off' : e.remake ? 'remake' : e.note ?? ''}
                </p>
              </div>
            </div>
          )
          return (
            <div key={e.id} className="relative" style={{ marginTop }}>
              {newDecade && (
                <span className="absolute -left-14 -top-1 w-10 text-right text-[10px] uppercase tracking-wide text-gray-600">
                  {decade}s
                </span>
              )}
              {/* year + spine dot */}
              {!sameYear && (
                <span className="absolute -left-14 top-9 w-10 text-right font-mono text-xs text-gray-400">
                  {e.year}
                </span>
              )}
              <span
                className="absolute -left-[0.8rem] top-[2.55rem] h-2.5 w-2.5 rounded-full border-2"
                style={{
                  borderColor: item ? cfg.color : 'rgb(var(--line-strong))',
                  background: done ? cfg.color : 'rgb(var(--base-900))'
                }}
              />
              {item ? (
                <Link to={pathForMedia(item)} className="block" title={label} aria-label={label}>
                  {body}
                </Link>
              ) : (
                <div title={label}>{body}</div>
              )}
            </div>
          )
        })}
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
    <div className="card flex gap-3 p-3">
      <img
        src={art(character.portraitUrl)}
        alt={character.name}
        className="h-24 w-16 shrink-0 rounded-md bg-base-700 object-cover object-top"
        loading="lazy"
        draggable={false}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold" title={character.name}>
          {character.name}
        </p>
        <p className="mb-1 truncate text-xs" style={{ color: cfg.color }}>
          {character.role}
        </p>
        <button
          className="text-left text-xs text-gray-400"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span className="mr-1">{open ? '▾' : '▸'}</span>
          {open ? character.blurb : `${character.blurb.slice(0, 70)}…`}
        </button>
        {open && (
          <p className="mt-1 text-[11px] text-gray-500">
            Appears in: {games.map((g) => g.year).join(', ')}
          </p>
        )}
      </div>
    </div>
  )
}
