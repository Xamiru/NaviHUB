import { getSqlite } from '../db/connection'
import { choice, textValue } from './hobbyValidation'
import { validPage, validRating, validTags } from './musicJournalRepo'
import { TRACK_COLS, TRACK_JOINS, mapTrack, MAX_PLAYBACK_QUEUE_TRACKS } from './musicRepo'
import type {
  MusicSmartInput,
  MusicSmartPlaylist,
  MusicSmartRules,
  MusicSmartPreview
} from '@shared/types'

function count(value: number | null, label: string, max = 1000000): number | null {
  if (value === null) return null
  if (!Number.isInteger(value) || value < 0 || value > max) throw new Error(`Invalid ${label}`)
  return value
}
export function validateRules(input: MusicSmartRules): MusicSmartRules {
  const rules: MusicSmartRules = {
    liked: choice(input.liked, ['any', 'liked', 'unliked'], 'like filter'),
    playState: choice(input.playState, ['any', 'unplayed', 'played'], 'play filter'),
    minPlays: count(input.minPlays, 'minimum plays'),
    maxPlays: count(input.maxPlays, 'maximum plays'),
    notPlayedDays: count(input.notPlayedDays, 'days since last played', 36500),
    tags: validTags(input.tags),
    tagMode: choice(input.tagMode, ['all', 'any'], 'tag match'),
    artist: textValue(input.artist, 'artist filter', 200),
    soundtrack: choice(input.soundtrack, ['any', 'linked', 'unlinked'], 'soundtrack filter'),
    minAlbumRating: validRating(input.minAlbumRating),
    shelf:
      input.shelf === null
        ? null
        : choice(input.shelf, ['want', 'exploring', 'revisit'] as const, 'album shelf'),
    order: choice(
      input.order,
      ['title', 'leastPlayed', 'recent', 'oldestPlayed'],
      'playlist order'
    ),
    maxTracks: count(input.maxTracks, 'track limit', MAX_PLAYBACK_QUEUE_TRACKS) ?? 0
  }
  if (rules.maxTracks < 1) throw new Error('Track limit must be between 1 and 2000')
  if (rules.minPlays !== null && rules.maxPlays !== null && rules.minPlays > rules.maxPlays)
    throw new Error('Minimum plays cannot exceed maximum plays')
  return rules
}
export function list(): MusicSmartPlaylist[] {
  return (
    getSqlite()
      .prepare(
        'SELECT id,title,description,rules_json FROM music_smart_playlist ORDER BY title COLLATE NOCASE,id'
      )
      .all() as { id: number; title: string; description: string; rules_json: string }[]
  ).map(({ rules_json, ...row }) => ({ ...row, rules: validateRules(JSON.parse(rules_json)) }))
}
export function save(id: number | null, input: MusicSmartInput): number {
  const title = textValue(input.title, 'playlist name', 200, true)
  const description = textValue(input.description, 'playlist description', 2000)
  const json = JSON.stringify(validateRules(input.rules))
  const db = getSqlite()
  if (id != null) {
    if (
      !db
        .prepare('UPDATE music_smart_playlist SET title=?,description=?,rules_json=? WHERE id=?')
        .run(title, description, json, id).changes
    )
      throw new Error('Smart playlist not found')
    return id
  }
  return Number(
    db
      .prepare('INSERT INTO music_smart_playlist(title,description,rules_json) VALUES(?,?,?)')
      .run(title, description, json).lastInsertRowid
  )
}
export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM music_smart_playlist WHERE id=?').run(id)
}
function selection(input: MusicSmartRules): {
  from: string
  params: (string | number)[]
  order: string
  rules: MusicSmartRules
} {
  const rules = validateRules(input)
  const filters: string[] = []
  const params: (string | number)[] = []
  if (rules.liked !== 'any')
    filters.push(`t.liked_at IS ${rules.liked === 'liked' ? 'NOT ' : ''}NULL`)
  if (rules.playState !== 'any')
    filters.push(rules.playState === 'unplayed' ? 't.play_count=0' : 't.play_count>0')
  if (rules.minPlays !== null) {
    filters.push('t.play_count>=?')
    params.push(rules.minPlays)
  }
  if (rules.maxPlays !== null) {
    filters.push('t.play_count<=?')
    params.push(rules.maxPlays)
  }
  if (rules.notPlayedDays !== null) {
    filters.push("(t.last_played_at IS NULL OR datetime(t.last_played_at)<=datetime('now',?))")
    params.push(`-${rules.notPlayedDays} days`)
  }
  if (rules.artist) {
    filters.push(
      "(instr(lower(ar.name),lower(?))>0 OR instr(lower(COALESCE(t.tag_artist,'')),lower(?))>0)"
    )
    params.push(rules.artist, rules.artist)
  }
  if (rules.minAlbumRating !== null) {
    filters.push('ap.rating>=?')
    params.push(rules.minAlbumRating)
  }
  if (rules.shelf !== null) {
    filters.push('ap.shelf=?')
    params.push(rules.shelf)
  }
  if (rules.soundtrack !== 'any')
    filters.push(`${rules.soundtrack === 'unlinked' ? 'NOT ' : ''}EXISTS(
    SELECT 1 FROM soundtrack_link sl WHERE sl.track_id=t.id OR sl.album_id=t.album_id)`)
  if (rules.tags.length) {
    const tags = rules.tags.map((tag) => {
      params.push(tag, tag)
      return `(EXISTS(SELECT 1 FROM json_each(COALESCE(tp.tags_json,'[]')) WHERE value=?)
        OR EXISTS(SELECT 1 FROM json_each(COALESCE(ap.tags_json,'[]')) WHERE value=?))`
    })
    filters.push(`(${tags.join(rules.tagMode === 'all' ? ' AND ' : ' OR ')})`)
  }
  const order = {
    title: 't.title COLLATE NOCASE,t.id',
    leastPlayed: 't.play_count,t.last_played_at,t.id',
    recent: 't.last_played_at DESC,t.id',
    oldestPlayed: 't.last_played_at,t.id'
  }[rules.order]
  return {
    rules,
    params,
    order,
    from: `${TRACK_JOINS}
    LEFT JOIN music_album_personal ap ON ap.album_id=t.album_id
    LEFT JOIN music_track_personal tp ON tp.track_id=t.id
    ${filters.length ? `WHERE ${filters.join(' AND ')}` : ''}`
  }
}
export function preview(input: MusicSmartRules, page = 0): MusicSmartPreview {
  const { rules, params, order, from } = selection(input)
  const offset = validPage(page) * 50
  const db = getSqlite()
  const matching = (db.prepare(`SELECT COUNT(*) AS n ${from}`).get(...params) as { n: number }).n
  const total = Math.min(matching, rules.maxTracks)
  const rows = db
    .prepare(`SELECT ${TRACK_COLS} ${from} ORDER BY ${order} LIMIT ? OFFSET ?`)
    .all(...params, Math.max(0, Math.min(50, total - offset)), offset) as Record<string, unknown>[]
  return { items: rows.map(mapTrack), total, matching }
}
export function queue(id: number) {
  const row = getSqlite()
    .prepare('SELECT rules_json FROM music_smart_playlist WHERE id=?')
    .get(id) as { rules_json: string } | undefined
  if (!row) throw new Error('Smart playlist not found')
  const { rules, params, order, from } = selection(JSON.parse(row.rules_json))
  return (
    getSqlite()
      .prepare(`SELECT ${TRACK_COLS} ${from} ORDER BY ${order} LIMIT ?`)
      .all(...params, rules.maxTracks) as Record<string, unknown>[]
  ).map(mapTrack)
}
