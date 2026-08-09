import { useMemo, useState } from 'react'
import DoorCard from '../components/DoorCard'
import MediaCard from '../components/MediaCard'
import { Link } from 'react-router-dom'
import { useQueries, useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { MEDIA_CONFIGS, configFor, pathForMedia } from '../lib/mediaConfig'
import { qk } from '../lib/queryKeys'
import CoverImage from '../components/CoverImage'
import Section from '../components/Section'
import EmptyState from '../components/EmptyState'
import { statusesFrom, useSettings } from '../lib/hooks'
import { usePlayer } from '../lib/player'
import { playTracks } from '../lib/musicTracks'
import { TYPE_COLORS } from './StatsPage'
import { GACHA_GAMES } from '@shared/gacha'
import lainIcon from '../assets/lain.png'
import { readerPath } from '../lib/readerPath'
import type { MediaItem, ResumePoint, SettingsMap } from '@shared/types'

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
    <div className="p-6 max-w-[1600px] mx-auto">
      <Hero items={all} stats={stats} />

      {/* Today: the learn/play surfaces with a daily pulse, in one band.
          (This band IS Home's DoorCard rail — the glow stays Home-exclusive.) */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ChecklistCard />
        <JapaneseCard />
        <EnglishCard />
        <PlayCard />
      </div>

      <ResumeStrip />

      {continuing.length > 0 && (
        <Strip title="Continue" items={continuing.slice(0, 12)} showProgress />
      )}

      <div className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr] items-stretch">
        <Spotlight pool={backlog.length ? backlog : all} fromBacklog={backlog.length > 0} />
        <div className="flex flex-col gap-4">
          <TimeStatsCard />
          <MusicCard />
        </div>
      </div>

      <TopPeople />

      <Section className="mt-8" title="Recently added">
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : recent.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            body="Add or import your first title to see it show up here."
            action={
              <Link to="/anime" className="btn-primary">
                Go to your library
              </Link>
            }
          />
        ) : (
          <Strip items={recent} />
        )}
      </Section>

      {favorites.length > 0 && <Strip title="Favorites" items={favorites.slice(0, 12)} />}

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
  // Same key ChecklistCard polls — one fetch, shared cache entry.
  const { data: checklist } = useQuery({
    queryKey: qk.checklist.status,
    queryFn: () => api.checklist.status(),
    staleTime: 0
  })
  const streak = checklist?.streak.current ?? 0

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
        {/* The Lain mark — same art as the app icon (assets/icon.png). */}
        <img src={lainIcon} alt="NaviHUB logo" className="h-16 w-16 mb-3 drop-shadow-lg" />
        <h1 className="text-4xl font-bold tracking-tight">
          Navi<span className="text-accent">HUB</span>
        </h1>
        <p className="mt-1.5 text-xs uppercase tracking-[0.3em] text-accent/80">good vibrations</p>
        {stats.titles > 0 && (
          <>
            <p className="mt-5 text-sm text-gray-400">
              {greeting} — {stats.inProgress > 0 ? 'picking up where you left off?' : 'what are we into today?'}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs tabular-nums">
              <span className="chip bg-base-800/80">{stats.titles} titles</span>
              {stats.inProgress > 0 && (
                <span className="chip bg-base-800/80">{stats.inProgress} in progress</span>
              )}
              {stats.completed > 0 && (
                <span className="chip bg-base-800/80">{stats.completed} finished</span>
              )}
              {stats.favorites > 0 && (
                <span className="chip bg-base-800/80">{stats.favorites} favorites</span>
              )}
              {stats.avgScore && (
                <span className="chip bg-base-800/80">Ø score {stats.avgScore}</span>
              )}
              {streak > 1 && (
                <span className="chip bg-base-800/80 text-accent">
                  {streak}-day streak
                </span>
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
// when the library is. The initial seed hashes today's date so "Tonight's
// pick" stays put across navigations within a day — Reroll still randomizes.
function daySeed(): number {
  let h = 0
  for (const c of new Date().toDateString()) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

function Spotlight({ pool, fromBacklog }: { pool: MediaItem[]; fromBacklog: boolean }) {
  const [seed, setSeed] = useState(daySeed)
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
          {[cfg.singular, year, pick.status].filter(Boolean).join(' · ')}
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
            Reroll
          </button>
        </div>
      </div>
    </div>
  )
}

// Door into the cross-library time-spent stats, with a live "days" headline.
// Today's routine at a glance. staleTime 0 keeps it honest after logging an
// episode or finishing a review session elsewhere in the app.
function ChecklistCard() {
  const { data } = useQuery({
    queryKey: qk.checklist.status,
    queryFn: () => api.checklist.status(),
    staleTime: 0
  })
  const daily = data?.daily ?? []
  const done = daily.filter((t) => t.done).length
  const streak = data?.streak.current ?? 0
  const pct = daily.length ? Math.round((done / daily.length) * 100) : 0
  // The weekly half rides the same query and was simply never shown, so a card
  // reading "3 of 5 done today" gave no hint that a weekly item was still open.
  const weeklyOpen = (data?.weekly ?? []).filter((t) => !t.done).length
  return (
    <DoorCard
      to="/checklist"
      eyebrow="Routine"
      title={daily.length === 0 ? 'Checklist' : `${done} of ${daily.length} done today`}
      body={
        daily.length === 0
          ? 'Set up the things you want to do every day and week.'
          : 'Your daily and weekly routine, tracked automatically.'
      }
      value={
        daily.length > 0 ? (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-900/60">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        ) : undefined
      }
      meta={
        [
          streak > 0 ? `${streak} day${streak === 1 ? '' : 's'} in a row` : null,
          weeklyOpen > 0 ? `${weeklyOpen} weekly open` : null
        ]
          .filter(Boolean)
          .join(' · ') || undefined
      }
    />
  )
}

// Japanese SRS at a glance: cards due now, today's pulse in the meta line.
function JapaneseCard() {
  const { data } = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats(),
    staleTime: 0
  })
  const started = (data?.totalCards ?? 0) > 0
  const due = data?.dueCount ?? 0
  return (
    <DoorCard
      to={started ? '/japanese/review' : '/japanese'}
      eyebrow="Japanese"
      title={!started ? 'Start the deck' : due > 0 ? `${due} cards due` : 'All clear'}
      body={
        started
          ? 'Reviews first — everything else is optional.'
          : 'Lessons, mining and SRS reviews live here.'
      }
      meta={
        started && data
          ? `${data.reviewsToday} reviewed · ${data.introducedToday} new today`
          : undefined
      }
    />
  )
}

// English deck (en_word IS the deck — dictionary/mining saves feed it).
function EnglishCard() {
  const { data } = useQuery({
    queryKey: qk.english.srsStats,
    queryFn: () => api.english.srsStats(),
    staleTime: 0
  })
  const started = (data?.totalCount ?? 0) > 0
  const due = data?.dueCount ?? 0
  return (
    <DoorCard
      to={started ? '/english/review' : '/english'}
      eyebrow="English"
      title={!started ? 'English' : due > 0 ? `${due} words due` : 'All clear'}
      body={
        started
          ? 'Saved words come back on schedule.'
          : 'Save words from the dictionary to build a deck.'
      }
      meta={started && data ? `${data.reviewedToday} reviewed today` : undefined}
    />
  )
}

// Play surface: gacha dailies waiting when there are any, else the song quiz.
function PlayCard() {
  const { data: due } = useQuery({
    queryKey: qk.gacha.dueCounts,
    queryFn: () => api.gacha.dueCounts(),
    staleTime: 0
  })
  const { data: pool = [] } = useQuery({
    queryKey: qk.quiz.songPool({}),
    queryFn: () => api.quiz.songPool({})
  })
  const entries = Object.entries(due ?? {}).filter(([, n]) => (n ?? 0) > 0)
  const total = entries.reduce((a, [, n]) => a + (n ?? 0), 0)
  const gameNames = entries
    .map(([id]) => GACHA_GAMES.find((g) => g.id === id)?.name ?? id)
    .join(' · ')
  return total > 0 ? (
    <DoorCard
      to="/gacha"
      eyebrow="Play"
      title={`${total} game task${total === 1 ? '' : 's'} waiting`}
      body="Dailies and goals your coach is tracking."
      meta={gameNames}
    />
  ) : (
    <DoorCard
      to="/quiz"
      eyebrow="Play"
      title="Quiz corner"
      body="Song quiz, tournaments, drills and more."
      meta={pool.length > 0 ? `${pool.length} songs ready` : undefined}
    />
  )
}

function TimeStatsCard() {
  const { data: stats } = useQuery({
    queryKey: qk.media.timeStats,
    queryFn: () => api.media.timeStats()
  })
  const days = stats ? stats.totalMinutes / 1440 : 0
  const hasData = !!stats && stats.consumedCount > 0
  const split = hasData ? stats!.byType.filter((t) => t.minutes > 0) : []
  return (
    <DoorCard
      to="/stats"
      eyebrow="Stats"
      title={
        hasData ? `~${days < 10 ? days.toFixed(1) : Math.round(days)} days of your life` : 'Time spent'
      }
      body={
        hasData
          ? 'See where the time went, type by type.'
          : 'Track progress to see your days-watched breakdown.'
      }
      value={
        split.length > 0 ? (
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-base-900/60">
            {split.map((t) => (
              <div
                key={t.mediaType}
                style={{
                  width: `${(t.minutes / stats!.totalMinutes) * 100}%`,
                  background: TYPE_COLORS[t.mediaType]
                }}
                title={configFor(t.mediaType).plural}
              />
            ))}
          </div>
        ) : undefined
      }
      meta={hasData ? `across ${stats!.consumedCount} titles` : undefined}
    />
  )
}

// Recent listening with a one-click way back into it. Plain card, not a
// DoorCard — it holds real controls, and the glow stays on the Today band.
function MusicCard() {
  const player = usePlayer()
  const { data: tracks = [] } = useQuery({
    queryKey: qk.music.recent,
    queryFn: () => api.music.recent(5)
  })
  if (tracks.length === 0) return null
  return (
    <div className="card flex-1 p-4">
      <div className="mb-2 flex items-center">
        <p className="flex-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
          Recently played
        </p>
        <button
          className="btn-ghost py-0.5 px-2.5 text-xs"
          onClick={() => playTracks(player, tracks)}
        >
          Play
        </button>
      </div>
      <div className="space-y-1">
        {tracks.map((t) => (
          <div key={t.id} className="flex items-baseline gap-2 text-sm">
            <span className="min-w-0 flex-1 truncate text-gray-200">{t.title}</span>
            <span className="max-w-[40%] shrink-0 truncate text-xs text-gray-500">
              {t.artistName}
            </span>
          </div>
        ))}
      </div>
      <Link to="/music" className="mt-3 inline-block text-xs text-gray-500 hover:text-accent">
        Music library →
      </Link>
    </div>
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
// "You were on page 143." Deliberately distinct from Continue below it, which
// is "in progress by status": these link STRAIGHT into the reader or player at
// the saved position, skipping the detail page entirely. Capped at 4 so it
// stays a shortcut rather than a second library.
function ResumeStrip() {
  const { data: points = [] } = useQuery({
    queryKey: qk.media.resumePoints,
    queryFn: () => api.media.resumePoints()
  })
  const shown = points.slice(0, 4)
  if (shown.length === 0) return null
  return (
    <Section className="mt-8" title="Pick up where you left off">
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {shown.map((p) => (
          <Link
            key={`${p.kind}-${p.refId}`}
            to={resumeHref(p)}
            className="group flex w-[280px] shrink-0 gap-3 rounded-lg bg-base-800 p-2 hover:bg-base-700"
          >
            <CoverImage
              path={p.media.coverPath}
              alt={p.media.title}
              rounded="rounded"
              className="h-[84px] w-[56px] shrink-0"
            />
            <div className="min-w-0 self-center">
              <p className="truncate text-sm font-medium group-hover:text-accent">
                {p.media.title}
              </p>
              <p className="truncate text-xs text-gray-400">{p.partTitle}</p>
              <p className="text-xs text-gray-500">{resumeLabel(p)}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}

// Chapters carry a page index; videos carry whole seconds.
function resumeLabel(p: ResumePoint): string {
  if (p.kind === 'video') {
    const m = Math.floor(p.position / 60)
    const s = p.position % 60
    return `at ${m}:${String(s).padStart(2, '0')}`
  }
  // last_read_page is a 0-based index into the pages/spine.
  return p.total ? `page ${p.position + 1} of ${p.total}` : `page ${p.position + 1}`
}

function resumeHref(p: ResumePoint): string {
  if (p.kind === 'video') return `/watch/file/${p.refId}`
  const basePath = p.media.mediaType === 'book' ? '/books' : '/manga'
  return readerPath(basePath, p.media.id, { id: p.refId, dirPath: p.dirPath })
}

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
          <MediaCard item={m} showTypeBadge showProgressBar={showProgress} showFavorite />
        </div>
      ))}
    </div>
  )
  return title ? <Section className="mt-8" title={title}>{row}</Section> : row
}

