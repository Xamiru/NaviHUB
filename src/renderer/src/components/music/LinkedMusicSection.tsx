import { useId, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicLink, MusicLinkOwner, MusicTrack, ThemeSong } from '@shared/types'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { usePlayerControls } from '../../lib/player'
import { albumTrackNumbers, musicTrackToPlayerTrack, playTracks } from '../../lib/musicTracks'
import { confirmDialog } from '../../lib/confirm'
import { toastError } from '../../lib/toast'
import Section from '../Section'
import Dialog from '../Dialog'
import { Field } from '../Field'
import CoverImage from '../CoverImage'
import MusicTrackRow from '../MusicTrackRow'
import { SortableList, SortableRow, useOptimisticReorder } from '../SortableList'
import { PlayIcon, ShuffleIcon } from '../PlayerIcons'
import LinkMusicDialog, { themeOptionLabel } from './LinkMusicDialog'

type Row = MusicLink & { itemId: number }

// Links in display order: grouped by label, groups in the order their first
// link appears. Persisted order is this flattened list, so groups stay together.
export function groupLinks<T extends MusicLink>(links: T[]): { label: string; links: T[] }[] {
  const groups = new Map<string, T[]>()
  for (const link of links) groups.set(link.label, [...(groups.get(link.label) ?? []), link])
  return [...groups].map(([label, list]) => ({ label, links: list }))
}

// Every playable track of the links, in order, each once.
export function linkedTracks(links: MusicLink[]): MusicTrack[] {
  const seen = new Set<number>()
  return links.flatMap((l) => l.tracks).filter((t) => !seen.has(t.id) && !!seen.add(t.id))
}

export function useMusicLinks(owner: MusicLinkOwner) {
  return useQuery({
    queryKey: qk.music.links.owner(owner),
    queryFn: () => api.musicLinks.forOwner(owner)
  })
}

// The Music tab of a title or a wrestler: linked albums and tracks from the
// local music library, grouped by their free-text label.
export default function LinkedMusicSection({
  owner,
  ownerTitle,
  title = 'Music',
  themes = []
}: {
  owner: MusicLinkOwner
  ownerTitle: string
  title?: string
  themes?: ThemeSong[]
}) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const query = useMusicLinks(owner)
  const [linking, setLinking] = useState(false)
  const [editing, setEditing] = useState<MusicLink | null>(null)
  const ordered = useMemo(
    () => (query.data ? groupLinks(query.data).flatMap((g) => g.links.map((l) => ({ ...l, itemId: l.id }))) : undefined),
    [query.data]
  )
  const refresh = () => void qc.invalidateQueries({ queryKey: qk.music.links.all })
  const { items, sensors, onDragEnd } = useOptimisticReorder<Row>(
    ordered,
    (next) => api.musicLinks.reorder(owner, next.map((l) => l.id)),
    refresh
  )
  const groups = useMemo(() => groupLinks(items), [items])
  const tracks = linkedTracks(items)
  const themeById = new Map(themes.map((t) => [t.id, t]))

  async function unlink(link: MusicLink): Promise<void> {
    const name = link.kind === 'album' ? link.album?.title ?? link.snapshot.album : link.tracks[0]?.title ?? link.snapshot.title
    if (!(await confirmDialog(`Unlink “${name}” from ${ownerTitle}? The music stays in your library.`, { confirmLabel: 'Unlink' }))) return
    try {
      await api.musicLinks.remove(link.id)
    } catch (e) {
      toastError(e)
      return
    }
    refresh()
  }

  return (
    <Section
      className="mb-6"
      title={`${title}${items.length ? ` · ${items.length}` : ''}`}
      actions={
        <>
          {tracks.length > 0 && (
            <>
              <button className="btn-ghost" onClick={() => playTracks(player, tracks)} title="Play all" aria-label="Play all">
                <PlayIcon className="h-4 w-4" />
              </button>
              <button
                className="btn-ghost"
                onClick={() => playTracks(player, tracks, { shuffle: true })}
                title="Shuffle"
                aria-label="Shuffle"
              >
                <ShuffleIcon className="h-4 w-4" />
              </button>
            </>
          )}
          <button className="btn" onClick={() => setLinking(true)}>
            Link music
          </button>
        </>
      }
    >
      {query.isError ? (
        <p role="alert" className="text-sm text-gray-300">
          Could not load linked music.{' '}
          <button className="btn" onClick={() => void query.refetch()}>
            Retry linked music
          </button>
        </p>
      ) : query.isLoading ? (
        <p className="text-sm text-gray-400">Loading linked music…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-400">
          No music linked yet. Link albums or tracks from your music library, such as a soundtrack or a song used in it.
        </p>
      ) : (
        groups.map((group) => (
          <div key={group.label} className="mb-5">
            {(group.label || items.some((l) => l.label)) && (
              <h3 className="mb-2 text-sm font-semibold text-gray-300">{group.label || 'Unlabelled'}</h3>
            )}
            <SortableList ids={group.links.map((l) => l.itemId)} sensors={sensors} onDragEnd={onDragEnd} className="space-y-1">
              {group.links.map((link) => (
                <SortableRow key={link.id} id={link.itemId}>
                  {(handle) => (
                    <LinkRow
                      link={link}
                      handle={group.links.length > 1 ? handle : null}
                      theme={link.themeSongId != null ? themeById.get(link.themeSongId) ?? null : null}
                      onPlayFrom={(track) => {
                        const start = tracks.findIndex((t) => t.id === track.id)
                        player.playQueue(tracks.map(musicTrackToPlayerTrack), Math.max(0, start))
                      }}
                      onEdit={() => setEditing(link)}
                      onUnlink={() => void unlink(link)}
                    />
                  )}
                </SortableRow>
              ))}
            </SortableList>
          </div>
        ))
      )}
      {linking && (
        <LinkMusicDialog
          owner={owner}
          ownerTitle={ownerTitle}
          existing={items}
          themes={themes}
          onClose={() => setLinking(false)}
        />
      )}
      {editing && <EditLinkDialog link={editing} themes={themes} onClose={() => setEditing(null)} />}
    </Section>
  )
}

function LinkRow({
  link,
  handle,
  theme,
  onPlayFrom,
  onEdit,
  onUnlink
}: {
  link: MusicLink
  handle: ReactNode
  theme: ThemeSong | null
  onPlayFrom: (track: MusicTrack) => void
  onEdit: () => void
  onUnlink: () => void
}) {
  const player = usePlayerControls()
  const [open, setOpen] = useState(false)
  const listId = useId()
  const menuItems = [
    { label: 'Edit link…', onSelect: onEdit },
    { label: 'Unlink', onSelect: onUnlink }
  ]
  const themeNote = theme ? <span className="chip shrink-0 text-xs">Full version of {themeOptionLabel(theme)}</span> : null

  if (link.missing) {
    const s = link.snapshot
    return (
      <div className="flex items-center gap-3 rounded-md border border-dashed border-line-subtle px-3 py-2">
        {handle}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-gray-300">{s.title ?? s.album}</p>
          <p className="truncate text-xs text-gray-400">
            {[s.artist, s.title ? s.album : null].filter(Boolean).join(' · ')} · missing from the music library
          </p>
        </div>
        <button className="btn-ghost text-sm" onClick={onUnlink}>
          Unlink
        </button>
      </div>
    )
  }

  if (link.kind === 'track' && link.tracks[0]) {
    const track = link.tracks[0]
    return (
      <MusicTrackRow
        track={track}
        showAlbum
        leading={handle}
        trailing={themeNote}
        onPlay={() => onPlayFrom(track)}
        menuItems={menuItems}
      />
    )
  }

  const album = link.album
  if (!album) return null
  const numbers = albumTrackNumbers(link.tracks)
  return (
    <div className="rounded-md bg-base-800">
      <div className="flex items-center gap-3 px-2 py-2">
        {handle}
        <CoverImage path={album.coverPath} alt="" className="h-12 w-12 shrink-0" fallback="music" thumbWidth={160} />
        <div className="min-w-0 flex-1">
          <Link to={`/music/albums/${album.id}`} className="block truncate text-sm font-medium hover:text-accent">
            {album.title}
          </Link>
          <p className="truncate text-xs text-gray-400">
            {[album.artistName, album.year, `${album.trackCount} ${album.trackCount === 1 ? 'track' : 'tracks'}`]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
        <button
          className="btn-ghost"
          onClick={() => playTracks(player, link.tracks)}
          disabled={link.tracks.length === 0}
          title="Play album"
          aria-label={`Play ${album.title}`}
        >
          <PlayIcon className="h-4 w-4" />
        </button>
        <button
          className="btn-ghost text-sm"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '▾' : '▸'} Tracks
        </button>
        <button className="btn-ghost text-sm" onClick={onEdit}>
          Edit
        </button>
        <button className="btn-ghost text-sm" onClick={onUnlink}>
          Unlink
        </button>
      </div>
      {open && (
        <div id={listId} className="px-2 pb-2">
          {link.tracks.map((t, i) => (
            <MusicTrackRow
              key={t.id}
              track={t}
              index={numbers.get(t.id) ?? i + 1}
              showCover={false}
              hideArtist={album.artistName}
              onPlay={() => onPlayFrom(t)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function EditLinkDialog({ link, themes, onClose }: { link: MusicLink; themes: ThemeSong[]; onClose: () => void }) {
  const id = useId()
  const qc = useQueryClient()
  const [label, setLabel] = useState(link.label)
  const [themeId, setThemeId] = useState(link.themeSongId != null ? String(link.themeSongId) : '')
  const [busy, setBusy] = useState(false)
  const { data: labels = [] } = useQuery({
    queryKey: qk.music.links.labels,
    queryFn: () => api.musicLinks.labels()
  })
  const offerThemes = themes.length > 0 && link.kind === 'track'
  const name = link.kind === 'album' ? link.album?.title ?? link.snapshot.album : link.tracks[0]?.title ?? link.snapshot.title

  return (
    <Dialog
      labelledBy={id}
      onClose={onClose}
      panelClassName="w-full max-w-md rounded-lg border border-line-subtle bg-surface-panel p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id={id} className="text-lg font-semibold">
          Edit link: {name}
        </h2>
        <button className="btn-ghost" onClick={onClose} aria-label="Close" title="Close">
          ✕
        </button>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          setBusy(true)
          api.musicLinks
            .update(link.id, {
              label,
              ...(offerThemes ? { themeSongId: themeId ? Number(themeId) : null } : {})
            })
            .then(() => qc.invalidateQueries({ queryKey: qk.music.links.all }))
            .then(onClose)
            .catch(toastError)
            .finally(() => setBusy(false))
        }}
      >
        <Field label="Label" description="For example OST, Opening, or the episode it plays in.">
          <input
            className="input w-full"
            list={`${id}-labels`}
            maxLength={80}
            autoFocus
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </Field>
        <datalist id={`${id}-labels`}>
          {labels.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
        {offerThemes && (
          <Field label="Full version of">
            <select className="input w-full" value={themeId} onChange={(e) => setThemeId(e.target.value)}>
              <option value="">No theme song</option>
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {themeOptionLabel(t)}
                </option>
              ))}
            </select>
          </Field>
        )}
        <div className="flex justify-end gap-2">
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={busy}>
            Save link
          </button>
        </div>
      </form>
    </Dialog>
  )
}
