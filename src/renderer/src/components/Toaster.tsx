import { useSyncExternalStore } from 'react'
import {
  subscribeToasts,
  getToasts,
  dismissToast,
  pauseToast,
  resumeToast
} from '../lib/toast'

// Renders the lib/toast queue as a fixed stack above the now-playing bar.
// Click a toast to dismiss it early (they auto-dismiss after a few seconds).
export default function Toaster() {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts)
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-20 right-4 z-50 flex max-w-md flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          role={t.kind === 'error' ? 'alert' : 'status'}
          aria-live={t.kind === 'error' ? 'assertive' : 'polite'}
          onMouseEnter={() => pauseToast(t.id)}
          onMouseLeave={(event) => {
            if (!event.currentTarget.contains(document.activeElement)) resumeToast(t.id)
          }}
          onFocusCapture={() => pauseToast(t.id)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) resumeToast(t.id)
          }}
          className={`flex items-center gap-3 rounded-lg border bg-base-700 px-4 py-3 text-left text-sm shadow-lg ${
            t.kind === 'error'
              ? 'border-red-500/60 text-red-300'
              : t.kind === 'warning'
                ? 'border-amber-500/60 text-amber-100'
                : 'border-accent/60 text-gray-200'
          }`}
        >
          <div className="min-w-0 flex-1 text-left">
            {t.kind === 'unlock' ? (
              <span className="flex items-center gap-3">
                {t.iconUrl ? (
                  <img src={t.iconUrl} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
                ) : null}
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-accent">
                    Achievement unlocked
                  </span>
                  <span className="block truncate font-medium text-gray-100">{t.message}</span>
                  {t.sub ? <span className="block truncate text-xs text-gray-400">{t.sub}</span> : null}
                </span>
              </span>
            ) : (
              t.message
            )}
          </div>
          {t.action && (
            <button
              className="shrink-0 text-xs font-medium text-accent hover:text-white"
              onClick={() => {
                dismissToast(t.id)
                window.location.hash = `#${t.action!.route}`
              }}
            >
              {t.action.label}
            </button>
          )}
          <button
            className="shrink-0 px-1 text-gray-400 hover:text-white"
            aria-label={`Close notification: ${t.message}`}
            onClick={() => dismissToast(t.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
