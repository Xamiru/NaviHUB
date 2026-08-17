import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import QuizRecord from '../components/QuizRecord'
import type { JpCard, JpLessonKind } from '@shared/types'
import { shuffle } from '@shared/shuffle'

// JLPT checkpoint: a timed ~30-question mock at a level, built from the OFFLINE
// PACKS (main/jpJlpt.ts) — levelled grammar cloze, a frequency-band vocabulary
// MC, kanji readings gated by KANJIDIC's jlpt stat, and bank sentences to
// translate. Without the packs it falls back to the original sampler over the
// SEEDED COURSES, which measures this app's own curriculum rather than the
// level; the setup and the verdict both say which source produced the score.
// Thirty items cannot certify anything, and the copy says that too.

type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
const LEVELS: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1']

const QUESTION_COUNT = 30
const SECONDS_PER_QUESTION = 20

interface TestCard extends JpCard {
  kind: JpLessonKind
}

interface Question {
  prompt: string
  promptHint: string | null
  heading: string
  options: string[]
  correct: number
  // Reveal info after answering:
  front: string
  reading: string | null
  back: string
}

function distinctOptions(
  answer: string,
  pool: string[],
  count = 3
): string[] | null {
  const taken = new Set([answer])
  const out: string[] = []
  for (const cand of shuffle(pool)) {
    if (out.length >= count) break
    if (!cand || taken.has(cand)) continue
    taken.add(cand)
    out.push(cand)
  }
  return out.length >= 2 ? out : null // accept 3-option questions at worst
}

// Builds a mixed 30-question test from a level's cards: grammar → meaning,
// kanji → reading, vocab → alternating meaning/reading.
function buildTest(cards: TestCard[]): Question[] {
  const byKind = (k: JpLessonKind): TestCard[] => cards.filter((c) => c.kind === k)
  const meaningPool = cards.map((c) => c.back)
  const readingPool = cards.map((c) => c.reading).filter((r): r is string => !!r)

  const questions: Question[] = []
  const push = (card: TestCard, ask: 'meaning' | 'reading'): void => {
    const answer = ask === 'meaning' ? card.back : card.reading
    if (!answer) return
    const wrong = distinctOptions(answer, ask === 'meaning' ? meaningPool : readingPool)
    if (!wrong) return
    const options = shuffle([answer, ...wrong])
    questions.push({
      prompt: card.front,
      promptHint: ask === 'meaning' && card.kind === 'grammar' ? card.reading : null,
      heading: ask === 'meaning' ? 'What does this mean?' : 'How is this read?',
      options,
      correct: options.indexOf(answer),
      front: card.front,
      reading: card.reading,
      back: card.back
    })
  }

  // Aim for a JLPT-ish mix: 1/3 grammar sentences, 1/3 vocab, 1/3 kanji.
  const per = Math.ceil(QUESTION_COUNT / 3)
  shuffle(byKind('grammar')).slice(0, per).forEach((c) => push(c, 'meaning'))
  shuffle(byKind('vocab'))
    .slice(0, per)
    .forEach((c, i) => push(c, i % 2 === 1 && c.reading && c.reading !== c.front ? 'reading' : 'meaning'))
  shuffle(byKind('kanji'))
    .slice(0, per)
    .forEach((c) => push(c, c.reading ? 'reading' : 'meaning'))

  // Top up from anything if a kind ran short.
  if (questions.length < QUESTION_COUNT) {
    for (const c of shuffle(cards)) {
      if (questions.length >= QUESTION_COUNT) break
      if (questions.some((q) => q.front === c.front)) continue
      push(c, 'meaning')
    }
  }
  return shuffle(questions).slice(0, QUESTION_COUNT)
}

export default function JapaneseTestPage() {
  const qc = useQueryClient()
  const [level, setLevel] = usePersistedState<Level>('jpTestLevel', 'N5')
  const { data: courses = [] } = useQuery({
    queryKey: qk.japanese.courses,
    queryFn: () => api.japanese.listCourses()
  })

  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [source, setSource] = useState<'packs' | 'courses'>('packs')
  // Per-section tallies for the verdict (packs source only).
  const [sectionsMeta, setSectionsMeta] = useState<{ key: string; label: string; note: string | null; from: number; to: number }[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const loggedRef = useRef(false)

  const finished = questions !== null && (index >= questions.length || secondsLeft <= 0)
  const current = !finished && questions ? questions[index] : null

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      // Packs first; the seeded-course sampler is the fallback.
      const test = await api.japanese.jlptTestPool({ level })
      if (test) {
        const qs: Question[] = []
        const meta: typeof sectionsMeta = []
        for (const sec of test.sections) {
          const from = qs.length
          for (const q of sec.questions) {
            qs.push({
              prompt: q.prompt,
              promptHint: q.promptHint,
              heading: `${sec.label} — ${q.heading}`,
              options: q.options,
              correct: q.correct,
              front: q.reveal.front,
              reading: q.reveal.reading,
              back: q.reveal.back
            })
          }
          meta.push({ key: sec.key, label: sec.label, note: sec.note, from, to: qs.length })
        }
        loggedRef.current = false
        setSource('packs')
        setSectionsMeta(meta)
        setQuestions(qs)
        setIndex(0)
        setPicked(null)
        setScore(0)
        setAnswers([])
        setSecondsLeft(qs.length * SECONDS_PER_QUESTION)
        return
      }
      const matching = courses.filter((c) => c.level?.includes(level))
      const cards: TestCard[] = []
      for (const course of matching) {
        const detail = await api.japanese.getCourse(course.id)
        if (!detail) continue
        for (const lesson of detail.lessons) {
          const full = await api.japanese.getLesson(lesson.id)
          if (full) cards.push(...full.cards.map((c) => ({ ...c, kind: lesson.kind })))
        }
      }
      const qs = buildTest(cards)
      if (qs.length < 10) {
        setError(`Not enough ${level} content for a test (${qs.length} questions possible).`)
        return
      }
      loggedRef.current = false
      setSource('courses')
      setSectionsMeta([])
      setQuestions(qs)
      setIndex(0)
      setPicked(null)
      setScore(0)
      setAnswers([])
      setSecondsLeft(qs.length * SECONDS_PER_QUESTION)
    } finally {
      setLoading(false)
    }
  }

  // Countdown — one interval for the whole test.
  useEffect(() => {
    if (!questions || finished) return
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [questions, finished])

  // Log once on finish.
  useEffect(() => {
    if (!finished || !questions || loggedRef.current) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind: 'jlpt',
        score,
        total: questions.length,
        bestStreak: 0,
        settings: {
          level,
          source,
          sections: Object.fromEntries(
            sectionsMeta.map((m) => [
              m.key,
              [answers.slice(m.from, m.to).filter(Boolean).length, m.to - m.from]
            ])
          )
        }
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('jlpt') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  function choose(i: number): void {
    if (!current || picked !== null) return
    setPicked(i)
    const right = i === current.correct
    setAnswers((a) => {
      const next = [...a]
      next[index] = right
      return next
    })
    if (right) setScore((s) => s + 1)
  }

  function next(): void {
    if (picked === null) return
    setPicked(null)
    setIndex((i) => i + 1)
  }

  // 1-4 answer, Enter advance.
  useEffect(() => {
    if (!current) return
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return
      const n = Number(e.key)
      if (picked === null && n >= 1 && n <= current!.options.length) {
        e.preventDefault()
        choose(n - 1)
      } else if (picked !== null && e.key === 'Enter') {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, picked])

  const mmss = (s: number): string =>
    `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`

  // ---- setup ----
  if (questions === null) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader
          back={{ to: "/japanese", label: "Japanese" }}
          title="JLPT Checkpoint"
          subtitle={
            <>
              A timed checkpoint built from the offline packs: levelled grammar, vocabulary by
              frequency band, kanji readings, and sentences to translate. {SECONDS_PER_QUESTION}s a
              question. It points at a level; it does not certify one.
            </>
          }
        />

        <div className="card p-5">
          <div className="label mb-2">Level</div>
          <div className="mb-5 flex gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={level === l ? 'pill pill-active' : 'pill'}
              >
                {l}
              </button>
            ))}
          </div>
          {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
          <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
            {loading ? 'Building test…' : `Start ${level} checkpoint`}
          </button>
        </div>

        <QuizRecord kind="jlpt" />
      </div>
    )
  }

  // ---- verdict ----
  if (finished) {
    const total = questions.length
    const pct = total ? Math.round((score / total) * 100) : 0
    const verdict =
      pct >= 80
        ? { title: `Comfortable at ${level}`, sub: 'Worth trying the level above.', cls: 'text-green-400' }
        : pct >= 60
          ? { title: `Close at ${level}`, sub: 'Review the weakest section below and retake.', cls: 'text-yellow-400' }
          : { title: `Not yet at ${level}`, sub: 'Keep working this level; retake in a few weeks.', cls: 'text-red-400' }
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            {secondsLeft <= 0 ? 'Time up' : 'Checkpoint complete'}
          </p>
          <p className="mt-3 text-5xl font-bold">
            {score}
            <span className="text-2xl text-gray-500"> / {total}</span>
          </p>
          <p className={`mt-3 text-lg font-semibold ${verdict.cls}`}>{verdict.title}</p>
          <p className="mt-1 text-sm text-gray-400">{verdict.sub}</p>

          {sectionsMeta.length > 0 && (
            <ul className="mt-4 space-y-1 text-left text-sm">
              {sectionsMeta.map((m) => {
                const got = answers.slice(m.from, m.to).filter(Boolean).length
                const n = m.to - m.from
                return (
                  <li key={m.key} className="flex items-baseline justify-between gap-3">
                    <span className="text-gray-300">
                      {m.label}
                      {m.note && <span className="ml-1 text-xs text-gray-600">({m.note})</span>}
                    </span>
                    <span className="shrink-0 tabular-nums text-gray-400">
                      {got} / {n}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}

          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            {source === 'packs'
              ? 'A checkpoint built from the offline packs — levelled grammar, a frequency band for vocabulary, KANJIDIC levels for kanji, bank sentences for reading. Thirty items cannot certify a level; treat it as a direction, not a result.'
              : 'The offline packs are not installed, so this sampled your own seeded courses — it measures how much of this app’s curriculum you have studied, not the JLPT level. Install the dictionaries in Settings for the pack-based checkpoint.'}
          </p>
          <div className="mt-6 flex gap-2">
            <button className="btn-primary flex-1" onClick={() => setQuestions(null)}>
              Back to setup
            </button>
            <Link to="/japanese" className="btn-ghost flex-1 text-center">
              Done
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ---- play ----
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-medium">
          {index + 1} / {questions.length}
        </span>
        <div className="flex items-center gap-4 text-gray-400">
          <span className={secondsLeft <= 60 ? 'text-red-400' : ''}>{mmss(secondsLeft)}</span>
          <button className="btn-ghost py-1 px-2 text-xs" onClick={() => setSecondsLeft(0)}>
            End test
          </button>
        </div>
      </div>

      <div className="card p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500">{current!.heading}</p>
        <p className="mt-3 text-3xl leading-relaxed">{current!.prompt}</p>
        {current!.promptHint && current!.promptHint !== current!.prompt && (
          <p className="mt-1 text-sm text-gray-500">{current!.promptHint}</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {current!.options.map((opt, i) => {
          const correct = picked !== null && i === current!.correct
          const wrongPick = picked === i && !correct
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => choose(i)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                correct
                  ? 'border-green-500 bg-green-500/15'
                  : wrongPick
                    ? 'border-red-500 bg-red-500/15'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
              }`}
            >
              <span className="text-sm font-medium">{opt}</span>
              <kbd className="kbd float-right">
                {i + 1}
              </kbd>
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div className="card mt-4 p-4">
          <p className="mt-1 text-lg">
            {current!.front}
            {current!.reading && current!.reading !== current!.front && (
              <span className="ml-2 text-sm text-gray-400">{current!.reading}</span>
            )}
          </p>
          <p className="text-sm text-gray-300">{current!.back}</p>
          <button className="btn-primary mt-3" onClick={next}>
            {index + 1 === questions.length ? 'Finish (Enter)' : 'Next (Enter)'}
          </button>
        </div>
      )}
    </div>
  )
}
