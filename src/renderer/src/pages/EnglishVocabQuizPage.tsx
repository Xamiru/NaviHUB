import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import EmptyState from '../components/EmptyState'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import { Group, Pill } from '../components/PillGroup'
import type { EnBand, EnVocabMode, EnVocabQuestion, EnWordInput } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import { EN_IDIOMS } from '@shared/english/idioms'
import { buildIdiomPool } from '@shared/english/idiomPool'

// Advanced-vocabulary MCQ (the ProgrammingQuizPage loop over an IPC pool):
// words tiered by OpenSubtitles frequency band, or the user's saved list.
// Misses from the band sources are saved into en_word at endGame — a wrong
// answer IS the signal that this word belongs in the review deck.

type Phase = 'setup' | 'play' | 'summary'
type Source = EnBand | 'myWords' | 'idioms'
type IdiomKind = 'all' | 'idiom' | 'phrasal'

interface Question {
  id: string
  q: EnVocabQuestion
  options: string[]
  correct: number
}

interface Stats {
  score: number
  total: number
  streak: number
  best: number
}
const ZERO: Stats = { score: 0, total: 0, streak: 0, best: 0 }

const MODE_LABEL: Record<EnVocabMode, string> = {
  word2def: 'Meaning',
  def2word: 'Reverse',
  synonyms: 'Synonyms'
}
const BAND_LABEL: Record<EnBand, string> = {
  upper: 'Upper (4-10k)',
  advanced: 'Advanced (10-25k)',
  rare: 'Rare (25-50k)'
}

function toQuestion(q: EnVocabQuestion, i: number): Question {
  const options = shuffle([q.answer, ...q.distractors])
  return { id: `${q.word}-${i}`, q, options, correct: options.indexOf(q.answer) }
}

export default function EnglishVocabQuizPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [mode, setMode] = usePersistedState<EnVocabMode>('enVocabMode', 'word2def')
  const [source, setSource] = usePersistedState<Source>('enVocabSource', 'advanced')
  const [length, setLength] = usePersistedState<number>('enVocabLength', 10)
  const [idiomKind, setIdiomKind] = usePersistedState<IdiomKind>('enVocabIdiomKind', 'all')

  const [current, setCurrent] = useState<Question | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [stats, setStats] = useState<Stats>(ZERO)
  const [newBest, setNewBest] = useState(false)
  const [addedToDeck, setAddedToDeck] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const deckRef = useRef<Question[]>([])
  const poolRef = useRef<Question[]>([])
  const statsRef = useRef<Stats>(ZERO)
  const lengthRef = useRef(10)
  const loggedRef = useRef(false)
  const missesRef = useRef<Map<string, EnWordInput>>(new Map())

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('englishVocab'),
    queryFn: () => api.quiz.history('englishVocab')
  })
  const { data: dictInfo } = useQuery({
    queryKey: qk.english.dictInfo,
    queryFn: () => api.english.dictInfo()
  })
  const { data: freqInfo } = useQuery({
    queryKey: qk.english.freqInfo,
    queryFn: () => api.english.freqInfo()
  })

  const answered = picked !== null
  const packsReady = !!dictInfo && !!freqInfo
  // My-words rounds work with no packs; synonyms needs the WordNet synsets.
  const effectiveMode: EnVocabMode =
    (source === 'myWords' || source === 'idioms') && mode === 'synonyms' ? 'word2def' : mode

  async function startGame(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      // Idioms are content in code — no IPC; the pool builder mirrors the
      // main-side shape so everything below is source-agnostic.
      const pool =
        source === 'idioms'
          ? buildIdiomPool(
              idiomKind === 'all' ? EN_IDIOMS : EN_IDIOMS.filter((i) => i.kind === idiomKind),
              effectiveMode === 'def2word' ? 'def2word' : 'word2def',
              Math.max(length, 40)
            )
          : await api.english.vocabPool({
              mode: effectiveMode,
              source: source === 'myWords' ? { kind: 'myWords' } : { kind: 'band', band: source },
              limit: Math.max(length, 40)
            })
      if (pool.length === 0) {
        setError(
          source === 'myWords'
            ? 'Not enough saved words yet — save at least 8 from the dictionary first.'
            : 'The pool came back empty — check that both English packs are installed in Settings.'
        )
        return
      }
      poolRef.current = pool.map(toQuestion)
      deckRef.current = shuffle(poolRef.current)
      statsRef.current = ZERO
      lengthRef.current = length
      loggedRef.current = false
      missesRef.current = new Map()
      setStats(ZERO)
      setNewBest(false)
      setAddedToDeck(0)
      setPhase('play')
      nextQuestion()
    } finally {
      setLoading(false)
    }
  }

  function nextQuestion(): void {
    if (deckRef.current.length === 0) deckRef.current = shuffle(poolRef.current)
    const q = deckRef.current.shift() ?? null
    setCurrent(q)
    setPicked(null)
  }

  function handleAnswer(index: number | null): void {
    if (picked !== null || !current) return
    setPicked(index ?? -1)
    const right = index !== null && index === current.correct
    if (!right && source !== 'myWords') {
      // The miss IS the save signal — saved words are already in the deck.
      missesRef.current.set(current.q.word, {
        word: current.q.word,
        meaning: current.q.def,
        pos: current.q.pos,
        phonetic: current.q.ipa
      })
    }
    const s = statsRef.current
    const streak = right ? s.streak + 1 : 0
    statsRef.current = {
      score: s.score + (right ? 1 : 0),
      total: s.total + 1,
      streak,
      best: Math.max(s.best, streak)
    }
    setStats(statsRef.current)
  }

  function endGame(): void {
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      const prev = history?.best
      setNewBest(s.total >= 5 && (!prev || s.score / s.total > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'englishVocab',
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: { mode: effectiveMode, source, idiomKind: source === 'idioms' ? idiomKind : undefined, length: lengthRef.current }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('englishVocab') }))
        .catch(() => {})
      const misses = [...missesRef.current.values()]
      if (misses.length > 0) {
        void api.english
          .saveWords(misses)
          .then((added) => {
            setAddedToDeck(added)
            return qc.invalidateQueries({ queryKey: qk.english.all })
          })
          .catch(() => {})
      }
    }
    setPhase('summary')
  }

  function advance(): void {
    if (lengthRef.current > 0 && statsRef.current.total >= lengthRef.current) endGame()
    else nextQuestion()
  }

  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (!answered && e.key >= '1' && e.key <= '4') {
        const n = Number(e.key) - 1
        if (current && n < current.options.length) {
          e.preventDefault()
          handleAnswer(n)
        }
      } else if (answered && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, answered])

  if (phase === 'setup') {
    const bandBlocked = source !== 'myWords' && source !== 'idioms' && !packsReady
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader
          back={{ to: '/english', label: 'English' }}
          title="Vocabulary"
          subtitle="Advanced words by frequency band — the rarer the band, the deeper the water."
        />

        <div className="card p-5 space-y-5">
          <Group label="Mode">
            {(Object.keys(MODE_LABEL) as EnVocabMode[]).map((m) => (
              <Pill
                key={m}
                active={mode === m}
                onClick={() => setMode(m)}
                label={MODE_LABEL[m]}
              />
            ))}
          </Group>

          <Group label="Words">
            {(Object.keys(BAND_LABEL) as EnBand[]).map((b) => (
              <Pill
                key={b}
                active={source === b}
                onClick={() => setSource(b)}
                label={BAND_LABEL[b]}
              />
            ))}
            <Pill
              active={source === 'myWords'}
              onClick={() => setSource('myWords')}
              label="My saved words"
            />
            <Pill
              active={source === 'idioms'}
              onClick={() => setSource('idioms')}
              label="Idioms & phrasals"
            />
          </Group>
          {source === 'idioms' && (
            <Group label="Set">
              <Pill active={idiomKind === 'all'} onClick={() => setIdiomKind('all')} label="Both" />
              <Pill active={idiomKind === 'idiom'} onClick={() => setIdiomKind('idiom')} label="Idioms" />
              <Pill active={idiomKind === 'phrasal'} onClick={() => setIdiomKind('phrasal')} label="Phrasal verbs" />
            </Group>
          )}
          {(source === 'myWords' || source === 'idioms') && mode === 'synonyms' && (
            <p className="text-xs text-gray-500">
              {source === 'myWords'
                ? 'Saved words carry no synonym data — this round will ask meanings instead.'
                : 'Idioms have no synonym data — this round will ask meanings instead. Misses join your deck as phrases.'}
            </p>
          )}

          <Group label="Length">
            <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
            <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>

          {error && <p className="text-sm text-red-400">{error}</p>}

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
            <button className="btn-primary w-full" disabled={loading} onClick={() => void startGame()}>
              {loading ? 'Loading…' : 'Start quiz'}
            </button>
          )}
        </div>

        <QuizRecord kind="englishVocab" />
      </div>
    )
  }

  if (phase === 'summary') {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold">
            {stats.score} / {stats.total}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {accuracy}% · best streak {stats.best}
          </p>
          {newBest && <p className="mt-3 text-sm text-accent">New personal best.</p>}
          {addedToDeck > 0 && (
            <p className="mt-3 text-sm text-gray-400">
              {addedToDeck} missed {addedToDeck === 1 ? 'word' : 'words'} added to your review deck.
            </p>
          )}
          <div className="mt-5 flex justify-center gap-2">
            <button className="btn-primary" onClick={() => setPhase('setup')}>
              Play again
            </button>
            <Link to="/english" className="btn-ghost">
              English
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const q = current?.q
  return (
    <StudySessionFrame
      title="Vocabulary challenge"
      subtitle={effectiveMode === 'synonyms' ? 'Closest in meaning' : 'Mistake ledger practice'}
      progress={lengthRef.current > 0 ? { current: Math.min(stats.total + 1, lengthRef.current), total: lengthRef.current, label: 'Quiz' } : undefined}
      actions={<button className="btn-ghost px-2 py-0.5 text-xs" onClick={endGame}>End quiz</button>}
      rail={<SessionEvidence title="Mistake evidence"><p>{stats.score} correct across {stats.total} answers.</p><p className="mt-2">Missed library words are added to the local review deck at the end of the round.</p></SessionEvidence>}
      surface={false}
    >

      <div className="card p-6 text-center">
        {effectiveMode === 'synonyms' && (
          <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">Closest in meaning</p>
        )}
        <p className={effectiveMode === 'def2word' ? 'text-lg leading-snug' : 'text-3xl'}>
          {q?.prompt}
        </p>
        {effectiveMode !== 'def2word' && (
          <p className="mt-2 text-sm text-gray-500">
            {q?.ipa && <span className="mr-3">{q.ipa}</span>}
            {q?.pos}
          </p>
        )}
      </div>

      <div className="mt-3 space-y-1.5">
        {current?.options.map((opt, i) => {
          let cls = 'border-base-700 hover:bg-base-700/60'
          if (answered) {
            if (i === current.correct) cls = 'border-green-500/60 bg-green-500/10 text-green-300'
            else if (i === picked) cls = 'border-red-500/60 bg-red-500/10 text-red-300'
            else cls = 'border-base-700 opacity-60'
          }
          return (
            <button
              key={i}
              className={`flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors ${cls}`}
              disabled={answered}
              onClick={() => handleAnswer(i)}
            >
              <kbd className="kbd mt-0.5 shrink-0">{i + 1}</kbd>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {answered && q && effectiveMode !== 'word2def' && (
        <p className="mt-3 text-sm text-gray-400">
          {q.word}
          {q.ipa && <span className="ml-2 text-gray-500">{q.ipa}</span>} — {q.def}
        </p>
      )}

      <div className="mt-4 flex justify-end gap-2">
        {!answered ? (
          <button className="btn-ghost" onClick={() => handleAnswer(null)}>
            Reveal answer
          </button>
        ) : (
          <button className="btn-primary" onClick={advance}>
            {lengthRef.current > 0 && stats.total >= lengthRef.current ? 'See results' : 'Next'}{' '}
            (Enter)
          </button>
        )}
      </div>
    </StudySessionFrame>
  )
}
