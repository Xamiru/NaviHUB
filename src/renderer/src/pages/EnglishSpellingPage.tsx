import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import EmptyState from '../components/EmptyState'
import { Group, Pill } from '../components/PillGroup'
import TypedDrill, { type DrillItem } from '../components/japanese/TypedDrill'
import type { EnBand, EnSpellingItem, EnWordInput } from '@shared/types'

// Typed spelling drill: the definition (and IPA when known) is shown, the
// word is typed exactly. Reuses the generic TypedDrill engine; misses are
// recorded inside each item's accept() (the one call site per submission) and
// saved into the review deck when the round ends.

type Source = EnBand | 'myWords'

const BAND_LABEL: Record<EnBand, string> = {
  upper: 'Upper (4-10k)',
  advanced: 'Advanced (10-25k)',
  rare: 'Rare (25-50k)'
}

export default function EnglishSpellingPage() {
  const qc = useQueryClient()
  const [source, setSource] = usePersistedState<Source>('enSpellSource', 'upper')
  const [length, setLength] = usePersistedState<number>('enSpellLength', 15)
  const [items, setItems] = useState<DrillItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [addedToDeck, setAddedToDeck] = useState(0)
  const missesRef = useRef<Map<string, EnWordInput>>(new Map())

  const { data: dictInfo } = useQuery({
    queryKey: qk.english.dictInfo,
    queryFn: () => api.english.dictInfo()
  })
  const { data: freqInfo } = useQuery({
    queryKey: qk.english.freqInfo,
    queryFn: () => api.english.freqInfo()
  })

  const packsReady = !!dictInfo && !!freqInfo
  const bandBlocked = source !== 'myWords' && !packsReady

  function toDrillItem(it: EnSpellingItem): DrillItem {
    return {
      prompt: it.def,
      instruction: [it.ipa, it.pos ? `(${it.pos})` : null].filter(Boolean).join(' '),
      sub: it.ipa,
      accept: (input: string) => {
        const ok = input.trim().toLowerCase() === it.word.toLowerCase()
        if (!ok) {
          missesRef.current.set(it.word, {
            word: it.word,
            meaning: it.def,
            pos: it.pos,
            phonetic: it.ipa
          })
        }
        return ok
      },
      reveal: it.word
    }
  }

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.english.spellingPool({
        source: source === 'myWords' ? { kind: 'myWords' } : { kind: 'band', band: source },
        limit: length
      })
      if (pool.length === 0) {
        setError(
          source === 'myWords'
            ? 'No saved words yet — save some from the dictionary first.'
            : 'The pool came back empty — check that both English packs are installed in Settings.'
        )
        return
      }
      missesRef.current = new Map()
      setAddedToDeck(0)
      setItems(pool.map(toDrillItem))
    } finally {
      setLoading(false)
    }
  }

  function exitDrill(): void {
    setItems(null)
    const misses = [...missesRef.current.values()]
    // Band misses feed the deck; saved words are already in it.
    if (source !== 'myWords' && misses.length > 0) {
      void api.english
        .saveWords(misses)
        .then((added) => {
          setAddedToDeck(added)
          return qc.invalidateQueries({ queryKey: qk.english.all })
        })
        .catch(() => {})
    }
    missesRef.current = new Map()
  }

  if (items) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader back={{ to: '/english', label: 'English' }} title="Spelling" />
        <TypedDrill
          items={items}
          kind="englishSpelling"
          settings={{ source, length }}
          onExit={exitDrill}
        />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageHeader
        back={{ to: '/english', label: 'English' }}
        title="Spelling"
        subtitle="The definition and pronunciation are shown — type the word, spelled exactly."
      />

      <div className="card p-5 space-y-5">
        <Group label="Words">
          {(Object.keys(BAND_LABEL) as EnBand[]).map((b) => (
            <Pill key={b} active={source === b} onClick={() => setSource(b)} label={BAND_LABEL[b]} />
          ))}
          <Pill
            active={source === 'myWords'}
            onClick={() => setSource('myWords')}
            label="My saved words"
          />
        </Group>

        <Group label="Length">
          <Pill active={length === 15} onClick={() => setLength(15)} label="15 words" />
          <Pill active={length === 30} onClick={() => setLength(30)} label="30 words" />
        </Group>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {addedToDeck > 0 && (
          <p className="text-sm text-gray-400">
            {addedToDeck} missed {addedToDeck === 1 ? 'word' : 'words'} added to your review deck.
          </p>
        )}

        {bandBlocked ? (
          <EmptyState
            title="Packs missing"
            body="The frequency bands need the offline English dictionary and the frequency pack — both are one-click downloads."
            action={
              <Link to="/settings" className="btn-primary">
                Open Settings
              </Link>
            }
          />
        ) : (
          <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
            {loading ? 'Loading…' : 'Start drill'}
          </button>
        )}
      </div>

      <QuizRecord kind="englishSpelling" />
    </div>
  )
}
