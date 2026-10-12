import { useEffect, useRef, type ReactNode } from 'react'
import { celebrateProgress } from '../../lib/themeFx'
import TutorSessionContinue from '../TutorSessionContinue'
import { WordFurigana } from './Furigana'

const JAPANESE = /[\u3040-\u30ff\u3400-\u9fff]/

export interface SummaryMiss {
  key: string
  jp: string
  reading?: string | null
  meaning?: string | null
}

// The one end-of-session screen for Japanese study: how it went, what to look
// at again, and where to go next. The next step is the guided session when one
// is running, otherwise Today. Each page keeps its own scoring and personal-best
// rules and passes the results in.
export default function SessionSummary({
  title = 'Session complete',
  score,
  facts = [],
  note,
  missed = [],
  onRetryMissed,
  actions,
  next,
  celebrate
}: {
  title?: string
  /** Omit for untimed sessions with no right/wrong count. */
  score?: { correct: number; total: number } | null
  facts?: { label: string; value: ReactNode }[]
  note?: ReactNode
  missed?: SummaryMiss[]
  onRetryMissed?: () => void
  /** Secondary actions such as Play again; the next-step button is built in. */
  actions?: ReactNode
  /** The main next step. Defaults to the Japanese session or Today; `null`
   * leaves only `actions` (for drills shared with other sections). */
  next?: ReactNode | null
  /** Defaults to "something was answered correctly". */
  celebrate?: boolean
}) {
  const heading = useRef<HTMLHeadingElement>(null)
  const total = Math.max(0, score?.total ?? 0)
  const correct = Math.min(Math.max(0, score?.correct ?? 0), total)
  const percent = total > 0 ? Math.round((correct / total) * 100) : null
  const shouldCelebrate = celebrate ?? correct > 0
  const celebrated = useRef(false)
  const hasScore = !!score

  // Focus and celebrate once, when the summary appears; later re-renders (a
  // refetch on window focus) must not pull focus back to the heading.
  useEffect(() => {
    heading.current?.focus()
  }, [])
  useEffect(() => {
    if (shouldCelebrate && !celebrated.current) {
      celebrated.current = true
      celebrateProgress(heading.current, { count: hasScore ? correct : null, total: hasScore ? total : null })
    }
  }, [shouldCelebrate, hasScore, correct, total])

  return (
    <section className="card mx-auto max-w-2xl p-6 sm:p-8" aria-labelledby="session-summary-title">
      <h2
        id="session-summary-title"
        ref={heading}
        tabIndex={-1}
        className="text-center text-xl font-semibold text-white outline-none"
      >
        {title}
      </h2>

      {percent != null && (
        <div className="mt-6 text-center">
          <p className="text-6xl font-semibold tabular-nums text-white">{percent}%</p>
          <p className="mt-2 text-sm text-gray-400">
            {correct} of {total} correct
          </p>
          <div
            className="mx-auto mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-base-700"
            aria-hidden="true"
          >
            <div
              className="h-full bg-accent transition-[width] duration-700 motion-reduce:transition-none"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      {facts.length > 0 && (
        <dl className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-base-700 pt-5">
          {facts.map((fact) => (
            <div key={fact.label} className="text-center">
              <dt className="text-xs text-gray-500">{fact.label}</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums text-gray-100">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {note && <p className="mt-5 text-center text-sm text-accent">{note}</p>}

      {missed.length > 0 && (
        <div className="mt-6 border-t border-base-700 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">To look at again · {missed.length}</h3>
            {onRetryMissed && (
              <button type="button" className="btn-ghost" onClick={onRetryMissed}>
                Practise these again
              </button>
            )}
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {missed.map((item) => (
              <li key={item.key} className="rounded-lg border border-base-700 px-3 py-2">
                {JAPANESE.test(item.jp) ? (
                  <WordFurigana word={item.jp} reading={item.reading} className="text-lg text-white" />
                ) : (
                  <span className="text-white">{item.jp}</span>
                )}
                {item.meaning && <p className="mt-0.5 max-w-[14rem] truncate text-xs text-gray-400">{item.meaning}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
        {next === undefined ? (
          <TutorSessionContinue fallbackTo="/japanese" fallbackLabel="Back to Today" className="btn-primary" />
        ) : (
          next
        )}
        {actions}
      </div>
    </section>
  )
}
