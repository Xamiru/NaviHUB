// The two tracks that run beside the course path: core word decks and kanji
// decks. The curated courses teach about 600 JLPT words and 715 kanji; reading
// native text needs about 10,000 words and 2,000 kanji, and the deck builders
// (coreDeck.ts, kanjiDeck.ts) fill that gap from the offline dictionaries.
//
// Each map says how much of a track should be built once a course is cleared
// (every lesson learned), keyed by the course's frozen seed key. The track is
// never a gate: courses stay open whatever the deck count. The Path shows a
// row after each checkpoint course, and Today offers the next deck step on the
// days new material is due (tutor.ts).

export type PathTrackId = 'words' | 'kanji'

export interface PathCheckpoint {
  seedKey: string
  target: number
}

// Words in core frequency decks (on top of the ~600 curated JLPT words), so the
// running total roughly meets each JLPT level's vocabulary by its last course.
export const WORD_CHECKPOINTS: readonly PathCheckpoint[] = [
  { seedKey: 'kanji', target: 500 },
  { seedKey: 'n4vocab', target: 1000 },
  { seedKey: 'n3', target: 1500 },
  { seedKey: 'n3b', target: 2000 },
  { seedKey: 'n3c', target: 2500 },
  { seedKey: 'n3vocab', target: 3000 },
  { seedKey: 'n2a', target: 3500 },
  { seedKey: 'n2b', target: 4000 },
  { seedKey: 'n2c', target: 4500 },
  { seedKey: 'n2d', target: 5000 },
  { seedKey: 'n2vocab', target: 5500 },
  { seedKey: 'n1a', target: 6500 },
  { seedKey: 'n1b', target: 7500 },
  { seedKey: 'n1c', target: 8000 },
  { seedKey: 'n1d', target: 8500 },
  { seedKey: 'n1vocab', target: 9000 },
  { seedKey: 'n1kanji', target: 9500 }
]

// Kanji in kanji decks (on top of the 715 in the curated kanji courses), so the
// total reaches the ~2,100 of the jōyō list by the end of N1.
export const KANJI_CHECKPOINTS: readonly PathCheckpoint[] = [
  { seedKey: 'n3', target: 100 },
  { seedKey: 'n3b', target: 200 },
  { seedKey: 'n3c', target: 300 },
  { seedKey: 'n3vocab', target: 400 },
  { seedKey: 'n3kanji', target: 500 },
  { seedKey: 'n2a', target: 600 },
  { seedKey: 'n2b', target: 700 },
  { seedKey: 'n2c', target: 800 },
  { seedKey: 'n2d', target: 900 },
  { seedKey: 'n2vocab', target: 950 },
  { seedKey: 'n2kanji', target: 1000 },
  { seedKey: 'n1a', target: 1100 },
  { seedKey: 'n1b', target: 1200 },
  { seedKey: 'n1c', target: 1250 },
  { seedKey: 'n1d', target: 1300 },
  { seedKey: 'n1vocab', target: 1350 },
  { seedKey: 'n1kanji', target: 1400 }
]

export const PATH_TRACKS: Readonly<Record<PathTrackId, readonly PathCheckpoint[]>> = {
  words: WORD_CHECKPOINTS,
  kanji: KANJI_CHECKPOINTS
}

// Course titles the deck builders write; the count of their cards is a track's
// "built" total. Kept here so the main process and the renderer agree.
export const CORE_DECK_TITLE = /^Core frequency deck #\d+$/
export const KANJI_DECK_TITLE = /^Kanji deck #\d+$/

export interface TrackCourse {
  seedKey: string | null
  lessonCount: number
  learnedLessonCount: number
}

// The track's target given the courses cleared so far: the highest checkpoint
// whose course has every lesson learned.
export function trackTarget(track: PathTrackId, courses: readonly TrackCourse[]): number {
  const cleared = new Set(
    courses
      .filter((c) => c.seedKey && c.lessonCount > 0 && c.learnedLessonCount >= c.lessonCount)
      .map((c) => c.seedKey as string)
  )
  let target = 0
  for (const cp of PATH_TRACKS[track]) if (cleared.has(cp.seedKey)) target = Math.max(target, cp.target)
  return target
}

// The span a checkpoint adds, for the Path row after its course.
export function checkpointSpan(track: PathTrackId, seedKey: string): { from: number; to: number } | null {
  const list = PATH_TRACKS[track]
  const i = list.findIndex((cp) => cp.seedKey === seedKey)
  if (i < 0) return null
  return { from: i === 0 ? 0 : list[i - 1].target, to: list[i].target }
}

export interface TrackState {
  built: number
  target: number
  nextLesson: { id: number; title: string; courseTitle: string } | null
}

export interface DeckStep {
  track: PathTrackId
  title: string
  detail: string
  route: string
}

// What a track asks for today: a built deck's next lesson first, else a new
// deck once the built total is short of the target. Null when the track is on
// pace. Word decks lead; kanji take every third day when both have a step.
export function nextDeckStep(tracks: Record<PathTrackId, TrackState>, dayIndex: number): DeckStep | null {
  const step = (id: PathTrackId): DeckStep | null => {
    const t = tracks[id]
    const noun = id === 'words' ? 'core words' : 'kanji'
    if (t.nextLesson) {
      return {
        track: id,
        title: `Learn: ${t.nextLesson.courseTitle} · ${t.nextLesson.title}`,
        detail: `Mark it learned when you have read it through; its ${noun} join your reviews on a later day.`,
        route: `/japanese/lessons/${t.nextLesson.id}`
      }
    }
    if (t.built < t.target) {
      return {
        track: id,
        title: id === 'words' ? 'Build your next core word deck' : 'Build your next kanji deck',
        detail: `Your path calls for ${t.target.toLocaleString()} ${noun} from decks by now and ${t.built.toLocaleString()} are built. Build the next deck from the Path.`,
        route: '/japanese/roadmap'
      }
    }
    return null
  }
  const words = step('words')
  const kanji = step('kanji')
  if (words && kanji) return dayIndex % 3 === 2 ? kanji : words
  return words ?? kanji
}
