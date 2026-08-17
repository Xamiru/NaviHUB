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

          {/* Right half: vertical timeline | vertical character list */}
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <Timeline cfg={cfg} matched={matched} isFinished={isFinished} />
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

// A vertical timeline: a spine with the release year beside each cover,
// spacing proportional to the gap between releases (clamped, so a 40-year
// franchise stays scannable). Owned = library cover (accent ring + ✓ when
// finished, links to the game); missing = greyed placeholder tile. Decade
// changes get a small divider label.
function Timeline({
  cfg,
  matched,
  isFinished
}: {
  cfg: FranchiseCfg
  matched: Map<string, MediaItem>
  isFinished: (m: MediaItem) => boolean
}) {
  const sorted = [...cfg.entries].sort((a, b) => a.year - b.year)
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
            <CoverImage path={item.coverPath} alt="" className="h-24 w-16" />
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
                  borderColor: item ? cfg.color : 'rgb(75 85 99)',
                  background: done ? cfg.color : 'rgb(var(--base-900))'
                }}
              />
              {item ? (
                <Link to={`/games/${item.id}`} className="block" title={label} aria-label={label}>
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
