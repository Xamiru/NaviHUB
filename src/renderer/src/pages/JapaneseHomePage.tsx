import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import StatTile from '../components/StatTile'
import CoreDeckDialog from '../components/japanese/CoreDeckDialog'

// The section's dashboard: where you stand, what to do next, and the way into
// every tool. The full course list lives on the roadmap page — this stays a
// place you pass through, not one you browse.
export default function JapaneseHomePage() {
  const [coreDeck, setCoreDeck] = useState(false)

  const { data: stats } = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats()
  })
  const { data: roadmap } = useQuery({
    queryKey: qk.japanese.roadmap,
    queryFn: () => api.japanese.roadmap()
  })

  const reviewable = (stats?.dueCount ?? 0) + (stats?.newAvailableCount ?? 0)
  const frontier = roadmap?.steps.find((c) => c.id === roadmap.frontierCourseId) ?? null
  const hasCourses = (roadmap?.steps.length ?? 0) + (roadmap?.unscheduled.length ?? 0) > 0

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
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

      {hasCourses ? (
        <div className="card mb-6 p-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">Continue</h2>
          {frontier ? (
            <>
              <p className="text-sm">
                <Link to={`/japanese/courses/${frontier.id}`} className="font-medium hover:text-accent">
                  {frontier.title}
                </Link>
                <span className="ml-2 text-xs text-gray-500">
                  Step {frontier.difficulty} · {frontier.learnedLessonCount} / {frontier.lessonCount}{' '}
                  lessons learned
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link to="/japanese/review" className={reviewable > 0 ? 'btn-primary' : 'btn-ghost'}>
                  Start review{reviewable > 0 ? ` (${reviewable})` : ''}
                </Link>
                {roadmap?.nextLesson && (
                  <Link to={`/japanese/lessons/${roadmap.nextLesson.id}`} className="btn-ghost">
                    Next lesson: {roadmap.nextLesson.title}
                  </Link>
                )}
                <Link to="/japanese/roadmap" className="btn-ghost">
                  See the roadmap
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-400">
                Every course on the path is learned. Keep the reviews going, or generate a new deck.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link to="/japanese/review" className={reviewable > 0 ? 'btn-primary' : 'btn-ghost'}>
                  Start review{reviewable > 0 ? ` (${reviewable})` : ''}
                </Link>
                <button className="btn-ghost" onClick={() => setCoreDeck(true)}>
                  Core deck
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="card mb-6 p-12 text-center">
          <p className="text-lg font-medium mb-1">No courses yet</p>
          <p className="text-sm text-gray-500 mb-5">
            A course groups grammar lessons and vocabulary decks. Create one to get started.
          </p>
          <Link to="/japanese/courses/new" className="btn-primary mx-auto inline-block">
            + Create a course
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Link to="/japanese/roadmap" className="btn-ghost">
          Roadmap
        </Link>
        <Link to="/japanese/review" className="btn-ghost">
          Review
        </Link>
        <Link to="/japanese/quiz" className="btn-ghost">
          Practice quiz
        </Link>
        <Link to="/japanese/mine" className="btn-ghost">
          Mine words
        </Link>
        <Link to="/japanese/dictionary" className="btn-ghost">
          Dictionary
        </Link>
        <Link to="/japanese/analyze" className="btn-ghost">
          Analyze text
        </Link>
        <Link to="/japanese/coverage" className="btn-ghost">
          Comprehension
        </Link>
        <Link to="/japanese/kana" className="btn-ghost">
          Kana drill
        </Link>
        <Link to="/japanese/write" className="btn-ghost">
          Writing drill
        </Link>
        <Link to="/japanese/test" className="btn-ghost">
          JLPT test
        </Link>
        <button className="btn-ghost" onClick={() => setCoreDeck(true)}>
          Core deck
        </button>
        <Link to="/japanese/stats" className="btn-ghost">
          Stats
        </Link>
      </div>

      {coreDeck && <CoreDeckDialog onClose={() => setCoreDeck(false)} />}
    </div>
  )
}
