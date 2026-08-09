import { useCallback, useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { gradeCard, LEECH_LAPSES, overdueDays, previewIntervals, type SrsState } from '@shared/srs'
import type { EnWord, SrsGrade } from '@shared/types'

// SRS review over the saved English words (the JapaneseReviewPage port, minus
// typed mode): front = the word, back = the chosen definition. The renderer
// advances SRS state with the same pure gradeCard() main persists with, so
// requeued learning cards preview correct next-intervals without refetching.

type Phase = 'setup' | 'review' | 'done'

interface SessionItem {
  word: EnWord
  srs: SrsState
}

function toItem(word: EnWord): SessionItem {
  return {
    word,
    srs: {
      status: word.status,
      learningStep: word.learningStep,
      intervalDays: word.intervalDays,
      ease: word.ease,
      reps: word.reps,
      lapses: word.lapses
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

export default function EnglishReviewPage() {
  const qc = useQueryClient()
  const [newLimit, setNewLimit] = usePersistedState<number>('enNewLimit', 10)

  const { data: stats } = useQuery({
    queryKey: qk.english.srsStats,
    queryFn: () => api.english.srsStats(),
    staleTime: 0
  })

  const [phase, setPhase] = useState<Phase>('setup')
  const [queue, setQueue] = useState<SessionItem[]>([])
  const [revealed, setRevealed] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [misses, setMisses] = useState(0)
  const [grading, setGrading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const current = queue[0] ?? null

  async function start() {
    setError(null)
    setLoading(true)
    try {
      const { due, fresh } = await api.english.reviewQueue(newLimit)
      const items = [...due, ...fresh].map(toItem)
      if (items.length === 0) {
        setError(
          'Nothing to review. Save words from the dictionary (or miss them in a quiz) to build the deck, or come back when cards are due.'
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
        await api.english.submitReview(current.word.id, g)
        const next = gradeCard(current.srs, g)
        setReviewed((n) => n + 1)
        if (g === 'again') setMisses((n) => n + 1)
        setRevealed(false)
        setQueue((q) => {
          const rest = q.slice(1)
          // Cards still in a learning step come back later this session
          // (Anki-style); graduated/rescheduled cards leave it.
          return next.status === 'learning' ? [...rest, { word: current.word, srs: next }] : rest
        })
      } finally {
        setGrading(false)
      }
    },
    [current, grading]
  )

  useEffect(() => {
    if (phase === 'review' && queue.length === 0) {
      setPhase('done')
      void qc.invalidateQueries({ queryKey: qk.english.all })
    }
  }, [phase, queue.length, qc])

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

  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader
          back={{ to: '/english', label: 'English' }}
          title="Review"
          subtitle="Spaced-repetition flashcards over every word you have saved."
        />

        <div className="card p-5 space-y-5">
          <div className="flex gap-6 text-sm">
            <span>
              <span className="text-2xl font-bold text-accent">{stats?.dueCount ?? 0}</span>{' '}
              <span className="text-gray-400">due</span>
            </span>
            <span>
              <span className="text-2xl font-bold">{stats?.newCount ?? 0}</span>{' '}
              <span className="text-gray-400">new</span>
            </span>
          </div>

          <div>
            <div className="label mb-2">New cards this session</div>
            <div className="flex flex-wrap gap-2">
              {[0, 5, 10, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setNewLimit(n)}
                  className={newLimit === n ? 'pill pill-active' : 'pill'}
                >
                  {n === 0 ? 'None' : n}
                </button>
              ))}
            </div>
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
            <Link to="/english" className="btn-ghost flex-1 text-center">
              Done
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!current) return null
  const { word, srs } = current
  // See JapaneseReviewPage: the preview must carry the overdue gap that
  // submitReview will feed to gradeCard.
  const previews = previewIntervals(srs, overdueDays(word.dueAt))

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
          <button className="btn-ghost py-1 px-2 text-xs" onClick={() => setQueue([])}>
            End session
          </button>
        </div>
      </div>

      <div className="card p-8 text-center min-h-[260px] flex flex-col items-center justify-center">
        <p className="text-4xl leading-relaxed">{word.word}</p>
        {word.phonetic && <p className="mt-2 text-lg text-gray-400">{word.phonetic}</p>}
        {word.pos && <p className="mt-1 text-xs text-gray-500">{word.pos}</p>}
        {revealed && (
          <>
            <p className="mt-4 text-xl text-gray-100">{word.meaning}</p>
            {word.example && (
              <p className="mt-3 border-t border-base-700 pt-3 text-sm italic text-gray-400">
                {word.example}
              </p>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        {!revealed ? (
          <button className="btn-primary w-full" onClick={() => setRevealed(true)}>
            Show answer
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {(['again', 'hard', 'good', 'easy'] as SrsGrade[]).map((g, i) => (
              <button
                key={g}
                disabled={grading}
                onClick={() => void grade(g)}
                className={`rounded-lg border bg-base-800 px-2 py-3 text-center transition-colors ${GRADE_STYLE[g]}`}
              >
                <span className="block text-sm font-semibold">
                  <kbd className="kbd mr-1">{i + 1}</kbd>
                  {GRADE_LABEL[g]}
                </span>
                <span className="mt-0.5 block text-xs opacity-70">{previews[g]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
