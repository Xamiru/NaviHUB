import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { matchState } from '@shared/typing'
import { readingMatches } from '@shared/romaji'
import type { QuizKind } from '@shared/types'

// The arcade races' shared shell: a fixed clock, a score/streak header and one
// of two input loops.
//
//   keystroke — the DJT loop (kana, readings): every keystroke is checked, a
//     match advances with no key press, a dead end shows the answer in red and
//     keeps it there while you fix it in place; Enter skips.
//   enter     — the TypedDrill loop (conjugation): long answers, checked on
//     Enter, typos forgiven by readingMatches.
//
// Logging convention for time attacks: score = correct, total = attempted, and
// quizRepo.SCORE_RANKED_KINDS ranks the record by SCORE — most correct in the
// minute, not the most careful accuracy. newBest is decided BEFORE the log +
// invalidate, like every quiz page.

export interface RaceItem {
  prompt: string
  instruction?: string | null
  answers: string[]
  reveal: string
  sub?: string | null
}

export interface RaceSpec {
  kind: Extract<QuizKind, 'kanaRace' | 'readingRace' | 'conjRace'>
  seconds: number
  mode: 'keystroke' | 'enter'
  next: () => RaceItem
  settings: Record<string, unknown>
}

export default function ArcadeShell({
  spec,
  onExit
}: {
  spec: RaceSpec
  onExit: () => void
}) {
  const qc = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const deadline = useMemo(() => Date.now() + spec.seconds * 1000, [spec])
  const [left, setLeft] = useState(spec.seconds)
  const [item, setItem] = useState<RaceItem>(() => spec.next())
  const [input, setInput] = useState('')
  const [wrong, setWrong] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [over, setOver] = useState(false)
  const [newBest, setNewBest] = useState(false)
  const loggedRef = useRef(false)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history(spec.kind),
    queryFn: () => api.quiz.history(spec.kind)
  })

  // One 200 ms ticker for the clock; stops the moment the race ends.
  useEffect(() => {
    if (over) return
    const id = setInterval(() => {
      const remain = Math.max(0, deadline - Date.now())
      setLeft(Math.ceil(remain / 1000))
      if (remain <= 0) setOver(true)
    }, 200)
    return () => clearInterval(id)
  }, [deadline, over])

  useEffect(() => {
    if (!over || loggedRef.current || attempted === 0) return
    loggedRef.current = true
    const prev = history?.best
    setNewBest(attempted >= 5 && (!prev || correct > prev.score))
    void api.quiz
      .logSession({
        kind: spec.kind,
        score: correct,
        total: attempted,
        bestStreak,
        settings: { seconds: spec.seconds, ...spec.settings }
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history(spec.kind) }))
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over])

  function advance(wasCorrect: boolean): void {
    setAttempted((n) => n + 1)
    if (wasCorrect) {
      setCorrect((n) => n + 1)
      setStreak((s) => {
        const n = s + 1
        setBestStreak((b) => Math.max(b, n))
        return n
      })
    } else {
      setStreak(0)
    }
    setItem(spec.next())
    setInput('')
    setWrong(false)
    inputRef.current?.focus()
  }

  function onType(value: string): void {
    setInput(value)
    if (spec.mode !== 'keystroke' || over) return
    const state = matchState(value, item.answers)
    if (state === 'match') advance(!wrong)
    else if (state === 'wrong' && !wrong) setWrong(true)
  }

  function onEnter(): void {
    if (over) return
    if (wrong) {
      advance(false) // acknowledge the reveal
      return
    }
    if (spec.mode === 'enter') {
      const t = input.trim()
      if (!t) {
        setWrong(true)
        return
      }
      if (readingMatches(t, item.answers)) advance(true)
      else setWrong(true)
      return
    }
    setWrong(true) // keystroke mode: Enter = "show me"
  }

  if (over) {
    const acc = attempted ? Math.round((correct / attempted) * 100) : 0
    const best = history?.best
    return (
      <div className="card p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">Time</p>
        <p className="mt-3 text-6xl font-bold">{correct}</p>
        <p className="mt-1 text-sm text-gray-400">
          correct in {spec.seconds} s · {attempted} attempted · {acc}% · best streak {bestStreak}
        </p>
        {newBest ? (
          <p className="mt-3 text-sm text-accent">New personal best.</p>
        ) : (
          best && <p className="mt-3 text-sm text-gray-500">Personal best {best.score}</p>
        )}
        <div className="mt-6 flex justify-center gap-2">
          <button className="btn-primary" onClick={onExit}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }

  const pct = Math.max(0, Math.min(100, (left / spec.seconds) * 100))
  return (
    <div className="card p-6">
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-base-700">
        <div
          className={`h-full rounded-full transition-[width] duration-200 ${left <= 10 ? 'bg-red-500' : 'bg-accent'}`}
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="tabular-nums">
          {correct} correct · {attempted} attempted
        </span>
        <span>
          streak {streak} · <span className={left <= 10 ? 'text-red-400' : ''}>{left}s</span>
          <button className="btn-ghost ml-3 px-2 py-0.5 text-xs" onClick={() => setOver(true)}>
            Stop
          </button>
        </span>
      </div>

      {item.instruction && <p className="mb-2 text-center text-sm text-gray-400">{item.instruction}</p>}
      <p className={`text-center leading-none ${item.prompt.length > 4 ? 'text-4xl leading-snug' : 'text-7xl'}`}>
        {item.prompt}
      </p>

      <div className="mx-auto mt-6 max-w-sm">
        <input
          ref={inputRef}
          className={`input w-full text-center text-lg ${wrong ? 'text-red-400' : ''}`}
          placeholder="type it…"
          value={input}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => onType(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onEnter()
            }
          }}
        />
      </div>

      <p className="mt-4 text-center text-sm">
        {wrong ? (
          <span className="text-red-400">
            <span className="text-lg text-gray-100">{item.reveal}</span>
            {item.sub && <span className="ml-2 text-xs text-gray-500">{item.sub}</span>}
            <span className="ml-2 text-xs text-gray-500">Enter to move on</span>
          </span>
        ) : (
          <span className="text-xs text-gray-600">Enter reveals the answer</span>
        )}
      </p>
    </div>
  )
}
