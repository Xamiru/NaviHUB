// The playlists songs were last added to, newest first — the Add-to-playlist
// picker's Recent group and the row menu's one-click "Add to <playlist>".
// A per-machine convenience in localStorage (the listSortPrefs idiom): the
// title is a cached label only, refreshed whenever the picker lists the real
// playlists, and a deleted playlist simply drops out.

export interface RecentPlaylist {
  id: number
  title: string
}

const KEY = 'music.recentPlaylists'
export const RECENT_PLAYLIST_LIMIT = 5

export function loadRecentPlaylists(): RecentPlaylist[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (p): p is RecentPlaylist =>
          !!p && typeof p === 'object' && Number.isInteger(p.id) && typeof p.title === 'string'
      )
      .slice(0, RECENT_PLAYLIST_LIMIT)
  } catch {
    return []
  }
}

function save(list: RecentPlaylist[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, RECENT_PLAYLIST_LIMIT)))
  } catch {
    // Storage unavailable: the picker just has no Recent group.
  }
}

export function rememberPlaylist(playlist: RecentPlaylist): void {
  save([playlist, ...loadRecentPlaylists().filter((p) => p.id !== playlist.id)])
}

export function forgetPlaylist(id: number): void {
  save(loadRecentPlaylists().filter((p) => p.id !== id))
}

// Drop deleted playlists and pick up renames from a fresh list of the real ones.
export function syncRecentPlaylists(existing: RecentPlaylist[]): RecentPlaylist[] {
  const byId = new Map(existing.map((p) => [p.id, p.title]))
  const current = loadRecentPlaylists()
  const next = current.filter((p) => byId.has(p.id)).map((p) => ({ id: p.id, title: byId.get(p.id)! }))
  if (next.length !== current.length || next.some((p, i) => p.title !== current[i].title)) save(next)
  return next
}
