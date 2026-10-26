import { useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicLinkOwner, MusicLinkOwnerCandidate, MusicLinkTarget, MusicLinkUsage } from '@shared/types'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDebouncedValue } from '../../lib/hooks'
import { confirmDialog } from '../../lib/confirm'
import { toastError } from '../../lib/toast'
import { configFor, pathForMedia } from '../../lib/mediaConfig'
import Dialog from '../Dialog'
import { Field } from '../Field'
import CoverImage from '../CoverImage'
import { ResultButton, ResultGroup, themeOptionLabel } from './LinkMusicDialog'

// What the dialog links: one or more songs, or a whole album.
export type LinkSubject =
  | { kind: 'tracks'; trackIds: number[]; title: string }
  | { kind: 'album'; albumId: number; title: string }

type Owner = Pick<MusicLinkOwnerCandidate, 'mediaId' | 'wrestlerId' | 'mediaType'>

const ownerOf = (o: Owner): MusicLinkOwner =>
  o.mediaId != null ? { mediaId: o.mediaId } : { wrestlerId: o.wrestlerId as number }
const ownerKey = (o: Owner): string => (o.mediaId != null ? `m${o.mediaId}` : `w${o.wrestlerId}`)
const ownerType = (o: Owner): string => (o.mediaType ? configFor(o.mediaType).singular : 'Wrestler')
const ownerPath = (o: Owner): string =>
  o.mediaId != null
    ? `${pathForMedia({ id: o.mediaId, mediaType: o.mediaType ?? 'anime' })}?tab=music`
    : `/wrestling/wrestler/${o.wrestlerId}`
const songs = (n: number): string => `${n} ${n === 1 ? 'song' : 'songs'}`
const asLabel = (label: string): string => (label ? ` as “${label}”` : '')

export function linkedMessage(title: string, label: string, added: number, skipped: number): string {
  if (added === 0) return `${skipped === 1 ? 'Already' : 'All already'} linked to ${title}${asLabel(label)}.`
  const what = added === 1 && skipped === 0 ? '' : ` ${songs(added)}`
  const rest = skipped > 0 ? `; ${skipped} ${skipped === 1 ? 'was' : 'were'} already there` : ''
  return `Linked${what} to ${title}${asLabel(label)}${rest}.`
}

// The song side of Music links: link songs or an album to a library title or a
// wrestler (the same media_music_link rows the title's Music tab makes). One
// song or an album also shows what it is already linked to. The dialog stays
// open so the same music can go to several titles; Done closes it.
export default function LinkToTitleDialog({
  subject,
  onClose
}: {
  subject: LinkSubject
  onClose: () => void
}) {
  const id = useId()
  const qc = useQueryClient()
  const [query, setQuery] = useState('')
  const [pick, setPick] = useState<MusicLinkOwnerCandidate | null>(null)
  const [label, setLabel] = useState('')
  const [themeId, setThemeId] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const debounced = useDebouncedValue(query.trim(), 250)

  const target: MusicLinkTarget | null =
    subject.kind === 'album'
      ? { albumId: subject.albumId }
      : subject.trackIds.length === 1
        ? { trackId: subject.trackIds[0] }
        : null
  const usages = useQuery({
    queryKey: qk.music.links.usages(target ?? { trackId: 0 }),
    queryFn: () => api.musicLinks.usages(target as MusicLinkTarget),
    enabled: target != null
  })
  const results = useQuery({
    queryKey: qk.music.links.owners(debounced),
    queryFn: () => api.musicLinks.searchOwners(debounced),
    enabled: debounced.length > 0
  })
  const { data: labels = [] } = useQuery({
    queryKey: qk.music.links.labels,
    queryFn: () => api.musicLinks.labels()
  })
  // One song linked to an anime may be the full version of one of its themes.
  const themeAnime = subject.kind === 'tracks' && subject.trackIds.length === 1 && pick?.mediaType === 'anime'
    ? pick.mediaId
    : null
  const { data: themeDetail } = useQuery({
    queryKey: qk.media.detail(themeAnime ?? 0),
    queryFn: () => api.media.get(themeAnime as number),
    enabled: themeAnime != null
  })
  const themes = themeAnime != null ? themeDetail?.themes ?? [] : []

  const linkedOwners = new Set(
    (usages.data ?? []).filter((u) => !u.viaAlbum).map((u) => ownerKey(u))
  )

  async function submit(): Promise<void> {
    if (!pick || busy) return
    setBusy(true)
    try {
      const owner = ownerOf(pick)
      if (subject.kind === 'album') {
        await api.musicLinks.create({ owner, kind: 'album', albumId: subject.albumId, label })
        setStatus(linkedMessage(pick.title, label.trim(), 1, 0))
      } else {
        const result = await api.musicLinks.linkTracks({
          owner,
          trackIds: subject.trackIds,
          label,
          themeSongId: themes.length > 0 && themeId ? Number(themeId) : null
        })
        setStatus(linkedMessage(pick.title, label.trim(), result.added, result.skipped))
      }
      await qc.invalidateQueries({ queryKey: qk.music.links.all })
      setPick(null)
      setThemeId('')
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  async function unlink(u: MusicLinkUsage): Promise<void> {
    const ok = await confirmDialog(
      `Unlink “${subject.title}” from ${u.ownerTitle}${asLabel(u.label)}? The music stays in your library.`,
      { confirmLabel: 'Unlink' }
    )
    if (!ok) return
    try {
      await api.musicLinks.remove(u.linkId)
      await qc.invalidateQueries({ queryKey: qk.music.links.all })
    } catch (e) {
      toastError(e)
    }
  }

  const heading =
    subject.kind === 'album'
      ? `Link the album “${subject.title}” to a title`
      : subject.trackIds.length === 1
        ? `Link “${subject.title}” to a title`
        : `Link ${songs(subject.trackIds.length)} to a title`
  const owners = results.data ?? []

  // Portalled: it opens from the player bar (a backdrop-filter in some theme
  // styles makes it the containing block of `fixed` children) and from the
  // selection bar's sticky z-20 wrapper, either of which would trap the modal.
  return createPortal(
    <Dialog
      labelledBy={id}
      onClose={onClose}
      panelClassName="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-lg border border-line-subtle bg-surface-panel p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id={id} className="min-w-0 text-lg font-semibold">
          {heading}
        </h2>
        <button className="btn-ghost" onClick={onClose} aria-label="Close" title="Close">
          ✕
        </button>
      </div>

      {target && (
        <section className="mb-4" aria-labelledby={`${id}-linked`}>
          <h3 id={`${id}-linked`} className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Linked to
          </h3>
          {usages.isError ? (
            <p role="alert" className="text-sm text-red-400">
              Could not read its links.
            </p>
          ) : usages.isLoading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : usages.data?.length ? (
            <ul className="max-h-40 space-y-1 overflow-y-auto">
              {usages.data.map((u) => (
                <li key={u.linkId} className="flex items-center gap-3 rounded-md px-2 py-1">
                  <CoverImage path={u.coverPath} alt="" className="h-9 w-9 shrink-0" fallback="music" thumbWidth={96} />
                  <span className="min-w-0 flex-1">
                    <Link to={ownerPath(u)} onClick={onClose} className="block truncate text-sm hover:text-accent hover:underline">
                      {u.ownerTitle}
                    </Link>
                    <span className="block truncate text-xs text-gray-400">
                      {[ownerType(u), u.label || 'Unlabelled', u.viaAlbum ? 'through its album' : null]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </span>
                  {!u.viaAlbum && (
                    <button
                      type="button"
                      className="btn-ghost shrink-0 py-1 text-sm"
                      aria-label={`Unlink from ${u.ownerTitle}${asLabel(u.label)}`}
                      onClick={() => void unlink(u)}
                    >
                      Unlink
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Not linked to anything yet.</p>
          )}
        </section>
      )}

      <Field label="Search your library" description="A title of any type, or a wrestler.">
        <input
          className="input w-full"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Field>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1" aria-busy={results.isFetching}>
        {debounced.length === 0 ? (
          <p className="text-sm text-gray-400">Search to find a title or a wrestler.</p>
        ) : results.isError ? (
          <p role="alert" className="text-sm text-red-400">
            Could not search your library.
          </p>
        ) : results.isLoading ? (
          <p className="text-sm text-gray-400">Searching…</p>
        ) : owners.length === 0 ? (
          <p className="text-sm text-gray-400">Nothing in your library matches.</p>
        ) : (
          <ResultGroup title="Titles and wrestlers">
            {owners.map((o) => (
              <ResultButton
                key={ownerKey(o)}
                selected={pick != null && ownerKey(pick) === ownerKey(o)}
                linked={linkedOwners.has(ownerKey(o))}
                onSelect={() => {
                  setPick(o)
                  setThemeId('')
                }}
                cover={o.coverPath}
                title={o.title}
                detail={[ownerType(o), o.year].filter(Boolean).join(' · ')}
              />
            ))}
          </ResultGroup>
        )}
      </div>

      <form
        className="mt-4 space-y-3 border-t border-line-subtle pt-4"
        onSubmit={(e) => {
          e.preventDefault()
          void submit()
        }}
      >
        <p className="text-sm text-gray-300" aria-live="polite">
          {pick ? `Selected: ${pick.title} (${ownerType(pick)})` : 'Select a title or a wrestler above.'}
        </p>
        <div className="flex flex-wrap gap-3">
          <Field
            className="min-w-[14rem] flex-1"
            label="Label"
            description="Optional. For example OST, Opening, or the episode it plays in."
          >
            <input
              className="input w-full"
              list={`${id}-labels`}
              maxLength={80}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </Field>
          <datalist id={`${id}-labels`}>
            {labels.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
          {themes.length > 0 && (
            <Field className="min-w-[14rem] flex-1" label="Full version of">
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
        </div>
        <div className="flex items-center justify-end gap-2">
          <p className="mr-auto text-xs text-gray-400" role="status">
            {status}
          </p>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Done
          </button>
          <button type="submit" className="btn-primary" disabled={!pick || busy}>
            Link
          </button>
        </div>
      </form>
    </Dialog>,
    document.body
  )
}
