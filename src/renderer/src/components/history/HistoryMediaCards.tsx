import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { MEDIA_LINK_KINDS } from '@shared/history/schema'
import { mediaUrl, thumbUrl } from '@shared/mediaUrl'
import type { HistoryMediaCard } from '@shared/types'
import ImportDialog from '../ImportDialog'
import { configFor } from '../../lib/mediaConfig'
import { libraryPath, historyPath } from '../../lib/historyUi'
import { qk } from '../../lib/queryKeys'
import { api } from '../../lib/api'
import { confirmDialog } from '../../lib/confirm'
import { QuoteBlock } from './Citations'

// Library titles linked to History: owned titles open their detail page;
// missing ones show their poster and import through the normal dialog. Fact
// vs fiction notes are quotes like everything else on the page.

const TYPE_LABEL: Record<string, string> = {
  anime: 'Anime',
  manga: 'Manga',
  visual_novel: 'Visual novel',
  game: 'Game',
  movie: 'Movie',
  tv: 'TV',
  book: 'Book'
}

function posterSrc(card: HistoryMediaCard): string | null {
  if (card.library?.cover) return thumbUrl(card.library.cover, 320) ?? mediaUrl(card.library.cover)
  if (card.posterCached) return thumbUrl(card.posterCached, 320) ?? mediaUrl(card.posterCached)
  return null
}

export function MediaPoster({ card, className = '' }: { card: HistoryMediaCard; className?: string }) {
  const src = posterSrc(card)
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative aspect-[2/3] overflow-hidden rounded-lg bg-base-700 ${card.library ? '' : 'grayscale'} ${className}`}>
      {src && !failed && <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />}
      {!card.library && (
        <span className="media-contrast absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-300">
          Not in library
        </span>
      )}
    </div>
  )
}

function ImportButton({ card }: { card: HistoryMediaCard }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  return (
    <>
      <button type="button" className="btn-ghost h-8 text-xs" onClick={() => setOpen(true)}>
        Import
      </button>
      {open && (
        <ImportDialog
          cfg={configFor(card.mediaType)}
          initialQuery={card.title}
          onClose={() => setOpen(false)}
          onImported={() => {
            setOpen(false)
            void queryClient.invalidateQueries({ queryKey: qk.history.all })
          }}
        />
      )}
    </>
  )
}

/** Poster grid for decade pages. */
export function MediaShelf({ cards }: { cards: HistoryMediaCard[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
      {cards.map((c) => (
        <div key={c.key}>
          {c.library ? (
            <Link to={libraryPath(c.mediaType, c.library.id)} className="group block">
              <MediaPoster card={c} />
              <p className="mt-2 text-sm font-medium text-ink group-hover:text-accent">{c.title}</p>
            </Link>
          ) : (
            <>
              <MediaPoster card={c} />
              <p className="mt-2 text-sm font-medium text-ink-secondary">{c.title}</p>
            </>
          )}
          <p className="text-xs text-ink-muted">
            {MEDIA_LINK_KINDS[c.kind]} {c.target.title}
          </p>
          {!c.library && <div className="mt-1.5"><ImportButton card={c} /></div>}
        </div>
      ))}
    </div>
  )
}

/** Full rows for article pages, with portrayals and fact-vs-fiction notes. */
export function MediaRows({ cards, here }: { cards: HistoryMediaCard[]; here: string }) {
  const queryClient = useQueryClient()
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({})
  if (cards.length === 0) return <p className="text-sm text-ink-muted">No titles linked yet.</p>
  return (
    <div className="space-y-4">
      {cards.map((c) => {
        const open = openNotes[c.key] ?? false
        const notesId = `notes-${c.key.replace(/[^a-z0-9]/gi, '-')}`
        return (
          <div key={c.key} className="card grid gap-4 p-4 sm:grid-cols-[96px_minmax(0,1fr)]">
            {c.library ? (
              <Link to={libraryPath(c.mediaType, c.library.id)} aria-label={c.title}>
                <MediaPoster card={c} />
              </Link>
            ) : (
              <MediaPoster card={c} />
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {c.library ? (
                  <Link to={libraryPath(c.mediaType, c.library.id)} className="font-medium text-ink hover:text-accent">
                    {c.title}
                  </Link>
                ) : (
                  <span className="font-medium text-ink-secondary">{c.title}</span>
                )}
                <span className="text-xs tabular-nums text-ink-muted">
                  {[c.year, TYPE_LABEL[c.mediaType]].filter(Boolean).join(' · ')}
                </span>
                <span className="chip">{MEDIA_LINK_KINDS[c.kind]}</span>
                {c.target.ref !== here && historyPath(c.target.ref) && (
                  <span className="text-xs text-ink-muted">
                    via{' '}
                    <Link to={historyPath(c.target.ref)!} className="text-signal-link hover:underline">
                      {c.target.title}
                    </Link>
                  </span>
                )}
                {c.library?.status && <span className="text-xs text-signal-affirmative">In your library · {c.library.status}</span>}
                {c.origin === 'personal' && (
                  <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">Your link</span>
                )}
              </div>
              {c.portrayals.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                  {c.portrayals.map((p, i) => (
                    <li key={i}>
                      <Link to={historyPath(p.person.ref) ?? '/history'} className="text-ink hover:text-accent">
                        {p.person.title}
                      </Link>
                      {p.actors.length > 0 ? (
                        <>
                          {' '}played by{' '}
                          {p.actors.map((a, j) => (
                            <span key={a.personId}>
                              {j > 0 && ', '}
                              <Link to={`/people/${a.personId}`} className="text-signal-link hover:underline">
                                {a.name}
                              </Link>
                            </span>
                          ))}
                        </>
                      ) : (
                        p.characterName && <span className="text-ink-muted"> as {p.characterName}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {c.accuracy.length > 0 && (
                <>
                  <button
                    type="button"
                    className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-signal-link hover:underline"
                    aria-expanded={open}
                    aria-controls={notesId}
                    onClick={() => setOpenNotes((s) => ({ ...s, [c.key]: !open }))}
                  >
                    {open ? '▾' : '▸'} Fact vs fiction · {c.accuracy.length} sourced {c.accuracy.length === 1 ? 'note' : 'notes'}
                  </button>
                  {open && (
                    <div id={notesId} className="mt-2 space-y-3">
                      {c.accuracy.map((q) => (
                        <QuoteBlock key={q.id} quote={q} size="sm" />
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {!c.library && <ImportButton card={c} />}
                {c.origin === 'personal' && c.personalLinkId !== null && (
                  <button
                    type="button"
                    className="btn-ghost h-8 text-xs"
                    onClick={async () => {
                      if (!(await confirmDialog(`Remove your link to ${c.title}?`, { confirmLabel: 'Remove', danger: true }))) return
                      await api.history.unlinkMedia(c.personalLinkId!)
                      void queryClient.invalidateQueries({ queryKey: qk.history.all })
                    }}
                  >
                    Remove link
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
