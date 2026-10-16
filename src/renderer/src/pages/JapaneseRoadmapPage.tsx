import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import RoadmapMilestones from '../components/japanese/RoadmapMilestones'
import JlptLadder from '../components/japanese/JlptLadder'
import type { JpPathTrack, JpRoadmapCourse } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'
import CoreDeckDialog from '../components/japanese/CoreDeckDialog'
import KanjiDeckDialog from '../components/japanese/KanjiDeckDialog'
import { checkpointSpan, PATH_TRACKS, type PathTrackId } from '@shared/japanese/pathTracks'

// The study path, start to finish. Seeded courses carry a step number and lay
// out in order; everything the user or the app generated (mining inbox, prep
// decks, core decks) lists separately below. Nothing is ever locked — later
// steps just look further away.
export default function JapaneseRoadmapPage() {
  const { data: roadmap, isLoading } = useQuery({
    queryKey: qk.japanese.roadmap,
    queryFn: () => api.japanese.roadmap()
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!roadmap) return <PageStatus>The course path could not be loaded.</PageStatus>

  const frontierIndex = roadmap.steps.findIndex((c) => c.id === roadmap.frontierCourseId)

  return (
    <EditorialDetailFrame width="wide">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Path"
        subtitle="Every course in order, from your first lesson to native material. Start anywhere; nothing is locked."
      />

      <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <Section title="Courses" subtitle="where you are now is highlighted">
            <div className="relative space-y-3 before:absolute before:bottom-5 before:left-[27px] before:top-5 before:w-px before:bg-accent/20">
              <KanaStepRow />
              {roadmap.steps.map((course, i) => (
                <Fragment key={course.id}>
                  <StepRow
                    course={course}
                    state={
                      course.id === roadmap.frontierCourseId
                        ? 'current'
                        : frontierIndex >= 0 && i > frontierIndex
                          ? 'upcoming'
                          : course.lessonCount > 0 && course.learnedLessonCount >= course.lessonCount
                            ? 'cleared'
                            : 'started'
                    }
                  />
                  {course.seedKey && <TrackStepRow seedKey={course.seedKey} tracks={roadmap.tracks} />}
                </Fragment>
              ))}
            </div>
          </Section>

          <Section
            title="Unscheduled"
            subtitle={<Link to="/japanese/courses/new" className="hover:text-accent">+ New course</Link>}
          >
            {roadmap.unscheduled.length === 0 ? (
              <p className="text-sm text-gray-500">
                Mined words, series prep decks and core decks will show up here.
              </p>
            ) : (
              <div className="space-y-2">
                {roadmap.unscheduled.map((course) => (
                  <StepRow key={course.id} course={course} state="started" />
                ))}
              </div>
            )}
          </Section>
        </div>
        <aside className="min-w-0 space-y-6">
          <Section title="JLPT ladder" subtitle="progress, not a gate">
            <JlptLadder />
          </Section>
          <Section title="Milestones">
            <RoadmapMilestones />
          </Section>
        </aside>
      </div>
    </EditorialDetailFrame>
  )
}

// Step 00: kana. Not a course — the typing drill is the whole curriculum — but
// the path silently assumes it, so it belongs on the path. "Practiced" (never
// "Cleared") because an endless drill has no honest done-state; the signal is
// simply that kana rounds have been logged.
function KanaStepRow() {
  const { data: history } = useQuery({
    queryKey: qk.quiz.history('kana'),
    queryFn: () => api.quiz.history('kana')
  })
  const practiced = (history?.totalSessions ?? 0) > 0
  return (
    <Link to="/japanese/kana" className="card group relative z-[1] block border-l-2 border-l-base-700 p-4">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
          Step 00
        </span>
        {practiced && <span className="chip bg-signal-affirmative/20 text-signal-affirmative">Practiced</span>}
      </div>
      <p className="mt-1 font-medium group-hover:text-accent">Kana</p>
      <p className="mt-1.5 text-xs text-gray-500">
        Hiragana and katakana in the typing drill — grind until reading them is automatic. Not a
        course; everything after assumes it.
      </p>
    </Link>
  )
}

// The deck tracks on the path (@shared/japanese/pathTracks.ts): the curated
// courses teach about 600 words and 715 kanji, and reading needs about 10,000
// and 2,000. After a checkpoint course this row says how much of each track
// should be built by then, offers the next deck and links its next lesson. It
// reads the decks from the roadmap's tracks, never a seeded course.
const TRACK_TEXT: Record<PathTrackId, { label: string; unit: string; body: string }> = {
  words: {
    label: 'Core words',
    unit: 'words',
    body: 'The most frequent words you do not have yet, with example sentences.'
  },
  kanji: {
    label: 'More kanji',
    unit: 'kanji',
    body: 'Kanji no course covers yet: the ones in your own words first, then the most common.'
  }
}

function TrackStepRow({ seedKey, tracks }: { seedKey: string; tracks: Record<PathTrackId, JpPathTrack> }) {
  const [open, setOpen] = useState<PathTrackId | null>(null)
  const lines = (['words', 'kanji'] as const).flatMap((id) => {
    const span = checkpointSpan(id, seedKey)
    return span ? [{ id, span, track: tracks[id] }] : []
  })
  if (lines.length === 0) return null
  return (
    <div className="card relative z-[1] space-y-3 border-l-2 border-l-base-700 p-4">
      {lines.map(({ id, span, track }) => {
        const text = TRACK_TEXT[id]
        const done = track.built >= span.to
        // The Build button and the next deck lesson sit on the track's first
        // unfinished checkpoint (or its last one once everything is built).
        const list = PATH_TRACKS[id]
        const active = (list.find((cp) => cp.target > track.built) ?? list[list.length - 1]).seedKey === seedKey
        return (
          <div key={id}>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">{text.label}</span>
              {done && <span className="chip bg-signal-affirmative/20 text-signal-affirmative">Built</span>}
            </div>
            <p className="mt-1 font-medium">
              {span.from === 0 ? 'The first' : `Up to`} {span.to.toLocaleString()} {text.unit}
              {span.from > 0 && (
                <span className="font-normal text-gray-400"> (+{(span.to - span.from).toLocaleString()})</span>
              )}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {text.body} {Math.min(track.built, span.to).toLocaleString()} of {span.to.toLocaleString()} built.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {!done && active && (
                <button type="button" className="btn-ghost text-sm" onClick={() => setOpen(id)}>
                  Build the next {id === 'words' ? 'word' : 'kanji'} deck
                </button>
              )}
              {active && track.nextLesson && (
                <Link to={`/japanese/lessons/${track.nextLesson.id}`} className="text-sm text-signal-link hover:underline">
                  Next: {track.nextLesson.courseTitle} · {track.nextLesson.title}
                </Link>
              )}
            </div>
          </div>
        )
      })}
      {open === 'words' && <CoreDeckDialog onClose={() => setOpen(null)} />}
      {open === 'kanji' && <KanjiDeckDialog onClose={() => setOpen(null)} />}
    </div>
  )
}

type StepState = 'cleared' | 'current' | 'started' | 'upcoming'

function StepRow({ course, state }: { course: JpRoadmapCourse; state: StepState }) {
  const pct = course.lessonCount
    ? Math.round((course.learnedLessonCount / course.lessonCount) * 100)
    : 0
  return (
    <Link
      to={`/japanese/courses/${course.id}`}
      className={`card group relative z-[1] block border-l-2 p-4 ${
        state === 'current' ? 'border-l-accent' : 'border-l-base-700'
      } ${state === 'upcoming' ? 'opacity-60' : ''}`}
    >
      <div className="flex items-baseline gap-2">
        {course.difficulty != null && (
          <span
            className={`font-mono text-[11px] uppercase tracking-widest ${
              state === 'current' ? 'text-accent' : 'text-gray-500'
            }`}
          >
            Step {String(course.difficulty).padStart(2, '0')}
          </span>
        )}
        {course.level && <span className="chip bg-base-700 text-gray-400">{course.level}</span>}
        {state === 'cleared' && <span className="chip bg-signal-affirmative/20 text-signal-affirmative">Cleared</span>}
        {state === 'current' && <span className="chip bg-accent/20 text-accent">You are here</span>}
        {course.dueCardCount > 0 && (
          <span className="ml-auto text-xs text-signal-caution">{course.dueCardCount} due</span>
        )}
      </div>
      <p className="mt-1 font-medium group-hover:text-accent">{course.title}</p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1.5 text-xs text-gray-500">
        {course.learnedLessonCount} / {course.lessonCount}{' '}
        {course.lessonCount === 1 ? 'lesson' : 'lessons'} learned · {course.seenCardCount} /{' '}
        {course.cardCount} cards seen
      </p>
    </Link>
  )
}
