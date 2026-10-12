import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { MediaItem, MusicLink } from '@shared/types'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { usePlayerControls } from '../../lib/player'
import { musicTrackToPlayerTrack, playTracks } from '../../lib/musicTracks'
import { pathForMedia } from '../../lib/mediaConfig'
import CoverImage from '../CoverImage'
import { PlayIcon } from '../PlayerIcons'
import { linkedTracks } from './LinkedMusicSection'

// A franchise page's music: everything linked on its matched entries' Music
// tabs, grouped by entry in the franchise's own order. Hidden when empty.
export default function FranchiseMusic({
  entries,
  accent
}: {
  // Matched library items in the franchise's entry order.
  entries: { title: string; item: MediaItem }[]
  accent: string
}) {
  const player = usePlayerControls()
  const ids = useMemo(() => [...new Set(entries.map((e) => e.item.id))].sort((a, b) => a - b), [entries])
  const { data: links = [] } = useQuery({
    queryKey: qk.music.links.franchise(ids),
    queryFn: () => api.musicLinks.forMediaIds(ids),
    enabled: ids.length > 0
  })
  const groups = useMemo(() => {
    const byMedia = new Map<number, MusicLink[]>()
    for (const l of links) if (l.mediaId != null) byMedia.set(l.mediaId, [...(byMedia.get(l.mediaId) ?? []), l])
    const seen = new Set<number>()
    return entries.flatMap((e) => {
      const list = byMedia.get(e.item.id)
      if (!list || seen.has(e.item.id)) return []
      seen.add(e.item.id)
      return [{ item: e.item, links: list }]
    })
  }, [entries, links])
  const all = linkedTracks(groups.flatMap((g) => g.links))
  if (groups.length === 0) return null

  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-lg font-semibold">Music</h2>
        <button className="btn-ghost" onClick={() => playTracks(player, all)} disabled={!all.length} title="Play all" aria-label="Play all franchise music">
          <PlayIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {groups.map(({ item, links: list }) => {
          const tracks = linkedTracks(list)
          return (
            <div key={item.id} className="card p-3">
              <div className="mb-2 flex items-center gap-2">
                <Link
                  to={`${pathForMedia(item)}?tab=music`}
                  className="min-w-0 flex-1 truncate text-sm font-semibold hover:underline"
                  style={{ color: accent }}
                >
                  {item.title}
                </Link>
                <button
                  className="btn-ghost"
                  onClick={() => playTracks(player, tracks)}
                  disabled={!tracks.length}
                  title="Play"
                  aria-label={`Play music linked to ${item.title}`}
                >
                  <PlayIcon className="h-4 w-4" />
                </button>
              </div>
              <ul className="space-y-1">
                {list.map((l) => {
                  const name = l.kind === 'album' ? l.album?.title ?? l.snapshot.album : l.tracks[0]?.title ?? l.snapshot.title
                  const cover = l.album?.coverPath ?? l.tracks[0]?.coverPath ?? null
                  const detail = l.missing
                    ? 'missing from the music library'
                    : l.kind === 'album'
                      ? `Album · ${l.tracks.length} ${l.tracks.length === 1 ? 'track' : 'tracks'}`
                      : l.tracks[0]?.artistName
                  return (
                    <li key={l.id}>
                      <button
                        className="flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left hover:bg-base-700 disabled:opacity-60"
                        disabled={l.missing}
                        onClick={() => {
                          const start = Math.max(0, all.findIndex((t) => t.id === l.tracks[0]?.id))
                          player.playQueue(all.map(musicTrackToPlayerTrack), start)
                        }}
                      >
                        <CoverImage path={cover} alt="" className="h-8 w-8 shrink-0" fallback="music" thumbWidth={160} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm">{name}</span>
                          <span className="block truncate text-xs text-gray-400">
                            {[l.label, detail].filter(Boolean).join(' · ')}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
