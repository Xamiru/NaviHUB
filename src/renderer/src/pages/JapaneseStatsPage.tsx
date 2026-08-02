import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import { LEECH_LAPSES } from '@shared/srs'
import PageHeader from '../components/PageHeader'
import BarChart, { type Bar } from '../components/BarChart'
import CalendarHeatmap from '../components/CalendarHeatmap'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import StatTile, { StatInline } from '../components/StatTile'
import { Group, Pill } from '../components/PillGroup'
import { usePersistedState } from '../lib/navState'
import type { JpStatsDetail, SrsGrade } from '@shared/types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_MS = 86_400_000

const pad = (n: number): string => String(n).padStart(2, '0')
const localDayString = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
// 'YYYY-MM-DD' → short human label like "21 Jun"
const shortDay = (day: string): string =>
  `${Number(day.slice(8, 10))} ${MONTHS[Number(day.slice(5, 7)) - 1]}`

const GRADES: { grade: SrsGrade; label: string }[] = [
  { grade: 'again', label: 'Again' },
  { grade: 'hard', label: 'Hard' },
  { grade: 'good', label: 'Good' },
  { grade: 'easy', label: 'Easy' }
]

export default function JapaneseStatsPage() {
  const { data: stats } = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats(),
    staleTime: 0
  })
  const { data: detail } = useQuery({
    queryKey: qk.japanese.statsDetail,
    queryFn: () => api.japanese.statsDetail(),
    staleTime: 0
  })

  if (!stats || !detail) return <PageStatus>Loading…</PageStatus>

  const answered = detail.totalReviews
  const accuracy =
    answered > 0 ? Math.round(((answered - detail.gradeCounts.again) / answered) * 100) : 0

  return (
    <div className="mx-auto max-w-4xl p-6">
      <PageHeader back={{ to: '/japanese', label: 'Japanese' }} title="Japanese stats" />

      {answered === 0 ? (
        <EmptyState title="No reviews yet — grade some cards and this page fills in." />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-6">
            <StatTile
              label="Streak"
              value={`${detail.streak.current} ${detail.streak.current === 1 ? 'day' : 'days'}`}
              sub={`longest: ${detail.streak.longest}`}
              accent={detail.streak.current > 0}
            />
            <StatTile label="Reviews today" value={stats.reviewsToday} />
            <StatTile label="Total reviews" value={detail.totalReviews} />
            <StatTile label="Accuracy" value={`${accuracy}%`} sub="graded Hard or better" />
            <StatTile
              label="Retention 30d"
              value={
                detail.retention.strict30 != null
                  ? `${Math.round(detail.retention.strict30 * 100)}%`
                  : '—'
              }
              sub="strict: Good/Easy only"
            />
            <StatTile label="Due now" value={stats.dueCount} accent={stats.dueCount > 0} />
          </div>

          <Section title="Review activity" subtitle="last 12 months" className="mb-8">
            <CalendarHeatmap days={detail.reviewsPerDay} unit="reviews" />
          </Section>

          <ForecastSection detail={detail} />

          <Section title="Answer breakdown" className="mb-8">
            <GradeBars gradeCounts={detail.gradeCounts} total={answered} />
          </Section>

          <Section
            title="Journey"
            subtitle="everything below is derived — nothing is hand-logged"
            className="mb-8"
          >
            <div className="card grid grid-cols-2 gap-x-6 gap-y-3 p-4 sm:grid-cols-4">
              <StatInline
                label="Started"
                value={detail.firstReviewAt ? detail.firstReviewAt.slice(0, 10) : '—'}
              />
              <StatInline label="Total reviews" value={detail.totalReviews.toLocaleString()} />
              <StatInline
                label="Distinct cards"
                value={detail.journey.distinctCardsReviewed.toLocaleString()}
              />
              <StatInline label="Words mined" value={detail.journey.wordsMined.toLocaleString()} />
              <StatInline label="Lessons learned" value={detail.journey.lessonsLearned} />
              <StatInline label="Chapters read" value={detail.journey.chaptersRead} />
              <StatInline label="Quiz rounds" value={detail.journey.quizRounds} />
              <StatInline label="Longest streak" value={`${detail.streak.longest} days`} />
            </div>
          </Section>

          <Leeches />
        </>
      )}
    </div>
  )
}

// Cards that keep coming back. Resetting one wipes its schedule but keeps its
// history — the point is a clean second run at a word that isn't sticking.
// "Drill these" grinds them WITHOUT touching intervals (/japanese/leeches/drill).
function Leeches() {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const { data: leeches = [] } = useQuery({
    queryKey: qk.japanese.leeches,
    queryFn: () => api.japanese.listLeeches(),
    staleTime: 0
  })
  const { data: confusables = [] } = useQuery({
    queryKey: qk.japanese.confusables,
    queryFn: () => api.japanese.confusables(),
    staleTime: 0
  })
  if (leeches.length === 0 && confusables.length === 0) return null

  async function reset(id: number, front: string): Promise<void> {
    if (!window.confirm(`Reset "${front}" to a new card? Its review history is kept.`)) return
    try {
      await api.japanese.resetCard(id)
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      toast(`Reset 「${front}」`, 'success')
    } catch (e) {
      toastError(e)
    }
  }

  const REASON_LABEL: Record<'reading' | 'kanji' | 'components', string> = {
    reading: 'same reading',
    kanji: 'shared kanji',
    components: 'similar parts'
  }

  return (
    <Section
      title="Leeches"
      subtitle={
        leeches.length >= 2 ? (
          <button
            className="btn-ghost py-1 px-2 text-xs"
            onClick={() =>
              navigate('/japanese/leeches/drill', {
                state: {
                  items: leeches.map((l) => ({
                    id: l.id,
                    front: l.front,
                    reading: l.reading,
                    back: l.back
                  }))
                }
              })
            }
          >
            Drill these
          </button>
        ) : (
          `lapsed ${LEECH_LAPSES}+ times`
        )
      }
      className="mb-8"
    >
      {confusables.length > 0 && (
        <div className="card mb-3 divide-y divide-base-700">
          <p className="p-2.5 text-xs uppercase tracking-wide text-gray-500">
            Possibly confused — lapsing cards with a look-alike in your deck
          </p>
          {confusables.map((pair) => (
            <div key={`${pair.a.id}-${pair.b.id}`} className="flex items-center gap-3 p-2.5 text-sm">
              <div className="min-w-0 flex-1">
                <p className="truncate">
                  <span className="font-medium">{pair.a.front}</span>
                  <span className="mx-2 text-gray-600">×</span>
                  <span className="font-medium">{pair.b.front}</span>
                </p>
                <p className="truncate text-xs text-gray-500">
                  {pair.a.back} · {pair.b.back}
                </p>
              </div>
              {pair.reasons.map((r) => (
                <span key={r} className="chip shrink-0 bg-base-700 text-gray-400">
                  {REASON_LABEL[r]}
                </span>
              ))}
              <button
                className="btn-ghost shrink-0 py-1 px-2 text-xs"
                onClick={() =>
                  navigate('/japanese/leeches/drill', { state: { items: [pair.a, pair.b] } })
                }
              >
                Drill pair
              </button>
            </div>
          ))}
        </div>
      )}
      {leeches.length > 0 && (
      <div className="card divide-y divide-base-700">
        {leeches.map((l) => (
          <div key={l.id} className="flex items-center gap-3 p-2.5 text-sm">
            <div className="min-w-0 flex-1">
              <p className="truncate">
                <span className="font-medium">{l.front}</span>
                {l.reading && l.reading !== l.front && (
                  <span className="ml-2 text-xs text-gray-400">{l.reading}</span>
                )}
              </p>
              <p className="truncate text-xs text-gray-500">{l.back}</p>
            </div>
            <span className="shrink-0 text-xs text-red-300">{l.lapses} lapses</span>
            <span className="shrink-0 text-xs text-gray-500">ease {l.ease.toFixed(2)}</span>
            <Link
              to={`/japanese/lessons/${l.lessonId}`}
              className="btn-ghost shrink-0 py-1 px-2 text-xs"
              title={`${l.courseTitle} · ${l.lessonTitle}`}
            >
              Lesson
            </Link>
            <button
              className="btn-ghost shrink-0 py-1 px-2 text-xs text-gray-500 hover:text-red-400"
              onClick={() => void reset(l.id, l.front)}
            >
              Reset
            </button>
          </div>
        ))}
      </div>
      )}
    </Section>
  )
}

// Dense N-day series from the sparse repo rows (zeros filled); the repo now
// supplies 30 days and the pills pick the window.
function ForecastSection({ detail }: { detail: JpStatsDetail }) {
  const [days, setDays] = usePersistedState<number>('jpForecastDays', 14)
  const byDay = new Map(detail.dueForecast.map((d) => [d.day, d.due]))
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const labelEvery = Math.max(2, Math.ceil(days / 14))
  const bars: Bar[] = []
  for (let i = 0; i < days; i++) {
    const day = localDayString(new Date(today.getTime() + i * DAY_MS))
    const due = byDay.get(day) ?? 0
    bars.push({
      key: day,
      label: i === 0 ? 'Today' : i % labelEvery === 0 ? shortDay(day) : undefined,
      value: due,
      title: `${day} · ${due} due`
    })
  }
  return (
    <Section
      title="Due forecast"
      subtitle={
        <Group label="">
          {[7, 14, 30].map((n) => (
            <Pill key={n} active={days === n} onClick={() => setDays(n)} label={`${n}d`} />
          ))}
        </Group>
      }
      className="mb-8"
    >
      {bars.every((b) => b.value === 0) ? (
        <p className="text-sm text-gray-500">Nothing due in this window.</p>
      ) : (
        <BarChart bars={bars} />
      )}
    </Section>
  )
}

// One proportional accent bar per grade (TopArtists-style single-hue rows).
function GradeBars({
  gradeCounts,
  total
}: {
  gradeCounts: Record<SrsGrade, number>
  total: number
}) {
  const max = Math.max(...GRADES.map((g) => gradeCounts[g.grade]), 1)
  return (
    <div className="space-y-2">
      {GRADES.map(({ grade, label }) => {
        const n = gradeCounts[grade]
        const pct = total > 0 ? Math.round((n / total) * 100) : 0
        return (
          <div key={grade} className="flex items-center gap-3 text-sm">
            <span className="w-12 shrink-0 text-gray-400">{label}</span>
            <div className="h-4 flex-1 overflow-hidden rounded bg-base-800">
              <div
                className="h-full rounded bg-accent/70"
                style={{ width: `${(n / max) * 100}%` }}
                title={`${n} (${pct}%)`}
              />
            </div>
            <span className="w-20 shrink-0 text-right text-xs tabular-nums text-gray-500">
              {n} · {pct}%
            </span>
          </div>
        )
      })}
    </div>
  )
}
