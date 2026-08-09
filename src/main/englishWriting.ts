import { completeOnce, friendlyError } from './llm'
import * as englishRepo from './repos/englishRepo'
import { EN_PASSAGES } from '@shared/english/passages'
import { EN_WRITING_PROMPTS } from '@shared/english/writingPrompts'
import { EN_MECHANICS_CATEGORIES } from '@shared/english/types'
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
    '{"scores":{"grammar":0-10,"vocabulary":0-10,"coherence":0-10,"register":0-10},"corrections":[{"before":"exact text from the submission","after":"corrected text","why":"the rule, briefly","category":"one of: articles, punctuation, boundaries, confusables, register, spelling"}],"modelRewrite":"the full submission rewritten as a C2 writer would, same content and length","overall":"2-4 sentences: what was strong, the one habit to fix next"}',
    'Every correction MUST carry a category from that exact list - it drives which drills you are given next. Use the closest fit; do not invent new category names.',
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

// A model that emits "8" instead of 8 must not be read as 0 — but throwing on
// one missing key was the opposite over-correction: parseFeedback runs after
// the LLM call and before saveWriting, so a reply with a full rewrite, every
// correction and three of four scores was discarded wholesale, essay included.
// Coerce, and report an unusable dimension as null instead of guessing.
const clampScore = (v: unknown): number | null => {
  const n = typeof v === 'string' ? Number(v.trim()) : v
  if (typeof n !== 'number' || !Number.isFinite(n)) return null
  return Math.max(0, Math.min(10, n))
}

// Corrections quote the learner's text back at them, so an unanchored one is
// the worst output this feature has: it shows words they never wrote. But an
// exact substring test threw away every correction the model normalised —
// straight quotes for curly, a collapsed newline, a trimmed space — leaving a
// flawed essay rendered as flawless. Compare on a normalised form instead.
function normalizeForMatch(text: string): string {
  return text
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

// `submission` is passed in so a correction can be checked against what the
// learner actually wrote: a hallucinated or paraphrased `before` would
// otherwise be rendered back to them as their own sentence, with a rule
// attached — the worst failure available to a tool that grades writing.
export function parseFeedback(raw: string, submission: string): EnWritingFeedback {
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
  const haystack = normalizeForMatch(submission)
  const rawCorrections = Array.isArray(parsed.corrections) ? parsed.corrections : []
  const corrections = rawCorrections
    .map((c) => c as Record<string, unknown>)
    .filter((c) => typeof c.before === 'string' && typeof c.after === 'string')
    // An empty `before` passed the old `includes` check unconditionally.
    .filter((c) => (c.before as string).trim().length > 0)
    .filter((c) => haystack.includes(normalizeForMatch(c.before as string)))
    .map((c) => ({
      before: c.before as string,
      after: c.after as string,
      why: typeof c.why === 'string' ? c.why : '',
      // Anything outside the six keys becomes null rather than polluting the
      // tally with a category the drills cannot act on.
      category:
        typeof c.category === 'string' &&
        (EN_MECHANICS_CATEGORIES as readonly string[]).includes(c.category.trim().toLowerCase())
          ? c.category.trim().toLowerCase()
          : null
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
    // modelRewrite and overall are the LAST keys of the required JSON, so a
    // long error-heavy essay truncates exactly those two and they silently
    // default to ''. Budget for the rewrite being as long as the submission.
    raw = await completeOnce({ system: built.system, prompt: built.prompt, maxTokens: 8192 })
  } catch (e) {
    throw new Error(friendlyError(e))
  }
  const feedback = parseFeedback(raw, text)
  // Mean over the dimensions that were actually graded; null when none were,
  // so an ungraded reply still persists rather than scoring itself 0.
  const graded = Object.values(feedback.scores).filter((n): n is number => n != null)
  const score = graded.length
    ? Math.round((graded.reduce((a, b) => a + b, 0) / graded.length) * 10) / 10
    : null
  return englishRepo.saveWriting({
    promptKey: prompt.key,
    promptTitle: prompt.title,
    submission: text,
    feedback,
    score
  })
}
