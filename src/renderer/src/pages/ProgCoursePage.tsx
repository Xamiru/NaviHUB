import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageStatus from '../components/PageStatus'
import { progCourse, progLessonKey } from '@shared/programming/courses'

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

  if (!course) return <PageStatus>Course not found.</PageStatus>

  const done = new Set(progress.map((p) => p.lessonKey))
  const doneCount = course.lessons.filter((l) => done.has(progLessonKey(course.key, l.key))).length
  const next = course.lessons.find((l) => !done.has(progLessonKey(course.key, l.key)))

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-5">
        <Link to="/programming" className="text-sm text-gray-500 hover:text-white">
          ← Programming
        </Link>
        <h1 className="mt-1 text-2xl font-bold">{course.title}</h1>
        <p className="text-sm text-gray-500">{course.description}</p>
      </div>

      <div className="card mb-5 flex items-center justify-between gap-3 p-4">
        <p className="text-sm text-gray-400">
          {doneCount} / {course.lessons.length} lessons completed
        </p>
        {next ? (
          <Link
            to={`/programming/course/${course.key}/${next.key}`}
            className="btn-primary shrink-0"
          >
            {doneCount === 0 ? 'Start course' : `Continue: ${next.title}`}
          </Link>
        ) : (
          <span className="text-sm text-accent">Course complete</span>
        )}
      </div>

      <ol className="space-y-1.5">
        {course.lessons.map((l, i) => {
          const isDone = done.has(progLessonKey(course.key, l.key))
          return (
            <li key={l.key}>
              <Link
                to={`/programming/course/${course.key}/${l.key}`}
                className="card flex items-center gap-3 p-3 hover:bg-base-700/50"
              >
                <span className="w-7 shrink-0 text-right text-sm tabular-nums text-gray-600">
                  {i + 1}.
                </span>
                <span className={`min-w-0 flex-1 text-sm ${isDone ? 'text-gray-400' : ''}`}>
                  {l.title}
                </span>
                {isDone && <span className="chip shrink-0 bg-accent/15 text-accent">done</span>}
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
