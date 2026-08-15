import { useSyncExternalStore } from 'react'
import { subscribeToasts, getToasts, dismissToast } from '../lib/toast'

// Renders the lib/toast queue as a fixed stack above the now-playing bar.
// Click a toast to dismiss it early (they auto-dismiss after a few seconds).
export default function Toaster() {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts)
  if (toasts.length === 0) return null
  return (
    <div role="status" aria-live="polite" className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className={`text-left text-sm rounded-lg border px-4 py-3 shadow-lg bg-base-700 ${
            t.kind === 'error' ? 'border-red-500/60 text-red-300' : 'border-accent/60 text-gray-200'
          }`}
        >
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
        </button>
      ))}
    </div>
  )
}
