import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// gachaRepo runs its real SQL against the real init.sql schema.
let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as gachaRepo from '../src/main/repos/gachaRepo'

beforeEach(() => {
  db = createTestDb()
})

describe('gacha units', () => {
  it('creates and lists units, scoped per game', () => {
    const id = gachaRepo.createUnit({
      game: 'hsr',
      kind: 'character',
      name: 'Kafka',
      rarity: 5,
      element: 'Lightning',
      role: 'Nihility'
    })
    expect(id).toBeGreaterThan(0)
    gachaRepo.createUnit({ game: 'fgo', kind: 'servant', name: 'Artoria', rarity: 5 })

    const hsr = gachaRepo.listUnits('hsr')
    expect(hsr).toHaveLength(1)
    expect(hsr[0].name).toBe('Kafka')
    expect(hsr[0].owned).toBe(true) // manual entry defaults to owned
    expect(hsr[0].dupes).toBe(0)
    expect(gachaRepo.listUnits('e7')).toHaveLength(0)
  })

  it('filters by kind, search and ownedOnly', () => {
    gachaRepo.createUnit({ game: 'hsr', kind: 'character', name: 'Kafka' })
    gachaRepo.createUnit({ game: 'hsr', kind: 'lightcone', name: 'Patience Is All You Need' })
    gachaRepo.createUnit({ game: 'hsr', kind: 'character', name: 'Blade', owned: false })

    expect(gachaRepo.listUnits('hsr', { kind: 'character' })).toHaveLength(2)
    expect(gachaRepo.listUnits('hsr', { kind: 'lightcone' })).toHaveLength(1)
    expect(gachaRepo.listUnits('hsr', { search: 'kaf' })).toHaveLength(1)
    expect(gachaRepo.listUnits('hsr', { kind: 'character', ownedOnly: true })).toHaveLength(1)
  })

  it('orders the roster: favorites first, then rarity desc, then name', () => {
    gachaRepo.createUnit({ game: 'e7', kind: 'hero', name: 'Zio', rarity: 5 })
    gachaRepo.createUnit({ game: 'e7', kind: 'hero', name: 'Angelica', rarity: 4 })
    gachaRepo.createUnit({ game: 'e7', kind: 'hero', name: 'Bellona', rarity: 5, favorite: true })
    const names = gachaRepo.listUnits('e7').map((u) => u.name)
    expect(names).toEqual(['Bellona', 'Zio', 'Angelica'])
  })

  it('applies partial updates and round-trips the data JSON', () => {
    const id = gachaRepo.createUnit({ game: 'wuwa', kind: 'resonator', name: 'Jinhsi' })
    gachaRepo.updateUnit(id, { level: 90, dupes: 1, data: { echoSet: 'Celestial Light' } })
    const unit = gachaRepo.getUnit(id)!
    expect(unit.level).toBe(90)
    expect(unit.dupes).toBe(1)
    expect(unit.name).toBe('Jinhsi') // untouched field survives
    expect(unit.data).toEqual({ echoSet: 'Celestial Light' })
    gachaRepo.updateUnit(id, { data: null })
    expect(gachaRepo.getUnit(id)!.data).toBeNull()
  })

  it('tolerates a malformed data blob instead of throwing', () => {
    const id = gachaRepo.createUnit({ game: 'hsr', kind: 'character', name: 'Bronya' })
    db.prepare('UPDATE gacha_unit SET data = ? WHERE id = ?').run('{not json', id)
    expect(gachaRepo.getUnit(id)!.data).toBeNull()
  })

  it('removing a unit cascades its builds (real FK)', () => {
    const id = gachaRepo.createUnit({ game: 'e7', kind: 'hero', name: 'Arbiter Vildred' })
    gachaRepo.createBuild(id, { name: 'Cleave' })
    gachaRepo.removeUnit(id)
    expect(db.prepare('SELECT COUNT(*) AS n FROM gacha_build').get()).toEqual({ n: 0 })
  })
})

describe('gacha builds', () => {
  it('assigns incrementing sort_order and lists builds in order', () => {
    const id = gachaRepo.createUnit({ game: 'hsr', kind: 'character', name: 'Seele' })
    gachaRepo.createBuild(id, { name: 'Crit' })
    gachaRepo.createBuild(id, { name: 'Speed', notes: 'for MoC' })
    const builds = gachaRepo.getUnit(id)!.builds
    expect(builds.map((b) => [b.name, b.sortOrder])).toEqual([
      ['Crit', 0],
      ['Speed', 1]
    ])
  })

  it('updates and removes builds', () => {
    const id = gachaRepo.createUnit({ game: 'wuwa', kind: 'resonator', name: 'Camellya' })
    const buildId = gachaRepo.createBuild(id, { name: 'DPS' })
    gachaRepo.updateBuild(buildId, { notes: 'crit rate first' })
    let builds = gachaRepo.getUnit(id)!.builds
    expect(builds[0].notes).toBe('crit rate first')
    expect(builds[0].name).toBe('DPS')
    gachaRepo.removeBuild(buildId)
    expect(gachaRepo.getUnit(id)!.builds).toHaveLength(0)
  })
})

describe('gacha currencies', () => {
  it('upserts one row per (game, key) keeping the latest amount', () => {
    gachaRepo.setCurrency('hsr', 'jade', 1000)
    gachaRepo.setCurrency('hsr', 'jade', 4500)
    gachaRepo.setCurrency('fgo', 'quartz', 30)
    const hsr = gachaRepo.listCurrencies('hsr')
    expect(hsr).toHaveLength(1)
    expect(hsr[0].amount).toBe(4500)
    expect(gachaRepo.listCurrencies('fgo')[0].amount).toBe(30)
  })
})

describe('gacha banners', () => {
  it('CRUDs banners and orders dated ones first, newest start first', () => {
    gachaRepo.createBanner({ game: 'hsr', name: 'Old', startAt: '2026-01-01', endAt: '2026-01-21' })
    gachaRepo.createBanner({ game: 'hsr', name: 'Current', startAt: '2026-07-01' })
    gachaRepo.createBanner({ game: 'hsr', name: 'Announced (TBA)' })
    gachaRepo.createBanner({ game: 'e7', name: 'Other game' })

    const banners = gachaRepo.listBanners('hsr')
    expect(banners.map((b) => b.name)).toEqual(['Current', 'Old', 'Announced (TBA)'])

    gachaRepo.updateBanner(banners[0].id, { featured: 'Kafka', endAt: '2026-07-22' })
    const updated = gachaRepo.listBanners('hsr')[0]
    expect(updated.featured).toBe('Kafka')
    expect(updated.endAt).toBe('2026-07-22')
    expect(updated.name).toBe('Current')

    gachaRepo.removeBanner(banners[2].id)
    expect(gachaRepo.listBanners('hsr')).toHaveLength(2)
  })
})

describe('gacha news', () => {
  const item = (id: string, title: string) => ({
    externalId: id,
    title,
    url: `https://example.com/${id}`,
    summary: null,
    imageUrl: null,
    publishedAt: `2026-07-0${id}T00:00:00Z`,
    author: 'someone'
  })

  it('replaces the feed, counting only genuinely new posts', () => {
    const first = gachaRepo.replaceNews('hsr', [item('1', 'A'), item('2', 'B')])
    expect(first).toEqual({ added: 2, total: 2 })

    // Next fetch: post 1 fell out of hot, post 2 was edited, post 3 arrived.
    const second = gachaRepo.replaceNews('hsr', [item('2', 'B (edited)'), item('3', 'C')])
    expect(second).toEqual({ added: 1, total: 2 })

    const { items } = gachaRepo.listNews('hsr')
    expect(items.map((n) => n.title)).toEqual(['B (edited)', 'C']) // post 1 pruned
    expect(items[0].author).toBe('someone')
  })

  it('keeps the fetched feed order (hot rank), scoped per game', () => {
    expect(gachaRepo.listNews('hsr').fetchedAt).toBeNull()
    gachaRepo.replaceNews('hsr', [item('1', 'first'), item('2', 'second'), item('3', 'third')])
    gachaRepo.setMeta('hsr', 'news.fetchedAt', '2026-07-09T12:00:00Z')
    const page = gachaRepo.listNews('hsr')
    expect(page.items.map((n) => n.title)).toEqual(['first', 'second', 'third'])
    expect(page.fetchedAt).toBe('2026-07-09T12:00:00Z')

    // Replacing another game's feed must not touch this one.
    gachaRepo.replaceNews('fgo', [item('1', 'fgo post')])
    expect(gachaRepo.listNews('hsr').items).toHaveLength(3)
  })
})

describe('gacha overview', () => {
  it('reports per-game roster size, wallet and live banner count', () => {
    gachaRepo.createUnit({ game: 'hsr', kind: 'character', name: 'Kafka' })
    gachaRepo.createUnit({ game: 'hsr', kind: 'lightcone', name: 'Cone' })
    gachaRepo.createUnit({ game: 'hsr', kind: 'character', name: 'Unowned', owned: false })
    gachaRepo.setCurrency('hsr', 'jade', 4500)
    // Runs forever from 2026 — always active.
    gachaRepo.createBanner({ game: 'hsr', name: 'Live', startAt: '2026-01-01' })
    gachaRepo.createBanner({ game: 'hsr', name: 'Done', startAt: '2026-01-01', endAt: '2026-01-21' })
    gachaRepo.createBanner({ game: 'hsr', name: 'TBA' })

    const overview = gachaRepo.overview()
    // One entry per configured game, even when empty.
    expect(overview.map((o) => o.game)).toEqual(['hsr', 'fgo', 'e7', 'wuwa'])
    const hsr = overview.find((o) => o.game === 'hsr')!
    expect(hsr.unitCount).toBe(2) // unowned rows don't count
    expect(hsr.currencies[0]).toMatchObject({ key: 'jade', amount: 4500 })
    expect(hsr.activeBanners).toBe(1)
    expect(overview.find((o) => o.game === 'e7')).toMatchObject({
      unitCount: 0,
      activeBanners: 0,
      imagePath: null
    })
  })

  it('stores and clears per-game hero art', () => {
    gachaRepo.setGameImage('hsr', 'media/dl-art.jpg')
    expect(gachaRepo.overview().find((o) => o.game === 'hsr')!.imagePath).toBe('media/dl-art.jpg')
    gachaRepo.setGameImage('hsr', 'media/dl-art2.jpg') // overwrite
    expect(gachaRepo.overview().find((o) => o.game === 'hsr')!.imagePath).toBe('media/dl-art2.jpg')
    gachaRepo.setGameImage('hsr', null)
    expect(gachaRepo.overview().find((o) => o.game === 'hsr')!.imagePath).toBeNull()
  })
})
