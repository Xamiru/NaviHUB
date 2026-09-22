import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, rmdirSync, writeFileSync } from 'fs'
import { dirname, extname, isAbsolute, join, relative } from 'path'
import { randomUUID } from 'crypto'
import { getSqlite } from './db/connection'

const legacy = 'navihub-downloads'
const audio = new Set(['.opus', '.m4a', '.mp3', '.flac', '.ogg', '.wav', '.aac'])
type Move = { from: string; to: string }
const journalPath = (root: string) => join(root, '.navihub-downloads', 'legacy-moves.json')

function checked(root: string, path: string): string {
  const parts = path.split(/[\\/]/)
  if (isAbsolute(path) || parts.some((p) => !p || p === '..' || p === '.')) throw new Error('Invalid legacy music recovery path')
  let result = root
  for (const part of parts) {
    result = join(result, part)
    if (existsSync(result) && lstatSync(result).isSymbolicLink()) throw new Error('Legacy music recovery cannot move through symbolic links')
  }
  return result
}

/** Replayed until indexing succeeds. Track IDs and all ID-based personal state survive. */
export function recoverLegacyMusicDownloads(root: string): string[] {
  const journal = journalPath(root)
  const moves: Move[] = existsSync(journal) ? JSON.parse(readFileSync(journal, 'utf8')) : []
  if (!Array.isArray(moves)) throw new Error('Invalid legacy music recovery journal')
  const save = () => {
    mkdirSync(dirname(journal), { recursive: true })
    writeFileSync(`${journal}.tmp`, JSON.stringify(moves), { mode: 0o600 })
    renameSync(`${journal}.tmp`, journal)
  }
  const apply = (move: Move) => {
    if (typeof move?.from !== 'string' || typeof move.to !== 'string' || !move.from.startsWith(`${legacy}/`) || move.to.startsWith(`${legacy}/`)) throw new Error('Invalid legacy music recovery journal')
    const from = checked(root, move.from), to = checked(root, move.to)
    if (existsSync(from)) {
      if (existsSync(to)) throw new Error('Legacy music recovery found both source and destination; neither was overwritten')
      mkdirSync(dirname(to), { recursive: true })
      renameSync(from, to)
    }
    if (!existsSync(to)) throw new Error('A file needed for legacy music recovery is missing')
    const db = getSqlite()
    db.transaction(() => {
      db.prepare('UPDATE music_track SET file_path=? WHERE file_path=?').run(move.to, move.from)
      db.prepare('UPDATE music_url_item SET output_path=? WHERE output_path=?').run(move.to, move.from)
    })()
  }
  for (const move of moves) apply(move)
  const walk = (dir: string) => {
    if (!existsSync(dir)) return
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = join(dir, entry.name)
      if (entry.isSymbolicLink()) throw new Error('Remove symbolic links from the old download folder before recovery')
      if (entry.isDirectory()) { walk(abs); continue }
      if (!entry.isFile() || !audio.has(extname(entry.name).toLowerCase())) continue
      const from = relative(root, abs).replace(/\\/g, '/')
      const parts = from.split('/')
      if (parts.length < 4) throw new Error('Old downloads must have Artist/Album folders before recovery')
      let to = parts.slice(1).join('/')
      while (existsSync(checked(root, to)) || getSqlite().prepare('SELECT 1 FROM music_track WHERE file_path=?').get(to)) {
        to = `${parts.slice(1, -1).join('/')}/${randomUUID()}-${entry.name}`
      }
      const move = { from, to }
      moves.push(move)
      save() // Durable before the filesystem or DB changes.
      apply(move)
    }
  }
  checked(root, legacy)
  walk(join(root, legacy))
  return moves.map((move) => move.to)
}

/** Only call after the moved paths have been indexed into their real artists. */
export function finishLegacyMusicRecovery(root: string): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare(`DELETE FROM music_album WHERE dir_path LIKE 'navihub-downloads/%'
      AND NOT EXISTS (SELECT 1 FROM music_track WHERE album_id=music_album.id)
      AND NOT EXISTS (SELECT 1 FROM music_spotify_entity_snapshot WHERE album_id=music_album.id)`).run()
    db.prepare(`DELETE FROM music_artist WHERE dir_path='navihub-downloads'
      AND NOT EXISTS (SELECT 1 FROM music_track WHERE artist_id=music_artist.id)
      AND NOT EXISTS (SELECT 1 FROM music_spotify_entity_snapshot WHERE artist_id=music_artist.id)
      AND NOT EXISTS (SELECT 1 FROM music_album WHERE artist_id=music_artist.id)`).run()
  })()
  rmSync(journalPath(root), { force: true })
  const removeEmpty = (dir: string) => {
    if (!existsSync(dir)) return
    for (const entry of readdirSync(dir, { withFileTypes: true })) if (entry.isDirectory()) removeEmpty(join(dir, entry.name))
    if (!readdirSync(dir).length) rmdirSync(dir)
  }
  removeEmpty(join(root, legacy))
}
