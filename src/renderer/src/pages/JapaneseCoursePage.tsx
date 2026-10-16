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
import EditorialDetailFrame from '../components/EditorialDetailFrame'
import ContextPanel from '../components/ContextPanel'

const KIND_CHIP: Record<JpLessonKind, { cls: string; label: string }> = {
  grammar: { cls: 'bg-purple-500/20 text-purple-300', label: '文法 Grammar' },
  vocab: { cls: 'bg-sky-500/20 text-sky-300', label: '語彙 Vocab' },
  kanji: { cls: 'bg-signal-caution/20 text-signal-caution', label: '漢字 Kanji' }
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
  const units = toUnits(course.lessons)
  const nextIndex = course.lessons.findIndex((l) => !l.learned)
  const next = nextIndex >= 0 ? course.lessons[nextIndex] : null
  const addLesson = (kind: JpLessonKind) => navigate(`/japanese/lessons/new?courseId=${courseId}&kind=${kind}`)

  return (
    <EditorialDetailFrame
      width="wide"
      aside={
        <ContextPanel title="Units" identity={course.id} subtitle={`${learned} of ${course.lessons.length} lessons learned`}>
          <ol className="space-y-2 text-sm">
            {units.map((u) => {
              const done = u.lessons.filter((l) => l.learned).length
              return (
                <li key={u.number}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 text-left hover:text-accent"
                    onClick={() => document.getElementById(`unit-${u.number}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  >
                    <span className={`w-14 shrink-0 text-xs ${u.containsNext ? 'text-accent' : 'text-gray-500'}`}>
                      Unit {u.number}
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-base-700">
                      <span
                        className="block h-full bg-accent"
                        style={{ width: `${Math.round((done / u.lessons.length) * 100)}%` }}
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right text-xs text-gray-500">
                      {done}/{u.lessons.length}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </ContextPanel>
      }
    >
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
          <ActionMenu
            items={[
              { label: 'Add a grammar lesson', onSelect: () => addLesson('grammar') },
              { label: 'Add a vocabulary lesson', onSelect: () => addLesson('vocab') },
              { label: 'Add a kanji lesson', onSelect: () => addLesson('kanji') },
              { label: 'Edit course details', onSelect: () => navigate(`/japanese/courses/${courseId}/edit`) },
              { label: 'Delete course…', onSelect: removeCourse, danger: true }
            ]}
          />
        }
      />

      {course.lessons.length > 0 && (
        <div className="card mb-6 flex flex-wrap items-center gap-4 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              {next ? `Up next · lesson ${nextIndex + 1} of ${course.lessons.length}` : 'Course complete'}
            </p>
            <p className="mt-1 truncate text-lg font-medium">
              {next ? next.title : `All ${course.lessons.length} lessons learned`}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          </div>
          {next && (
            <Link to={`/japanese/lessons/${next.id}`} className="btn-primary shrink-0">
              Continue
            </Link>
          )}
        </div>
      )}

      {course.lessons.length === 0 ? (
        <Section title="Lessons">
          <EmptyState title="No lessons yet" body="Add a grammar lesson or a vocabulary deck from the More menu." />
        </Section>
      ) : units.length === 1 ? (
        <Section title="Lessons">
          <div className="space-y-1.5">
            {course.lessons.map((lesson, i) => (
              <LessonRow key={lesson.id} lesson={lesson} index={i} isNext={i === nextIndex} />
            ))}
          </div>
        </Section>
      ) : (
        <div className="space-y-5">
          {units.map((u) => (
            <UnitBlock key={u.number} unit={u} nextIndex={nextIndex} />
          ))}
        </div>
      )}
    </EditorialDetailFrame>
  )
}

// Duolingo/Bunpro-style units: a long course reads as chunks of six with their
// own progress, and a finished unit folds away until it is opened.
const UNIT_SIZE = 6

interface Unit {
  number: number
  first: number // index of the unit's first lesson
  lessons: JpLessonSummary[]
  containsNext: boolean
}

function toUnits(lessons: JpLessonSummary[]): Unit[] {
  const next = lessons.findIndex((l) => !l.learned)
  if (lessons.length <= UNIT_SIZE + 2) {
    return lessons.length ? [{ number: 1, first: 0, lessons, containsNext: next >= 0 }] : []
  }
  const units: Unit[] = []
  for (let i = 0; i < lessons.length; i += UNIT_SIZE) {
    units.push({
      number: units.length + 1,
      first: i,
      lessons: lessons.slice(i, i + UNIT_SIZE),
      containsNext: next >= i && next < i + UNIT_SIZE
    })
  }
  return units
}

function UnitBlock({ unit, nextIndex }: { unit: Unit; nextIndex: number }) {
  const done = unit.lessons.filter((l) => l.learned).length
  const complete = done === unit.lessons.length
  return (
    <details id={`unit-${unit.number}`} open={!complete} className="group/unit scroll-mt-6">
      <summary
        className={`card flex cursor-pointer list-none items-center gap-3 p-3 ${
          unit.containsNext ? 'border-accent/60' : ''
        }`}
      >
        <span className="inline-block text-xs text-gray-500 transition-transform group-open/unit:rotate-90">▸</span>
        <span className="font-medium">Unit {unit.number}</span>
        <span className="text-xs text-gray-500">
          Lessons {unit.first + 1}–{unit.first + unit.lessons.length}
        </span>
        <span className="ml-auto text-xs text-gray-400">{complete ? 'Complete' : `${done} of ${unit.lessons.length} learned`}</span>
      </summary>
      <div className="mt-1.5 space-y-1.5 pl-4">
        {unit.lessons.map((lesson, i) => (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            index={unit.first + i}
            isNext={unit.first + i === nextIndex}
          />
        ))}
      </div>
    </details>
  )
}

function LessonRow({ lesson, index, isNext }: { lesson: JpLessonSummary; index: number; isNext: boolean }) {
  return (
    <Link
      to={`/japanese/lessons/${lesson.id}`}
      className={`card flex items-center gap-3 p-3 hover:border-accent transition-colors group ${isNext ? 'border-accent/60' : ''}`}
      aria-current={isNext ? 'step' : undefined}
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
        className={`w-6 shrink-0 text-center ${lesson.learned ? 'text-signal-affirmative' : 'text-gray-500'}`}
        title={lesson.learned ? 'Learned' : 'Not learned yet'}
      >
        {lesson.learned ? '✓' : '○'}
      </span>
    </Link>
  )
}
