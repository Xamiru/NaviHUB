import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import EmptyState from '../components/EmptyState'
import ActionMenu from '../components/ActionMenu'
import type { JpLessonKind, JpLessonSummary } from '@shared/types'
import { confirmDialog } from '../lib/confirm'

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
    const ok = await confirmDialog(`Delete "${course.title}" and all its lessons and cards?`, {
      confirmLabel: 'Delete',
      danger: true
    })
    if (!ok) return
    await api.japanese.removeCourse(courseId)
    await qc.invalidateQueries({ queryKey: qk.japanese.all })
    toast('Course deleted', 'success')
    navigate('/japanese')
  }

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!course) return <PageStatus>Course not found.</PageStatus>

  const learned = course.lessons.filter((l) => l.learned).length
  const pct = course.lessons.length ? Math.round((learned / course.lessons.length) * 100) : 0

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title={course.title}
        subtitle={course.description}
        eyebrow={
          course.difficulty != null || course.level ? (
            <>
              {course.difficulty != null && (
                <span className="chip bg-accent/20 text-accent">Step {course.difficulty}</span>
              )}
              {course.level && <span className="chip bg-base-700 text-gray-400">{course.level}</span>}
            </>
          ) : undefined
        }
        actions={
          <>
            <Link to={`/japanese/courses/${courseId}/edit`} className="btn-ghost">
              Edit
            </Link>
            <ActionMenu items={[{ label: 'Delete course…', onSelect: removeCourse, danger: true }]} />
          </>
        }
      />

      <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mb-6 text-xs text-gray-500">
        {learned} / {course.lessons.length} lessons learned
      </p>

      <Section
        title="Lessons"
        subtitle={
          <span className="flex gap-2">
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
          </span>
        }
      >
        {course.lessons.length === 0 ? (
          <EmptyState title="No lessons yet" body="Add a grammar lesson or a vocabulary deck." />
        ) : (
          <div className="space-y-1.5">
            {course.lessons.map((lesson, i) => (
              <LessonRow key={lesson.id} lesson={lesson} index={i} />
            ))}
          </div>
        )}
      </Section>
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
