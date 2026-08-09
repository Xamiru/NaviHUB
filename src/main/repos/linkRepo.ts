import { getSqlite } from '../db/connection'
import type { CreditRole } from '@shared/types'


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


export function removeMediaCompany(id: number): void {
  getSqlite().prepare('DELETE FROM media_company WHERE id = ?').run(id)
}
