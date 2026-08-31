import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { shuffle } from '@shared/shuffle'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'

// Leech isolation drill (kind 'leech') — grind stuck cards WITHOUT touching
// their real SM-2 state (the mechanic every WaniKani userscript reinvents).
// Flip self-check, not MC: leeches fail on weak recall or pair confusion, and
// with <4 leeches there is no distractor pool anyway. submitReview is never
// imported here — zero SRS writes.

interface LeechItem {
  id: number
  front: string
  reading: string | null
  back: string
}

// Router state from the stats page: the full leech list, or one confusable
// pair. Refresh/deep-link falls back to listLeeches.
interface RouteState {
  items?: LeechItem[]
}

export default function JapaneseLeechDrillPage() {
  const location = useLocation()
  const qc = useQueryClient()
  const passed = (location.state as RouteState | null)?.items
  const [items, setItems] = useState<LeechItem[] | null>(passed ?? null)
  const [loading, setLoading] = useState(!passed)

  useEffect(() => {
    if (passed) return
    void api.japanese.listLeeches().then((leeches) => {
      setItems(
        leeches.map((l) => ({ id: l.id, front: l.front, reading: l.reading, back: l.back }))
      )
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [queue, setQueue] = useState<LeechItem[] | null>(null)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [firstTry, setFirstTry] = useState(0)
  const [missedIds, setMissedIds] = useState<Set<number>>(new Set())
  const [answered, setAnswered] = useState(0)
  const loggedRef = useRef(false)

  function start(): void {
    if (!items) return
    const shuffled = shuffle(items)
    setQueue(shuffled)
    setIndex(0)
    setRevealed(false)
    setFirstTry(0)
    setMissedIds(new Set())
    setAnswered(0)
    loggedRef.current = false
  }

  const current = queue?.[index] ?? null
  const finished = queue !== null && index >= queue.length

  useEffect(() => {
    if (!finished || loggedRef.current || !queue || queue.length === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind: 'leech',
        score: firstTry,
        total: answered,
        bestStreak: 0,
        settings: { cards: items?.length ?? 0 }
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('leech') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  function grade(gotIt: boolean): void {
    if (!current || !queue) return
    setAnswered((n) => n + 1)
    if (gotIt) {
      if (!missedIds.has(current.id)) setFirstTry((n) => n + 1)
      setIndex((i) => i + 1)
    } else {
      // Missed: splice the card back a few positions (KanaDrill's comes-back-
      // soon idiom); the round only ends once everything got a success.
      setMissedIds((m) => new Set(m).add(current.id))
      setQueue((q) => {
        if (!q) return q
        const rest = q.slice(0, index).concat(q.slice(index + 1))
        const at = Math.min(index + 3, rest.length)
        rest.splice(at, 0, current)
        return rest
      })
    }
    setRevealed(false)
  }

  // Space reveals, 1/2 grade after reveal.
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (!current) return
      if (!revealed && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault()
        setRevealed(true)
      } else if (revealed && e.key === '1') {
        e.preventDefault()
        grade(false)
      } else if (revealed && e.key === '2') {
        e.preventDefault()
        grade(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, revealed, index, queue])

  if (loading) return <PageStatus>Loading…</PageStatus>

  if (!items || items.length === 0) {
    return (
      <div className="p-6 max-w-[1320px] mx-auto">
        <PageHeader back={{ to: '/japanese/stats', label: 'Stats' }} title="Leech Drill" />
        <EmptyState
          title="No leeches to drill"
          body="Cards only land here after repeated lapses or a run of learning-step misses — that's a good thing."
          action={
            <Link to="/japanese/stats" className="btn-primary">
              Back to stats
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: '/japanese/stats', label: 'Stats' }}
        title="Leech Drill"
        subtitle="Extra reps for stuck cards — nothing here touches their real schedule."
      />

      {queue === null ? (
        <div className="card p-5">
          <p className="text-sm text-gray-400">
            {items.length} {items.length === 1 ? 'card' : 'cards'} in this drill. Flip, then be
            honest — a miss comes back until you land it.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-lg">
            {items.slice(0, 12).map((i) => (
              <li key={i.id} className="chip bg-base-700 text-gray-300">
                {i.front}
              </li>
            ))}
            {items.length > 12 && (
              <li className="chip bg-base-700 text-gray-500">+{items.length - 12}</li>
            )}
          </ul>
          <button className="btn-primary mt-4 w-full" onClick={start}>
            Start drill
          </button>
        </div>
      ) : finished ? (
        <StudySessionFrame title="Leech drill results" subtitle="First-try recall summary" surface={false}>
        <div className="card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">Drill complete</p>
          <p className="mt-3 text-5xl font-bold">
            {firstTry}
            <span className="text-2xl text-gray-500"> / {queue.length}</span>
          </p>
          <p className="mt-2 text-sm text-gray-400">first-try recall over {answered} showings</p>
          <div className="mt-6 flex gap-2">
            <button className="btn-primary flex-1" onClick={start}>
              Again
            </button>
            <Link to="/japanese/stats" className="btn-ghost flex-1 text-center">
              Back to stats
            </Link>
          </div>
        </div>
        </StudySessionFrame>
      ) : (
        <StudySessionFrame
          title="Leech drill"
          subtitle="Extra recall without changing the real SRS schedule."
          progress={{ current: index + 1, total: queue.length, label: 'Card' }}
          actions={<button className="btn-ghost" onClick={() => setIndex(queue.length)}>Stop</button>}
          rail={
            <>
              <SessionEvidence title="Session evidence">
                <p>{firstTry} first-try recalls</p>
                <p>{answered} total showings</p>
                <p>{queue.length - index} cards remain in the queue</p>
              </SessionEvidence>
              <SessionEvidence title="Grading">
                Reveal with Space or Enter, then use 1 for Missed and 2 for Got it. Misses return later.
              </SessionEvidence>
            </>
          }
        >
          <p className="text-center text-5xl leading-snug">{current!.front}</p>
          {revealed ? (
            <div className="mt-6 text-center">
              {current!.reading && current!.reading !== current!.front && (
                <p className="text-lg text-gray-300">{current!.reading}</p>
              )}
              <p className="mt-1 text-base text-gray-200">{current!.back}</p>
              <div className="mt-5 flex justify-center gap-2">
                <button
                  className="btn rounded-lg border border-signal-anomaly/60 px-4 text-signal-anomaly hover:bg-signal-anomaly/10"
                  onClick={() => grade(false)}
                >
                  Missed <kbd className="kbd ml-1">1</kbd>
                </button>
                <button
                  className="btn rounded-lg border border-signal-affirmative/60 px-4 text-signal-affirmative hover:bg-signal-affirmative/10"
                  onClick={() => grade(true)}
                >
                  Got it <kbd className="kbd ml-1">2</kbd>
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <button className="btn-primary" onClick={() => setRevealed(true)}>
                Reveal (Space)
              </button>
            </div>
          )}
        </StudySessionFrame>
      )}
    </div>
  )
}
