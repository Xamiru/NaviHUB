import { getSqlite } from '../db/connection'

// The mod install ledger (init.sql mod_install / mod_install_file). mods.ts
// decides; this file only reads and writes rows.

export interface ModInstallRow {
  id: number
  media_id: number | null
  emulator_id: number | null
  gb_mod_id: number
  gb_file_id: number
  name: string
  version: string | null
  kind: 'folder' | 'files'
  target_root: string
  install_dir: string | null
  enabled: number
  installed_at: string
  source_updated_at: number | null
}

export interface ModFileRow {
  rel_path: string
  size: number
  mtime_ms: number
}

const COLS =
  'id, media_id, emulator_id, gb_mod_id, gb_file_id, name, version, kind, target_root, install_dir, enabled, installed_at, source_updated_at'

// mediaId null = installs whose game was deleted from the library.
export function forMedia(mediaId: number | null): (ModInstallRow & { file_count: number; emulator_name: string | null })[] {
  return getSqlite()
    .prepare(
      `SELECT ${COLS.split(', ').map((c) => `m.${c}`).join(', ')},
              (SELECT COUNT(*) FROM mod_install_file f WHERE f.install_id = m.id) AS file_count,
              e.name AS emulator_name
         FROM mod_install m LEFT JOIN emulator e ON e.id = m.emulator_id
        WHERE ${mediaId == null ? 'm.media_id IS NULL' : 'm.media_id = ?'}
        ORDER BY m.installed_at DESC, m.id DESC`
    )
    .all(...(mediaId == null ? [] : [mediaId])) as (ModInstallRow & { file_count: number; emulator_name: string | null })[]
}

export function get(id: number): ModInstallRow | null {
  return (getSqlite().prepare(`SELECT ${COLS} FROM mod_install WHERE id = ?`).get(id) as ModInstallRow | undefined) ?? null
}

export function files(id: number): ModFileRow[] {
  return getSqlite()
    .prepare('SELECT rel_path, size, mtime_ms FROM mod_install_file WHERE install_id = ? ORDER BY rel_path')
    .all(id) as ModFileRow[]
}

// Folder names installs own under a root, enabled or not (a disabled one
// moves back into its name).
export function ownedDirs(targetRoot: string): Set<string> {
  const rows = getSqlite()
    .prepare('SELECT install_dir FROM mod_install WHERE target_root = ? AND install_dir IS NOT NULL')
    .all(targetRoot) as { install_dir: string }[]
  return new Set(rows.map((r) => r.install_dir.toLowerCase()))
}

// Every path any install owns under a root, to refuse overlapping installs.
export function ownedPaths(targetRoot: string): Set<string> {
  const rows = getSqlite()
    .prepare(
      `SELECT f.rel_path FROM mod_install_file f JOIN mod_install m ON m.id = f.install_id
        WHERE m.target_root = ?`
    )
    .all(targetRoot) as { rel_path: string }[]
  return new Set(rows.map((r) => r.rel_path.toLowerCase()))
}

export function insert(
  row: Omit<ModInstallRow, 'id' | 'enabled' | 'installed_at'>,
  fileRows: ModFileRow[]
): number {
  const db = getSqlite()
  return db.transaction(() => {
    const id = Number(
      db
        .prepare(
          `INSERT INTO mod_install (media_id, emulator_id, gb_mod_id, gb_file_id, name, version, kind,
                                    target_root, install_dir, source_updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          row.media_id,
          row.emulator_id,
          row.gb_mod_id,
          row.gb_file_id,
          row.name,
          row.version,
          row.kind,
          row.target_root,
          row.install_dir,
          row.source_updated_at
        ).lastInsertRowid
    )
    const add = db.prepare('INSERT INTO mod_install_file (install_id, rel_path, size, mtime_ms) VALUES (?, ?, ?, ?)')
    for (const f of fileRows) add.run(id, f.rel_path, f.size, f.mtime_ms)
    return id
  })()
}

export function setEnabled(id: number, enabled: boolean, moved: ModFileRow[]): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('UPDATE mod_install SET enabled = ? WHERE id = ?').run(enabled ? 1 : 0, id)
    const upd = db.prepare('UPDATE mod_install_file SET size = ?, mtime_ms = ? WHERE install_id = ? AND rel_path = ?')
    for (const f of moved) upd.run(f.size, f.mtime_ms, id, f.rel_path)
  })()
}

export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM mod_install WHERE id = ?').run(id)
}
