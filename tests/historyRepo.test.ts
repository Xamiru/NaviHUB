import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { HistoryUserEntity } from '../src/shared/types'

let db: Database.Database

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as repo from '../src/main/repos/historyRepo'

beforeEach(() => {
  db = createTestDb()
})

describe('History marks and notes', () => {
  it('stamps and clears read state and drops empty rows', () => {
    expect(repo.mark('event:x')).toEqual({ read: null, favorite: false })
    const read = repo.setMark('event:x', 'read', true)
    expect(read.read).toMatch(/^\d{4}-\d{2}-\d{2}/)
    expect(repo.setMark('event:x', 'read', true).read).toBe(read.read)
    expect(repo.setMark('event:x', 'favorite', true)).toEqual({ read: read.read, favorite: true })
    repo.setMark('event:x', 'read', false)
    repo.setMark('event:x', 'favorite', false)
    expect(db.prepare('SELECT COUNT(*) AS n FROM history_mark').get()).toEqual({ n: 0 })
    repo.setMark('event:y', 'favorite', true)
    expect([...repo.marks().keys()]).toEqual(['event:y'])
  })

  it('saves, updates, lists by kind and removes notes', () => {
    expect(repo.saveNote('event:x', '  check the date  ', 'correction')).toMatchObject({ body: 'check the date', kind: 'correction' })
    repo.saveNote('person:y', 'private', 'note')
    expect(repo.notes('correction').map((n) => n.ref)).toEqual(['event:x'])
    expect(repo.notes()).toHaveLength(2)
    expect(repo.saveNote('event:x', '   ', 'note')).toBeNull()
    expect(repo.note('event:x')).toBeNull()
  })
})

describe('History personal links and archive rows', () => {
  function addMedia(id: number): void {
    db.prepare("INSERT INTO media_item (id, media_type, title) VALUES (?, 'movie', 'A film')").run(id)
  }

  it('links titles idempotently and cascades with the title', () => {
    addMedia(5)
    const a = repo.addPersonalLink('event:x', 5, 'set-during')
    expect(repo.addPersonalLink('event:x', 5, 'set-during')).toBe(a)
    repo.addPersonalLink('person:y', 5, 'features-person')
    expect(repo.personalLinksForMedia(5).map((l) => l.ref)).toEqual(['event:x', 'person:y'])
    repo.removePersonalLink(a)
    expect(repo.personalLinks()).toHaveLength(1)
    db.prepare('DELETE FROM media_item WHERE id = 5').run()
    expect(repo.personalLinks()).toEqual([])
  })

  it('records archive files with unique suggestion keys', () => {
    const row = {
      ref: 'event:x',
      kind: 'audio' as const,
      relPath: 'history/event-x/a.mp3',
      title: 'A recording',
      credit: 'An archive',
      license: 'public-domain',
      page: null,
      suggestionKey: 'event:x#a1',
      sha256: 'abc',
      bytes: 10
    }
    const id = repo.addArchive(row)
    expect(() => repo.addArchive(row)).toThrow()
    repo.addArchive({ ...row, suggestionKey: null })
    repo.addArchive({ ...row, suggestionKey: null })
    expect(repo.archiveForRef('event:x')).toHaveLength(3)
    expect(repo.removeArchive(id)).toMatchObject({ id, relPath: 'history/event-x/a.mp3' })
    expect(repo.archiveRow(id)).toBeNull()
  })
})

describe('History personal entities', () => {
  const person = (id: string): HistoryUserEntity => ({
    v: 1,
    kind: 'person',
    id,
    names: [{ text: 'Someone', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    regions: ['iran'],
    roles: ['other'],
    sections: []
  })

  it('stores entities as JSON and skips corrupt rows', () => {
    repo.saveUserEntity(person('my-someone'))
    db.prepare("INSERT INTO history_user_entity (id, kind, json) VALUES ('my-bad', 'person', '{oops')").run()
    expect(repo.userEntities().map((e) => e.id)).toEqual(['my-someone'])
    expect(() => db.prepare("INSERT INTO history_user_entity (id, kind, json) VALUES ('x', 'person', '{}')").run()).toThrow()
    repo.removeUserEntity('my-someone')
    expect(repo.userEntity('my-someone')).toBeNull()
  })

  it('derives unique my- ids from names', () => {
    expect(repo.nextUserId('person', 'Jeanne d’Arc')).toBe('my-jeanne-d-arc')
    repo.saveUserEntity(person('my-jeanne-d-arc'))
    expect(repo.nextUserId('person', 'Jeanne d’Arc')).toBe('my-jeanne-d-arc-2')
    expect(repo.nextUserId('event', 'انقلاب')).toBe('my-event')
  })
})

describe('History renamed content', () => {
  it('moves marks, notes, links, archive rows and personal mentions to the replacement ref', () => {
    const from = 'period:german-empire'
    const to = 'polity:german-empire'
    repo.setMark(from, 'read', true)
    repo.setMark(from, 'favorite', true)
    repo.saveNote(from, 'old note', 'note')
    repo.saveNote(to, 'new note', 'correction')
    db.prepare("INSERT INTO media_item (id, media_type, title) VALUES (1, 'movie', 'X')").run()
    repo.addPersonalLink(from, 1, 'set-during')
    db.prepare(
      "INSERT INTO history_archive (ref, kind, rel_path, title, suggestion_key) VALUES (?, 'image', 'history/x.jpg', 'X', ?)"
    ).run(from, `${from}#a1`)
    repo.saveUserEntity({
      v: 1,
      kind: 'event',
      id: 'my-thing',
      names: [{ text: 'Mine', lang: 'en', role: 'primary' }],
      researched: '2026-10-12',
      type: 'war',
      start: { alts: [{ value: { d: '1900' }, cites: [{ source: 'book-a', loc: { page: '1' } }] }] },
      regions: ['europe'],
      prominence: 3,
      partOf: [{ ref: from }],
      sections: []
    } as HistoryUserEntity)

    expect(repo.followRedirects({ [from]: to })).toBeGreaterThan(0)
    expect(repo.mark(from)).toEqual({ read: null, favorite: false })
    expect(repo.mark(to)).toMatchObject({ favorite: true })
    expect(repo.mark(to).read).toMatch(/^\d{4}/)
    expect(repo.note(from)).toBeNull()
    expect(repo.note(to)).toMatchObject({ body: 'new note\n\nold note', kind: 'correction' })
    expect(repo.personalLinks().map((l) => l.ref)).toEqual([to])
    expect(db.prepare('SELECT ref, suggestion_key AS k FROM history_archive').get()).toEqual({ ref: to, k: `${to}#a1` })
    expect(JSON.stringify(repo.userEntity('my-thing'))).toContain(to)
    // A second launch has nothing left to move.
    expect(repo.followRedirects({ [from]: to })).toBe(0)
  })

  it('merges a link and an archive key that both refs already carry', () => {
    const from = 'period:prussia'
    const to = 'polity:prussia'
    db.prepare("INSERT INTO media_item (id, media_type, title) VALUES (2, 'movie', 'Y')").run()
    repo.addPersonalLink(from, 2, 'set-during')
    repo.addPersonalLink(to, 2, 'set-during')
    const add = db.prepare(
      "INSERT INTO history_archive (ref, kind, rel_path, title, suggestion_key) VALUES (?, 'image', ?, 'X', ?)"
    )
    add.run(from, 'history/a.jpg', `${from}#s1`)
    add.run(to, 'history/b.jpg', `${to}#s1`)

    expect(() => repo.followRedirects({ [from]: to })).not.toThrow()
    expect(repo.personalLinks().filter((l) => l.mediaId === 2).map((l) => l.ref)).toEqual([to])
    const rows = db.prepare('SELECT ref, suggestion_key AS k FROM history_archive ORDER BY id').all()
    expect(rows).toEqual([
      { ref: to, k: `${from}#s1` },
      { ref: to, k: `${to}#s1` }
    ])
    expect(repo.followRedirects({ [from]: to })).toBe(0)
  })
})
