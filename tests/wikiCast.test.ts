import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// The franchise-wiki cast on a Yakuza game: it fills what Bangumi lacks
// without duplicating a character, takes the voice actor's Japanese name from
// Wikidata so the anime person is reused, prunes only its own rows on a
// re-read, and stays off a game the user unlinked.

let db: Database.Database
const wiki = vi.hoisted(() => ({
  members: [] as string[],
  pages: {} as Record<string, string>,
  categoryPages: 0,
  wikidataDown: false
}))

const pack = vi.hoisted(() => ({
  wikis: [] as string[],
  cast: null as null | { stem: string; characters: unknown[] },
  wikiRequests: 0
}))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/launchboxCatalog', () => ({
  bakedWikis: () => pack.wikis,
  bakedCharacterNames: () => null,
  bakedWikiCast: () => pack.cast
}))
vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, `media/${(u as string).split('/').pop()}`]))
}))
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 1,
  fetchWithRetry: async (url: string) => {
    const u = new URL(url)
    const p = u.searchParams
    if (u.host.endsWith('fandom.com')) pack.wikiRequests++
    let body: unknown = {}
    if (u.host === 'www.wikidata.org') {
      if (wiki.wikidataDown) return { ok: false, status: 503, json: async () => ({}) }
      body = {
        entities: {
          Q1: { sitelinks: { enwiki: { title: 'Takaya Kuroda' } }, labels: { ja: { value: '黒田崇矢' } } },
          Q2: { sitelinks: { enwiki: { title: 'Masami Iwasaki' } }, labels: { ja: { value: '岩崎征実' } } }
        }
      }
    } else if (p.get('prop') === 'categoryinfo') {
      body = {
        query: {
          pages: p
            .get('titles')!
            .split('|')
            .map((t) => ({ title: t, categoryinfo: { pages: t === 'Category:Yakuza 2 Characters' ? wiki.categoryPages : 0 } }))
        }
      }
    } else if (p.get('list') === 'categorymembers') {
      body = { query: { categorymembers: wiki.members.map((title) => ({ title })) } }
    } else {
      body = {
        query: {
          pages: p
            .get('titles')!
            .split('|')
            .map((title) => ({
              title,
              revisions: [{ slots: { main: { content: wiki.pages[title] ?? '' } } }],
              categories: [{ title: 'Category:Yakuza 2 Characters' }],
              original: { source: `https://static.wikia.nocookie.net/yakuza/${title.replace(/ /g, '_')}.png` }
            }))
        }
      }
    }
    return { ok: true, status: 200, json: async () => body }
  }
}))

import { clearWikiCast, wikiCast, wikiThrottle } from '../src/main/wikiCast'
import * as links from '../src/main/repos/externalLinkRepo'
import { unlinkWiki } from '../src/main/gameLinks'

wikiThrottle.intervalMs = 0

const infobox = (jp: string, voice: string): string => `{{Character Infobox\n| jp = ${jp}\n| voiced_by = ${voice}\n}}`

let game: number
let kiryu: number
let kurodaAnime: number

beforeEach(() => {
  pack.wikis = []
  pack.cast = null
  pack.wikiRequests = 0
  db = createTestDb()
  game = Number(
    db.prepare(`INSERT INTO media_item (media_type, title, external_source, external_id) VALUES ('game', 'Yakuza 2', 'rawg', '18')`).run()
      .lastInsertRowid
  )
  // Bangumi already lists Kiryu (no voice) and Haruka (voiced).
  kiryu = Number(
    db.prepare(`INSERT INTO character (name, name_native, external_source, external_id) VALUES ('Kazuma Kiryu', '桐生一馬', 'bangumi', '1')`).run()
      .lastInsertRowid
  )
  const haruka = Number(
    db.prepare(`INSERT INTO character (name, name_native, external_source, external_id) VALUES ('Haruka', '澤村遥', 'bangumi', '2')`).run()
      .lastInsertRowid
  )
  for (const [i, c] of [kiryu, haruka].entries())
    db.prepare('INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)').run(game, c, i)
  const kugimiya = Number(
    db.prepare(`INSERT INTO person (name, name_native, external_source, external_id) VALUES ('Rie Kugimiya', '釘宮理恵', 'anilist', '5')`).run()
      .lastInsertRowid
  )
  db.prepare(`INSERT INTO credit (media_id, person_id, character_id, role, language, origin) VALUES (?, ?, ?, 'voice_actor', 'Japanese', 'bangumi')`).run(
    game,
    kugimiya,
    haruka
  )
  kurodaAnime = Number(
    db.prepare(`INSERT INTO person (name, name_native, external_source, external_id) VALUES ('Takaya Kuroda', '黒田 崇矢', 'anilist', '9')`).run()
      .lastInsertRowid
  )
  wiki.categoryPages = 3
  wiki.wikidataDown = false
  wiki.members = ['Kazuma Kiryu', 'Haruka Sawamura', 'Ryuji Goda', 'Passerby']
  wiki.pages = {
    'Kazuma Kiryu': infobox('桐生 一馬', '*{{WP|Takaya Kuroda}}'),
    'Haruka Sawamura': infobox('澤村 遥', '{{WP|Rie Kugimiya}}'),
    'Ryuji Goda': infobox('郷田 龍司', '{{WP|Masami Iwasaki}}'),
    Passerby: infobox('通行人', '')
  }
})

const castOf = (id: number) =>
  db
    .prepare(
      `SELECT ch.name AS character, ch.external_source AS src, p.name AS person, c.origin FROM credit c
       JOIN character ch ON ch.id = c.character_id JOIN person p ON p.id = c.person_id
       WHERE c.media_id = ? ORDER BY ch.name`
    )
    .all(id)

describe('wikiCast', () => {
  it('fills the gaps Bangumi left and reuses the anime voice actor', async () => {
    expect(await wikiCast(game)).toEqual({ linked: true, cast: 2 })
    expect(castOf(game)).toEqual([
      { character: 'Haruka Sawamura', src: 'bangumi', person: 'Rie Kugimiya', origin: 'bangumi' },
      { character: 'Kazuma Kiryu', src: 'bangumi', person: 'Takaya Kuroda', origin: 'fandom' },
      { character: 'Ryuji Goda', src: 'fandom', person: 'Masami Iwasaki', origin: 'fandom' }
    ])
    expect(db.prepare(`SELECT person_id FROM credit WHERE character_id = ?`).get(kiryu)).toEqual({ person_id: kurodaAnime })
    expect(db.prepare(`SELECT name_native, external_source FROM person WHERE name = 'Masami Iwasaki'`).get()).toEqual({
      name_native: '岩崎征実',
      external_source: 'fandom'
    })
    expect(db.prepare(`SELECT image_path FROM character WHERE name = 'Ryuji Goda'`).get()).toEqual({
      image_path: 'media/Ryuji_Goda.png'
    })
    expect(links.get(game, 'fandom')).toMatchObject({ externalId: 'yakuza:Yakuza 2', method: 'exact' })
  })

  it('merges with Bangumi characters written in Chinese forms, by romaji or by a shared voice', async () => {
    // Bangumi's Ryuji (乡田龙司) is voiced by the same Masami Iwasaki; its Kaoru
    // (狭山薰) has a romanized name but no voice.
    const iwasaki = Number(
      db.prepare(`INSERT INTO person (name, name_native, external_source, external_id) VALUES ('Masami Iwasaki', '岩崎征実', 'bangumi', '77')`).run()
        .lastInsertRowid
    )
    const ryuji = Number(
      db.prepare(`INSERT INTO character (name, name_native, external_source, external_id) VALUES ('乡田龙司', '乡田龙司', 'bangumi', '3')`).run()
        .lastInsertRowid
    )
    const kaoru = Number(
      db.prepare(`INSERT INTO character (name, name_native, external_source, external_id) VALUES ('Kaoru Sayama', '狭山薰', 'bangumi', '4')`).run()
        .lastInsertRowid
    )
    for (const c of [ryuji, kaoru]) db.prepare('INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, 5)').run(game, c)
    db.prepare(`INSERT INTO credit (media_id, person_id, character_id, role, origin) VALUES (?, ?, ?, 'voice_actor', 'bangumi')`).run(game, iwasaki, ryuji)
    wiki.members = ['Ryuji Goda', 'Kaoru Sayama']
    wiki.pages['Kaoru Sayama'] = infobox('狭山 薫', '* Yu Daiki (Yakuza 2, Yakuza 3)\n* {{WP|Aya Hisakawa}}')

    await wikiCast(game)
    expect(db.prepare(`SELECT COUNT(*) AS n FROM character WHERE external_source = 'fandom'`).get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT name FROM character WHERE id = ?').get(ryuji)).toEqual({ name: 'Ryuji Goda' })
    expect(
      db.prepare(`SELECT p.name FROM credit c JOIN person p ON p.id = c.person_id WHERE c.character_id = ? AND c.media_id = ?`).all(kaoru, game)
    ).toEqual([{ name: 'Yu Daiki' }])
    // Ryuji kept Bangumi's voice; the wiki added none on top.
    expect(db.prepare(`SELECT COUNT(*) AS n FROM credit WHERE character_id = ?`).get(ryuji)).toEqual({ n: 1 })
  })

  it('re-reads authoritatively over its own rows only', async () => {
    await wikiCast(game)
    wiki.members = ['Kazuma Kiryu']
    expect(await wikiCast(game)).toEqual({ linked: true, cast: 1 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM character WHERE external_source = 'fandom'`).get()).toEqual({ n: 0 })
    expect(castOf(game).map((r: { character: string }) => r.character)).toEqual(['Haruka Sawamura', 'Kazuma Kiryu'])
  })

  it('reads a catalog game from the pack and never asks the wiki', async () => {
    links.set(game, 'launchbox', '3921', 'xref')
    pack.wikis = ['yakuza']
    pack.cast = {
      stem: 'Yakuza 2',
      characters: [
        {
          page: 'Ryuji Goda',
          name: 'Ryuji Goda',
          native: '郷田 龍司',
          importance: 1,
          imageUrl: 'https://static.wikia.nocookie.net/yakuza/Ryuji.png',
          voices: [{ name: 'Masami Iwasaki', native: '岩崎征実' }]
        },
        {
          page: 'Kazuma Kiryu',
          name: 'Kazuma Kiryu',
          native: '桐生 一馬',
          importance: 1,
          imageUrl: null,
          voices: [{ name: 'Takaya Kuroda', native: '黒田崇矢' }]
        }
      ]
    }
    expect(await wikiCast(game)).toEqual({ linked: true, cast: 2 })
    expect(pack.wikiRequests).toBe(0)
    expect(castOf(game).map((r: { character: string; person: string }) => [r.character, r.person])).toEqual([
      ['Haruka', 'Rie Kugimiya'],
      ['Kazuma Kiryu', 'Takaya Kuroda'],
      ['Ryuji Goda', 'Masami Iwasaki']
    ])
    expect(links.get(game, 'fandom')).toMatchObject({ externalId: 'yakuza:Yakuza 2' })
  })

  it('treats a pack without this game as having no wiki cast', async () => {
    links.set(game, 'launchbox', '3921', 'xref')
    pack.wikis = ['yakuza']
    expect(await wikiCast(game)).toEqual({ linked: false, cast: 0 })
    expect(pack.wikiRequests).toBe(0)
  })

  it('drops a live-wiki cast once a pack that omits the game is installed', async () => {
    await wikiCast(game)
    expect(links.get(game, 'fandom')).not.toBeNull()
    links.set(game, 'launchbox', '3921', 'xref')
    pack.wikis = ['yakuza']
    expect(await wikiCast(game)).toEqual({ linked: false, cast: 0 })
    expect(links.get(game, 'fandom')).toBeNull()
    expect(castOf(game).map((r: { origin: string }) => r.origin)).toEqual(['bangumi'])
    expect(db.prepare(`SELECT COUNT(*) AS n FROM character WHERE external_source = 'fandom'`).get()).toEqual({ n: 0 })
  })

  it('keeps the name of a hand-made character it matches', async () => {
    const mine = Number(
      db.prepare(`INSERT INTO character (name, name_native) VALUES ('Dragon of Dojima', '郷田龍司')`).run().lastInsertRowid
    )
    db.prepare('INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, 9)').run(game, mine)
    await wikiCast(game)
    expect(db.prepare('SELECT name FROM character WHERE id = ?').get(mine)).toEqual({ name: 'Dragon of Dojima' })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM credit WHERE character_id = ? AND origin = 'fandom'`).get(mine)).toEqual({ n: 1 })
  })

  it('finds the Japanese name behind an underscored Wikipedia link', async () => {
    wiki.pages['Ryuji Goda'] = infobox('郷田 龍司', '{{WP|Masami_Iwasaki}}')
    await wikiCast(game)
    expect(db.prepare(`SELECT name_native FROM person WHERE name = 'Masami Iwasaki'`).get()).toEqual({ name_native: '岩崎征実' })
  })

  it('does nothing when no category matches the game', async () => {
    wiki.categoryPages = 0
    expect(await wikiCast(game)).toEqual({ linked: false, cast: 0 })
    expect(links.get(game, 'fandom')).toBeNull()
  })

  it('stays off a game the user unlinked, and removes what it brought', async () => {
    await wikiCast(game)
    unlinkWiki(game)
    expect(castOf(game).map((r: { origin: string }) => r.origin)).toEqual(['bangumi'])
    expect(await wikiCast(game)).toEqual({ linked: false, cast: 0 })
    clearWikiCast(game)
    expect(castOf(game)).toHaveLength(1)
  })

  it('gives Bangumi characters their own names back when the wiki is unlinked', async () => {
    const ryuji = Number(
      db.prepare(`INSERT INTO character (name, name_native, external_source, external_id) VALUES ('乡田龙司', '乡田龙司', 'bangumi', '3')`).run()
        .lastInsertRowid
    )
    db.prepare('INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, 5)').run(game, ryuji)
    const iwasaki = Number(
      db.prepare(`INSERT INTO person (name, name_native, external_source, external_id) VALUES ('Masami Iwasaki', '岩崎征実', 'bangumi', '77')`).run()
        .lastInsertRowid
    )
    db.prepare(`INSERT INTO credit (media_id, person_id, character_id, role, origin) VALUES (?, ?, ?, 'voice_actor', 'bangumi')`).run(game, iwasaki, ryuji)
    wiki.members = ['Ryuji Goda']
    await wikiCast(game)
    expect(db.prepare('SELECT name FROM character WHERE id = ?').get(ryuji)).toEqual({ name: 'Ryuji Goda' })
    unlinkWiki(game)
    expect(db.prepare('SELECT name FROM character WHERE id = ?').get(ryuji)).toEqual({ name: '乡田龙司' })
  })

  it('fails rather than saving voices without their Japanese names when Wikidata is down', async () => {
    wiki.wikidataDown = true
    await expect(wikiCast(game)).rejects.toThrow(/Wikidata/)
    expect(castOf(game).map((r: { origin: string }) => r.origin)).toEqual(['bangumi'])
  })
})
