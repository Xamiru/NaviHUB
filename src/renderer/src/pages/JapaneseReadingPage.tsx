import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { Group, Pill } from '../components/PillGroup'
import Furigana from '../components/japanese/Furigana'
import MiningPanel from '../components/reader/MiningPanel'
import { JP_PASSAGES } from '@shared/japanese/readings'
import { stripFurigana } from '@shared/japanese/furigana'
import type { JpPassage, JpReadingLevel } from '@shared/japanese/types'
import { shuffle } from '@shared/shuffle'

// Graded reading: short authored passages N5-N2 with furigana you can switch
// off, comprehension questions, a glossary, and the reader's own mining panel
// on any paragraph. Per-passage bests come from the quiz history (rounds are
// four questions, so they never reach the `total >= 5` personal-best rule —
// the chips ARE the record here, which is why there is no QuizRecord block).

type Phase = 'setup' | 'play' | 'summary'
type LevelFilter = 'all' | JpReadingLevel
const LEVELS: JpReadingLevel[] = ['N5', 'N4', 'N3', 'N2']

interface Question {
  prompt: string
  options: string[]
  correct: number
  explain: string
}

export default function JapaneseReadingPage() {
  const qc = useQueryClient()
  const [level, setLevel] = usePersistedState<LevelFilter>('jpReadingLevel', 'N5')
  const [furigana, setFurigana] = usePersistedState<boolean>('jpReadingFurigana', true)
  const [phase, setPhase] = useState<Phase>('setup')
  const [passage, setPassage] = useState<JpPassage | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [mining, setMining] = useState<{ term: string; context: string } | null>(null)
  const loggedRef = useRef(false)

  // A long window of jpReading rounds → per-passage bests via settings.passageKey.
  const { data: history } = useQuery({
    queryKey: qk.quiz.historyAll('jpReading'),
    queryFn: () => api.quiz.history('jpReading', 200)
  })
  const bestByKey = useMemo(() => {
    const m = new Map<string, { score: number; total: number }>()
    for (const s of history?.recent ?? []) {
      const key = String(s.settings?.passageKey ?? '')
      if (!key) continue
      const cur = m.get(key)
      if (!cur || s.score > cur.score) m.set(key, { score: s.score, total: s.total })
    }
    return m
  }, [history])

  const list = useMemo(
    () => (level === 'all' ? JP_PASSAGES : JP_PASSAGES.filter((p) => p.level === level)),
    [level]
  )

  function start(p: JpPassage): void {
    setPassage(p)
    setQuestions(
      p.questions.map((q) => {
        const answer = q.options[q.correct]
        const options = shuffle(q.options)
        return { prompt: q.prompt, options, correct: options.indexOf(answer), explain: q.explain }
      })
    )
    setIndex(0)
    setPicked(null)
    setScore(0)
    setMining(null)
    loggedRef.current = false
    setPhase('play')
  }

  function choose(i: number): void {
    if (picked !== null) return
    setPicked(i)
    if (i === questions[index].correct) setScore((s) => s + 1)
  }

  function advance(): void {
    if (picked === null) return
    if (index + 1 >= questions.length) {
      finish()
      return
    }
    setIndex((n) => n + 1)
    setPicked(null)
  }

  function finish(): void {
    if (!loggedRef.current && passage) {
      loggedRef.current = true
      void api.quiz
        .logSession({
          kind: 'jpReading',
          score,
          total: questions.length,
          bestStreak: 0,
          settings: { passageKey: passage.key, level: passage.level }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('jpReading') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable) return
      const n = Number(e.key)
      if (picked === null && n >= 1 && n <= 4) {
        e.preventDefault()
        choose(n - 1)
      } else if (picked !== null && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, picked, index, questions])

  if (phase === 'summary' && passage) {
    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">{passage.level}</p>
          <p className="mt-2 text-lg">
            <Furigana text={passage.title} show={furigana} />
          </p>
          <p className="mt-3 text-5xl font-bold">
            {score}
            <span className="text-2xl text-gray-500"> / {questions.length}</span>
          </p>
          <p className="mt-1 text-sm text-gray-400">{pct}%</p>
          <div className="mt-6 flex gap-2">
            <button className="btn-primary flex-1" onClick={() => setPhase('setup')}>
              Another passage
            </button>
            <Link to="/japanese" className="btn-ghost flex-1 text-center">
              Done
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'play' && passage) {
    const q = questions[index]
    const answered = picked !== null
    return (
      <div className="flex h-full">
        <div className="min-w-0 flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="font-medium">
                Question {index + 1} / {questions.length}
              </span>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="btn-ghost px-2 py-0.5 text-xs" onClick={() => setFurigana((v) => !v)}>
                  {furigana ? 'Hide furigana' : 'Show furigana'}
                </button>
                <button className="btn-ghost px-2 py-0.5 text-xs" onClick={() => setPhase('setup')}>
                  Back to list
                </button>
              </div>
            </div>

            <div className="card max-h-[45vh] overflow-y-auto p-5">
              <p className="mb-3 text-xs uppercase tracking-widest text-gray-600">
                {passage.level} · {passage.topic}
              </p>
              <h2 className="mb-3 text-lg">
                <Furigana text={passage.title} show={furigana} />
              </h2>
              {passage.text.split('\n').map((para, i) => (
                <p
                  key={i}
                  className="mb-3 cursor-text text-xl leading-loose"
                  onDoubleClick={() => {
                    const sel = window.getSelection()?.toString().trim()
                    setMining({ term: sel || '', context: stripFurigana(para) })
                  }}
                  title="Double-click (or select a word and double-click) to open the mining panel"
                >
                  <Furigana text={para} show={furigana} />
                </p>
              ))}
              {passage.glossary.length > 0 && (
                <details className="mt-2 text-sm text-gray-400">
                  <summary className="cursor-pointer">Glossary</summary>
                  <ul className="mt-2 space-y-1">
                    {passage.glossary.map((g) => (
                      <li key={g.word}>
                        <span className="text-gray-200">{g.word}</span>
                        <span className="ml-2 text-gray-500">{g.reading}</span>
                        <span className="ml-2">{g.gloss}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>

            <div className="card mt-4 p-5">
              <p className="text-lg leading-relaxed">
                <Furigana text={q.prompt} show={furigana} />
              </p>
              <div className="mt-3 space-y-1.5">
                {q.options.map((opt, i) => {
                  let cls = 'border-base-700 hover:bg-base-700/60'
                  if (answered) {
                    if (i === q.correct) cls = 'border-green-500/60 bg-green-500/10 text-green-300'
                    else if (i === picked) cls = 'border-red-500/60 bg-red-500/10 text-red-300'
                    else cls = 'border-base-700 opacity-60'
                  }
                  return (
                    <button
                      key={i}
                      className={`flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left transition-colors ${cls}`}
                      disabled={answered}
                      onClick={() => choose(i)}
                    >
                      <kbd className="kbd mt-0.5 shrink-0">{i + 1}</kbd>
                      <span>
                        <Furigana text={opt} show={furigana} />
                      </span>
                    </button>
                  )
                })}
              </div>
              {answered && (
                <>
                  <p className="mt-3 text-sm text-gray-400">{q.explain}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="btn-primary" onClick={advance}>
                      {index + 1 >= questions.length ? 'See results (Enter)' : 'Next (Enter)'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {mining && (
          <MiningPanel
            mediaId={null}
            blockText={mining.context}
            initialTerm={mining.term}
            onClose={() => setMining(null)}
          />
        )}
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Graded reading"
        subtitle="Short passages N5 to N2 with furigana you can switch off, four questions each, and the mining panel one double-click away."
        actions={
          <button className="btn-ghost" onClick={() => setFurigana((v) => !v)}>
            {furigana ? 'Furigana on' : 'Furigana off'}
          </button>
        }
      />

      <Group label="Level">
        <Pill active={level === 'all'} onClick={() => setLevel('all')} label="All" />
        {LEVELS.map((l) => (
          <Pill key={l} active={level === l} onClick={() => setLevel(l)} label={l} />
        ))}
      </Group>

      {list.length === 0 ? (
        <EmptyState title="No passages at this level yet" className="card mt-4 p-12 text-center" />
      ) : (
        <div className="mt-4 space-y-2">
          {list.map((p) => {
            const best = bestByKey.get(p.key)
            return (
              <button
                key={p.key}
                className="card flex w-full items-center gap-3 p-4 text-left hover:bg-base-700/50"
                onClick={() => start(p)}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-base">
                    <Furigana text={p.title} show={furigana} />
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {p.topic} · {stripFurigana(p.text).replace(/\s/g, '').length} characters ·{' '}
                    {p.questions.length} questions
                  </p>
                </div>
                {best && (
                  <span
                    className={`chip shrink-0 tabular-nums ${
                      best.score === best.total ? 'text-accent' : 'text-gray-400'
                    }`}
                  >
                    best {best.score}/{best.total}
                  </span>
                )}
                <span className="chip shrink-0">{p.level}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
