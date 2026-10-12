import { useId, type ReactNode } from 'react'

// "Study now": what a session will contain, one Start button, and the
// page's settings folded under Options. The settings themselves stay owned by
// each page (and keep their remembered values); this only arranges them so a
// session can start in one click.
export default function SessionLauncher({
  summary,
  defaults,
  startLabel,
  onStart,
  starting = false,
  disabled = false,
  error,
  hint,
  options,
  children
}: {
  /** The headline: counts or what the session covers. */
  summary: ReactNode
  /** One line describing the current settings, shown beside Options. */
  defaults?: ReactNode
  startLabel: string
  onStart: () => void
  starting?: boolean
  disabled?: boolean
  error?: ReactNode
  /** Keyboard help or a short note under the button. */
  hint?: ReactNode
  options?: ReactNode
  /** Extra content under the launcher, such as a record of past rounds. */
  children?: ReactNode
}) {
  const optionsId = useId()
  return (
    <div className="space-y-5">
      <div className="card p-6">
        <div>{summary}</div>
        {error && (
          <p className="mt-4 text-sm text-signal-anomaly" role="alert">
            {error}
          </p>
        )}
        <button
          type="button"
          className="btn-primary mt-6 w-full py-2.5 text-base"
          disabled={disabled || starting}
          onClick={onStart}
        >
          {starting ? 'Loading…' : startLabel}
        </button>
        {hint && <p className="mt-3 text-center text-xs text-gray-400">{hint}</p>}
        {options && (
          <details className="group mt-5 border-t border-base-700 pt-4">
            <summary
              className="flex cursor-pointer list-none items-baseline justify-between gap-3 text-sm"
              aria-controls={optionsId}
            >
              <span className="font-medium text-gray-200">
                <span className="mr-1 inline-block transition-transform group-open:rotate-90" aria-hidden="true">
                  ▸
                </span>
                Options
              </span>
              {defaults && <span className="min-w-0 truncate text-xs text-gray-400">{defaults}</span>}
            </summary>
            <div id={optionsId} className="mt-4 space-y-5">
              {options}
            </div>
          </details>
        )}
      </div>
      {children}
    </div>
  )
}
