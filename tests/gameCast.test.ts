import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { BgmCharacter, BgmReading, BgmRelation, BgmStaff } from '../src/main/bangumiCore'

// Game cast from Bangumi: Japanese voice actors only, shared with anime
// people, names romanized from the games catalog, prunes limited to Bangumi's
// own rows, relations resolved through the catalog and the link table.

let db: Database.Database
const net = vi.hoisted(() => ({
  characters: null as BgmCharacter[] | null,
  staff: [] as BgmStaff[],
  relations: [] as BgmRelation[],
  liveReadings: new Map<number, BgmReading>(),
  liveCalls: 0
}))
const baked = vi.hoisted(() => ({
  readings: new Map<number, BgmReading>(),
  names: new Map<number, { romaji: string | null; english: string | null }>(),
  works: new Map<number, { id: number; name: string }[]>()
}))

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/bangumi', () => ({
  subjectCharacters: async () => net.characters,
  subjectStaff: async () => net.staff,
  subjectRelations: async () => net.relations,
  personReading: async (id: number) => {
    net.liveCalls++
    return net.liveReadings.get(id) ?? { kana: null, romaji: null }
  }
}))
vi.mock('../src/main/launchboxCatalog', () => ({
  bakedReading: (id: number) => baked.readings.get(id) ?? null,
  bakedCharacterNames: (id: number) => baked.names.get(id) ?? null,
  worksForBangumi: (id: number) => baked.works.get(id) ?? []
}))
vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, `media/${(u as string).split('/').pop()}`]))
}))
vi.mock('../src/main/progress', () => ({ updateActivity: () => {} }))

import { enrichGame } from '../src/main/gameCast'
import * as links from '../src/main/repos/externalLinkRepo'
import * as mediaRepo from '../src/main/repos/mediaRepo'

let game: number
let animeVa: number

const ren: BgmCharacter = {
  id: 1,
  name: '雨宮蓮',
  imageUrl: 'https://lain.bgm.tv/ren.jpg',
  importance: 0,
  actors: [
    { id: 4925, name: '福山潤', imageUrl: 'https://lain.bgm.tv/fj.jpg' },
    { id: 9001, name: 'Xander Mobus', imageUrl: null },
    { id: 9002, name: '张杰', imageUrl: null }
  ]
}
const ryuji: BgmCharacter = {
  id: 2,
  name: '坂本竜司',
  imageUrl: null,
  importance: 0,
  actors: [{ id: 4926, name: '宮野真守', imageUrl: null }]
}
const igor: BgmCharacter = { id: 3, name: 'イゴール', imageUrl: null, importance: 1, actors: [] }

beforeEach(() => {
  db = createTestDb()
  game = Number(
    db
      .prepare(`INSERT INTO media_item (media_type, title, external_source, external_id) VALUES ('game', 'Persona 5 Royal', 'steam', '1687950')`)
      .run().lastInsertRowid
  )
  links.set(game, 'bangumi', '278949', 'exact')
  animeVa = Number(
    db
      .prepare(`INSERT INTO person (name, name_native, external_source, external_id) VALUES ('Jun Fukuyama', '福山 潤', 'anilist', '95')`)
      .run().lastInsertRowid
  )
  net.characters = [ren, ryuji, igor]
  net.staff = [
    { personId: 10, name: '橋野桂', imageUrl: null, role: 'director', roleNote: 'Director' },
    { personId: 10, name: '橋野桂', imageUrl: null, role: 'staff', roleNote: 'Producer' },
    { personId: 11, name: '目黒将司', imageUrl: null, role: 'composer', roleNote: 'Music' }
  ]
  net.relations = [{ subjectId: 88868, relationType: 'ALTERNATIVE', name: 'ペルソナ5' }]
  net.liveReadings = new Map([[4926, { kana: 'みやの まもる', romaji: 'Miyano Mamoru' }]])
  net.liveCalls = 0
  baked.readings = new Map([
    [4925, { kana: 'ふくやま じゅん', romaji: 'Fukuyama Jun' }],
    [9002, { kana: null, romaji: 'Zhang Jie' }],
    [10, { kana: 'はしの かつら', romaji: 'Hashino Katsura' }]
  ])
  baked.names = new Map([
    [2, { romaji: 'Sakamoto Ryuuji', english: null }],
    [3, { romaji: null, english: 'Igor' }]
  ])
  baked.works = new Map([[88868, [{ id: 25654, name: 'Persona 5' }]]])
})

const castRows = () =>
  db
    .prepare(
      `SELECT ch.name AS character, p.name AS person, c.language, c.importance FROM credit c
       JOIN character ch ON ch.id = c.character_id JOIN person p ON p.id = c.person_id
       WHERE c.media_id = ? ORDER BY ch.name`
    )
    .all(game)

describe('enrichGame', () => {
  it('writes characters, Japanese voice actors shared with anime, staff and relations', async () => {
    const s = await enrichGame(game)
    expect(s).toEqual({ linked: true, cast: 2, staff: 3, relations: 1 })
    expect(castRows()).toEqual([
      { character: 'Ryuuji Sakamoto', person: 'Mamoru Miyano', language: 'Japanese', importance: 0 },
      { character: '雨宮蓮', person: 'Jun Fukuyama', language: 'Japanese', importance: 0 }
    ])
    // The anime voice actor's row gained the credit; no duplicate person.
    expect(db.prepare(`SELECT person_id FROM credit WHERE media_id = ? AND character_id IS NOT NULL ORDER BY id`).all(game)).toContainEqual({
      person_id: animeVa
    })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM person WHERE name_native LIKE '福山%'`).get()).toEqual({ n: 1 })
    // English and Chinese dubs stay out.
    expect(db.prepare(`SELECT COUNT(*) AS n FROM person WHERE name IN ('Xander Mobus', '张杰')`).get()).toEqual({ n: 0 })
    expect(
      db.prepare(`SELECT name, name_native, image_path FROM character WHERE external_source = 'bangumi' ORDER BY external_id`).all()
    ).toEqual([
      { name: '雨宮蓮', name_native: '雨宮蓮', image_path: 'media/ren.jpg' },
      { name: 'Ryuuji Sakamoto', name_native: '坂本竜司', image_path: null },
      { name: 'Igor', name_native: 'イゴール', image_path: null }
    ])
    expect(
      db.prepare(`SELECT p.name, c.role, c.role_note FROM credit c JOIN person p ON p.id = c.person_id WHERE c.media_id = ? AND c.character_id IS NULL ORDER BY c.role`).all(game)
    ).toEqual([
      { name: '目黒将司', role: 'composer', role_note: 'Music' },
      { name: 'Katsura Hashino', role: 'director', role_note: 'Director' },
      { name: 'Katsura Hashino', role: 'staff', role_note: 'Producer' }
    ])
    expect(net.liveCalls).toBe(1)
    expect(JSON.parse((db.prepare('SELECT metadata FROM media_item WHERE id = ?').get(game) as { metadata: string }).metadata)).toEqual({
      bangumiChecked: true
    })
  })

  it('joins distinct role texts even when one contains the other', async () => {
    net.staff = [
      { personId: 10, name: '橋野桂', imageUrl: null, role: 'director', roleNote: 'Animation Director' },
      { personId: 10, name: '橋野桂', imageUrl: null, role: 'director', roleNote: 'Director' },
      { personId: 10, name: '橋野桂', imageUrl: null, role: 'director', roleNote: 'Director' }
    ]
    await enrichGame(game)
    expect(
      db.prepare(`SELECT role_note FROM credit WHERE media_id = ? AND character_id IS NULL`).all(game)
    ).toEqual([{ role_note: 'Animation Director, Director' }])
  })

  it('resolves a relation to a library game keyed by RAWG through its link', async () => {
    const p5 = Number(
      db.prepare(`INSERT INTO media_item (media_type, title, external_source, external_id) VALUES ('game', 'Persona 5', 'rawg', '49')`).run()
        .lastInsertRowid
    )
    links.set(p5, 'launchbox', '25654', 'exact')
    await enrichGame(game)
    const detail = mediaRepo.get(game)
    expect(detail?.relations).toEqual([expect.objectContaining({ relationType: 'ALTERNATIVE', media: expect.objectContaining({ id: p5 }) })])
  })

  it('re-runs authoritatively over its own rows only', async () => {
    await enrichGame(game)
    // Hand-made additions on the same game.
    const mine = Number(db.prepare(`INSERT INTO character (name) VALUES ('My OC')`).run().lastInsertRowid)
    db.prepare('INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, 99)').run(game, mine)
    const writer = Number(db.prepare(`INSERT INTO person (name) VALUES ('Hand Credit')`).run().lastInsertRowid)
    db.prepare(`INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, 'writer')`).run(game, writer)
    const list = Number(db.prepare(`INSERT INTO list (title, entity_kind) VALUES ('Faves', 'character')`).run().lastInsertRowid)
    const igorId = (db.prepare(`SELECT id FROM character WHERE external_source='bangumi' AND external_id='3'`).get() as { id: number }).id
    db.prepare('INSERT INTO list_item (list_id, entity_id) VALUES (?, ?)').run(list, igorId)

    net.characters = [ren, ryuji]
    net.staff = []
    net.relations = []
    expect(await enrichGame(game)).toMatchObject({ cast: 2, staff: 0, relations: 0 })

    expect(db.prepare(`SELECT COUNT(*) AS n FROM character WHERE external_source='bangumi'`).get()).toEqual({ n: 2 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM list_item').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_character WHERE character_id = ?').get(mine)).toEqual({ n: 1 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM credit WHERE person_id = ?`).get(writer)).toEqual({ n: 1 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM credit WHERE media_id = ? AND origin = 'bangumi'`).get(game)).toEqual({ n: 2 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_relation').get()).toEqual({ n: 0 })
  })

  it('keeps everything when Bangumi no longer serves the subject', async () => {
    await enrichGame(game)
    net.characters = null
    expect(await enrichGame(game)).toEqual({ linked: true, cast: 0, staff: 0, relations: 0 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM credit WHERE origin = 'bangumi'`).get()).toEqual({ n: 5 })
  })

  it('does nothing for an unlinked game and refuses other media', async () => {
    links.unlinkManually(game, 'bangumi')
    expect(await enrichGame(game)).toEqual({ linked: false, cast: 0, staff: 0, relations: 0 })
    const anime = Number(db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('anime', 'X')`).run().lastInsertRowid)
    await expect(enrichGame(anime)).rejects.toThrow(/games only/)
  })
})
