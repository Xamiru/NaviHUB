import { completeOnce, friendlyError } from './llm'
import * as englishRepo from './repos/englishRepo'
import { EN_PASSAGES } from '@shared/english/passages'
import { EN_WRITING_PROMPTS } from '@shared/english/writingPrompts'
import type { EnWritingPrompt } from '@shared/english/types'
import type { EnWritingEntry, EnWritingFeedback } from '@shared/types'

// English writing feedback: ONE non-streaming LLM call per submission
// (llm.ts completeOnce — the coach provider settings), strict-JSON reply
// parsed here, persisted to en_writing. Plain await over IPC on purpose (the
// importDoc precedent): a submit doesn't need to survive navigation, so no
// status object — the page just disables its button for the ~10-20s.

// ---- prompt building (pure, exported for tests) ----

export function buildFeedbackPrompt(
  prompt: EnWritingPrompt,
  passageText: string | null,
  submission: string
): { system: string; prompt: string } {
  const system = [
    'You are a strict but constructive English writing examiner grading at CEFR C1/C2 (Cambridge Advanced/Proficiency style).',
    "The learner is a non-native speaker with C1 comprehension and strong-B2 production. Their known weak spots: spelling, punctuation and sentence boundaries (run-ons, comma splices, missing apostrophes), article usage, subject-verb agreement slips, confusable pairs (to/too, its/it's), and register control. Watch for these specifically, but report every genuine error.",
    'Reply with EXACTLY ONE JSON object and nothing else - no markdown fences, no commentary before or after. Shape:',
    '{"scores":{"grammar":0-10,"vocabulary":0-10,"coherence":0-10,"register":0-10},"corrections":[{"before":"exact text from the submission","after":"corrected text","why":"the rule, briefly"}],"modelRewrite":"the full submission rewritten as a C2 writer would, same content and length","overall":"2-4 sentences: what was strong, the one habit to fix next"}',
    'Scoring: 5 = solid B2, 7 = C1, 9+ = native-like C2. Score register against what THIS task demands. List corrections in the order they appear; merge only identical repeated errors (note "x3" in why). If the submission ignores the task or is too short to grade, score low and say so in overall.'
  ].join('\n')

  const parts = [
    `# Task (${prompt.kind})`,
    prompt.title,
    prompt.instructions,
    prompt.minWords ? `Expected length: ${prompt.minWords}-${prompt.maxWords ?? '?'} words.` : ''
  ].filter(Boolean)
  if (passageText) parts.push('# Passage the task refers to', passageText)
  parts.push('# The submission to grade', submission)
  return { system, prompt: parts.join('\n\n') }
}

// ---- reply parsing (pure, exported for tests) ----

const clampScore = (v: unknown): number => {
  const n = typeof v === 'number' && Number.isFinite(v) ? v : 0
  return Math.max(0, Math.min(10, n))
}

export function parseFeedback(raw: string): EnWritingFeedback {
  // Models fence or preface JSON no matter how firmly told not to.
  const cleaned = raw.replace(/```(?:json)?/g, '')
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start < 0 || end <= start) {
    throw new Error('The model returned an unreadable reply - try again.')
  }
  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(cleaned.slice(start, end + 1)) as Record<string, unknown>
  } catch {
    throw new Error('The model returned an unreadable reply - try again.')
  }
  const scores = (parsed.scores ?? {}) as Record<string, unknown>
  const rawCorrections = Array.isArray(parsed.corrections) ? parsed.corrections : []
  const corrections = rawCorrections
    .map((c) => c as Record<string, unknown>)
    .filter((c) => typeof c.before === 'string' && typeof c.after === 'string')
    .map((c) => ({
      before: c.before as string,
      after: c.after as string,
      why: typeof c.why === 'string' ? c.why : ''
    }))
  return {
    scores: {
      grammar: clampScore(scores.grammar),
      vocabulary: clampScore(scores.vocabulary),
      coherence: clampScore(scores.coherence),
      register: clampScore(scores.register)
    },
    corrections,
    modelRewrite: typeof parsed.modelRewrite === 'string' ? parsed.modelRewrite : '',
    overall: typeof parsed.overall === 'string' ? parsed.overall : ''
  }
}

// ---- the IPC entry point ----

export async function getWritingFeedback(req: {
  promptKey: string
  text: string
}): Promise<EnWritingEntry> {
  const prompt = EN_WRITING_PROMPTS.find((p) => p.key === req.promptKey)
  if (!prompt) throw new Error(`Unknown writing prompt: ${req.promptKey}`)
  const text = req.text.trim()
  if (!text) throw new Error('Write something first.')
  const passage = prompt.passageKey
    ? (EN_PASSAGES.find((p) => p.key === prompt.passageKey)?.text ?? null)
    : null
  const built = buildFeedbackPrompt(prompt, passage, text)
  let raw: string
  try {
    raw = await completeOnce({ system: built.system, prompt: built.prompt, maxTokens: 2048 })
  } catch (e) {
    throw new Error(friendlyError(e))
  }
  const feedback = parseFeedback(raw)
  const s = feedback.scores
  const score = Math.round(((s.grammar + s.vocabulary + s.coherence + s.register) / 4) * 10) / 10
  return englishRepo.saveWriting({
    promptKey: prompt.key,
    promptTitle: prompt.title,
    submission: text,
    feedback,
    score
  })
}
