import { BLANK } from '../cloze'
import { kanjiChars } from '../confusables'
import { shuffle } from '../shuffle'

// Pure helpers behind /japanese/sentences (particle fill, sentence scramble,
// reading in context). They work on token arrays so tests hand-author them;
// main tokenizes with kuromoji and hands the tokens in.

export interface SgToken {
  surface: string
  base: string
  reading: string | null
  pos: string
  posDetail?: string | null
}

// The particles a fill-in question may blank. Sentence-final の/か/ね/よ are
// excluded by position, not by list.
export const PARTICLES = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'から', 'まで', 'も', 'の', 'より'] as const
export type Particle = (typeof PARTICLES)[number]

// Distractors that would often ALSO be right are never offered — the honest
// answer to は/が (and に/へ, and も vs は/が/を) is exclusion, not accept-both,
// which would leak a free answer. に/で and と/に stay legal distractors: the
// verb decides, and that IS the drill.
export const PARTICLE_CONFLICTS: Partial<Record<Particle, Particle[]>> = {
  は: ['が', 'も'],
  が: ['は', 'も'],
  を: ['も'],
  も: ['は', 'が', 'を'],
  に: ['へ'],
  へ: ['に']
}

const isParticle = (t: SgToken): boolean => t.pos === '助詞'

// Particle sub-types that must never be blanked even though they are 助詞:
// 接続助詞 is the て-form connector inside 飲んでいる / 持って行く (blanking it
// asks the learner to reconstruct a conjugation, not choose a case), and
// 終助詞 is the sentence-final ね/よ/か. Verified against real kuromoji output,
// not just the hand-authored fixtures.
const BLOCKED_PARTICLE_DETAIL = new Set(['接続助詞', '終助詞', '副詞化'])
const isPunct = (t: SgToken): boolean => t.pos === '記号'

// Indices of tokens a particle question may blank: a listed particle, not the
// last non-punctuation token (sentence-final の/か), and not adjacent to
// another eligible particle (には / では / からは compounds would blank half).
export function eligibleParticles(tokens: SgToken[]): number[] {
  let lastContent = -1
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (!isPunct(tokens[i])) {
      lastContent = i
      break
    }
  }
  const candidate = (i: number): boolean => {
    const t = tokens[i]
    if (!t || !isParticle(t)) return false
    if (t.posDetail && BLOCKED_PARTICLE_DETAIL.has(t.posDetail)) return false
    return (PARTICLES as readonly string[]).includes(t.surface) && i !== lastContent
  }
  const out: number[] = []
  for (let i = 0; i < tokens.length; i++) {
    if (!candidate(i)) continue
    if ((i > 0 && isParticle(tokens[i - 1])) || (i + 1 < tokens.length && isParticle(tokens[i + 1]))) {
      continue
    }
    out.push(i)
  }
  return out
}

// The sentence with token i replaced by the cloze blank.
export function blankAt(tokens: SgToken[], i: number): { blanked: string; answer: string } {
  const answer = tokens[i].surface
  const blanked = tokens.map((t, idx) => (idx === i ? BLANK : t.surface)).join('')
  return { blanked, answer }
}

// Four options: the answer + three particles that are neither the answer nor
// one of its conflict partners.
export function particleOptions(answer: string, rng: () => number = Math.random): string[] {
  const banned = new Set<string>([answer, ...(PARTICLE_CONFLICTS[answer as Particle] ?? [])])
  const pool = PARTICLES.filter((p) => !banned.has(p))
  return shuffle([answer, ...shuffle(pool, rng).slice(0, 3)], rng)
}

// Bunsetsu-ish chunking: a content token followed by everything that leans on
// it (particles, auxiliaries, punctuation, 接尾/非自立 tails like さん・達・いる・
// しまう), 接頭詞 binding forward, and noun+noun compounds merged (東京+駅,
// 三+人) unless the first noun is a pronoun.
const ATTACH_POS = new Set(['助詞', '助動詞', '記号'])
const ATTACH_DETAIL = new Set(['接尾', '非自立'])

export function chunkTokens(tokens: SgToken[]): string[] {
  const out: string[] = []
  let cur = ''
  let open = false // a prefix waiting for its head
  let prev: SgToken | null = null
  for (const t of tokens) {
    if (t.pos === '記号' && !t.surface.trim()) continue // whitespace
    if (!cur) {
      cur = t.surface
      open = t.pos === '接頭詞'
      prev = t
      continue
    }
    const attach =
      open ||
      ATTACH_POS.has(t.pos) ||
      (t.posDetail != null && ATTACH_DETAIL.has(t.posDetail)) ||
      (t.pos === '名詞' && prev?.pos === '名詞' && prev.posDetail !== '代名詞')
    if (attach) {
      cur += t.surface
      open = false
    } else {
      out.push(cur)
      cur = t.surface
      open = t.pos === '接頭詞'
    }
    prev = t
  }
  if (cur) out.push(cur)
  return out.filter((c) => c.length > 0)
}

// Sentence-final punctuation is a giveaway for the last chunk; peel it off.
export function stripFinalPunct(chunks: string[]): { chunks: string[]; punct: string } {
  if (chunks.length === 0) return { chunks, punct: '' }
  const last = chunks[chunks.length - 1]
  const m = last.match(/[。！？!?…]+$/)
  if (!m) return { chunks, punct: '' }
  const trimmed = last.slice(0, -m[0].length)
  const out = [...chunks.slice(0, -1)]
  if (trimmed) out.push(trimmed)
  return { chunks: out, punct: m[0] }
}

// Words a reading-in-context question may target: kanji-bearing, with a
// reading, a noun (not a number / suffix / dependent noun) or a verb/adjective
// in dictionary form — so a JMdict lookup by expression is exact.
export interface ContextCandidate {
  index: number
  surface: string
  start: number
  end: number
  reading: string
}

const NOUN_SKIP = new Set(['数', '接尾', '非自立'])

export function contextCandidates(tokens: SgToken[]): ContextCandidate[] {
  const out: ContextCandidate[] = []
  let offset = 0
  tokens.forEach((t, index) => {
    const start = offset
    offset += t.surface.length
    if (!t.reading || kanjiChars(t.surface).length === 0) return
    const ok =
      (t.pos === '名詞' && !(t.posDetail && NOUN_SKIP.has(t.posDetail))) ||
      ((t.pos === '動詞' || t.pos === '形容詞') && t.surface === t.base)
    if (!ok) return
    out.push({ index, surface: t.surface, start, end: offset, reading: t.reading })
  })
  return out
}
