import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as links from '../src/main/repos/musicLinkRepo'

beforeEach(() => {
  db = createTestDb()
  db.exec(`
    INSERT INTO media_item (id, media_type, title) VALUES (1, 'game', 'Persona 5'), (2, 'anime', 'Bocchi'),
      (3, 'movie', 'Drive');
    INSERT INTO wrestling_wrestler (id, name) VALUES (1, 'Stone Cold');
  `)
})

function artist(name: string): number {
  db.prepare('INSERT OR IGNORE INTO music_artist (name, dir_path) VALUES (?, ?)').run(name, name)
  return (db.prepare('SELECT id FROM music_artist WHERE dir_path = ?').get(name) as { id: number }).id
}

function album(artistName: string, title: string): number {
  const artistId = artist(artistName)
  const dir = `${artistName}/${title}`
  db.prepare('INSERT OR IGNORE INTO music_album (artist_id, title, dir_path) VALUES (?, ?, ?)').run(artistId, title, dir)
  return (db.prepare('SELECT id FROM music_album WHERE dir_path = ?').get(dir) as { id: number }).id
}

function track(artistName: string, albumTitle: string, title: string, opts: { duration?: number; no?: number } = {}): number {
  const albumId = album(artistName, albumTitle)
  const artistId = artist(artistName)
  return Number(
    db
      .prepare(
        `INSERT INTO music_track (album_id, artist_id, file_path, title, duration, track_no)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(albumId, artistId, `${artistName}/${albumTitle}/${title}.mp3`, title, opts.duration ?? 200, opts.no ?? null)
      .lastInsertRowid
  )
}

function theme(mediaId: number, externalId: string | null, title = 'Theme'): number {
  return Number(
    db
      .prepare(`INSERT INTO theme_song (media_id, type, title, external_source, external_id) VALUES (?, 'OP', ?, 'animethemes', ?)`)
      .run(mediaId, title, externalId).lastInsertRowid
  )
}

const rawLinks = () => db.prepare('SELECT * FROM media_music_link ORDER BY id').all() as Record<string, unknown>[]

describe('creating and reading links', () => {
  it('links albums and tracks to a title, in order, with snapshots and resolved tracks', () => {
    const t1 = track('Shoji Meguro', 'Persona 5 OST', 'Wake Up, Get Up, Get Out There', { no: 1 })
    track('Shoji Meguro', 'Persona 5 OST', 'Life Will Change', { no: 2 })
    const albumId = album('Shoji Meguro', 'Persona 5 OST')
    links.create({ owner: { mediaId: 1 }, kind: 'album', albumId, label: '  OST  ' })
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t1, label: 'Opening' })

    const list = links.listForOwner({ mediaId: 1 })
    expect(list.map((l) => [l.kind, l.label, l.sortOrder, l.missing])).toEqual([
      ['album', 'OST', 0, false],
      ['track', 'Opening', 1, false]
    ])
    expect(list[0].album?.trackCount).toBe(2)
    expect(list[0].tracks.map((t) => t.title)).toEqual(['Wake Up, Get Up, Get Out There', 'Life Will Change'])
    expect(list[1].tracks.map((t) => t.id)).toEqual([t1])
    expect(list[1].snapshot).toEqual({ artist: 'Shoji Meguro', album: 'Persona 5 OST', title: 'Wake Up, Get Up, Get Out There' })
    expect(rawLinks()[0].snap_title).toBeNull()
  })

  it('links entrance themes to a wrestler without touching titles', () => {
    const t = track('Jim Johnston', 'WWF The Music', 'Hell Frozen Over')
    links.create({ owner: { wrestlerId: 1 }, kind: 'track', trackId: t, label: 'Entrance' })
    expect(links.listForOwner({ wrestlerId: 1 })).toHaveLength(1)
    expect(links.listForOwner({ mediaId: 1 })).toHaveLength(0)
  })

  it('rejects a duplicate link with the same label but allows a second label', () => {
    const t = track('A', 'B', 'C')
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t, label: 'OST' })
    expect(() => links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t, label: 'OST' })).toThrow(
      /already linked here as “OST”/
    )
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t, label: 'Battle' })
    expect(links.listForOwner({ mediaId: 1 })).toHaveLength(2)
  })

  it('enforces one owner and the album/track shape in SQL', () => {
    const t = track('A', 'B', 'C')
    const insert = (cols: string, values: string) =>
      db.exec(`INSERT INTO media_music_link (${cols}, snap_artist, snap_album) VALUES (${values}, 'A', 'B')`)
    expect(() => insert('media_id, wrestler_id, kind, track_id', `1, 1, 'track', ${t}`)).toThrow(/CHECK/)
    expect(() => insert('kind, track_id', `'track', ${t}`)).toThrow(/CHECK/)
    expect(() => insert('media_id, kind, track_id', `1, 'album', ${t}`)).toThrow(/CHECK/)
    expect(() => insert('media_id, kind, album_id', `1, 'track', 1`)).toThrow(/CHECK/)
    expect(() => insert('wrestler_id, kind, track_id, theme_external_id', `1, 'track', ${t}, 'x'`)).toThrow(/CHECK/)
  })

  it('throws for a missing album or track', () => {
    expect(() => links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: 999, label: '' })).toThrow('Track not found')
    expect(() => links.create({ owner: { mediaId: 1 }, kind: 'album', albumId: 999, label: '' })).toThrow('Album not found')
  })

  it('updates labels, reorders within the owner and removes', () => {
    const a = links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: track('A', 'B', 'One'), label: 'x' })
    const b = links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: track('A', 'B', 'Two'), label: 'x' })
    links.update(a, { label: 'Battle theme' })
    links.reorder({ mediaId: 1 }, [b, a])
    expect(links.listForOwner({ mediaId: 1 }).map((l) => [l.id, l.label])).toEqual([[b, 'x'], [a, 'Battle theme']])
    links.remove(b)
    expect(links.listForOwner({ mediaId: 1 }).map((l) => l.id)).toEqual([a])
  })

  it('lists used labels, most used first', () => {
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: track('A', 'B', 'One'), label: 'OST' })
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: track('A', 'B', 'Two'), label: 'OST' })
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: track('A', 'B', 'Three'), label: 'Credits' })
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: track('A', 'B', 'Four'), label: '' })
    expect(links.labels()).toEqual(['OST', 'Credits'])
  })

  it('searches albums and tracks by title or artist name', () => {
    track('Kavinsky', 'OutRun', 'Nightcall')
    track('College', 'Northern Council', 'A Real Hero')
    const byArtist = links.searchCandidates('kavinsky')
    expect(byArtist.albums.map((a) => a.title)).toEqual(['OutRun'])
    expect(byArtist.tracks.map((t) => t.title)).toEqual(['Nightcall'])
    expect(links.searchCandidates('hero').tracks.map((t) => t.title)).toEqual(['A Real Hero'])
    expect(links.searchCandidates('  ')).toEqual({ albums: [], tracks: [] })
  })

  it('reads several titles at once for franchise pages', () => {
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: track('A', 'B', 'One'), label: '' })
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: track('A', 'B', 'Two'), label: '' })
    links.create({ owner: { wrestlerId: 1 }, kind: 'track', trackId: track('A', 'B', 'Three'), label: '' })
    expect(links.listForMediaIds([1, 3, 1]).map((l) => l.mediaId).sort()).toEqual([1, 3])
    expect(links.listForMediaIds([])).toEqual([])
  })
})

describe('anime full versions', () => {
  it('marks a track as the full version of a theme and survives a theme refresh', () => {
    const op = theme(2, 'at-1', 'Seishun Complex')
    const t = track('Kessoku Band', 'Kessoku Band', 'Seishun Complex')
    const id = links.create({ owner: { mediaId: 2 }, kind: 'track', trackId: t, label: 'Opening', themeSongId: op })
    expect(links.listForOwner({ mediaId: 2 })[0].themeSongId).toBe(op)

    // A theme refresh deletes and re-inserts every theme_song row.
    db.prepare('DELETE FROM theme_song WHERE media_id = 2').run()
    const again = theme(2, 'at-1', 'Seishun Complex')
    expect(links.listForOwner({ mediaId: 2 })[0].themeSongId).toBe(again)

    links.update(id, { themeSongId: null })
    expect(links.listForOwner({ mediaId: 2 })[0].themeSongId).toBeNull()
  })

  it('keeps one full version per theme', () => {
    const op = theme(2, 'at-1')
    const a = links.create({ owner: { mediaId: 2 }, kind: 'track', trackId: track('K', 'B', 'One'), label: '', themeSongId: op })
    const b = links.create({ owner: { mediaId: 2 }, kind: 'track', trackId: track('K', 'B', 'Two'), label: '' })
    links.update(b, { themeSongId: op })
    const byId = new Map(links.listForOwner({ mediaId: 2 }).map((l) => [l.id, l.themeSongId]))
    expect(byId.get(a)).toBeNull()
    expect(byId.get(b)).toBe(op)
  })

  it('refuses themes on albums, non-anime titles, wrestlers and other anime', () => {
    const op = theme(2, 'at-1')
    const t = track('K', 'B', 'One')
    db.exec("INSERT INTO media_item (id, media_type, title) VALUES (4, 'anime', 'Other')")
    expect(() =>
      links.create({ owner: { mediaId: 2 }, kind: 'album', albumId: album('K', 'B'), label: '', themeSongId: op })
    ).toThrow()
    expect(() => links.create({ owner: { wrestlerId: 1 }, kind: 'track', trackId: t, label: '', themeSongId: op })).toThrow()
    expect(() => links.create({ owner: { mediaId: 4 }, kind: 'track', trackId: t, label: '', themeSongId: op })).toThrow()
    const gameTheme = theme(1, 'at-9')
    expect(() => links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t, label: '', themeSongId: gameTheme })).toThrow()
    expect(() => links.create({ owner: { mediaId: 2 }, kind: 'track', trackId: t, label: '', themeSongId: theme(2, null) })).toThrow()
    expect(rawLinks()).toHaveLength(0)
  })
})

describe('linking from the music side', () => {
  it('links several tracks at once and skips the ones already linked under that label', () => {
    const a = track('Shoji Meguro', 'Persona 5 OST', 'Beneath the Mask')
    const b = track('Shoji Meguro', 'Persona 5 OST', 'Rivers in the Desert')
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: a, label: 'OST' })
    expect(links.linkTracks({ owner: { mediaId: 1 }, trackIds: [a, b, b], label: 'OST' })).toEqual({
      added: 1,
      skipped: 1
    })
    expect(links.listForOwner({ mediaId: 1 }).map((l) => [l.tracks[0].title, l.sortOrder])).toEqual([
      ['Beneath the Mask', 0],
      ['Rivers in the Desert', 1]
    ])
    // A different label is a second, deliberate link.
    expect(links.linkTracks({ owner: { mediaId: 1 }, trackIds: [a], label: 'Battle' })).toEqual({ added: 1, skipped: 0 })
  })

  it('takes a theme only for one track, and rolls back the whole batch on a bad one', () => {
    const t = track('Kessoku Band', 'Kessoku Band', 'Seishun Complex')
    const other = track('Kessoku Band', 'Kessoku Band', 'Guitar to Kodoku to Aoi Hoshi')
    const op = theme(2, 'op1')
    expect(() =>
      links.linkTracks({ owner: { mediaId: 2 }, trackIds: [t, other], label: '', themeSongId: op })
    ).toThrow(/Only one track/)
    expect(() => links.linkTracks({ owner: { mediaId: 1 }, trackIds: [t, 9999], label: '' })).toThrow('Track not found')
    expect(rawLinks()).toHaveLength(0)
    links.linkTracks({ owner: { mediaId: 2 }, trackIds: [t], label: 'Opening', themeSongId: op })
    expect(links.listForOwner({ mediaId: 2 })[0].themeSongId).toBe(op)
  })

  it('says why a theme link to an already linked track did not take', () => {
    const t = track('Kessoku Band', 'Kessoku Band', 'Seishun Complex')
    const op = theme(2, 'op1')
    links.linkTracks({ owner: { mediaId: 2 }, trackIds: [t], label: '' })
    expect(() =>
      links.linkTracks({ owner: { mediaId: 2 }, trackIds: [t], label: '', themeSongId: op })
    ).toThrow(/already linked here/)
    expect(links.listForOwner({ mediaId: 2 })[0].themeSongId).toBeNull()
  })

  it('lists what a track or an album is linked to, including through the album', () => {
    const t = track('Shoji Meguro', 'Persona 5 OST', 'Last Surprise')
    const albumId = album('Shoji Meguro', 'Persona 5 OST')
    links.create({ owner: { mediaId: 1 }, kind: 'album', albumId, label: 'OST' })
    links.create({ owner: { wrestlerId: 1 }, kind: 'track', trackId: t, label: 'Entrance' })
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: track('Kavinsky', 'Drive', 'Nightcall'), label: '' })

    expect(links.usages({ trackId: t }).map((u) => [u.ownerTitle, u.mediaType, u.label, u.viaAlbum])).toEqual([
      ['Persona 5', 'game', 'OST', true],
      ['Stone Cold', null, 'Entrance', false]
    ])
    expect(links.usages({ albumId })).toEqual([
      expect.objectContaining({ ownerTitle: 'Persona 5', mediaId: 1, kind: 'album', viaAlbum: false })
    ])
  })

  it('searches library titles and wrestlers to link to', () => {
    db.prepare(`UPDATE media_item SET release_date = '2016-09-15' WHERE id = 1`).run()
    db.prepare(`INSERT INTO wrestling_wrestler (id, name, real_name, debut_year) VALUES (2, 'The Rock', 'Dwayne Johnson', 1996)`).run()
    expect(links.searchOwners('Persona')).toEqual([
      { mediaId: 1, wrestlerId: null, mediaType: 'game', title: 'Persona 5', year: 2016, coverPath: null }
    ])
    expect(links.searchOwners('dwayne')).toEqual([
      { mediaId: null, wrestlerId: 2, mediaType: null, title: 'The Rock', year: 1996, coverPath: null }
    ])
    expect(links.searchOwners('Dr').map((o) => o.title)).toEqual(['Drive'])
    expect(links.searchOwners('  ')).toEqual([])
  })
})

describe('deletion', () => {
  it('cascades with the title and the wrestler', () => {
    const t = track('A', 'B', 'C')
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t, label: '' })
    links.create({ owner: { wrestlerId: 1 }, kind: 'track', trackId: t, label: '' })
    db.exec('DELETE FROM media_item WHERE id = 1; DELETE FROM wrestling_wrestler WHERE id = 1')
    expect(rawLinks()).toHaveLength(0)
  })

  it('keeps the link as missing when its music row is deleted', () => {
    const t = track('A', 'B', 'C')
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t, label: 'OST' })
    links.create({ owner: { mediaId: 1 }, kind: 'album', albumId: album('A', 'B'), label: 'OST' })
    // The album cascade deletes the track too; neither may trip a CHECK.
    db.exec(`DELETE FROM music_album WHERE dir_path = 'A/B'`)
    const list = links.listForOwner({ mediaId: 1 })
    expect(list.map((l) => [l.kind, l.missing, l.tracks.length])).toEqual([
      ['track', true, 0],
      ['album', true, 0]
    ])
    expect(list[0].snapshot.title).toBe('C')
  })
})

describe('re-attaching after a rescan', () => {
  // A move is a prune of the old row and an insert of a new one.
  function move(trackId: number, artistName: string, albumTitle: string, title: string, duration = 200): number {
    db.prepare('DELETE FROM music_track WHERE id = ?').run(trackId)
    return track(artistName, albumTitle, title, { duration })
  }

  it('moves a track link to the same recording in a renamed file', () => {
    const t = track('Radiohead', 'OK Computer', 'Airbag')
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: t, label: 'OST' })
    db.prepare('DELETE FROM music_track WHERE id = ?').run(t)
    const fresh = Number(
      db.prepare(`INSERT INTO music_track (album_id, artist_id, file_path, title, duration) VALUES (?, ?, 'Radiohead/OK Computer/01 Airbag.flac', 'Airbag', 200)`)
        .run(album('Radiohead', 'OK Computer'), artist('Radiohead')).lastInsertRowid
    )
    expect(links.reattachOrphans()).toBe(1)
    expect(links.listForOwner({ mediaId: 3 })[0].tracks.map((x) => x.id)).toEqual([fresh])
  })

  it('treats a remaster and a year-prefixed album folder as the same recording', () => {
    const t = track('Radiohead', 'OK Computer', 'Airbag')
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: t, label: '' })
    const fresh = move(t, 'Radiohead', '1997 - OK Computer', 'Airbag (Remastered)')
    links.reattachOrphans()
    expect(links.listForOwner({ mediaId: 3 })[0].tracks[0]?.id).toBe(fresh)
  })

  it('never re-attaches to a live version', () => {
    const t = track('Radiohead', 'OK Computer', 'Airbag')
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: t, label: '' })
    move(t, 'Radiohead', 'OK Computer', 'Airbag (Live)')
    expect(links.reattachOrphans()).toBe(0)
    expect(links.listForOwner({ mediaId: 3 })[0].missing).toBe(true)
  })

  it('leaves an ambiguous match missing', () => {
    const t = track('Radiohead', 'OK Computer', 'Airbag')
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: t, label: '' })
    db.prepare('DELETE FROM music_track WHERE id = ?').run(t)
    track('Radiohead', 'Best Of', 'Airbag')
    track('Radiohead', 'Greatest Hits', 'Airbag', { duration: 201 })
    expect(links.reattachOrphans()).toBe(0)
  })

  it('falls back to artist, title and length when the album folder was renamed', () => {
    const t = track('Radiohead', 'OK Computer', 'Airbag', { duration: 284 })
    links.create({ owner: { mediaId: 3 }, kind: 'track', trackId: t, label: '' })
    const fresh = move(t, 'Radiohead', 'OKNOTOK', 'Airbag', 285)
    links.reattachOrphans()
    expect(links.listForOwner({ mediaId: 3 })[0].tracks[0]?.id).toBe(fresh)
  })

  it('re-attaches an album link to a renamed album folder', () => {
    track('Cliff Martinez', 'Drive OST', 'Rubber Head')
    links.create({ owner: { mediaId: 3 }, kind: 'album', albumId: album('Cliff Martinez', 'Drive OST'), label: '' })
    db.exec(`DELETE FROM music_album WHERE dir_path = 'Cliff Martinez/Drive OST'`)
    db.prepare('INSERT INTO music_album (artist_id, title, dir_path) VALUES (?, ?, ?)').run(
      artist('Cliff Martinez'),
      'Drive OST',
      'Cliff Martinez/(2011) Drive OST'
    )
    expect(links.reattachOrphans()).toBe(1)
    expect(links.listForOwner({ mediaId: 3 })[0].missing).toBe(false)
  })

  it('drops an orphan when the user already linked the new row the same way', () => {
    const t = track('A', 'B', 'C')
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t, label: 'OST' })
    const fresh = move(t, 'A', 'B', 'C')
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: fresh, label: 'OST' })
    links.reattachOrphans()
    expect(rawLinks().map((r) => r.track_id)).toEqual([fresh])
  })

  it('refreshes snapshots from current tags so a later move matches', () => {
    const t = track('A', 'B', 'Old title')
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: t, label: '' })
    db.prepare("UPDATE music_track SET title = 'New title' WHERE id = ?").run(t)
    links.refreshSnapshots()
    expect(rawLinks()[0].snap_title).toBe('New title')
  })
})

describe('Soundtracks browse', () => {
  it('groups links by title and wrestler with counts', () => {
    track('S', 'P5', 'One')
    track('S', 'P5', 'Two')
    links.create({ owner: { mediaId: 1 }, kind: 'album', albumId: album('S', 'P5'), label: 'OST' })
    const gone = track('S', 'P5', 'Three')
    links.create({ owner: { mediaId: 1 }, kind: 'track', trackId: gone, label: 'Opening' })
    db.prepare('DELETE FROM music_track WHERE id = ?').run(gone)
    links.create({ owner: { wrestlerId: 1 }, kind: 'track', trackId: track('J', 'W', 'Glass'), label: 'Entrance' })
    expect(links.browse()).toEqual([
      expect.objectContaining({ mediaId: 1, mediaType: 'game', title: 'Persona 5', linkCount: 2, trackCount: 2, missingCount: 1, labels: ['OST', 'Opening'] }),
      expect.objectContaining({ wrestlerId: 1, mediaType: null, title: 'Stone Cold', linkCount: 1, trackCount: 1, missingCount: 0 })
    ])
  })
})
