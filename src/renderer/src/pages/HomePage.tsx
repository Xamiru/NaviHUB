import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueries, useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { MEDIA_CONFIGS, configFor, pathForMedia, type MediaConfig } from '../lib/mediaConfig'
import { qk } from '../lib/queryKeys'
import CoverImage from '../components/CoverImage'
import Section from '../components/Section'
import { statusesFrom, useSettings } from '../lib/hooks'
import type { MediaItem, SettingsMap } from '@shared/types'

// The status that marks an item as in-progress is the FIRST status of its
// media type's *configured* list ("Watching" for anime/TV, "Playing" for VNs
// and games, "Reading" for manga) — "Continue watching" keys off that per
// item. The SECOND is by the same positional convention "completed", and the
// LAST is the plan-to-enjoy backlog ("Plan to Watch" / "Plan to Play"), which
// feeds the Tonight's-pick spotlight. Resolved from settings (not the
// defaults) so renamed statuses keep the Home sections working.
function statusMatchers(settings: SettingsMap | undefined) {
  const pick = (m: MediaItem, at: (s: string[]) => string | undefined): boolean =>
    m.status != null && m.status === at(statusesFrom(settings, configFor(m.mediaType)))
  return {
    inProgress: (m: MediaItem) => pick(m, (s) => s[0]),
    completed: (m: MediaItem) => pick(m, (s) => s[1]),
    planned: (m: MediaItem) => pick(m, (s) => s.at(-1))
  }
}

// The same seiyuu pool the /people browse page shows (anime + VN + games).
const VA_TYPES: MediaItem['mediaType'][] = ['anime', 'visual_novel', 'game']

// Landing page: the library itself as a backdrop, what you're in the middle of,
// a backlog pick for tonight, the people your taste keeps coming back to, and
// quick ways deeper in. Everything derives from data already in the DB.
export default function HomePage() {
  // One list per media type, fetched once and reused to derive every section
  // below. It's a local single-user DB, so pulling each type's full list is cheap.
  const lists = useQueries({
    queries: MEDIA_CONFIGS.map((cfg) => ({
      queryKey: qk.media.home(cfg.key),
      queryFn: () => api.media.list({ mediaType: cfg.key })
    }))
  })
  const isLoading = lists.some((q) => q.isLoading)
  const { data: settings } = useSettings()

  // Derive the sections only when a query's data actually changes, not on every
  // render (these sort/filter over the whole library). MEDIA_CONFIGS is a fixed
  // module constant, so the deps array keeps a stable length across renders.
  const { all, recent, continuing, favorites, backlog, stats } = useMemo(() => {
    const { inProgress, completed, planned } = statusMatchers(settings)
    const all: MediaItem[] = lists.flatMap((q) => q.data ?? [])
    const scores = all.map((m) => m.score).filter((s): s is number => s != null)
    return {
      all,
      recent: [...all].sort(byCreatedDesc).slice(0, 10),
      continuing: all.filter(inProgress).sort(byUpdatedDesc),
      favorites: all.filter((m) => m.favorite).sort(byUpdatedDesc),
      backlog: all.filter(planned),
      stats: {
        titles: all.length,
        inProgress: all.filter(inProgress).length,
        completed: all.filter(completed).length,
        favorites: all.filter((m) => m.favorite).length,
        avgScore: scores.length
          ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
          : null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...lists.map((q) => q.data), settings])

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <Hero items={all} stats={stats} />

      {continuing.length > 0 && (
        <Strip title="Continue" items={continuing} showProgress />
      )}

      <div className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr] items-stretch">
        <Spotlight pool={backlog.length ? backlog : all} fromBacklog={backlog.length > 0} />
        <div className="flex flex-col gap-4">
          <TimeStatsCard />
          <QuizCard />
        </div>
      </div>

      <TopPeople />

      <Section className="mt-8" title="Recently added">
        {isLoading ? (
          <p className="text-gray-500">Loading…</p>
        ) : recent.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="font-medium mb-1">Nothing here yet</p>
            <p className="text-sm text-gray-500 mb-5">
              Add or import your first title to see it show up here.
            </p>
            <Link to="/anime" className="btn-primary mx-auto">
              Go to your library
            </Link>
          </div>
        ) : (
          <Strip items={recent} />
        )}
      </Section>

      {favorites.length > 0 && <Strip title="★ Favorites" items={favorites} />}

      <LibraryGlance />
    </div>
  )
}

const byCreatedDesc = (a: MediaItem, b: MediaItem) => b.createdAt.localeCompare(a.createdAt)
const byUpdatedDesc = (a: MediaItem, b: MediaItem) => b.updatedAt.localeCompare(a.updatedAt)
const cardKey = (m: MediaItem) => `${m.mediaType}-${m.id}`

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function greetingFor(hour: number): string {
  if (hour < 5) return 'Up late?'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

// The library as wallpaper: a dimmed, slightly tilted wall of the user's own
// covers behind the brand, fading into the page. Falls back to the plain hero
// while the library is empty or still loading.
function Hero({
  items,
  stats
}: {
  items: MediaItem[]
  stats: {
    titles: number
    inProgress: number
    completed: number
    favorites: number
    avgScore: string | null
  }
}) {
  // Re-shuffles only when the library itself changes, so the wall doesn't
  // twitch on every render.
  const tiles = useMemo(
    () => shuffle(items.filter((m) => m.coverPath)).slice(0, 24),
    [items]
  )
  const greeting = greetingFor(new Date().getHours())

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {tiles.length >= 12 && (
        <div
          className="absolute -inset-6 grid grid-cols-6 md:grid-cols-8 auto-rows-fr gap-1.5 -rotate-2 scale-105"
          aria-hidden
        >
          {tiles.map((m) => (
            <CoverImage
              key={cardKey(m)}
              path={m.coverPath}
              alt=""
              rounded="rounded"
              className="h-full w-full"
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-base-900/80 via-base-900/70 to-base-900" />

      <div className="relative flex flex-col items-center text-center px-6 py-12">
        <Logo className="h-16 w-16 mb-3 drop-shadow-lg" />
        <h1 className="text-4xl font-bold tracking-tight">
          Navi<span className="text-accent">HUB</span>
        </h1>
        <p className="mt-1.5 text-xs uppercase tracking-[0.3em] text-accent/80">good vibrations</p>
        {stats.titles > 0 && (
          <>
            <p className="mt-5 text-sm text-gray-400">
              {greeting} — {stats.inProgress > 0 ? 'picking up where you left off?' : 'what are we into today?'}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
              <span className="chip bg-base-800/80">{stats.titles} titles</span>
              {stats.inProgress > 0 && (
                <span className="chip bg-base-800/80">{stats.inProgress} in progress</span>
              )}
              {stats.completed > 0 && (
                <span className="chip bg-base-800/80">{stats.completed} finished</span>
              )}
              {stats.favorites > 0 && (
                <span className="chip bg-base-800/80">★ {stats.favorites} favorites</span>
              )}
              {stats.avgScore && (
                <span className="chip bg-base-800/80">Ø score {stats.avgScore}</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// A backlog roulette: one random title you said you'd get to, with a reroll.
// Falls back to the whole library when the backlog is empty; hidden entirely
// when the library is.
function Spotlight({ pool, fromBacklog }: { pool: MediaItem[]; fromBacklog: boolean }) {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1_000_000))
  if (pool.length === 0) return null
  const pick = pool[seed % pool.length]
  const cfg = configFor(pick.mediaType)
  const year = pick.releaseDate?.slice(0, 4)

  return (
    <div className="card relative overflow-hidden p-5 flex gap-5">
      {/* the pick's own art as a soft backdrop */}
      {pick.coverPath && (
        <div className="absolute inset-0 opacity-20 blur-2xl scale-125" aria-hidden>
          <CoverImage path={pick.coverPath} alt="" className="h-full w-full" rounded="" />
        </div>
      )}
      <Link to={pathForMedia(pick)} className="relative shrink-0 self-center">
        <CoverImage
          path={pick.coverPath}
          alt={pick.title}
          rounded="rounded-lg"
          className="w-32 aspect-[2/3] shadow-lg"
        />
      </Link>
      <div className="relative min-w-0 flex flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
          {fromBacklog ? 'Tonight’s pick · from your backlog' : 'Tonight’s pick'}
        </p>
        <Link to={pathForMedia(pick)} className="mt-1 text-xl font-bold leading-snug hover:text-accent">
          {pick.title}
        </Link>
        <p className="mt-1 text-xs text-gray-500">
          {[`${cfg.icon} ${cfg.singular}`, year, pick.status].filter(Boolean).join(' · ')}
        </p>
        {pick.synopsis && (
          <p className="mt-2 text-sm text-gray-400 line-clamp-3">{pick.synopsis}</p>
        )}
        <div className="mt-auto pt-3 flex gap-2">
          <Link to={pathForMedia(pick)} className="btn-primary">
            Open
          </Link>
          <button
            className="btn-ghost"
            onClick={() => setSeed((s) => s + 1 + Math.floor(Math.random() * 97))}
            title="Pick something else"
          >
            ↻ Reroll
          </button>
        </div>
      </div>
    </div>
  )
}

// Door into the cross-library time-spent stats, with a live "days" headline.
function TimeStatsCard() {
  const { data: stats } = useQuery({
    queryKey: qk.media.timeStats,
    queryFn: () => api.media.timeStats()
  })
  const days = stats ? stats.totalMinutes / 1440 : 0
  const hasData = !!stats && stats.consumedCount > 0
  return (
    <Link
      to="/stats"
      className="card group relative overflow-hidden p-5 flex flex-col justify-between bg-gradient-to-br from-accent/25 via-base-800 to-base-800 hover:from-accent/35"
    >
      <span
        className="absolute -right-3 -bottom-8 text-[7rem] leading-none opacity-10 select-none"
        aria-hidden
      >
        ⧗
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">Stats</p>
        <p className="mt-1 text-xl font-bold">
          {hasData ? `~${days < 10 ? days.toFixed(1) : Math.round(days)} days of your life` : 'Time spent'}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {hasData
            ? 'See where the time went, type by type.'
            : 'Track progress to see your days-watched breakdown.'}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {hasData && (
          <span className="text-xs text-gray-500">
            across {stats!.consumedCount} titles
          </span>
        )}
        <span className="btn-primary pointer-events-none ml-auto group-hover:brightness-110">
          Open ▸
        </span>
      </div>
    </Link>
  )
}

// Door into the song quiz, with a live count of playable themes.
function QuizCard() {
  const { data: pool = [] } = useQuery({
    queryKey: qk.quiz.songPool({}),
    queryFn: () => api.quiz.songPool({})
  })
  return (
    <Link
      to="/quiz/song"
      className="card group relative overflow-hidden p-5 flex flex-col justify-between bg-gradient-to-br from-accent/25 via-base-800 to-base-800 hover:from-accent/35"
    >
      <span className="absolute -right-4 -bottom-6 text-[7rem] leading-none opacity-10 select-none" aria-hidden>
        ♪
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">Play</p>
        <p className="mt-1 text-xl font-bold">Song Quiz</p>
        <p className="mt-1 text-sm text-gray-400">
          Guess the anime from its openings &amp; endings.
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {pool.length > 0 ? (
          <span className="text-xs text-gray-500">{pool.length} songs ready</span>
        ) : (
          <span className="text-xs text-gray-400">Import theme songs to play</span>
        )}
        <span className="btn-primary pointer-events-none group-hover:brightness-110">Play ▸</span>
      </div>
    </Link>
  )
}

// The cross-link graph, surfaced: the voice actors and studios that appear most
// across the library — each a door to their own page. Ranking comes from the
// same queries the browse pages use, so the order always agrees with them.
function TopPeople() {
  const { data: vas = [] } = useQuery({
    queryKey: qk.entity('people').list('', 'voice_actor', VA_TYPES),
    queryFn: () => api.people.list(undefined, 'voice_actor', VA_TYPES)
  })
  const { data: studios = [] } = useQuery({
    queryKey: qk.entity('companies').list('', null, 'anime'),
    queryFn: () => api.companies.list(undefined, 'anime')
  })
  const topVas = vas.slice(0, 8)
  const topStudios = studios.slice(0, 6)
  if (topVas.length < 3) return null

  return (
    <Section className="mt-8" title="Your people">
      <div className="card p-5">
        <p className="text-xs text-gray-500 mb-3">
          The voice actors your library keeps coming back to
        </p>
        <div className="flex gap-5 overflow-x-auto pb-1">
          {topVas.map((p, i) => (
            <Link key={p.id} to={`/people/${p.id}`} className="group w-20 shrink-0 text-center">
              <div className="relative">
                <CoverImage
                  path={p.photoPath}
                  alt={p.name}
                  rounded="rounded-full"
                  className="h-20 w-20 group-hover:ring-2 ring-accent transition-shadow"
                />
                {i < 3 && (
                  <span className="absolute -top-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white shadow">
                    {i + 1}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs leading-tight line-clamp-2 group-hover:text-accent">
                {p.name}
              </p>
            </Link>
          ))}
        </div>
        {topStudios.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-base-700 pt-4">
            <span className="text-xs text-gray-500 mr-1">Top studios:</span>
            {topStudios.map((c, i) => (
              <Link key={c.id} to={`/studios/${c.id}`} className="chip hover:bg-base-600">
                <span className="text-accent font-semibold mr-1">{i + 1}</span>
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}

// A horizontally-scrolling row of covers — used for the shelf sections
// (Continue watching, Recently added, Favorites). Without a title it renders
// just the row, for embedding inside another Section.
function Strip({
  title,
  items,
  showProgress = false
}: {
  title?: string
  items: MediaItem[]
  showProgress?: boolean
}) {
  const row = (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
      {items.map((m) => (
        <div key={cardKey(m)} className="w-[150px] shrink-0">
          <MediaCard item={m} showProgress={showProgress} />
        </div>
      ))}
    </div>
  )
  return title ? <Section className="mt-8" title={title}>{row}</Section> : row
}

// Per-type total + the section's quick links. Reuses the same status-count
// endpoint the list pages use, so the numbers always agree.
function LibraryGlance() {
  const sections = MEDIA_CONFIGS.filter((c) => !c.hideFromSidebar)
  const counts = useQueries({
    queries: sections.map((cfg) => ({
      queryKey: qk.mediaCounts.byType(cfg.key),
      queryFn: () => api.media.statusCounts(cfg.key)
    }))
  })

  return (
    <Section className="mt-8" title="Browse & add">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {sections.map((cfg, i) => {
          const total = Object.values(counts[i].data ?? {}).reduce((a, b) => a + b, 0)
          return <GlanceCard key={cfg.key} cfg={cfg} total={total} />
        })}
      </div>
    </Section>
  )
}

function GlanceCard({ cfg, total }: { cfg: MediaConfig; total: number }) {
  return (
    <div className="card p-4 flex flex-col gap-3">
      <Link to={cfg.basePath} className="flex items-center gap-3 group">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-lg text-accent">
          {cfg.icon}
        </span>
        <div className="min-w-0">
          <p className="font-medium group-hover:text-accent truncate">
            {cfg.sidebarLabel ?? cfg.plural}
          </p>
          <p className="text-xs text-gray-500">
            {total} {total === 1 ? 'title' : 'titles'}
          </p>
        </div>
      </Link>
      <div className="flex flex-wrap gap-2 text-xs">
        {cfg.importSource && (
          <Link to={cfg.basePath} className="chip hover:bg-base-600">
            ⬇ Import
          </Link>
        )}
        <Link to={`${cfg.basePath}/new`} className="chip hover:bg-base-600">
          + Add {cfg.singular}
        </Link>
        {cfg.children.map((c) => (
          <Link key={c.to} to={c.to} className="chip hover:bg-base-600">
            {c.icon} {c.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

// A cover card linking to the item's detail page, tagged with its media type.
// With showProgress, episode-based items get a thin progress bar (Continue
// watching); the type's own config formats the subtitle either way.
const MediaCard = memo(function MediaCard({
  item,
  showProgress = false
}: {
  item: MediaItem
  showProgress?: boolean
}) {
  const cfg = configFor(item.mediaType)
  const pct =
    showProgress && item.totalUnits != null && item.totalUnits > 0
      ? Math.min(100, Math.round((item.progress / item.totalUnits) * 100))
      : null

  return (
    <Link to={pathForMedia(item)} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <CoverImage
          path={item.coverPath}
          alt={item.title}
          rounded="rounded-lg"
          className="h-full w-full transition-transform group-hover:scale-105"
        />
        <span className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-200">
          {cfg.icon} {cfg.singular}
        </span>
        {item.score != null && (
          <span className="absolute top-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-yellow-300">
            ★ {item.score}
          </span>
        )}
        {pct != null && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/60">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium line-clamp-2 group-hover:text-accent">{item.title}</p>
        <p className="text-xs text-gray-500">
          {showProgress ? cfg.formatProgressStat(item) : (item.status ?? '')}
        </p>
      </div>
    </Link>
  )
})

// The NaviHUB hub mark (mirrors assets/icon.svg), inlined so it scales crisply.
function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} role="img" aria-label="NaviHUB logo">
      <defs>
        <linearGradient id="navihub-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#4a2fd0" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="56" fill="url(#navihub-bg)" />
      <g stroke="#ffffff" strokeWidth="10" strokeLinecap="round" opacity="0.95">
        <line x1="128" y1="128" x2="128" y2="56" />
        <line x1="128" y1="128" x2="190" y2="92" />
        <line x1="128" y1="128" x2="190" y2="164" />
        <line x1="128" y1="128" x2="128" y2="200" />
        <line x1="128" y1="128" x2="66" y2="164" />
        <line x1="128" y1="128" x2="66" y2="92" />
      </g>
      <g fill="#ffffff">
        <circle cx="128" cy="56" r="14" />
        <circle cx="190" cy="92" r="14" />
        <circle cx="190" cy="164" r="14" />
        <circle cx="128" cy="200" r="14" />
        <circle cx="66" cy="164" r="14" />
        <circle cx="66" cy="92" r="14" />
      </g>
      <circle cx="128" cy="128" r="26" fill="#0f1115" />
      <text
        x="128"
        y="138"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="34"
        fontWeight="700"
        fill="#ffffff"
      >
        N
      </text>
    </svg>
  )
}
