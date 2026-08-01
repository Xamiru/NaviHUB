import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import Markdown from '../components/Markdown'
import { progCourse, progLessonKey } from '@shared/programming/courses'
import type { ProgQuestion } from '@shared/programming/types'

// One lesson: the Markdown body, a click-to-check "Check understanding" block
// (self-check only — nothing is logged), and the completion toggle. Keyed by
// route params so navigating prev/next remounts fresh question state.
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
  const [answered, setAnswered] = useState<ReadonlySet<number>>(new Set())
  const activeQ = lesson.questions.findIndex((_, i) => !answered.has(i))

  const { data: progress = [] } = useQuery({
    queryKey: qk.programming.progress,
    queryFn: () => api.programming.progress()
  })
  const isDone = progress.some((p) => p.lessonKey === fullKey)

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
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: `/programming/course/${course.key}`, label: course.title }}
        title={lesson.title}
        actions={
          <span className="text-xs text-gray-500">
            Lesson {index + 1} of {course.lessons.length}
          </span>
        }
      />

      <div className="card p-5">
        <Markdown text={lesson.body} />
      </div>

      {lesson.questions.length > 0 && (
        <Section title="Check understanding" className="mt-6 mb-0">
          <div className="space-y-3">
            {lesson.questions.map((q, i) => (
              <Question
                key={i}
                q={q}
                n={i + 1}
                active={i === activeQ}
                onAnswered={() => setAnswered((s) => new Set(s).add(i))}
              />
            ))}
          </div>
        </Section>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button className={isDone ? 'btn-ghost' : 'btn-primary'} disabled={busy} onClick={() => void toggleDone()}>
          {isDone ? 'Mark incomplete' : 'Mark lesson complete'}
        </button>
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
    </div>
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
  onAnswered: () => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null

  function pick(i: number): void {
    if (picked !== null) return
    setPicked(i)
    onAnswered()
  }

  useEffect(() => {
    if (!active || answered) return
    function onKey(e: KeyboardEvent) {
      const num = Number(e.key)
      if (!Number.isInteger(num) || num < 1 || num > q.options.length) return
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
        {q.options.map((opt, i) => {
          let cls = 'border-base-700 hover:bg-base-700/60'
          if (answered) {
            if (i === q.correct) cls = 'border-green-500/60 bg-green-500/10 text-green-300'
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
