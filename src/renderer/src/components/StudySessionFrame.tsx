import type { ReactNode } from 'react'

interface StudySessionFrameProps {
  title: string
  subtitle?: ReactNode
  progress?: { current: number; total: number; label?: string }
  children: ReactNode
  rail?: ReactNode
  feedback?: ReactNode
  actions?: ReactNode
  className?: string
  surface?: boolean
}

// One learning-session grammar across Japanese, English, Programming and Quiz:
// context, measurable progress, one primary work surface, optional evidence,
// then feedback. It only owns composition; each route keeps its own game logic.
export default function StudySessionFrame({
  title,
  subtitle,
  progress,
  children,
  rail,
  feedback,
  actions,
  className = '',
  surface = true
}: StudySessionFrameProps) {
  const safeTotal = Math.max(0, progress?.total ?? 0)
  const safeCurrent = Math.min(Math.max(0, progress?.current ?? 0), safeTotal)
  const percent = safeTotal > 0 ? Math.round((safeCurrent / safeTotal) * 100) : 0

  return (
    <div className={`study-session mx-auto w-full max-w-[1320px] p-4 sm:p-6 ${className}`}>
      <header className="mb-6 border-b border-base-700 pb-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-white sm:text-3xl text-balance">{title}</h1>
            {subtitle && <div className="mt-1.5 text-sm text-gray-400">{subtitle}</div>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>
        {progress && (
          <div
            className="mt-5"
            role="progressbar"
            aria-label={`${progress.label ?? 'Session'} progress`}
            aria-valuemin={0}
            aria-valuemax={safeTotal}
            aria-valuenow={safeCurrent}
            aria-valuetext={`${safeCurrent} of ${safeTotal}`}
          >
            <div className="mb-2 flex items-center justify-between gap-3 text-xs tabular-nums">
              <span className="text-gray-400">{progress.label ?? 'Session progress'}</span>
              <span className="text-gray-300">
                {safeCurrent} / {safeTotal}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-base-700">
              <div
                className="h-full bg-accent transition-[width] motion-reduce:transition-none"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {rail && (
        <details className="card mb-5 p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-medium text-white">
            Session guidance and evidence
          </summary>
          <div className="mt-4 space-y-4">{rail}</div>
        </details>
      )}

      <div className={rail ? 'grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]' : ''}>
        <div className="min-w-0">
          {surface ? <div className="card p-5 sm:p-7">{children}</div> : children}
          {feedback && <div className="mt-5">{feedback}</div>}
        </div>
        {rail && (
          <aside className="hidden lg:block" aria-label="Session evidence">
            <div className="sticky top-6 space-y-5">{rail}</div>
          </aside>
        )}
      </div>
    </div>
  )
}

export function SessionEvidence({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card p-5">
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-gray-400">{children}</div>
    </section>
  )
}

export function SessionFeedback({
  tone = 'neutral',
  title,
  children
}: {
  tone?: 'neutral' | 'correct' | 'incorrect'
  title: string
  children?: ReactNode
}) {
  const tones = {
    neutral: 'border-base-600',
    correct: 'border-signal-affirmative/40',
    incorrect: 'border-signal-anomaly/40'
  }
  return (
    <section className={`card border-t ${tones[tone]} p-5`} aria-live="polite">
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      {children && <div className="mt-2 text-sm text-gray-400">{children}</div>}
    </section>
  )
}
