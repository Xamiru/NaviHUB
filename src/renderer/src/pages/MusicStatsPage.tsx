import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import CoverImage from '../components/CoverImage'
import { formatDuration, formatLongDuration } from '../components/MusicTrackRow'
import { TrackList } from './MusicLibraryPage'
import type { MusicStatsDetail, MusicTrack } from '@shared/types'

// Listening stats over the play log (period-scoped) with all-time fallbacks
// from the play_count counters, so the page is useful before the log has data.
// All charts are single-series magnitude → one accent hue, no legends, value
// label on the max bar only, native title tooltips (dataviz conventions).

const PERIODS: { days: number | null; label: string }[] = [
  { days: 7, label: '7 days' },
  { days: 28, label: '4 weeks' },
  { days: 182, label: '6 months' },
  { days: null, label: 'All time' }
]

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const pad = (n: number): string => String(n).padStart(2, '0')
const localDayString = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
// 'YYYY-MM-DD' → short human label like "21 Jun"
const shortDay = (day: string): string => `${Number(day.slice(8, 10))} ${MONTHS[Number(day.slice(5, 7)) - 1]}`
const weekdayOf = (day: string): string =>
  WEEKDAYS[new Date(Number(day.slice(0, 4)), Number(day.slice(5, 7)) - 1, Number(day.slice(8, 10))).getDay()]
// UTC timestamp from SQLite ('YYYY-MM-DD HH:MM:SS') → local calendar day string
const utcToLocalDay = (ts: string): string => localDayString(new Date(ts.replace(' ', 'T') + 'Z'))

export default function MusicStatsPage() {
  const [days, setDays] = usePersistedState<number | null>('musicStatsDays', 7)

  const { data: stats } = useQuery({
    queryKey: qk.music.statsDetail(days),
    queryFn: () => api.music.statsDetail(days),
    staleTime: 0
  })
  const { data: recent = [] } = useQuery({
    queryKey: qk.music.recent,
    queryFn: () => api.music.recent(20),
    staleTime: 0
  })

  // Stable array for TrackList: useIncrementalList resets to its first batch on
  // any new array identity, so an inline .map() would re-slice every render.
  const topTrackList = useMemo(
    () => (stats?.topTracks ?? []).map((t) => t.track),
    [stats?.topTracks]
  )

  if (!stats) return <PageStatus>Loading…</PageStatus>

  // Empty tiers: (1) nothing ever played, (2) counters exist but the log is
  // empty (pre-log plays), (3) partial log coverage (footnoted below).
  const neverPlayed = stats.logStartedAt === null && recent.length === 0
  const hasLog = stats.logStartedAt !== null
  const periodEmpty = days !== null && stats.tiles.plays === 0

  const windowStart =
    days !== null ? localDayString(new Date(Date.now() - (days - 1) * 86_400_000)) : null
  const showDiscoveries =
    days !== null &&
    stats.newArtists.length > 0 &&
    hasLog &&
    utcToLocalDay(stats.logStartedAt!) < windowStart!

  return (
    <div className="mx-auto max-w-4xl p-6">
      <BackButton />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h1 className="mr-auto text-2xl font-bold">Listening stats</h1>
        {PERIODS.map((p) => (
          <button
            key={p.label}
            className={`rounded-full px-3 py-1 text-sm ${
              days === p.days ? 'bg-accent/20 text-white' : 'text-gray-400 hover:bg-base-700'
            }`}
            onClick={() => setDays(p.days)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {neverPlayed ? (
        <>
          <p className="mb-6 text-sm text-gray-500">
            Nothing played yet — stats fill in as you listen.
          </p>
          <LibraryFactsCard library={stats.library} />
        </>
      ) : periodEmpty ? (
        <>
          <div className="card mb-6 p-5 text-sm text-gray-500">
            No plays in this period yet.
            {!hasLog && ' Day-by-day stats start recording from today — All time shows your totals so far.'}
          </div>
          <LibraryFactsCard library={stats.library} />
          <RecentSection tracks={recent} />
        </>
      ) : (
        <>
          <StatTiles stats={stats} hasLog={hasLog} />

          {hasLog && stats.playsPerDay.length > 0 ? (
            <>
              <ActivityChart stats={stats} windowStart={windowStart} />
              <HourChart stats={stats} />
            </>
          ) : (
            <p className="mb-6 text-sm text-gray-500">
              Day-by-day charts start recording from today.
            </p>
          )}

          {stats.topArtists.length > 0 && <TopArtists artists={stats.topArtists} />}
          {stats.topAlbums.length > 0 && <TopAlbums albums={stats.topAlbums} />}
          {showDiscoveries && <NewDiscoveries artists={stats.newArtists} />}
          {stats.topTracks.length > 0 && (
            <Section title="Top tracks">
              <TrackList
                tracks={topTrackList}
                renderTrailing={(t) => {
                  const plays = stats.topTracks.find((x) => x.track.id === t.id)?.plays ?? 0
                  return (
                    <span className="shrink-0 rounded-full bg-base-700 px-2 py-0.5 text-xs tabular-nums text-gray-400">
                      {plays} {plays === 1 ? 'play' : 'plays'}
                    </span>
                  )
                }}
              />
            </Section>
          )}

          <LibraryFactsCard library={stats.library} />
          <RecentSection tracks={recent} />

          <p className="mt-6 text-xs text-gray-400">
            Plays count after 10 uninterrupted seconds
            {stats.logStartedAt && ` · day charts recording since ${shortDay(utcToLocalDay(stats.logStartedAt))}`}
            .
          </p>
        </>
      )}
    </div>
  )
}

function StatTiles({ stats, hasLog }: { stats: MusicStatsDetail; hasLog: boolean }) {
  const tiles: { label: string; value: string; sub?: string }[] = [
    { label: 'Listening time', value: formatLongDuration(stats.tiles.seconds) },
    { label: 'Plays', value: String(stats.tiles.plays) },
    { label: 'Tracks', value: String(stats.tiles.distinctTracks) },
    { label: 'Artists', value: String(stats.tiles.distinctArtists) }
  ]
  if (hasLog) {
    tiles.push({
      label: 'Streak',
      value: `${stats.streak.current} ${stats.streak.current === 1 ? 'day' : 'days'}`,
      sub: `longest: ${stats.streak.longest}`
    })
  }
  return (
    <div className={`mb-6 grid grid-cols-2 gap-3 ${hasLog ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
      {tiles.map((t) => (
        <StatTile key={t.label} label={t.label} value={t.value} sub={t.sub} />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Charts — pure divs, single accent hue, value label on the max bar only,
// sparse x labels, hairline baseline, native title tooltips.
// ---------------------------------------------------------------------------

interface Bar {
  key: string
  label?: string // sparse x label (most bars pass none)
  value: number
  title: string // native tooltip
}

function BarChart({ bars, height = 96 }: { bars: Bar[]; height?: number }) {
  const max = Math.max(...bars.map((b) => b.value), 1)
  const maxIdx = bars.findIndex((b) => b.value === max)
  return (
    <div>
      <div className="flex items-end gap-[2px] pt-4" style={{ height: height + 16 }}>
        {bars.map((b, i) => (
          <div
            key={b.key}
            className="group relative flex h-full flex-1 items-end justify-center"
            title={b.title}
          >
            {i === maxIdx && b.value > 0 && (
              <span className="absolute -top-4 text-[10px] tabular-nums text-gray-400">
                {b.value}
              </span>
            )}
            <div
              className={`w-full max-w-6 ${
                b.value > 0 ? 'rounded-t bg-accent/70 group-hover:bg-accent' : 'bg-base-700'
              }`}
              style={{ height: b.value > 0 ? `${Math.max((b.value / max) * 100, 3)}%` : '2px' }}
            />
          </div>
        ))}
      </div>
      <div className="border-t border-base-700" />
      <div className="mt-1 flex gap-[2px]">
        {bars.map((b) => (
          <div key={b.key} className="flex-1 text-center text-[10px] text-gray-500">
            {b.label ?? ''}
          </div>
        ))}
      </div>
    </div>
  )
}

// Dense day grid (zeros filled) from the sparse repo rows; weekly buckets when
// the range exceeds ~60 days so the bars stay readable.
function ActivityChart({
  stats,
  windowStart
}: {
  stats: MusicStatsDetail
  windowStart: string | null
}) {
  const byDay = new Map(stats.playsPerDay.map((d) => [d.day, d]))
  const start =
    windowStart ??
    (stats.logStartedAt ? utcToLocalDay(stats.logStartedAt) : localDayString(new Date()))
  const today = localDayString(new Date())

  const dayList: { day: string; plays: number; seconds: number }[] = []
  for (
    let t = new Date(start + 'T00:00:00').getTime();
    localDayString(new Date(t)) <= today;
    t += 86_400_000
  ) {
    const day = localDayString(new Date(t))
    const row = byDay.get(day)
    dayList.push({ day, plays: row?.plays ?? 0, seconds: row?.seconds ?? 0 })
  }

  let bars: Bar[]
  if (dayList.length > 60) {
    // weekly buckets, labelled by week start
    bars = []
    for (let i = 0; i < dayList.length; i += 7) {
      const chunk = dayList.slice(i, i + 7)
      const plays = chunk.reduce((s, d) => s + d.plays, 0)
      const seconds = chunk.reduce((s, d) => s + d.seconds, 0)
      bars.push({
        key: chunk[0].day,
        label: i % 28 === 0 ? shortDay(chunk[0].day) : undefined,
        value: plays,
        title: `Week of ${shortDay(chunk[0].day)} · ${plays} plays · ${formatLongDuration(seconds)}`
      })
    }
  } else {
    const labelEvery = dayList.length > 14 ? 7 : dayList.length > 7 ? 2 : 1
    bars = dayList.map((d, i) => ({
      key: d.day,
      label: i % labelEvery === 0 ? shortDay(d.day) : undefined,
      value: d.plays,
      title: `${weekdayOf(d.day).slice(0, 3)} ${shortDay(d.day)} · ${d.plays} plays · ${formatLongDuration(d.seconds)}`
    }))
  }

  const busiest = stats.playsPerDay.reduce(
    (best, d) => (d.plays > (best?.plays ?? 0) ? d : best),
    null as null | { day: string; plays: number }
  )
  return (
    <Section
      title="Activity"
      subtitle={
        busiest ? `busiest: ${weekdayOf(busiest.day).slice(0, 3)} ${shortDay(busiest.day)} (${busiest.plays} plays)` : undefined
      }
    >
      <BarChart bars={bars} />
    </Section>
  )
}

// Plays-weighted listening-hours label ("Night owl" etc.) + weekday fact.
function HourChart({ stats }: { stats: MusicStatsDetail }) {
  const byHour = new Map(stats.playsByHour.map((h) => [h.hour, h.plays]))
  const bars: Bar[] = Array.from({ length: 24 }, (_, hour) => ({
    key: String(hour),
    label: hour % 6 === 0 ? String(hour) : undefined,
    value: byHour.get(hour) ?? 0,
    title: `${pad(hour)}:00–${pad(hour)}:59 · ${byHour.get(hour) ?? 0} plays`
  }))

  const bandPlays = (hours: number[]): number =>
    hours.reduce((s, h) => s + (byHour.get(h) ?? 0), 0)
  const bands: [string, number][] = [
    ['Early bird', bandPlays([5, 6, 7, 8, 9, 10, 11])],
    ['Afternoon listener', bandPlays([12, 13, 14, 15, 16, 17])],
    ['Evening listener', bandPlays([18, 19, 20, 21, 22])],
    ['Night owl', bandPlays([23, 0, 1, 2, 3, 4])]
  ]
  const personality = bands.reduce((a, b) => (b[1] > a[1] ? b : a))[0]

  const topWeekday = stats.playsByWeekday.reduce(
    (best, d) => (d.plays > (best?.plays ?? 0) ? d : best),
    null as null | { weekday: number; plays: number }
  )

  return (
    <Section title="Time of day" subtitle={personality}>
      <BarChart bars={bars} height={64} />
      {topWeekday && (
        <p className="mt-2 text-xs text-gray-500">
          Most plays on {WEEKDAYS[topWeekday.weekday]}s.
        </p>
      )}
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Top lists
// ---------------------------------------------------------------------------

function TopArtists({ artists }: { artists: MusicStatsDetail['topArtists'] }) {
  const top = artists[0].plays || 1
  return (
    <Section title="Top artists">
      <div className="space-y-2">
        {artists.map((a, i) => (
          <div key={a.id} className="flex items-center gap-3">
            <span className="w-5 shrink-0 text-right text-sm tabular-nums text-gray-500">
              {i + 1}
            </span>
            <Link to={`/music/artists/${a.id}`} className="shrink-0">
              <CoverImage path={a.coverPath} alt={a.name} rounded="rounded-full" className="h-10 w-10" />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <Link
                  to={`/music/artists/${a.id}`}
                  className="line-clamp-1 text-sm font-medium hover:text-accent"
                >
                  {a.name}
                </Link>
                <span className="shrink-0 text-xs tabular-nums text-gray-500">
                  {a.plays} plays · {formatLongDuration(a.seconds)}
                </span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-base-700">
                <div
                  className="h-full rounded-full bg-accent/70"
                  style={{ width: `${(a.plays / top) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function TopAlbums({ albums }: { albums: MusicStatsDetail['topAlbums'] }) {
  return (
    <Section title="Top albums">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
        {albums.map((a) => (
          <Link key={a.id} to={`/music/albums/${a.id}`} className="group">
            <CoverImage path={a.coverPath} alt={a.title} className="aspect-square w-full" />
            <p className="mt-1.5 line-clamp-1 text-sm font-medium group-hover:text-accent">
              {a.title}
            </p>
            <p className="line-clamp-1 text-xs text-gray-500">
              {a.artistName} · {a.plays} {a.plays === 1 ? 'play' : 'plays'}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  )
}

function NewDiscoveries({ artists }: { artists: MusicStatsDetail['newArtists'] }) {
  return (
    <Section title="New discoveries" subtitle="artists you played for the first time">
      <div className="flex flex-wrap gap-4">
        {artists.map((a) => (
          <Link key={a.id} to={`/music/artists/${a.id}`} className="group w-20 text-center">
            <CoverImage path={a.coverPath} alt={a.name} rounded="rounded-full" className="mx-auto h-16 w-16" />
            <p className="mt-1 line-clamp-2 text-xs group-hover:text-accent">{a.name}</p>
            <p className="text-[10px] text-gray-500">{shortDay(utcToLocalDay(a.firstPlayedAt))}</p>
          </Link>
        ))}
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Library composition (period-independent)
// ---------------------------------------------------------------------------

function LibraryFactsCard({ library }: { library: MusicStatsDetail['library'] }) {
  const likedPct = library.tracks > 0 ? Math.round((library.likedTracks / library.tracks) * 100) : 0
  const decadeBars: Bar[] = library.decades.map((d) => ({
    key: String(d.decade),
    label: `${String(d.decade).slice(2)}s`,
    value: d.tracks,
    title: `${d.decade}s · ${d.albums} ${d.albums === 1 ? 'album' : 'albums'} · ${d.tracks} tracks`
  }))
  return (
    <Section title="Your library">
      <div className="card space-y-3 p-4 text-sm">
        <p className="text-gray-300">
          {library.artists} artists · {library.albums} albums · {library.tracks} tracks ·{' '}
          {formatLongDuration(library.totalSeconds)}
        </p>
        <p className="text-gray-500">
          Liked: {library.likedTracks} tracks ({likedPct}%)
          {library.likedSeconds > 0 && ` · ${formatLongDuration(library.likedSeconds)}`}
          {library.avgTrackSeconds != null &&
            ` · Average track: ${formatDuration(library.avgTrackSeconds)}`}
        </p>
        {library.deepestArtists.length > 0 && (
          <p className="text-gray-500">
            Deepest shelves:{' '}
            {library.deepestArtists.map((a, i) => (
              <span key={a.id}>
                {i > 0 && ', '}
                <Link to={`/music/artists/${a.id}`} className="text-gray-400 hover:text-accent">
                  {a.name}
                </Link>{' '}
                ({a.tracks})
              </span>
            ))}
          </p>
        )}
        {decadeBars.length >= 2 && (
          <div className="max-w-md pt-1">
            <BarChart bars={decadeBars} height={48} />
          </div>
        )}
      </div>
    </Section>
  )
}

function RecentSection({ tracks }: { tracks: MusicTrack[] }) {
  if (tracks.length === 0) return null
  return (
    <Section title="Recently played">
      <TrackList tracks={tracks} />
    </Section>
  )
}
