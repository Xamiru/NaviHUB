import { LEARNING_EVIDENCE_PREFIX } from '../learningEvidence'

export const ENGLISH_MISTAKES_KEY = `${LEARNING_EVIDENCE_PREFIX}english.mistakes`
export interface EnglishMistake { key: string; misses: number; lastAt: string }

export function parseEnglishMistakes(raw: string | undefined): EnglishMistake[] {
  try {
    const value = JSON.parse(raw ?? '[]')
    return Array.isArray(value) ? value.filter((m) => m && typeof m.key === 'string' &&
      Number.isInteger(m.misses) && m.misses > 0 && Number.isFinite(Date.parse(m.lastAt))) : []
  } catch { return [] }
}

export function updateEnglishMistakes(old: EnglishMistake[], results: { key: string; correct: boolean }[], at: string): EnglishMistake[] {
  const byKey = new Map(old.map((item) => [item.key, item]))
  // One observation per item in a round: repeating it after reveal cannot clear a miss.
  const first = new Map<string, boolean>()
  for (const result of results) if (!first.has(result.key)) first.set(result.key, result.correct)
  for (const [key, correct] of first) {
    if (correct) byKey.delete(key)
    else byKey.set(key, { key, misses: (byKey.get(key)?.misses ?? 0) + 1, lastAt: at })
  }
  return [...byKey.values()].sort((a, b) => b.misses - a.misses || b.lastAt.localeCompare(a.lastAt))
}
