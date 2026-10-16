import { getSqlite } from '../db/connection'

// Emulators on this machine, platform defaults and the game files linked to
// library games (init.sql "Emulation"). Raw rows only — emulation.ts turns
// them into the IPC shapes, resolving folders and defaults.

export interface EmulatorRow {
  id: number
  preset_key: string
  name: string
  exe_path: string
  core_path: string | null
  args_json: string | null
  data_dir: string | null
  screenshot_dir: string | null
  platforms: string
}

export interface GameRomRow {
  id: number
  media_id: number
  rom_path: string
  platform: string
  emulator_id: number | null
  game_code: string | null
  game_code_source: 'file' | 'manual' | null
  preferred: number
}

const EMULATOR_COLS =
  'id, preset_key, name, exe_path, core_path, args_json, data_dir, screenshot_dir, platforms'
const ROM_COLS =
  'id, media_id, rom_path, platform, emulator_id, game_code, game_code_source, preferred'

export function list(): EmulatorRow[] {
  return getSqlite()
    .prepare(`SELECT ${EMULATOR_COLS} FROM emulator ORDER BY name COLLATE NOCASE, id`)
    .all() as EmulatorRow[]
}

export function get(id: number): EmulatorRow | null {
  return (
    (getSqlite().prepare(`SELECT ${EMULATOR_COLS} FROM emulator WHERE id = ?`).get(id) as
      | EmulatorRow
      | undefined) ?? null
  )
}

export function insert(row: {
  presetKey: string
  name: string
  exePath: string
  platforms: string[]
}): number {
  return Number(
    getSqlite()
      .prepare('INSERT INTO emulator (preset_key, name, exe_path, platforms) VALUES (?, ?, ?, ?)')
      .run(row.presetKey, row.name, row.exePath, JSON.stringify(row.platforms)).lastInsertRowid
  )
}

export function update(
  id: number,
  fields: Partial<{
    name: string
    exe_path: string
    core_path: string | null
    args_json: string | null
    data_dir: string | null
    screenshot_dir: string | null
    platforms: string
  }>
): void {
  const keys = Object.keys(fields) as (keyof typeof fields)[]
  if (keys.length === 0) return
  getSqlite()
    .prepare(`UPDATE emulator SET ${keys.map((k) => `${k} = ?`).join(', ')} WHERE id = ?`)
    .run(...keys.map((k) => fields[k] ?? null), id)
}

export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM emulator WHERE id = ?').run(id)
}

export function defaults(): Map<string, number> {
  const rows = getSqlite()
    .prepare('SELECT platform, emulator_id FROM emulator_default')
    .all() as { platform: string; emulator_id: number }[]
  return new Map(rows.map((r) => [r.platform, r.emulator_id]))
}

export function setDefault(platform: string, emulatorId: number | null): void {
  const db = getSqlite()
  if (emulatorId == null) {
    db.prepare('DELETE FROM emulator_default WHERE platform = ?').run(platform)
    return
  }
  db.prepare(
    `INSERT INTO emulator_default (platform, emulator_id) VALUES (?, ?)
     ON CONFLICT(platform) DO UPDATE SET emulator_id = excluded.emulator_id`
  ).run(platform, emulatorId)
}

// ---- game files ----

export function romsFor(mediaId: number): GameRomRow[] {
  return getSqlite()
    .prepare(`SELECT ${ROM_COLS} FROM game_rom WHERE media_id = ? ORDER BY preferred DESC, id`)
    .all(mediaId) as GameRomRow[]
}

export function rom(id: number): GameRomRow | null {
  return (
    (getSqlite().prepare(`SELECT ${ROM_COLS} FROM game_rom WHERE id = ?`).get(id) as
      | GameRomRow
      | undefined) ?? null
  )
}

// Relinking the same file keeps the row (and the user's console and code
// choices) rather than adding a twin.
export function linkRom(row: {
  mediaId: number
  romPath: string
  platform: string
  gameCode: string | null
  gameCodeSource: 'file' | 'manual' | null
  preferred: boolean
}): number {
  const db = getSqlite()
  return db.transaction(() => {
    if (row.preferred) db.prepare('UPDATE game_rom SET preferred = 0 WHERE media_id = ?').run(row.mediaId)
    db.prepare(
      `INSERT INTO game_rom (media_id, rom_path, platform, game_code, game_code_source, preferred)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(media_id, rom_path) DO UPDATE SET
         game_code = COALESCE(game_rom.game_code, excluded.game_code),
         game_code_source = CASE WHEN game_rom.game_code IS NULL
                                 THEN excluded.game_code_source ELSE game_rom.game_code_source END,
         preferred = MAX(game_rom.preferred, excluded.preferred)`
    ).run(
      row.mediaId,
      row.romPath,
      row.platform,
      row.gameCode,
      row.gameCodeSource,
      row.preferred ? 1 : 0
    )
    const found = db
      .prepare('SELECT id FROM game_rom WHERE media_id = ? AND rom_path = ?')
      .get(row.mediaId, row.romPath) as { id: number }
    return found.id
  })()
}

export function unlinkRom(id: number): void {
  getSqlite().prepare('DELETE FROM game_rom WHERE id = ?').run(id)
}

// One preferred way per game: a game file id, or null for the executable.
export function setPreferred(mediaId: number, romId: number | null): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('UPDATE game_rom SET preferred = 0 WHERE media_id = ?').run(mediaId)
    if (romId != null) {
      db.prepare('UPDATE game_rom SET preferred = 1 WHERE id = ? AND media_id = ?').run(romId, mediaId)
    }
  })()
}

export function updateRom(
  id: number,
  fields: Partial<{
    platform: string
    emulator_id: number | null
    game_code: string | null
    game_code_source: 'file' | 'manual' | null
  }>
): void {
  const keys = Object.keys(fields) as (keyof typeof fields)[]
  if (keys.length === 0) return
  getSqlite()
    .prepare(`UPDATE game_rom SET ${keys.map((k) => `${k} = ?`).join(', ')} WHERE id = ?`)
    .run(...keys.map((k) => fields[k] ?? null), id)
}

export function mediaTitle(mediaId: number): { title: string; mediaType: string } | null {
  const r = getSqlite()
    .prepare('SELECT title, media_type FROM media_item WHERE id = ?')
    .get(mediaId) as { title: string; media_type: string } | undefined
  return r ? { title: r.title, mediaType: r.media_type } : null
}
