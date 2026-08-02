// Keigo (honorific/humble/polite) transformations. Content-as-code: the
// irregular suppletive table IS the lesson; regular verbs go through the
// productive お＋stem＋になる／する patterns built on @shared/conjugate.
// Textbooks teach these forms in isolation — the drill trains producing them
// on demand, which is what makes choosing them automatic.

import { conjugate, type WordClass } from './conjugate'

export type KeigoRegister = 'honorific' | 'humble' | 'polite'

export const REGISTER_LABELS: Record<KeigoRegister, string> = {
  honorific: '尊敬語 (honorific — raise the other person)',
  humble: '謙譲語 (humble — lower yourself)',
  polite: '丁寧語 (polite — ます form)'
}

export interface KeigoEntry {
  key: string // FROZEN
  plain: string
  plainKana: string
  cls: WordClass
  gloss: string
  honorific: string[] // kanji/mixed forms, [] when the register doesn't exist
  honorificKana: string[]
  humble: string[]
  humbleKana: string[]
}

// The canonical suppletive table. Forms are dictionary-form (いらっしゃる, not
// いらっしゃいます) — the polite register is generated, not stored.
export const KEIGO_IRREGULAR: KeigoEntry[] = [
  {
    key: 'iru', plain: 'いる', plainKana: 'いる', cls: 'v1', gloss: 'to be (animate)',
    honorific: ['いらっしゃる'], honorificKana: ['いらっしゃる'],
    humble: ['おる'], humbleKana: ['おる']
  },
  {
    key: 'iku', plain: '行く', plainKana: 'いく', cls: 'v5', gloss: 'to go',
    honorific: ['いらっしゃる', 'おいでになる'], honorificKana: ['いらっしゃる', 'おいでになる'],
    humble: ['参る', '伺う'], humbleKana: ['まいる', 'うかがう']
  },
  {
    key: 'kuru', plain: '来る', plainKana: 'くる', cls: 'vk', gloss: 'to come',
    honorific: ['いらっしゃる', 'おいでになる', 'お越しになる'],
    honorificKana: ['いらっしゃる', 'おいでになる', 'おこしになる'],
    humble: ['参る'], humbleKana: ['まいる']
  },
  {
    key: 'taberu', plain: '食べる', plainKana: 'たべる', cls: 'v1', gloss: 'to eat',
    honorific: ['召し上がる'], honorificKana: ['めしあがる'],
    humble: ['いただく'], humbleKana: ['いただく']
  },
  {
    key: 'nomu', plain: '飲む', plainKana: 'のむ', cls: 'v5', gloss: 'to drink',
    honorific: ['召し上がる'], honorificKana: ['めしあがる'],
    humble: ['いただく'], humbleKana: ['いただく']
  },
  {
    key: 'suru', plain: 'する', plainKana: 'する', cls: 'vs', gloss: 'to do',
    honorific: ['なさる'], honorificKana: ['なさる'],
    humble: ['いたす'], humbleKana: ['いたす']
  },
  {
    key: 'iu', plain: '言う', plainKana: 'いう', cls: 'v5', gloss: 'to say',
    honorific: ['おっしゃる'], honorificKana: ['おっしゃる'],
    humble: ['申す', '申し上げる'], humbleKana: ['もうす', 'もうしあげる']
  },
  {
    key: 'miru', plain: '見る', plainKana: 'みる', cls: 'v1', gloss: 'to see',
    honorific: ['ご覧になる'], honorificKana: ['ごらんになる'],
    humble: ['拝見する'], humbleKana: ['はいけんする']
  },
  {
    key: 'kiku', plain: '聞く', plainKana: 'きく', cls: 'v5', gloss: 'to ask / hear',
    honorific: [], honorificKana: [],
    humble: ['伺う', '拝聴する'], humbleKana: ['うかがう', 'はいちょうする']
  },
  {
    key: 'shiru', plain: '知る', plainKana: 'しる', cls: 'v5', gloss: 'to know',
    honorific: ['ご存知だ'], honorificKana: ['ごぞんじだ'],
    humble: ['存じる', '存じ上げる'], humbleKana: ['ぞんじる', 'ぞんじあげる']
  },
  {
    key: 'ageru', plain: 'あげる', plainKana: 'あげる', cls: 'v1', gloss: 'to give (outward)',
    honorific: [], honorificKana: [],
    humble: ['差し上げる'], humbleKana: ['さしあげる']
  },
  {
    key: 'morau', plain: 'もらう', plainKana: 'もらう', cls: 'v5', gloss: 'to receive',
    honorific: [], honorificKana: [],
    humble: ['いただく', '頂戴する'], humbleKana: ['いただく', 'ちょうだいする']
  },
  {
    key: 'kureru', plain: 'くれる', plainKana: 'くれる', cls: 'v1', gloss: 'to give (to me)',
    honorific: ['くださる'], honorificKana: ['くださる'],
    humble: [], humbleKana: []
  },
  {
    key: 'au', plain: '会う', plainKana: 'あう', cls: 'v5', gloss: 'to meet',
    honorific: [], honorificKana: [],
    humble: ['お目にかかる'], humbleKana: ['おめにかかる']
  },
  {
    key: 'omou', plain: '思う', plainKana: 'おもう', cls: 'v5', gloss: 'to think',
    honorific: [], honorificKana: [],
    humble: ['存じる'], humbleKana: ['ぞんじる']
  },
  {
    key: 'wakaru', plain: '分かる', plainKana: 'わかる', cls: 'v5', gloss: 'to understand',
    honorific: [], honorificKana: [],
    humble: ['承知する', 'かしこまる'], humbleKana: ['しょうちする', 'かしこまる']
  },
  {
    key: 'neru', plain: '寝る', plainKana: 'ねる', cls: 'v1', gloss: 'to sleep',
    honorific: ['お休みになる'], honorificKana: ['おやすみになる'],
    humble: [], humbleKana: []
  },
  {
    key: 'kiru-wear', plain: '着る', plainKana: 'きる', cls: 'v1', gloss: 'to wear',
    honorific: ['お召しになる'], honorificKana: ['おめしになる'],
    humble: [], humbleKana: []
  }
]

// Everyday verbs safe for the REGULAR お〜になる／お〜する patterns. Excludes
// the suppletive verbs above (using the regular pattern on 見る is wrong) and
// one-mora-stem ichidan verbs where the pattern is unnatural.
export interface KeigoVerb {
  kanji: string
  kana: string
  cls: WordClass
  gloss: string
}

export const KEIGO_REGULAR_VERBS: KeigoVerb[] = [
  { kanji: '書く', kana: 'かく', cls: 'v5', gloss: 'to write' },
  { kanji: '読む', kana: 'よむ', cls: 'v5', gloss: 'to read' },
  { kanji: '待つ', kana: 'まつ', cls: 'v5', gloss: 'to wait' },
  { kanji: '話す', kana: 'はなす', cls: 'v5', gloss: 'to speak' },
  { kanji: '使う', kana: 'つかう', cls: 'v5', gloss: 'to use' },
  { kanji: '買う', kana: 'かう', cls: 'v5', gloss: 'to buy' },
  { kanji: '帰る', kana: 'かえる', cls: 'v5', gloss: 'to go home' },
  { kanji: '入る', kana: 'はいる', cls: 'v5', gloss: 'to enter' },
  { kanji: '座る', kana: 'すわる', cls: 'v5', gloss: 'to sit' },
  { kanji: '持つ', kana: 'もつ', cls: 'v5', gloss: 'to hold' },
  { kanji: '取る', kana: 'とる', cls: 'v5', gloss: 'to take' },
  { kanji: '送る', kana: 'おくる', cls: 'v5', gloss: 'to send' },
  { kanji: '作る', kana: 'つくる', cls: 'v5', gloss: 'to make' },
  { kanji: '選ぶ', kana: 'えらぶ', cls: 'v5', gloss: 'to choose' },
  { kanji: '呼ぶ', kana: 'よぶ', cls: 'v5', gloss: 'to call' },
  { kanji: '休む', kana: 'やすむ', cls: 'v5', gloss: 'to rest' },
  { kanji: '渡す', kana: 'わたす', cls: 'v5', gloss: 'to hand over' },
  { kanji: '返す', kana: 'かえす', cls: 'v5', gloss: 'to return (a thing)' },
  { kanji: '調べる', kana: 'しらべる', cls: 'v1', gloss: 'to look into' },
  { kanji: '伝える', kana: 'つたえる', cls: 'v1', gloss: 'to convey' },
  { kanji: '教える', kana: 'おしえる', cls: 'v1', gloss: 'to teach' },
  { kanji: '答える', kana: 'こたえる', cls: 'v1', gloss: 'to answer' },
  { kanji: '届ける', kana: 'とどける', cls: 'v1', gloss: 'to deliver' },
  { kanji: '見せる', kana: 'みせる', cls: 'v1', gloss: 'to show' },
  { kanji: '決める', kana: 'きめる', cls: 'v1', gloss: 'to decide' },
  { kanji: '始める', kana: 'はじめる', cls: 'v1', gloss: 'to begin' },
  { kanji: '受ける', kana: 'うける', cls: 'v1', gloss: 'to receive / take' },
  { kanji: '掛ける', kana: 'かける', cls: 'v1', gloss: 'to hang / call' },
  { kanji: '確かめる', kana: 'たしかめる', cls: 'v1', gloss: 'to confirm' },
  { kanji: '集める', kana: 'あつめる', cls: 'v1', gloss: 'to collect' },
  { kanji: '泳ぐ', kana: 'およぐ', cls: 'v5', gloss: 'to swim' },
  { kanji: '急ぐ', kana: 'いそぐ', cls: 'v5', gloss: 'to hurry' },
  { kanji: '死ぬ', kana: 'しぬ', cls: 'v5', gloss: 'to die' },
  { kanji: '遊ぶ', kana: 'あそぶ', cls: 'v5', gloss: 'to play' },
  { kanji: '立つ', kana: 'たつ', cls: 'v5', gloss: 'to stand' },
  { kanji: '飾る', kana: 'かざる', cls: 'v5', gloss: 'to decorate' },
  { kanji: '並べる', kana: 'ならべる', cls: 'v1', gloss: 'to line up' },
  { kanji: '預ける', kana: 'あずける', cls: 'v1', gloss: 'to entrust' },
  { kanji: '数える', kana: 'かぞえる', cls: 'v1', gloss: 'to count' },
  { kanji: '晴れる', kana: 'はれる', cls: 'v1', gloss: 'to clear up' }
]

// masu-stem of a kana verb: conjugate exposes only full forms, so slice ます.
export function masuStem(kana: string, cls: WordClass): string | null {
  const masu = conjugate(kana, cls, 'masu')
  return masu ? masu.slice(0, -2) : null
}

// Regular pattern generators. Return null when the stem can't be derived.
export function honorificRegular(kana: string, cls: WordClass): string | null {
  const stem = masuStem(kana, cls)
  return stem ? `お${stem}になる` : null
}
export function humbleRegular(kana: string, cls: WordClass): string | null {
  const stem = masuStem(kana, cls)
  return stem ? `お${stem}する` : null
}
export function politeRegular(kana: string, cls: WordClass): string | null {
  return conjugate(kana, cls, 'masu')
}

export interface KeigoAnswers {
  accepted: string[] // every accepted written form (kanji + kana)
  kanaForms: string[] // the kana subset, for readingMatches
  display: string // canonical form shown on reveal
}

// Accepted answers for an irregular entry in one register.
export function keigoAnswersIrregular(
  entry: KeigoEntry,
  register: KeigoRegister
): KeigoAnswers | null {
  if (register === 'polite') {
    const polite = politeRegular(entry.plainKana, entry.cls)
    if (!polite) return null
    // 分かる → 分かります: kanji form = kanji stem + polite tail.
    const kanjiPolite = kanjiForm(entry.plain, entry.plainKana, polite)
    return {
      accepted: dedupe([kanjiPolite, polite]),
      kanaForms: [polite],
      display: kanjiPolite
    }
  }
  const forms = register === 'honorific' ? entry.honorific : entry.humble
  const kana = register === 'honorific' ? entry.honorificKana : entry.humbleKana
  if (forms.length === 0) return null
  return { accepted: dedupe([...forms, ...kana]), kanaForms: kana, display: forms[0] }
}

// Accepted answers for a regular verb in one register.
export function keigoAnswersRegular(
  verb: KeigoVerb,
  register: KeigoRegister
): KeigoAnswers | null {
  const gen =
    register === 'honorific'
      ? honorificRegular
      : register === 'humble'
        ? humbleRegular
        : politeRegular
  const kanaAnswer = gen(verb.kana, verb.cls)
  if (!kanaAnswer) return null
  const kanjiAnswer = kanjiForm(verb.kanji, verb.kana, kanaAnswer, register !== 'polite')
  return {
    accepted: dedupe([kanjiAnswer, kanaAnswer]),
    kanaForms: [kanaAnswer],
    display: kanjiAnswer
  }
}

// Rebuild a kanji-bearing form from the kana answer: the kana answer contains
// the verb's kana somewhere (お + stem…); swap the kana stem for the kanji
// stem. `prefixed` = the answer starts with お + stem (regular keigo patterns).
function kanjiForm(kanji: string, kana: string, kanaAnswer: string, prefixed = false): string {
  // Trailing kana of the kanji form = okurigana; the rest is the kanji stem.
  let okurigana = 0
  for (let i = kanji.length - 1; i >= 0; i--) {
    const c = kanji.codePointAt(i)!
    if ((c >= 0x3041 && c <= 0x309f) || c === 0x30fc) okurigana++
    else break
  }
  const kanjiPart = kanji.slice(0, kanji.length - okurigana)
  if (kanjiPart.length === 0) return kanaAnswer
  const kanaStem = kana.slice(0, kana.length - okurigana)
  if (prefixed) {
    // お + kanaStem + tail → お + kanjiPart + tail
    if (kanaAnswer.startsWith(`お${kanaStem}`)) {
      return `お${kanjiPart}${kanaAnswer.slice(1 + kanaStem.length)}`
    }
    return kanaAnswer
  }
  if (kanaAnswer.startsWith(kanaStem)) {
    return kanjiPart + kanaAnswer.slice(kanaStem.length)
  }
  return kanaAnswer
}

function dedupe(xs: string[]): string[] {
  return [...new Set(xs)]
}
