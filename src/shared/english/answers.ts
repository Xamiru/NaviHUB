// Typed-answer matching for the Use-of-English formats (open cloze, word
// formation, key-word transformations). Pure and shared so the renderer's
// accept() and the content tests agree on what counts as the same answer.
//
// Equivalence = equal after normalizeAnswer(), OR equal after expanding the
// unambiguous contractions on both sides (won't/will not, don't/do not,
// I'll/I will …). 'd and 's are deliberately NOT expanded — "he'd" is had or
// would, "it's" is is or has — authors list both forms in `answers` instead.

export function normalizeAnswer(s: string): string {
  return s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[.,;:!?"']+|[.,;:!?"']+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const CONTRACTIONS: [RegExp, string][] = [
  [/\bwon't\b/g, 'will not'],
  [/\bcan't\b/g, 'can not'],
  [/\bcannot\b/g, 'can not'],
  [/\bshan't\b/g, 'shall not'],
  [/\bain't\b/g, 'am not'],
  [/\blet's\b/g, 'let us'],
  [/\b(\w+)n't\b/g, '$1 not'],
  [/\b(\w+)'ll\b/g, '$1 will'],
  [/\b(\w+)'re\b/g, '$1 are'],
  [/\b(\w+)'ve\b/g, '$1 have'],
  [/\bi'm\b/g, 'i am']
]

export function expandContractions(s: string): string {
  let out = s
  for (const [re, rep] of CONTRACTIONS) out = out.replace(re, rep)
  return out.replace(/\s+/g, ' ').trim()
}

export function matchesAnswer(input: string, answers: readonly string[]): boolean {
  const a = normalizeAnswer(input)
  if (!a) return false
  const ax = expandContractions(a)
  for (const ans of answers) {
    const b = normalizeAnswer(ans)
    if (a === b) return true
    if (ax === expandContractions(b)) return true
  }
  return false
}

export function wordCount(s: string): number {
  const n = normalizeAnswer(s)
  return n ? n.split(' ').length : 0
}
