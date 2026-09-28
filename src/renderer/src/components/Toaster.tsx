import { useEffect, useState, useSyncExternalStore } from 'react'
import type { AppTheme, AppThemeVariant } from '@shared/appTheme'
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
  const { theme, variant } = useAppTheme()
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
          className={`theme-toast theme-toast-${theme} ${!SELF_STYLED.has(theme) && t.kind !== 'unlock' ? 'theme-dark' : ''} flex items-center gap-3 rounded-lg border bg-base-700 px-4 py-3 text-left text-sm shadow-lg ${
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
              <ThemedToastBody theme={theme} variant={variant} kind={t.kind} message={t.message} />
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

// Themes whose toast surface is styled here rather than by the dark island.
const SELF_STYLED = new Set<AppTheme>(['miku', 'seinfeld', 'berserk', 'one-piece', 'jojo'])

// Mei Ling reads a proverb with each save in MGS1; these are public-domain sayings.
const PROVERBS = [
  'A journey of a thousand miles begins with a single step.',
  'The best time to plant a tree was twenty years ago. The second best time is now.',
  'Knowledge is a treasure, but practice is the key to it.',
  'Fall seven times, stand up eight.',
  'Even monkeys fall from trees.'
]
let proverbIndex = 0

// Seinfeld: Newman brings the errors, George worries about warnings, and a
// success comes from Jerry, Elaine or Kramer (stable per message).
const SEINFELD_SUCCESS = [
  { art: FX_ART.sfJerry, label: 'Saved' },
  { art: FX_ART.sfElaine, label: 'Get out!' },
  { art: FX_ART.sfKramer, label: 'Giddy up!' }
]
function seinfeldCaller(kind: 'error' | 'warning' | 'success', message: string): { art: string; label: string } {
  if (kind === 'error') return { art: FX_ART.sfNewman, label: 'Hello, Newman.' }
  if (kind === 'warning') return { art: FX_ART.sfGeorge, label: 'Serenity now!' }
  let hash = 0
  for (const ch of message) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return SEINFELD_SUCCESS[hash % SEINFELD_SUCCESS.length]
}

// Berserk: every face is Miura's drawing. Casca or Guts bring a success (stable
// per message), the Skull Knight a warning, the Brand of Sacrifice an error.
const BERSERK_SUCCESS = [
  { art: FX_ART.bzCasca, label: 'Done' },
  { art: FX_ART.bzGuts, label: 'Saved' }
]
function berserkCaller(kind: 'error' | 'warning' | 'success', message: string): { art: string; label: string } {
  if (kind === 'error') return { art: FX_ART.bzBrand, label: 'Error' }
  if (kind === 'warning') return { art: FX_ART.bzSkull, label: 'Warning' }
  let hash = 0
  for (const ch of message) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return BERSERK_SUCCESS[hash % BERSERK_SUCCESS.length]
}

// Stable per message, so the same notice always comes from the same caller.
function pick<T>(list: T[], message: string): T {
  let hash = 0
  for (const ch of message) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return list[hash % list.length]
}

// One Piece: every notice is a Den Den Mushi call. Luffy, Nami or Chopper bring
// a success, Usopp a warning, Smoker of the Marines an error.
function onePieceCaller(kind: 'error' | 'warning' | 'success', message: string): { art: string; label: string } {
  if (kind === 'error') return { art: FX_ART.opSmoker, label: 'Smoker' }
  if (kind === 'warning') return { art: FX_ART.opUsopp, label: 'Usopp' }
  return pick([{ art: FX_ART.opLuffy, label: 'Luffy' }, { art: FX_ART.opNami, label: 'Nami' }, { art: FX_ART.opChopper, label: 'Chopper' }], message)
}

// JoJo: the active part's cast, each with their line.
type Caller = { art: string; label: string }
const JOJO_CAST: Record<'stardust-crusaders' | 'diamond-is-unbreakable' | 'golden-wind', { success: Caller[]; warning: Caller; error: Caller }> = {
  'stardust-crusaders': {
    success: [{ art: FX_ART.jjJotaro, label: 'Yare yare daze.' }, { art: FX_ART.jjPolnareff, label: 'Mon dieu!' }],
    warning: { art: FX_ART.jjJoseph, label: 'Oh my God!' },
    error: { art: FX_ART.jjDio, label: 'Useless!' }
  },
  'diamond-is-unbreakable': {
    success: [{ art: FX_ART.jjJosuke, label: 'Great!' }, { art: FX_ART.jjKoichi, label: 'Echoes!' }],
    warning: { art: FX_ART.jjKoichi, label: 'Wait a second!' },
    error: { art: FX_ART.jjRohan, label: 'I refuse.' }
  },
  'golden-wind': {
    success: [{ art: FX_ART.jjGiorno, label: 'Gold Experience!' }, { art: FX_ART.jjBucciarati, label: 'Arrivederci.' }],
    warning: { art: FX_ART.jjMista, label: 'Four!' },
    error: { art: FX_ART.jjKingcrimson, label: 'King Crimson!' }
  }
}
function jojoCaller(variant: AppThemeVariant, kind: 'error' | 'warning' | 'success', message: string): Caller {
  const cast = JOJO_CAST[variant === 'diamond-is-unbreakable' || variant === 'golden-wind' ? variant : 'stardust-crusaders']
  return kind === 'success' ? pick(cast.success, message) : cast[kind]
}

const MIKU_SINGERS: Record<'error' | 'warning' | 'success', { art: string; label: string }> = {
  success: { art: FX_ART.mikuSingers.miku, label: 'Library' },
  warning: { art: FX_ART.mikuSingers.kaito, label: 'Notice' },
  error: { art: FX_ART.mikuSingers.meiko, label: 'Error' }
}

// Each theme frames the same message differently; the text, roles, timer and
// Close button are unchanged. Unlock toasts keep their achievement art.
function ThemedToastBody({
  theme,
  variant,
  kind,
  message
}: {
  theme: AppTheme
  variant: AppThemeVariant
  kind: 'error' | 'warning' | 'success'
  message: string
}) {
  if (theme === 'one-piece') {
    const who = onePieceCaller(kind, message)
    return (
      <span className="op-toast flex items-center gap-3">
        <img className="op-toast-snail" src={FX_ART.opDenden} alt="" />
        <img className="op-toast-who" src={who.art} alt="" />
        <span className="min-w-0">
          <span className="op-toast-call block" aria-hidden="true">Puru puru puru... gacha.</span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{who.label}</span>
          <span className="block">{message}</span>
        </span>
      </span>
    )
  }
  if (theme === 'jojo') {
    const who = jojoCaller(variant, kind, message)
    return (
      <span className="jojo-toast flex items-center gap-3">
        <img src={who.art} alt="" />
        <span className="min-w-0">
          <span className="jojo-toast-line block">{who.label}</span>
          <span className="block">{message}</span>
        </span>
      </span>
    )
  }
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
  if (theme === 'seinfeld' || theme === 'berserk') {
    const who = theme === 'seinfeld' ? seinfeldCaller(kind, message) : berserkCaller(kind, message)
    return (
      <span className={`${theme}-toast flex items-center gap-3`}>
        <img src={who.art} alt="" />
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{who.label}</span>
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
