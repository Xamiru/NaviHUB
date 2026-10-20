import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { localDayString } from '../lib/archiveDisplay'
import { useSettings } from '../lib/hooks'
import { useJapaneseTutorModel } from '../lib/useJapaneseTutorModel'
import { KANA_KNOWN_SETTING, loadJpSessionBudget, saveJpSessionBudget } from '../lib/japanesePrefs'
import { startTutorSession, tutorBaseline, useTutorSessionState } from '../lib/japaneseTutorSession'
import { suggestedJpTools } from '../lib/japaneseTools'
import { currentCourseWindow } from '@shared/japanese/courseWindow'
import type { TutorBudget } from '@shared/japanese/tutor'
import type { JpRoadmapCourse, JpStatsDetail } from '@shared/types'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import ActionMenu from '../components/ActionMenu'
import BarChart, { type Bar } from '../components/BarChart'
import EmptyState from '../components/EmptyState'
import PageStatus from '../components/PageStatus'
import CoreDeckDialog from '../components/japanese/CoreDeckDialog'
import SetupChecklist from '../components/japanese/SetupChecklist'
import { WordFurigana } from '../components/japanese/Furigana'
import { BudgetPicker, PlanBlocks } from '../components/japanese/SessionPlanPicker'
import ToolCard from '../components/japanese/ToolCard'

// Today: one obvious next step. Pick a session length, see what it contains,
// press Start. Everything else (the path, the week, the tools) sits below it.
export default function JapaneseHomePage() {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [budget, setBudget] = useState<TutorBudget>(loadJpSessionBudget)
  const [coreDeck, setCoreDeck] = useState(false)
  const model = useJapaneseTutorModel(budget)
  const session = useTutorSessionState()
  const { data: settings } = useSettings()
  const nextLessonId = model.ready ? model.roadmap.nextLesson?.id ?? null : null
  const lessonQuery = useQuery({
    queryKey: qk.japanese.lesson(nextLessonId ?? 0),
    queryFn: () => api.japanese.getLesson(nextLessonId!),
    enabled: nextLessonId != null
  })

  if (model.failed) {
    return (
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <PageHeader title="Japanese" />
        <EmptyState
          title="Japanese study data could not be loaded"
          body="The local database did not return what today’s plan needs. Your study data has not been changed."
          action={<button type="button" className="btn-primary" onClick={model.retry}>Try again</button>}
        />
      </div>
    )
  }
  if (!model.ready) return <PageStatus>Preparing today’s Japanese…</PageStatus>

  const { plan, roadmap, stats, detail, history, kanaNeeded } = model
  const hasCourses = roadmap.steps.length + roadmap.unscheduled.length > 0
  const choseKana = settings?.[KANA_KNOWN_SETTING] != null
  const welcome = !choseKana && detail.totalReviews === 0 && (history.kana?.totalSessions ?? 0) === 0
  const activeSession = session && !session.endedAt ? session : null

  function pickBudget(next: TutorBudget): void {
    setBudget(next)
    saveJpSessionBudget(next)
  }

  function start(): void {
    if (!activeSession) startTutorSession(plan, tutorBaseline(stats, detail), budget)
    navigate('/japanese/tutor/session')
  }

  async function chooseKana(known: boolean): Promise<void> {
    await api.settings.set(KANA_KNOWN_SETTING, known ? '1' : '0')
    await qc.invalidateQueries({ queryKey: qk.settings.values })
    if (!known) navigate('/japanese/kana')
  }

  const lesson = lessonQuery.data
  const words = (lesson?.cards ?? []).filter((card) => card.front.length <= 10).slice(0, 3)

  return (
    <div className="mx-auto max-w-[1200px] p-4 sm:p-6">
      <PageHeader
        title="Japanese"
        subtitle={`${plan.phase.title} · ${plan.phase.stepRange}`}
        actions={
          <ActionMenu
            items={[
              { label: 'How your plan works', onSelect: () => navigate('/japanese/tutor') },
              { label: 'Guide', onSelect: () => navigate('/japanese/guide') },
              ...(hasCourses ? [{ label: 'New course', onSelect: () => navigate('/japanese/courses/new') }] : [])
            ]}
          />
        }
      />

      {welcome && (
        <section className="card-glow mb-6 p-6" aria-labelledby="jp-welcome">
          <h2 id="jp-welcome" className="text-xl font-semibold text-white">New to Japanese?</h2>
          <p className="mt-2 max-w-2xl text-gray-300">
            If you cannot read hiragana and katakana yet, start there.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={() => void chooseKana(false)}>
              Start with hiragana
            </button>
            <button type="button" className="btn-ghost" onClick={() => void chooseKana(true)}>
              I can read kana
            </button>
          </div>
        </section>
      )}

      <section
        className="card mb-8 grid overflow-hidden lg:grid-cols-[minmax(0,1fr)_400px]"
        aria-label="Today"
      >
        <div className="p-6 sm:p-8">
          {kanaNeeded ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Up next · Kana</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Hiragana, a row at a time</h2>
              <ol className="mt-6 flex flex-wrap gap-6" aria-label="The first hiragana row">
                {FIRST_ROW.map(([kana, romaji]) => (
                  <li key={kana} className="text-center">
                    <span lang="ja" className="block text-6xl text-white">{kana}</span>
                    <span className="mt-1 block text-sm text-gray-400">{romaji}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-lg text-sm text-gray-400">
                46 basic characters. Learn two rows, then add one whenever they feel easy.
              </p>
              {welcome ? null : (
                <button type="button" className="btn-ghost mt-4" onClick={() => void chooseKana(true)}>
                  I already read kana
                </button>
              )}
            </>
          ) : roadmap.nextLesson ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Up next · {roadmap.nextLesson.courseTitle}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{roadmap.nextLesson.title}</h2>
              {words.length > 0 && (
                <ul className="mt-6 grid gap-5 sm:grid-cols-3" aria-label="Words in this lesson">
                  {words.map((card) => (
                    <li key={card.id}>
                      <WordFurigana word={card.front} reading={card.reading} className="text-4xl text-white" />
                      <p className="mt-2 line-clamp-2 text-sm text-gray-400">{card.back}</p>
                    </li>
                  ))}
                </ul>
              )}
              <Link to={`/japanese/lessons/${roadmap.nextLesson.id}`} className="btn-ghost mt-6">
                Open the lesson
              </Link>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Up next</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {stats.dueCount > 0 ? `${stats.dueCount} cards to review` : 'Your course path is learned'}
              </h2>
              <p className="mt-2 text-gray-400">Keep it fresh with reviews and real reading.</p>
            </>
          )}
        </div>

        <div className="border-t border-base-700 bg-base-800/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <h2 className="text-lg font-semibold text-white">Today’s session</h2>
          {activeSession ? (
            <>
              <p className="mt-2 text-sm text-gray-400">
                A {activeSession.budgetMinutes ?? 60}-minute session is in progress.
              </p>
              <button type="button" className="btn-primary mt-6 w-full py-2.5 text-base" onClick={start}>
                Resume session
              </button>
            </>
          ) : (
            <>
              <p className="mt-1 text-sm text-gray-400">How much time do you have?</p>
              <div className="mt-4">
                <BudgetPicker value={budget} onChange={pickBudget} />
              </div>
              <div className="mt-5">
                <PlanBlocks tasks={plan.tasks} />
              </div>
              <button type="button" className="btn-primary mt-6 w-full py-2.5 text-base" onClick={start}>
                {session?.endedAt ? `Start another ${budget}-minute session` : `Start ${budget}-minute session`}
              </button>
            </>
          )}
        </div>
      </section>

      <SetupChecklist />

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <StreakCard detail={detail} />
        <ReviewLoad detail={detail} due={stats.dueCount} waiting={stats.newAvailableCount + stats.newDirectionCount} />
      </div>

      {roadmap.steps.length > 0 ? (
        <CoursePath
          steps={roadmap.steps}
          frontierCourseId={roadmap.frontierCourseId}
          kanaNeeded={kanaNeeded}
        />
      ) : (
        <EmptyState
          className="card mb-8 p-10 text-center"
          title="No courses yet"
          body="A course groups grammar lessons and vocabulary decks."
          action={<Link to="/japanese/courses/new" className="btn-primary">Create a course</Link>}
        />
      )}

      <Section
        title="Suggested for you"
        subtitle="Good next tools for where you are. Every tool stays open."
        actions={<Link to="/japanese/tools" className="btn-ghost">All tools</Link>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {suggestedJpTools(plan.phase.id, kanaNeeded).map((tool) => (
            <ToolCard key={tool.key} tool={tool} onCore={() => setCoreDeck(true)} />
          ))}
        </div>
      </Section>

      {coreDeck && <CoreDeckDialog onClose={() => setCoreDeck(false)} />}
    </div>
  )
}

const FIRST_ROW: [string, string][] = [
  ['あ', 'a'],
  ['い', 'i'],
  ['う', 'u'],
  ['え', 'e'],
  ['お', 'o']
]

function StreakCard({ detail }: { detail: JpStatsDetail }) {
  const byDay = new Map(detail.reviewsPerDay.map((d) => [d.day, d.count]))
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - 6 + i)
    const day = localDayString(date)
    return {
      day,
      label: i === 6 ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'short' }),
      count: byDay.get(day) ?? 0
    }
  })
  const { current, longest } = detail.streak
  return (
    <section className="card p-5" aria-labelledby="jp-streak">
      <h2 id="jp-streak" className="text-sm font-semibold text-white">Your week</h2>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-semibold tabular-nums text-white">{current}</span>
        <span className="text-sm text-gray-400">
          day{current === 1 ? '' : 's'} in a row{longest > current ? ` · best ${longest}` : ''}
        </span>
      </div>
      <ol className="mt-4 grid grid-cols-7 gap-2" aria-label="Reviews over the last seven days">
        {days.map((d) => (
          <li key={d.day} className="text-center">
            <span
              className={`mx-auto block h-8 w-8 rounded-md ${d.count > 0 ? 'bg-accent' : 'border border-base-600'}`}
              aria-hidden="true"
            />
            <span className="mt-1 block text-xs text-gray-400">{d.label}</span>
            <span className="sr-only">{d.count} reviews</span>
          </li>
        ))}
      </ol>
      {detail.totalReviews === 0 && (
        <p className="mt-4 text-sm text-gray-400">Your first review starts the streak.</p>
      )}
    </section>
  )
}

function ReviewLoad({ detail, due, waiting }: { detail: JpStatsDetail; due: number; waiting: number }) {
  const byDay = new Map(detail.dueForecast.map((d) => [d.day, d.due]))
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const bars: Bar[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const day = localDayString(date)
    const value = byDay.get(day) ?? 0
    return {
      key: day,
      label: i === 0 ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'short' }),
      value,
      title: `${day} · ${value} due`
    }
  })
  return (
    <section className="card p-5" aria-labelledby="jp-load">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="jp-load" className="text-sm font-semibold text-white">Reviews coming up</h2>
        <Link to="/japanese/review" className="text-sm text-signal-link hover:underline">Review now</Link>
      </div>
      <p className="mt-3 text-sm text-gray-400">
        <span className="text-2xl font-semibold tabular-nums text-white">{due}</span> due now
        {waiting > 0 && <> · {waiting} new waiting</>}
      </p>
      <div className="mt-3">
        {bars.every((b) => b.value === 0) ? (
          <p className="text-sm text-gray-400">Nothing scheduled this week yet.</p>
        ) : (
          <BarChart bars={bars} height={64} label="Reviews due over the next 7 days" />
        )}
      </div>
    </section>
  )
}

function CoursePath({
  steps,
  frontierCourseId,
  kanaNeeded
}: {
  steps: JpRoadmapCourse[]
  frontierCourseId: number | null
  kanaNeeded: boolean
}) {
  const visible = currentCourseWindow(steps, frontierCourseId)
  const nodes = kanaNeeded ? visible.slice(0, Math.max(1, visible.length - 1)) : visible
  const count = nodes.length + (kanaNeeded ? 1 : 0)
  return (
    <Section title="Your path" subtitle="Every course stays open; this shows where you are.">
      <div className="card p-5">
        <ol className="relative flex flex-col gap-5 sm:flex-row sm:gap-3">
          <span
            className="absolute top-5 hidden h-px bg-base-600 sm:block"
            style={{ left: `${50 / count}%`, right: `${50 / count}%` }}
            aria-hidden="true"
          />
          {kanaNeeded && (
            <PathNode to="/japanese/kana" label="Kana" detail="Hiragana and katakana · current" marker="0" current />
          )}
          {nodes.map((course) => {
            const current = !kanaNeeded && course.id === frontierCourseId
            const complete = course.lessonCount > 0 && course.learnedLessonCount >= course.lessonCount
            return (
              <PathNode
                key={course.id}
                to={`/japanese/courses/${course.id}`}
                label={course.title}
                detail={`${course.learnedLessonCount} / ${course.lessonCount} lessons${current ? ' · current' : complete ? ' · learned' : ''}`}
                marker={complete ? '✓' : String(course.difficulty ?? '')}
                current={current}
                complete={complete}
              />
            )
          })}
        </ol>
        {steps.length > nodes.length && (
          <Link to="/japanese/roadmap" className="btn-ghost mt-4">
            See all {steps.length} courses
          </Link>
        )}
      </div>
    </Section>
  )
}

function PathNode({
  to,
  label,
  detail,
  marker,
  current = false,
  complete = false
}: {
  to: string
  label: string
  detail: string
  marker: string
  current?: boolean
  complete?: boolean
}) {
  return (
    <li className="relative min-w-0 sm:flex-1">
      <Link
        to={to}
        aria-current={current ? 'step' : undefined}
        className="group flex items-center gap-3 sm:flex-col sm:text-center"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            current
              ? 'bg-accent text-[rgb(var(--ink-inverse))] ring-4 ring-accent/20'
              : complete
                ? 'border border-accent/60 bg-base-800 text-accent'
                : 'border border-base-600 bg-base-800 text-gray-400 group-hover:border-accent'
          }`}
          aria-hidden="true"
        >
          {marker}
        </span>
        <span className="min-w-0">
          <span className={`block line-clamp-2 text-sm ${current ? 'text-white' : 'text-gray-300'} group-hover:text-accent`}>
            {label}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500">{detail}</span>
        </span>
      </Link>
    </li>
  )
}
