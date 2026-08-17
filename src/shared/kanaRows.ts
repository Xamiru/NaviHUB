import { toKatakana } from './kana'

// The kana drill's row tables (DJT-style), shared by JapaneseKanaPage's kana
// tab and the arcade's kana race.

export interface KanaRow {
  key: string
  label: string
  kana: string[]
}

export const HIRA_ROWS: KanaRow[] = [
  { key: 'a', label: 'あいうえお', kana: ['あ', 'い', 'う', 'え', 'お'] },
  { key: 'ka', label: 'かきくけこ', kana: ['か', 'き', 'く', 'け', 'こ'] },
  { key: 'sa', label: 'さしすせそ', kana: ['さ', 'し', 'す', 'せ', 'そ'] },
  { key: 'ta', label: 'たちつてと', kana: ['た', 'ち', 'つ', 'て', 'と'] },
  { key: 'na', label: 'なにぬねの', kana: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { key: 'ha', label: 'はひふへほ', kana: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { key: 'ma', label: 'まみむめも', kana: ['ま', 'み', 'む', 'め', 'も'] },
  { key: 'ya', label: 'やゆよ', kana: ['や', 'ゆ', 'よ'] },
  { key: 'ra', label: 'らりるれろ', kana: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { key: 'wa', label: 'わをん', kana: ['わ', 'を', 'ん'] },
  { key: 'ga', label: 'がぎぐげご', kana: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  { key: 'za', label: 'ざじずぜぞ', kana: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  { key: 'da', label: 'だぢづでど', kana: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
  { key: 'ba', label: 'ばびぶべぼ', kana: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  { key: 'pa', label: 'ぱぴぷぺぽ', kana: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] }
]

export const HIRA_COMBOS: KanaRow[] = [
  { key: 'kya', label: 'きゃ きゅ きょ', kana: ['きゃ', 'きゅ', 'きょ'] },
  { key: 'sha', label: 'しゃ しゅ しょ', kana: ['しゃ', 'しゅ', 'しょ'] },
  { key: 'cha', label: 'ちゃ ちゅ ちょ', kana: ['ちゃ', 'ちゅ', 'ちょ'] },
  { key: 'nya', label: 'にゃ にゅ にょ', kana: ['にゃ', 'にゅ', 'にょ'] },
  { key: 'hya', label: 'ひゃ ひゅ ひょ', kana: ['ひゃ', 'ひゅ', 'ひょ'] },
  { key: 'mya', label: 'みゃ みゅ みょ', kana: ['みゃ', 'みゅ', 'みょ'] },
  { key: 'rya', label: 'りゃ りゅ りょ', kana: ['りゃ', 'りゅ', 'りょ'] },
  { key: 'gya', label: 'ぎゃ ぎゅ ぎょ', kana: ['ぎゃ', 'ぎゅ', 'ぎょ'] },
  { key: 'ja', label: 'じゃ じゅ じょ', kana: ['じゃ', 'じゅ', 'じょ'] },
  { key: 'bya', label: 'びゃ びゅ びょ', kana: ['びゃ', 'びゅ', 'びょ'] },
  { key: 'pya', label: 'ぴゃ ぴゅ ぴょ', kana: ['ぴゃ', 'ぴゅ', 'ぴょ'] }
]

const kataRow = (r: KanaRow): KanaRow => ({
  key: `k-${r.key}`,
  label: toKatakana(r.label),
  kana: r.kana.map(toKatakana)
})
export const KATA_ROWS = HIRA_ROWS.map(kataRow)
export const KATA_COMBOS = HIRA_COMBOS.map(kataRow)

export const SECTIONS: { title: string; rows: KanaRow[] }[] = [
  { title: 'Hiragana', rows: HIRA_ROWS },
  { title: 'Hiragana combinations', rows: HIRA_COMBOS },
  { title: 'Katakana', rows: KATA_ROWS },
  { title: 'Katakana combinations', rows: KATA_COMBOS }
]
