import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { progCourse, progLessonKey } from '@shared/programming/courses'
import { bestAttempts } from '@shared/programming/attempts'
import { recommendLesson } from '@shared/programming/recommendation'
import { learningSettingKey, parseLearningRecord } from '@shared/learningEvidence'
import { PROGRAMMING_APPLIED_PRACTICE } from '@shared/programming/appliedPractice'
import LearningPractice from '../components/LearningPractice'

// One course: the ordered lesson list with completion state. Fixed-parent
// breadcrumb (the JapaneseGuidePage exception), content straight from the
// code catalog.
export default function ProgCoursePage() {
  const { courseKey = '' } = useParams()
  const course = progCourse(courseKey)

  const { data: progress = [] } = useQuery({
    queryKey: qk.programming.progress,
    queryFn: () => api.programming.progress()
  })

  const { data: attempts = [] } = useQuery({
    queryKey: qk.programming.attempts,
    queryFn: () => api.programming.attempts()
  })
  const { data: settings = {} } = useQuery({ queryKey: qk.settings.values, queryFn: () => api.settings.all() })

  if (!course) return <PageStatus>Course not found.</PageStatus>

  const best = bestAttempts(attempts)
  const done = new Set(progress.map((p) => p.lessonKey))
  const doneCount = course.lessons.filter((l) => done.has(progLessonKey(course.key, l.key))).length
  const recommendation = recommendLesson(course, progress, attempts)
  const next = recommendation?.lesson
  const practice = PROGRAMMING_APPLIED_PRACTICE[course.key]

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/programming', label: 'Programming' }}
        title={course.title}
        subtitle={course.description}
      />

      <div className="card mb-5 flex items-center justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 text-sm text-gray-400">
            <span>{doneCount} / {course.lessons.length} lessons marked read</span>
            <span className="tabular-nums">{Math.round((doneCount / course.lessons.length) * 100)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-base-700">
            <div className="h-full bg-accent" style={{ width: `${(doneCount / course.lessons.length) * 100}%` }} />
          </div>
        </div>
        {next ? (
          <Link
            to={`/programming/course/${course.key}/${next.key}`}
            className="btn-primary shrink-0"
          >
            {doneCount === 0 ? 'Start course' : `Continue: ${next.title}`}
          </Link>
        ) : (
          <span className="text-sm text-accent">Reading and checks recorded</span>
        )}
      </div>
      <p className="mb-5 text-sm text-gray-400">{recommendation?.reason ?? 'Apply the course in a project. Reading and quiz scores alone do not establish practical mastery.'}</p>

      <ol className="relative space-y-2 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-base-700">
        {course.lessons.map((l, i) => {
          const fullKey = progLessonKey(course.key, l.key)
          const isDone = done.has(fullKey)
          const b = best.get(fullKey)
          const evidence = parseLearningRecord(settings[learningSettingKey('programming', fullKey)])
          return (
            <li key={l.key}>
              <Link
                to={`/programming/course/${course.key}/${l.key}`}
                className="card flex items-center gap-3 p-3 hover:bg-base-700/50"
              >
                <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-base-800 text-xs tabular-nums ${isDone ? 'border-accent text-accent' : 'border-base-600 text-gray-500'}`}>
                  {i + 1}
                </span>
                <span className={`min-w-0 flex-1 text-sm ${isDone ? 'text-gray-400' : ''}`}>
                  {l.title}
                </span>
                {b && (
                  <span
                    className={`chip shrink-0 tabular-nums ${
                      b.best.score === b.best.total ? 'text-accent' : 'text-gray-400'
                    }`}
                    title={`Best self-check over ${b.attempts} attempt${b.attempts === 1 ? '' : 's'}`}
                  >
                    {b.best.score}/{b.best.total}
                  </span>
                )}
                {evidence.project && <span className="chip shrink-0" title="Practical work recorded by you, not automatically graded">Practice recorded</span>}
                {isDone && <span className="chip shrink-0 bg-accent/15 text-accent">read</span>}
              </Link>
            </li>
          )
        })}
      </ol>
      {practice && <LearningPractice key={course.key} unit={practice} settingKey={learningSettingKey('programming', `course/${course.key}`)} />}
    </div>
  )
}
