import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import CardSourceBadge from '../components/CardSourceBadge'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import type { JpLessonKind, JpQuizItem } from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'
type Direction = 'jp2en' | 'en2jp' | 'jp2reading' | 'cloze'
interface Stats {
  score: number
  total: number
  streak: number
  best: number
}

const ZERO: Stats = { score: 0, total: 0, streak: 0, best: 0 }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Cloze needs an example sentence that actually contains the word, and the
// word must not BE the sentence (grammar cards' front is the whole sentence).
function clozable(item: JpQuizItem): boolean {
  return (
    !!item.exampleJp &&
    item.exampleJp.includes(item.front) &&
    item.exampleJp.trim() !== item.front.trim()
  )
}

// The visible prompt / answer text for an item under the current direction.
function promptOf(item: JpQuizItem, dir: Direction): string {
  if (dir === 'en2jp') return item.back
  if (dir === 'cloze') return (item.exampleJp ?? '').replace(item.front, '＿＿')
  return item.front
}

function answerOf(item: JpQuizItem, dir: Direction): string {
  if (dir === 'jp2en') return item.back
  if (dir === 'jp2reading') return item.reading ?? ''
  return item.front // en2jp and cloze both answer with the word itself
}

// Distractors must read differently from the answer (and from each other), or
// a "wrong" option could be textually identical to the right one.
function pickDistractors(pool: JpQuizItem[], target: JpQuizItem, dir: Direction): JpQuizItem[] {
  const taken = new Set([answerOf(target, dir)])
  const out: JpQuizItem[] = []
  // Prefer same-kind (and for vocab same part-of-speech) distractors — they
  // are the plausible ones; fall back to anything to keep 4 options.
  const tiers = [
    pool.filter(
      (i) => i.lessonKind === target.lessonKind && (target.pos == null || i.pos === target.pos)
    ),
    pool.filter((i) => i.lessonKind === target.lessonKind),
    pool
  ]
  for (const tier of tiers) {
    for (const item of shuffle(tier)) {
      if (out.length >= 3) return out
      const text = answerOf(item, dir)
      if (item.id === target.id || taken.has(text)) continue
      taken.add(text)
      out.push(item)
    }
  }
  return out
}

const DIRECTION_LABELS: Record<Direction, string> = {
  jp2en: '日本語 → English',
  en2jp: 'English → 日本語',
  jp2reading: '日本語 → Reading',
  cloze: 'Fill the blank'
}

export default function JapaneseQuizPage() {
  const [courseId, setCourseId] = usePersistedState<number | null>('jpQuizCourse', null)
  const [kind, setKind] = usePersistedState<JpLessonKind | null>('jpQuizKind', null)
  // Multi-select: each question is asked in a random enabled direction the
  // card supports (renshuu's "vector" idea). New key on purpose — the old
  // single-direction 'jpQuizDirection' value would crash a .includes().
  const [directions, setDirections] = usePersistedState<Direction[]>('jpQuizDirections', ['jp2en'])
  const [length, setLength] = usePersistedState<number>('jpQuizLength', 10) // 0 = endless

  const qc = useQueryClient()
  const { data: courses = [] } = useQuery({
    queryKey: qk.japanese.courses,
    queryFn: () => api.japanese.listCourses()
  })
  const { data: history } = useQuery({
    queryKey: qk.quiz.history('japanese'),
    queryFn: () => api.quiz.history('japanese')
  })

  const [phase, setPhase] = useState<Phase>('setup')
  const [current, setCurrent] = useState<JpQuizItem | null>(null)
  const [options, setOptions] = useState<JpQuizItem[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(ZERO)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newBest, setNewBest] = useState(false)

  const deckRef = useRef<JpQuizItem[]>([])
  const statsRef = useRef<Stats>(ZERO)
  const lengthRef = useRef(0)
  // Per-direction sub-pools (a card only enters a direction it supports) and
  // their id sets for the per-question direction pick.
  const dirPoolsRef = useRef<Map<Direction, JpQuizItem[]>>(new Map())
  const dirIdsRef = useRef<Map<Direction, Set<number>>>(new Map())
  const [qDir, setQDir] = useState<Direction>('jp2en')
  const loggedRef = useRef(false)

  async function startGame() {
    setError(null)
    setLoading(true)
    try {
      const base = await api.japanese.quizPool({ courseId, kind })
      const pools = new Map<Direction, JpQuizItem[]>()
      for (const d of directions) {
        let pool = base
        // Reading mode only makes sense for cards whose written form differs
        // from its kana reading — kana-only words have nothing to quiz.
        if (d === 'jp2reading') pool = base.filter((i) => i.reading && i.reading !== i.front)
        // Cloze needs an example sentence containing the word to blank out.
        if (d === 'cloze') pool = base.filter(clozable)
        // A direction needs 4 distinct answers for 4 options; ones that fall
        // short are silently dropped unless nothing survives.
        const distinct = new Set(pool.map((i) => answerOf(i, d))).size
        if (pool.length > 0 && distinct >= 4) pools.set(d, pool)
      }
      if (pools.size === 0) {
        const only = directions.length === 1 ? directions[0] : null
        setError(
          base.length === 0
            ? 'No learned cards match these filters. Mark some lessons as learned first.'
            : only === 'jp2reading'
              ? 'No learned cards with a kanji form + reading match these filters. Learn kanji or vocab lessons first.'
              : only === 'cloze'
                ? 'No learned cards with example sentences match these filters — cloze needs cards whose example contains the word.'
                : 'Not enough cards for the selected directions — each needs at least 4 cards with different answers. Learn more lessons or widen the filters.'
        )
        return
      }
      dirPoolsRef.current = pools
      dirIdsRef.current = new Map(
        [...pools.entries()].map(([d, p]) => [d, new Set(p.map((i) => i.id))])
      )
      // The deck holds every card usable in at least one enabled direction.
      const byId = new Map<number, JpQuizItem>()
      for (const p of pools.values()) for (const i of p) byId.set(i.id, i)
      deckRef.current = shuffle([...byId.values()])
      statsRef.current = ZERO
      lengthRef.current = length
      loggedRef.current = false
      setNewBest(false)
      setStats(ZERO)
      setPhase('play')
      nextQuestion()
    } finally {
      setLoading(false)
    }
  }

  function nextQuestion() {
    if (deckRef.current.length === 0) {
      const byId = new Map<number, JpQuizItem>()
      for (const p of dirPoolsRef.current.values()) for (const i of p) byId.set(i.id, i)
      deckRef.current = shuffle([...byId.values()])
    }
    const item = deckRef.current.pop()!
    // Random enabled direction this card supports (non-empty by construction).
    const supported = [...dirPoolsRef.current.keys()].filter((d) =>
      dirIdsRef.current.get(d)!.has(item.id)
    )
    const dir = supported[Math.floor(Math.random() * supported.length)]
    const distractors = pickDistractors(dirPoolsRef.current.get(dir)!, item, dir)
    setQDir(dir)
    setCurrent(item)
    setOptions(shuffle([item, ...distractors]))
    setPicked(null)
    setAnswered(false)
  }

  function handleAnswer(optionId: number | null) {
    if (answered || !current) return
    const correct = optionId === current.id
    const s = statsRef.current
    const streak = correct ? s.streak + 1 : 0
    const next: Stats = {
      score: s.score + (correct ? 1 : 0),
      total: s.total + 1,
      streak,
      best: Math.max(s.best, streak)
    }
    statsRef.current = next
    setStats(next)
    setPicked(optionId)
    setAnswered(true)
  }

  function endGame() {
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      // Decide "new personal best" BEFORE invalidating, or the refetched
      // history would already contain this round and the banner would flip.
      const prev = history?.best
      setNewBest(s.total >= 5 && (!prev || s.score / s.total > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'japanese',
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: { courseId, kind, directions, length }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('japanese') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  function advance() {
    if (lengthRef.current > 0 && statsRef.current.total >= lengthRef.current) endGame()
    else nextQuestion()
  }

  // Keyboard: 1-4 answers, Enter advances (same scheme as the SRS review page).
  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (!answered && e.key >= '1' && e.key <= '4') {
        const opt = options[Number(e.key) - 1]
        if (opt) {
          e.preventDefault()
          handleAnswer(opt.id)
        }
      } else if (answered && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, options, answered])

  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader
          back={{ to: "/japanese", label: "Japanese" }}
          title="Practice Quiz"
          subtitle="Multiple choice over the lessons you have marked as learned."
        />

        <div className="card p-5 space-y-5">
          <Group label="Course">
            <Pill active={courseId === null} onClick={() => setCourseId(null)} label="All" />
            {courses.map((c) => (
              <Pill
                key={c.id}
                active={courseId === c.id}
                onClick={() => setCourseId(c.id)}
                label={c.title}
              />
            ))}
          </Group>

          <Group label="Content">
            <Pill active={kind === null} onClick={() => setKind(null)} label="Everything" />
            <Pill active={kind === 'vocab'} onClick={() => setKind('vocab')} label="Vocabulary" />
            <Pill active={kind === 'kanji'} onClick={() => setKind('kanji')} label="Kanji" />
            <Pill active={kind === 'grammar'} onClick={() => setKind('grammar')} label="Grammar sentences" />
          </Group>

          <Group label="Directions">
            {(Object.keys(DIRECTION_LABELS) as Direction[]).map((d) => (
              <button
                key={d}
                onClick={() =>
                  setDirections(
                    directions.includes(d)
                      ? directions.filter((x) => x !== d)
                      : [...directions, d]
                  )
                }
                className={directions.includes(d) ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
              >
                {DIRECTION_LABELS[d]}
              </button>
            ))}
          </Group>

          <Group label="Length">
            <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
            <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            className="btn-primary w-full"
            disabled={loading || directions.length === 0}
            onClick={startGame}
          >
            {loading ? 'Loading…' : 'Start quiz'}
          </button>
        </div>

        <QuizRecord kind="japanese" />
      </div>
    )
  }

  if (phase === 'summary') {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">Quiz complete</p>
          <p className="mt-3 text-5xl font-bold">
            {stats.score}
            <span className="text-2xl text-gray-500"> / {stats.total}</span>
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-400">
            <span>{accuracy}% correct</span>
            <span>Best streak {stats.best}</span>
          </div>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          <div className="mt-6 flex gap-2">
            <button className="btn-primary flex-1" onClick={() => setPhase('setup')}>
              Play again
            </button>
            <Link to="/japanese" className="btn-ghost flex-1 text-center">
              Back
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ---- play phase ----
  if (!current) return null
  const dir = qDir
  const jpPrompt = dir !== 'en2jp' // prompt is Japanese → render it big
  const qNum = answered ? stats.total : stats.total + 1
  const isLast = lengthRef.current > 0 && stats.total >= lengthRef.current

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-medium">
          Question {qNum}
          {lengthRef.current > 0 ? ` of ${lengthRef.current}` : ''}
        </span>
        <div className="flex items-center gap-4 text-gray-400">
          <span>
            Score {stats.score}/{stats.total}
          </span>
          <span>Streak {stats.streak}</span>
          <button className="btn-ghost py-1 px-2 text-xs" onClick={endGame}>
            End quiz
          </button>
        </div>
      </div>

      <div className="card p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          {dir === 'jp2en'
            ? 'What does this mean?'
            : dir === 'jp2reading'
              ? 'How is this read?'
              : dir === 'cloze'
                ? 'What fills the blank?'
                : 'Which is the Japanese?'}
        </p>
        <p
          className={`mt-3 ${
            dir === 'cloze' ? 'text-2xl' : jpPrompt ? 'text-3xl' : 'text-xl'
          } leading-relaxed`}
        >
          {promptOf(current, dir)}
        </p>
        {dir === 'cloze' && current.exampleEn && (
          <p className="mt-2 text-sm text-gray-500">{current.exampleEn}</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((o, i) => {
          const correct = answered && o.id === current.id
          const wrongPick = answered && picked === o.id && !correct
          return (
            <button
              key={o.id}
              disabled={answered}
              onClick={() => handleAnswer(o.id)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                correct
                  ? 'border-green-500 bg-green-500/15'
                  : wrongPick
                    ? 'border-red-500 bg-red-500/15'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
              } ${answered ? 'cursor-default' : ''}`}
            >
              <span className={`${dir === 'jp2en' ? 'text-sm' : 'text-lg'} font-medium`}>
                {answerOf(o, dir)}
              </span>
              <kbd className="kbd float-right">
                {i + 1}
              </kbd>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="card mt-4 p-4">
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              picked === current.id ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {picked === current.id ? 'Correct' : picked === null ? 'Skipped' : 'Incorrect'}
          </p>
          <p className="mt-1 text-lg">
            {current.front}
            {current.reading && current.reading !== current.front && (
              <span className="ml-2 text-sm text-gray-400">{current.reading}</span>
            )}
          </p>
          <p className="text-sm text-gray-300">{current.back}</p>
          {(current.onyomi || current.kunyomi) && (
            <p className="mt-1 text-xs text-gray-400">
              {current.onyomi && <span className="mr-3">音 {current.onyomi}</span>}
              {current.kunyomi && <span>訓 {current.kunyomi}</span>}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {current.lessonKind === 'grammar'
              ? 'Grammar'
              : current.lessonKind === 'kanji'
                ? 'Kanji'
                : 'Vocab'}{' '}
            · {current.lessonTitle}
          </p>
          {current.sourceTitle && (
            <div className="mt-2">
              <CardSourceBadge card={current} />
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {!answered && (
          <button className="btn-ghost" onClick={() => handleAnswer(null)}>
            Reveal answer
          </button>
        )}
        {answered &&
          (isLast ? (
            <button className="btn-primary" onClick={endGame}>
              See results (Enter)
            </button>
          ) : (
            <button className="btn-primary" onClick={advance}>
              Next (Enter)
            </button>
          ))}
      </div>
    </div>
  )
}
