import { useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MediaType, MusicLinkOwner, SoundtrackOwner } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { usePersistedState } from '../lib/navState'
import { playTracks } from '../lib/musicTracks'
import { toastError } from '../lib/toast'
import { configFor, pathForMedia } from '../lib/mediaConfig'
import PageHeader from '../components/PageHeader'
import { Field } from '../components/Field'
import CoverImage from '../components/CoverImage'
import { PlayIcon } from '../components/PlayerIcons'
import LinkedMusicSection, { linkedTracks } from '../components/music/LinkedMusicSection'

type OwnerFilter = MediaType | 'wrestler' | 'all'

const ownerOf = (o: SoundtrackOwner): MusicLinkOwner =>
  o.mediaId != null ? { mediaId: o.mediaId } : { wrestlerId: o.wrestlerId as number }
const ownerKey = (o: SoundtrackOwner): string => (o.mediaId != null ? `m${o.mediaId}` : `w${o.wrestlerId}`)
const typeOf = (o: SoundtrackOwner): Exclude<OwnerFilter, 'all'> => o.mediaType ?? 'wrestler'
const typeLabel = (t: Exclude<OwnerFilter, 'all'>): string => (t === 'wrestler' ? 'Wrestling' : configFor(t).plural)

// Every title and wrestler with linked music, from the Music section's side.
export default function MusicSoundtracksPage() {
  const [filter, setFilter] = usePersistedState<OwnerFilter>('musicSoundtracksType', 'all')
  const [search, setSearch] = usePersistedState('musicSoundtracksSearch', '')
  const { data: owners = [], isLoading, isError, refetch } = useQuery({
    queryKey: qk.music.links.browse,
    queryFn: () => api.musicLinks.browse()
  })
  const types = useMemo(() => [...new Set(owners.map(typeOf))], [owners])
  const shown = useMemo(() => {
    const q = search.trim().toLocaleLowerCase()
    return owners.filter(
      (o) => (filter === 'all' || typeOf(o) === filter) && (!q || o.title.toLocaleLowerCase().includes(q))
    )
  }, [owners, filter, search])

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <PageHeader
        title="Soundtracks"
        subtitle="Music from your library linked to titles and wrestlers. Link more from a title's Music tab."
      />
      <div className="mb-5 flex flex-wrap items-end gap-3">
        <div role="group" aria-label="Show" className="flex flex-wrap gap-2">
          {(['all', ...types] as OwnerFilter[]).map((t) => (
            <button
              key={t}
              className={filter === t ? 'pill pill-active' : 'pill'}
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
            >
              {t === 'all' ? 'All' : typeLabel(t)}
            </button>
          ))}
        </div>
        <Field label="Search titles" hiddenLabel className="ml-auto w-full sm:w-64">
          <input
            className="input w-full"
            type="search"
            placeholder="Search titles"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Field>
      </div>
      {isError ? (
        <p role="alert" className="text-sm text-gray-300">
          Could not load soundtracks.{' '}
          <button className="btn" onClick={() => void refetch()}>
            Retry soundtracks
          </button>
        </p>
      ) : isLoading ? (
        <p className="text-sm text-gray-400">Loading soundtracks…</p>
      ) : owners.length === 0 ? (
        <p className="text-sm text-gray-400">
          Nothing linked yet. Open a title or a wrestler, go to its Music tab and choose Link music.
        </p>
      ) : shown.length === 0 ? (
        <p className="text-sm text-gray-400">No linked titles match.</p>
      ) : (
        <ul className="space-y-2">
          {shown.map((o) => (
            <OwnerRow key={ownerKey(o)} owner={o} />
          ))}
        </ul>
      )}
    </div>
  )
}

function OwnerRow({ owner }: { owner: SoundtrackOwner }) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const link = owner.mediaId != null
    ? `${pathForMedia({ id: owner.mediaId, mediaType: owner.mediaType ?? 'anime' })}?tab=music`
    : `/wrestling/wrestler/${owner.wrestlerId}`
  const facts = [
    typeLabel(typeOf(owner)),
    `${owner.trackCount} ${owner.trackCount === 1 ? 'track' : 'tracks'}`,
    owner.missingCount ? `${owner.missingCount} missing` : null
  ].filter(Boolean)

  async function play(): Promise<void> {
    try {
      const links = await qc.fetchQuery({
        queryKey: qk.music.links.owner(ownerOf(owner)),
        queryFn: () => api.musicLinks.forOwner(ownerOf(owner))
      })
      playTracks(player, linkedTracks(links))
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <li className="rounded-md bg-base-800">
      <div className="flex items-center gap-3 px-3 py-2">
        <CoverImage path={owner.coverPath} alt="" className="h-14 w-10 shrink-0" thumbWidth={160} />
        <div className="min-w-0 flex-1">
          <Link to={link} className="block truncate text-sm font-medium hover:text-accent">
            {owner.title}
          </Link>
          <p className="truncate text-xs text-gray-400">{facts.join(' · ')}</p>
          {owner.labels.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {owner.labels.slice(0, 6).map((l) => (
                <span key={l} className="chip text-xs">
                  {l}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          className="btn-ghost"
          onClick={() => void play()}
          disabled={owner.trackCount === 0}
          title="Play"
          aria-label={`Play music linked to ${owner.title}`}
        >
          <PlayIcon className="h-4 w-4" />
        </button>
        <button className="btn-ghost text-sm" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
          {open ? '▾' : '▸'} Music
        </button>
      </div>
      {open && (
        <div id={panelId} className="border-t border-line-subtle px-3 pt-3">
          <LinkedMusicSection owner={ownerOf(owner)} ownerTitle={owner.title} />
        </div>
      )}
    </li>
  )
}
