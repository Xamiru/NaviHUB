import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import type { JpLessonKind, JpLessonSummary } from '@shared/types'

const KIND_CHIP: Record<JpLessonKind, { cls: string; label: string }> = {
  grammar: { cls: 'bg-purple-500/20 text-purple-300', label: '文法 Grammar' },
  vocab: { cls: 'bg-sky-500/20 text-sky-300', label: '語彙 Vocab' },
  kanji: { cls: 'bg-amber-500/20 text-amber-300', label: '漢字 Kanji' }
}

export default function JapaneseCoursePage() {
  const { id } = useParams()
  const courseId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: course, isLoading } = useQuery({
    queryKey: qk.japanese.course(courseId),
    queryFn: () => api.japanese.getCourse(courseId)
  })

  async function removeCourse() {
    if (!course) return
    if (!window.confirm(`Delete "${course.title}" and all its lessons and cards?`)) return
    await api.japanese.removeCourse(courseId)
    await qc.invalidateQueries({ queryKey: qk.japanese.all })
    toast('Course deleted', 'success')
    navigate('/japanese')
  }

  if (isLoading) return <p className="p-6 text-gray-500">Loading…</p>
  if (!course) return <p className="p-6 text-gray-500">Course not found.</p>

  const learned = course.lessons.filter((l) => l.learned).length
  const pct = course.lessons.length ? Math.round((learned / course.lessons.length) * 100) : 0

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <Link to="/japanese" className="text-sm text-gray-500 hover:text-gray-300">
        ← Japanese
      </Link>

      <div className="mt-2 flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          {(course.difficulty != null || course.level) && (
            <p className="mb-1 flex items-center gap-1.5">
              {course.difficulty != null && (
                <span className="chip bg-accent/20 text-accent">Step {course.difficulty}</span>
              )}
              {course.level && <span className="chip bg-base-700 text-gray-400">{course.level}</span>}
            </p>
          )}
          <h1 className="text-2xl font-bold">{course.title}</h1>
          {course.description && <p className="mt-1 text-sm text-gray-500">{course.description}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          <Link to={`/japanese/courses/${courseId}/edit`} className="btn-ghost">
            Edit
          </Link>
          <button className="btn-danger" onClick={removeCourse}>
            Delete
          </button>
        </div>
      </div>

      <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mb-6 text-xs text-gray-500">
        {learned} / {course.lessons.length} lessons learned
      </p>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Lessons</h2>
        <div className="flex gap-2">
          <Link
            to={`/japanese/lessons/new?courseId=${courseId}&kind=grammar`}
            className="btn-ghost text-sm"
          >
            + Grammar lesson
          </Link>
          <Link
            to={`/japanese/lessons/new?courseId=${courseId}&kind=vocab`}
            className="btn-ghost text-sm"
          >
            + Vocab lesson
          </Link>
          <Link
            to={`/japanese/lessons/new?courseId=${courseId}&kind=kanji`}
            className="btn-ghost text-sm"
          >
            + Kanji lesson
          </Link>
        </div>
      </div>

      {course.lessons.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-gray-500">
            No lessons yet — add a grammar lesson or a vocabulary deck.
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {course.lessons.map((lesson, i) => (
            <LessonRow key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function LessonRow({ lesson, index }: { lesson: JpLessonSummary; index: number }) {
  return (
    <Link
      to={`/japanese/lessons/${lesson.id}`}
      className="card flex items-center gap-3 p-3 hover:border-accent transition-colors group"
    >
      <span className="w-6 text-center text-sm text-gray-500">{index + 1}</span>
      <span className={`chip shrink-0 ${KIND_CHIP[lesson.kind].cls}`}>
        {KIND_CHIP[lesson.kind].label}
      </span>
      <span className="min-w-0 flex-1 truncate font-medium group-hover:text-accent">
        {lesson.title}
      </span>
      <span className="shrink-0 text-xs text-gray-500">
        {lesson.cardCount} {lesson.cardCount === 1 ? 'card' : 'cards'}
      </span>
      <span
        className={`w-6 shrink-0 text-center ${lesson.learned ? 'text-green-400' : 'text-gray-600'}`}
        title={lesson.learned ? 'Learned' : 'Not learned yet'}
      >
        {lesson.learned ? '✓' : '○'}
      </span>
    </Link>
  )
}
