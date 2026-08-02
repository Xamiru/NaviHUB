import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import EmptyState from '../components/EmptyState'
import HubCard from '../components/HubCard'
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
            {/* Ghost on purpose: the page's one filled action is Start review below */}
            {hasCourses && (
              <Link to="/japanese/courses/new" className="btn-ghost">
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
        <Section title="Continue">
          <div className="card p-4">
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
        </Section>
      ) : (
        <EmptyState
          className="card mb-8 p-12 text-center"
          title="No courses yet"
          body="A course groups grammar lessons and vocabulary decks. Create one."
          action={
            <Link to="/japanese/courses/new" className="btn-primary">
              Create a course
            </Link>
          }
        />
      )}

      <Section title="Study">
        <HubGrid>
          <HubCard to="/japanese/roadmap" title="Roadmap" body="The course path, step by step." />
          <HubCard
            to="/japanese/review"
            title="Review"
            body="Spaced repetition over everything learned."
            badge={due > 0 ? `${due} due` : undefined}
          />
          {/* onClick variant — opens a dialog, honestly placed inside the group */}
          <HubCard
            onClick={() => setCoreDeck(true)}
            title="Core deck"
            body="Generate the next most-frequent words you don't know."
          />
          <HubCard
            to="/japanese/feed"
            title="Sentence feed"
            body="Read sentences one new word at a time."
          />
        </HubGrid>
      </Section>

      <Section title="Practice">
        <HubGrid>
          <HubCard to="/japanese/quiz" title="Practice quiz" body="Multiple choice, no scheduling." />
          <HubCard
            to="/japanese/kana"
            title="Typing drills"
            body="Kana, kanji readings, verb forms, numbers, names, keigo."
          />
          <HubCard to="/japanese/write" title="Writing drill" body="Draw kanji stroke by stroke." />
          <HubCard to="/japanese/test" title="JLPT test" body="Timed 30-question checkpoint." />
          <HubCard
            to="/japanese/pitch"
            title="Pitch accent"
            body="Learn the patterns, hear them, say them."
          />
          <HubCard
            to="/japanese/confusables"
            title="Confusables"
            body="Look-alike kanji, verb pairs, homophones."
          />
          <HubCard
            to="/japanese/loanwords"
            title="Loanwords"
            body="Katakana words you secretly already know."
          />
          <HubCard
            to="/japanese/listen"
            title="Dictation"
            body="Hear a real sentence, type it back."
          />
          <HubCard
            to="/japanese/grammar/quiz"
            title="Grammar drill"
            body="Fill the blank across N5-N1 points."
          />
          <HubCard
            to="/japanese/kanji/quiz"
            title="Build-a-kanji"
            body="Assemble kanji from their parts."
          />
          <HubCard
            to="/japanese/shiritori"
            title="Shiritori"
            body="Word chain against the dictionary."
          />
        </HubGrid>
      </Section>

      <Section title="Read & mine">
        <HubGrid>
          <HubCard to="/japanese/mine" title="Mine words" body="Capture words into the SRS." />
          <HubCard to="/japanese/analyze" title="Analyze text" body="How much of a paste can you read?" />
          <HubCard
            to="/japanese/coverage"
            title="Comprehension"
            body="Known-word scores for your series."
          />
        </HubGrid>
      </Section>

      <Section title="Reference">
        <HubGrid>
          <HubCard
            to="/japanese/dictionary"
            title="Dictionary"
            body="Offline lookup, examples, stroke order."
          />
          <HubCard
            to="/japanese/grammar"
            title="Grammar"
            body="Every N5-N1 grammar point, searchable."
          />
          <HubCard
            to="/japanese/kanji"
            title="Kanji by parts"
            body="Find a kanji from the pieces you can see."
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

