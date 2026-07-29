import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import StatTile from '../components/StatTile'
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
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Programming</h1>
        <p className="text-sm text-gray-500">
          Courses for the working engineer, command-line cheatsheets, and a typing drill to make
          them stick.
        </p>
      </div>

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

      <div className="mb-6 flex flex-wrap gap-2">
        <Link to="/programming/cheatsheets" className="btn-ghost">
          Cheatsheets
        </Link>
        <Link to="/programming/practice" className="btn-ghost">
          CLI practice
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PROG_COURSES.map((c) => {
          const n = doneByCourse.get(c.key) ?? 0
          const pct = c.lessons.length > 0 ? Math.round((n / c.lessons.length) * 100) : 0
          return (
            <Link key={c.key} to={`/programming/course/${c.key}`} className="card block p-4 hover:bg-base-700/50">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-semibold">{c.title}</h2>
                <span className="shrink-0 text-xs text-gray-500">
                  {n} / {c.lessons.length} lessons
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">{c.description}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-base-700">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${pct}%` }}
                  aria-hidden="true"
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
