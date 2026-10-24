import type { MediaType } from '@shared/types'
import { movieVideoRootDir, tvVideoRootDir, videoRootDir, wrestlingRootDir } from '../files'
import { getSqlite } from '../db/connection'

// Which library a set of scanned video files belongs to. The scanner is
// parameterized by one of these rather than forked, so wrestling reuses the
// walk, the probe pool, the destructive-sync guard and the upsert verbatim —
// the books-reuses-manga.ts:rootInfoFor move, crossed with listRepo's KIND map.
//
// Table and column names come from this fixed map, NEVER from caller input, so
// interpolating them into SQL is safe (the listRepo.KIND rule).

export type VideoScopeId = 'video' | 'wrestling'

export interface VideoScopeOwner {
  title: string
}

// Where one owner's files live: the root they are stored relative to and the
// navimg prefix that serves them. Anime, movies and TV each have a root, so a
// media-library owner's place follows its media type; a wrestling owner's is
// fixed.
export interface VideoPlace {
  prefix: 'video' | 'movies' | 'tv' | 'wrestling' // navimg virtual prefix
  settingKey: 'video.dir' | 'video.movieDir' | 'video.tvDir' | 'wrestling.dir'
  // Movie and TV roots fall back to video.dir while unset, so titles linked
  // before they had roots of their own still resolve where they were linked.
  fallbackKey: 'video.dir' | null
  mediaType: MediaType | null
  root: () => string
  label: string // used in error copy ("... the movie library root")
}

export interface VideoScope {
  id: VideoScopeId
  table: 'video_file' | 'wrestling_video'
  ownerCol: 'media_id' | 'event_id'
  ownerTable: 'media_item' | 'wrestling_event'
  // A null owner (a loose wrestling file) takes the scope's default place.
  place: (ownerId: number | null) => VideoPlace
  owner: (ownerId: number) => VideoScopeOwner | null
}

export function videoPlaceFor(mediaType: MediaType | null): VideoPlace {
  if (mediaType === 'movie') {
    return {
      prefix: 'movies',
      settingKey: 'video.movieDir',
      fallbackKey: 'video.dir',
      mediaType,
      root: () => movieVideoRootDir(),
      label: 'movie'
    }
  }
  if (mediaType === 'tv') {
    return {
      prefix: 'tv',
      settingKey: 'video.tvDir',
      fallbackKey: 'video.dir',
      mediaType,
      root: () => tvVideoRootDir(),
      label: 'TV'
    }
  }
  return {
    prefix: 'video',
    settingKey: 'video.dir',
    fallbackKey: null,
    mediaType,
    root: () => videoRootDir(),
    label: 'video'
  }
}

const WRESTLING_PLACE: VideoPlace = {
  prefix: 'wrestling',
  settingKey: 'wrestling.dir',
  fallbackKey: null,
  mediaType: null,
  root: () => wrestlingRootDir(),
  label: 'wrestling'
}

function mediaTypeOf(mediaId: number | null): MediaType | null {
  if (mediaId == null) return null
  const row = getSqlite().prepare('SELECT media_type FROM media_item WHERE id = ?').get(mediaId) as
    | { media_type: MediaType }
    | undefined
  return row?.media_type ?? null
}

export const VIDEO_SCOPES: Record<VideoScopeId, VideoScope> = {
  video: {
    id: 'video',
    table: 'video_file',
    ownerCol: 'media_id',
    ownerTable: 'media_item',
    place: (ownerId) => videoPlaceFor(mediaTypeOf(ownerId)),
    owner: (ownerId) => {
      if (ownerId == null) return null
      const row = getSqlite().prepare('SELECT title FROM media_item WHERE id = ?').get(ownerId) as
        | { title: string }
        | undefined
      return row ? { title: row.title } : null
    }
  },
  wrestling: {
    id: 'wrestling',
    table: 'wrestling_video',
    ownerCol: 'event_id',
    ownerTable: 'wrestling_event',
    place: () => WRESTLING_PLACE,
    owner: (ownerId) => {
      const row = getSqlite()
        .prepare('SELECT name FROM wrestling_event WHERE id = ?')
        .get(ownerId) as { name: string } | undefined
      return row ? { title: row.name } : null
    }
  }
}
