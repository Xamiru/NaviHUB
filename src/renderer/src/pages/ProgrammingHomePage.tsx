import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import HubCard from '../components/HubCard'
import { PROG_COURSES, progLessonKey } from '@shared/programming/courses'
import { CHEAT_SHEETS, practicePool } from '@shared/programming/cheatsheets'
import { passedChecks } from '@shared/programming/attempts'
import { SQL_EXERCISES } from '@shared/programming/sqlExercises'
import { REGEX_GOLF_PUZZLES } from '@shared/programming/regexGolf'

// Programming section dashboard: course cards with progress, the drills (quiz,
// CLI typing, SQL sandbox, regex golf), and the tracking layer over them
// (self-check passes, weak commands, solves). Content is code
// (src/shared/programming/) — only progress rows are fetched.
export default function ProgrammingHomePage() {
  const { data: progress = [] } = useQuery({
    queryKey: qk.programming.progress,
    queryFn: () => api.programming.progress()
  })
  const { data: attempts = [] } = useQuery({
    queryKey: qk.programming.attempts,
    queryFn: () => api.programming.attempts()
  })
  const { data: misses = [] } = useQuery({
    queryKey: qk.programming.cliMisses,
    queryFn: () => api.programming.cliMisses()
  })
  const { data: solves = [] } = useQuery({
    queryKey: qk.programming.solves,
    queryFn: () => api.programming.solves()
  })
  const { data: cliHistory } = useQuery({
    queryKey: qk.quiz.history('cli'),
    queryFn: () => api.quiz.history('cli')
  })
  const { data: quizHistory } = useQuery({
    queryKey: qk.quiz.history('programming'),
    queryFn: () => api.quiz.history('programming')
  })
  const sqlSolved = solves.filter((s) => s.kind === 'sql').length
  const regexSolved = solves.filter((s) => s.kind === 'regex').length
  const passed = passedChecks(attempts)
  const attemptedLessons = new Set(attempts.map((a) => a.lessonKey)).size
  // Weak commands: resolve the frozen keys back to display commands.
  const byKey = new Map(practicePool(null).map((i) => [i.key, i]))
  const weak = misses.map((m) => ({ ...m, item: byKey.get(m.cmdKey) })).filter((m) => m.item)

  const done = new Set(progress.map((p) => p.lessonKey))
  const totalLessons = PROG_COURSES.reduce((n, c) => n + c.lessons.length, 0)
  const doneByCourse = new Map(
    PROG_COURSES.map((c) => [
      c.key,
      c.lessons.filter((l) => done.has(progLessonKey(c.key, l.key))).length
    ])
  )
  const doneLessons = [...doneByCourse.values()].reduce((a, b) => a + b, 0)

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Programming"
        subtitle="Courses, cheatsheets, and drills: quiz, CLI typing, SQL sandbox, regex golf."
        actions={
          <Link to="/programming/cheatsheets" className="btn-ghost">
            Cheatsheets
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-6">
        <StatTile
          label="Lessons completed"
          value={`${doneLessons} / ${totalLessons}`}
          accent={doneLessons > 0}
        />
        <StatTile
          label="Checks passed"
          value={`${passed} / ${attemptedLessons}`}
          sub="full marks / attempted"
        />
        <StatTile
          label="Quiz rounds"
          value={quizHistory?.totalSessions ?? 0}
          sub={
            quizHistory?.best ? `best ${quizHistory.best.score}/${quizHistory.best.total}` : undefined
          }
        />
        <StatTile
          label="CLI practice rounds"
          value={cliHistory?.totalSessions ?? 0}
          sub={cliHistory?.best ? `best ${cliHistory.best.score}/${cliHistory.best.total}` : undefined}
        />
        <StatTile
          label="SQL exercises"
          value={`${sqlSolved} / ${SQL_EXERCISES.length}`}
          sub="solved"
          accent={sqlSolved > 0}
        />
        <StatTile
          label="Regex golf"
          value={`${regexSolved} / ${REGEX_GOLF_PUZZLES.length}`}
          sub="solved"
          accent={regexSolved > 0}
        />
      </div>

      {/* The section owns its own drills — the Quiz hub is library-only */}
      <Section title="Practice">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          <HubCard
            to="/programming/quiz"
            title="Quiz"
            body="Multiple choice over the courses' questions, which command does what, or code snippets."
          />
          <HubCard
            to="/programming/practice"
            title="CLI typing drill"
            body="Read the task, type the command. Misses come back around."
            badge={weak.length > 0 ? `${weak.length} weak` : undefined}
          />
          <HubCard
            to="/programming/sql"
            title="SQL sandbox"
            body="Real queries against a small anime dataset, graded against the expected rows."
          />
          <HubCard
            to="/programming/regex-golf"
            title="Regex golf"
            body="Match these, not those — in as few characters as you can."
          />
          <HubCard
            to="/programming/cheatsheets"
            title="Cheatsheets"
            body={`${CHEAT_SHEETS.reduce((n, s) => n + s.entries.length, 0)} commands across ${CHEAT_SHEETS.length} sheets, searchable.`}
          />
        </div>
      </Section>

      {weak.length > 0 && (
        <Section
          title="Weak commands"
          subtitle="Missed more often than hit in the CLI drill. Cleared by getting them right first try."
        >
          <div className="card flex flex-wrap items-center gap-2 p-3">
            {weak.slice(0, 12).map((w) => (
              <code
                key={w.cmdKey}
                className="rounded bg-base-700 px-1.5 py-0.5 text-xs"
                title={`${w.item!.desc} · missed ${w.misses}×`}
              >
                {w.item!.answers[0]}
                <span className="ml-1 text-gray-500">×{w.misses}</span>
              </code>
            ))}
            {weak.length > 12 && <span className="text-xs text-gray-500">+{weak.length - 12} more</span>}
            <Link to="/programming/practice?weak=1" className="btn-primary ml-auto shrink-0">
              Drill these
            </Link>
          </div>
        </Section>
      )}

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
