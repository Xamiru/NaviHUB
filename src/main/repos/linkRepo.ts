import { getSqlite } from '../db/connection'
import type { CreditRole } from '@shared/types'

// credit: person <-> media (optionally via character)
export function addCredit(input: {
  mediaId: number
  personId: number
  characterId?: number | null
  role: CreditRole
  language?: string | null
}): number {
  const db = getSqlite()
  const tx = db.transaction(() => {
    const info = db
      .prepare(
        `INSERT INTO credit (media_id, person_id, character_id, role, language)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(
        input.mediaId,
        input.personId,
        input.characterId ?? null,
        input.role,
        input.language ?? null
      )
    // Keep media_character in sync so characters show on the work even
    // without going through a credit query.
    if (input.characterId) {
      db.prepare(
        'INSERT OR IGNORE INTO media_character (media_id, character_id) VALUES (?, ?)'
      ).run(input.mediaId, input.characterId)
    }
    return Number(info.lastInsertRowid)
  })
  return tx()
}

export function removeCredit(creditId: number): void {
  getSqlite().prepare('DELETE FROM credit WHERE id = ?').run(creditId)
}

// Removes a character from a work entirely: its voice-actor credits here and
// the media_character link (used by the character cards' × button).
export function removeMediaCharacter(mediaId: number, characterId: number): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    db.prepare('DELETE FROM credit WHERE media_id = ? AND character_id = ?').run(
      mediaId,
      characterId
    )
    db.prepare('DELETE FROM media_character WHERE media_id = ? AND character_id = ?').run(
      mediaId,
      characterId
    )
  })
  tx()
}

// media_company: media <-> company with a role
export function addMediaCompany(input: {
  mediaId: number
  companyId: number
  role: string
}): number {
  const db = getSqlite()
  const info = db
    .prepare(
      `INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)`
    )
    .run(input.mediaId, input.companyId, input.role)
  if (info.changes > 0) return Number(info.lastInsertRowid)
  // Ignored duplicate: lastInsertRowid is a stale id from some earlier insert —
  // return the existing link's id instead.
  const row = db
    .prepare('SELECT id FROM media_company WHERE media_id=? AND company_id=? AND role=?')
    .get(input.mediaId, input.companyId, input.role) as { id: number } | undefined
  return row!.id
}

export function removeMediaCompany(id: number): void {
  getSqlite().prepare('DELETE FROM media_company WHERE id = ?').run(id)
}
