import { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import JpKeyboardInput from '../components/japanese/keyboard/JpKeyboardInput'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toHiragana } from '@shared/kana'
import { romajiToHiragana } from '@shared/romaji'
import { chainKana, startsWithKana } from '@shared/shiritori'
import StudySessionFrame, { SessionEvidence, SessionFeedback } from '../components/StudySessionFrame'

// Shiritori vs the dictionary (kind 'shiritori'): word-chain — your word must
// start with the last kana of the app's word; ん ends the game. Validation is
// the offline dictionary; the app replies with a real common noun (with its
// meaning — losing is still studying). Untimed; score = your chain length.

interface Turn {
  who: 'app' | 'user'
  expression: string
  reading: string
  gloss: string | null
}

type Outcome = 'lost' | 'won' | 'gaveUp'

const OPENER: Turn = { who: 'app', expression: 'しりとり', reading: 'しりとり', gloss: 'the game itself' }

export default function JapaneseShiritoriPage() {
  const qc = useQueryClient()
  const [turns, setTurns] = useState<Turn[]>([OPENER])
  const [input, setInput] = useState('')
  const [note, setNote] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const loggedRef = useRef(false)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('shiritori'),
    queryFn: () => api.quiz.history('shiritori')
  })

  const last = turns[turns.length - 1]
  const required = chainKana(last.reading)
  const userWords = turns.filter((t) => t.who === 'user').length

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' })
  }, [turns, outcome])

  function endGame(result: Outcome, lastWord: string): void {
    setOutcome(result)
    if (loggedRef.current || userWords === 0) return
    loggedRef.current = true
    // Tournament-style history: accuracy is meaningless at a constant 100%,
    // so score = total = chain length and the setup renders its own block.
    void api.quiz
      .logSession({
        kind: 'shiritori',
        score: userWords,
        total: userWords,
        bestStreak: userWords,
        settings: { result, lastWord }
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('shiritori') }))
      .catch(() => {})
  }

  async function submit(): Promise<void> {
    if (busy || outcome || required === null) return
    const raw = input.trim()
    if (!raw) return
    setNote(null)
    setBusy(true)
    try {
      // Romaji is converted for kana-only intents; kanji/kana pass through.
      const typed = /^[a-zA-Z0-9' -]+$/.test(raw) ? romajiToHiragana(raw) : raw

      // (a) Real word? Exact-form match on expression or reading —
      // matchedForm transparency keeps deinflections (食べた) from slipping in.
      const entries = await api.dict.lookup(typed)
      const typedHira = toHiragana(typed)
      const hit = entries.find(
        (e) =>
          e.source === 'offline' &&
          (e.expression === typed || toHiragana(e.reading || e.expression) === typedHira)
      )
      if (!hit) {
        setNote(`「${typed}」 isn't in the dictionary — try another word.`)
        return
      }
      const reading = toHiragana(hit.reading || hit.expression)

      // (b) Starts with the required kana?
      if (!startsWithKana(required, reading)) {
        setNote(`It has to start with 「${required}」 (${hit.expression} reads ${reading}).`)
        return
      }

      // (c) No repeats.
      const used = new Set(turns.flatMap((t) => [toHiragana(t.expression), t.reading]))
      if (used.has(toHiragana(hit.expression)) || used.has(reading)) {
        setNote(`「${hit.expression}」 was already played.`)
        return
      }

      const userTurn: Turn = {
        who: 'user',
        expression: hit.expression,
        reading,
        gloss: null
      }
      setTurns((t) => [...t, userTurn])
      setInput('')

      // (d) Typed a ん-ender → game over, the classic way to lose.
      if (chainKana(reading) === null) {
        endGame('lost', hit.expression)
        return
      }

      // The app's reply.
      const exclude = [...used, toHiragana(hit.expression), reading]
      const reply = await api.dict.shiritoriNext({ kana: chainKana(reading)!, exclude })
      if (!reply) {
        endGame('won', hit.expression)
        return
      }
      setTurns((t) => [...t, { who: 'app', ...reply }])
    } finally {
      setBusy(false)
      inputRef.current?.focus()
    }
  }

  function reset(): void {
    setTurns([OPENER])
    setInput('')
    setNote(null)
    setOutcome(null)
    loggedRef.current = false
  }

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Shiritori"
        subtitle="Word chain against the dictionary. ん loses. Every reply teaches you a word."
      />

      <StudySessionFrame
        title="Current chain"
        subtitle={`Next word starts with ${required}`}
        surface={false}
        actions={
          outcome === null ? (
            <button className="btn-ghost" onClick={() => endGame('gaveUp', last.expression)}>
              Give up
            </button>
          ) : undefined
        }
        rail={
          <>
            <SessionEvidence title="Chain evidence">
              <p>{userWords} accepted player words</p>
              <p>{turns.length} total turns</p>
              <p>Required kana: {required}</p>
            </SessionEvidence>
            <SessionEvidence title="Rules">
              Enter a dictionary word beginning with the final kana. Repeats are rejected and a word ending in ん loses.
            </SessionEvidence>
          </>
        }
        feedback={note ? <SessionFeedback tone="incorrect" title="Word rejected">{note}</SessionFeedback> : undefined}
      >
      <div className="card mb-4 max-h-[45vh] space-y-2 overflow-y-auto p-4">
        {turns.map((t, i) => (
          <div key={i} className={`flex ${t.who === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg border px-3 py-2 ${
                t.who === 'user'
                  ? 'border-accent/40 bg-accent/10'
                  : 'border-base-700 bg-base-800'
              }`}
            >
              <p className="text-lg leading-tight">
                {t.expression}
                {t.reading !== t.expression && (
                  <span className="ml-2 text-sm text-gray-400">{t.reading}</span>
                )}
              </p>
              {t.gloss && <p className="text-xs text-gray-500">{t.gloss}</p>}
            </div>
          </div>
        ))}
        {outcome && (
          <p className="pt-2 text-center text-sm font-medium text-accent">
            {outcome === 'won'
              ? `The dictionary is out of words — you win at ${userWords}.`
              : outcome === 'lost'
                ? `ん. Game over — chain of ${userWords}.`
                : `Gave up at ${userWords}.`}
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {outcome === null ? (
        <div>
          <p className="mb-2 text-center text-sm text-gray-400">
            Next word starts with <span className="text-2xl text-gray-100">{required}</span>
            <span className="ml-3 text-xs text-gray-500">chain {userWords}</span>
          </p>
          <div className="flex gap-2">
            <JpKeyboardInput
              ariaLabel="Next shiritori word"
              inputRef={inputRef}
              wrapClassName="flex-1"
              className="w-full text-center text-lg"
              placeholder="kana, kanji or romaji…"
              value={input}
              autoFocus
              onChange={setInput}
              onEnter={() => void submit()}
            />
            <button className="btn-primary shrink-0" disabled={busy} onClick={() => void submit()}>
              {busy ? '…' : 'Play'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="btn-primary" onClick={reset}>
            Play again
          </button>
        </div>
      )}
      </StudySessionFrame>

      {history && history.recent.length > 0 && (
        <Section title="Your record" className="mt-8">
          <div className="card p-4 text-sm">
            <p className="text-gray-300">
              Longest chain{' '}
              <span className="text-lg font-semibold text-gray-100">
                {Math.max(...history.recent.map((r) => r.score), history.best?.score ?? 0)}
              </span>
              <span className="ml-4 text-gray-500">{history.totalSessions} games</span>
            </p>
            <ul className="mt-2 space-y-1 text-xs text-gray-500">
              {history.recent.slice(0, 5).map((r) => {
                const result = (r.settings as { result?: string } | null)?.result
                return (
                  <li key={r.id}>
                    chain {r.score}
                    {result === 'won' ? ' · beat the dictionary' : result === 'lost' ? ' · ん' : ''}
                  </li>
                )
              })}
            </ul>
          </div>
        </Section>
      )}
    </div>
  )
}
