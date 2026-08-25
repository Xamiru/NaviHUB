import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import type { QuizKind } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import StudySessionFrame, { SessionEvidence, SessionFeedback } from '../StudySessionFrame'

// The generic typed drill engine (finite queue, misses re-enqueued at the end,
// one quiz_session row per finished round). Moved verbatim out of
// JapaneseKanaPage so the names drill and any future typed drill can reuse it;
// the kana tab's per-keystroke endless variant stays in the page.

export interface DrillItem {
  prompt: string // the identity key of the item (misses are tracked by it) — and the display when `node` is absent
  node?: ReactNode // richer prompt rendering (a gapped sentence, a highlighted word); `prompt` stays the key
  label?: string // what the summary's "Missed" list shows instead of `prompt`
  instruction?: string | null // small line above the prompt ("→ て-form")
  sub: string | null // small line under the prompt after answering (readings/meaning)
  accept: (input: string) => boolean
  reveal: string // shown on a wrong answer
}


export default function TypedDrill({
  items,
  kind,
  settings,
  onExit,
  placeholder = 'type the reading…',
  wide = false,
  title = 'Typed drill'
}: {
  items: DrillItem[]
  kind: QuizKind
  settings: Record<string, unknown>
  onExit: () => void
  placeholder?: string
  wide?: boolean // a wider input for multi-word answers (Use of English)
  title?: string
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
      <StudySessionFrame title={`${title} results`} subtitle="First-try recall and requeued misses" surface={false}>
        <div className="card p-7 text-center">
          <p className="text-3xl font-bold">
            {firstTryCorrect} / {items.length}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {pct === 100 ? 'Flawless.' : `${pct}% on the first try · best streak ${bestStreak}`}
          </p>
          {missed.size > 0 && (
            <p className="mt-3 text-lg text-gray-300">
              <span className="mr-2 text-xs uppercase tracking-widest text-gray-500">Missed</span>
              {[...missed]
                .map((p) => items.find((i) => i.prompt === p)?.label ?? p)
                .join(items.some((i) => i.label) ? ' · ' : '　')}
            </p>
          )}
          <div className="mt-5 flex justify-center gap-2">
            <button className="btn-primary" onClick={onExit}>
              Back to setup
            </button>
          </div>
        </div>
      </StudySessionFrame>
    )
  }

  return (
    <StudySessionFrame
      title={title}
      subtitle="Missed prompts return at the end of the queue."
      progress={{ current: index + 1, total: queue.length, label: 'Prompt' }}
      actions={<button className="btn-ghost" onClick={onExit}>Stop</button>}
      rail={
        <>
          <SessionEvidence title="Session evidence">
            <p>Current streak: {streak}</p>
            <p>Best streak: {bestStreak}</p>
            <p>First-try correct: {firstTryCorrect}</p>
          </SessionEvidence>
          <SessionEvidence title="Keyboard">
            Type the answer, then press Enter. After a miss, Enter acknowledges the correction.
          </SessionEvidence>
        </>
      }
      feedback={
        wrong ? (
          <SessionFeedback tone="incorrect" title={`Correct answer: ${current!.reveal}`}>
            {current!.sub}
          </SessionFeedback>
        ) : undefined
      }
    >
      {current!.instruction && (
        <p className="mb-2 text-center text-sm text-gray-400">{current!.instruction}</p>
      )}
      {current!.node ?? (
        <p
          className={`text-center leading-none ${
            current!.prompt.length > 4 ? 'text-4xl leading-snug' : 'text-7xl'
          }`}
        >
          {current!.prompt}
        </p>
      )}

      {wrong ? (
        <div className="mt-6 text-center">
          <button className="btn-primary mt-4" onClick={submit} autoFocus>
            Continue (Enter)
          </button>
        </div>
      ) : (
        <div className={`mx-auto mt-6 ${wide ? 'max-w-lg' : 'max-w-xs'}`}>
          <input
            ref={inputRef}
            className="input w-full text-center text-lg"
            placeholder={placeholder}
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
          />
        </div>
      )}
    </StudySessionFrame>
  )
}
