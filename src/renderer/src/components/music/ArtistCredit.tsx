import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { MusicArtist } from '@shared/types'
import { artistKey, linkArtistCredit } from '@shared/artistCredit'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'

// One lookup per artists payload, shared by every row that renders a credit.
const lookups = new WeakMap<MusicArtist[], Map<string, number>>()
function lookupFor(artists: MusicArtist[]): Map<string, number> {
  let map = lookups.get(artists)
  if (!map) {
    map = new Map()
    for (const a of artists) if (!map.has(artistKey(a.name))) map.set(artistKey(a.name), a.id)
    lookups.set(artists, map)
  }
  return map
}

// A multi-artist credit with each library artist linked separately. Names with
// no library artist stay plain text; when no name matches at all, the whole
// credit links to the track's folder artist, as before.
export default function ArtistCredit({
  credit,
  artistId,
  className = 'hover:text-accent'
}: {
  credit: string
  artistId?: number | null
  className?: string
}) {
  const { pathname } = useLocation()
  const { data: artists } = useQuery({
    queryKey: qk.music.artists(''),
    queryFn: () => api.music.artists()
  })
  const parts = useMemo(
    () => (artists ? linkArtistCredit(credit, (key) => lookupFor(artists).get(key)) : []),
    [artists, credit]
  )
  const link = (id: number, text: string, key?: number) => {
    const to = `/music/artists/${id}`
    // A link to the page already open would only stack a duplicate history entry.
    if (pathname === to) return <span key={key}>{text}</span>
    return (
      <Link key={key} to={to} className={className}>
        {text}
      </Link>
    )
  }
  if (!parts.some((p) => p.artistId != null)) {
    return artistId != null ? link(artistId, credit) : <>{credit}</>
  }
  return <>{parts.map((p, i) => (p.artistId != null ? link(p.artistId, p.text, i) : <span key={i}>{p.text}</span>))}</>
}
