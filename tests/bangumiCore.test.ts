import { describe, expect, it } from 'vitest'
import {
  isJapaneseActor,
  parseCharacters,
  parseReading,
  parseReadingWiki,
  parseRelations,
  parseStaff
} from '../src/main/bangumiCore'

// Shapes taken from api.bgm.tv/v0 responses for Persona 5 Royal (subject 278949).
const characters = [
  {
    id: 1,
    name: '雨宮蓮',
    relation: '主角',
    type: 1,
    summary: '中文简介，不应保存',
    images: { large: 'https://lain.bgm.tv/pic/crt/l/ren.jpg', medium: 'https://lain.bgm.tv/pic/crt/m/ren.jpg' },
    actors: [
      { id: 4925, name: '福山潤', type: 1, images: { medium: 'https://lain.bgm.tv/pic/crt/m/fj.jpg' } },
      { id: 30001, name: 'Xander Mobus', type: 1, images: {} }
    ]
  },
  { id: 2, name: 'イゴール', relation: '配角', images: { large: '' }, actors: [] },
  { id: 0, name: 'broken' },
  { id: 3, name: '' }
]

describe('parseCharacters', () => {
  it('keeps names, images, importance and individual actors only', () => {
    const parsed = parseCharacters(characters)
    expect(parsed).toEqual([
      {
        id: 1,
        name: '雨宮蓮',
        imageUrl: 'https://lain.bgm.tv/pic/crt/l/ren.jpg',
        importance: 0,
        actors: [
          { id: 4925, name: '福山潤', imageUrl: 'https://lain.bgm.tv/pic/crt/m/fj.jpg' },
          { id: 30001, name: 'Xander Mobus', imageUrl: null }
        ]
      },
      { id: 2, name: 'イゴール', imageUrl: null, importance: 1, actors: [] }
    ])
    expect(JSON.stringify(parsed)).not.toContain('中文简介')
  })

  it('tolerates a non-array body', () => {
    expect(parseCharacters({ title: 'Not Found' })).toEqual([])
  })
})

describe('isJapaneseActor', () => {
  it('needs a kana reading, so Chinese and English dubs are left out', () => {
    expect(isJapaneseActor('福山潤', { kana: 'ふくやま じゅん', romaji: 'Fukuyama Jun' })).toBe(true)
    expect(isJapaneseActor('あきやまかおる', null)).toBe(true)
    expect(isJapaneseActor('张杰', { kana: null, romaji: 'Zhang Jie' })).toBe(false)
    expect(isJapaneseActor('约翰・史密斯', null)).toBe(false)
    expect(isJapaneseActor('ジョン・スミス', null)).toBe(true)
    expect(isJapaneseActor('福山潤', null)).toBe(false)
    expect(isJapaneseActor('Xander Mobus', null)).toBe(false)
  })
})

describe('parseStaff', () => {
  it('maps known individual roles to English and skips companies and the rest', () => {
    const staff = parseStaff([
      { id: 10, name: '橋野桂', relation: '导演', type: 1, images: {} },
      { id: 11, name: '目黒将司', relation: '音乐', type: 1, images: {} },
      { id: 12, name: 'ATLUS', relation: '开发', type: 2, images: {} },
      { id: 13, name: '副島成記', relation: '人物设定', type: 1, images: {} },
      { id: 14, name: 'Someone', relation: '宣传', type: 1, images: {} },
      { id: 15, name: 'Studio', relation: '导演', type: 2, images: {} }
    ])
    expect(staff.map((s) => [s.personId, s.role, s.roleNote])).toEqual([
      [10, 'director', 'Director'],
      [11, 'composer', 'Music'],
      [13, 'staff', 'Character Design']
    ])
  })
})

describe('parseRelations', () => {
  it('keeps story relations between games only', () => {
    const rel = parseRelations([
      { id: 100, type: 4, name: 'ペルソナ5', relation: '不同版本' },
      { id: 101, type: 4, name: 'ペルソナ5 タクティカ', relation: '角色出演' },
      { id: 102, type: 4, name: '鸣潮', relation: '联动' },
      { id: 103, type: 2, name: 'アニメ', relation: '续集' },
      { id: 104, type: 4, name: 'P5S', relation: '续集' }
    ])
    expect(rel).toEqual([
      { subjectId: 100, relationType: 'ALTERNATIVE', name: 'ペルソナ5' },
      { subjectId: 104, relationType: 'SEQUEL', name: 'P5S' }
    ])
  })
})

describe('readings', () => {
  it('reads kana and romaji from the API infobox', () => {
    expect(
      parseReading([
        { key: '简体中文名', value: '福山润' },
        {
          key: '别名',
          value: [{ v: '山本茂夫' }, { k: '纯假名', v: 'ふくやま じゅん' }, { k: '罗马字', v: 'Fukuyama Jun' }]
        }
      ])
    ).toEqual({ kana: 'ふくやま じゅん', romaji: 'Fukuyama Jun' })
  })

  it('keeps the first of several romaji spellings', () => {
    expect(parseReading([{ key: '别名', value: [{ k: '罗马字', v: 'Yūki Aoi = Yuuki Aoi' }] }]).romaji).toBe('Yūki Aoi')
  })

  it('reads the same from the Archive dump wiki text', () => {
    const wiki = '{{Infobox Person\n|简体中文名= 福山润\n|别名={\n[纯假名|ふくやま じゅん]\n[罗马字|Fukuyama Jun]\n}\n|性别= 男\n}}'
    expect(parseReadingWiki(wiki)).toEqual({ kana: 'ふくやま じゅん', romaji: 'Fukuyama Jun' })
    expect(parseReadingWiki('{{Infobox Person\n|简体中文名= 张杰\n}}')).toEqual({ kana: null, romaji: null })
  })
})
