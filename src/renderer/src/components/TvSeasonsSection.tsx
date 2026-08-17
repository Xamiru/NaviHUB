import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import Section from './Section'
import EmptyState from './EmptyState'
import type { MediaDetail, TvEpisode, TvSeason } from '@shared/types'

// The Seasons tab: one collapsible block per season, each a grid of episode
// tiles you click to tick. Progress is clicked, not typed — the number field on
// the form stays, but nobody should have to count episodes to use it.
//
// Ticking is a plain `await api.…` in the handler (house style); the global
// unhandledrejection toast net reports failures. A first-time tick logs media
// progress in main, which is why the invalidation reaches the whole ['media']
// prefix rather than just this query.

function tileClass(ep: TvEpisode, unaired: boolean): string {
  if (ep.watchedAt) return 'border-accent bg-accent/10 text-accent'
  if (unaired) return 'border-base-700 text-gray-600'
  return 'border-base-700 text-gray-400 hover:border-accent hover:text-accent'
}

function isUnaired(ep: TvEpisode, today: string): boolean {
  return !!ep.airDate && ep.airDate > today
}

function SeasonBlock({
  mediaId,
  season,
  today,
  defaultOpen,
  onChanged
}: {
  mediaId: number
  season: TvSeason
  today: string
  defaultOpen: boolean
  onChanged: () => Promise<void>
}) {
  const [open, setOpen] = useState(defaultOpen)
  // The ID, not the episode: holding the object would pin a pre-refetch
  // snapshot, so after "Mark watched" the pane still read watchedAt: null and
  // its button re-sent the same watched:true — leaving no way to un-tick.
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = season.episodes.find((e) => e.id === selectedId) ?? null
  const total = season.episodes.length
  // Against AIRED episodes: setSeasonWatched deliberately skips unaired ones,
  // so an airing season could never reach `watched === total`, the button would
  // never flip to "Unmark season", and the undo path was unreachable.
  const aired = total - season.unaired
  const complete = aired > 0 && season.watched >= aired

  async function toggle(ep: TvEpisode): Promise<void> {
    await api.tv.setWatched(ep.id, !ep.watchedAt)
    await onChanged()
  }

  async function toggleSeason(): Promise<void> {
    await api.tv.setSeasonWatched(mediaId, season.season, !complete)
    await onChanged()
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-base-700 px-4 py-3">
        <button
          className="flex flex-1 items-center gap-3 text-left"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? 'rotate-90 text-gray-500' : 'text-gray-500'}>›</span>
          <span className="text-sm font-semibold">Season {season.season}</span>
          <span className="text-xs text-gray-500">
            {total} episodes · {season.watched} watched
            {season.unaired > 0 && ` · ${season.unaired} unaired`}
          </span>
        </button>
        {/* Collapsed seasons still show their shape as a dot row. */}
        {!open && (
          <span className="hidden items-center gap-1 sm:flex" aria-hidden="true">
            {season.episodes.slice(0, 24).map((ep) => (
              <span
                key={ep.id}
                className={`h-2 w-2 rounded-full ${ep.watchedAt ? 'bg-accent' : 'bg-base-600'}`}
              />
            ))}
          </span>
        )}
        <button className="text-xs text-gray-500 hover:text-accent" onClick={toggleSeason}>
          {complete ? 'Unmark season' : 'Mark season watched'}
        </button>
      </div>

      {open && (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(76px,1fr))] gap-2 p-4">
            {season.episodes.map((ep) => {
              const unaired = isUnaired(ep, today)
              return (
                <button
                  key={ep.id}
                  className={`rounded-md border px-2 py-2 text-center ${tileClass(ep, unaired)} ${
                    selectedId === ep.id ? 'ring-1 ring-accent/40' : ''
                  }`}
                  title={ep.title ?? `Episode ${ep.number}`}
                  aria-pressed={!!ep.watchedAt}
                  onClick={() => setSelectedId(selectedId === ep.id ? null : ep.id)}
                >
                  <span className="block text-xs font-semibold">E{ep.number}</span>
                  <span className="mt-0.5 block text-[10px]">
                    {ep.watchedAt ? '✓' : unaired ? '·' : '○'}
                  </span>
                </button>
              )
            })}
          </div>

          {selected && (
            <div className="border-t border-base-700 bg-base-700/20 p-4">
              <div className="flex flex-wrap items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    S{selected.season}E{selected.number}
                    {selected.title ? ` · ${selected.title}` : ''}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {[
                      selected.airDate ?? 'air date unknown',
                      selected.runtime ? `${selected.runtime} min` : null,
                      selected.fileId ? 'local file present' : null
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  {selected.overview && (
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {selected.overview}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-ghost" onClick={() => void toggle(selected)}>
                    {selected.watchedAt ? 'Mark unwatched' : 'Mark watched'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function TvSeasonsSection({ m }: { m: MediaDetail }) {
  const qc = useQueryClient()
  const { data: seasons, isLoading } = useQuery({
    queryKey: qk.media.tvSeasons(m.id),
    queryFn: () => api.tv.seasons(m.id)
  })
  // Local day, matching the main-process todayLocal() the repo compared against.
  const today = new Date().toLocaleDateString('en-CA')

  const refresh = async (): Promise<void> => {
    await qc.invalidateQueries({ queryKey: qk.media.all })
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>
  if (!seasons?.length) {
    return (
      <EmptyState
        title="No episode list yet"
        body="TMDB's episode catalogue arrives with an import. Re-import this show to fill in its seasons."
      />
    )
  }

  const watched = seasons.reduce((n, s) => n + s.watched, 0)
  const total = seasons.reduce((n, s) => n + s.episodes.length, 0)
  // Open the season you are in the middle of — the first with an unwatched
  // episode — rather than always the first season of a long-finished show.
  const firstUnfinished = seasons.find((s) => s.watched < s.episodes.length)?.season

  return (
    <Section title="Seasons" subtitle={`${watched} of ${total} episodes watched`}>
      <div className="space-y-3">
        {seasons.map((s) => (
          <SeasonBlock
            key={s.season}
            mediaId={m.id}
            season={s}
            today={today}
            defaultOpen={s.season === (firstUnfinished ?? seasons[seasons.length - 1].season)}
            onChanged={refresh}
          />
        ))}
      </div>
    </Section>
  )
}
