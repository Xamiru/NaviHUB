import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { SEASONS, seasonLabel } from '@shared/season'
import type { MediaConfig } from '../lib/mediaConfig'
import type { MediaListFacets, MediaListFilter, SeasonKey } from '@shared/types'
import RangeSlider from './RangeSlider'

// The list page's advanced filters. Kept out of MediaListPage because the panel
// owns a fair amount of derivation (bounds, chips, clearing) that the page only
// ever passes through to the media query.
//
// Range convention: `null` means unconstrained. A slider always shows concrete
// bounds, so onChange collapses a full-width range back to null — that keeps
// the query key stable when a filter is untouched, and lets activeCount() work
// by counting non-null fields.

export type Range = [number, number] | null

export interface MediaFilters {
  tagIds: number[]
  tagMode: 'any' | 'all'
  unrated: boolean
  score: Range
  community: Range
  year: Range
  units: Range
  seasons: SeasonKey[]
}

export const EMPTY_FILTERS: MediaFilters = {
  tagIds: [],
  tagMode: 'any',
  unrated: false,
  score: null,
  community: null,
  year: null,
  units: null,
  seasons: []
}

export const SCORE_BOUNDS: [number, number] = [0, 10]
export const COMMUNITY_BOUNDS: [number, number] = [0, 100]

export function activeCount(f: MediaFilters): number {
  return (
    (f.tagIds.length ? 1 : 0) +
    (f.unrated ? 1 : 0) +
    (f.score ? 1 : 0) +
    (f.community ? 1 : 0) +
    (f.year ? 1 : 0) +
    (f.units ? 1 : 0) +
    (f.seasons.length ? 1 : 0)
  )
}

// Panel state -> the slice of MediaListFilter the repo understands.
export function toListFilter(f: MediaFilters): Partial<MediaListFilter> {
  return {
    tagIds: f.tagIds.length ? f.tagIds : null,
    tagMode: f.tagMode,
    unrated: f.unrated || null,
    scoreMin: f.score?.[0] ?? null,
    scoreMax: f.score?.[1] ?? null,
    communityMin: f.community?.[0] ?? null,
    communityMax: f.community?.[1] ?? null,
    yearMin: f.year?.[0] ?? null,
    yearMax: f.year?.[1] ?? null,
    unitsMin: f.units?.[0] ?? null,
    unitsMax: f.units?.[1] ?? null,
    seasons: f.seasons.length ? f.seasons : null
  }
}

function yearBounds(facets: MediaListFacets | undefined): [number, number] {
  const now = new Date().getFullYear()
  const lo = facets?.yearMin ?? 1960
  const hi = Math.max(facets?.yearMax ?? now, lo)
  return [lo, hi]
}

function unitBounds(facets: MediaListFacets | undefined): [number, number] {
  return [0, Math.max(facets?.unitsMax ?? 0, 0)]
}

export default function MediaFilterPanel({
  cfg,
  facets,
  value,
  onChange
}: {
  cfg: MediaConfig
  facets: MediaListFacets | undefined
  value: MediaFilters
  onChange: (f: MediaFilters) => void
}): JSX.Element {
  const [tagSearch, setTagSearch] = useState('')

  const { data: allTags = [] } = useQuery({
    queryKey: qk.tags.withCounts,
    queryFn: () => api.tags.listWithCounts()
  })

  // Only tags this media type actually uses, most-used first — the raw tag
  // table is cross-type and runs to hundreds of rows after an AniList import.
  const tags = useMemo(() => {
    const q = tagSearch.trim().toLowerCase()
    return allTags
      .map((t) => ({
        id: t.id,
        name: t.name,
        count: t.counts.find((c) => c.mediaType === cfg.key)?.count ?? 0
      }))
      .filter((t) => (t.count > 0 || value.tagIds.includes(t.id)) && t.name.toLowerCase().includes(q))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
  }, [allTags, cfg.key, tagSearch, value.tagIds])

  const set = <K extends keyof MediaFilters>(key: K, v: MediaFilters[K]): void =>
    onChange({ ...value, [key]: v })

  // A range that spans its full bounds is no filter at all.
  const setRange = (key: 'score' | 'community' | 'year' | 'units', bounds: [number, number]) => (
    v: [number, number]
  ): void => set(key, v[0] <= bounds[0] && v[1] >= bounds[1] ? null : v)

  const yb = yearBounds(facets)
  const ub = unitBounds(facets)

  return (
    <div className="card mb-6 p-4">
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
        <RangeSlider
          label="Year"
          min={yb[0]}
          max={yb[1]}
          value={value.year ?? yb}
          onChange={setRange('year', yb)}
        />
        <div>
          <RangeSlider
            label="Your score"
            min={SCORE_BOUNDS[0]}
            max={SCORE_BOUNDS[1]}
            step={0.5}
            value={value.score ?? SCORE_BOUNDS}
            // A score range and "no score yet" can't both hold.
            onChange={(v) =>
              onChange({
                ...value,
                unrated: false,
                score: v[0] <= SCORE_BOUNDS[0] && v[1] >= SCORE_BOUNDS[1] ? null : v
              })
            }
          />
          <button
            className={`mt-2 chip ${value.unrated ? 'bg-accent text-white' : 'hover:bg-base-600'}`}
            onClick={() => onChange({ ...value, unrated: !value.unrated, score: null })}
          >
            Unrated only
          </button>
        </div>
        <RangeSlider
          label="Community score"
          min={COMMUNITY_BOUNDS[0]}
          max={COMMUNITY_BOUNDS[1]}
          value={value.community ?? COMMUNITY_BOUNDS}
          onChange={setRange('community', COMMUNITY_BOUNDS)}
        />
        {ub[1] > 0 && (
          <RangeSlider
            label={cfg.totalFieldLabel}
            min={ub[0]}
            max={ub[1]}
            value={value.units ?? ub}
            onChange={setRange('units', ub)}
          />
        )}
        {cfg.hasSeasonal && (
          <div>
            <span className="label">Season</span>
            <div className="flex flex-wrap gap-1.5">
              {SEASONS.map((s) => {
                const active = value.seasons.includes(s)
                return (
                  <button
                    key={s}
                    className={`chip ${active ? 'bg-accent text-white' : 'hover:bg-base-600'}`}
                    onClick={() =>
                      set(
                        'seasons',
                        active ? value.seasons.filter((x) => x !== s) : [...value.seasons, s]
                      )
                    }
                  >
                    {seasonLabel(s)}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-base-700 pt-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="label mb-0">Tags &amp; genres</span>
          <div className="flex gap-1">
            {(['any', 'all'] as const).map((m) => (
              <button
                key={m}
                className={`chip ${value.tagMode === m ? 'bg-accent text-white' : 'hover:bg-base-600'}`}
                onClick={() => set('tagMode', m)}
                title={m === 'any' ? 'Match any selected tag' : 'Match every selected tag'}
              >
                {m === 'any' ? 'Any' : 'All'}
              </button>
            ))}
          </div>
          <input
            className="input ml-auto max-w-[12rem] py-1 text-xs"
            placeholder="Find a tag…"
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
          />
        </div>
        {tags.length === 0 ? (
          <p className="text-xs text-gray-500">No tags on your {cfg.plural.toLowerCase()} yet.</p>
        ) : (
          <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1">
            {tags.map((t) => {
              const active = value.tagIds.includes(t.id)
              return (
                <button
                  key={t.id}
                  className={`chip ${active ? 'bg-accent text-white' : 'hover:bg-base-600'}`}
                  onClick={() =>
                    set(
                      'tagIds',
                      active ? value.tagIds.filter((x) => x !== t.id) : [...value.tagIds, t.id]
                    )
                  }
                >
                  {t.name}
                  <span className={active ? 'text-white/70' : 'text-gray-500'}>{t.count}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
