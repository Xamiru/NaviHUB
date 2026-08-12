// Layout data + kana transforms for the on-screen Japanese keyboard. Pure and
// dependency-light (romaji.ts house style) so the tables can be
// completeness-tested under plain node and reused by a future practice page.
//
// These are deliberately NOT JapaneseKanaPage's drill rows: the drill selects
// practice sets (dakuten kana as their own rows), while the keyboard shows the
// base-46 gojūon table and derives が from か+゛ — the derivation IS the lesson.

// ---- gojūon layout ----

// 11 rows × 5 vowel columns (a i u e o), null = a real gap in the table.
// Rendered top-to-bottom exactly like a learner's kana chart.
export const GOJUON_ROWS: (string | null)[][] = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', null, 'ゆ', null, 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', null, null, null, 'を'],
  ['ん', null, null, null, null]
]

// ---- kana transforms (dakuten / handakuten / small) ----

const DAKUTEN: Record<string, string> = {
  か: 'が', き: 'ぎ', く: 'ぐ', け: 'げ', こ: 'ご',
  さ: 'ざ', し: 'じ', す: 'ず', せ: 'ぜ', そ: 'ぞ',
  た: 'だ', ち: 'ぢ', つ: 'づ', て: 'で', と: 'ど',
  は: 'ば', ひ: 'び', ふ: 'ぶ', へ: 'べ', ほ: 'ぼ',
  う: 'ゔ'
}

const HANDAKUTEN: Record<string, string> = {
  は: 'ぱ', ひ: 'ぴ', ふ: 'ぷ', へ: 'ぺ', ほ: 'ぽ'
}

const SMALL: Record<string, string> = {
  あ: 'ぁ', い: 'ぃ', う: 'ぅ', え: 'ぇ', お: 'ぉ',
  や: 'ゃ', ゆ: 'ゅ', よ: 'ょ', つ: 'っ', わ: 'ゎ'
}

function invert(map: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(map)) out[v] = k
  return out
}

const UNDAKUTEN = invert(DAKUTEN)
const UNHANDAKUTEN = invert(HANDAKUTEN)
const UNSMALL = invert(SMALL)

// Base form of any variant (っ→つ, ば→は, ぱ→は); identity for base kana.
function baseKana(k: string): string {
  return UNDAKUTEN[k] ?? UNHANDAKUTEN[k] ?? UNSMALL[k] ?? k
}

// Toggles for the gojūon layout's explicit ゛ ゜ 小 keys. null = no such form
// (the key renders disabled / no-ops).
export function applyDakuten(k: string): string | null {
  if (UNDAKUTEN[k]) return UNDAKUTEN[k]
  return DAKUTEN[baseKana(k)] ?? null
}

export function applyHandakuten(k: string): string | null {
  if (UNHANDAKUTEN[k]) return UNHANDAKUTEN[k]
  return HANDAKUTEN[baseKana(k)] ?? null
}

export function applySmall(k: string): string | null {
  if (UNSMALL[k]) return UNSMALL[k]
  return SMALL[baseKana(k)] ?? null
}

// The phone-IME ゛゜小 cycle: base → small → dakuten → handakuten → base,
// skipping forms a kana doesn't have (つ→っ→づ→つ, は→ば→ぱ→は, あ→ぁ→あ,
// う→ぅ→ゔ→う). Identity for kana with no variants (ん, ら行…).
export function cycleKana(k: string): string {
  const base = baseKana(k)
  const chain = [base]
  if (SMALL[base]) chain.push(SMALL[base])
  if (DAKUTEN[base]) chain.push(DAKUTEN[base])
  if (HANDAKUTEN[base]) chain.push(HANDAKUTEN[base])
  const idx = chain.indexOf(k)
  if (idx === -1 || chain.length === 1) return k
  return chain[(idx + 1) % chain.length]
}

// ---- flick layout ----

export type FlickDir = 'tap' | 'left' | 'up' | 'right' | 'down'

export interface FlickKeySpec {
  id: string
  center: string
  petals: { left?: string; up?: string; right?: string; down?: string }
}

// The standard smartphone 12-key grid, minus the cycle key (rendered by the
// panel in the bottom-left slot). Petal maps mirror the iOS/Android layout —
// left/up/right/down = the i/u/e/o columns for the kana keys.
export const FLICK_KEYS: FlickKeySpec[] = [
  { id: 'a', center: 'あ', petals: { left: 'い', up: 'う', right: 'え', down: 'お' } },
  { id: 'ka', center: 'か', petals: { left: 'き', up: 'く', right: 'け', down: 'こ' } },
  { id: 'sa', center: 'さ', petals: { left: 'し', up: 'す', right: 'せ', down: 'そ' } },
  { id: 'ta', center: 'た', petals: { left: 'ち', up: 'つ', right: 'て', down: 'と' } },
  { id: 'na', center: 'な', petals: { left: 'に', up: 'ぬ', right: 'ね', down: 'の' } },
  { id: 'ha', center: 'は', petals: { left: 'ひ', up: 'ふ', right: 'へ', down: 'ほ' } },
  { id: 'ma', center: 'ま', petals: { left: 'み', up: 'む', right: 'め', down: 'も' } },
  { id: 'ya', center: 'や', petals: { left: '（', up: 'ゆ', right: '）', down: 'よ' } },
  { id: 'ra', center: 'ら', petals: { left: 'り', up: 'る', right: 'れ', down: 'ろ' } },
  { id: 'wa', center: 'わ', petals: { left: 'を', up: 'ん', right: 'ー', down: '〜' } },
  { id: 'punct', center: '、', petals: { left: '。', up: '？', right: '！', down: '…' } }
]

export const FLICK_CYCLE_LABEL = '゛゜小'

// Resolve a completed gesture. null when the key has no petal that way.
export function flickResult(key: FlickKeySpec, dir: FlickDir): string | null {
  if (dir === 'tap') return key.center
  return key.petals[dir] ?? null
}

// ---- romaji QWERTY layout ----

// Physical-ish rows; '-' composes ー. The apostrophe (n') is reachable via the
// panel's chrome row rather than a dedicated key.
export const QWERTY_ROWS: string[] = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm-']
