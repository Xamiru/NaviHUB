import type { ConjForm, WordClass } from './conjugate'

// The conjugation dojo's word list and form set, shared by JapaneseKanaPage's
// dojo tab and the arcade's conjugation sprint.

export interface DojoWord {
  kanji: string
  kana: string
  cls: WordClass
  gloss: string
}

// Curated everyday words spanning every godan ending + the irregulars. The
// dojo conjugates the KANA form via @shared/conjugate.
export const DOJO_WORDS: DojoWord[] = [
  { kanji: '飲む', kana: 'のむ', cls: 'v5', gloss: 'to drink' },
  { kanji: '読む', kana: 'よむ', cls: 'v5', gloss: 'to read' },
  { kanji: '書く', kana: 'かく', cls: 'v5', gloss: 'to write' },
  { kanji: '聞く', kana: 'きく', cls: 'v5', gloss: 'to listen' },
  { kanji: '行く', kana: 'いく', cls: 'v5', gloss: 'to go' },
  { kanji: '泳ぐ', kana: 'およぐ', cls: 'v5', gloss: 'to swim' },
  { kanji: '急ぐ', kana: 'いそぐ', cls: 'v5', gloss: 'to hurry' },
  { kanji: '話す', kana: 'はなす', cls: 'v5', gloss: 'to speak' },
  { kanji: '出す', kana: 'だす', cls: 'v5', gloss: 'to take out' },
  { kanji: '待つ', kana: 'まつ', cls: 'v5', gloss: 'to wait' },
  { kanji: '持つ', kana: 'もつ', cls: 'v5', gloss: 'to hold' },
  { kanji: '勝つ', kana: 'かつ', cls: 'v5', gloss: 'to win' },
  { kanji: '死ぬ', kana: 'しぬ', cls: 'v5', gloss: 'to die' },
  { kanji: '遊ぶ', kana: 'あそぶ', cls: 'v5', gloss: 'to play' },
  { kanji: '呼ぶ', kana: 'よぶ', cls: 'v5', gloss: 'to call' },
  { kanji: '飛ぶ', kana: 'とぶ', cls: 'v5', gloss: 'to fly' },
  { kanji: '買う', kana: 'かう', cls: 'v5', gloss: 'to buy' },
  { kanji: '会う', kana: 'あう', cls: 'v5', gloss: 'to meet' },
  { kanji: '使う', kana: 'つかう', cls: 'v5', gloss: 'to use' },
  { kanji: '笑う', kana: 'わらう', cls: 'v5', gloss: 'to laugh' },
  { kanji: '帰る', kana: 'かえる', cls: 'v5', gloss: 'to go home (godan!)' },
  { kanji: '走る', kana: 'はしる', cls: 'v5', gloss: 'to run (godan!)' },
  { kanji: '入る', kana: 'はいる', cls: 'v5', gloss: 'to enter (godan!)' },
  { kanji: '知る', kana: 'しる', cls: 'v5', gloss: 'to know (godan!)' },
  { kanji: '作る', kana: 'つくる', cls: 'v5', gloss: 'to make' },
  { kanji: '取る', kana: 'とる', cls: 'v5', gloss: 'to take' },
  { kanji: '食べる', kana: 'たべる', cls: 'v1', gloss: 'to eat' },
  { kanji: '見る', kana: 'みる', cls: 'v1', gloss: 'to see' },
  { kanji: '起きる', kana: 'おきる', cls: 'v1', gloss: 'to wake up' },
  { kanji: '寝る', kana: 'ねる', cls: 'v1', gloss: 'to sleep' },
  { kanji: '出る', kana: 'でる', cls: 'v1', gloss: 'to exit' },
  { kanji: '着る', kana: 'きる', cls: 'v1', gloss: 'to wear (ichidan!)' },
  { kanji: '教える', kana: 'おしえる', cls: 'v1', gloss: 'to teach' },
  { kanji: '覚える', kana: 'おぼえる', cls: 'v1', gloss: 'to memorize' },
  { kanji: '忘れる', kana: 'わすれる', cls: 'v1', gloss: 'to forget' },
  { kanji: '信じる', kana: 'しんじる', cls: 'v1', gloss: 'to believe' },
  { kanji: 'する', kana: 'する', cls: 'vs', gloss: 'to do' },
  { kanji: '勉強する', kana: 'べんきょうする', cls: 'vs', gloss: 'to study' },
  { kanji: '練習する', kana: 'れんしゅうする', cls: 'vs', gloss: 'to practice' },
  { kanji: '説明する', kana: 'せつめいする', cls: 'vs', gloss: 'to explain' },
  { kanji: '来る', kana: 'くる', cls: 'vk', gloss: 'to come' },
  { kanji: '高い', kana: 'たかい', cls: 'adj-i', gloss: 'tall / expensive' },
  { kanji: '安い', kana: 'やすい', cls: 'adj-i', gloss: 'cheap' },
  { kanji: '強い', kana: 'つよい', cls: 'adj-i', gloss: 'strong' },
  { kanji: '早い', kana: 'はやい', cls: 'adj-i', gloss: 'early / fast' },
  { kanji: '楽しい', kana: 'たのしい', cls: 'adj-i', gloss: 'fun' },
  { kanji: '難しい', kana: 'むずかしい', cls: 'adj-i', gloss: 'difficult' },
  { kanji: 'いい', kana: 'いい', cls: 'adj-i', gloss: 'good (よ- stem!)' },
  { kanji: '悪い', kana: 'わるい', cls: 'adj-i', gloss: 'bad' }
]

export const DOJO_FORMS: ConjForm[] = [
  'masu',
  'negative',
  'past',
  'te',
  'potential',
  'passive',
  'causative',
  'volitional',
  'ba',
  'imperative',
  'tai',
  'adverbial'
]


// Maps a seeded card's `pos` (see japaneseSeed*.ts) onto a conjugation class,
// so the user's own learned verbs/adjectives can join the dojo pool. null =
// not conjugable / unknown.
export function posToWordClass(pos: string | null | undefined, front: string): WordClass | null {
  if (!pos) return null
  const p = pos.toLowerCase()
  if (p.startsWith('verb (u)') || p === 'godan verb' || p === 'v5') return 'v5'
  if (p.startsWith('verb (ru)') || p === 'ichidan verb' || p === 'v1') return 'v1'
  if (p.startsWith('verb (irregular)') || p === 'vs' || p === 'vk') {
    if (front.endsWith('する')) return 'vs'
    if (front.endsWith('来る') || front.endsWith('くる')) return 'vk'
    return null
  }
  if (p.startsWith('i-adjective') || p === 'adj-i') return 'adj-i'
  return null
}
