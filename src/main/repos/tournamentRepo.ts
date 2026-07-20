import { getSqlite } from '../db/connection'
import * as listRepo from './listRepo'
import * as mediaRepo from './mediaRepo'
import * as musicRepo from './musicRepo'
import * as peopleRepo from './peopleRepo'
import * as quizRepo from './quizRepo'
import type { MusicTrack, TournamentEntry, TournamentSource } from '@shared/types'

// The tournament contender pool: one source description in, a normalized
// entry list out, so the bracket UI never cares where contenders came from.
// Like songPool, this returns the WHOLE matching set — the renderer shuffles
// and caps it, which also lets "run it back" resample without a refetch.
// Every branch delegates to the owning repo; only characters need their own
// SQL (mediaRepo.get is the full detail payload — far too heavy for this).

function fromTrack(t: MusicTrack): TournamentEntry {
  return {
    key: `music-${t.id}`,
    entryKind: 'music',
    name: t.title,
    subtitle: t.tagArtist ?? t.artistName,
    imagePath: t.coverPath,
    // Track file_path is stored relative to the music root; the player
    // resolves 'music/…' via files.resolveUrl (same prefix as musicTracks.ts).
    audioPath: `music/${t.filePath}`,
    audioUrl: null
  }
}

export function tournamentPool(source: TournamentSource): TournamentEntry[] {
  switch (source.kind) {
    case 'music': {
      let tracks: MusicTrack[]
      switch (source.scope) {
        case 'all':
          tracks = musicRepo.listTracks({})
          break
        case 'liked':
          tracks = musicRepo.listTracks({ likedOnly: true })
          break
        case 'playlist':
          tracks = musicRepo.getPlaylist(source.id)?.items.map((i) => i.track) ?? []
          break
        case 'artist':
          tracks = musicRepo.artistTracks(source.id)
          break
        case 'album':
          tracks = musicRepo.getAlbum(source.id)?.tracks ?? []
          break
      }
      return tracks.map(fromTrack)
    }

    case 'themes':
      return quizRepo.songPool(source.filter ?? {}).map((s) => ({
        key: `theme-${s.themeId}`,
        entryKind: 'theme',
        name: s.title ?? s.slug ?? 'Theme',
        subtitle: [s.animeTitle, s.artists.join(', ')].filter(Boolean).join(' · '),
        imagePath: s.coverPath,
        audioPath: s.audioPath,
        audioUrl: s.audioUrl
      }))

    case 'characters': {
      const db = getSqlite()
      // With no media filter the subtitle is the character's first linked
      // title — duplicate names across shows are common, so head-to-head
      // cards need the disambiguation. Native name is the fallback.
      const rows = (
        source.mediaId
          ? db
              .prepare(
                `SELECT ch.id, ch.name, ch.name_native, ch.image_path, NULL AS media_title
                 FROM media_character mc
                 JOIN character ch ON ch.id = mc.character_id
                 WHERE mc.media_id = ?
                 ORDER BY COALESCE(mc.sort_order, 9999) ASC, ch.id ASC`
              )
              .all(source.mediaId)
          : db
              .prepare(
                `SELECT ch.id, ch.name, ch.name_native, ch.image_path,
                        (SELECT mi.title FROM media_character mc
                         JOIN media_item mi ON mi.id = mc.media_id
                         WHERE mc.character_id = ch.id
                         ORDER BY mc.id ASC LIMIT 1) AS media_title
                 FROM character ch
                 ORDER BY ch.name COLLATE NOCASE ASC`
              )
              .all()
      ) as {
        id: number
        name: string
        name_native: string | null
        image_path: string | null
        media_title: string | null
      }[]
      return rows.map((r) => ({
        key: `character-${r.id}`,
        entryKind: 'character',
        name: r.name,
        subtitle: r.media_title ?? r.name_native,
        imagePath: r.image_path,
        audioPath: null,
        audioUrl: null
      }))
    }

    case 'media':
      return mediaRepo
        .list({ mediaType: source.mediaType, status: source.status ?? null })
        .map((m) => ({
          key: `media-${m.id}`,
          entryKind: 'media',
          name: m.title,
          subtitle: m.releaseDate?.slice(0, 4) ?? null,
          imagePath: m.coverPath,
          audioPath: null,
          audioUrl: null
        }))

    case 'people':
      return peopleRepo.list(undefined, source.role ?? undefined).map((p) => ({
        key: `person-${p.id}`,
        entryKind: 'person',
        name: p.name,
        subtitle: p.nameNative,
        imagePath: p.photoPath,
        audioPath: null,
        audioUrl: null
      }))

    case 'list': {
      const detail = listRepo.get(source.listId)
      if (!detail) return []
      return detail.items.map((e) => ({
        key: `${detail.kind}-${e.entityId}`,
        entryKind: detail.kind,
        name: e.name,
        subtitle: e.subtitle,
        imagePath: e.imagePath,
        audioPath: null,
        audioUrl: null
      }))
    }
  }
}
