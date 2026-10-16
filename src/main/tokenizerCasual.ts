import type { JpToken } from '@shared/types'

// Casual-speech repair for the tokenizer. IPAdic knows the standard contractions
// (てる, ちゃう, じゃん, っす, なきゃ, とく) but not the sound changes manga and
// VN dialogue is full of: すげえ, うるせぇ, やべー, 知らねー, だりー. kuromoji
// splits those into nonsense (す/げ/え, や/べ/ー), so mining and the known-word
// count miss the word.
//
// The repair rewrites each colloquial form into its standard spelling OF THE
// SAME LENGTH (すげえ → すごい, 知らねー → 知らない, つまんねえ → つまらない),
// tokenizes that, then gives every token back the original characters at the
// same offsets. Dictionary forms and parts of speech come from the standard
// text, while what the reader sees and taps stays exactly as written.
// Rewrites are drawn from a curated adjective list plus one guarded negative
// rule, never from a guess, so an unknown word is left alone.

// Common i-adjectives that take the colloquial sound change. Each yields its
// variants: a-/o-row + い → e-row + え/ぇ/ー (すごい → すげえ), u-row + い →
// i-row + い/ぃ/ー (だるい → だりー), わい → ええ (こわい → こええ).
// Only forms that are real colloquial spellings and collide with nothing:
// おもい (おめえ = お前), くろい (くれえ = くらい) and the like are left out.
const ADJECTIVES = [
  'すごい', 'うるさい', 'やばい', 'いたい', 'うざい', 'おそい', 'こわい', 'だるい',
  'ねむい', 'さむい', 'あつい', 'うまい', 'あまい', 'からい', 'せまい', 'ひろい',
  'たかい', 'ながい', 'みじかい', 'よわい', 'ちかい', 'あぶない', 'きたない', 'くさい',
  'めんどくさい', 'めんどうくさい', 'すくない', 'しつこい', 'えらい', 'つらい', 'くらい',
  'わるい', 'かたい', 'でかい', 'ちいさい', 'おもしろい', 'つまらない', 'くだらない',
  'しらない', 'わからない', 'いけない', 'かまわない', 'ずるい'
]

const ROWS: Record<string, { e: string; i: string }> = {}
for (const [a, i, u, e, o] of [
  ['あ', 'い', 'う', 'え', 'お'], ['か', 'き', 'く', 'け', 'こ'], ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
  ['さ', 'し', 'す', 'せ', 'そ'], ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'], ['た', 'ち', 'つ', 'て', 'と'],
  ['だ', 'ぢ', 'づ', 'で', 'ど'], ['な', 'に', 'ぬ', 'ね', 'の'], ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ば', 'び', 'ぶ', 'べ', 'ぼ'], ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'], ['ま', 'み', 'む', 'め', 'も'],
  ['ら', 'り', 'る', 'れ', 'ろ'], ['わ', '', '', 'え', '']
]) {
  for (const k of [a, o]) if (k) ROWS[k] = { e, i: '' }
  if (u) ROWS[u] = { e: '', i }
}

// colloquial → standard, every pair the same length.
function buildRewrites(): Map<string, string> {
  const out = new Map<string, string>()
  const add = (colloquial: string, standard: string): void => {
    if (colloquial.length === standard.length && colloquial !== standard) out.set(colloquial, standard)
  }
  for (const adj of ADJECTIVES) {
    const stem = adj.slice(0, -2)
    const k = adj.at(-2)!
    const row = ROWS[k]
    if (!row) continue
    if (k === 'わ') {
      add(stem + 'ええ', adj)
      continue
    }
    if (row.e) for (const tail of ['え', 'ぇ', 'ー']) add(stem + row.e + tail, adj)
    if (row.i) for (const tail of ['い', 'ぃ', 'ー']) add(stem + row.i + tail, adj)
  }
  // らない → んねえ (つまらない → つまんねえ, わからない → わかんねえ).
  for (const adj of ADJECTIVES.filter((a) => a.endsWith('らない'))) {
    for (const tail of ['え', 'ぇ', 'ー']) add(adj.slice(0, -3) + 'んね' + tail, adj)
  }
  add('ちょー', 'ちょう')
  return out
}

const REWRITES = buildRewrites()
// Longest first, so うるせぇ wins over a shorter key inside it.
const REWRITE_RE = new RegExp(
  [...REWRITES.keys()].sort((a, b) => b.length - a.length).join('|'),
  'g'
)

// The verb negative ねえ/ねぇ/ねー only after a verb's a-row stem or ん
// (知らねー, 行かねえ, 負けらんねえ): ねえ alone is also "hey" and ねえさん
// is 姉さん, which this context excludes.
const NEGATIVE_RE = /([らかさたなまわがばんれ])ね[えぇー]/g

export function normalizeCasualText(text: string): string {
  return text
    .replace(REWRITE_RE, (m) => REWRITES.get(m) ?? m)
    .replace(NEGATIVE_RE, (_m, stem: string) => `${stem}ない`)
}

const toHiragana = (s: string): string =>
  s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
const KANA_ONLY = /^[ぁ-んァ-ヶー]+$/

// Gives tokens of the normalized text back the original characters. Requires
// the tokens to cover the normalized text exactly (kuromoji does); otherwise
// returns null and the caller falls back to tokenizing the original.
export function restoreSurfaces(tokens: JpToken[], normalized: string, original: string): JpToken[] | null {
  if (normalized.length !== original.length) return null
  let at = 0
  const out: JpToken[] = []
  for (const t of tokens) {
    if (normalized.slice(at, at + t.surface.length) !== t.surface) return null
    const surface = original.slice(at, at + t.surface.length)
    at += t.surface.length
    if (surface === t.surface) {
      out.push(t)
      continue
    }
    // A rewritten span: dictionary form and part of speech from the standard
    // text, but the reading must describe what is actually written.
    out.push({
      ...t,
      surface,
      reading: KANA_ONLY.test(surface) ? toHiragana(surface) : t.reading
    })
  }
  return at === normalized.length ? out : null
}
