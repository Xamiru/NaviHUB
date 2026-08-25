import type { JpLessonKind, JpQuizItem } from '../types'

export interface LessonProductionPrompt {
  promptEn: string
  modelJp: string
  reading: string | null
  note: string
}

// Builds a small, controlled English-to-Japanese self-check from vetted lesson
// content. It deliberately does not auto-grade: several Japanese answers may
// be valid, so the learner compares against one model and decides honestly.
export function buildLessonProductionPrompts(
  items: JpQuizItem[],
  kind: JpLessonKind,
  limit = 3
): LessonProductionPrompt[] {
  if (kind === 'kanji') return []
  const out: LessonProductionPrompt[] = []
  const seen = new Set<string>()
  for (const card of items) {
    const useExample = !!card.exampleJp && !!card.exampleEn
    const modelJp = useExample ? card.exampleJp! : card.front
    const promptEn = useExample ? card.exampleEn! : card.back
    if (!modelJp.trim() || !promptEn.trim() || /_{2,}/.test(modelJp)) continue
    const key = `${promptEn}\u0000${modelJp}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({
      promptEn,
      modelJp,
      reading: useExample ? card.exampleReading : card.reading,
      note:
        kind === 'grammar'
          ? 'Use the target pattern; wording may differ from the model.'
          : useExample
            ? 'Produce the sentence, not only the target word.'
            : 'Use the lesson word; kana or kanji is fine.'
    })
    if (out.length >= Math.max(0, limit)) break
  }
  return out
}
