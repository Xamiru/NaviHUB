import { beforeEach, describe, expect, it, vi } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createTestDb } from './helpers'
// @ts-expect-error — plain CJS maintenance script, no type declarations
import * as builder from '../scripts/build-games-catalog2.cjs'

// The games catalog v2: the builder's pure steps (record parsing, collapsing
// per-platform entries into works, unique title matches), the drift guards
// between the builder's copies and the app's, and importWork's two modes —
// authoritative for its own rows, enrichment for RAWG-era and Steam rows.

let db: Database.Database
let catalog: Database.Database | null
let downloaded: string[] = []
let available = new Set<string>()

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/launchboxCatalogDb', () => ({
  getLaunchboxDb: () => catalog,
  closeLaunchboxDb: () => {},
  launchboxCatalogPath: () => ':memory:',
  inspectLaunchboxCatalog: () => ({ workCount: 1, snapshot: null })
}))
vi.mock('../src/main/files', () => ({
  downloadScaledImages: async (urls: string[]) => {
    downloaded.push(...urls)
    return new Map(urls.map((u) => [u, available.has(u) ? `media/${u.split('/').pop()}` : null]))
  }
}))
vi.mock('../src/main/http', () => ({ MAX_API_RESPONSE_BYTES: 1, fetchWithRetry: async () => ({ ok: false }) }))
vi.mock('../src/main/hltb', () => ({ fetchPlaytimes: async () => null, hltbLengthHours: () => null }))
vi.mock('../src/main/progress', () => ({ updateActivity: () => {} }))
const bgmCover = vi.hoisted(() => ({ url: null as string | null, calls: 0 }))
vi.mock('../src/main/bangumi', () => ({
  subjectCover: async () => {
    bgmCover.calls++
    return bgmCover.url
  }
}))

import { LAUNCHBOX_CATALOG_DDL } from '../src/main/launchboxCatalogSchema'
import { platformLabel, titleKey } from '../src/main/launchboxCatalogCore'
import { parseReadingWiki } from '../src/main/bangumiCore'
import { coverOrder, importWork, listTop, search, targetFor } from '../src/main/launchboxCatalog'
import * as links from '../src/main/repos/externalLinkRepo'

const entry = (over: Record<string, unknown>) =>
  builder.entryFrom({ DatabaseID: '1', Name: 'Game', Platform: 'Windows', ...over })

describe('builder: LaunchBox records', () => {
  it('parses a flat record with XML escapes and lists', () => {
    const rec = builder.parseRecord(
      '<Name>Ratchet &amp; Clank</Name><ReleaseDate>2002-11-04T00:00:00-05:00</ReleaseDate>' +
        '<DatabaseID>77</DatabaseID><Platform>Sony Playstation 2</Platform><Genres>Action; Platform</Genres>' +
        '<Developer>Insomniac Games</Developer><Overview>A &lt;great&gt; game</Overview><Publisher />' +
        '<WikipediaURL>https://en.wikipedia.org/wiki/Ratchet_%26_Clank_(2002_video_game)</WikipediaURL>' +
        '<SteamAppId>0x</SteamAppId><CommunityRatingCount>40</CommunityRatingCount>'
    )
    const e = builder.entryFrom(rec)
    expect(e).toMatchObject({
      id: 77,
      name: 'Ratchet & Clank',
      date: '2002-11-04',
      year: 2002,
      genres: ['Action', 'Platform'],
      developers: ['Insomniac Games'],
      publishers: [],
      overview: 'A <great> game',
      wiki: 'ratchet & clank (2002 video game)',
      steam: null,
      ratingCount: 40
    })
  })

  it('streams Game, alternate-name and image records from Metadata.xml', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'lb-'))
    const file = join(dir, 'Metadata.xml')
    writeFileSync(
      file,
      `<?xml version="1.0"?>\n<LaunchBox>\n  <Game>\n    <Name>Okami</Name>\n    <DatabaseID>5</DatabaseID>\n  </Game>\n` +
        `  <GameAlternateName>\n    <AlternateName>大神</AlternateName>\n    <DatabaseID>5</DatabaseID>\n    <Region>Japan</Region>\n  </GameAlternateName>\n` +
        `  <GameImage>\n    <DatabaseID>5</DatabaseID>\n    <FileName>a.jpg</FileName>\n    <Type>Box - Front</Type>\n  </GameImage>\n</LaunchBox>\n`
    )
    const seen: [string, Record<string, string>][] = []
    await builder.readLaunchBox(file, (tag: string, rec: Record<string, string>) => seen.push([tag, rec]))
    expect(seen).toEqual([
      ['Game', { Name: 'Okami', DatabaseID: '5' }],
      ['GameAlternateName', { AlternateName: '大神', DatabaseID: '5', Region: 'Japan' }],
      ['GameImage', { DatabaseID: '5', FileName: 'a.jpg', Type: 'Box - Front' }]
    ])
  })
})

describe('builder: collapsing platform entries into works', () => {
  it('joins ports a year apart and keeps remakes and same-platform re-releases apart', () => {
    const works = builder.collapse([
      entry({ DatabaseID: '10', Name: 'Resident Evil', Platform: 'Sony Playstation', ReleaseDate: '1996-03-22' }),
      entry({ DatabaseID: '11', Name: 'Resident Evil', Platform: 'Sega Saturn', ReleaseDate: '1997-07-25' }),
      entry({ DatabaseID: '12', Name: 'Resident Evil', Platform: 'Nintendo GameCube', ReleaseDate: '2002-03-22' }),
      entry({ DatabaseID: '13', Name: 'RESIDENT EVIL', Platform: 'Sony Playstation', ReleaseDate: '1997-09-30' })
    ])
    const groups = works.map((w: { members: { id: number }[] }) => w.members.map((m) => m.id).sort())
    expect(groups.sort()).toEqual([[10, 11], [12], [13]])
    expect(works.find((w: { id: number }) => w.id === 10)).toMatchObject({
      platforms: ['Sony Playstation', 'Sega Saturn'],
      released: '1996-03-22'
    })
  })

  it('lets one Wikipedia article join years and never joins two articles', () => {
    const wiki = (t: string) => `https://en.wikipedia.org/wiki/${t}`
    const works = builder.collapse([
      entry({ DatabaseID: '20', Name: 'Final Fantasy VII', Platform: 'Sony Playstation', ReleaseDate: '1997-01-31', WikipediaURL: wiki('Final_Fantasy_VII') }),
      entry({ DatabaseID: '21', Name: 'Final Fantasy VII', Platform: 'Sony Playstation 4', ReleaseDate: '2015-12-05', WikipediaURL: wiki('Final_Fantasy_VII') }),
      entry({ DatabaseID: '22', Name: 'Final Fantasy VII', Platform: 'Windows', ReleaseDate: '1998-06-24', WikipediaURL: wiki('Final_Fantasy_VII_Remake') })
    ])
    const groups = works.map((w: { members: { id: number }[] }) => w.members.map((m) => m.id).sort())
    expect(groups.sort()).toEqual([[20, 21], [22]])
  })

  it('ranks Japanese boxes first', () => {
    expect(builder.regionRank('Japan')).toBeLessThan(builder.regionRank('North America'))
    expect(builder.regionRank('North America')).toBeLessThan(builder.regionRank('Europe'))
    expect(builder.regionRank(null)).toBe(4)
    expect(builder.regionRank('Brazil')).toBeNull()
  })
})

describe('builder: exact title matches', () => {
  const w1 = { id: 1, name: 'Persona 5', year: 2016 }
  const w2 = { id: 2, name: 'Twins', year: 2016 }
  const worksByKey = new Map([
    ['persona5', [w1]],
    ['twins', [w2]],
    ['p5', [w1]]
  ])
  const cands = [
    { id: 10, keys: ['persona5'], year: 2016 },
    { id: 11, keys: ['p5'], year: 2017 },
    { id: 12, keys: ['twins'], year: 2016 },
    { id: 13, keys: ['persona5'], year: 2010 }
  ]

  it('lets several candidates share a work when nothing has to choose (RAWG editions)', () => {
    const out = builder.titleMatches(cands, worksByKey)
    expect([...out.keys()].sort()).toEqual([10, 11, 12])
  })

  it('prefers the work titled exactly that over an edition listing it as an alternate name', () => {
    const base = { id: 7, name: 'Grand Theft Auto V', year: 2013 }
    const premium = { id: 8, name: 'Grand Theft Auto V: Premium Edition', year: 2014 }
    const byKey = new Map([['grandtheftautov', [base, premium]]])
    const out = builder.titleMatches([{ id: 3498, keys: ['grandtheftautov'], year: 2013 }], byKey)
    expect([...out.entries()]).toEqual([[3498, base]])
  })

  it('strips RAWG edition and year suffixes for a second key', () => {
    expect(builder.bareTitle('Dark Souls: Prepare To Die Edition')).toBe('Dark Souls')
    expect(builder.bareTitle('Resident Evil 4 (2005)')).toBe('Resident Evil 4')
    expect(builder.bareTitle("The Witcher: Enhanced Edition Director's Cut")).toBe('The Witcher')
    expect(builder.bareTitle('Borderlands Game of the Year Enhanced')).toBe('Borderlands')
    expect(builder.bareTitle('Persona 5')).toBe('Persona 5')
  })

  it('keeps one Bangumi subject per work: same year under its own title, else oldest that year', () => {
    const out = builder.titleMatches(cands, worksByKey, builder.pickBangumi)
    expect([...out.entries()].sort()).toEqual([
      [10, w1],
      [12, w2]
    ])
    expect(builder.pickBangumi(w1, [{ id: 30, keys: ['p5'], year: 2016 }, { id: 20, keys: ['p5'], year: 2016 }])).toMatchObject({ id: 20 })
    expect(builder.pickBangumi(w1, [{ id: 30, keys: ['p5'], year: 2017 }])).toBeNull()
  })

  it('reads Bangumi aliases and skips empty slots', () => {
    const infobox =
      '{{Infobox Game\r\n|中文名= 合金弹头7\r\n|别名={\r\n[Metal Slug 7]\r\n[英文名|]\r\n[日文名|メタルスラッグ7]\r\n}\r\n|平台= NDS\r\n}}'
    expect(builder.bangumiAliases(infobox)).toEqual(['Metal Slug 7', 'メタルスラッグ7'])
  })
})

describe('drift guards', () => {
  it('the builder embeds the app schema verbatim', () => {
    expect(builder.LAUNCHBOX_CATALOG_DDL).toBe(LAUNCHBOX_CATALOG_DDL)
  })

  it('both title keys agree', () => {
    for (const s of ['Persona 5: The Royal', 'Ratchet & Clank', 'ゼルダの伝説 時のオカリナ', 'NieR:Automata', '  ', 'Pokémon Ｘ'])
      expect(builder.titleKey(s)).toBe(titleKey(s))
    expect(titleKey('Persona 5: The Royal')).toBe('persona5theroyal')
  })

  it('both reading parsers agree', () => {
    const wikis = [
      '{{Infobox Crt\r\n|简体中文名= 水树奈奈\r\n|别名={\r\n[英文名|]\r\n[纯假名|みずき なな]\r\n[罗马字|Mizuki Nana]\r\n}\r\n|性别= 女\r\n}}',
      '{{Infobox Crt\r\n|简体中文名= 张杰\r\n}}'
    ]
    for (const w of wikis) expect(builder.readingFromWiki(w)).toEqual(parseReadingWiki(w))
    expect(builder.readingFromWiki(wikis[0])).toEqual({ kana: 'みずき なな', romaji: 'Mizuki Nana' })
  })
})

describe('platform labels', () => {
  it('reads like what a person would type', () => {
    expect(platformLabel('Sony Playstation 4')).toBe('PlayStation 4')
    expect(platformLabel('Microsoft Xbox 360')).toBe('Xbox 360')
    expect(platformLabel('Windows')).toBe('PC')
    expect(platformLabel('Nintendo 64')).toBe('Nintendo 64')
  })
})

// ---------------------------------------------------------------- app side

function seedCatalog(): void {
  catalog = new Database(':memory:')
  catalog.exec(LAUNCHBOX_CATALOG_DDL)
  catalog
    .prepare(
      `INSERT INTO lb_work (id, name, name_ja, released, overview, developers, publishers, genres, platforms, metacritic, popularity)
       VALUES (100, 'The Legend of Zelda: Ocarina of Time', 'ゼルダの伝説 時のオカリナ', '1998-11-21', 'Link awakens.',
               '["Nintendo EAD"]', '["Nintendo"]', '["Action","Adventure"]', '["Nintendo 64","Nintendo GameCube"]', 99, 500)`
    )
    .run()
  const img = catalog.prepare('INSERT INTO lb_image (work_id, kind, region, platform, file, rank) VALUES (100, ?, ?, ?, ?, ?)')
  img.run('box', 'North America', 'Nintendo 64', 'na.jpg', 1000)
  img.run('box', 'Japan', 'Nintendo 64', 'jp.jpg', 0)
  img.run('logo', null, 'Nintendo 64', 'logo.png', 0)
  const x = catalog.prepare('INSERT INTO lb_xref (work_id, source, external_id, method) VALUES (100, ?, ?, ?)')
  x.run('rawg', '25', 'exact')
  x.run('bangumi', '1046', 'wikidata')
  x.run('wikidata', 'Q200828', 'xref')
  catalog.prepare(`INSERT INTO lb_fts (rowid, name, alt) VALUES (100, 'The Legend of Zelda: Ocarina of Time', 'ゼルダの伝説 時のオカリナ')`).run()
}

beforeEach(() => {
  db = createTestDb()
  seedCatalog()
  downloaded = []
  available = new Set([
    'https://images.launchbox-app.com/jp.jpg',
    'https://images.launchbox-app.com/na.jpg'
  ])
})

const tagsOf = (mediaId: number) =>
  db
    .prepare(
      `SELECT t.name, t.category FROM media_tag mt JOIN tag t ON t.id = mt.tag_id WHERE mt.media_id = ? ORDER BY t.category, t.name`
    )
    .all(mediaId)

describe('importWork', () => {
  it('creates a launchbox game with the Japanese box, platforms and links', async () => {
    const s = await importWork(100)
    expect(s.created).toBe(true)
    expect(downloaded[0]).toBe('https://images.launchbox-app.com/jp.jpg')
    const row = db.prepare('SELECT * FROM media_item WHERE id = ?').get(s.mediaId) as Record<string, unknown>
    expect(row).toMatchObject({
      external_source: 'launchbox',
      external_id: '100',
      title: 'The Legend of Zelda: Ocarina of Time',
      title_original: 'ゼルダの伝説 時のオカリナ',
      synopsis: 'Link awakens.',
      cover_path: 'media/jp.jpg',
      release_date: '1998-11-21'
    })
    expect(JSON.parse(row.metadata as string)).toEqual({ metacritic: 99 })
    expect(tagsOf(s.mediaId)).toEqual([
      { name: 'Action', category: 'genre' },
      { name: 'Adventure', category: 'genre' },
      { name: 'Nintendo 64', category: 'platform' },
      { name: 'Nintendo GameCube', category: 'platform' }
    ])
    expect(links.list(s.mediaId).map((l) => [l.source, l.externalId, l.method])).toEqual([
      ['bangumi', '1046', 'wikidata'],
      ['wikidata', 'Q200828', 'xref']
    ])
  })

  it('falls back down the cover order when the Japanese box fails', async () => {
    available.delete('https://images.launchbox-app.com/jp.jpg')
    const s = await importWork(100)
    expect(downloaded).toEqual(['https://images.launchbox-app.com/jp.jpg', 'https://images.launchbox-app.com/na.jpg'])
    expect(db.prepare('SELECT cover_path FROM media_item WHERE id = ?').get(s.mediaId)).toEqual({
      cover_path: 'media/na.jpg'
    })
  })

  it('enriches a RAWG-era row in place and keeps its key, title, date and tracking', async () => {
    const id = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, synopsis, cover_path, release_date, status, score, metadata, external_source, external_id)
           VALUES ('game', 'Zelda OoT', 'RAWG text', 'media/screenshot.jpg', '1998-11-23', 'Completed', 10, '{"metacritic":98}', 'rawg', '25')`
        )
        .run().lastInsertRowid
    )
    db.prepare(`INSERT INTO tag (name, category) VALUES ('Favourite', NULL)`).run()
    db.prepare(`INSERT INTO media_tag (media_id, tag_id) SELECT ?, id FROM tag WHERE name = 'Favourite'`).run(id)
    expect(targetFor(100)?.row.id).toBe(id)

    const s = await importWork(100)
    expect(s).toMatchObject({ mediaId: id, created: false })
    const row = db.prepare('SELECT * FROM media_item WHERE id = ?').get(id) as Record<string, unknown>
    expect(row).toMatchObject({
      external_source: 'rawg',
      external_id: '25',
      title: 'Zelda OoT',
      title_original: 'ゼルダの伝説 時のオカリナ',
      synopsis: 'Link awakens.',
      cover_path: 'media/jp.jpg',
      release_date: '1998-11-23',
      status: 'Completed',
      score: 10
    })
    expect(JSON.parse(row.metadata as string)).toEqual({ metacritic: 98 })
    expect(tagsOf(id)).toEqual([
      { name: 'Favourite', category: null },
      { name: 'Nintendo 64', category: 'platform' },
      { name: 'Nintendo GameCube', category: 'platform' }
    ])
    expect(links.list(id).map((l) => [l.source, l.externalId])).toEqual([
      ['bangumi', '1046'],
      ['launchbox', '100'],
      ['wikidata', 'Q200828']
    ])
    expect(db.prepare(`SELECT COUNT(*) AS n FROM media_item`).get()).toEqual({ n: 1 })
  })

  it('keeps a Steam row its own store text and never overrides a manual link', async () => {
    const id = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, synopsis, external_source, external_id) VALUES ('game', 'Zelda', 'Steam text', 'steam', '9')`
        )
        .run().lastInsertRowid
    )
    links.set(id, 'bangumi', '777', 'manual')
    await importWork(100, { mediaId: id, linkMethod: 'manual' })
    expect(db.prepare('SELECT synopsis FROM media_item WHERE id = ?').get(id)).toEqual({ synopsis: 'Steam text' })
    expect(links.linkedId(id, 'bangumi')).toBe('777')
    expect(links.get(id, 'launchbox')).toMatchObject({ externalId: '100', method: 'manual' })
  })

  it('runs no child write on a partial refresh', async () => {
    const s = await importWork(100)
    db.prepare(`DELETE FROM media_external_link`).run()
    db.prepare(`UPDATE media_item SET cover_path = NULL WHERE id = ?`).run(s.mediaId)
    const tagsBefore = tagsOf(s.mediaId)
    await importWork(100, { only: ['cover'] })
    expect(db.prepare('SELECT cover_path FROM media_item WHERE id = ?').get(s.mediaId)).toEqual({ cover_path: 'media/jp.jpg' })
    expect(tagsOf(s.mediaId)).toEqual(tagsBefore)
    expect(links.list(s.mediaId)).toEqual([])
  })

  it('refuses a partial refresh of a title that is not in the library', async () => {
    await expect(importWork(100, { only: ['cover'] })).rejects.toThrow(/not in the library/)
  })
})

describe('Bangumi cover fallback', () => {
  it('asks Bangumi only when there is no Japanese box, and tries it before the English boxes', async () => {
    catalog!.prepare(`DELETE FROM lb_image WHERE region = 'Japan'`).run()
    bgmCover.url = 'https://lain.bgm.tv/pic/cover/l/oot.jpg'
    bgmCover.calls = 0
    available.add(bgmCover.url)
    const s = await importWork(100)
    expect(bgmCover.calls).toBe(1)
    expect(db.prepare('SELECT cover_path FROM media_item WHERE id = ?').get(s.mediaId)).toEqual({ cover_path: 'media/oot.jpg' })
  })
})

describe('cover order', () => {
  it('puts every Japanese box first, then Bangumi, the rest and Steam', () => {
    const order = coverOrder(
      [
        { url: 'jp1', region: 'Japan', platform: 'A' },
        { url: 'na', region: 'North America', platform: 'A' },
        { url: 'jp2', region: 'Japan', platform: 'B' }
      ],
      'bgm',
      '42'
    )
    expect(order.slice(0, 4)).toEqual(['jp1', 'jp2', 'bgm', 'na'])
    expect(order[4]).toContain('/apps/42/library_600x900_2x.jpg')
  })
})

describe('search and top lists', () => {
  it('finds works by English or Japanese name with the Japanese box', () => {
    const [hit] = search('ocarina')
    expect(hit).toMatchObject({ id: 100, year: 1998, native: 'ゼルダの伝説 時のオカリナ', format: 'Nintendo 64 · Nintendo GameCube' })
    expect(hit.coverUrl).toBe('https://images.launchbox-app.com/jp.jpg')
    expect(search('ゼルダの伝説').map((r) => r.id)).toEqual([100])
  })

  it('lists by Metacritic and skips what keep rejects', () => {
    const params = { source: 'game', sort: 'metacritic', count: 5 } as never
    expect(listTop(params).map((i) => [i.sourceId, i.score])).toEqual([[100, 99]])
    expect(listTop(params, () => false)).toEqual([])
  })
})
