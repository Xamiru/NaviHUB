import { useMemo, useState, type ReactNode } from 'react'
import DoorCard from '../components/DoorCard'
import HomeCustomiseDialog from '../components/HomeCustomiseDialog'
import {
  HOME_LAYOUT_SETTING,
  parseHomeLayout,
  widgetDef,
  type HomeWidgetKey
} from '../lib/homeWidgets'
import MediaCard from '../components/MediaCard'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { configFor, pathForMedia } from '../lib/mediaConfig'
import { qk } from '../lib/queryKeys'
import CoverImage from '../components/CoverImage'
import Section from '../components/Section'
import EmptyState from '../components/EmptyState'
import { useSettings } from '../lib/hooks'
import { usePlayerControls } from '../lib/player'
import { playTracks } from '../lib/musicTracks'
import { MEDIA_TYPE_COLORS } from '../lib/mediaColors'
import { GACHA_GAMES } from '@shared/gacha'
import { APP_THEME_SETTING, type AppTheme } from '@shared/appTheme'
import AppMark from '../components/AppMark'
import { resolveAppTheme } from '../lib/theme'
import { readerPath } from '../lib/readerPath'
import { mediaUrl } from '@shared/mediaUrl'
import type { MediaSummary, ResumePoint } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import { toastError } from '../lib/toast'

// The same seiyuu pool the /people browse page shows (anime + VN + games).
const VA_TYPES: MediaSummary['mediaType'][] = ['anime', 'visual_novel', 'game']

// Landing page: the library itself as a backdrop, what you're in the middle of,
// a backlog pick for tonight, the people your taste keeps coming back to, and
// quick ways deeper in. Everything derives from data already in the DB.
export default function HomePage() {
  const { data: overview, isLoading, isError, error, refetch } = useQuery({
    queryKey: qk.media.homeOverview,
    queryFn: () => api.media.homeOverview()
  })
  const { data: settings } = useSettings()
  const theme = resolveAppTheme(settings?.[APP_THEME_SETTING])
  const { data: resumePoints = [] } = useQuery({
    queryKey: qk.media.resumePoints,
    queryFn: () => api.media.resumePoints()
  })

  const wall = overview?.wall ?? []
  const recent = overview?.recent ?? []
  const continuing = overview?.continuing ?? []
  const favorites = overview?.favorites ?? []
  const spotlight = overview?.spotlight ?? []
  const stats = overview?.stats ?? {
    titles: 0,
    inProgress: 0,
    completed: 0,
    favorites: 0,
    avgScore: null
  }

  // The stored layout, or every widget in catalogue order when there is none.
  // The Hero is deliberately not in it: the wall of your own covers is Home's
  // identity, not a widget, and it stays pinned above whatever you configure.
  const layout = parseHomeLayout(settings?.[HOME_LAYOUT_SETTING])
  const [customising, setCustomising] = useState(false)

  // Missing query data is not an empty library. Keep the failure visible and
  // retryable instead of replacing the user's archive with zero-count
  // fallbacks after a sleep/wake or transient IPC failure.
  if (isError && !overview) {
    return (
      <div className="p-6" role="alert">
        <p className="text-sm text-red-400">
          Could not read your local library
          {error instanceof Error ? ` — ${error.message}` : ''}
        </p>
        <button className="btn-ghost mt-3" onClick={() => void refetch()}>
          Try again
        </button>
      </div>
    )
  }

  // Each widget's body. Rendering is by lookup rather than a chain of JSX, so
  // the stored order is the ONLY thing deciding what appears where.
  const widgets: Record<HomeWidgetKey, ReactNode> = {
    today: (
      // The learn/play surfaces with a daily pulse, in one band. This band IS
      // Home's DoorCard rail — the glow stays Home-exclusive.
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ChecklistCard />
        <JapaneseCard />
        <EnglishCard />
        <PlayCard />
      </div>
    ),
    resume: <ResumeStrip points={resumePoints} />,
    continue:
      continuing.length > 0 ? (
        <Strip title="Continue" items={continuing.slice(0, 12)} showProgress />
      ) : null,
    spotlight: (
      <Spotlight pool={spotlight} fromBacklog={overview?.spotlightFromBacklog ?? false} />
    ),
    timeStats: <TimeStatsCard />,
    music: <MusicCard />,
    unlocks: <RecentUnlocks />,
    people: <TopPeople />,
    recent: (
      <Section title="Recently added">
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : recent.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            body="Add or import your first title to see it show up here."
            action={
              <Link to="/anime" className="btn-ghost">
                Go to your library
              </Link>
            }
          />
        ) : (
          <Strip items={recent} />
        )}
      </Section>
    ),
    favorites:
      favorites.length > 0 ? <Strip title="Favorites" items={favorites.slice(0, 12)} /> : null
  }

  return (
    <div className="mx-auto max-w-[1760px] p-5 sm:p-6 xl:p-8">
      <Hero
        items={wall}
        stats={stats}
        resume={resumePoints[0]}
        continuing={continuing[0]}
        theme={theme}
      />

      <div className="mt-6 flex items-end justify-between border-b border-base-700 pb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
            {theme === 'metal-gear' ? 'Operations overview' : 'Personal transmission'}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            {theme === 'metal-gear' ? 'Your archive, mission-ready' : 'Your archive, in motion'}
          </h2>
        </div>
        <button className="btn-ghost text-xs" onClick={() => setCustomising(true)}>
          Customise Home
        </button>
      </div>

      {/* Two columns: 'full' widgets span both, 'half' widgets pair with the
          next half beside them. Below lg everything is one column anyway. */}
      <div className="mt-5 grid items-start gap-7 lg:grid-cols-2">
        {layout
          .filter((e) => e.visible)
          .map((e) => {
            const def = widgetDef(e.key)
            const body = widgets[e.key]
            if (!def || !body) return null
            return (
              // empty:hidden collapses the cell when the widget renders
              // nothing. `body` is a React element, so it is truthy even for
              // ResumeStrip / RecentUnlocks / TopPeople / MusicCard, each of
              // which returns null with no data — an emptier library was
              // showing their wrappers as blank gap-6 bands.
              <div
                key={e.key}
                className={`empty:hidden ${
                  def.span === 'full' ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                {body}
              </div>
            )
          })}
      </div>

      {customising && (
        <HomeCustomiseDialog layout={layout} onClose={() => setCustomising(false)} />
      )}
    </div>
  )
}

const cardKey = (m: MediaSummary) => `${m.mediaType}-${m.id}`

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
  stats,
  resume,
  continuing,
  theme
}: {
  items: MediaSummary[]
  stats: {
    titles: number
    inProgress: number
    completed: number
    favorites: number
    avgScore: string | null
  }
  resume?: ResumePoint
  continuing?: MediaSummary
  theme: AppTheme
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
    <section className="relative min-h-[330px] overflow-hidden rounded-2xl border border-base-700 bg-base-900">
      {tiles.length >= 12 && (
        <div
          className="absolute -inset-8 grid grid-cols-6 auto-rows-fr gap-2 -rotate-2 scale-105 md:grid-cols-8"
          aria-hidden
        >
          {tiles.map((m) => (
            <CoverImage
              key={cardKey(m)}
              path={m.coverPath}
              alt=""
              thumbWidth={320}
              rounded="rounded"
              className="h-full w-full"
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-base-900 via-base-900/85 to-base-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-transparent to-base-900/35" />

      <div className="relative grid min-h-[330px] items-center gap-8 p-7 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.78fr)] lg:p-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4">
            <AppMark theme={theme} className="h-14 w-14 drop-shadow-lg" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                {theme === 'metal-gear' ? 'Tactical archive' : 'Archive broadcast'}
              </p>
              <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
                Navi<span className="text-accent">HUB</span>
              </h1>
            </div>
          </div>
          <p className="mt-6 text-base text-gray-300">
            {greeting}.{' '}
            {theme === 'metal-gear'
              ? stats.inProgress > 0
                ? 'Your next operation is ready.'
                : 'The mission index is standing by.'
              : stats.inProgress > 0
                ? 'Your next signal is ready.'
                : 'The archive is listening.'}
          </p>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-gray-500">
            {theme === 'metal-gear'
              ? 'Resume an active file first, then trace the people, worlds and evidence connected across your local library.'
              : 'Continue a saved session first, then drift through the people, worlds and patterns already connected in your library.'}
          </p>

          {stats.titles > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 text-xs tabular-nums">
              <span className="chip border-base-600 bg-base-800/80">{stats.titles} titles</span>
              {stats.inProgress > 0 && (
                <span className="chip border-base-600 bg-base-800/80">
                  {stats.inProgress} in progress
                </span>
              )}
              {stats.completed > 0 && (
                <span className="chip border-base-600 bg-base-800/80">{stats.completed} finished</span>
              )}
              {stats.favorites > 0 && (
                <span className="chip border-base-600 bg-base-800/80">{stats.favorites} favorites</span>
              )}
              {stats.avgScore && (
                <span className="chip border-base-600 bg-base-800/80">Average {stats.avgScore}</span>
              )}
              {streak > 1 && (
                <span className="chip border-accent/30 bg-base-800/80 text-accent">
                  {streak}-day streak
                </span>
              )}
            </div>
          )}
        </div>

        <HeroContinuation resume={resume} continuing={continuing} theme={theme} />
      </div>
    </section>
  )
}

function HeroContinuation({
  resume,
  continuing,
  theme
}: {
  resume?: ResumePoint
  continuing?: MediaSummary
  theme: AppTheme
}) {
  if (resume) {
    return (
      <ResumeAction
        point={resume}
        className="group relative min-h-52 overflow-hidden rounded-xl border border-accent/30 bg-base-800/90 p-5 shadow-2xl transition-colors hover:border-accent"
      >
        {resume.media.coverPath && (
          <div className="absolute inset-0 opacity-20 blur-xl" aria-hidden="true">
            <CoverImage
              path={resume.media.coverPath}
              alt=""
              thumbWidth={320}
              rounded=""
              className="h-full w-full scale-125"
            />
          </div>
        )}
        <div className="relative flex h-full min-h-[168px] gap-4">
          <CoverImage
            path={resume.media.coverPath}
            alt={resume.media.title}
            thumbWidth={160}
            rounded="rounded-lg"
            className="w-28 shrink-0 shadow-lg"
          />
          <div className="flex min-w-0 flex-1 flex-col py-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              {theme === 'metal-gear' ? 'Resume operation' : 'Resume transmission'}
            </p>
            <h2 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight text-white group-hover:text-accent">
              {resume.media.title}
            </h2>
            <p className="mt-2 truncate text-sm text-gray-300">{resume.partTitle}</p>
            <p className="mt-1 text-xs text-gray-500">{resumeLabel(resume)}</p>
            <span className="btn-primary mt-auto self-start">Continue</span>
          </div>
        </div>
      </ResumeAction>
    )
  }

  if (continuing) {
    const cfg = configFor(continuing.mediaType)
    return (
      <Link
        to={pathForMedia(continuing)}
        className="group relative min-h-52 overflow-hidden rounded-xl border border-base-600 bg-base-800/90 p-5 shadow-2xl transition-colors hover:border-accent"
      >
        <div className="relative flex h-full min-h-[168px] gap-4">
          <CoverImage
            path={continuing.coverPath}
            alt={continuing.title}
            thumbWidth={160}
            rounded="rounded-lg"
            className="w-28 shrink-0 shadow-lg"
          />
          <div className="flex min-w-0 flex-1 flex-col py-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              Continue {cfg.singular.toLowerCase()}
            </p>
            <h2 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight text-white group-hover:text-accent">
              {continuing.title}
            </h2>
            <p className="mt-2 text-sm text-gray-400">{cfg.formatProgressStat(continuing)}</p>
            <span className="btn-primary mt-auto self-start">Open title</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="flex min-h-52 flex-col justify-end rounded-xl border border-base-600 bg-base-800/80 p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
        {theme === 'metal-gear' ? 'First operation' : 'First transmission'}
      </p>
      <h2 className="mt-2 text-xl font-semibold text-white">Build your personal archive</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        Add a title, scan a local library, or begin a course. Home will turn that activity into a continuation feed.
      </p>
      <Link to="/anime" className="btn-primary mt-5 self-start">
        Open library
      </Link>
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

function Spotlight({ pool, fromBacklog }: { pool: MediaSummary[]; fromBacklog: boolean }) {
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
          <CoverImage path={pick.coverPath} alt="" className="h-full w-full" rounded="" thumbWidth={320} />
        </div>
      )}
      <Link to={pathForMedia(pick)} className="relative shrink-0 self-center">
        <CoverImage
          path={pick.coverPath}
          alt={pick.title}
          thumbWidth={320}
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
          <Link to={pathForMedia(pick)} className="btn-ghost">
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
      body="Song quiz and tournaments over your library."
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
                  background: MEDIA_TYPE_COLORS[t.mediaType]
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
  const player = usePlayerControls()
  const { data: tracks = [] } = useQuery({
    queryKey: qk.music.recent(5),
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

// The last few achievements earned. Hidden entirely until something is
// tracked, so a library with no games never sees an empty shelf.
function RecentUnlocks() {
  const { data = [] } = useQuery({
    queryKey: qk.achievements.recent(10),
    queryFn: () => api.achievements.recent(10)
  })
  if (!data.length) return null
  return (
    <Section title="Recent unlocks">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {data.map((e) => (
          <Link
            key={`${e.achievementId}-${e.unlockedAt}`}
            to={`${configFor(e.mediaType).basePath}/${e.mediaId}?tab=achievements`}
            className="card group flex w-64 shrink-0 items-center gap-3 p-3 hover:border-accent/60"
            title={e.description ?? e.name}
          >
            {e.iconPath ? (
              <img
                src={mediaUrl(e.iconPath) ?? undefined}
                alt=""
                className="h-12 w-12 shrink-0 rounded object-cover"
              />
            ) : (
              <span className="h-12 w-12 shrink-0 rounded bg-base-700" />
            )}
            <span className="min-w-0">
              <span className="block truncate text-sm group-hover:text-accent">{e.name}</span>
              <span className="block truncate text-xs text-gray-500">{e.mediaTitle}</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
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
    <Section title="Your people">
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
// is "in progress by status": these open the saved reader position or tracked
// video file, skipping the detail page entirely. Capped at 4 so it
// stays a shortcut rather than a second library.
function ResumeStrip({ points }: { points: ResumePoint[] }) {
  const shown = points.slice(0, 4)
  if (shown.length === 0) return null
  return (
    <Section title="Pick up where you left off">
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {shown.map((p) => (
          <ResumeAction
            key={`${p.kind}-${p.refId}`}
            point={p}
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
          </ResumeAction>
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
  const basePath = p.media.mediaType === 'book' ? '/books' : '/manga'
  return readerPath(basePath, p.media.id, { id: p.refId, dirPath: p.dirPath })
}

function ResumeAction({
  point,
  className,
  children
}: {
  point: ResumePoint
  className: string
  children: ReactNode
}): JSX.Element {
  if (point.kind === 'video') {
    return (
      <button
        type="button"
        className={`${className} text-left`}
        onClick={() => void api.video.openExternal({ kind: 'file', fileId: point.refId }).catch(toastError)}
      >
        {children}
      </button>
    )
  }
  return (
    <Link to={resumeHref(point)} className={className}>
      {children}
    </Link>
  )
}

function Strip({
  title,
  items,
  showProgress = false
}: {
  title?: string
  items: MediaSummary[]
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
  return title ? <Section title={title}>{row}</Section> : row
}
