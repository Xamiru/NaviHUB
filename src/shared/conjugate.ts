// Forward conjugation engine for the Conjugation Dojo drill. Works on the KANA
// form of a word (the drill accepts typed kana or romaji via romaji.ts). The
// word classes mirror JMdict/Yomitan rules tags: v1 ichidan, v5 godan, vs
// する-verb, vk 来る, adj-i い-adjective. Pure and table-driven for tests.

export type WordClass = 'v1' | 'v5' | 'vs' | 'vk' | 'adj-i'

export type ConjForm =
  | 'masu' // polite
  | 'negative' // ない
  | 'past' // た
  | 'te' // て
  | 'potential' // られる/える
  | 'passive' // られる/あれる
  | 'causative' // させる/あせる
  | 'volitional' // よう/おう
  | 'ba' // conditional ば
  | 'imperative' // ろ/え
  | 'tai' // want to
  | 'adverbial' // adjectives only: 〜く

export const FORM_LABELS: Record<ConjForm, string> = {
  masu: 'polite (〜ます)',
  negative: 'negative (〜ない)',
  past: 'past (〜た)',
  te: 'て-form',
  potential: 'potential (can…)',
  passive: 'passive',
  causative: 'causative (make/let…)',
  volitional: 'volitional (let’s…)',
  ba: 'conditional (〜ば)',
  imperative: 'imperative (command)',
  tai: 'want to (〜たい)',
  adverbial: 'adverbial (〜く)'
}

// Which forms make sense per class (the dojo offers these).
export const FORMS_FOR: Record<WordClass, ConjForm[]> = {
  v1: ['masu', 'negative', 'past', 'te', 'potential', 'passive', 'causative', 'volitional', 'ba', 'imperative', 'tai'],
  v5: ['masu', 'negative', 'past', 'te', 'potential', 'passive', 'causative', 'volitional', 'ba', 'imperative', 'tai'],
  vs: ['masu', 'negative', 'past', 'te', 'potential', 'passive', 'causative', 'volitional', 'ba', 'imperative', 'tai'],
  vk: ['masu', 'negative', 'past', 'te', 'potential', 'volitional', 'ba', 'imperative', 'tai'],
  'adj-i': ['negative', 'past', 'te', 'ba', 'adverbial']
}

// Godan ending → [a, i, e, o] row kana.
const GODAN_ROWS: Record<string, [string, string, string, string]> = {
  う: ['わ', 'い', 'え', 'お'],
  く: ['か', 'き', 'け', 'こ'],
  ぐ: ['が', 'ぎ', 'げ', 'ご'],
  す: ['さ', 'し', 'せ', 'そ'],
  つ: ['た', 'ち', 'て', 'と'],
  ぬ: ['な', 'に', 'ね', 'の'],
  ぶ: ['ば', 'び', 'べ', 'ぼ'],
  む: ['ま', 'み', 'め', 'も'],
  る: ['ら', 'り', 'れ', 'ろ']
}

// Godan ending → euphonic [past, te].
const GODAN_EUPHONIC: Record<string, [string, string]> = {
  う: ['った', 'って'],
  つ: ['った', 'って'],
  る: ['った', 'って'],
  く: ['いた', 'いて'],
  ぐ: ['いだ', 'いで'],
  す: ['した', 'して'],
  ぬ: ['んだ', 'んで'],
  ぶ: ['んだ', 'んで'],
  む: ['んだ', 'んで']
}

function godan(kana: string, form: ConjForm): string | null {
  const end = kana.slice(-1)
  const stem = kana.slice(0, -1)
  const rows = GODAN_ROWS[end]
  if (!rows) return null
  const [a, i, e, o] = rows
  // 行く is euphonically irregular: いった/いって (not いいた).
  const isIku = kana === 'いく' || kana.endsWith('いく') || kana.endsWith('ゆく')
  const [pastSuf, teSuf] =
    isIku && (end === 'く') ? ['った', 'って'] : (GODAN_EUPHONIC[end] ?? ['った', 'って'])
  switch (form) {
    case 'masu': return stem + i + 'ます'
    case 'negative': return stem + a + 'ない'
    case 'past': return stem + pastSuf
    case 'te': return stem + teSuf
    case 'potential': return stem + e + 'る'
    case 'passive': return stem + a + 'れる'
    case 'causative': return stem + a + 'せる'
    case 'volitional': return stem + o + 'う'
    case 'ba': return stem + e + 'ば'
    case 'imperative': return stem + e
    case 'tai': return stem + i + 'たい'
    default: return null
  }
}

function ichidan(kana: string, form: ConjForm): string | null {
  const stem = kana.slice(0, -1) // drop る
  switch (form) {
    case 'masu': return stem + 'ます'
    case 'negative': return stem + 'ない'
    case 'past': return stem + 'た'
    case 'te': return stem + 'て'
    case 'potential': return stem + 'られる'
    case 'passive': return stem + 'られる'
    case 'causative': return stem + 'させる'
    case 'volitional': return stem + 'よう'
    case 'ba': return stem + 'れば'
    case 'imperative': return stem + 'ろ'
    case 'tai': return stem + 'たい'
    default: return null
  }
}

// する-verbs: stem = everything before the trailing する.
function suru(kana: string, form: ConjForm): string | null {
  if (!kana.endsWith('する')) return null
  const stem = kana.slice(0, -2)
  switch (form) {
    case 'masu': return stem + 'します'
    case 'negative': return stem + 'しない'
    case 'past': return stem + 'した'
    case 'te': return stem + 'して'
    case 'potential': return stem + 'できる'
    case 'passive': return stem + 'される'
    case 'causative': return stem + 'させる'
    case 'volitional': return stem + 'しよう'
    case 'ba': return stem + 'すれば'
    case 'imperative': return stem + 'しろ'
    case 'tai': return stem + 'したい'
    default: return null
  }
}

// 来る (and compounds like つれてくる).
function kuru(kana: string, form: ConjForm): string | null {
  if (!kana.endsWith('くる')) return null
  const stem = kana.slice(0, -2)
  switch (form) {
    case 'masu': return stem + 'きます'
    case 'negative': return stem + 'こない'
    case 'past': return stem + 'きた'
    case 'te': return stem + 'きて'
    case 'potential': return stem + 'こられる'
    case 'volitional': return stem + 'こよう'
    case 'ba': return stem + 'くれば'
    case 'imperative': return stem + 'こい'
    case 'tai': return stem + 'きたい'
    default: return null
  }
}

function adjI(kana: string, form: ConjForm): string | null {
  if (!kana.endsWith('い')) return null
  // いい conjugates on the よい stem.
  const base = kana === 'いい' ? 'よい' : kana
  const stem = base.slice(0, -1)
  switch (form) {
    case 'negative': return stem + 'くない'
    case 'past': return stem + 'かった'
    case 'te': return stem + 'くて'
    case 'ba': return stem + 'ければ'
    case 'adverbial': return stem + 'く'
    default: return null
  }
}

// Conjugates the kana form of a word; null when the form doesn't apply to the
// class (or the shape doesn't match the class).
export function conjugate(kana: string, cls: WordClass, form: ConjForm): string | null {
  if (!FORMS_FOR[cls].includes(form)) return null
  switch (cls) {
    case 'v5': return godan(kana, form)
    case 'v1': return ichidan(kana, form)
    case 'vs': return suru(kana, form)
    case 'vk': return kuru(kana, form)
    case 'adj-i': return adjI(kana, form)
  }
}
