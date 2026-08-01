import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import type { QuizKind } from '@shared/types'

// The generic typed drill engine (finite queue, misses re-enqueued at the end,
// one quiz_session row per finished round). Moved verbatim out of
// JapaneseKanaPage so the names drill and any future typed drill can reuse it;
// the kana tab's per-keystroke endless variant stays in the page.

export interface DrillItem {
  prompt: string
  instruction?: string | null // small line above the prompt ("→ て-form")
  sub: string | null // small line under the prompt after answering (readings/meaning)
  accept: (input: string) => boolean
  reveal: string // shown on a wrong answer
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function TypedDrill({
  items,
  kind,
  settings,
  onExit
}: {
  items: DrillItem[]
  kind: QuizKind
  settings: Record<string, unknown>
  onExit: () => void
}) {
  const qc = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const [queue, setQueue] = useState<DrillItem[]>(() => shuffle(items))
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [wrong, setWrong] = useState(false) // showing a wrong-answer reveal
  const [firstTryCorrect, setFirstTryCorrect] = useState(0)
  const [missed, setMissed] = useState<Set<string>>(new Set())
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const loggedRef = useRef(false)

  const current = queue[index] ?? null
  const finished = index >= queue.length

  // One quiz_session row per finished round (guarded like the quiz pages).
  useEffect(() => {
    if (!finished || loggedRef.current || items.length === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind,
        score: firstTryCorrect,
        total: items.length,
        bestStreak,
        settings
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history(kind) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  function submit(): void {
    if (!current) return
    if (wrong) {
      // Reveal acknowledged → move on (the item was already re-enqueued).
      setWrong(false)
      setInput('')
      setIndex((i) => i + 1)
      inputRef.current?.focus()
      return
    }
    const t = input.trim()
    if (!t) return
    if (current.accept(t)) {
      if (!missed.has(current.prompt)) setFirstTryCorrect((n) => n + 1)
      const s = streak + 1
      setStreak(s)
      setBestStreak((b) => Math.max(b, s))
      setInput('')
      setIndex((i) => i + 1)
    } else {
      setStreak(0)
      setMissed((m) => new Set(m).add(current.prompt))
      setQueue((q) => [...q, current]) // try again later
      setWrong(true)
    }
  }

  if (finished) {
    const pct = items.length ? Math.round((firstTryCorrect / items.length) * 100) : 0
    return (
      <div className="card p-6 text-center">
        <p className="text-3xl font-bold">
          {firstTryCorrect} / {items.length}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {pct === 100 ? 'Flawless.' : `${pct}% on the first try · best streak ${bestStreak}`}
        </p>
        {missed.size > 0 && (
          <p className="mt-3 text-lg text-gray-300">
            <span className="mr-2 text-xs uppercase tracking-widest text-gray-500">Missed</span>
            {[...missed].join('　')}
          </p>
        )}
        <div className="mt-5 flex justify-center gap-2">
          <button className="btn-primary" onClick={onExit}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span>
          {index + 1} / {queue.length}
        </span>
        <span>
          streak {streak}
          <button className="btn-ghost ml-3 px-2 py-0.5 text-xs" onClick={onExit}>
            Stop
          </button>
        </span>
      </div>

      {current!.instruction && (
        <p className="mb-2 text-center text-sm text-gray-400">{current!.instruction}</p>
      )}
      <p
        className={`text-center leading-none ${
          current!.prompt.length > 4 ? 'text-4xl leading-snug' : 'text-7xl'
        }`}
      >
        {current!.prompt}
      </p>

      {wrong ? (
        <div className="mt-6 text-center">
          <p className="text-sm text-red-400">
            Correct answer: <span className="text-lg text-gray-100">{current!.reveal}</span>
          </p>
          {current!.sub && <p className="mt-1 text-xs text-gray-500">{current!.sub}</p>}
          <button className="btn-primary mt-4" onClick={submit} autoFocus>
            Continue (Enter)
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-xs">
          <input
            ref={inputRef}
            className="input w-full text-center text-lg"
            placeholder="type the reading…"
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
          />
        </div>
      )}
    </div>
  )
}
