import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Tabs, { TabPanel } from '../components/Tabs'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import SessionLauncher from '../components/japanese/SessionLauncher'
import ArcadeShell, { type RaceItem, type RaceSpec } from '../components/japanese/ArcadeShell'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { SECTIONS } from '@shared/kanaRows'
import { DOJO_FORMS, DOJO_WORDS, posToWordClass, type DojoWord } from '@shared/dojoWords'
import { conjugate, FORM_LABELS, type ConjForm } from '@shared/conjugate'
import { acceptedRomaji } from '@shared/romaji'
import { shuffle } from '@shared/shuffle'
import type { ReadingRaceWord } from '@shared/types'

// Sixty seconds, one prompt at a time, keep going. The record is the MOST
// CORRECT in the minute (quizRepo.SCORE_RANKED_KINDS), not the best accuracy —
// so hesitating to protect a percentage does not pay.

type Tab = 'kana' | 'reading' | 'conj'
const TABS: { key: Tab; label: string }[] = [
  { key: 'kana', label: 'Kana race' },
  { key: 'reading', label: 'Reading race' },
  { key: 'conj', label: 'Conjugation sprint' }
]
const SECONDS = 60

// An endless generator over a deck: reshuffles when exhausted, never repeats
// twice in a row.
function cycler<T>(items: T[]): () => T {
  let deck: T[] = shuffle(items)
  let last: T | null = null
  return () => {
    if (deck.length === 0) deck = shuffle(items)
    let next = deck.pop()!
    if (next === last && deck.length > 0) {
      const other = deck.pop()!
      deck.push(next)
      next = other
    }
    last = next
    return next
  }
}

export default function JapaneseArcadePage() {
  const [params] = useSearchParams()
  const seeded = params.get('tab') as Tab | null
  const [tab, setTab] = usePersistedState<Tab>(
    'jpArcadeTab',
    seeded && TABS.some((t) => t.key === seeded) ? seeded : 'kana'
  )

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Arcade"
        subtitle="Sixty-second races. The record is how many you get right in the minute — accuracy is not the score."
      />
      <Tabs
        id="japanese-arcade"
        label="Arcade game"
        tabs={TABS}
        value={tab}
        onChange={setTab}
        className="mb-5"
      />
      <TabPanel tabsId="japanese-arcade" value={tab}>
        {tab === 'kana' && <KanaRace />}
        {tab === 'reading' && <ReadingRace />}
        {tab === 'conj' && <ConjRace />}
      </TabPanel>
    </div>
  )
}

function KanaRace() {
  const [rows, setRows] = usePersistedState<string[]>('jpArcadeKanaRows', ['a', 'ka', 'sa', 'ta', 'na'])
  const [spec, setSpec] = useState<RaceSpec | null>(null)

  const chars = useMemo(() => {
    const wanted = new Set(rows)
    return SECTIONS.flatMap((s) => s.rows)
      .filter((r) => wanted.has(r.key))
      .flatMap((r) => r.kana)
  }, [rows])

  function toggle(key: string): void {
    setRows((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]))
  }

  function start(): void {
    const next = cycler(chars)
    setSpec({
      kind: 'kanaRace',
      seconds: SECONDS,
      mode: 'keystroke',
      settings: { rows },
      next: (): RaceItem => {
        const kana = next()
        const answers = acceptedRomaji(kana)
        return { prompt: kana, answers: [kana], reveal: answers[0] ?? kana }
      }
    })
  }

  if (spec) return <ArcadeShell spec={spec} onExit={() => setSpec(null)} />

  return (
    <SessionLauncher
      summary={
        <div>
          <p className="text-2xl font-semibold text-white">Sixty seconds of kana</p>
          <p className="mt-2 text-sm text-gray-400">
            Type the romaji; a correct reading moves on by itself. {chars.length} kana selected.
          </p>
        </div>
      }
      defaults={`${rows.length} row${rows.length === 1 ? '' : 's'}`}
      startLabel="Start 60-second race"
      onStart={start}
      disabled={chars.length === 0}
      error={chars.length === 0 ? 'Pick at least one row under Options.' : null}
      options={SECTIONS.map((section) => (
        <div key={section.title}>
          <p className="label mb-2">{section.title}</p>
          <div className="flex flex-wrap gap-1.5">
            {section.rows.map((r) => (
              <button
                key={r.key}
                aria-pressed={rows.includes(r.key)}
                className={`chip-toggle ${rows.includes(r.key) ? 'chip-toggle-active' : ''}`}
                onClick={() => toggle(r.key)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    >
      <QuizRecord kind="kanaRace" />
    </SessionLauncher>
  )
}

function ReadingRace() {
  const [source, setSource] = usePersistedState<'cards' | 'frequency' | 'both'>('jpArcadeReadingSource', 'both')
  const [spec, setSpec] = useState<RaceSpec | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function start(): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const pool: ReadingRaceWord[] = await api.japanese.readingRacePool({ source, limit: 300 })
      if (pool.length < 10) {
        setError(
          'Fewer than ten words available — learn a few vocab lessons, or install JMdict and a frequency dictionary in Settings.'
        )
        return
      }
      const next = cycler(pool)
      setSpec({
        kind: 'readingRace',
        seconds: SECONDS,
        mode: 'keystroke',
        settings: { source },
        next: (): RaceItem => {
          const w = next()
          return { prompt: w.term, answers: w.readings, reveal: w.readings[0], sub: w.gloss }
        }
      })
    } finally {
      setLoading(false)
    }
  }

  if (spec) return <ArcadeShell spec={spec} onExit={() => setSpec(null)} />

  return (
    <SessionLauncher
      summary={
        <div>
          <p className="text-2xl font-semibold text-white">Sixty seconds of readings</p>
          <p className="mt-2 text-sm text-gray-400">
            Type each word’s reading in romaji or kana. Every reading the dictionary lists counts.
          </p>
        </div>
      }
      defaults={source === 'cards' ? 'my cards' : source === 'frequency' ? 'frequent words' : 'my cards and frequent words'}
      startLabel="Start 60-second race"
      onStart={() => void start()}
      starting={loading}
      error={error}
      options={
        <Group label="Words">
          <Pill active={source === 'cards'} onClick={() => setSource('cards')} label="My cards" />
          <Pill active={source === 'frequency'} onClick={() => setSource('frequency')} label="Frequent words" />
          <Pill active={source === 'both'} onClick={() => setSource('both')} label="Both" />
        </Group>
      }
    >
      <QuizRecord kind="readingRace" />
    </SessionLauncher>
  )
}

function ConjRace() {
  const [forms, setForms] = usePersistedState<ConjForm[]>('jpArcadeConjForms', ['te', 'past', 'negative', 'masu'])
  const [useCards, setUseCards] = usePersistedState<boolean>('jpArcadeConjCards', true)
  const [spec, setSpec] = useState<RaceSpec | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function toggleForm(f: ConjForm): void {
    setForms((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]))
  }

  async function start(): Promise<void> {
    if (forms.length === 0) return
    setLoading(true)
    setError(null)
    try {
      let words: DojoWord[] = [...DOJO_WORDS]
      if (useCards) {
        // The user's own learned verbs/adjectives, when their pos maps to a
        // conjugation class and the reading is kana (conjugate() works on kana).
        const cards = await api.japanese.quizPool({ kind: 'vocab' })
        const own: DojoWord[] = []
        for (const c of cards) {
          const cls = posToWordClass(c.pos, c.front)
          if (!cls || !c.reading) continue
          // ANY selected form, not just the first: gating on forms[0] dropped
          // every card that simply cannot take that one form — all i-adjectives
          // when 'masu' led, all verbs when 'adverbial' did — even though the
          // `pairs` builder below already filters form by form.
          if (!forms.some((f) => conjugate(c.reading!, cls, f))) continue
          if (own.some((w) => w.kana === c.reading)) continue
          own.push({ kanji: c.front, kana: c.reading, cls, gloss: c.back })
        }
        words = [...own, ...words.filter((w) => !own.some((o) => o.kana === w.kana))]
      }
      const pairs = words.flatMap((w) =>
        forms.filter((f) => conjugate(w.kana, w.cls, f) !== null).map((f) => ({ w, f }))
      )
      if (pairs.length < 5) {
        setError('Pick at least one form that these words can take.')
        return
      }
      const next = cycler(pairs)
      setSpec({
        kind: 'conjRace',
        seconds: SECONDS,
        mode: 'enter',
        settings: { forms, cards: useCards },
        next: (): RaceItem => {
          const { w, f } = next()
          const answer = conjugate(w.kana, w.cls, f)!
          return {
            prompt: `${w.kanji}（${w.kana}）`,
            instruction: `${w.gloss} → ${FORM_LABELS[f]}`,
            answers: [answer],
            reveal: answer
          }
        }
      })
    } finally {
      setLoading(false)
    }
  }

  if (spec) return <ArcadeShell spec={spec} onExit={() => setSpec(null)} />

  return (
    <SessionLauncher
      summary={
        <div>
          <p className="text-2xl font-semibold text-white">Sixty seconds of verb forms</p>
          <p className="mt-2 text-sm text-gray-400">
            Type the asked-for form and press Enter, so a typo does not cost the clock twice.
          </p>
        </div>
      }
      defaults={`${forms.map((f) => FORM_LABELS[f]).join(', ') || 'no forms'}${useCards ? ' · with my verbs' : ''}`}
      startLabel="Start 60-second race"
      onStart={() => void start()}
      starting={loading}
      disabled={forms.length === 0}
      error={error ?? (forms.length === 0 ? 'Pick at least one form under Options.' : null)}
      options={
        <>
          <div>
            <p className="label mb-2">Forms</p>
            <div className="flex flex-wrap gap-1.5">
              {DOJO_FORMS.map((f) => (
                <button
                  key={f}
                  aria-pressed={forms.includes(f)}
                  className={`chip-toggle ${forms.includes(f) ? 'chip-toggle-active' : ''}`}
                  onClick={() => toggleForm(f)}
                >
                  {FORM_LABELS[f]}
                </button>
              ))}
            </div>
          </div>
          <button
            aria-pressed={useCards}
            className={`chip-toggle ${useCards ? 'chip-toggle-active' : ''}`}
            onClick={() => setUseCards((v) => !v)}
          >
            Include my learned verbs
          </button>
        </>
      }
    >
      <QuizRecord kind="conjRace" />
    </SessionLauncher>
  )
}
