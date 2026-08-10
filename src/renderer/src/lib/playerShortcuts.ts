// Which routes the global music keys (Space, PageUp/PageDown) are live on.
//
// They are a FALLBACK layer, not a claim: every quiz, drill and review page
// binds Space (reveal / advance) and 1-4 for its own answer flow, and a
// per-page opt-out would drift the moment a new drill lands. So whole sections
// are excluded instead — inside Japanese, English, Programming and Quiz the
// PAGE owns the keyboard, and the player is driven from the bar.
//
// The chromeless readers and the video player need no rule: PlayerShortcuts is
// mounted in App's shell branch, which those routes never render.
const KEY_OWNING_SECTIONS = ['/japanese', '/english', '/programming', '/quiz']

export function playerShortcutsEnabled(pathname: string): boolean {
  return !KEY_OWNING_SECTIONS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}
