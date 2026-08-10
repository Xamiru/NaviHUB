import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import HubCard from '../components/HubCard'
import { PROG_COURSES, progLessonKey } from '@shared/programming/courses'
import { CHEAT_SHEETS } from '@shared/programming/cheatsheets'

// Programming section dashboard: course cards with progress, plus the way into
// the cheatsheets and the typed CLI drill. Content is code
// (src/shared/programming/) — only lesson completion is fetched.
export default function ProgrammingHomePage() {
  const { data: progress = [] } = useQuery({
    queryKey: qk.programming.progress,
    queryFn: () => api.programming.progress()
  })
  const { data: cliHistory } = useQuery({
    queryKey: qk.quiz.history('cli'),
    queryFn: () => api.quiz.history('cli')
  })

  const done = new Set(progress.map((p) => p.lessonKey))
  const totalLessons = PROG_COURSES.reduce((n, c) => n + c.lessons.length, 0)
  const doneByCourse = new Map(
    PROG_COURSES.map((c) => [
      c.key,
      c.lessons.filter((l) => done.has(progLessonKey(c.key, l.key))).length
    ])
  )
  const doneLessons = [...doneByCourse.values()].reduce((a, b) => a + b, 0)
  const coursesStarted = [...doneByCourse.values()].filter((n) => n > 0).length

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Programming"
        subtitle="Courses, CLI cheatsheets, and a typing drill."
        actions={
          <Link to="/programming/cheatsheets" className="btn-ghost">
            Cheatsheets
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <StatTile
          label="Lessons completed"
          value={`${doneLessons} / ${totalLessons}`}
          accent={doneLessons > 0}
        />
        <StatTile label="Courses started" value={`${coursesStarted} / ${PROG_COURSES.length}`} />
        <StatTile
          label="CLI practice rounds"
          value={cliHistory?.totalSessions ?? 0}
          sub={cliHistory?.best ? `best ${cliHistory.best.score}/${cliHistory.best.total}` : undefined}
        />
        <StatTile
          label="Cheatsheet commands"
          value={CHEAT_SHEETS.reduce((n, s) => n + s.entries.length, 0)}
          sub={`${CHEAT_SHEETS.length} sheets`}
        />
      </div>

      {/* The section owns its own drills — the Quiz hub is library-only */}
      <Section title="Practice">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          <HubCard
            to="/programming/quiz"
            title="Quiz"
            body="Multiple choice over the courses' questions, or which command does what."
          />
          <HubCard
            to="/programming/practice"
            title="CLI typing drill"
            body="Read the task, type the command. Misses come back around."
          />
          <HubCard
            to="/programming/cheatsheets"
            title="Cheatsheets"
            body="Every command on one page, searchable across sheets."
          />
        </div>
      </Section>

      <Section title="Courses">
        <div className="grid gap-3 sm:grid-cols-2">
          {PROG_COURSES.map((c) => {
            const n = doneByCourse.get(c.key) ?? 0
            const pct = c.lessons.length > 0 ? Math.round((n / c.lessons.length) * 100) : 0
            return (
              <HubCard
                key={c.key}
                to={`/programming/course/${c.key}`}
                title={c.title}
                body={c.description}
              >
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-base-700">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${pct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="shrink-0 text-xs text-gray-500">
                    {n} / {c.lessons.length}
                  </span>
                </div>
              </HubCard>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
