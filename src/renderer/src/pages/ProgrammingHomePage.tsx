import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import { Field } from '../components/Field'
import { recommendLesson } from '@shared/programming/recommendation'
import { PROG_COURSES, progLessonKey } from '@shared/programming/courses'
import { CHEAT_SHEETS, practicePool } from '@shared/programming/cheatsheets'
import { passedChecks } from '@shared/programming/attempts'
import { SQL_EXERCISES } from '@shared/programming/sqlExercises'
import { REGEX_GOLF_PUZZLES } from '@shared/programming/regexGolf'

// Programming section dashboard: the focus course and its recommended lesson,
// the drills (quiz, CLI typing, SQL sandbox, regex golf) each with its own
// record, then the course archive. Reading ("marked read") and self-check
// evidence stay separate everywhere. Content is code (src/shared/programming/)
// — only progress rows are fetched.
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

  const pickFocus = (key: string): void => {
    setActiveCourse(key)
    try { localStorage.setItem('programming.activeCourse', key) } catch { /* Preference is optional. */ }
  }
  const courseSelect = (
    <select className="input w-auto" value={focusCourse?.key ?? ''} onChange={(event) => pickFocus(event.target.value)}>
      <option value="">Choose a course</option>
      {PROG_COURSES.map((course) => <option key={course.key} value={course.key}>{course.title}</option>)}
    </select>
  )
  const recIndex = focusCourse ? focusCourse.lessons.findIndex((lesson) => lesson.key === recommendedLesson?.key) : -1
  const spine = focusCourse ? focusCourse.lessons.slice(Math.max(0, recIndex - 3), Math.max(8, recIndex + 5)) : []
  const best = (h: typeof quizHistory): string =>
    h?.best ? ` · best ${h.best.score}/${h.best.total}` : ''
  const practice = [
    { to: '/programming/quiz', title: 'Quiz', body: 'Course questions, which command does what, or code snippets.', record: `${quizHistory?.totalSessions ?? 0} rounds${best(quizHistory)}` },
    { to: '/programming/practice', title: 'CLI typing drill', body: 'Read the task, type the command. Misses come back around.', record: `${cliHistory?.totalSessions ?? 0} rounds${best(cliHistory)}${weak.length ? ` · ${weak.length} weak` : ''}` },
    { to: '/programming/sql', title: 'SQL sandbox', body: 'Real queries against a small anime dataset, graded against the expected rows.', record: `${sqlSolved} / ${SQL_EXERCISES.length} solved` },
    { to: '/programming/regex-golf', title: 'Regex golf', body: 'Match these, not those, in as few characters as you can.', record: `${regexSolved} / ${REGEX_GOLF_PUZZLES.length} solved` },
    { to: '/programming/cheatsheets', title: 'Cheatsheets', body: 'Searchable command references.', record: `${CHEAT_SHEETS.reduce((n, sheet) => n + sheet.entries.length, 0)} commands · ${CHEAT_SHEETS.length} sheets` }
  ]

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Skill graph"
        subtitle={`${doneLessons} of ${totalLessons} lessons marked read · ${attemptedLessons ? `${passed} of ${attemptedLessons} attempted checks passed with full marks` : 'no self-checks yet'}`}
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

      {focusCourse ? (
        <Section
          title="Skill graph"
          subtitle={`${doneByCourse.get(focusCourse.key) ?? 0} of ${focusCourse.lessons.length} lessons marked read`}
          actions={
            <Field label="Course to focus on" hiddenLabel className="contents">
              {courseSelect}
            </Field>
          }
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
              {/* The lesson spine around the recommendation: a line of nodes,
                  read ones filled, the recommended one ringed. */}
              <ol className="relative mt-6 space-y-1 before:absolute before:bottom-3 before:left-[11px] before:top-3 before:w-px before:bg-base-600">
                {spine.map((lesson) => {
                  const complete = done.has(progLessonKey(focusCourse.key, lesson.key))
                  const current = lesson.key === recommendedLesson?.key
                  return (
                    <li key={lesson.key} className="relative">
                      <Link
                        to={`/programming/course/${focusCourse.key}/${lesson.key}`}
                        aria-current={current ? 'step' : undefined}
                        className={`group flex items-center gap-4 rounded-md py-2 pr-3 ${current ? 'bg-accent/10' : 'hover:bg-base-700/50'}`}
                      >
                        <span
                          className={`relative z-10 ml-1.5 h-3 w-3 shrink-0 rounded-full ${
                            current
                              ? 'bg-accent ring-4 ring-accent/25'
                              : complete
                                ? 'bg-accent/70'
                                : 'border border-base-500 bg-base-800'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={`min-w-0 flex-1 truncate text-sm ${current ? 'text-white' : 'text-gray-300'} group-hover:text-accent`}>
                          {lesson.title}
                        </span>
                        <span className={`shrink-0 text-xs ${current ? 'text-accent' : 'text-gray-500'}`}>
                          {current ? 'Recommended' : complete ? 'Read' : 'Available'}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
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
      ) : (
        <section className="card-glow mb-8 p-6" aria-label="Pick a focus">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Pick a focus</p>
          <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-gray-300">
            Choosing a course turns this page into your next lesson, from your latest checks and unread lessons. Every
            course stays open to explore.
          </p>
          <Field label="Course to focus on" className="mt-4 max-w-md">
            {courseSelect}
          </Field>
        </section>
      )}

      {/* The section owns its own drills — the Quiz hub is library-only */}
      <Section title="Practice">
        <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
          {practice.map((tool) => (
            <Link key={tool.to} to={tool.to} className="group block border-b border-base-700/60 py-2.5">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium group-hover:text-accent">{tool.title}</span>
                <span className="shrink-0 text-xs tabular-nums text-gray-400">{tool.record}</span>
              </span>
              <span className="mt-0.5 block text-xs text-gray-500">{tool.body}</span>
            </Link>
          ))}
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

      <Section title="Course archive" subtitle={`${PROG_COURSES.length} courses`}>
        <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
          {PROG_COURSES.map((c) => {
            const n = doneByCourse.get(c.key) ?? 0
            const pct = c.lessons.length > 0 ? Math.round((n / c.lessons.length) * 100) : 0
            return (
              <Link key={c.key} to={`/programming/course/${c.key}`} className="group block border-b border-base-700/60 py-2.5">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-sm font-medium group-hover:text-accent">{c.title}</span>
                  <span className="shrink-0 text-xs tabular-nums text-gray-500">
                    {n} / {c.lessons.length}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-xs text-gray-500">{c.description}</span>
                <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-base-700" aria-hidden="true">
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                </span>
              </Link>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
