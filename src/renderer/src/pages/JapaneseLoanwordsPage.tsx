import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import McDrill, { type McQuestion } from '../components/japanese/McDrill'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import type { LoanwordQuizItem } from '@shared/types'
import { shuffle } from '@shared/shuffle'

// Katakana loanword recognition (kind 'loanword') — the under-served half of
// the katakana problem: not シ vs ツ, but realizing ミシン is just "machine"
// after a century of phonetic drift. MC-4 English glosses (typed English is
// dishonest: glosses are multi-token and the source isn't always English —
// アルバイト is German).

export default function JapaneseLoanwordsPage() {
  const [length, setLength] = usePersistedState<number>('jpLoanwordLength', 10)
  const [items, setItems] = useState<LoanwordQuizItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.dict.loanwordSample({ limit: 80 })
      if (pool.length < 4) {
        setError('Not enough loanwords available — install JMdict (and a frequency dictionary) in Settings → Dictionaries.')
        return
      }
      setItems(pool)
    } finally {
      setLoading(false)
    }
  }

  function firstToken(gloss: string): string {
    return gloss.split(/[,;(/]/)[0]?.trim().toLowerCase() ?? ''
  }

  function buildQuestion(item: LoanwordQuizItem): McQuestion<LoanwordQuizItem> | null {
    if (!items) return null
    const taken = new Set([firstToken(item.gloss)])
    const distractors: LoanwordQuizItem[] = []
    for (const other of shuffle(items)) {
      if (distractors.length >= 3) break
      if (other.word === item.word) continue
      const token = firstToken(other.gloss)
      if (taken.has(token)) continue
      taken.add(token)
      distractors.push(other)
    }
    if (distractors.length < 3) return null
    const options = shuffle([item, ...distractors])
    return {
      item,
      options: options.map((o) => ({
        key: o.word,
        label: <span className="text-sm">{o.gloss}</span>,
        correct: o.word === item.word
      }))
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Loanwords"
        subtitle="Katakana words that are secretly words you already know."
      />

      {items ? (
        <McDrill
          kind="loanword"
          items={items}
          length={length}
          settings={{ length }}
          buildQuestion={buildQuestion}
          renderPrompt={(mc) => (
            <div className="card p-8 text-center">
              <p className="text-xs uppercase tracking-widest text-gray-500">What does this mean?</p>
              <p className="mt-3 text-4xl">{mc.item.word}</p>
            </div>
          )}
          renderReveal={(mc, correct) => (
            <>
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  correct ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {correct ? 'Correct' : 'Incorrect'}
              </p>
              <p className="mt-1 text-2xl">{mc.item.word}</p>
              <p className="text-sm text-gray-300">{mc.item.gloss}</p>
              {mc.item.rank != null && (
                <p className="mt-1 text-xs text-gray-500">
                  corpus rank #{mc.item.rank.toLocaleString()}
                </p>
              )}
            </>
          )}
          onExit={() => setItems(null)}
        />
      ) : (
        <div>
          <div className="card p-5 space-y-5">
            <Group label="Length">
              <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
              <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
              <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
            </Group>
            {error && (
              <p className="text-sm text-red-400">
                {error}{' '}
                <Link to="/settings" className="underline hover:text-accent">
                  Open Settings
                </Link>
              </p>
            )}
            <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
              {loading ? 'Loading…' : 'Start drill'}
            </button>
          </div>
          <QuizRecord kind="loanword" />
        </div>
      )}
    </div>
  )
}
