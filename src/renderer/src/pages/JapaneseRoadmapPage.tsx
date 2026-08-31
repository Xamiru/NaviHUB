import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import RoadmapDailyLoop from '../components/japanese/RoadmapDailyLoop'
import RoadmapMilestones from '../components/japanese/RoadmapMilestones'
import JlptLadder from '../components/japanese/JlptLadder'
import type { JpRoadmapCourse } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'

// The study path, start to finish. Seeded courses carry a step number and lay
// out in order; everything the user or the app generated (mining inbox, prep
// decks, core decks) lists separately below. Nothing is ever locked — later
// steps just look further away.
export default function JapaneseRoadmapPage() {
  const { data: roadmap, isLoading } = useQuery({
    queryKey: qk.japanese.roadmap,
    queryFn: () => api.japanese.roadmap()
  })
  const { data: stats } = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats()
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!roadmap) return <PageStatus>Roadmap unavailable.</PageStatus>

  const due = stats?.dueCount ?? 0
  const fresh = stats?.newAvailableCount ?? 0
  const frontierIndex = roadmap.steps.findIndex((c) => c.id === roadmap.frontierCourseId)

  return (
    <EditorialDetailFrame width="wide">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Roadmap"
        subtitle="Every course in study order. Work down the path — or jump anywhere you like."
      />

      <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <Section title="Knowledge path" subtitle="Your current frontier stays visible without locking later material">
            <div className="relative space-y-3 before:absolute before:bottom-5 before:left-[27px] before:top-5 before:w-px before:bg-accent/20">
              <KanaStepRow />
              {roadmap.steps.map((course, i) => (
                <StepRow
                  key={course.id}
                  course={course}
                  state={
                    course.id === roadmap.frontierCourseId
                      ? 'current'
                      : frontierIndex >= 0 && i > frontierIndex
                        ? 'upcoming'
                        : course.lessonCount > 0 && course.learnedLessonCount >= course.lessonCount
                          ? 'cleared'
                          : 'started'
                  }
                />
              ))}
            </div>
          </Section>

          <Section
            title="Unscheduled"
            subtitle={<Link to="/japanese/courses/new" className="hover:text-accent">+ New course</Link>}
          >
            {roadmap.unscheduled.length === 0 ? (
              <p className="text-sm text-gray-500">
                Mined words, series prep decks and core decks will show up here.
              </p>
            ) : (
              <div className="space-y-2">
                {roadmap.unscheduled.map((course) => (
                  <StepRow key={course.id} course={course} state="started" />
                ))}
              </div>
            )}
          </Section>
        </div>
        <aside className="min-w-0 space-y-6">
          <Section title="Daily loop">
            <RoadmapDailyLoop due={due} fresh={fresh} nextLesson={roadmap.nextLesson} />
          </Section>
          <Section title="JLPT ladder" subtitle="progress, not a gate">
            <JlptLadder />
          </Section>
          <Section title="Milestones">
            <RoadmapMilestones />
          </Section>
        </aside>
      </div>
    </EditorialDetailFrame>
  )
}

// Step 00: kana. Not a course — the typing drill is the whole curriculum — but
// the path silently assumes it, so it belongs on the path. "Practiced" (never
// "Cleared") because an endless drill has no honest done-state; the signal is
// simply that kana rounds have been logged.
function KanaStepRow() {
  const { data: history } = useQuery({
    queryKey: qk.quiz.history('kana'),
    queryFn: () => api.quiz.history('kana')
  })
  const practiced = (history?.totalSessions ?? 0) > 0
  return (
    <Link to="/japanese/kana" className="card group relative z-[1] block border-l-2 border-l-base-700 p-4">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-gray-600">
          Step 00
        </span>
        {practiced && <span className="chip bg-signal-affirmative/20 text-signal-affirmative">Practiced</span>}
      </div>
      <p className="mt-1 font-medium group-hover:text-accent">Kana</p>
      <p className="mt-1.5 text-xs text-gray-500">
        Hiragana and katakana in the typing drill — grind until reading them is automatic. Not a
        course; everything after assumes it.
      </p>
    </Link>
  )
}

type StepState = 'cleared' | 'current' | 'started' | 'upcoming'

function StepRow({ course, state }: { course: JpRoadmapCourse; state: StepState }) {
  const pct = course.lessonCount
    ? Math.round((course.learnedLessonCount / course.lessonCount) * 100)
    : 0
  return (
    <Link
      to={`/japanese/courses/${course.id}`}
      className={`card group relative z-[1] block border-l-2 p-4 ${
        state === 'current' ? 'border-l-accent' : 'border-l-base-700'
      } ${state === 'upcoming' ? 'opacity-60' : ''}`}
    >
      <div className="flex items-baseline gap-2">
        {course.difficulty != null && (
          <span
            className={`font-mono text-[11px] uppercase tracking-widest ${
              state === 'current' ? 'text-accent' : 'text-gray-600'
            }`}
          >
            Step {String(course.difficulty).padStart(2, '0')}
          </span>
        )}
        {course.level && <span className="chip bg-base-700 text-gray-400">{course.level}</span>}
        {state === 'cleared' && <span className="chip bg-signal-affirmative/20 text-signal-affirmative">Cleared</span>}
        {state === 'current' && <span className="chip bg-accent/20 text-accent">You are here</span>}
        {course.dueCardCount > 0 && (
          <span className="ml-auto text-xs text-signal-caution">{course.dueCardCount} due</span>
        )}
      </div>
      <p className="mt-1 font-medium group-hover:text-accent">{course.title}</p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1.5 text-xs text-gray-500">
        {course.learnedLessonCount} / {course.lessonCount}{' '}
        {course.lessonCount === 1 ? 'lesson' : 'lessons'} learned · {course.seenCardCount} /{' '}
        {course.cardCount} cards seen
      </p>
    </Link>
  )
}
