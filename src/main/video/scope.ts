import { videoRootDir, wrestlingRootDir } from '../files'
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

export interface VideoScope {
  id: VideoScopeId
  table: 'video_file' | 'wrestling_video'
  ownerCol: 'media_id' | 'event_id'
  ownerTable: 'media_item' | 'wrestling_event'
  prefix: 'video' | 'wrestling' // navimg virtual prefix
  settingKey: 'video.dir' | 'wrestling.dir'
  root: () => string
  label: string // used in error copy ("... the video library root")
  owner: (ownerId: number) => VideoScopeOwner | null
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
    prefix: 'wrestling',
    settingKey: 'wrestling.dir',
    root: wrestlingRootDir,
    label: 'wrestling',
    owner: (ownerId) => {
      const row = getSqlite()
        .prepare('SELECT name FROM wrestling_event WHERE id = ?')
        .get(ownerId) as { name: string } | undefined
      return row ? { title: row.name } : null
    }
  }
}
