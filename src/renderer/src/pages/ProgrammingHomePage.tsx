import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import HubCard from '../components/HubCard'
import { Field } from '../components/Field'
import { recommendLesson } from '@shared/programming/recommendation'
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
  const [activeCourse, setActiveCourse] = useState(() => {
    try { return localStorage.getItem('programming.activeCourse') ?? '' } catch { return '' }
  })
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
  const focusCourse = PROG_COURSES.find((course) => course.key === activeCourse)
  const recommendation = focusCourse ? recommendLesson(focusCourse, progress, attempts) : null
  const recommendedLesson = recommendation?.lesson

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Skill graph"
        subtitle="Choose a course, repair missed concepts, and track reading separately from practical evidence."
        actions={
          <>
            <Link to="/programming/cheatsheets" className="btn-ghost">
              Cheatsheets
            </Link>
            {focusCourse && recommendedLesson && (
              <Link
                to={`/programming/course/${focusCourse.key}/${recommendedLesson.key}`}
                className="btn-primary"
              >
                Open recommended node
              </Link>
            )}
          </>
        }
      />

      <Field label="Course to focus on" className="mb-6" description="Recommendations use your latest checks and unread lessons in this course. You can still explore any course.">
        <select className="input" value={focusCourse?.key ?? ''} onChange={(event) => {
          setActiveCourse(event.target.value)
          try { localStorage.setItem('programming.activeCourse', event.target.value) } catch { /* Preference is optional. */ }
        }}>
          <option value="">Choose a course</option>
          {PROG_COURSES.map((course) => <option key={course.key} value={course.key}>{course.title}</option>)}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-6">
        <StatTile
          label="Lessons read"
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

      {focusCourse && (
        <Section
          title="Skill graph"
          subtitle={`${doneByCourse.get(focusCourse.key) ?? 0} of ${focusCourse.lessons.length} lessons marked read`}
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
            <div className="card p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Active course
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{focusCourse.title}</h2>
                </div>
                <Link to={`/programming/course/${focusCourse.key}`} className="btn-ghost">
                  Open course
                </Link>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {focusCourse.lessons.slice(Math.max(0, focusCourse.lessons.findIndex((lesson) => lesson.key === recommendedLesson?.key) - 3), Math.max(8, focusCourse.lessons.findIndex((lesson) => lesson.key === recommendedLesson?.key) + 5)).map((lesson) => {
                  const key = progLessonKey(focusCourse.key, lesson.key)
                  const complete = done.has(key)
                  const current = lesson.key === recommendedLesson?.key
                  return (
                    <Link
                      key={lesson.key}
                      to={`/programming/course/${focusCourse.key}/${lesson.key}`}
                      className={`min-h-28 rounded-lg border p-4 transition-colors hover:border-accent ${
                        current
                          ? 'border-accent/60 bg-accent/10'
                          : complete
                            ? 'border-accent/25 bg-base-700/50'
                            : 'border-base-700'
                      }`}
                    >
                      <p className={`text-[10px] font-semibold uppercase tracking-wider ${current ? 'text-accent' : 'text-gray-500'}`}>
                        {current ? 'Recommended' : complete ? 'Read' : 'Available'}
                      </p>
                      <p className="mt-2 text-sm font-medium">{lesson.title}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
            <aside className="space-y-4">
              <div className="card-glow p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Recommended node
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  {recommendedLesson?.title ?? 'Apply the course'}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {recommendation?.reason ?? 'Reading and self-checks are recorded. Complete practical work and revisit the course checks after a delay.'}
                </p>
              </div>
              <div className="card p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Evidence
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div><p className="text-xl font-semibold">{passed}</p><p className="text-[10px] text-gray-500">Checks</p></div>
                  <div><p className="text-xl font-semibold">{quizHistory?.totalSessions ?? 0}</p><p className="text-[10px] text-gray-500">Quizzes</p></div>
                  <div><p className="text-xl font-semibold">{sqlSolved + regexSolved}</p><p className="text-[10px] text-gray-500">Solves</p></div>
                </div>
              </div>
            </aside>
          </div>
        </Section>
      )}

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
            <Link to="/programming/practice?weak=1" className="btn-ghost ml-auto shrink-0">
              Drill these
            </Link>
          </div>
        </Section>
      )}

      <Section title="Course archive">
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
