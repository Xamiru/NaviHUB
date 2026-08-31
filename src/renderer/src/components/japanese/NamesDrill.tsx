import { useState } from 'react'
import { Link } from 'react-router-dom'
import Section from '../Section'
import QuizRecord from '../QuizRecord'
import TypedDrill, { type DrillItem } from './TypedDrill'
import { api } from '../../lib/api'
import { usePersistedState } from '../../lib/navState'
import { readingMatches } from '@shared/romaji'
import type { NameKind } from '@shared/types'

// Name-reading tab (kind 'names'): Japanese names are the classic reading
// trap — 中田 alone has four common readings. Typed drill over random JMnedict
// person names; ANY attested reading is accepted, all are shown on a miss.

export default function NamesDrillSetup() {
  const [kind, setKind] = usePersistedState<NameKind>('jpNamesKind', 'surname')
  const [length, setLength] = usePersistedState<number>('jpNamesLength', 20)
  const [items, setItems] = useState<DrillItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const names = await api.dict.nameSample({ kind, limit: length })
      if (names.length === 0) {
        setError(
          'No names available — install the names dictionary (JMnedict) in Settings → Dictionaries.'
        )
        return
      }
      setItems(
        names.map((n) => ({
          prompt: n.expression,
          instruction: n.kind === 'surname' ? 'surname' : 'given name',
          sub: n.readings.join('、'),
          accept: (input) => readingMatches(input, n.readings),
          reveal: n.readings.join('、')
        }))
      )
    } finally {
      setLoading(false)
    }
  }

  if (items) {
    return (
      <TypedDrill
        items={items}
        kind="names"
        settings={{ kind, length }}
        onExit={() => setItems(null)}
      />
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        Names are where readings go feral — this drills the common ones until 田中 vs 中田 is
        automatic. Any attested reading counts.
      </p>
      <Section title="Names" className="mb-5">
        <div className="flex gap-1.5">
          {(
            [
              ['surname', 'Surnames'],
              ['given', 'Given names'],
              ['both', 'Both']
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={kind === k ? 'pill pill-active' : 'pill'}
            >
              {label}
            </button>
          ))}
        </div>
      </Section>
      <Section title="Round length" className="mb-5">
        <div className="flex gap-1.5">
          {[10, 20, 40].map((n) => (
            <button
              key={n}
              aria-pressed={length === n}
              onClick={() => setLength(n)}
              className={length === n ? 'pill pill-active' : 'pill'}
            >
              {n}
            </button>
          ))}
        </div>
      </Section>
      {error && (
        <p className="mb-3 text-sm text-signal-anomaly">
          {error}{' '}
          <Link to="/settings" className="underline hover:text-accent">
            Open Settings
          </Link>
        </p>
      )}
      <button className="btn-primary" disabled={loading} onClick={() => void start()}>
        {loading ? 'Loading…' : 'Start drill'}
      </button>

      <QuizRecord kind="names" />
    </div>
  )
}
