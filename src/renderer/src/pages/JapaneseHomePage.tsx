import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { statusesFrom, useSettings } from '../lib/hooks'
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import { jpDailyPacing } from '@shared/japanese/dailyPlan'
import { loadJpDailyTarget } from '../lib/japanesePrefs'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import { StatInline } from '../components/StatTile'
import ActionMenu from '../components/ActionMenu'
import BarChart, { type Bar } from '../components/BarChart'
import { localDayString } from '../lib/archiveDisplay'
import EmptyState from '../components/EmptyState'
import PageStatus from '../components/PageStatus'
import Tabs, { TabPanel } from '../components/Tabs'
import CoreDeckDialog from '../components/japanese/CoreDeckDialog'
import SetupChecklist from '../components/japanese/SetupChecklist'
import { currentCourseWindow } from '@shared/japanese/courseWindow'

type ToolGroup = 'practice' | 'games' | 'read' | 'reference'
interface ToolLink { title: string; body: string; to?: string; action?: 'core' }

const MANGA_CFG = MEDIA_CONFIGS.find((c) => c.key === 'manga')!
const TOOL_GROUPS: Record<ToolGroup, { title: string; body: string; tools: ToolLink[] }> = {
  practice: {
    title: 'Practice', body: 'Recall, listening, typing and production drills.',
    tools: [
      { to: '/japanese/phonology', title: 'Sound foundation', body: 'Mora timing, vowel length and connected speech.' },
      { to: '/japanese/quiz', title: 'Practice quiz', body: 'Multiple choice, no scheduling.' },
      { to: '/japanese/kana', title: 'Typing drills', body: 'Kana, readings, forms, numbers and keigo.' },
      { to: '/japanese/write', title: 'Writing drill', body: 'Draw kanji stroke by stroke.' },
      { to: '/japanese/test', title: 'JLPT test', body: 'A short level checkpoint from installed packs.' },
      { to: '/japanese/pitch', title: 'Pitch accent', body: 'Learn the patterns, hear them and say them.' },
      { to: '/japanese/confusables', title: 'Confusables', body: 'Look-alikes, verb pairs and homophones.' },
      { to: '/japanese/loanwords', title: 'Loanwords', body: 'Katakana words you may already know.' },
      { to: '/japanese/listen', title: 'Listening', body: 'Comprehension, shadowing and dictation.' },
      { to: '/japanese/immersion', title: 'Long-form listening', body: 'A five-pass ladder over local anime video.' },
      { to: '/japanese/output', title: 'Controlled output', body: 'Produce, compare, repair and self-rate.' },
      { to: '/japanese/roleplay', title: 'Branching role-play', body: 'Carry an authored offline conversation through changing turns.' },
      { to: '/japanese/grammar/quiz', title: 'Grammar drill', body: 'Fill blanks across N5-N1 points.' },
      { to: '/japanese/kanji/quiz', title: 'Build-a-kanji', body: 'Assemble kanji from their parts.' }
    ]
  },
  games: {
    title: 'Games', body: 'Fast, repeatable practice with clear constraints.',
    tools: [
      { to: '/japanese/sentences', title: 'Sentence games', body: 'Particles, scramble and readings in context.' },
      { to: '/japanese/arcade', title: 'Arcade', body: 'Sixty-second kana, reading and conjugation races.' },
      { to: '/japanese/shiritori', title: 'Shiritori', body: 'Word chain against the offline dictionary.' }
    ]
  },
  read: {
    title: 'Read & mine', body: 'Grow vocabulary from controlled and real text.',
    tools: [
      { to: '/japanese/roadmap', title: 'Roadmap', body: 'The course path, step by step.' },
      { action: 'core', title: 'Core deck', body: "Stage frequent words you don't know." },
      { to: '/japanese/feed', title: 'Sentence feed', body: 'Read sentences one new word at a time.' },
      { to: '/japanese/mine', title: 'Mine words', body: 'Capture useful words into the SRS.' },
      { to: '/japanese/reading', title: 'Graded reading', body: 'Connected N5-N1 passages with questions.' },
      { to: '/japanese/analyze', title: 'Analyze text', body: 'Measure a pasted text before reading.' },
      { to: '/japanese/coverage', title: 'Comprehension', body: 'Known-word scores for your series.' }
    ]
  },
  reference: {
    title: 'Reference', body: 'Look things up without leaving the offline section.',
    tools: [
      { to: '/japanese/dictionary', title: 'Dictionary', body: 'Offline lookup, examples and stroke order.' },
      { to: '/japanese/grammar', title: 'Grammar', body: 'Search every installed N5-N1 grammar point.' },
      { to: '/japanese/kanji', title: 'Kanji by parts', body: 'Find a kanji from the pieces you can see.' }
    ]
  }
}

export default function JapaneseHomePage() {
  const navigate = useNavigate()
  const [coreDeck, setCoreDeck] = useState(false)
  const [toolGroup, setToolGroup] = useState<ToolGroup>('practice')
  const [dailyTarget] = useState(loadJpDailyTarget)
  const statsQuery = useQuery({ queryKey: qk.japanese.stats, queryFn: () => api.japanese.stats() })
  const roadmapQuery = useQuery({ queryKey: qk.japanese.roadmap, queryFn: () => api.japanese.roadmap() })
  const settingsQuery = useSettings()
  const mangaQuery = useQuery({
    queryKey: qk.media.home('manga'),
    queryFn: () => api.media.list({ mediaType: 'manga' })
  })

  const loading = statsQuery.isLoading || roadmapQuery.isLoading || settingsQuery.isLoading || mangaQuery.isLoading
  const failed = statsQuery.isError || roadmapQuery.isError || settingsQuery.isError || mangaQuery.isError
  if (loading) return <PageStatus>Preparing today’s Japanese plan…</PageStatus>
  if (failed) {
    return (
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <PageHeader title="Knowledge map" subtitle="Your offline Japanese study workspace." />
        <EmptyState
          title="Japanese study data could not be loaded"
          body="The local database did not return the information needed for today’s plan. Try loading it again; your study data has not been changed."
          action={
            <button
              type="button"
              className="btn-primary"
              onClick={() => void Promise.all([
                statsQuery.refetch(),
                roadmapQuery.refetch(),
                settingsQuery.refetch(),
                mangaQuery.refetch()
              ])}
            >
              Try again
            </button>
          }
        />
      </div>
    )
  }

  const stats = statsQuery.data
  const roadmap = roadmapQuery.data
  const settings = settingsQuery.data
  const manga = mangaQuery.data ?? []

  const due = stats?.dueCount ?? 0
  const unseen = stats?.newAvailableCount ?? 0
  const daily = jpDailyPacing(dailyTarget, stats?.introducedToday ?? 0, unseen)
  const reviewable = due + daily.newThisSession
  const frontier = roadmap?.steps.find((c) => c.id === roadmap.frontierCourseId) ?? null
  const visibleCourses = currentCourseWindow(roadmap?.steps ?? [], roadmap?.frontierCourseId ?? null)
  const hasCourses = (roadmap?.steps.length ?? 0) + (roadmap?.unscheduled.length ?? 0) > 0
  const inProgress = statusesFrom(settings, MANGA_CFG)[0]
  const reading = manga.find((m) => m.status === inProgress)
  const selected = TOOL_GROUPS[toolGroup]

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Knowledge map"
        subtitle="Follow the tutor’s balanced hour, then use the map and offline toolbox when you need a specific repair."
        actions={<>
          <Link to="/japanese/stats" className="btn-ghost">Stats</Link>
          <ActionMenu
            items={[
              { label: 'Guide', onSelect: () => navigate('/japanese/guide') },
              ...(hasCourses ? [{ label: 'New course', onSelect: () => navigate('/japanese/courses/new') }] : [])
            ]}
          />
          <Link to="/japanese/tutor" className="btn-primary">Open tutor plan</Link>
        </>}
      />

      <div className="mb-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      {hasCourses ? (
        <Section title="Today" subtitle="A balanced hour: recall, hear, then read." className="min-w-0">
          <div className="card p-5">
            <div className="grid gap-3 md:grid-cols-3">
              <DailyAction eyebrow="Recall" to="/japanese/review"
                title={reviewable > 0 ? `Review ${reviewable} cards` : 'Review queue clear'}
                body={`${due} due, ${daily.newThisSession} new within today's budget`} hot={reviewable > 0} />
              <DailyAction eyebrow="Listen" to="/japanese/listen" title="Guided listening"
                body="Meaning first, transcript second, then shadow once" />
              <DailyAction eyebrow="Immerse" to={reading ? `/manga/${reading.id}` : '/japanese/feed'}
                title={reading ? `Continue ${reading.title}` : 'Sentence feed'}
                body={reading ? 'Read a manageable scene or chapter' : 'Use controlled i+1 sentences'} />
            </div>
            <div className="mt-4 border-t border-base-700 pt-4 text-sm">
              {daily.holdNextLesson && roadmap?.nextLesson ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-signal-caution">Lesson pace held: clear the {unseen}-card unseen backlog before adding more.</p>
                  <Link to={`/japanese/lessons/${roadmap.nextLesson.id}`} className="btn-ghost">Open next lesson anyway</Link>
                </div>
              ) : roadmap?.nextLesson ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-gray-400">Backlog clear. The next lesson is ready when the daily loop is done.</p>
                  <Link to={`/japanese/lessons/${roadmap.nextLesson.id}`} className="btn-ghost">Next lesson: {roadmap.nextLesson.title}</Link>
                </div>
              ) : <p className="text-gray-400">The current course path is learned. Maintain it through review and reading.</p>}
            </div>
          </div>
        </Section>
      ) : (
        <EmptyState className="card p-12 text-center" title="No courses yet"
          body="A course groups grammar lessons and vocabulary decks. Create one."
          action={<Link to="/japanese/courses/new" className="btn-primary">Create a course</Link>} />
      )}
      <ReviewLoad
        due={due}
        unseen={unseen}
        newToday={`${daily.introducedToday} / ${daily.dailyTarget}`}
        reviewsToday={stats?.reviewsToday ?? 0}
      />
      </div>

      {roadmap && roadmap.steps.length > 0 && (
        <Section
          title="Course path"
          subtitle={frontier
            ? `Centered on ${frontier.title}; every course remains open.`
            : 'Progress moves from left to right; every course remains open.'}
        >
          <div className="card p-5">
            <ol className="relative flex flex-col gap-5 sm:flex-row sm:gap-3">
              {/* The path line runs between the first and last node centres. */}
              <span
                className="absolute top-5 hidden h-px bg-base-600 sm:block"
                style={{ left: `${50 / visibleCourses.length}%`, right: `${50 / visibleCourses.length}%` }}
                aria-hidden="true"
              />
              {visibleCourses.map((course) => {
                const current = course.id === roadmap.frontierCourseId
                const complete = course.lessonCount > 0 && course.learnedLessonCount >= course.lessonCount
                return (
                  <li key={course.id} className="relative min-w-0 sm:flex-1">
                    <Link
                      to={`/japanese/courses/${course.id}`}
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
                        {complete ? '✓' : course.difficulty}
                      </span>
                      <span className="min-w-0">
                        <span className={`block line-clamp-2 text-sm ${current ? 'text-white' : 'text-gray-300'} group-hover:text-accent`}>
                          {course.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500">
                          {course.learnedLessonCount} / {course.lessonCount} lessons
                          {current ? ' · current' : complete ? ' · learned' : ''}
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
            {roadmap.steps.length > visibleCourses.length && (
              <Link to="/japanese/roadmap" className="btn-ghost mt-4">
                Open all {roadmap.steps.length} courses
              </Link>
            )}
          </div>
        </Section>
      )}

      <SetupChecklist />

      <Section title="Toolbox" subtitle="Choose a category; the full tool list stays one click away.">
        <Tabs
          id="japanese-toolbox"
          label="Toolbox category"
          tabs={(Object.keys(TOOL_GROUPS) as ToolGroup[]).map((key) => ({
            key,
            label: TOOL_GROUPS[key].title,
            count: TOOL_GROUPS[key].tools.length
          }))}
          value={toolGroup}
          onChange={setToolGroup}
        />
        <TabPanel tabsId="japanese-toolbox" value={toolGroup} className="card mt-4 p-4">
          <div className="mb-4">
            <p className="text-sm font-semibold">{selected.title}</p>
            <p className="mt-1 text-xs text-gray-500">{selected.body}</p>
          </div>
          <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {selected.tools.map((tool) => tool.action === 'core' ? (
              <button key={tool.title} className="group block border-b border-base-700/60 py-2.5 text-left"
                onClick={() => setCoreDeck(true)}><ToolBody tool={tool} /></button>
            ) : (
              <Link key={tool.title} to={tool.to!} className="group block border-b border-base-700/60 py-2.5">
                <ToolBody tool={tool} />
              </Link>
            ))}
          </div>
        </TabPanel>
      </Section>

      {coreDeck && <CoreDeckDialog onClose={() => setCoreDeck(false)} />}
    </div>
  )
}

function DailyAction({ eyebrow, to, title, body, hot = false }: {
  eyebrow: string; to: string; title: string; body: string; hot?: boolean
}) {
  return (
    <Link to={to} className={`rounded-lg border p-4 hover:border-accent ${hot ? 'border-accent/60 bg-accent/5' : 'border-base-700'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${hot ? 'text-accent' : 'text-gray-500'}`}>{eyebrow}</p>
      <p className="mt-1 font-medium">{title}</p>
      <p className="mt-1 text-xs text-gray-500">{body}</p>
    </Link>
  )
}

function ToolBody({ tool }: { tool: ToolLink }) {
  return <><p className="text-sm font-medium group-hover:text-accent">{tool.title}</p><p className="mt-0.5 text-xs text-gray-500">{tool.body}</p></>
}

// The week ahead instead of a row of zero tiles: the same due forecast the
// stats page charts (shared cache), with today's four counts beneath it.
function ReviewLoad({
  due,
  unseen,
  newToday,
  reviewsToday
}: {
  due: number
  unseen: number
  newToday: string
  reviewsToday: number
}) {
  const detail = useQuery({ queryKey: qk.japanese.statsDetail, queryFn: () => api.japanese.statsDetail() })
  const byDay = new Map((detail.data?.dueForecast ?? []).map((d) => [d.day, d.due]))
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
    <Section title="Review load" subtitle="Next 7 days" className="min-w-0">
      <div className="card p-5">
        {detail.isError ? (
          <p className="text-sm text-gray-400">
            Could not load the forecast.{' '}
            <button className="text-signal-link hover:underline" onClick={() => void detail.refetch()}>
              Retry forecast
            </button>
          </p>
        ) : !detail.data ? (
          <p className="text-sm text-gray-500">Loading the forecast…</p>
        ) : bars.every((b) => b.value === 0) ? (
          <p className="text-sm text-gray-400">No reviews scheduled this week.</p>
        ) : (
          <BarChart bars={bars} height={72} label="Reviews due over the next 7 days" />
        )}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-base-700 pt-4">
          <StatInline label="Due now" value={due} accent={due > 0} />
          <StatInline label="Unseen backlog" value={unseen} accent={unseen > 0} />
          <StatInline label="New today" value={newToday} />
          <StatInline label="Reviews today" value={reviewsToday} />
        </div>
      </div>
    </Section>
  )
}
