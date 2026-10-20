import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as companyRepo from '../src/main/repos/companyRepo'
import * as mediaRepo from '../src/main/repos/mediaRepo'
import * as directoryRepo from '../src/main/repos/directoryRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
// The directories run in the quiz pool process and read through sqliteHandle.
vi.mock('../src/main/db/sqliteHandle', () => ({ getSqlite: () => db }))

beforeEach(() => {
  db = createTestDb()
})

function anime(
  title: string,
  fields: { status?: string; score?: number; progress?: number; cover?: string | null } = {}
): number {
  const id = mediaRepo.create({ mediaType: 'anime', title })
  db.prepare('UPDATE media_item SET status=?, score=?, progress=?, cover_path=? WHERE id=?').run(
    fields.status ?? null,
    fields.score ?? null,
    fields.progress ?? 0,
    fields.cover === undefined ? `media/${title}.jpg` : fields.cover,
    id
  )
  return id
}

function link(mediaId: number, companyId: number, role = 'animation_studio'): void {
  db.prepare('INSERT INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)').run(
    mediaId,
    companyId,
    role
  )
}

describe('company directory', () => {
  it('counts works, watched works and mean score per studio for one media type', () => {
    const studio = companyRepo.upsert({ name: 'Studio' })
    const other = companyRepo.upsert({ name: 'Other' })
    const done = anime('Done', { status: 'Completed', score: 8 })
    const started = anime('Started', { progress: 3, score: 6 })
    const planned = anime('Planned', { status: 'Plan to Watch' })
    for (const id of [done, started, planned]) link(id, studio)
    // Two roles on one title count it once.
    link(done, studio, 'production_studio')
    link(planned, other)
    // A publisher or producer is not a studio.
    link(done, companyRepo.upsert({ name: 'Publisher' }), 'publisher')
    link(done, companyRepo.upsert({ name: 'Producer' }), 'producer')
    // A company linked only to another type's titles stays out.
    const game = mediaRepo.create({ mediaType: 'game', title: 'Game' })
    link(game, companyRepo.upsert({ name: 'Developer', type: 'developer' }))

    const entries = directoryRepo.companyDirectory({
      mediaType: 'anime',
      readStatuses: ['Watching', 'Completed']
    })

    expect(entries.map((e) => [e.company.name, e.works, e.readWorks, e.meanScore])).toEqual([
      ['Studio', 3, 2, 7],
      ['Other', 1, 0, null]
    ])
    expect(entries[0].covers.map((c) => [c.title, c.read])).toEqual([
      ['Done', true],
      ['Started', true],
      ['Planned', false]
    ])
  })

  it('shows at most three covers and skips titles without one', () => {
    const studio = companyRepo.upsert({ name: 'Studio' })
    link(anime('No cover', { score: 10, cover: null }), studio)
    for (const [title, score] of [['A', 9], ['B', 8], ['C', 7], ['D', 6]] as const) {
      link(anime(title, { score }), studio)
    }

    const [entry] = directoryRepo.companyDirectory({ mediaType: 'anime', readStatuses: [] })

    expect(entry.works).toBe(5)
    expect(entry.covers.map((c) => [c.title, c.coverPath])).toEqual([
      ['A', 'media/A.jpg'],
      ['B', 'media/B.jpg'],
      ['C', 'media/C.jpg']
    ])
  })
})
