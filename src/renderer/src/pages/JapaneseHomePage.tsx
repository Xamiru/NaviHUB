import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import EmptyState from '../components/EmptyState'
import CoreDeckDialog from '../components/japanese/CoreDeckDialog'

// The section's dashboard: where you stand, what to do next, and one card per
// tool — grouped, with a line each on what it's for (the QuizLandingPage
// pattern). The full course list lives on the roadmap page.
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

  const due = stats?.dueCount ?? 0
  const reviewable = due + (stats?.newAvailableCount ?? 0)
  const frontier = roadmap?.steps.find((c) => c.id === roadmap.frontierCourseId) ?? null
  const hasCourses = (roadmap?.steps.length ?? 0) + (roadmap?.unscheduled.length ?? 0) > 0

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Japanese"
        subtitle="Study lessons, mark them as learned, then practice with reviews and quizzes."
        actions={
          <>
            <Link to="/japanese/guide" className="btn-ghost">
              Guide
            </Link>
            <Link to="/japanese/stats" className="btn-ghost">
              Stats
            </Link>
            {hasCourses && (
              <Link to="/japanese/courses/new" className="btn-primary">
                New course
              </Link>
            )}
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <StatTile label="Due for review" value={due} accent={due > 0} />
        <StatTile label="New cards ready" value={stats?.newAvailableCount ?? 0} />
        <StatTile
          label="Lessons learned"
          value={`${stats?.learnedLessons ?? 0} / ${stats?.totalLessons ?? 0}`}
        />
        <StatTile label="Reviews today" value={stats?.reviewsToday ?? 0} />
      </div>

      {hasCourses ? (
        <div className="card mb-8 p-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
            Continue
          </h2>
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
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-400">
                Every course on the path is learned. Keep the reviews going, or generate a new deck
                below.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link to="/japanese/review" className={reviewable > 0 ? 'btn-primary' : 'btn-ghost'}>
                  Start review{reviewable > 0 ? ` (${reviewable})` : ''}
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        <EmptyState
          className="card mb-8 p-12 text-center"
          title="No courses yet"
          body="A course groups grammar lessons and vocabulary decks. Create one to get started."
          action={
            <Link to="/japanese/courses/new" className="btn-primary">
              Create a course
            </Link>
          }
        />
      )}

      <Section title="Study">
        <HubGrid>
          <HubCard to="/japanese/roadmap" title="Roadmap" desc="The course path, step by step." />
          <HubCard
            to="/japanese/review"
            title="Review"
            desc="Spaced repetition over everything learned."
            badge={due > 0 ? `${due} due` : undefined}
          />
          <HubButton
            onClick={() => setCoreDeck(true)}
            title="Core deck"
            desc="Generate the next most-frequent words you don't know."
          />
        </HubGrid>
      </Section>

      <Section title="Practice">
        <HubGrid>
          <HubCard to="/japanese/quiz" title="Practice quiz" desc="Multiple choice, no scheduling." />
          <HubCard
            to="/japanese/kana"
            title="Kana & conjugation drills"
            desc="Kana, kanji readings, verb forms."
          />
          <HubCard to="/japanese/write" title="Writing drill" desc="Draw kanji stroke by stroke." />
          <HubCard to="/japanese/test" title="JLPT test" desc="Timed 30-question checkpoint." />
        </HubGrid>
      </Section>

      <Section title="Read & mine">
        <HubGrid>
          <HubCard to="/japanese/mine" title="Mine words" desc="Capture words into the SRS." />
          <HubCard to="/japanese/analyze" title="Analyze text" desc="How much of a paste can you read?" />
          <HubCard
            to="/japanese/coverage"
            title="Comprehension"
            desc="Known-word scores for your series."
          />
        </HubGrid>
      </Section>

      <Section title="Reference">
        <HubGrid>
          <HubCard
            to="/japanese/dictionary"
            title="Dictionary"
            desc="Offline lookup, examples, stroke order."
          />
        </HubGrid>
      </Section>

      {coreDeck && <CoreDeckDialog onClose={() => setCoreDeck(false)} />}
    </div>
  )
}

function HubGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">{children}</div>
  )
}

function HubCard({
  to,
  title,
  desc,
  badge
}: {
  to: string
  title: string
  desc: string
  badge?: string
}) {
  return (
    <Link to={to} className="card group p-4 transition-colors hover:border-accent">
      <p className="font-semibold transition-colors group-hover:text-accent">
        {title}
        {badge && <span className="ml-2 text-xs font-normal text-accent">{badge}</span>}
      </p>
      <p className="mt-1 text-xs text-gray-500">{desc}</p>
    </Link>
  )
}

// Same card, but it opens a dialog — placed honestly inside a group instead of
// masquerading as navigation in a link row.
function HubButton({ onClick, title, desc }: { onClick: () => void; title: string; desc: string }) {
  return (
    <button onClick={onClick} className="card group p-4 text-left transition-colors hover:border-accent">
      <p className="font-semibold transition-colors group-hover:text-accent">{title}</p>
      <p className="mt-1 text-xs text-gray-500">{desc}</p>
    </button>
  )
}
