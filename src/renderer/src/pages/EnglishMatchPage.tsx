import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { EN_MATCH_SETS } from '@shared/english/collocations'
import { EN_MATCH_THEMES, type EnMatchSet, type EnMatchTheme } from '@shared/english/types'
import { shuffle } from '@shared/shuffle'

// Collocation match: six pairs per set, lefts in order, rights shuffled; click
// a left then a right (or the reverse; keys 1-6 pick left then right, Esc
// clears). A correct pair locks green; a wrong pair flashes and counts a miss.
// Score = pairs matched first try, total = pairs played. One quiz_session of
// kind 'englishMatch' per round.

type Phase = 'setup' | 'play' | 'summary'
type ThemeFilter = 'all' | EnMatchTheme

const THEME_LABEL: Record<EnMatchTheme, string> = {
  'verb-noun': 'Verb + noun',
  'adjective-noun': 'Adjective + noun',
  'phrasal-verb': 'Phrasal verbs',
  preposition: 'Dependent prepositions'
}

export default function EnglishMatchPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [theme, setTheme] = usePersistedState<ThemeFilter>('enMatchTheme', 'all')
  const [sets, setSets] = usePersistedState<number>('enMatchSets', 5)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('englishMatch'),
    queryFn: () => api.quiz.history('englishMatch')
  })

  const pool = useMemo(
    () => (theme === 'all' ? EN_MATCH_SETS : EN_MATCH_SETS.filter((s) => s.theme === theme)),
    [theme]
  )

  const roundRef = useRef<EnMatchSet[]>([])
  const [index, setIndex] = useState(0)
  const [firstTry, setFirstTry] = useState(0)
  const [pairsPlayed, setPairsPlayed] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [misses, setMisses] = useState(0)
  const [newBest, setNewBest] = useState(false)
  const startedAt = useRef(0)
  const [elapsed, setElapsed] = useState(0)
  const loggedRef = useRef(false)

  function start(): void {
    const deck = shuffle(pool)
    roundRef.current = sets > 0 ? deck.slice(0, sets) : deck
    setIndex(0)
    setFirstTry(0)
    setPairsPlayed(0)
    setStreak(0)
    setBestStreak(0)
    setMisses(0)
    setNewBest(false)
    startedAt.current = Date.now()
    loggedRef.current = false
    setPhase('play')
  }

  function endGame(ft: number, played: number, bs: number): void {
    setElapsed(Math.round((Date.now() - startedAt.current) / 1000))
    if (!loggedRef.current && played > 0) {
      loggedRef.current = true
      const prev = history?.best
      setNewBest(played >= 5 && (!prev || ft / played > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'englishMatch',
          score: ft,
          total: played,
          bestStreak: bs,
          settings: { theme, sets }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('englishMatch') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  // A set reports its result when complete.
  function setDone(r: { firstTry: number; misses: number; bestStreak: number; endStreak: number }): void {
    const ft = firstTry + r.firstTry
    const played = pairsPlayed + 6
    const bs = Math.max(bestStreak, r.bestStreak)
    setFirstTry(ft)
    setPairsPlayed(played)
    setMisses((m) => m + r.misses)
    setStreak(r.endStreak)
    setBestStreak(bs)
    const nextIndex = index + 1
    if (nextIndex >= roundRef.current.length) endGame(ft, played, bs)
    else setIndex(nextIndex)
  }

  if (phase === 'play') {
    const set = roundRef.current[index]
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
          <span className="tabular-nums">
            Set {index + 1} / {roundRef.current.length} · {firstTry} first-try · {misses} misses
          </span>
          <button
            className="btn-ghost px-2 py-0.5 text-xs"
            onClick={() => endGame(firstTry, pairsPlayed, bestStreak)}
          >
            End round
          </button>
        </div>
        <MatchSet key={set.key} set={set} streakIn={streak} onDone={setDone} />
      </div>
    )
  }

  if (phase === 'summary') {
    const acc = pairsPlayed ? Math.round((firstTry / pairsPlayed) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold">
            {firstTry} / {pairsPlayed}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {acc}% first try · {misses} misses · best streak {bestStreak} · {elapsed}s
          </p>
          {newBest && <p className="mt-3 text-sm text-accent">New personal best.</p>}
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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/english', label: 'English' }}
        title="Collocation match"
        subtitle="Six pairs a set — verbs with their nouns, adjectives with theirs, phrasal verbs with meanings, words with the prepositions they take."
      />
      <div className="card p-5 space-y-5">
        <Group label="Theme">
          <Pill active={theme === 'all'} onClick={() => setTheme('all')} label="Everything" />
          {EN_MATCH_THEMES.map((t) => (
            <Pill key={t} active={theme === t} onClick={() => setTheme(t)} label={THEME_LABEL[t]} />
          ))}
        </Group>
        <Group label="Sets">
          <Pill active={sets === 5} onClick={() => setSets(5)} label="5 sets" />
          <Pill active={sets === 10} onClick={() => setSets(10)} label="10 sets" />
          <Pill active={sets === 0} onClick={() => setSets(0)} label={`All (${pool.length})`} />
        </Group>
        <p className="text-xs text-gray-500">
          Click a left, then a right (either order); keys 1-6 pick left then right, Esc clears the
          selection, Enter moves on when the set is complete.
        </p>
        <button className="btn-primary w-full" disabled={pool.length === 0} onClick={start}>
          Start ({sets > 0 ? Math.min(sets, pool.length) : pool.length} sets)
        </button>
      </div>
      <QuizRecord kind="englishMatch" />
    </div>
  )
}

function MatchSet({
  set,
  streakIn,
  onDone
}: {
  set: EnMatchSet
  streakIn: number
  onDone: (r: { firstTry: number; misses: number; bestStreak: number; endStreak: number }) => void
}) {
  const rights = useMemo(() => shuffle(set.pairs.map((p) => p.right)), [set])
  const [selLeft, setSelLeft] = useState<number | null>(null)
  const [selRight, setSelRight] = useState<number | null>(null)
  const [matched, setMatched] = useState<Map<number, number>>(new Map()) // left index → right index
  const [tried, setTried] = useState<Set<number>>(new Set()) // lefts that had a wrong attempt
  const [flash, setFlash] = useState<{ l: number; r: number } | null>(null)
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (flashTimer.current) clearTimeout(flashTimer.current) }, [])
  const [misses, setMisses] = useState(0)
  const [streak, setStreak] = useState(streakIn)
  const [bestStreak, setBestStreak] = useState(streakIn)
  const complete = matched.size === set.pairs.length

  function tryPair(l: number, r: number): void {
    const ok = set.pairs[l].right === rights[r]
    if (ok) {
      setMatched((m) => new Map(m).set(l, r))
      if (!tried.has(l)) {
        setStreak((s) => {
          const n = s + 1
          setBestStreak((b) => Math.max(b, n))
          return n
        })
      }
    } else {
      setMisses((n) => n + 1)
      setTried((t) => new Set(t).add(l))
      setStreak(0)
      setFlash({ l, r })
      // Tracked so unmounting mid-flash (End round within 400 ms of a wrong
      // pair) does not leave a timer setting state on a dead component.
      if (flashTimer.current) clearTimeout(flashTimer.current)
      flashTimer.current = setTimeout(() => setFlash(null), 400)
    }
    setSelLeft(null)
    setSelRight(null)
  }

  function pickLeft(l: number): void {
    if (matched.has(l)) return
    if (selRight !== null) tryPair(l, selRight)
    else setSelLeft((cur) => (cur === l ? null : l))
  }
  function pickRight(r: number): void {
    if ([...matched.values()].includes(r)) return
    if (selLeft !== null) tryPair(selLeft, r)
    else setSelRight((cur) => (cur === r ? null : r))
  }
  function finish(): void {
    const firstTry = [...matched.keys()].filter((l) => !tried.has(l)).length
    onDone({ firstTry, misses, bestStreak, endStreak: streak })
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable) return
      if (complete) {
        if (e.key === 'Enter') {
          e.preventDefault()
          finish()
        }
        return
      }
      const n = Number(e.key)
      if (n >= 1 && n <= 6) {
        e.preventDefault()
        if (selLeft === null) pickLeft(n - 1)
        else pickRight(n - 1)
      } else if (e.key === 'Escape') {
        setSelLeft(null)
        setSelRight(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selLeft, selRight, matched, complete, tried, misses, streak, bestStreak])

  const btn = (active: boolean, done: boolean, bad: boolean): string =>
    `flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors ${
      done
        ? 'border-green-500/60 bg-green-500/10 text-green-300'
        : bad
          ? 'border-red-500/60 bg-red-500/15 text-red-300'
          : active
            ? 'border-accent bg-accent/15'
            : 'border-base-700 hover:bg-base-700/60'
    }`

  return (
    <div className="space-y-3">
      <div className="card p-4">
        <p className="text-xs uppercase tracking-widest text-gray-600">{THEME_LABEL[set.theme]}</p>
        <h2 className="text-lg font-medium">{set.title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          {set.pairs.map((p, l) => {
            const done = matched.has(l)
            return (
              <button
                key={p.left}
                className={btn(selLeft === l, done, flash?.l === l)}
                disabled={done}
                onClick={() => pickLeft(l)}
              >
                {!done && <kbd className="kbd shrink-0">{l + 1}</kbd>}
                <span>{p.left}</span>
              </button>
            )
          })}
        </div>
        <div className="space-y-1.5">
          {rights.map((r, ri) => {
            const done = [...matched.values()].includes(ri)
            return (
              <button
                key={r}
                className={btn(selRight === ri, done, flash?.r === ri)}
                disabled={done}
                onClick={() => pickRight(ri)}
              >
                {!done && selLeft !== null && <kbd className="kbd shrink-0">{ri + 1}</kbd>}
                <span>{r}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">
          {matched.size} / 6 · {misses} {misses === 1 ? 'miss' : 'misses'}
        </span>
        <span className="flex-1" />
        {complete && (
          <button className="btn-primary" onClick={finish} autoFocus>
            Next set (Enter)
          </button>
        )}
      </div>
    </div>
  )
}
