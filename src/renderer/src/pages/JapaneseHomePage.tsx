import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { statusesFrom, useSettings } from '../lib/hooks'
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import { jpDailyPacing } from '@shared/japanese/dailyPlan'
import { loadJpDailyTarget } from '../lib/japanesePrefs'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import EmptyState from '../components/EmptyState'
import HubCard from '../components/HubCard'
import CoreDeckDialog from '../components/japanese/CoreDeckDialog'
import SetupChecklist from '../components/japanese/SetupChecklist'

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
  const [coreDeck, setCoreDeck] = useState(false)
  const [toolGroup, setToolGroup] = useState<ToolGroup>('practice')
  const [dailyTarget] = useState(loadJpDailyTarget)
  const { data: stats } = useQuery({ queryKey: qk.japanese.stats, queryFn: () => api.japanese.stats() })
  const { data: roadmap } = useQuery({ queryKey: qk.japanese.roadmap, queryFn: () => api.japanese.roadmap() })
  const { data: settings } = useSettings()
  const { data: manga = [] } = useQuery({
    queryKey: qk.media.home('manga'),
    queryFn: () => api.media.list({ mediaType: 'manga' })
  })

  const due = stats?.dueCount ?? 0
  const unseen = stats?.newAvailableCount ?? 0
  const daily = jpDailyPacing(dailyTarget, stats?.introducedToday ?? 0, unseen)
  const reviewable = due + daily.newThisSession
  const frontier = roadmap?.steps.find((c) => c.id === roadmap.frontierCourseId) ?? null
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
          <Link to="/japanese/guide" className="btn-ghost">Guide</Link>
          <Link to="/japanese/stats" className="btn-ghost">Stats</Link>
          {hasCourses && <Link to="/japanese/courses/new" className="btn-ghost">New course</Link>}
          {roadmap?.nextLesson && (
            <Link to={`/japanese/lessons/${roadmap.nextLesson.id}`} className="btn-ghost">
              Continue lesson
            </Link>
          )}
          <Link to="/japanese/tutor" className="btn-primary">Open tutor plan</Link>
        </>}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <StatTile label="Due now" value={due} accent={due > 0} />
        <StatTile label="Unseen backlog" value={unseen} accent={unseen > 0} />
        <StatTile label="New today" value={`${daily.introducedToday} / ${daily.dailyTarget}`} />
        <StatTile label="Reviews today" value={stats?.reviewsToday ?? 0} />
      </div>

      {roadmap && roadmap.steps.length > 0 && (
        <Section title="Course path" subtitle="Progress moves from left to right; every node remains open.">
          <div className="card p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {roadmap.steps.slice(0, 5).map((course) => {
                const current = course.id === roadmap.frontierCourseId
                const complete = course.lessonCount > 0 && course.learnedLessonCount >= course.lessonCount
                const pct = course.lessonCount
                  ? Math.round((course.learnedLessonCount / course.lessonCount) * 100)
                  : 0
                return (
                  <Link
                    key={course.id}
                    to={`/japanese/courses/${course.id}`}
                    className={`rounded-lg border p-4 transition-colors hover:border-accent ${
                      current
                        ? 'border-accent/60 bg-accent/10'
                        : complete
                          ? 'border-accent/25 bg-base-700/50'
                          : 'border-base-700'
                    }`}
                  >
                    <p className={`text-[10px] font-semibold uppercase tracking-wider ${current ? 'text-accent' : 'text-gray-500'}`}>
                      {current ? 'Current node' : complete ? 'Learned' : `Step ${course.difficulty}`}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm font-medium">{course.title}</p>
                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-base-700">
                      <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {course.learnedLessonCount} / {course.lessonCount} lessons
                    </p>
                  </Link>
                )
              })}
            </div>
            {roadmap.steps.length > 5 && (
              <Link to="/japanese/roadmap" className="btn-ghost mt-4">
                Open full roadmap
              </Link>
            )}
          </div>
        </Section>
      )}

      {hasCourses ? (
        <Section title="Today" subtitle="A balanced hour: recall, hear, then read.">
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
        <EmptyState className="card mb-8 p-12 text-center" title="No courses yet"
          body="A course groups grammar lessons and vocabulary decks. Create one."
          action={<Link to="/japanese/courses/new" className="btn-primary">Create a course</Link>} />
      )}

      {frontier && (
        <Section title="Continue course">
          <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <Link to={`/japanese/courses/${frontier.id}`} className="font-medium hover:text-accent">{frontier.title}</Link>
              <p className="mt-1 text-xs text-gray-500">Step {frontier.difficulty} · {frontier.learnedLessonCount} / {frontier.lessonCount} lessons learned</p>
            </div>
            <Link to={`/japanese/courses/${frontier.id}`} className="btn-ghost">Open course</Link>
          </div>
        </Section>
      )}

      <SetupChecklist />

      <Section title="Toolbox" subtitle="Choose a category; the full tool list stays one click away.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(TOOL_GROUPS) as ToolGroup[]).map((key) => (
            <HubCard key={key} onClick={() => setToolGroup(key)} title={TOOL_GROUPS[key].title}
              body={TOOL_GROUPS[key].body} meta={toolGroup === key ? 'Open' : undefined} />
          ))}
        </div>
        <div className="card mt-3 p-4">
          <p className="mb-3 text-sm font-semibold">{selected.title}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {selected.tools.map((tool) => tool.action === 'core' ? (
              <button key={tool.title} className="rounded-lg border border-base-700 p-3 text-left hover:border-accent"
                onClick={() => setCoreDeck(true)}><ToolBody tool={tool} /></button>
            ) : (
              <Link key={tool.title} to={tool.to!} className="rounded-lg border border-base-700 p-3 hover:border-accent">
                <ToolBody tool={tool} />
              </Link>
            ))}
          </div>
        </div>
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
  return <><p className="text-sm font-medium">{tool.title}</p><p className="mt-1 text-xs text-gray-500">{tool.body}</p></>
}
