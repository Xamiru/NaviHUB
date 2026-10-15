// Remembered setup for the challenge quizzes, per kind. A localStorage pref,
// not usePersistedState: the choice should outlive the visit. Every read is
// validated, so a stale or hand-edited value falls back to the default.

const key = (kind: string): string => `quiz.challengeSetup.${kind}`

export type ChallengeSetup = Record<string, unknown>

export function loadChallengeSetup(kind: string): ChallengeSetup {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(key(kind)) ?? '{}')
    return parsed && typeof parsed === 'object' ? (parsed as ChallengeSetup) : {}
  } catch {
    return {}
  }
}

export function saveChallengeSetup(kind: string, setup: ChallengeSetup): void {
  try {
    localStorage.setItem(key(kind), JSON.stringify(setup))
  } catch {
    // Storage can be unavailable; the round still starts with these settings.
  }
}

export function setupOption<T>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback
}
