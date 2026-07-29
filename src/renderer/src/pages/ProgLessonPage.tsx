import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageStatus from '../components/PageStatus'
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
      <div className="mb-5">
        <Link to={`/programming/course/${course.key}`} className="text-sm text-gray-500 hover:text-white">
          ← {course.title}
        </Link>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <span className="shrink-0 text-xs text-gray-500">
            Lesson {index + 1} of {course.lessons.length}
          </span>
        </div>
      </div>

      <div className="card p-5">
        <Markdown text={lesson.body} />
      </div>

      {lesson.questions.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
            Check understanding
          </h2>
          <div className="space-y-3">
            {lesson.questions.map((q, i) => (
              <Question key={i} q={q} n={i + 1} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button className={isDone ? 'btn-ghost' : 'btn-primary'} disabled={busy} onClick={() => void toggleDone()}>
          {isDone ? 'Mark incomplete' : 'Mark lesson complete'}
        </button>
        <span className="flex-1" />
        {prev && (
          <Link to={`/programming/course/${course.key}/${prev.key}`} className="btn-ghost">
            ← {prev.title}
          </Link>
        )}
        {next && (
          <Link to={`/programming/course/${course.key}/${next.key}`} className="btn-ghost">
            {next.title} →
          </Link>
        )}
      </div>
    </div>
  )
}

function Question({ q, n }: { q: ProgQuestion; n: number }) {
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null

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
              onClick={() => setPicked(i)}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {answered && q.explain && <p className="mt-2 text-xs text-gray-400">{q.explain}</p>}
    </div>
  )
}
