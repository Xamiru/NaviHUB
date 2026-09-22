import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as peopleRepo from '../src/main/repos/peopleRepo'
import * as companyRepo from '../src/main/repos/companyRepo'
import * as mediaRepo from '../src/main/repos/mediaRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

beforeEach(() => {
  db = createTestDb()
})

describe('bounded Home people lists', () => {
  it('applies limits after ranking and preserves unlimited browse calls', () => {
    const first = mediaRepo.create({ mediaType: 'anime', title: 'First' })
    const second = mediaRepo.create({ mediaType: 'anime', title: 'Second' })
    const frequentPerson = peopleRepo.upsert({ name: 'Frequent actor' })
    const otherPerson = peopleRepo.upsert({ name: 'Other actor' })
    const frequentStudio = companyRepo.upsert({ name: 'Frequent studio' })
    const otherStudio = companyRepo.upsert({ name: 'Other studio' })

    for (const mediaId of [first, second]) {
      db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)')
        .run(mediaId, frequentPerson, 'voice_actor')
      db.prepare('INSERT INTO media_company (media_id, company_id) VALUES (?, ?)')
        .run(mediaId, frequentStudio)
    }
    db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)')
      .run(first, otherPerson, 'voice_actor')
    db.prepare('INSERT INTO media_company (media_id, company_id) VALUES (?, ?)')
      .run(first, otherStudio)

    expect(peopleRepo.list(undefined, 'voice_actor', ['anime'], 1).map((p) => p.id))
      .toEqual([frequentPerson])
    expect(companyRepo.list(undefined, 'anime', 1).map((c) => c.id))
      .toEqual([frequentStudio])
    expect(peopleRepo.list(undefined, 'voice_actor', ['anime'])).toHaveLength(2)
    expect(companyRepo.list(undefined, 'anime')).toHaveLength(2)
  })
})
