import { romajiToHiragana } from './romaji'
import { cycleKana, applyDakuten, applyHandakuten, applySmall } from './kanaKeyboard'

// The on-screen keyboard's composition buffer — typing.ts's interpret() model
// promoted to a first-class state machine. Pure redux-style functions: take a
// state, return a new one (or the SAME object when nothing changed, so React
// consumers can bail on identity).
//
// The engine always composes hiragana. There is no katakana mode — the
// candidate row offers toKatakana(kana) as a pick, the way phone IMEs do.

export interface ComposeState {
  kana: string // committed kana in the buffer
  pending: string // trailing romaji not yet resolvable (QWERTY mode only)
}

export const EMPTY_COMPOSE: ComposeState = { kana: '', pending: '' }

export function isEmpty(s: ComposeState): boolean {
  return s.kana === '' && s.pending === ''
}

// What the composition bar shows: resolved kana + the latin tail still forming.
export function displayText(s: ComposeState): string {
  return s.kana + s.pending
}

// What committing the buffer as-is produces: a dangling "n" flushes to ん,
// any other unresolved letters pass through (visible is honest).
export function commitText(s: ComposeState): string {
  return s.kana + romajiToHiragana(s.pending)
}

// One QWERTY keystroke. Re-converts the whole pending tail each time (the
// conversion is cheap and self-corrects: "ky" stays pending, "kyo" resolves).
export function typeRomaji(s: ComposeState, ch: string): ComposeState {
  const raw = s.pending + ch.toLowerCase()
  const conv = romajiToHiragana(raw)
  // The still-composing tail is the trailing run of letters/apostrophe.
  const tailMatch = conv.match(/[a-z']+$/)
  let pending = tailMatch ? tailMatch[0] : ''
  let head = conv.slice(0, conv.length - pending.length)
  // A lone trailing "n" converts eagerly to ん but could still begin a な-row
  // syllable — hold it pending; commitText flushes it back to ん.
  if (
    pending === '' &&
    head.endsWith('ん') &&
    raw.endsWith('n') &&
    !raw.endsWith('nn') &&
    !raw.endsWith("n'")
  ) {
    head = head.slice(0, -1)
    pending = 'n'
  }
  return { kana: s.kana + head, pending }
}

// One gojūon/flick key. Any dangling romaji flushes first so mixing layouts
// mid-composition stays coherent.
export function typeKana(s: ComposeState, kana: string): ComposeState {
  return { kana: s.kana + romajiToHiragana(s.pending) + kana, pending: '' }
}

// Delete one unit: the last pending letter if any, else the last buffer char.
export function backspace(s: ComposeState): ComposeState {
  if (s.pending) return { kana: s.kana, pending: s.pending.slice(0, -1) }
  if (!s.kana) return s
  const chars = Array.from(s.kana)
  return { kana: chars.slice(0, -1).join(''), pending: '' }
}

export type KanaTransform = 'dakuten' | 'handakuten' | 'small' | 'cycle'

// Rewrite the LAST buffer kana (か→が…). The gojūon layout exposes the three
// explicit toggles; flick uses the phone's single ゛゜小 cycle. No-op (same
// state object) while romaji is still pending or the kana has no such form.
export function transformLast(s: ComposeState, t: KanaTransform): ComposeState {
  if (s.pending || !s.kana) return s
  const chars = Array.from(s.kana)
  const last = chars[chars.length - 1]
  const next =
    t === 'cycle'
      ? cycleKana(last)
      : t === 'dakuten'
        ? applyDakuten(last)
        : t === 'handakuten'
          ? applyHandakuten(last)
          : applySmall(last)
  if (next === null || next === last) return s
  chars[chars.length - 1] = next
  return { kana: chars.join(''), pending: '' }
}
