import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { confirmDialog } from '../../lib/confirm'
import { useDebouncedValue } from '../../lib/hooks'
import { toastError } from '../../lib/toast'
import Dialog from '../Dialog'
import CoverImage from '../CoverImage'
import FavoriteButton from '../FavoriteButton'
import AddToListMenu from '../AddToListMenu'
import { Field, Fieldset } from '../Field'
import { Pill } from '../PillGroup'
import type {
  WrestlingClip,
  WrestlingClipEntityKind,
  WrestlingClipKind,
  WrestlingClipLinkRef
} from '@shared/types'

// The wrestling clip shelf's shared pieces: the add/edit dialog, a card, and
// the panel that entity pages (wrestler, event, promotion) show.

export const CLIP_KINDS: WrestlingClipKind[] = ['highlight', 'promo', 'interview', 'documentary']

export const CLIP_KIND_LABEL: Record<WrestlingClipKind, string> = {
  highlight: 'Highlight',
  promo: 'Promo',
  interview: 'Interview',
  documentary: 'Documentary'
}

export const CLIP_KIND_PLURAL: Record<WrestlingClipKind, string> = {
  highlight: 'Highlights and clips',
  promo: 'Promos and segments',
  interview: 'Interviews and shoots',
  documentary: 'Documentaries'
}

const LINK_KIND_LABEL: Record<WrestlingClipEntityKind, string> = {
  wrestler: 'Wrestler',
  event: 'Event',
  match: 'Match',
  promotion: 'Promotion'
}

export type ClipLinkDraft = WrestlingClipLinkRef & { label: string }

function linkKey(l: WrestlingClipLinkRef): string {
  return l.entityKind === 'promotion' ? `promotion:${l.promotionId}` : `${l.entityKind}:${l.entityId}`
}

function linkPath(l: WrestlingClipLinkRef): string {
  switch (l.entityKind) {
    case 'wrestler':
      return `/wrestling/wrestler/${l.entityId}`
    case 'event':
      return `/wrestling/event/${l.entityId}`
    case 'match':
      return `/wrestling/match/${l.entityId}`
    case 'promotion':
      return `/wrestling/p/${l.promotionId}`
  }
}

function toRef(l: ClipLinkDraft): WrestlingClipLinkRef {
  return l.entityKind === 'promotion'
    ? { entityKind: 'promotion', promotionId: l.promotionId }
    : { entityKind: l.entityKind, entityId: l.entityId }
}

export function clipImage(clip: WrestlingClip): string | null {
  return clip.framePath ?? clip.links.find((l) => l.imagePath)?.imagePath ?? null
}

export function ClipDialog({
  clip,
  initialLinks = [],
  onClose,
  onSaved
}: {
  clip?: WrestlingClip | null
  initialLinks?: ClipLinkDraft[]
  onClose: () => void
  onSaved?: (clip: WrestlingClip) => void
}): JSX.Element {
  const qc = useQueryClient()
  const titleId = useId()
  const [title, setTitle] = useState(clip?.title ?? '')
  const [kind, setKind] = useState<WrestlingClipKind>(clip?.kind ?? 'highlight')
  const [localPath, setLocalPath] = useState<string | null>(clip?.localPath ?? null)
  const [note, setNote] = useState(clip?.note ?? '')
  const [tags, setTags] = useState<string[]>(clip?.tags ?? [])
  const [tagDraft, setTagDraft] = useState('')
  const [links, setLinks] = useState<ClipLinkDraft[]>(
    clip
      ? clip.links.map((l) => ({ ...toRef({ ...l, label: '' }), label: l.label ?? 'Removed entry' }))
      : initialLinks
  )
  const [search, setSearch] = useState('')
  const [busy, setBusy] = useState(false)
  const debounced = useDebouncedValue(search, 200)

  const targets = useQuery({
    queryKey: qk.wrestling.clipTargets(debounced.trim()),
    queryFn: () => api.wrestling.clipTargets(debounced.trim()),
    enabled: debounced.trim().length >= 2
  })
  const tagList = useQuery({ queryKey: qk.wrestling.clipTags, queryFn: () => api.wrestling.clipTags() })
  const chosen = new Set(links.map(linkKey))
  const suggestions = (targets.data ?? []).filter((t) => !chosen.has(linkKey(t))).slice(0, 12)

  function addTag(raw: string): void {
    const parts = raw
      .split(',')
      .map((t) => t.trim().toLowerCase().replace(/\s+/g, ' '))
      .filter(Boolean)
    if (parts.length) setTags((prev) => [...new Set([...prev, ...parts])])
    setTagDraft('')
  }

  async function pick(): Promise<void> {
    const picked = await api.wrestling.pickClipFile()
    if (!picked) return
    setLocalPath(picked.localPath)
    if (!title.trim()) setTitle(picked.title)
  }

  async function save(): Promise<void> {
    if (!localPath) return
    setBusy(true)
    try {
      const allTags = tagDraft.trim() ? [...new Set([...tags, tagDraft.trim().toLowerCase()])] : tags
      const saved = await api.wrestling.saveClip({
        id: clip?.id,
        title,
        kind,
        localPath,
        note,
        tags: allTags,
        links: links.map(toRef)
      })
      // Lists and tier boards show the clip's title and frame.
      await Promise.all([
        qc.invalidateQueries({ queryKey: qk.wrestling.all }),
        qc.invalidateQueries({ queryKey: qk.lists.all }),
        qc.invalidateQueries({ queryKey: qk.tierLists.all })
      ])
      onSaved?.(saved)
      onClose()
    } catch (err) {
      toastError(err)
    } finally {
      setBusy(false)
    }
  }

  async function remove(): Promise<void> {
    if (!clip) return
    const ok = await confirmDialog(
      `Remove "${clip.title}" from the shelf? The video file itself is not deleted.`,
      { confirmLabel: 'Remove', danger: true }
    )
    if (!ok) return
    await api.wrestling.removeClip(clip.id)
    // Removing a clip also drops its list and tier-list entries.
    await Promise.all([
      qc.invalidateQueries({ queryKey: qk.wrestling.all }),
      qc.invalidateQueries({ queryKey: qk.lists.all }),
      qc.invalidateQueries({ queryKey: qk.tierLists.all })
    ])
    onClose()
  }

  return (
    <Dialog
      labelledBy={titleId}
      onClose={onClose}
      panelClassName="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-surface-raised p-5"
    >
      <div className="mb-4 flex items-start justify-between">
        <h2 id={titleId} className="text-lg font-semibold">
          {clip ? 'Edit clip' : 'Add clip'}
        </h2>
        <button type="button" onClick={onClose} aria-label="Close" title="Close" className="text-gray-400 hover:text-ink">
          ✕
        </button>
      </div>

      <div className="mb-4">
        <span className="label mb-1 block" id={`${titleId}-file`}>
          Video file
        </span>
        <div className="flex items-center gap-2" aria-labelledby={`${titleId}-file`} role="group">
          <p className="input min-w-0 flex-1 truncate text-sm" title={localPath ?? undefined}>
            {localPath ?? 'No file chosen'}
          </p>
          <button type="button" className="btn shrink-0" onClick={pick}>
            {localPath ? 'Change file' : 'Choose file'}
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          The file stays where it is, inside your Wrestling folder.
        </p>
      </div>

      <Field label="Title" className="mb-4">
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>

      <Fieldset legend="Type" className="mb-4">
        <div className="flex flex-wrap gap-2">
          {CLIP_KINDS.map((k) => (
            <Pill key={k} active={kind === k} onClick={() => setKind(k)} label={CLIP_KIND_PLURAL[k]} />
          ))}
        </div>
      </Fieldset>

      <Fieldset legend="Linked to" className="mb-4">
        {links.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {links.map((l) => (
              <span key={linkKey(l)} className="chip inline-flex items-center gap-2">
                <span className="text-xs text-gray-400">{LINK_KIND_LABEL[l.entityKind]}</span>
                {l.label}
                <button
                  type="button"
                  aria-label={`Remove link to ${l.label}`}
                  title="Remove link"
                  className="text-gray-400 hover:text-ink"
                  onClick={() => setLinks((prev) => prev.filter((x) => linkKey(x) !== linkKey(l)))}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
        <Field label="Search wrestlers, events, matches or promotions" hiddenLabel>
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search wrestlers, events, matches or promotions"
          />
        </Field>
        {suggestions.length > 0 && (
          <ul className="mt-1 max-h-56 overflow-y-auto rounded border border-line-subtle">
            {suggestions.map((t) => (
              <li key={linkKey(t)}>
                <button
                  type="button"
                  className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-surface-overlay"
                  onClick={() => {
                    setLinks((prev) => [...prev, { ...toRef(t), label: t.label }])
                    setSearch('')
                  }}
                >
                  <span className="w-20 shrink-0 text-xs text-gray-400">{LINK_KIND_LABEL[t.entityKind]}</span>
                  <span className="min-w-0 truncate">{t.label}</span>
                  {t.sub && <span className="ml-auto shrink-0 text-xs text-gray-400">{t.sub}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
        {links.length === 0 && (
          <p className="mt-2 text-xs text-gray-400">
            Optional. A clip linked to a match also shows on its event and on every wrestler in it.
          </p>
        )}
      </Fieldset>

      <Fieldset legend="Tags" className="mb-4">
        {tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip inline-flex items-center gap-2">
                {t}
                <button
                  type="button"
                  aria-label={`Remove tag ${t}`}
                  title="Remove tag"
                  className="text-gray-400 hover:text-ink"
                  onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
        <Field label="Add a tag" hiddenLabel description="Press Enter or type a comma to add.">
          <input
            className="input"
            list={`${titleId}-tags`}
            value={tagDraft}
            placeholder="entrance, botch, classic promo"
            onChange={(e) => {
              const v = e.target.value
              if (v.includes(',')) addTag(v)
              else setTagDraft(v)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag(tagDraft)
              }
            }}
          />
        </Field>
        <datalist id={`${titleId}-tags`}>
          {(tagList.data ?? []).map((t) => (
            <option key={t.tag} value={t.tag} />
          ))}
        </datalist>
      </Fieldset>

      <Field label="Note" className="mb-5">
        <textarea className="input min-h-20 resize-y" value={note} onChange={(e) => setNote(e.target.value)} />
      </Field>

      <div className="flex items-center justify-between gap-3">
        {clip ? (
          <button type="button" className="btn-danger" onClick={remove} disabled={busy}>
            Remove from shelf
          </button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={busy || !localPath || !title.trim()}
            onClick={save}
          >
            {busy ? 'Saving...' : 'Save clip'}
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export function ClipCard({
  clip,
  onEdit,
  highlighted = false
}: {
  clip: WrestlingClip
  onEdit: (clip: WrestlingClip) => void
  highlighted?: boolean
}): JSX.Element {
  const qc = useQueryClient()
  async function toggleFavorite(): Promise<void> {
    await api.wrestling.setClipFavorite(clip.id, !clip.favorite)
    await qc.invalidateQueries({ queryKey: qk.wrestling.all })
  }
  async function open(): Promise<void> {
    try {
      await api.wrestling.openClip(clip.id)
    } catch (err) {
      toastError(err)
    }
  }
  return (
    <article
      id={`clip-${clip.id}`}
      className={`card group flex flex-col overflow-hidden ${highlighted ? 'ring-2 ring-accent' : ''}`}
    >
      <button
        type="button"
        className="relative block aspect-video w-full overflow-hidden bg-surface-base text-left"
        onClick={open}
        disabled={!clip.available}
        aria-label={clip.available ? `Play ${clip.title}` : `${clip.title}: file unavailable`}
        title={clip.available ? 'Open in your video player' : 'File unavailable'}
      >
        <CoverImage path={clipImage(clip)} alt="" className="h-full w-full object-cover" thumbWidth={480} />
        <span className="media-contrast absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] uppercase tracking-wide">
          {CLIP_KIND_LABEL[clip.kind]}
        </span>
        {!clip.available && (
          <span className="media-contrast absolute inset-x-0 bottom-0 bg-black/75 px-2 py-1 text-xs">
            File unavailable
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start gap-2">
          <h3 className="min-w-0 flex-1 text-sm font-medium leading-snug">{clip.title}</h3>
          <FavoriteButton variant="compact" active={clip.favorite} onClick={toggleFavorite} />
        </div>
        {clip.via && <p className="text-xs text-gray-400">From {clip.via}</p>}
        {clip.links.length > 0 && (
          <p className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
            {clip.links.map((l) =>
              l.label ? (
                <Link key={linkKey(l)} to={linkPath(l)} className="text-signal-link hover:underline">
                  {l.label}
                </Link>
              ) : null
            )}
          </p>
        )}
        {clip.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {clip.tags.map((t) => (
              <span key={t} className="pill px-2 py-0.5 text-[11px]">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => onEdit(clip)}>
            Edit
          </button>
          <AddToListMenu kind="wrestlingClip" entityId={clip.id} />
        </div>
      </div>
    </article>
  )
}

// Clip panel for an entity page. Derived clips (via a linked match or event)
// say where they came from; Add clip opens the dialog already linked here.
export function WrestlingClipShelf({
  kind,
  id,
  label,
  title = 'Clips',
  hideWhenEmpty = false,
  className = 'mt-8'
}: {
  kind: WrestlingClipEntityKind
  id: number | string
  label: string
  title?: string
  hideWhenEmpty?: boolean // for pages with their own long content, e.g. a promotion
  className?: string
}): JSX.Element | null {
  const [editing, setEditing] = useState<WrestlingClip | null | 'new'>(null)
  const { data, isError } = useQuery({
    queryKey: qk.wrestling.clipsFor(kind, id),
    queryFn: () => api.wrestling.clipsFor(kind, id)
  })
  const initialLinks: ClipLinkDraft[] = [
    kind === 'promotion'
      ? { entityKind: 'promotion', promotionId: id as never, label }
      : { entityKind: kind, entityId: Number(id), label }
  ]
  if (hideWhenEmpty && !data?.length) return null
  return (
    <section className={className} aria-label={title}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">
          {title}
          {data && data.length > 0 && <span className="ml-2 text-sm font-normal text-gray-400">{data.length}</span>}
        </h2>
        <button type="button" className="btn" onClick={() => setEditing('new')}>
          Add clip
        </button>
      </div>
      {isError && <p className="text-sm text-signal-anomaly">Could not load clips.</p>}
      {data && data.length === 0 && (
        <p className="text-sm text-gray-400">No clips yet. Add highlights, promos, interviews or documentaries.</p>
      )}
      {data && data.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {data.map((c) => (
            <ClipCard key={c.id} clip={c} onEdit={setEditing} />
          ))}
        </div>
      )}
      {editing && (
        <ClipDialog
          clip={editing === 'new' ? null : editing}
          initialLinks={initialLinks}
          onClose={() => setEditing(null)}
        />
      )}
    </section>
  )
}
