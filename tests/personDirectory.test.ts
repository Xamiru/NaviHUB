import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as peopleRepo from '../src/main/repos/peopleRepo'
import * as mediaRepo from '../src/main/repos/mediaRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

beforeEach(() => {
  db = createTestDb()
})

function manga(title: string, fields: { status?: string; score?: number; progress?: number } = {}): number {
  const id = mediaRepo.create({ mediaType: 'manga', title })
  db.prepare('UPDATE media_item SET status=?, score=?, progress=? WHERE id=?').run(
    fields.status ?? null,
    fields.score ?? null,
    fields.progress ?? 0,
    id
  )
  return id
}

function credit(mediaId: number, personId: number, role: string): void {
  db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(mediaId, personId, role)
}

describe('person directory', () => {
  it('counts works, read works and mean score per creator for one role and media type', () => {
    const author = peopleRepo.upsert({ name: 'Author' })
    const other = peopleRepo.upsert({ name: 'Other' })
    const read = manga('Read one', { status: 'Completed', score: 8 })
    const started = manga('Started', { progress: 3, score: 6 })
    const planned = manga('Planned', { status: 'Plan to Read' })
    for (const id of [read, started, planned]) credit(id, author, 'mangaka')
    credit(planned, other, 'mangaka')
    // A writer credit on manga and a mangaka-role credit on another type stay out.
    credit(read, other, 'writer')
    const anime = mediaRepo.create({ mediaType: 'anime', title: 'Anime' })
    credit(anime, other, 'mangaka')

    const entries = peopleRepo.directory({
      role: 'mangaka',
      mediaType: 'manga',
      readStatuses: ['Reading', 'Completed']
    })

    expect(entries.map((e) => [e.person.name, e.works, e.readWorks, e.meanScore])).toEqual([
      ['Author', 3, 2, 7],
      ['Other', 1, 0, null]
    ])
    expect(entries[0].covers.map((c) => [c.title, c.read])).toEqual([
      ['Read one', true],
      ['Started', true],
      ['Planned', false]
    ])
  })
})
