import { describe, expect, it } from 'vitest'
import {
  blankAt,
  chunkTokens,
  contextCandidates,
  eligibleParticles,
  PARTICLE_CONFLICTS,
  particleOptions,
  stripFinalPunct,
  type SgToken
} from '../src/shared/japanese/sentenceGames'
import { BLANK } from '../src/shared/cloze'

// Hand-authored token arrays (kuromoji shapes) — no tokenizer, no DB.
const t = (surface: string, pos: string, posDetail: string | null = null, reading: string | null = null, base = surface): SgToken => ({
  surface,
  base,
  reading,
  pos,
  posDetail
})

const 私は学校に行きます = [
  t('私', '名詞', '代名詞', 'わたし'),
  t('は', '助詞', '係助詞'),
  t('学校', '名詞', '一般', 'がっこう'),
  t('に', '助詞', '格助詞'),
  t('行き', '動詞', '自立', 'いき', '行く'),
  t('ます', '助動詞'),
  t('。', '記号', '句点')
]

const lcg = (seed: number): (() => number) => {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 0x100000000
  }
}

describe('particle fill', () => {
  it('finds eligible particles, skipping the sentence-final one and compound neighbours', () => {
    expect(eligibleParticles(私は学校に行きます)).toEqual([1, 3])
    const 行くの = [t('行く', '動詞', '自立', 'いく'), t('の', '助詞', '終助詞'), t('？', '記号')]
    expect(eligibleParticles(行くの)).toEqual([])
    const には = [t('東京', '名詞', '固有名詞', 'とうきょう'), t('に', '助詞', '格助詞'), t('は', '助詞', '係助詞'), t('ある', '動詞', '自立', 'ある')]
    expect(eligibleParticles(には)).toEqual([])
  })

  it('never blanks a て-form connector or a sentence-final particle (real kuromoji tags these 助詞 too)', () => {
    const 飲んでいる = [
      t('お', '接頭詞', '名詞接続'),
      t('茶', '名詞', '一般', 'ちゃ'),
      t('を', '助詞', '格助詞'),
      t('飲ん', '動詞', '自立', null, '飲む'),
      t('で', '助詞', '接続助詞'), // NOT a case particle — part of 飲んでいる
      t('いる', '動詞', '非自立'),
      t('。', '記号', '句点')
    ]
    expect(eligibleParticles(飲んでいる).map((i) => 飲んでいる[i].surface)).toEqual(['を'])
    const 行くよね = [
      t('行く', '動詞', '自立', 'いく'),
      t('よ', '助詞', '終助詞'),
      t('ね', '助詞', '終助詞')
    ]
    expect(eligibleParticles(行くよね)).toEqual([])
  })

  it('blanks the chosen token and keeps the rest verbatim', () => {
    expect(blankAt(私は学校に行きます, 3)).toEqual({ blanked: `私は学校${BLANK}行きます。`, answer: 'に' })
  })

  it('never offers a conflict partner as a distractor, always four distinct options incl. the answer', () => {
    for (const answer of ['は', 'が', 'を', 'に', 'へ', 'も', 'で'] as const) {
      for (let seed = 1; seed < 40; seed++) {
        const opts = particleOptions(answer, lcg(seed))
        expect(opts).toHaveLength(4)
        expect(new Set(opts).size).toBe(4)
        expect(opts).toContain(answer)
        for (const bad of PARTICLE_CONFLICTS[answer] ?? []) expect(opts, `${answer} vs ${bad}`).not.toContain(bad)
      }
    }
  })
})

describe('scramble chunking', () => {
  it('attaches particles, auxiliaries and punctuation to the previous content word', () => {
    expect(chunkTokens(私は学校に行きます)).toEqual(['私は', '学校に', '行きます。'])
  })

  it('merges noun+noun compounds and 接尾/非自立 tails, keeps a pronoun separate', () => {
    const 東京駅で友達に会った = [
      t('東京', '名詞', '固有名詞'), t('駅', '名詞', '接尾'), t('で', '助詞', '格助詞'),
      t('友達', '名詞', '一般'), t('に', '助詞', '格助詞'),
      t('会っ', '動詞', '自立', null, '会う'), t('た', '助動詞')
    ]
    expect(chunkTokens(東京駅で友達に会った)).toEqual(['東京駅で', '友達に', '会った'])
    const お茶を飲んでいる = [
      t('お', '接頭詞', '名詞接続'), t('茶', '名詞', '一般'), t('を', '助詞', '格助詞'),
      t('飲ん', '動詞', '自立', null, '飲む'), t('で', '助詞', '接続助詞'), t('いる', '動詞', '非自立')
    ]
    expect(chunkTokens(お茶を飲んでいる)).toEqual(['お茶を', '飲んでいる'])
    const 三人の子供 = [t('三', '名詞', '数'), t('人', '名詞', '接尾'), t('の', '助詞', '連体化'), t('子供', '名詞', '一般')]
    expect(chunkTokens(三人の子供)).toEqual(['三人の', '子供'])
    const 私の本 = [t('私', '名詞', '代名詞'), t('の', '助詞', '連体化'), t('本', '名詞', '一般')]
    expect(chunkTokens(私の本)).toEqual(['私の', '本'])
    const 食べ始めた = [t('食べ', '動詞', '自立', null, '食べる'), t('始め', '動詞', '非自立', null, '始める'), t('た', '助動詞')]
    expect(chunkTokens(食べ始めた)).toEqual(['食べ始めた'])
  })

  it('strips sentence-final punctuation from the last chunk', () => {
    expect(stripFinalPunct(['私は', '行きます。'])).toEqual({ chunks: ['私は', '行きます'], punct: '。' })
    expect(stripFinalPunct(['本当', '？'])).toEqual({ chunks: ['本当'], punct: '？' })
    expect(stripFinalPunct(['行く'])).toEqual({ chunks: ['行く'], punct: '' })
  })
})

describe('reading in context', () => {
  it('targets kanji nouns and dictionary-form verbs with readings, skipping numbers, suffixes and conjugated forms', () => {
    const c = contextCandidates(私は学校に行きます)
    expect(c.map((x) => x.surface)).toEqual(['私', '学校'])
    expect(c[1]).toMatchObject({ start: 2, end: 4, reading: 'がっこう' })
    const 三人が食べる = [t('三', '名詞', '数', 'さん'), t('人', '名詞', '接尾', 'にん'), t('が', '助詞'), t('食べる', '動詞', '自立', 'たべる')]
    expect(contextCandidates(三人が食べる).map((x) => x.surface)).toEqual(['食べる'])
    const noReading = [t('漢字', '名詞', '一般', null)]
    expect(contextCandidates(noReading)).toEqual([])
  })
})
