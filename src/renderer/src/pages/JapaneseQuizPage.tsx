import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import CardSourceBadge from '../components/CardSourceBadge'
import type { JpLessonKind, JpQuizItem } from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'
type Direction = 'jp2en' | 'en2jp' | 'jp2reading'
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

// The visible prompt / answer text for an item under the current direction.
function promptOf(item: JpQuizItem, dir: Direction): string {
  return dir === 'en2jp' ? item.back : item.front
}

function answerOf(item: JpQuizItem, dir: Direction): string {
  if (dir === 'jp2en') return item.back
  if (dir === 'jp2reading') return item.reading ?? ''
  return item.front
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

export default function JapaneseQuizPage() {
  const [courseId, setCourseId] = usePersistedState<number | null>('jpQuizCourse', null)
  const [kind, setKind] = usePersistedState<JpLessonKind | null>('jpQuizKind', null)
  const [direction, setDirection] = usePersistedState<Direction>('jpQuizDirection', 'jp2en')
  const [length, setLength] = usePersistedState<number>('jpQuizLength', 10) // 0 = endless

  const { data: courses = [] } = useQuery({
    queryKey: qk.japanese.courses,
    queryFn: () => api.japanese.listCourses()
  })

  const [phase, setPhase] = useState<Phase>('setup')
  const [current, setCurrent] = useState<JpQuizItem | null>(null)
  const [options, setOptions] = useState<JpQuizItem[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(ZERO)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const poolRef = useRef<JpQuizItem[]>([])
  const deckRef = useRef<JpQuizItem[]>([])
  const statsRef = useRef<Stats>(ZERO)
  const lengthRef = useRef(0)
  const dirRef = useRef<Direction>('jp2en')

  async function startGame() {
    setError(null)
    setLoading(true)
    try {
      let pool = await api.japanese.quizPool({ courseId, kind })
      // Reading mode only makes sense for cards whose written form differs
      // from its kana reading — kana-only words have nothing to quiz.
      if (direction === 'jp2reading') {
        pool = pool.filter((i) => i.reading && i.reading !== i.front)
      }
      const distinct = new Set(pool.map((i) => answerOf(i, direction))).size
      if (pool.length === 0) {
        setError(
          direction === 'jp2reading'
            ? 'No learned cards with a kanji form + reading match these filters. Learn kanji or vocab lessons first.'
            : 'No learned cards match these filters. Mark some lessons as learned first.'
        )
        return
      }
      if (distinct < 4) {
        setError(
          `Need at least 4 cards with different answers for 4 options — found ${distinct}. Learn more lessons or widen the filters.`
        )
        return
      }
      poolRef.current = pool
      deckRef.current = shuffle(pool)
      statsRef.current = ZERO
      lengthRef.current = length
      dirRef.current = direction
      setStats(ZERO)
      setPhase('play')
      nextQuestion()
    } finally {
      setLoading(false)
    }
  }

  function nextQuestion() {
    if (deckRef.current.length === 0) deckRef.current = shuffle(poolRef.current)
    const item = deckRef.current.pop()!
    const distractors = pickDistractors(poolRef.current, item, dirRef.current)
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

  function advance() {
    if (lengthRef.current > 0 && statsRef.current.total >= lengthRef.current) setPhase('summary')
    else nextQuestion()
  }

  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/japanese" className="text-sm text-gray-500 hover:text-white">
            ← Japanese
          </Link>
          <h1 className="mt-1 text-2xl font-bold">🎯 Practice Quiz</h1>
          <p className="text-sm text-gray-500">
            Multiple choice over the lessons you have marked as learned.
          </p>
        </div>

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

          <Group label="Direction">
            <Pill
              active={direction === 'jp2en'}
              onClick={() => setDirection('jp2en')}
              label="日本語 → English"
            />
            <Pill
              active={direction === 'en2jp'}
              onClick={() => setDirection('en2jp')}
              label="English → 日本語"
            />
            <Pill
              active={direction === 'jp2reading'}
              onClick={() => setDirection('jp2reading')}
              label="日本語 → Reading"
            />
          </Group>

          <Group label="Length">
            <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
            <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button className="btn-primary w-full" disabled={loading} onClick={startGame}>
            {loading ? 'Loading…' : 'Start quiz'}
          </button>
        </div>
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
            <span>🔥 Best streak {stats.best}</span>
          </div>
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
  const dir = dirRef.current
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
          <span>🔥 {stats.streak}</span>
          <button className="btn-ghost py-1 px-2 text-xs" onClick={() => setPhase('summary')}>
            ✕ End quiz
          </button>
        </div>
      </div>

      <div className="card p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          {dir === 'jp2en'
            ? 'What does this mean?'
            : dir === 'jp2reading'
              ? 'How is this read?'
              : 'Which is the Japanese?'}
        </p>
        <p className={`mt-3 ${jpPrompt ? 'text-3xl' : 'text-xl'} leading-relaxed`}>
          {promptOf(current, dir)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((o) => {
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
            {picked === current.id ? 'Correct!' : picked === null ? 'Skipped' : 'Incorrect'}
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
            <button className="btn-primary" onClick={() => setPhase('summary')}>
              See results →
            </button>
          ) : (
            <button className="btn-primary" onClick={advance}>
              Next →
            </button>
          ))}
      </div>
    </div>
  )
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="label mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Pill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm transition-colors ${
        active ? 'bg-accent text-white' : 'bg-base-700 text-gray-300 hover:bg-base-600'
      }`}
    >
      {label}
    </button>
  )
}
