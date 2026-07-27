import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { gradeCard, LEECH_LAPSES, previewIntervals, type SrsState } from '@shared/srs'
import { buildTypedPrompt } from '@shared/cloze'
import CardSourceBadge from '../components/CardSourceBadge'
import type { JpReviewCard, SrsGrade } from '@shared/types'

type Phase = 'setup' | 'review' | 'done'

// A session item: card content plus its live SRS state. The renderer advances
// the state with the same pure gradeCard() the main process persists with, so
// requeued cards preview correct next-intervals without refetching.
interface SessionItem {
  card: JpReviewCard
  srs: SrsState
}

function toItem(card: JpReviewCard): SessionItem {
  return {
    card,
    srs: {
      status: card.status,
      learningStep: card.learningStep,
      intervalDays: card.intervalDays,
      ease: card.ease,
      reps: card.reps,
      lapses: card.lapses
    }
  }
}

const GRADE_KEYS: Record<string, SrsGrade> = { '1': 'again', '2': 'hard', '3': 'good', '4': 'easy' }
const GRADE_STYLE: Record<SrsGrade, string> = {
  again: 'border-red-500/50 hover:bg-red-500/15 text-red-300',
  hard: 'border-amber-500/50 hover:bg-amber-500/15 text-amber-300',
  good: 'border-green-500/50 hover:bg-green-500/15 text-green-300',
  easy: 'border-sky-500/50 hover:bg-sky-500/15 text-sky-300'
}
const GRADE_LABEL: Record<SrsGrade, string> = {
  again: 'Again',
  hard: 'Hard',
  good: 'Good',
  easy: 'Easy'
}

export default function JapaneseReviewPage() {
  const qc = useQueryClient()
  const [newLimit, setNewLimit] = usePersistedState<number>('jpNewLimit', 10)
  // Bunpro-style typed answers. Only suggests a grade — the four buttons still
  // decide, so SM-2 semantics (and phone sync) are untouched.
  const [typedMode, setTypedMode] = usePersistedState<boolean>('jpTypedMode', false)

  const { data: stats } = useQuery({
    queryKey: qk.japanese.stats,
    queryFn: () => api.japanese.stats()
  })

  const [phase, setPhase] = useState<Phase>('setup')
  const [queue, setQueue] = useState<SessionItem[]>([])
  const [revealed, setRevealed] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [misses, setMisses] = useState(0)
  const [grading, setGrading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  // Typed-answer state for the card on screen.
  const [typed, setTyped] = useState('')
  const [checked, setChecked] = useState<{ correct: boolean } | null>(null)

  const current = queue[0] ?? null
  // Null when this card can't produce a good prompt — it just flips as before.
  const prompt =
    typedMode && current
      ? buildTypedPrompt(current.card, current.card.lessonKind, current.card.lessonTitle)
      : null

  async function start() {
    setError(null)
    setLoading(true)
    try {
      const { due, fresh } = await api.japanese.reviewQueue(newLimit)
      const items = [...due, ...fresh].map(toItem)
      if (items.length === 0) {
        setError(
          'Nothing to review. Mark lessons as learned to introduce their cards, or come back when scheduled cards are due.'
        )
        return
      }
      setQueue(items)
      setReviewed(0)
      setMisses(0)
      setRevealed(false)
      setPhase('review')
    } finally {
      setLoading(false)
    }
  }

  const grade = useCallback(
    async (g: SrsGrade) => {
      if (!current || grading) return
      setGrading(true)
      try {
        await api.japanese.submitReview(current.card.id, g)
        const next = gradeCard(current.srs, g)
        setReviewed((n) => n + 1)
        if (g === 'again') setMisses((n) => n + 1)
        setRevealed(false)
        setTyped('')
        setChecked(null)
        setQueue((q) => {
          const rest = q.slice(1)
          // Cards still in a learning step come back later this session
          // (Anki-style); graduated/rescheduled cards leave it.
          return next.status === 'learning' ? [...rest, { card: current.card, srs: next }] : rest
        })
      } finally {
        setGrading(false)
      }
    },
    [current, grading]
  )

  // Session over when the queue drains.
  useEffect(() => {
    if (phase === 'review' && queue.length === 0) {
      setPhase('done')
      void qc.invalidateQueries({ queryKey: qk.japanese.all })
    }
  }, [phase, queue.length, qc])

  // Space reveals; 1–4 grade. In typed mode the answer box owns Enter (checking,
  // then submitting the suggested grade), so events from it are ignored here.
  useEffect(() => {
    if (phase !== 'review') return
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setRevealed(true)
      } else if (revealed && GRADE_KEYS[e.key]) {
        e.preventDefault()
        void grade(GRADE_KEYS[e.key])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, revealed, grade])

  // What the typed answer suggests: got it → Good, missed it → Again. Only a
  // highlight; the user still picks.
  const suggested: SrsGrade | null = checked ? (checked.correct ? 'good' : 'again') : null

  function checkTyped(): void {
    if (!prompt || checked) return
    setChecked({ correct: prompt.accept(typed) })
    setRevealed(true)
  }

  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/japanese" className="text-sm text-gray-500 hover:text-white">
            ← Japanese
          </Link>
          <h1 className="mt-1 text-2xl font-bold">📇 Review</h1>
          <p className="text-sm text-gray-500">
            Spaced-repetition flashcards over everything you have marked as learned.
          </p>
        </div>

        <div className="card p-5 space-y-5">
          <div className="flex gap-6 text-sm">
            <span>
              <span className="text-2xl font-bold text-accent">{stats?.dueCount ?? 0}</span>{' '}
              <span className="text-gray-400">due</span>
            </span>
            <span>
              <span className="text-2xl font-bold">{stats?.newAvailableCount ?? 0}</span>{' '}
              <span className="text-gray-400">new available</span>
            </span>
          </div>

          <div>
            <div className="label mb-2">New cards this session</div>
            <div className="flex flex-wrap gap-2">
              {[0, 5, 10, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setNewLimit(n)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    newLimit === n
                      ? 'bg-accent text-white'
                      : 'bg-base-700 text-gray-300 hover:bg-base-600'
                  }`}
                >
                  {n === 0 ? 'None' : n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={typedMode}
                onChange={(e) => setTypedMode(e.target.checked)}
              />
              <span className="text-sm">
                Typed answers
                <span className="block text-xs text-gray-500">
                  Fill in the blank on grammar cards and type readings on vocabulary. Cards that
                  can&apos;t be typed just flip as usual.
                </span>
              </span>
            </label>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button className="btn-primary w-full" disabled={loading} onClick={start}>
            {loading ? 'Loading…' : 'Start review'}
          </button>
          <p className="text-center text-xs text-gray-400">
            Space to flip · 1 Again · 2 Hard · 3 Good · 4 Easy
          </p>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">Session complete</p>
          <p className="mt-3 text-5xl font-bold">{reviewed}</p>
          <p className="mt-1 text-sm text-gray-400">
            {reviewed === 1 ? 'review' : 'reviews'}
            {misses > 0 && ` · ${misses} again`}
          </p>
          <div className="mt-6 flex gap-2">
            <button className="btn-primary flex-1" onClick={() => setPhase('setup')}>
              Review more
            </button>
            <Link to="/japanese" className="btn-ghost flex-1 text-center">
              Done
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!current) return null
  const { card, srs } = current
  const previews = previewIntervals(srs)

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
        <span>{queue.length} left</span>
        <div className="flex items-center gap-3">
          <span>{reviewed} reviewed</span>
          {srs.status === 'new' && <span className="chip bg-sky-500/20 text-sky-300">new</span>}
          {srs.status === 'learning' && (
            <span className="chip bg-amber-500/20 text-amber-300">learning</span>
          )}
          {srs.lapses >= LEECH_LAPSES && (
            <span className="chip bg-red-500/20 text-red-300" title={`Lapsed ${srs.lapses} times`}>
              leech
            </span>
          )}
          <button
            className="btn-ghost py-1 px-2 text-xs"
            onClick={() => {
              setQueue([])
            }}
          >
            ✕ End session
          </button>
        </div>
      </div>

      <div className="card p-8 text-center min-h-[260px] flex flex-col items-center justify-center">
        {prompt ? (
          <>
            <p className="text-3xl leading-relaxed">{prompt.display}</p>
            {prompt.hint && <p className="mt-3 text-sm text-gray-400">{prompt.hint}</p>}
            {checked && (
              <p
                className={`mt-3 text-sm ${checked.correct ? 'text-green-300' : 'text-red-300'}`}
              >
                {checked.correct ? 'Correct' : `Answer: ${prompt.reveal}`}
                {!checked.correct && typed.trim() && (
                  <span className="ml-2 text-gray-500">(you typed {typed.trim()})</span>
                )}
              </p>
            )}
          </>
        ) : (
          <p className="text-3xl leading-relaxed">{card.front}</p>
        )}
        {revealed && (
          <>
            {prompt && <p className="mt-4 text-2xl leading-relaxed">{card.front}</p>}
            {card.reading && card.reading !== card.front && (
              <p className="mt-3 text-lg text-gray-400">{card.reading}</p>
            )}
            <p className="mt-3 text-xl text-gray-100">{card.back}</p>
            {(card.onyomi || card.kunyomi) && (
              <p className="mt-2 text-sm text-gray-400">
                {card.onyomi && (
                  <span className="mr-4">
                    <span className="mr-1 text-xs text-gray-400">音</span>
                    {card.onyomi}
                  </span>
                )}
                {card.kunyomi && (
                  <span>
                    <span className="mr-1 text-xs text-gray-400">訓</span>
                    {card.kunyomi}
                  </span>
                )}
              </p>
            )}
            {card.pos && <p className="mt-2 text-xs text-gray-500">{card.pos}</p>}
            {card.notes && <p className="mt-2 text-sm text-gray-500">{card.notes}</p>}
            {card.exampleJp && (
              <div className="mt-4 border-t border-base-700 pt-3 text-sm text-gray-400">
                <p>
                  {card.exampleJp}
                  {card.exampleReading && (
                    <span className="ml-2 text-xs text-gray-500">{card.exampleReading}</span>
                  )}
                </p>
                {card.exampleEn && <p className="mt-0.5 text-xs text-gray-500">{card.exampleEn}</p>}
              </div>
            )}
            {card.sourceTitle && (
              <div className="mt-3">
                <CardSourceBadge card={card} />
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        {prompt && !checked ? (
          <div className="flex gap-2">
            <input
              className="input flex-1"
              autoFocus
              placeholder="Type the missing part — kana or romaji"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  checkTyped()
                }
              }}
            />
            <button className="btn-primary shrink-0" onClick={checkTyped}>
              Check
            </button>
            <button
              className="btn-ghost shrink-0"
              onClick={() => {
                setChecked({ correct: false })
                setRevealed(true)
              }}
            >
              Reveal instead
            </button>
          </div>
        ) : !revealed ? (
          <button className="btn-primary w-full" onClick={() => setRevealed(true)}>
            Show answer
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {(['again', 'hard', 'good', 'easy'] as SrsGrade[]).map((g) => (
              <button
                key={g}
                disabled={grading}
                onClick={() => void grade(g)}
                className={`rounded-lg border bg-base-800 px-2 py-3 text-center transition-colors ${
                  GRADE_STYLE[g]
                } ${g === suggested ? 'ring-2 ring-accent' : ''}`}
              >
                <span className="block text-sm font-semibold">{GRADE_LABEL[g]}</span>
                <span className="mt-0.5 block text-xs opacity-70">{previews[g]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
