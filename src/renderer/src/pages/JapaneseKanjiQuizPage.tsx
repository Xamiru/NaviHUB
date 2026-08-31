import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import type { ComponentQuizItem } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import StudySessionFrame, { SessionEvidence, SessionFeedback } from '../components/StudySessionFrame'

// Build-a-kanji (kind 'components'): the kanji is shown with its meaning and
// reading; assemble it by toggling exactly the components it contains out of a
// grid of real parts + stroke-similar decoys. One attempt per showing; a miss
// reveals the decomposition and re-enters the queue at the tail (the typed
// drill's re-enqueue semantics, selection-based).

type Source = 'cards' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
const LEVELS: Source[] = ['N5', 'N4', 'N3', 'N2', 'N1']

interface Chip {
  char: string
  strokes: number | null
}

export default function JapaneseKanjiQuizPage() {
  const [source, setSource] = usePersistedState<Source>('jpComponentsSource', 'cards')
  const [length, setLength] = usePersistedState<number>('jpComponentsLength', 10)
  const [items, setItems] = useState<ComponentQuizItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.japanese.componentQuizPool({
        source: source === 'cards' ? { kind: 'cards' } : { kind: 'level', level: source },
        limit: length
      })
      if (pool.length === 0) {
        setError(
          source === 'cards'
            ? 'No decomposable kanji found in your kanji lessons. Install the KRADFILE pack in Settings → Dictionaries, or pick an N level.'
            : 'No kanji available — install the KRADFILE pack (and KANJIDIC for level filters) in Settings → Dictionaries.'
        )
        return
      }
      setItems(pool)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Build-a-Kanji"
        subtitle="Pick exactly the parts that form the kanji. Decoys included."
        actions={
          <Link to="/japanese/kanji" className="btn-ghost">
            Search by parts
          </Link>
        }
      />

      {items ? (
        <ComponentDrill
          items={items}
          settings={{ source, length }}
          onExit={() => setItems(null)}
        />
      ) : (
        <div>
          <div className="card p-5 space-y-5">
            <Group label="Kanji from">
              <Pill active={source === 'cards'} onClick={() => setSource('cards')} label="My kanji cards" />
              {LEVELS.map((l) => (
                <Pill key={l} active={source === l} onClick={() => setSource(l)} label={l} />
              ))}
            </Group>
            <Group label="Length">
              <Pill active={length === 10} onClick={() => setLength(10)} label="10 kanji" />
              <Pill active={length === 20} onClick={() => setLength(20)} label="20 kanji" />
            </Group>
            {error && <p className="text-sm text-signal-anomaly">{error}</p>}
            <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
              {loading ? 'Loading…' : 'Start drill'}
            </button>
          </div>
          <QuizRecord kind="components" />
        </div>
      )}
    </div>
  )
}

function ComponentDrill({
  items,
  settings,
  onExit
}: {
  items: ComponentQuizItem[]
  settings: Record<string, unknown>
  onExit: () => void
}) {
  const qc = useQueryClient()
  const [queue, setQueue] = useState<ComponentQuizItem[]>(() => shuffle(items))
  const [index, setIndex] = useState(0)
  const [chips, setChips] = useState<Chip[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [revealed, setRevealed] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const [firstTryCorrect, setFirstTryCorrect] = useState(0)
  const [missed, setMissed] = useState<Set<string>>(new Set())
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const loggedRef = useRef(false)

  const current = queue[index] ?? null
  const finished = index >= queue.length

  // Reshuffle the chip grid per showing.
  useEffect(() => {
    if (!current) return
    setChips(shuffle([...current.components, ...current.decoys]))
    setSelected(new Set())
    setRevealed(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, queue])

  useEffect(() => {
    if (!finished || loggedRef.current || items.length === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind: 'components',
        score: firstTryCorrect,
        total: items.length,
        bestStreak,
        settings
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('components') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  function toggle(char: string): void {
    if (revealed) return
    setSelected((s) => {
      const next = new Set(s)
      if (next.has(char)) next.delete(char)
      else next.add(char)
      return next
    })
  }

  function submit(): void {
    if (!current) return
    if (revealed) {
      setIndex((i) => i + 1)
      return
    }
    if (selected.size === 0) return
    const target = new Set(current.components.map((c) => c.char))
    const correct = selected.size === target.size && [...selected].every((c) => target.has(c))
    setWasCorrect(correct)
    setRevealed(true)
    if (correct) {
      if (!missed.has(current.kanji)) setFirstTryCorrect((n) => n + 1)
      const s = streak + 1
      setStreak(s)
      setBestStreak((b) => Math.max(b, s))
    } else {
      setStreak(0)
      setMissed((m) => new Set(m).add(current.kanji))
      setQueue((q) => [...q, current]) // try again later
    }
  }

  // 1-9 toggle the nth chip, Enter submits / continues.
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (e.key === 'Enter') {
        e.preventDefault()
        submit()
        return
      }
      if (!revealed && e.key >= '1' && e.key <= '9') {
        const chip = chips[Number(e.key) - 1]
        if (chip) {
          e.preventDefault()
          toggle(chip.char)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips, revealed, selected, index, queue])

  if (finished) {
    const pct = items.length ? Math.round((firstTryCorrect / items.length) * 100) : 0
    return (
      <StudySessionFrame title="Build-a-kanji results" subtitle="First-try component recall" surface={false}>
      <div className="card p-6 text-center">
        <p className="text-3xl font-bold">
          {firstTryCorrect} / {items.length}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {pct === 100 ? 'Flawless.' : `${pct}% on the first try · best streak ${bestStreak}`}
        </p>
        {missed.size > 0 && (
          <p className="mt-3 text-lg text-gray-300">
            <span className="mr-2 text-xs uppercase tracking-widest text-gray-500">Missed</span>
            {[...missed].join('　')}
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
  if (!current) return null

  const target = new Set(current.components.map((c) => c.char))

  return (
    <StudySessionFrame
      title="Build a kanji"
      subtitle="Select every component that belongs to the target."
      progress={{ current: index + 1, total: queue.length, label: 'Kanji' }}
      actions={<button className="btn-ghost" onClick={onExit}>Stop</button>}
      rail={
        <>
          <SessionEvidence title="Session evidence">
            <p>Current streak: {streak}</p>
            <p>Best streak: {bestStreak}</p>
            <p>First-try correct: {firstTryCorrect}</p>
          </SessionEvidence>
          <SessionEvidence title="Keyboard">
            Keys 1-9 toggle components. Enter checks the selection or continues after feedback.
          </SessionEvidence>
        </>
      }
      feedback={
        revealed ? (
          <SessionFeedback tone={wasCorrect ? 'correct' : 'incorrect'} title={wasCorrect ? 'Correct' : 'Component evidence'}>
            {wasCorrect ? current.kanji : `${current.kanji} = ${current.components.map((component) => component.char).join(' + ')}`}
          </SessionFeedback>
        ) : undefined
      }
    >
      <p className="text-center text-7xl leading-none">{current.kanji}</p>
      <p className="mt-3 text-center text-sm text-gray-400">
        {current.meaning ?? ''}
        {current.meaning && current.reading ? ' · ' : ''}
        {current.reading ?? ''}
      </p>

      <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-1.5">
        {chips.map((chip, i) => {
          const isPicked = selected.has(chip.char)
          const inKanji = target.has(chip.char)
          let cls = isPicked ? 'chip-toggle chip-toggle-active' : 'chip-toggle'
          if (revealed) {
            // Green = correct part, red = wrong pick, outline = missed part.
            cls = inKanji
              ? isPicked
                ? 'chip-toggle border-signal-affirmative bg-signal-affirmative/15 text-signal-affirmative'
                : 'chip-toggle border-signal-affirmative/60 text-signal-affirmative'
              : isPicked
                ? 'chip-toggle border-signal-anomaly bg-signal-anomaly/15 text-signal-anomaly'
                : 'chip-toggle opacity-50'
          }
          return (
            <button
              key={chip.char}
              onClick={() => toggle(chip.char)}
              className={`min-w-[2.4rem] text-lg ${cls}`}
              disabled={revealed}
            >
              {chip.char}
              <span className="ml-1 align-super text-[9px] text-gray-600">{i + 1}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 text-center">
        {revealed ? (
          <>
            <button className="btn-primary mt-4" onClick={submit} autoFocus>
              Continue (Enter)
            </button>
          </>
        ) : (
          <button className="btn-primary" disabled={selected.size === 0} onClick={submit}>
            Check (Enter)
          </button>
        )}
      </div>
    </StudySessionFrame>
  )
}
