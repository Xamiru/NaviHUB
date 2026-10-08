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

describe('person edits', () => {
  it('keeps an imported birthday when the person page saves without one', () => {
    const id = peopleRepo.upsert({ name: 'Seiyuu', birthday: '1965-05-23' })
    peopleRepo.upsert({ id, name: 'Seiyuu', bio: 'Edited on the person page' })
    expect(peopleRepo.get(id)?.birthday).toBe('1965-05-23')
  })
})

describe('person credits', () => {
  it('report each voiced role’s place in its cast and the cast size', () => {
    const show = mediaRepo.create({ mediaType: 'anime', title: 'Show' })
    const person = peopleRepo.upsert({ name: 'Voice actor' })
    const characters = ['Lead', 'Rival', 'Extra'].map(
      (name) => db.prepare('INSERT INTO character (name) VALUES (?)').run(name).lastInsertRowid as number
    )
    characters.forEach((id, i) =>
      db.prepare('INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)').run(show, id, i + 1)
    )
    db.prepare('INSERT INTO credit (media_id, person_id, character_id, role) VALUES (?, ?, ?, ?)')
      .run(show, person, characters[2], 'voice_actor')

    const [credit] = peopleRepo.credits(person)
    expect(credit).toMatchObject({ castPosition: 3, castSize: 3 })
  })
})
