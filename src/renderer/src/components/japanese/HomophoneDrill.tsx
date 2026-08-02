import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuizRecord from '../QuizRecord'
import McDrill, { type McQuestion } from './McDrill'
import { Group, Pill } from '../PillGroup'
import { api } from '../../lib/api'
import { usePersistedState } from '../../lib/navState'
import type { HomophoneQuizItem } from '@shared/types'

// Homophone discrimination (kind 'homophone'): same reading, different kanji
// (かえる ×4). Sentence mode shows the sentence with the word rendered as its
// KANA — pick the spelling that belongs there; the reveal glosses the whole
// group, which is the actual teaching moment.

type Source = 'cards' | 'frequency' | 'both'

export default function HomophoneDrill() {
  const [source, setSource] = usePersistedState<Source>('jpHomophoneSource', 'both')
  const [length, setLength] = usePersistedState<number>('jpHomophoneLength', 10)
  const [items, setItems] = useState<HomophoneQuizItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.japanese.homophonePool({ source, limit: 30 })
      if (pool.length === 0) {
        setError(
          source === 'cards'
            ? 'No homophone groups match your learned cards — try "Common words", or learn more vocabulary first.'
            : 'No homophone groups available — install JMdict and a frequency dictionary in Settings → Dictionaries.'
        )
        return
      }
      setItems(pool)
    } finally {
      setLoading(false)
    }
  }

  function buildQuestion(item: HomophoneQuizItem): McQuestion<HomophoneQuizItem> | null {
    if (item.options.length < 2) return null
    return {
      item,
      options: item.options.map((o) => ({
        key: o.expression,
        label: <span className="text-lg font-medium">{o.expression}</span>,
        correct: o.expression === item.target
      }))
    }
  }

  if (items) {
    return (
      <McDrill
        kind="homophone"
        items={items}
        length={length}
        settings={{ source, length }}
        buildQuestion={buildQuestion}
        renderPrompt={(mc) => (
          <div className="card p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              {mc.item.mode === 'sentence'
                ? 'Which spelling belongs in this sentence?'
                : `Which spelling means this?`}
            </p>
            {mc.item.mode === 'sentence' ? (
              <>
                <p className="mt-3 text-2xl leading-relaxed">{mc.item.jp}</p>
                {mc.item.en && <p className="mt-2 text-sm text-gray-500">{mc.item.en}</p>}
              </>
            ) : (
              <>
                <p className="mt-3 text-3xl">{mc.item.reading}</p>
                <p className="mt-2 text-sm text-gray-400">
                  {mc.item.group.find((g) => g.expression === mc.item.target)?.gloss}
                </p>
              </>
            )}
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
            <p className="mt-1 text-lg">
              {mc.item.target}
              <span className="ml-2 text-sm text-gray-400">{mc.item.reading}</span>
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {mc.item.group.map((g) => (
                <li key={g.expression}>
                  <span className={g.expression === mc.item.target ? 'text-gray-100' : 'text-gray-400'}>
                    {g.expression}
                  </span>
                  <span className="ml-2 text-gray-500">{g.gloss}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        onExit={() => setItems(null)}
      />
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        Japanese packs thousands of meanings into a few hundred syllables — かえる alone is
        帰る・変える・返る・買える. Context plus kanji is the only way through; this drills
        exactly that.
      </p>
      <div className="card p-5 space-y-5">
        <Group label="Words from">
          <Pill active={source === 'cards'} onClick={() => setSource('cards')} label="My cards" />
          <Pill active={source === 'frequency'} onClick={() => setSource('frequency')} label="Common words" />
          <Pill active={source === 'both'} onClick={() => setSource('both')} label="Both" />
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
      <QuizRecord kind="homophone" />
    </div>
  )
}
