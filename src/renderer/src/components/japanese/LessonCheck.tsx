import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import Section from '../Section'
import type { JpLessonKind, JpQuizItem } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import {
  buildLessonProductionPrompts,
  type LessonProductionPrompt
} from '@shared/japanese/lessonProduction'

// End-of-lesson self-check: a short multiple-choice quiz over THIS lesson's
// cards, with distractors drawn from the rest of the course. Runs before the
// lesson is marked learned (the pool is deliberately not learned-gated) so the
// flow is: read → check yourself → mark as learned. Keyboard: 1-4 answer,
// Enter/Space advance — same scheme as the quiz pages.

interface Question {
  prompt: string
  promptHint: string | null // reading shown small under a reading-type prompt
  ask: 'meaning' | 'reading'
  options: string[]
  correct: number
}

const QUESTION_COUNT = 8

// Builds MC questions from the lesson's cards. Vocab/kanji cards with a
// distinct reading alternate between "what does it mean" and "how is it read";
// grammar example sentences always ask for the meaning.
function buildQuestions(items: JpQuizItem[], distractors: JpQuizItem[], kind: JpLessonKind): Question[] {
  const pool = [...items, ...distractors]
  const questions: Question[] = []
  const picked = shuffle(items).slice(0, QUESTION_COUNT)

  picked.forEach((card, i) => {
    const canAskReading =
      kind !== 'grammar' && !!card.reading && card.reading !== card.front
    const ask: 'meaning' | 'reading' = canAskReading && i % 2 === 1 ? 'reading' : 'meaning'

    const answer = ask === 'reading' ? card.reading! : card.back
    const wrongPool = pool
      .map((c) => (ask === 'reading' ? c.reading : c.back))
      .filter((v): v is string => !!v && v !== answer && v !== card.front)
    const wrong = shuffle([...new Set(wrongPool)]).slice(0, 3)
    if (wrong.length < 1) return // nothing to distract with — skip

    const options = shuffle([answer, ...wrong])
    questions.push({
      prompt: card.front,
      promptHint: ask === 'meaning' && kind === 'grammar' ? card.reading : null,
      ask,
      options,
      correct: options.indexOf(answer)
    })
  })
  return questions
}

export default function LessonCheck({
  lessonId,
  kind,
  learned,
  cardCount,
  onMarkLearned
}: {
  lessonId: number
  kind: JpLessonKind
  learned: boolean
  cardCount: number
  onMarkLearned: () => Promise<void>
}): JSX.Element | null {
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [production, setProduction] = useState<LessonProductionPrompt[]>([])
  const [productionDone, setProductionDone] = useState(false)

  async function start(): Promise<void> {
    setLoading(true)
    try {
      // Fetched per attempt (not useQuery) so the RANDOM() distractor draw and
      // question order re-roll every time.
      const pool = await api.japanese.lessonQuizPool(lessonId)
      const qs = buildQuestions(pool.items, pool.distractors, kind)
      setProduction(buildLessonProductionPrompts(shuffle(pool.items), kind))
      setProductionDone(false)
      setQuestions(qs)
      setIndex(0)
      setChosen(null)
      setScore(0)
    } finally {
      setLoading(false)
    }
  }

  const current = questions?.[index] ?? null
  const finished = questions !== null && index >= questions.length

  function choose(i: number): void {
    if (!current || chosen !== null) return
    setChosen(i)
    if (i === current.correct) setScore((s) => s + 1)
  }

  function next(): void {
    if (chosen === null) return
    setIndex((i) => i + 1)
    setChosen(null)
  }

  // 1-4 answer, Enter/Space advance — matches the quiz pages' key scheme.
  useEffect(() => {
    if (!questions || finished) return
    function onKey(e: KeyboardEvent): void {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return
      const n = Number(e.key)
      if (n >= 1 && n <= (current?.options.length ?? 0)) {
        e.preventDefault()
        choose(n - 1)
      } else if ((e.key === 'Enter' || e.key === ' ') && chosen !== null) {
        e.preventDefault()
        next()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, finished, chosen, current])

  if (cardCount === 0) return null

  const perfect = questions !== null && score === questions.length

  if (finished && production.length > 0 && !productionDone) {
    return (
      <ProductionCheck
        prompts={production}
        recallScore={`${score} / ${questions.length}`}
        onDone={() => setProductionDone(true)}
      />
    )
  }

  return (
    <div className="card mt-6 p-5">
      <Section
        title="Check yourself"
        className=""
        subtitle={questions && !finished ? `${index + 1} / ${questions.length}` : undefined}
      >
      {questions === null ? (
        <div>
          <p className="mb-3 text-sm text-gray-400">
            A quick quiz over this lesson&apos;s cards — see if it stuck before marking it learned.
          </p>
          <button className="btn-primary" disabled={loading} onClick={() => void start()}>
            {loading ? 'Preparing…' : 'Start check'}
          </button>
        </div>
      ) : finished ? (
        <div>
          <p className="text-lg font-semibold">
            {score} / {questions.length}
            <span className="ml-2 text-sm font-normal text-gray-400">
              {perfect ? 'Perfect recall.' : score >= questions.length * 0.7 ? 'Solid recall.' : 'Worth another read.'}
              {productionDone && ' Production checked too.'}
            </span>
          </p>
          <div className="mt-3 flex gap-2">
            {!learned && (
              <button
                className={perfect ? 'btn-primary' : 'btn-ghost'}
                onClick={() => void onMarkLearned()}
              >
                ✓ Mark as learned
              </button>
            )}
            <button className="btn-ghost" onClick={() => void start()}>
              Try again
            </button>
          </div>
        </div>
      ) : current ? (
        <div>
          <p className="mb-0.5 text-xs text-gray-500">
            {current.ask === 'reading' ? 'How is this read?' : 'What does this mean?'}
          </p>
          <p className="mb-1 text-2xl">{current.prompt}</p>
          {current.promptHint && current.promptHint !== current.prompt && (
            <p className="mb-2 text-sm text-gray-500">{current.promptHint}</p>
          )}
          <div className="mt-3 space-y-1.5">
            {current.options.map((opt, i) => {
              let cls = 'border-base-700 bg-base-800 hover:border-accent'
              if (chosen !== null) {
                if (i === current.correct) cls = 'border-green-500/60 bg-green-500/10'
                else if (i === chosen) cls = 'border-red-500/60 bg-red-500/10'
                else cls = 'border-base-700 bg-base-800 opacity-60'
              }
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className={`block w-full rounded-lg border p-2.5 text-left text-sm transition-colors ${cls}`}
                >
                  <span className="mr-2 text-xs text-gray-500">{i + 1}</span>
                  {opt}
                </button>
              )
            })}
          </div>
          {chosen !== null && (
            <button className="btn-primary mt-3" onClick={next}>
              {index + 1 === questions.length ? 'Finish (Enter)' : 'Next (Enter)'}
            </button>
          )}
        </div>
      ) : null}
      </Section>
    </div>
  )
}

function ProductionCheck({
  prompts,
  recallScore,
  onDone
}: {
  prompts: LessonProductionPrompt[]
  recallScore: string
  onDone: () => void
}) {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [revealed, setRevealed] = useState(false)
  const current = prompts[index]

  function next(): void {
    if (index + 1 >= prompts.length) {
      onDone()
      return
    }
    setIndex((i) => i + 1)
    setTyped('')
    setRevealed(false)
  }

  return (
    <div className="card mt-6 p-5">
      <Section title="Use it" className="" subtitle={`${index + 1} / ${prompts.length}`}>
        <p className="mb-1 text-xs text-gray-500">Recall score {recallScore}</p>
        <p className="text-sm text-gray-400">
          Write one natural Japanese answer. Compare it with the model yourself; equivalent wording
          can be correct.
        </p>
        <p className="mt-4 text-lg">{current.promptEn}</p>
        <textarea
          className="input mt-3 min-h-20 w-full"
          autoFocus
          value={typed}
          placeholder="Write in Japanese…"
          onChange={(e) => setTyped(e.target.value)}
        />
        {!revealed ? (
          <button className="btn-primary mt-3" disabled={!typed.trim()} onClick={() => setRevealed(true)}>
            Compare with model
          </button>
        ) : (
          <div className="mt-4 rounded-lg border border-base-700 bg-base-900/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">One model answer</p>
            <p className="mt-2 text-xl">{current.modelJp}</p>
            {current.reading && current.reading !== current.modelJp && (
              <p className="mt-1 text-sm text-gray-500">{current.reading}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">{current.note}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn-ghost" onClick={() => { setTyped(''); setRevealed(false) }}>
                Needs another try
              </button>
              <button className="btn-primary" onClick={next}>
                {index + 1 >= prompts.length ? 'Finish production' : 'Close enough; next'}
              </button>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}
