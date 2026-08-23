import { getSqlite } from '../db/connection'
import { mapCharacter, mapPerson, mapMedia } from './mappers'
import * as listRepo from './listRepo'
import * as tierListRepo from './tierListRepo'
import type { Character, CreditRole, CharacterAppearance } from '@shared/types'

export function list(search?: string): Character[] {
  const db = getSqlite()
  if (search) {
    return db
      .prepare('SELECT * FROM character WHERE name LIKE ? OR name_native LIKE ? ORDER BY name')
      .all(`%${search}%`, `%${search}%`)
      .map(mapCharacter)
  }
  return db.prepare('SELECT * FROM character ORDER BY name').all().map(mapCharacter)
}

export function get(id: number): Character | null {
  const row = getSqlite().prepare('SELECT * FROM character WHERE id = ?').get(id)
  return row ? mapCharacter(row) : null
}


// Where this character appears, grouped by work so a show with multiple voice
// actors for the character (e.g. young/adult) shows up once with both VAs.
export function roles(id: number): CharacterAppearance[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT cr.id AS credit_id, cr.language AS credit_language, m.*,
              p.id AS p_id, p.name AS p_name, p.name_native AS p_name_native,
              p.photo_path AS p_photo_path, p.bio AS p_bio, p.birthday AS p_birthday,
              p.external_source AS p_external_source, p.external_id AS p_external_id
       FROM credit cr
       JOIN media_item m ON m.id = cr.media_id
       JOIN person p ON p.id = cr.person_id
       WHERE cr.character_id = ?
       ORDER BY m.title, cr.id`
    )
    .all(id) as Record<string, unknown>[]

  const byMedia = new Map<number, CharacterAppearance>()
  for (const r of rows) {
    const media = mapMedia(r)
    let entry = byMedia.get(media.id)
    if (!entry) {
      entry = { media, voices: [] }
      byMedia.set(media.id, entry)
    }
    entry.voices.push({
      creditId: r.credit_id as number,
      language: (r.credit_language as string) ?? null,
      person: mapPerson({
        id: r.p_id,
        name: r.p_name,
        name_native: r.p_name_native,
        photo_path: r.p_photo_path,
        bio: r.p_bio,
        birthday: r.p_birthday,
        external_source: r.p_external_source,
        external_id: r.p_external_id
      })
    })
  }
  return [...byMedia.values()]
}

export function upsert(input: Partial<Character> & { name: string }): number {
  const db = getSqlite()
  if (input.id) {
    db.prepare(
      `UPDATE character SET name = ?, name_native = ?, image_path = ?, description = ? WHERE id = ?`
    ).run(
      input.name,
      input.nameNative ?? null,
      input.imagePath ?? null,
      input.description ?? null,
      input.id
    )
    return input.id
  }
  const info = db
    .prepare(
      `INSERT INTO character (name, name_native, image_path, description) VALUES (?, ?, ?, ?)`
    )
    .run(input.name, input.nameNative ?? null, input.imagePath ?? null, input.description ?? null)
  return Number(info.lastInsertRowid)
}

export function remove(id: number): void {
  listRepo.removeEntityFromLists('character', id)
  tierListRepo.removeEntityFromTierLists('character', id)
  getSqlite().prepare('DELETE FROM character WHERE id = ?').run(id)
}
