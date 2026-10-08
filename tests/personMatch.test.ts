import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { beforeEach, describe, expect, it } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { adoptForAniList, romajiAgrees, romajiKey, upsertSharedPerson } from '../src/main/repos/personMatch'

let db: Database.Database
beforeEach(() => {
  db = createTestDb()
})

const add = (name: string, native: string | null, source: string, id: string): number =>
  Number(
    db
      .prepare('INSERT INTO person (name, name_native, external_source, external_id) VALUES (?, ?, ?, ?)')
      .run(name, native, source, id).lastInsertRowid
  )

describe('romaji folding', () => {
  it('ignores name order, macrons and long-vowel spellings', () => {
    expect(romajiKey('Jun Fukuyama')).toBe(romajiKey('Fukuyama Jun'))
    expect(romajiKey('Yūki Kaji')).toBe(romajiKey('Kaji Yuuki'))
    expect(romajiKey('Kaji Yuki')).toBe(romajiKey('Kaji Yuuki'))
    expect(romajiKey('Kouki Uchiyama')).toBe(romajiKey('Uchiyama Kōki'))
    expect(romajiKey('Ohno Yuuko')).toBe(romajiKey('Yūko Ōno'))
    expect(romajiKey('Yūki Aoi Yuuki Aoi')).toBe(romajiKey('Aoi Yuuki'))
  })

  it('only vetoes when both sides are romanized', () => {
    expect(romajiAgrees('福山潤', 'Jun Fukuyama')).toBe(true)
    expect(romajiAgrees(null, 'Jun Fukuyama')).toBe(true)
    expect(romajiAgrees('Kei Fukuyama', 'Jun Fukuyama')).toBe(false)
  })
})

describe('upsertSharedPerson', () => {
  it('reuses a person by kanji, preferring the AniList row', () => {
    add('Jun Fukuyama', '福山 潤', 'vndb', 's1')
    const anilist = add('Jun Fukuyama', '福山潤', 'anilist', '95')
    const id = upsertSharedPerson(db, {
      source: 'bangumi',
      externalId: '4925',
      name: 'Fukuyama Jun',
      nameNative: '福山　潤'
    })
    expect(id).toBe(anilist)
    expect(db.prepare('SELECT COUNT(*) AS n FROM person').get()).toEqual({ n: 2 })
  })

  it('skips a kanji match whose romaji disagrees and creates a new person', () => {
    add('Kei Fukuyama', '福山潤', 'anilist', '1')
    const id = upsertSharedPerson(db, {
      source: 'bangumi',
      externalId: '7',
      name: 'Jun Fukuyama',
      nameNative: '福山潤'
    })
    expect(db.prepare('SELECT external_source FROM person WHERE id=?').get(id)).toEqual({
      external_source: 'bangumi'
    })
  })

  it('never merges by romaji when both rows know different kanji', () => {
    const other = add('Makoto Saito', '斉藤 誠', 'anilist', '2')
    const bare = add('Makoto Saito', null, 'vndb', 's9')
    const id = upsertSharedPerson(db, {
      source: 'bangumi',
      externalId: '8',
      name: 'Makoto Saito',
      nameNative: '斎藤 誠'
    })
    expect(id).not.toBe(other)
    expect(id).toBe(bare)
  })

  it('reuses the same source id and fills a missing photo', () => {
    const first = upsertSharedPerson(db, { source: 'bangumi', externalId: '7', name: null, nameNative: '花江夏樹' })
    const again = upsertSharedPerson(db, {
      source: 'bangumi',
      externalId: '7',
      name: null,
      nameNative: '花江夏樹',
      photoPath: 'media/p.jpg'
    })
    expect(again).toBe(first)
    expect(db.prepare('SELECT name, photo_path FROM person WHERE id=?').get(first)).toEqual({
      name: '花江夏樹',
      photo_path: 'media/p.jpg'
    })
  })

  it('seeks the kanji key through its expression index', () => {
    const plan = db
      .prepare(
        `EXPLAIN QUERY PLAN SELECT id, name FROM person
         WHERE REPLACE(REPLACE(name_native, ' ', ''), char(12288), '') = ?`
      )
      .all('福山潤') as { detail: string }[]
    expect(plan.map((p) => p.detail).join(' ')).toContain('idx_person_native_key')
  })
})

describe('adoptForAniList', () => {
  it('takes over a VN or game person and never an AniList one', () => {
    add('Someone', '同名', 'anilist', '3')
    const game = add('Fukuyama Jun', '福山潤', 'bangumi', '4925')
    expect(adoptForAniList(db, '95', 'Jun Fukuyama', '福山 潤')).toBe(game)
    expect(db.prepare('SELECT external_source, external_id FROM person WHERE id=?').get(game)).toEqual({
      external_source: 'anilist',
      external_id: '95'
    })
    expect(adoptForAniList(db, '96', 'Someone', '同名')).toBeNull()
  })

  it('does not adopt a homonym with a different romaji name', () => {
    add('Fukuyama Kei', '福山潤', 'vndb', 's9')
    expect(adoptForAniList(db, '95', 'Jun Fukuyama', '福山潤')).toBeNull()
  })
})

describe('the headless bulk importer', () => {
  it('ports the AniList adoption with the same sources and folding', () => {
    const read = (rel: string): string => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')
    const app = read('../src/main/repos/personMatch.ts')
    const script = read('../scripts/bulk-import.cjs')
    expect(app).toContain("const ADOPTABLE_SOURCES = ['vndb', 'bangumi']")
    expect(script).toContain("WHERE external_source IN ('vndb', 'bangumi')")
    for (const fold of [".replace(/oh(?=[^aeiou]|$)/g, 'o')", ".replace(/ou/g, 'o')", ".replace(/uu/g, 'u')"]) {
      expect(app).toContain(fold)
      expect(script).toContain(fold)
    }
    expect(script).toContain('const adopted = pmAdoptForAniList(ext, name, nativeName)')
  })
})
