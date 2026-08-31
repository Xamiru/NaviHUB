import { useState } from 'react'
import QuizRecord from '../QuizRecord'
import McDrill, { type McQuestion } from './McDrill'
import { Group, Pill } from '../PillGroup'
import { api } from '../../lib/api'
import { usePersistedState } from '../../lib/navState'
import { BLANK } from '@shared/cloze'
import { TRANSITIVITY_PAIRS, type TransitivityPair } from '@shared/transitivity'
import type { TransitivityQuestion } from '@shared/types'
import { shuffle } from '@shared/shuffle'

// Transitive/intransitive pair discrimination (kind 'transitivity') — the
// single most-repeated confusion on r/LearnJapanese, drilled the way the
// community says works: a real sentence with the particle visible, pick which
// member of the pair fits. MC-2 on purpose: the discrimination is WITHIN the
// pair; extra options would be trivially eliminable by meaning.

const PAIR_BY_KEY = new Map(TRANSITIVITY_PAIRS.map((p) => [p.key, p]))

interface QuestionData {
  q: TransitivityQuestion
  pair: TransitivityPair
}

export default function TransitivityDrill() {
  const [length, setLength] = usePersistedState<number>('jpTransitivityLength', 10)
  const [items, setItems] = useState<QuestionData[] | null>(null)
  const [loading, setLoading] = useState(false)

  async function start(): Promise<void> {
    setLoading(true)
    try {
      const pool = await api.dict.transitivityPool({ limit: 50 })
      setItems(
        pool
          .map((q) => ({ q, pair: PAIR_BY_KEY.get(q.pairKey)! }))
          .filter((d) => d.pair !== undefined)
      )
    } finally {
      setLoading(false)
    }
  }

  function buildQuestion(data: QuestionData): McQuestion<QuestionData> | null {
    const { q, pair } = data
    const correct = q.side === 'trans' ? pair.trans : pair.intrans
    const members = shuffle([
      { word: pair.intrans, kana: pair.intransKana },
      { word: pair.trans, kana: pair.transKana }
    ])
    return {
      item: data,
      options: members.map((m) => ({
        key: m.word,
        label: (
          <span className="text-lg font-medium">
            {m.word}
            <span className="ml-2 text-sm text-gray-400">{m.kana}</span>
          </span>
        ),
        correct: m.word === correct
      }))
    }
  }

  if (items && items.length > 0) {
    return (
      <McDrill
        kind="transitivity"
        items={items}
        length={length}
        settings={{ length }}
        buildQuestion={buildQuestion}
        renderPrompt={(mc) => (
          <div className="card p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Which verb fits? Watch the particle.
            </p>
            <p className="mt-3 text-2xl leading-relaxed">
              {mc.item.q.jp.replace(mc.item.q.surface, BLANK)}
            </p>
            <p className="mt-2 text-sm text-gray-500">{mc.item.q.en}</p>
          </div>
        )}
        renderReveal={(mc, correct) => {
          const { q, pair } = mc.item
          return (
            <>
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  correct ? 'text-signal-affirmative' : 'text-signal-anomaly'
                }`}
              >
                {correct ? 'Correct' : 'Incorrect'}
              </p>
              <p className="mt-1 text-lg">{q.jp}</p>
              <p className="mt-2 text-sm text-gray-300">
                {pair.intrans}（{pair.intransKana}） is intransitive — things {pair.gloss} on
                their own（が）; {pair.trans}（{pair.transKana}） is transitive — someone{' '}
                {pair.gloss}s something（を）.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Pattern: {pair.pattern}
                {q.source === 'authored' ? ' · authored example' : ' · Tatoeba'}
              </p>
            </>
          )
        }}
        optionClassName="sm:grid-cols-2"
        onExit={() => setItems(null)}
      />
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        開く/開ける, 出る/出す — pairs are drilled inside real sentences with the を/が
        particle visible, because that context is what finally makes them click. Works without
        any packs; installs of the sentence bank upgrade the sentences.
      </p>
      <div className="card p-5 space-y-5">
        <Group label="Length">
          <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
          <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
        </Group>
        <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
          {loading ? 'Loading…' : 'Start drill'}
        </button>
      </div>
      <QuizRecord kind="transitivity" />
    </div>
  )
}
