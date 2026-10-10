import { useCallback, useState } from 'react'

// Cross-session prefs shared by every JpKeyboardInput site — the
// book.readerPrefs localStorage idiom (usePersistedState is per-history-entry,
// wrong for a keyboard that should look the same on every page).

export type JpKeyboardLayout = 'gojuon' | 'flick' | 'qwerty'

export interface JpKeyboardPrefs {
  layout: JpKeyboardLayout
  romajiHints: boolean
}

export const KEYBOARD_DEFAULTS: JpKeyboardPrefs = { layout: 'gojuon', romajiHints: true }

const PREFS_KEY = 'jp.keyboardPrefs'

export function loadJpKeyboardPrefs(): JpKeyboardPrefs {
  try {
    return { ...KEYBOARD_DEFAULTS, ...JSON.parse(localStorage.getItem(PREFS_KEY) ?? '{}') }
  } catch {
    return KEYBOARD_DEFAULTS
  }
}

export function useJpKeyboardPrefs(): [
  JpKeyboardPrefs,
  <K extends keyof JpKeyboardPrefs>(k: K, v: JpKeyboardPrefs[K]) => void
] {
  const [prefs, setPrefs] = useState<JpKeyboardPrefs>(loadJpKeyboardPrefs)
  const setPref = useCallback(<K extends keyof JpKeyboardPrefs>(k: K, v: JpKeyboardPrefs[K]) => {
    setPrefs((p) => {
      const next = { ...p, [k]: v }
      saveJpKeyboardPrefs(next)
      return next
    })
  }, [])
  return [prefs, setPref]
}

// Settings → Learning edits the same prefs the keyboard remembers.
export function saveJpKeyboardPrefs(prefs: JpKeyboardPrefs): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {
    // A full or disabled localStorage must never block typing.
  }
}
