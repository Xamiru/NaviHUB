import { getSqlite } from './db/connection'
import * as bangumi from './bangumi'
import {
  BANGUMI_SOURCE,
  characterDisplayName,
  hasKana,
  isJapaneseActor,
  westernOrder,
  type BgmActor,
  type BgmReading
} from './bangumiCore'
import { bakedCharacterNames, bakedReading, worksForBangumi } from './launchboxCatalog'
import { LAUNCHBOX_SOURCE } from './launchboxCatalogCore'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { upsertSharedPerson } from './repos/personMatch'
import * as links from './repos/externalLinkRepo'

// A game's cast, staff and game-to-game relations from Bangumi — the source
// that has voice actors for games. Reached through the game's Bangumi link
// (media_external_link), whatever the row's own key is.
//
// What reaches the database: character names (romanized where the games
// catalog knows them, else Japanese) and images, JAPANESE voice actors only
// (the user's choice), staff under English role names, and relations to other
// catalog works. No Bangumi summary, tag or Chinese name is ever stored.
//
// Re-running is authoritative for Bangumi's own rows only: its characters are
// external_source 'bangumi', its credits carry origin 'bangumi'. Hand-made
// characters and credits on the same game are never touched.

export interface GameCastSummary {
  linked: boolean
  cast: number
  staff: number
  relations: number
}


// A kanji-only actor name needs its kana reading to count as Japanese. The
// catalog bakes it for every actor of a linked game; a person missing there
// (a cast that grew after the catalog was built) is looked up once per run,
// and only this many per game.
const MAX_LIVE_READINGS = 40
const readingCache = new Map<number, BgmReading | null>()

async function readingFor(actor: BgmActor, budget: { left: number }): Promise<BgmReading | null> {
  const baked = bakedReading(actor.id)
  if (baked) return baked
  // Only a kanji-only name needs the lookup: kana already decides, and a
  // Latin name (an English dub) cannot pass.
  if (hasKana(actor.name) || !/[\u3400-\u9fff]/.test(actor.name)) return null
  if (readingCache.has(actor.id)) return readingCache.get(actor.id) ?? null
  if (budget.left <= 0) return null
  budget.left--
  const live = await bangumi.personReading(actor.id)
  readingCache.set(actor.id, live)
  return live
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function upsertCharacter(db: any, id: number, name: string, native: string, image: string | null): number {
  const row = db
    .prepare('SELECT id FROM character WHERE external_source = ? AND external_id = ?')
    .get(BANGUMI_SOURCE, String(id)) as { id: number } | undefined
  if (row) {
    db.prepare(
      'UPDATE character SET name = ?, name_native = ?, image_path = COALESCE(image_path, ?) WHERE id = ?'
    ).run(name, native, image, row.id)
    return row.id
  }
  return Number(
    db
      .prepare(
        'INSERT INTO character (name, name_native, image_path, external_source, external_id) VALUES (?, ?, ?, ?, ?)'
      )
      .run(name, native, image, BANGUMI_SOURCE, String(id)).lastInsertRowid
  )
}

// Orphaned Bangumi characters go, list entries first (list_item has no FK).
function sweepOrphans(db: any): void {
  db.prepare(
    `DELETE FROM list_item
     WHERE list_id IN (SELECT id FROM list WHERE entity_kind = 'character')
       AND entity_id IN (SELECT id FROM character WHERE external_source = ?
                         AND id NOT IN (SELECT character_id FROM media_character))`
  ).run(BANGUMI_SOURCE)
  db.prepare(
    `DELETE FROM character WHERE external_source = ? AND id NOT IN (SELECT character_id FROM media_character)`
  ).run(BANGUMI_SOURCE)
}

// What a wrong Bangumi link brought: its cast, staff and relations on this
// game. Hand-made rows stay.
export function clearGameCast(mediaId: number): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('DELETE FROM credit WHERE media_id = ? AND origin = ?').run(mediaId, BANGUMI_SOURCE)
    db.prepare(
      `DELETE FROM media_character WHERE media_id = ?
         AND character_id IN (SELECT id FROM character WHERE external_source = ?)`
    ).run(mediaId, BANGUMI_SOURCE)
    db.prepare('DELETE FROM media_relation WHERE media_id = ? AND related_source = ?').run(mediaId, LAUNCHBOX_SOURCE)
    sweepOrphans(db)
  })()
}

function markChecked(mediaId: number): void {
  const db = getSqlite()
  const row = db.prepare('SELECT metadata FROM media_item WHERE id = ?').get(mediaId) as
    | { metadata: string | null }
    | undefined
  let meta: Record<string, unknown> = {}
  try {
    meta = row?.metadata ? JSON.parse(row.metadata) || {} : {}
  } catch {
    meta = {}
  }
  meta.bangumiChecked = true
  db.prepare('UPDATE media_item SET metadata = ? WHERE id = ?').run(JSON.stringify(meta), mediaId)
}

export async function enrichGame(mediaId: number): Promise<GameCastSummary> {
  const none: GameCastSummary = { linked: false, cast: 0, staff: 0, relations: 0 }
  const media = getSqlite()
    .prepare('SELECT media_type FROM media_item WHERE id = ?')
    .get(mediaId) as { media_type: string } | undefined
  if (media?.media_type !== 'game') throw new Error('Cast from Bangumi is for games only.')
  const subject = links.linkedId(mediaId, 'bangumi')
  if (!subject) return none
  const subjectId = Number(subject)

  // ---- network ----
  updateActivity({ phase: 'fetching' })
  const characters = await bangumi.subjectCharacters(subjectId)
  if (characters == null) {
    // The subject is gone for anonymous clients: a definitive miss, nothing to prune by.
    markChecked(mediaId)
    return { ...none, linked: true }
  }
  const staff = (await bangumi.subjectStaff(subjectId)) ?? []
  const relations = (await bangumi.subjectRelations(subjectId)) ?? []

  const budget = { left: MAX_LIVE_READINGS }
  const cast: { character: (typeof characters)[number]; actors: { actor: BgmActor; romaji: string | null }[] }[] = []
  for (const character of characters) {
    const actors: { actor: BgmActor; romaji: string | null }[] = []
    for (const actor of character.actors) {
      const reading = await readingFor(actor, budget)
      if (isJapaneseActor(actor.name, reading)) actors.push({ actor, romaji: reading?.romaji ?? null })
    }
    cast.push({ character, actors })
  }
  const images = await downloadImages([
    ...cast.map((c) => c.character.imageUrl),
    ...cast.flatMap((c) => c.actors.map((a) => a.actor.imageUrl)),
    ...staff.map((s) => s.imageUrl)
  ])
  const img = (url: string | null): string | null => (url ? (images.get(url) ?? null) : null)

  const related = relations.flatMap((r) => {
    const works = worksForBangumi(r.subjectId)
    return works.length === 1 ? [{ relationType: r.relationType, work: works[0] }] : []
  })

  // ---- one transaction ----
  updateActivity({ phase: 'writing' })
  const db = getSqlite()
  return db.transaction((): GameCastSummary => {
    db.prepare(`DELETE FROM credit WHERE media_id = ? AND origin = ?`).run(mediaId, BANGUMI_SOURCE)

    const kept = new Set<number>()
    let order = 0
    let castCount = 0
    const sorted = [...cast].sort((a, b) => a.character.importance - b.character.importance)
    for (const { character, actors } of sorted) {
      const characterId = upsertCharacter(
        db,
        character.id,
        characterDisplayName(character.name, bakedCharacterNames(character.id)),
        character.name,
        img(character.imageUrl)
      )
      kept.add(characterId)
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
         ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
      ).run(mediaId, characterId, order++)
      for (const { actor, romaji } of actors) {
        const personId = upsertSharedPerson(db, {
          source: BANGUMI_SOURCE,
          externalId: String(actor.id),
          name: westernOrder(romaji),
          nameNative: actor.name,
          photoPath: img(actor.imageUrl)
        })
        db.prepare(
          `INSERT INTO credit (media_id, person_id, character_id, role, language, importance, origin)
           VALUES (?, ?, ?, 'voice_actor', 'Japanese', ?, ?)`
        ).run(mediaId, personId, characterId, character.importance, BANGUMI_SOURCE)
        castCount++
      }
    }

    // Characters Bangumi no longer lists for this game.
    const linked = db
      .prepare(
        `SELECT mc.character_id AS cid FROM media_character mc JOIN character ch ON ch.id = mc.character_id
         WHERE mc.media_id = ? AND ch.external_source = ?`
      )
      .all(mediaId, BANGUMI_SOURCE) as { cid: number }[]
    for (const { cid } of linked) {
      if (kept.has(cid)) continue
      db.prepare('DELETE FROM media_character WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
    }
    sweepOrphans(db)

    let staffCount = 0
    const seen = new Set<string>()
    for (const s of staff) {
      const personId = upsertSharedPerson(db, {
        source: BANGUMI_SOURCE,
        externalId: String(s.personId),
        name: westernOrder(bakedReading(s.personId)?.romaji),
        nameNative: s.name,
        photoPath: img(s.imageUrl)
      })
      const key = `${personId}:${s.role}`
      if (seen.has(key)) {
        db.prepare(
          `UPDATE credit SET role_note = role_note || ', ' || ? WHERE media_id = ? AND person_id = ? AND role = ?
             AND origin = ? AND character_id IS NULL AND instr(', ' || role_note || ', ', ', ' || ? || ', ') = 0`
        ).run(s.roleNote, mediaId, personId, s.role, BANGUMI_SOURCE, s.roleNote)
        continue
      }
      seen.add(key)
      db.prepare(
        `INSERT INTO credit (media_id, person_id, role, role_note, origin) VALUES (?, ?, ?, ?, ?)`
      ).run(mediaId, personId, s.role, s.roleNote, BANGUMI_SOURCE)
      staffCount++
    }

    // Relations to other catalog works; only this source's rows are replaced.
    db.prepare('DELETE FROM media_relation WHERE media_id = ? AND related_source = ?').run(mediaId, LAUNCHBOX_SOURCE)
    let relationCount = 0
    const own = db.prepare('SELECT external_source, external_id FROM media_item WHERE id = ?').get(mediaId) as {
      external_source: string | null
      external_id: string | null
    }
    for (const { relationType, work } of related) {
      if (own.external_source === LAUNCHBOX_SOURCE && own.external_id === String(work.id)) continue
      if (links.linkedId(mediaId, 'launchbox') === String(work.id)) continue
      const info = db
        .prepare(
          `INSERT OR IGNORE INTO media_relation
           (media_id, relation_type, related_source, related_external_id, related_type, related_title, sort_order)
           VALUES (?, ?, ?, ?, 'game', ?, ?)`
        )
        .run(mediaId, relationType, LAUNCHBOX_SOURCE, String(work.id), work.name, relationCount)
      if (info.changes) relationCount++
    }

    markChecked(mediaId)
    return { linked: true, cast: castCount, staff: staffCount, relations: relationCount }
  })()
}
