import { useEffect, useState, useSyncExternalStore } from 'react'
import type { AppTheme } from '@shared/appTheme'
import { FX_ART } from '../lib/themeFxArt'
import { useAppTheme } from '../lib/useAppTheme'
import { ReversedText, TypedText, prefersReducedMotion } from './theme/ThemeText'
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
  const { theme } = useAppTheme()
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
          data-kind={t.kind}
          className={`theme-toast theme-toast-${theme} ${theme !== 'miku' && t.kind !== 'unlock' ? 'theme-dark' : ''} flex items-center gap-3 rounded-lg border bg-base-700 px-4 py-3 text-left text-sm shadow-lg ${
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
              <ThemedToastBody theme={theme} kind={t.kind} message={t.message} />
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

// Mei Ling reads a proverb with each save in MGS1; these are public-domain sayings.
const PROVERBS = [
  'A journey of a thousand miles begins with a single step.',
  'The best time to plant a tree was twenty years ago. The second best time is now.',
  'Knowledge is a treasure, but practice is the key to it.',
  'Fall seven times, stand up eight.',
  'Even monkeys fall from trees.'
]
let proverbIndex = 0

const MIKU_SINGERS: Record<'error' | 'warning' | 'success', { art: string; label: string }> = {
  success: { art: FX_ART.mikuSingers.miku, label: 'Library' },
  warning: { art: FX_ART.mikuSingers.kaito, label: 'Notice' },
  error: { art: FX_ART.mikuSingers.meiko, label: 'Error' }
}

// Each theme frames the same message differently; the text, roles, timer and
// Close button are unchanged. Unlock toasts keep their achievement art.
function ThemedToastBody({
  theme,
  kind,
  message
}: {
  theme: AppTheme
  kind: 'error' | 'warning' | 'success'
  message: string
}) {
  if (theme === 'lain') {
    return (
      <span className="lain-toast block">
        <span className="lain-toast-bar" aria-hidden="true">
          <img src={FX_ART.lainCoplandEye} alt="" />
          NAVI / {kind === 'error' ? 'ERROR' : 'MESSAGE'}
        </span>
        <span className="lain-toast-text block">
          <TypedText text={message} />
        </span>
      </span>
    )
  }
  if (theme === 'metal-gear') {
    if (kind === 'success') return <MeiLingSave message={message} />
    return (
      <span className="codec-toast flex items-center gap-3">
        <img className="codec-toast-face" src={kind === 'error' ? FX_ART.mgsSnake : FX_ART.mgsNaomi} alt="" />
        <span className="min-w-0">
          <img className="codec-toast-freq" src={FX_ART.mgsFreq} alt="" />
          <span className="codec-toast-text block">{message}</span>
        </span>
      </span>
    )
  }
  if (theme === 'miku') {
    const singer = MIKU_SINGERS[kind]
    return (
      <span className="miku-toast flex items-center gap-3">
        <img src={singer.art} alt="" />
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{singer.label}</span>
          <span className="block">{message}</span>
        </span>
      </span>
    )
  }
  return (
    <span className="peaks-toast flex items-center gap-3">
      <img src={FX_ART.peaksRedRoom} alt="" />
      <span className="peaks-toast-text min-w-0">
        <ReversedText text={message} />
      </span>
    </span>
  )
}

function MeiLingSave({ message }: { message: string }) {
  const [proverb] = useState(() => PROVERBS[proverbIndex++ % PROVERBS.length])
  const [done, setDone] = useState(prefersReducedMotion)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setTimeout(() => setDone(true), 700)
    return () => window.clearTimeout(id)
  }, [])
  return (
    <span className="codec-toast flex items-center gap-3">
      <img className="codec-toast-face" src={FX_ART.mgsMeiLing} alt="" />
      <span className="min-w-0">
        <span className="codec-toast-state block" aria-hidden="true">{done ? 'COMPLETE' : 'SAVING...'}</span>
        <span className="codec-toast-text block">{message}</span>
        <span className="codec-toast-quote block">{proverb}</span>
      </span>
    </span>
  )
}
