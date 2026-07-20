import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import StatTile from '../components/StatTile'
import type { JpCourseSummary } from '@shared/types'

export default function JapaneseHomePage() {
  const { data: stats } = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats()
  })
  const { data: courses = [], isLoading } = useQuery({
    queryKey: qk.japanese.courses,
    queryFn: () => api.japanese.listCourses()
  })

  const reviewable = (stats?.dueCount ?? 0) + (stats?.newAvailableCount ?? 0)

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">Japanese</h1>
          <p className="text-sm text-gray-500">
            Study lessons, mark them as learned, then practice with reviews and quizzes.
          </p>
        </div>
        <Link to="/japanese/courses/new" className="btn-primary">
          + New course
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <StatTile label="Due for review" value={stats?.dueCount ?? 0} accent={(stats?.dueCount ?? 0) > 0} />
        <StatTile label="New cards ready" value={stats?.newAvailableCount ?? 0} />
        <StatTile
          label="Lessons learned"
          value={`${stats?.learnedLessons ?? 0} / ${stats?.totalLessons ?? 0}`}
        />
        <StatTile label="Reviews today" value={stats?.reviewsToday ?? 0} />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link to="/japanese/review" className="btn-primary">
          ▶ Start review{reviewable > 0 ? ` (${reviewable})` : ''}
        </Link>
        <Link to="/japanese/quiz" className="btn-ghost">
          🎯 Practice quiz
        </Link>
        <Link to="/japanese/mine" className="btn-ghost">
          ⛏ Mine words
        </Link>
        <Link to="/japanese/dictionary" className="btn-ghost">
          辞 Dictionary
        </Link>
        <Link to="/japanese/kana" className="btn-ghost">
          かな Kana drill
        </Link>
        <Link to="/japanese/test" className="btn-ghost">
          検定 JLPT test
        </Link>
        <Link to="/japanese/stats" className="btn-ghost">
          ⧗ Stats
        </Link>
      </div>

      <div className="mb-3">
        <h2 className="text-lg font-semibold">Courses</h2>
        <p className="text-xs text-gray-500">
          Ordered by difficulty — start from the top and work your way down.
        </p>
      </div>
      {isLoading ? (
        <p className="text-gray-500">Loading…</p>
      ) : courses.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-medium mb-1">No courses yet</p>
          <p className="text-sm text-gray-500 mb-5">
            A course groups grammar lessons and vocabulary decks. Create one to get started.
          </p>
          <Link to="/japanese/courses/new" className="btn-primary mx-auto inline-block">
            + Create a course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  )
}

function CourseCard({ course }: { course: JpCourseSummary }) {
  const pct = course.lessonCount
    ? Math.round((course.learnedLessonCount / course.lessonCount) * 100)
    : 0
  return (
    <Link to={`/japanese/courses/${course.id}`} className="card p-4 group">
      {(course.difficulty != null || course.level) && (
        <p className="mb-1.5 flex items-center gap-1.5">
          {course.difficulty != null && (
            <span className="chip bg-accent/20 text-accent">Step {course.difficulty}</span>
          )}
          {course.level && <span className="chip bg-base-700 text-gray-400">{course.level}</span>}
        </p>
      )}
      <p className="font-medium group-hover:text-accent line-clamp-1">{course.title}</p>
      {course.description && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{course.description}</p>
      )}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {course.learnedLessonCount} / {course.lessonCount}{' '}
        {course.lessonCount === 1 ? 'lesson' : 'lessons'} learned · {course.cardCount} cards
      </p>
    </Link>
  )
}
