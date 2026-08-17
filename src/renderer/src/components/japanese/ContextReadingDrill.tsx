import { useState } from 'react'
import TypedDrill, { type DrillItem } from './TypedDrill'
import QuizRecord from '../QuizRecord'
import { Group, Pill } from '../PillGroup'
import { api } from '../../lib/api'
import { usePersistedState } from '../../lib/navState'
import { readingMatches } from '@shared/romaji'
import type { ContextReadingItem } from '@shared/types'

// Reading in context: a bank sentence with one kanji word highlighted — type
// its reading. Main only offers words whose kuromoji reading JMdict attests
// for that exact expression, and every attested reading is accepted (魚 =
// さかな or うお), because the sentence rarely disambiguates.

export default function ContextReadingDrill() {
  const [length, setLength] = usePersistedState<number>('jpContextReadingLength', 15)
  const [items, setItems] = useState<DrillItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function start(): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const pool = await api.japanese.contextReadingPool({ limit: length })
      if (pool.length < 3) {
        setError(
          'Not enough sentences came back — this tab needs the sentence bank AND JMdict (every reading is checked against it).'
        )
        return
      }
      setItems(pool.map(toItem))
    } finally {
      setLoading(false)
    }
  }

  function toItem(q: ContextReadingItem): DrillItem {
    return {
      prompt: `${q.jp}|${q.target.start}`, // identity key
      label: `${q.target.surface}（${q.readings[0]}）`,
      node: (
        <p className="text-center text-2xl leading-relaxed">
          {q.jp.slice(0, q.target.start)}
          <span className="rounded bg-accent/25 px-1 text-accent">{q.target.surface}</span>
          {q.jp.slice(q.target.end)}
        </p>
      ),
      instruction: 'Type the reading of the highlighted word',
      sub: [q.gloss, q.en].filter(Boolean).join(' · ') || null,
      accept: (input) => readingMatches(input, q.readings),
      reveal: q.readings.join(' / ')
    }
  }

  if (items) {
    return (
      <TypedDrill
        items={items}
        kind="contextReading"
        settings={{ length }}
        placeholder="type the reading…"
        onExit={() => setItems(null)}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-5">
        <Group label="Length">
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
          <Pill active={length === 15} onClick={() => setLength(15)} label="15" />
          <Pill active={length === 30} onClick={() => setLength(30)} label="30" />
        </Group>
        <p className="text-xs text-gray-500">
          Romaji or kana both work. Every reading JMdict attests for the word is accepted — the
          sentence often does not settle 魚 as さかな or うお.
        </p>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
          {loading ? 'Sampling sentences…' : 'Start'}
        </button>
      </div>
      <QuizRecord kind="contextReading" />
    </div>
  )
}
