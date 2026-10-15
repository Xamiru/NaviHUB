import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as quoteRepo from '../src/main/repos/quoteRepo'
import { furiganaMarkup, quoteOfTheDay, quoteScale } from '../src/shared/quotes'
import { parseFurigana, stripFurigana } from '../src/shared/japanese/furigana'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

function addMedia(title: string, type = 'anime'): number {
  return Number(
    db.prepare('INSERT INTO media_item (media_type, title) VALUES (?, ?)').run(type, title)
      .lastInsertRowid
  )
}

function addCharacter(name: string): number {
  return Number(db.prepare('INSERT INTO character (name) VALUES (?)').run(name).lastInsertRowid)
}

describe('quoteRepo', () => {
  it('saves a quote with links, snapshots and themes, and reads it back', () => {
    const mediaId = addMedia('Steins;Gate')
    const charId = addCharacter('Okabe Rintarou')
    const id = quoteRepo.save({
      text: 'El Psy Kongroo.',
      mediaId,
      speakerKind: 'character',
      speakerId: charId,
      speakerName: 'ignored when the id resolves',
      locator: 'Episode 1',
      themes: ['Resolve', ' resolve ', 'Time', '']
    })
    const q = quoteRepo.get(id)!
    expect(q).toMatchObject({
      key: `q-${id}`,
      text: 'El Psy Kongroo.',
      mediaId,
      mediaType: 'anime',
      sourceTitle: 'Steins;Gate',
      speakerKind: 'character',
      speakerId: charId,
      speakerName: 'Okabe Rintarou',
      locator: 'Episode 1',
      origin: 'manual',
      favorite: false
    })
    expect(q.themes).toEqual(['Resolve', 'Time'])
  })

  it('keeps the snapshot names after the title and speaker are deleted', () => {
    const mediaId = addMedia('Berserk')
    const charId = addCharacter('Guts')
    const id = quoteRepo.save({ text: 'Struggle.', mediaId, speakerKind: 'character', speakerId: charId })
    db.prepare('DELETE FROM media_item WHERE id = ?').run(mediaId)
    db.prepare('DELETE FROM character WHERE id = ?').run(charId)
    const q = quoteRepo.get(id)!
    expect(q.mediaId).toBeNull()
    expect(q.speakerId).toBeNull()
    expect(q.sourceTitle).toBe('Berserk')
    expect(q.speakerName).toBe('Guts')
    expect(q.speakerKind).toBe('character')
  })

  it('drops links whose ids do not resolve and keeps free-text names', () => {
    const id = quoteRepo.save({
      text: 'Oh, hell yeah.',
      mediaId: 9999,
      speakerKind: 'wrestler',
      speakerId: 9999,
      speakerName: 'Stone Cold',
      sourceTitle: 'Raw, 1998'
    })
    const q = quoteRepo.get(id)!
    expect(q.mediaId).toBeNull()
    expect(q.sourceTitle).toBe('Raw, 1998')
    expect(q.speakerName).toBe('Stone Cold')
    const row = db.prepare('SELECT media_id, wrestler_id FROM quote WHERE id = ?').get(id)
    expect(row).toEqual({ media_id: null, wrestler_id: null })
  })

  it('rejects empty text', () => {
    expect(() => quoteRepo.save({ text: '   ' })).toThrow()
  })

  it('updates in place, replacing themes and keeping the origin', () => {
    const id = quoteRepo.save({ text: 'First', origin: 'video', themes: ['A'] })
    quoteRepo.save({ text: 'Second', themes: ['B', 'C'], favorite: true }, id)
    const q = quoteRepo.get(id)!
    expect(q.text).toBe('Second')
    expect(q.origin).toBe('video')
    expect(q.favorite).toBe(true)
    expect(q.themes).toEqual(['B', 'C'])
  })

  it('filters by title and speaker, and unions VN notebook quotes read-only', () => {
    const vn = addMedia('Umineko', 'visual_novel')
    const other = addMedia('Other')
    const charId = addCharacter('Beatrice')
    quoteRepo.save({ text: 'Without love, it cannot be seen.', mediaId: vn, speakerKind: 'character', speakerId: charId })
    quoteRepo.save({ text: 'Elsewhere', mediaId: other })
    db.prepare(
      `INSERT INTO vn_notebook (media_id, entry_date, category, body) VALUES (?, '2026-10-01', 'quote', 'A notebook line')`
    ).run(vn)
    db.prepare(
      `INSERT INTO vn_notebook (media_id, entry_date, category, body) VALUES (?, '2026-10-01', 'theory', 'Not a quote')`
    ).run(vn)

    const all = quoteRepo.list()
    expect(all.map((q) => q.text).sort()).toEqual(
      ['A notebook line', 'Elsewhere', 'Without love, it cannot be seen.'].sort()
    )
    const notebook = all.find((q) => q.origin === 'vnNotebook')!
    expect(notebook).toMatchObject({ id: null, mediaId: vn, sourceTitle: 'Umineko' })
    expect(notebook.key.startsWith('vn-')).toBe(true)

    expect(quoteRepo.list({ mediaId: vn })).toHaveLength(2)
    const bySpeaker = quoteRepo.list({ characterId: charId })
    expect(bySpeaker.map((q) => q.text)).toEqual(['Without love, it cannot be seen.'])
  })

  it('sorts a dated notebook quote by its day, not below that day\'s saved quotes', () => {
    const vn = addMedia('Umineko', 'visual_novel')
    const older = quoteRepo.save({ text: 'Yesterday' })
    const today = quoteRepo.save({ text: 'This morning' })
    db.prepare(`UPDATE quote SET created_at = '2026-10-14 22:00:00' WHERE id = ?`).run(older)
    db.prepare(`UPDATE quote SET created_at = '2026-10-15 09:00:00' WHERE id = ?`).run(today)
    db.prepare(
      `INSERT INTO vn_notebook (media_id, entry_date, category, body) VALUES (?, '2026-10-15', 'quote', 'Notebook today')`
    ).run(vn)
    expect(quoteRepo.list().map((q) => q.text)).toEqual(['Notebook today', 'This morning', 'Yesterday'])
  })

  it('rejects an unknown speaker kind with a clear message', () => {
    expect(() =>
      quoteRepo.save({ text: 'Hello', speakerKind: 'actor' as never, speakerId: 1 })
    ).toThrow('Unknown quote speaker kind')
  })

  it('removes a quote and its themes, and toggles favorite', () => {
    const id = quoteRepo.save({ text: 'Gone soon', themes: ['X'] })
    quoteRepo.setFavorite(id, true)
    expect(quoteRepo.get(id)!.favorite).toBe(true)
    quoteRepo.remove(id)
    expect(quoteRepo.get(id)).toBeNull()
    expect(db.prepare('SELECT COUNT(*) AS n FROM quote_theme').get()).toEqual({ n: 0 })
  })
})

describe('quote helpers', () => {
  it('builds furigana markup that round-trips to the original text', () => {
    const text = '食べ物は 東京駅で買った。'
    const tokens = [
      { surface: '食べ物', reading: 'たべもの' },
      { surface: 'は', reading: 'は' },
      { surface: '東京', reading: 'とうきょう' },
      { surface: '駅', reading: 'えき' },
      { surface: 'で', reading: 'で' },
      { surface: '買っ', reading: 'かっ' },
      { surface: 'た', reading: 'た' },
      { surface: '。', reading: null }
    ]
    const markup = furiganaMarkup(text, tokens)
    expect(markup).toBe('食[た]べ物[もの]は 東京[とうきょう]駅[えき]で買[か]った。')
    expect(stripFurigana(markup)).toBe(text)
    expect(parseFurigana(markup).filter((s) => s.ruby).map((s) => s.ruby)).toEqual([
      'た',
      'もの',
      'とうきょう',
      'えき',
      'か'
    ])
  })

  it('copies text through when the tokenizer gives nothing', () => {
    expect(furiganaMarkup('漢字', [])).toBe('漢字')
  })

  it('picks the same quote all day regardless of input order', () => {
    const quotes = ['q-1', 'q-2', 'q-3', 'vn-4'].map((key) => ({ key }))
    const a = quoteOfTheDay(quotes, '2026-10-14')
    const b = quoteOfTheDay([...quotes].reverse(), '2026-10-14')
    expect(a?.key).toBe(b?.key)
    expect(quoteOfTheDay([], '2026-10-14')).toBeNull()
    const days = new Set(
      Array.from({ length: 30 }, (_, i) => quoteOfTheDay(quotes, `2026-11-${i + 1}`)!.key)
    )
    expect(days.size).toBeGreaterThan(1)
  })

  it('scales long passages down', () => {
    expect(quoteScale('Struggle.')).toBe('xl')
    expect(quoteScale('x'.repeat(500))).toBe('sm')
  })
})
