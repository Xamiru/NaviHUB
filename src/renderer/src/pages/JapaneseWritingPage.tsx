import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { toastError } from '../lib/toast'
import QuizRecord from '../components/QuizRecord'
import StrokeCanvas from '../components/japanese/StrokeCanvas'
import StrokeOrderDiagram from '../components/japanese/StrokeOrderDiagram'
import { failureHint, strokeVerdict } from '@shared/strokeMatch'
import { splitReadings } from '@shared/romaji'
import type { Point } from '@shared/strokes'
import type { JpCard } from '@shared/types'

// Write the kanji, don't just read it. Prompts with the meaning and readings,
// then checks each drawn stroke against KanjiVG's reference in order — so
// stroke order and direction are what's actually being trained.
//
// Its own page rather than a fourth tab on the kana drill: the canvas, matcher
// and pack-absence handling have nothing to share with the typing drills.

const CANVAS = 260
const MAX_MISSES = 3 // after this many tries on one stroke, show it and move on

interface WritingItem {
  char: string
  meaning: string
  readings: string
  strokes: string[]
}

export default function JapaneseWritingPage() {
  const [items, setItems] = useState<WritingItem[] | null>(null)

  return (
    <div className="mx-auto max-w-3xl p-6">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Writing drill"
        subtitle="Draw each kanji from memory. Strokes are checked in order."
      />

      {items && items.length > 0 ? (
        <Drill items={items} onExit={() => setItems(null)} />
      ) : (
        <WritingSetup onStart={setItems} />
      )}
    </div>
  )
}

function WritingSetup({ onStart }: { onStart: (items: WritingItem[]) => void }) {
  const [courseId, setCourseId] = usePersistedState<number | null>('jpWritingCourse', null)
  const [loading, setLoading] = useState(false)
  const [emptyReason, setEmptyReason] = useState<string | null>(null)

  const { data: courses = [] } = useQuery({
    queryKey: qk.japanese.courses,
    queryFn: () => api.japanese.listCourses()
  })
  const { data: strokeSet, isLoading: checkingPack } = useQuery({
    queryKey: qk.dict.strokeSet,
    queryFn: () => api.dict.strokeSet()
  })

  // Same course predicate as the kanji reading drill.
  const kanjiCourses = courses.filter((c) => c.title.includes('Kanji') || c.title.includes('Radicals'))
  const effectiveCourseId = courseId ?? kanjiCourses[0]?.id ?? null

  async function start(): Promise<void> {
    if (effectiveCourseId == null) return
    setLoading(true)
    setEmptyReason(null)
    try {
      const detail = await api.japanese.getCourse(effectiveCourseId)
      if (!detail) return
      const cards: JpCard[] = []
      for (const lesson of detail.lessons.filter((l) => l.kind === 'kanji')) {
        const full = await api.japanese.getLesson(lesson.id)
        if (full) cards.push(...full.cards)
      }
      // Single-character fronts only — a kanji card's front IS the character.
      const singles = cards.filter((c) => [...c.front].length === 1)
      // One round trip per kanji, but issued together: a 200-card course would
      // otherwise mean 200 serialized IPC waits behind a bare "Loading…".
      const strokeData = await Promise.all(singles.map((c) => api.dict.strokes(c.front)))
      const built: WritingItem[] = []
      let missingStrokes = 0
      singles.forEach((c, i) => {
        const data = strokeData[i]
        if (!data) {
          missingStrokes += 1
          return
        }
        built.push({
          char: c.front,
          meaning: c.back,
          readings: [c.reading, c.onyomi, c.kunyomi]
            .filter((r): r is string => !!r)
            .flatMap((r) => splitReadings(r))
            .join('、'),
          strokes: data.strokes
        })
      })
      if (built.length === 0) {
        setEmptyReason(
          missingStrokes > 0
            ? 'None of this course’s kanji are covered by the stroke data.'
            : 'That course has no kanji cards.'
        )
        return
      }
      onStart(shuffle(built))
    } catch (e) {
      toastError(e)
    } finally {
      setLoading(false)
    }
  }

  if (checkingPack) return null

  if (!strokeSet) {
    return (
      <div className="card p-4 text-sm text-gray-400">
        <p className="mb-2">
          The writing drill needs stroke-order data. It&apos;s a one-time ~4&nbsp;MB download and then
          works offline like everything else.
        </p>
        <Link to="/settings" className="text-accent hover:underline">
          Settings → Japanese dictionaries → Download stroke order
        </Link>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        You&apos;ll see the meaning and readings — draw the character stroke by stroke.
      </p>
      <div className="mb-4 flex items-center gap-2">
        <select
          className="input max-w-sm"
          value={effectiveCourseId ?? ''}
          onChange={(e) => setCourseId(Number(e.target.value))}
        >
          {kanjiCourses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({c.cardCount} cards)
            </option>
          ))}
        </select>
        <button
          className="btn-primary shrink-0"
          disabled={loading || effectiveCourseId == null}
          onClick={() => void start()}
        >
          {loading ? 'Loading…' : 'Start drill'}
        </button>
      </div>
      {kanjiCourses.length === 0 && <p className="text-sm text-gray-500">No kanji courses found.</p>}
      {emptyReason && <p className="text-sm text-gray-500">{emptyReason}</p>}

      <QuizRecord kind="writing" />
    </div>
  )
}

function Drill({ items, onExit }: { items: WritingItem[]; onExit: () => void }) {
  const qc = useQueryClient()
  const [queue, setQueue] = useState<WritingItem[]>(items)
  const [index, setIndex] = useState(0)
  const [strokeIndex, setStrokeIndex] = useState(0)
  const [drawn, setDrawn] = useState<Point[][]>([])
  const [misses, setMisses] = useState(0)
  const [hint, setHint] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [missedThisChar, setMissedThisChar] = useState(false)
  const [done, setDone] = useState(false)

  // Scoring mirrors the kana drill: first-try-correct counts, missed characters
  // come back at the end of the round.
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const answeredRef = useRef(0)
  const loggedRef = useRef(false)

  const item = queue[index]

  useEffect(() => {
    if (!done || loggedRef.current) return
    loggedRef.current = true
    void (async () => {
      try {
        await api.quiz.logSession({
          kind: 'writing',
          score: correct,
          total: answeredRef.current,
          bestStreak,
          settings: {}
        })
        await qc.invalidateQueries({ queryKey: qk.quiz.history('writing') })
      } catch {
        // a failed log must not eat the user's round
      }
    })()
  }, [done, correct, bestStreak, qc])

  if (done) {
    return (
      <div className="card p-6 text-center">
        <p className="text-lg font-medium">Round complete</p>
        <p className="mt-1 text-sm text-gray-400">
          {correct} / {answeredRef.current} first try · best streak {bestStreak}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <button className="btn-primary" onClick={onExit}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }

  function nextCharacter(missed: boolean): void {
    answeredRef.current += 1
    if (missed) {
      setStreak(0)
      setQueue((q) => [...q, item]) // come back to it at the end
    } else {
      setCorrect((c) => c + 1)
      setStreak((s) => {
        const next = s + 1
        setBestStreak((b) => Math.max(b, next))
        return next
      })
    }
    setStrokeIndex(0)
    setDrawn([])
    setMisses(0)
    setHint(null)
    setMessage(null)
    setMissedThisChar(false)
    if (index + 1 >= queue.length && !missed) setDone(true)
    else setIndex((i) => i + 1)
  }

  function handleStroke(points: Point[]): void {
    const reference = item.strokes[strokeIndex]
    const verdict = strokeVerdict(points, reference, CANVAS)
    if (verdict.ok) {
      const nextStroke = strokeIndex + 1
      setDrawn((d) => [...d, points])
      setHint(null)
      setMessage(null)
      setMisses(0)
      if (nextStroke >= item.strokes.length) {
        nextCharacter(missedThisChar)
      } else {
        setStrokeIndex(nextStroke)
      }
      return
    }
    const nextMisses = misses + 1
    setMisses(nextMisses)
    setMissedThisChar(true)
    setMessage(failureHint(verdict.reason))
    setHint(reference)
    if (nextMisses >= MAX_MISSES) {
      // Show them the stroke and take it as done, so a hard character can't
      // become a wall. The hint must go with it — leaving it up would draw the
      // stroke we just skipped under the NEXT one they're asked for.
      setMessage('Here’s that stroke — keep going.')
      setHint(null)
      setStrokeIndex((s) => s + 1)
      setDrawn((d) => [...d, points])
      setMisses(0)
      if (strokeIndex + 1 >= item.strokes.length) nextCharacter(true)
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-sm text-gray-400">
          {index + 1} / {queue.length} · stroke {strokeIndex + 1} of {item.strokes.length}
        </p>
        <p className="text-xs text-gray-500">
          {correct} correct · streak {streak}
        </p>
      </div>

      <div className="card p-5">
        <p className="text-lg font-medium">{item.meaning}</p>
        {item.readings && <p className="mt-0.5 text-sm text-gray-400">{item.readings}</p>}

        <div className="mt-4 flex flex-wrap items-start gap-4">
          <StrokeCanvas
            size={CANVAS}
            committed={drawn}
            hintPath={hint}
            onStroke={handleStroke}
          />
          <div className="min-w-0 flex-1">
            {message && <p className="mb-2 text-sm text-amber-300">{message}</p>}
            <div className="flex flex-wrap gap-2">
              <button
                className="btn-ghost"
                onClick={() => {
                  setDrawn([])
                  setStrokeIndex(0)
                  setHint(null)
                  setMessage(null)
                  setMisses(0)
                  setMissedThisChar(true)
                }}
              >
                Start over
              </button>
              <button
                className="btn-ghost"
                onClick={() => {
                  setHint(item.strokes[strokeIndex])
                  setMissedThisChar(true)
                }}
              >
                Show this stroke
              </button>
              <button className="btn-ghost" onClick={() => nextCharacter(true)}>
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button className="btn-ghost" onClick={onExit}>
          End drill
        </button>
        <details className="text-sm">
          <summary className="cursor-pointer text-gray-500 hover:text-gray-300">Reveal the answer</summary>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-4xl">{item.char}</span>
            <StrokeOrderDiagram char={item.char} size={110} />
          </div>
        </details>
      </div>
    </div>
  )
}

function shuffle<T>(list: T[]): T[] {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
