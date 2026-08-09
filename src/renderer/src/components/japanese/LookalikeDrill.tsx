import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuizRecord from '../QuizRecord'
import McDrill, { type McQuestion } from './McDrill'
import { Group, Pill } from '../PillGroup'
import { api } from '../../lib/api'
import { usePersistedState } from '../../lib/navState'
import type { LookalikeQuizItem } from '@shared/types'

// Look-alike discrimination (kind 'lookalike'): the community's explicit
// unmet ask — given a meaning + reading, pick the RIGHT kanji among its
// visual neighbors. Decoys are computed look-alikes (component overlap +
// stroke proximity), so the wrong options are the exact ones you'd actually
// confuse.

type Source = 'cards' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
const LEVELS: Source[] = ['N5', 'N4', 'N3', 'N2', 'N1']

// Fisher-Yates. A `.sort(() => Math.random() - 0.5)` comparator is not a
// uniform shuffle, and with the answer at index 0 it left the correct kanji in
// slot 1 ~36% of the time — a free tell in a discrimination drill.
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function LookalikeDrill() {
  const [source, setSource] = usePersistedState<Source>('jpLookalikeSource', 'cards')
  const [length, setLength] = usePersistedState<number>('jpLookalikeLength', 10)
  const [items, setItems] = useState<LookalikeQuizItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.japanese.lookalikePool({
        source: source === 'cards' ? { kind: 'cards' } : { kind: 'level', level: source },
        limit: Math.max(length || 20, 20)
      })
      if (pool.length === 0) {
        setError(
          'No look-alike questions available — install the KRADFILE components pack (and KANJIDIC) in Settings → Dictionaries, or pick an N level.'
        )
        return
      }
      setItems(pool)
    } finally {
      setLoading(false)
    }
  }

  function buildQuestion(item: LookalikeQuizItem): McQuestion<LookalikeQuizItem> | null {
    const glyphs = [item.kanji, ...item.decoys]
    const shuffled = shuffle(glyphs)
    return {
      item,
      options: shuffled.map((g) => ({
        key: g,
        label: <span className="text-5xl leading-tight">{g}</span>,
        correct: g === item.kanji
      }))
    }
  }

  if (items) {
    return (
      <McDrill
        kind="lookalike"
        items={items}
        length={length}
        settings={{ source, length }}
        buildQuestion={buildQuestion}
        renderPrompt={(q) => (
          <div className="card p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Which kanji is this?
            </p>
            <p className="mt-3 text-2xl">{q.item.meaning ?? '—'}</p>
            {q.item.reading && <p className="mt-1 text-lg text-gray-400">{q.item.reading}</p>}
          </div>
        )}
        renderReveal={(q, correct) => (
          <>
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${
                correct ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {correct ? 'Correct' : 'Incorrect'}
            </p>
            <p className="mt-1 text-3xl">{q.item.kanji}</p>
            <p className="mt-1 text-sm text-gray-400">
              Look-alikes: {q.item.decoys.join('　')} — spot the differing part before moving on.
            </p>
          </>
        )}
        onExit={() => setItems(null)}
      />
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        待 or 持? 末 or 未? The wrong options here are computed look-alikes, so every question
        drills the exact discrimination that trips people up.
      </p>
      <div className="card p-5 space-y-5">
        <Group label="Kanji from">
          <Pill active={source === 'cards'} onClick={() => setSource('cards')} label="My kanji cards" />
          {LEVELS.map((l) => (
            <Pill key={l} active={source === l} onClick={() => setSource(l)} label={l} />
          ))}
        </Group>
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
      <QuizRecord kind="lookalike" />
    </div>
  )
}
