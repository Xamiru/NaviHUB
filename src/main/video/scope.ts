import { videoRootDir, wrestlingRootDir } from '../files'
import { getSqlite } from '../db/connection'
import type { MediaType } from '@shared/types'

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
  // Where the player's Back should land. Built here because main already mints
  // renderer routes for opened files (openFile.ts:routeFor).
  backPath: string
  // Only the media scope has these; wrestling events are not media_item rows.
  mediaId: number | null
  mediaType: MediaType | null
}

export interface VideoScope {
  id: VideoScopeId
  table: 'video_file' | 'wrestling_video'
  ownerCol: 'media_id' | 'event_id'
  ownerTable: 'media_item' | 'wrestling_event'
  prefix: 'video' | 'wrestling' // navimg virtual prefix
  settingKey: 'video.dir' | 'wrestling.dir'
  root: () => string
  label: string // used in error copy ("... the video library root")
  // ownerId is null for a LOOSE wrestling file (a rip with no PPV behind it).
  owner: (ownerId: number | null) => VideoScopeOwner | null
}

export const VIDEO_SCOPES: Record<VideoScopeId, VideoScope> = {
  video: {
    id: 'video',
    table: 'video_file',
    ownerCol: 'media_id',
    ownerTable: 'media_item',
    prefix: 'video',
    settingKey: 'video.dir',
    root: videoRootDir,
    label: 'video',
    owner: (ownerId) => {
      if (ownerId == null) return null
      const row = getSqlite()
        .prepare('SELECT title, media_type FROM media_item WHERE id = ?')
        .get(ownerId) as { title: string; media_type: MediaType } | undefined
      if (!row) return null
      return {
        title: row.title,
        backPath: `/${row.media_type === 'tv' ? 'tv' : row.media_type}/${ownerId}`,
        mediaId: ownerId,
        mediaType: row.media_type
      }
    }
  },
  wrestling: {
    id: 'wrestling',
    table: 'wrestling_video',
    ownerCol: 'event_id',
    ownerTable: 'wrestling_event',
    prefix: 'wrestling',
    settingKey: 'wrestling.dir',
    root: wrestlingRootDir,
    label: 'wrestling',
    owner: (ownerId) => {
      // A loose match's file belongs to no event; Back goes to the collection.
      if (ownerId == null) {
        return {
          title: 'Loose match',
          backPath: '/wrestling/collection',
          mediaId: null,
          mediaType: null
        }
      }
      const row = getSqlite()
        .prepare('SELECT name FROM wrestling_event WHERE id = ?')
        .get(ownerId) as { name: string } | undefined
      return row
        ? {
            title: row.name,
            backPath: `/wrestling/event/${ownerId}`,
            mediaId: null,
            mediaType: null
          }
        : null
    }
  }
}
