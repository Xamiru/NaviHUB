import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import Markdown from '../components/Markdown'
import LearningProject from '../components/LearningProject'
import { learningSettingKey } from '@shared/learningEvidence'
import { lessonPracticeTask, PROJECT_CRITERIA } from '@shared/programming/recommendation'
import { progCourse, progLessonKey } from '@shared/programming/courses'
import type { ProgQuestion } from '@shared/programming/types'
import { shuffle } from '@shared/shuffle'
import { bestAttempts } from '@shared/programming/attempts'

// One lesson: the Markdown body, a click-to-check "Check understanding" block
// (a finished check — every question answered — is recorded once as a
// prog_attempt row; the best score shows on the course page), and the
// completion toggle. Keyed by route params so navigating prev/next remounts
// fresh question state.
export default function ProgLessonPage() {
  const { courseKey = '', lessonKey = '' } = useParams()
  const course = progCourse(courseKey)
  const index = course?.lessons.findIndex((l) => l.key === lessonKey) ?? -1
  if (!course || index < 0) return <PageStatus>Lesson not found.</PageStatus>
  return <Lesson key={`${courseKey}/${lessonKey}`} courseKey={courseKey} index={index} />
}

function Lesson({ courseKey, index }: { courseKey: string; index: number }) {
  const course = progCourse(courseKey)!
  const lesson = course.lessons[index]
  const fullKey = progLessonKey(course.key, lesson.key)
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  // 1-4 answer the first unanswered question (the quiz pages' keyboard idiom).
  const [results, setResults] = useState<ReadonlyMap<number, boolean>>(new Map())
  const activeQ = lesson.questions.findIndex((_, i) => !results.has(i))
  const recordedRef = useRef(false)

  const { data: progress = [] } = useQuery({
    queryKey: qk.programming.progress,
    queryFn: () => api.programming.progress()
  })
  const { data: attempts = [] } = useQuery({
    queryKey: qk.programming.attempts,
    queryFn: () => api.programming.attempts()
  })
  const isDone = progress.some((p) => p.lessonKey === fullKey)
  const summary = bestAttempts(attempts).get(fullKey)
  const total = lesson.questions.length
  const checkDone = total > 0 && results.size === total
  const score = [...results.values()].filter(Boolean).length

  // One prog_attempt row per finished check, guarded like the quiz pages'
  // loggedRef — StrictMode double-invokes effects, this must not double-log.
  useEffect(() => {
    if (!checkDone || recordedRef.current) return
    recordedRef.current = true
    void api.programming
      .recordAttempt({ lessonKey: fullKey, score, total })
      .then(() => qc.invalidateQueries({ queryKey: qk.programming.attempts }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkDone])

  const prev = index > 0 ? course.lessons[index - 1] : null
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : null

  async function toggleDone() {
    setBusy(true)
    try {
      if (isDone) await api.programming.uncomplete(fullKey)
      else await api.programming.complete(fullKey)
      await qc.invalidateQueries({ queryKey: qk.programming.all })
    } finally {
      setBusy(false)
    }
  }

  return (
    <StudySessionFrame
      title={lesson.title}
      subtitle={<Link to={`/programming/course/${course.key}`} className="hover:text-accent">{course.title}</Link>}
      progress={{ current: index + 1, total: course.lessons.length, label: 'Course path' }}
      actions={<button className={isDone ? 'btn-ghost' : 'btn-primary'} disabled={busy} onClick={() => void toggleDone()}>{isDone ? 'Mark unread' : 'Mark lesson read'}</button>}
      rail={<SessionEvidence title="Learning evidence"><p>{checkDone ? `${score} of ${total} correct in this check.` : `${results.size} of ${total} checks answered.`}</p>{summary && <p className="mt-2">Best attempt {summary.best.score} of {summary.best.total}.</p>}<p className="mt-2">{isDone ? 'Marked read. This does not certify mastery.' : 'Not yet marked read.'}</p><p className="mt-2">Record practical work separately below. All lessons remain available.</p></SessionEvidence>}
      surface={false}
    >

      <article className="card p-5 sm:p-7">
        <Markdown text={lesson.body} />
      </article>

      {lesson.questions.length > 0 && (
        <Section title="Check understanding" className="mt-6 mb-0">
          <div className="space-y-3">
            {lesson.questions.map((q, i) => (
              <Question
                key={i}
                q={q}
                n={i + 1}
                active={i === activeQ}
                onAnswered={(ok) => setResults((m) => new Map(m).set(i, ok))}
              />
            ))}
          </div>
          {(checkDone || summary) && (
            <p className="mt-3 text-sm text-gray-400">
              {checkDone && (
                <span className={score === total ? 'text-accent' : ''}>
                  This check: {score} / {total}
                </span>
              )}
              {checkDone && summary && <span className="mx-2 text-gray-600">·</span>}
              {summary && (
                <span>
                  best {summary.best.score} / {summary.best.total}
                  {summary.attempts > 1 ? ` over ${summary.attempts} checks` : ''}
                </span>
              )}
            </p>
          )}
        </Section>
      )}

      <LearningProject settingKey={learningSettingKey('programming', fullKey)} task={lessonPracticeTask(lesson.body)} criteria={PROJECT_CRITERIA} />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="flex-1" />
        {prev && (
          <Link to={`/programming/course/${course.key}/${prev.key}`} className="btn-ghost">
            Prev: {prev.title}
          </Link>
        )}
        {next && (
          <Link to={`/programming/course/${course.key}/${next.key}`} className="btn-ghost">
            Next: {next.title}
          </Link>
        )}
      </div>
    </StudySessionFrame>
  )
}

function Question({
  q,
  n,
  active,
  onAnswered
}: {
  q: ProgQuestion
  n: number
  active: boolean
  onAnswered: (correct: boolean) => void
}) {
  // Options are authored with the answer clustered at index 1 (43% of the
  // catalog), so deal them shuffled once per mount — the quiz page already
  // does — and re-find the correct one by identity.
  const [options] = useState(() => shuffle(q.options))
  const correct = options.indexOf(q.options[q.correct])
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null

  function pick(i: number): void {
    if (picked !== null) return
    setPicked(i)
    onAnswered(i === correct)
  }

  useEffect(() => {
    if (!active || answered) return
    function onKey(e: KeyboardEvent) {
      const num = Number(e.key)
      if (!Number.isInteger(num) || num < 1 || num > options.length) return
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      pick(num - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, answered])

  return (
    <div className="card p-4">
      <p className="mb-2 text-sm">
        <span className="mr-1.5 text-xs text-gray-600">{n}.</span>
        {q.prompt}
      </p>
      <div className="space-y-1.5">
        {options.map((opt, i) => {
          let cls = 'border-base-700 hover:bg-base-700/60'
          if (answered) {
            if (i === correct) cls = 'border-green-500/60 bg-green-500/10 text-green-300'
            else if (i === picked) cls = 'border-red-500/60 bg-red-500/10 text-red-300'
            else cls = 'border-base-700 opacity-60'
          }
          return (
            <button
              key={i}
              className={`block w-full rounded-md border px-3 py-1.5 text-left text-sm transition-colors ${cls}`}
              disabled={answered}
              onClick={() => pick(i)}
            >
              {active && !answered && <kbd className="kbd float-right">{i + 1}</kbd>}
              {opt}
            </button>
          )
        })}
      </div>
      {answered && q.explain && <p className="mt-2 text-xs text-gray-400">{q.explain}</p>}
    </div>
  )
}
