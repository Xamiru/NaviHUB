import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { EN_PUNCTUATE } from '@shared/english/punctuateItems'
import { EN_PUNCTUATE_FOCUS, type EnPunctuateFocus, type EnPunctuateItem } from '@shared/english/types'
import {
  answerState,
  cycleApostrophe,
  cycleMark,
  grade,
  strip,
  tokenize,
  type PunctGrade,
  type PunctMark,
  type PunctState,
  type PunctToken
} from '@shared/english/punctuate'
import { shuffle } from '@shared/shuffle'

// Punctuate-it: a sentence arrives with every internal mark and apostrophe
// removed; click a gap (or use the keys) to put the mark back, click a word to
// cycle its apostrophe. Enter grades the item — the diff shows what was
// missed — then Enter again advances. One quiz_session of kind
// 'englishPunctuate' per round (score = items fully correct). Model is pure:
// @shared/english/punctuate.

type Phase = 'setup' | 'play' | 'summary'
type Focus = 'all' | EnPunctuateFocus

const FOCUS_LABEL: Record<EnPunctuateFocus, string> = {
  splice: 'Splices & run-ons',
  apostrophe: 'Apostrophes',
  introductory: 'Introductory clauses',
  list: 'Lists',
  relative: 'Relative clauses',
  mixed: 'Mixed'
}

const MARK_LABEL: Record<PunctMark, string> = { '': '', ',': ',', ';': ';', ':': ':', '—': '—' }

export default function EnglishPunctuatePage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [focus, setFocus] = usePersistedState<Focus>('enPunctFocus', 'all')
  const [length, setLength] = usePersistedState<number>('enPunctLength', 10)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('englishPunctuate'),
    queryFn: () => api.quiz.history('englishPunctuate')
  })

  const pool = useMemo(
    () => (focus === 'all' ? EN_PUNCTUATE : EN_PUNCTUATE.filter((i) => i.focus === focus)),
    [focus]
  )

  const roundRef = useRef<EnPunctuateItem[]>([])
  const [index, setIndex] = useState(0)
  const [perfect, setPerfect] = useState(0)
  const [pctSum, setPctSum] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [newBest, setNewBest] = useState(false)
  const [played, setPlayed] = useState(0)
  const loggedRef = useRef(false)

  function start(): void {
    const deck = shuffle(pool)
    roundRef.current = length > 0 ? deck.slice(0, length) : deck
    setIndex(0)
    setPerfect(0)
    setPctSum(0)
    setStreak(0)
    setBestStreak(0)
    setNewBest(false)
    loggedRef.current = false
    setPhase('play')
  }

  function endGame(finalPerfect: number, finalBest: number, played: number): void {
    setPlayed(played)
    if (!loggedRef.current && played > 0) {
      loggedRef.current = true
      const prev = history?.best
      setNewBest(played >= 5 && (!prev || finalPerfect / played > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'englishPunctuate',
          score: finalPerfect,
          total: played,
          bestStreak: finalBest,
          settings: { focus, length }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('englishPunctuate') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  function next(g: PunctGrade): void {
    const p = g.allCorrect ? perfect + 1 : perfect
    const st = g.allCorrect ? streak + 1 : 0
    const bs = Math.max(bestStreak, st)
    setPerfect(p)
    setPctSum((s) => s + g.pct)
    setStreak(st)
    setBestStreak(bs)
    const played = index + 1
    if (played >= roundRef.current.length) endGame(p, bs, played)
    else setIndex(played)
  }

  if (phase === 'play') {
    const item = roundRef.current[index]
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
          <span className="tabular-nums">
            {index + 1} / {roundRef.current.length} · {perfect} perfect
          </span>
          <span>
            streak {streak}
            <button
              className="btn-ghost ml-3 px-2 py-0.5 text-xs"
              onClick={() => endGame(perfect, bestStreak, index)}
            >
              End round
            </button>
          </span>
        </div>
        <ItemCard key={item.key} item={item} onNext={next} />
      </div>
    )
  }

  if (phase === 'summary') {
    const meanPct = played > 0 ? Math.round((pctSum / played) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold">
            {perfect} / {played}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            fully correct · {meanPct}% of marks placed right · best streak {bestStreak}
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
        title="Punctuate it"
        subtitle="The sentence has lost its commas, semicolons, colons, dashes and apostrophes. Put them back."
      />
      <div className="card p-5 space-y-5">
        <Group label="Focus">
          <Pill active={focus === 'all'} onClick={() => setFocus('all')} label="Everything" />
          {EN_PUNCTUATE_FOCUS.map((f) => (
            <Pill key={f} active={focus === f} onClick={() => setFocus(f)} label={FOCUS_LABEL[f]} />
          ))}
        </Group>
        <Group label="Length">
          <Pill active={length === 5} onClick={() => setLength(5)} label="5" />
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20" />
          <Pill active={length === 0} onClick={() => setLength(0)} label={`All (${pool.length})`} />
        </Group>
        <p className="text-xs text-gray-500">
          Click a gap to cycle , ; : — or press the mark; click a word (or press ') to cycle its
          apostrophe; ← → move; Backspace clears; Enter grades, Enter again moves on. Full stops and
          question marks stay — sentence boundaries are the exercise.
        </p>
        <button className="btn-primary w-full" disabled={pool.length === 0} onClick={start}>
          Start ({length > 0 ? Math.min(length, pool.length) : pool.length} items)
        </button>
      </div>
      <QuizRecord kind="englishPunctuate" />
    </div>
  )
}

function ItemCard({ item, onNext }: { item: EnPunctuateItem; onNext: (g: PunctGrade) => void }) {
  const tokens = useMemo(() => tokenize(item.answer), [item.answer])
  const [state, setState] = useState<PunctState>(() => strip(tokens))
  const [sel, setSel] = useState(0) // selected gap = after token `sel`
  const [graded, setGraded] = useState<PunctGrade | null>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const answer = useMemo(
    () =>
      tokens
        .map((t, i) => {
          const m = answerState(tokens).marks[i]
          return `${t.word}${m === '—' ? ' —' : m}${t.terminal}`
        })
        .join(' '),
    [tokens]
  )

  useEffect(() => {
    boxRef.current?.focus()
  }, [])

  function setMark(i: number, m: PunctMark): void {
    setState((s) => {
      const marks = [...s.marks]
      marks[i] = m
      return { ...s, marks }
    })
  }
  function cycleWord(i: number): void {
    setState((s) => {
      const words = [...s.words]
      words[i] = cycleApostrophe(tokens[i].bare, words[i])
      return { ...s, words }
    })
    setSel(i)
  }
  function doGrade(): void {
    setGraded(grade(tokens, state))
  }
  function finish(): void {
    if (graded) onNext(graded)
  }

  function onKey(e: React.KeyboardEvent): void {
    if (graded) {
      if (e.key === 'Enter') {
        e.preventDefault()
        finish()
      }
      return
    }
    const last = tokens.length - 1
    switch (e.key) {
      case 'ArrowRight':
      case 'Tab':
        if (e.key === 'Tab' && e.shiftKey) {
          setSel((s) => Math.max(0, s - 1))
        } else setSel((s) => Math.min(last, s + 1))
        e.preventDefault()
        break
      case 'ArrowLeft':
        setSel((s) => Math.max(0, s - 1))
        e.preventDefault()
        break
      case ',':
      case ';':
      case ':':
        setMark(sel, e.key as PunctMark)
        e.preventDefault()
        break
      case '-':
      case '_':
        setMark(sel, '—')
        e.preventDefault()
        break
      case 'Backspace':
      case 'Delete':
      case '0':
        setMark(sel, '')
        e.preventDefault()
        break
      case "'":
        cycleWord(sel)
        e.preventDefault()
        break
      case ' ':
        setMark(sel, cycleMark(state.marks[sel]))
        e.preventDefault()
        break
      case 'Enter':
        doGrade()
        e.preventDefault()
        break
      default:
        break
    }
  }

  const slotAt = (i: number, kind: 'mark' | 'apostrophe') =>
    graded?.slots.find((s) => s.index === i && s.kind === kind) ?? null

  return (
    <div className="space-y-3">
      <div
        ref={boxRef}
        tabIndex={0}
        onKeyDown={onKey}
        className="card p-5 text-lg leading-loose outline-none"
        aria-label="Sentence to punctuate"
      >
        {tokens.map((t: PunctToken, i) => {
          const isLast = i === tokens.length - 1
          const word = state.words[i]
          const mark = state.marks[i]
          const wSlot = slotAt(i, 'apostrophe')
          const mSlot = slotAt(i, 'mark')
          const wordCls = graded
            ? wSlot
              ? wSlot.ok
                ? 'text-green-300'
                : 'text-red-300 line-through decoration-red-400'
              : ''
            : 'hover:text-accent'
          return (
            <span key={i} className="whitespace-nowrap">
              <button
                type="button"
                className={`rounded px-0.5 ${wordCls}`}
                disabled={!!graded}
                onClick={() => cycleWord(i)}
                title="Cycle apostrophe"
              >
                {word}
              </button>
              {graded && wSlot && !wSlot.ok && (
                <span className="ml-0.5 text-green-300">{wSlot.expected}</span>
              )}
              {/* the gap after this word: mark slot, unless the token ends a sentence */}
              {t.terminal ? (
                <span className="text-gray-400">{t.terminal}</span>
              ) : (
                !isLast && (
                  <button
                    type="button"
                    className={`mx-0.5 inline-block min-w-[1.1ch] rounded px-0.5 text-center align-baseline ${
                      graded
                        ? mSlot
                          ? mSlot.ok
                            ? 'bg-green-500/15 text-green-300'
                            : 'bg-red-500/15 text-red-300'
                          : mark
                            ? 'text-gray-300'
                            : 'text-gray-700'
                        : sel === i
                          ? 'bg-accent/25 text-gray-100 ring-1 ring-accent'
                          : mark
                            ? 'bg-base-700 text-gray-100'
                            : 'text-gray-700 hover:bg-base-700'
                    }`}
                    disabled={!!graded}
                    onClick={() => {
                      if (sel === i) setMark(i, cycleMark(mark))
                      else setSel(i)
                    }}
                    title="Click to select, click again to cycle the mark"
                  >
                    {mark ? MARK_LABEL[mark] : '·'}
                    {graded && mSlot && !mSlot.ok && (
                      <span className="ml-0.5 text-green-300">{mSlot.expected || 'none'}</span>
                    )}
                  </button>
                )
              )}{' '}
            </span>
          )
        })}
      </div>

      {graded && (
        <div className={`card p-4 text-sm ${graded.allCorrect ? 'border-green-500/60' : ''}`}>
          <p className={graded.allCorrect ? 'text-green-300' : 'text-gray-200'}>
            {graded.allCorrect
              ? 'Perfect.'
              : `${graded.hits} of ${graded.targets} placed right${graded.extras ? `, ${graded.extras} extra` : ''}.`}
          </p>
          <p className="mt-1 text-gray-400">{item.note}</p>
          <p className="mt-2 text-xs text-gray-500">
            Answer: {answer}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {!graded ? (
          <>
            <span className="text-xs text-gray-500">
              , ; : set a mark · - dash · Space cycles · ' apostrophe · ← → move
            </span>
            <span className="flex-1" />
            <button className="btn-primary" onClick={doGrade}>
              Check (Enter)
            </button>
          </>
        ) : (
          <>
            <span className="flex-1" />
            <button className="btn-primary" onClick={finish} autoFocus>
              Next (Enter)
            </button>
          </>
        )}
      </div>
    </div>
  )
}
