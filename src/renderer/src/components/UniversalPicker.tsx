import { useEffect, useId, useState } from 'react'
import { api } from '../lib/api'
import { useDebouncedValue, usePopover } from '../lib/hooks'
import { KIND_NOUN } from '../lib/listLinks'
import CoverImage from './CoverImage'
import type { ListKind, MediaType } from '@shared/types'
import { Field } from './Field'

export interface PickedEntity {
  entityId: number
  name: string
  imagePath: string | null
  mediaType: MediaType | null
}

interface Props {
  kind: ListKind
  placeholder?: string
  onPick: (e: PickedEntity) => void
  autoFocus?: boolean
  excludeIds?: number[] // entities already in the list — hidden from results
  mediaTypes?: MediaType[] // kind 'media' only: restrict results to these types
}

// Reads the matching bucket of the global search results for a list's kind and
// normalizes it to a PickedEntity. Studios use the 'company' bucket.
//
// Wrestling entities are NOT in the global search buckets (they're a standalone
// section), so they get their own lookups. Matches have no search of their own
// yet — they're added from an event's card, not from here.
async function search(kind: ListKind, q: string): Promise<PickedEntity[]> {
  if (kind === 'wrestlingWrestler') {
    const rows = await api.wrestling.searchWrestlers(q)
    return rows.map((w) => ({
      entityId: w.id,
      name: w.name,
      imagePath: w.photoPath,
      mediaType: null
    }))
  }
  if (kind === 'wrestlingEvent') {
    const rows = await api.wrestling.events({ search: q })
    return rows.slice(0, 40).map((e) => ({
      entityId: e.id,
      name: e.name,
      imagePath: e.posterPath,
      mediaType: null
    }))
  }
  if (kind === 'wrestlingMatch') return []
  if (kind.startsWith('football')) {
    const rows = await api.football.search(q)
    if (kind === 'footballCompetition') {
      return rows.competitions.map((item) => ({
        entityId: item.id,
        name: item.name,
        imagePath: null,
        mediaType: null
      }))
    }
    if (kind === 'footballTeam') {
      return rows.teams.map((item) => ({
        entityId: item.id,
        name: item.name,
        imagePath: item.imagePath,
        mediaType: null
      }))
    }
    if (kind === 'footballPerson') {
      return rows.people.map((item) => ({
        entityId: item.id,
        name: item.name,
        imagePath: item.imagePath,
        mediaType: null
      }))
    }
    return rows.matches.map((item) => ({
      entityId: item.id,
      name: `${item.home.name} vs ${item.away.name}`,
      imagePath: null,
      mediaType: null
    }))
  }

  const r = await api.search.global(q)
  switch (kind) {
    case 'media':
      return r.media.map((m) => ({
        entityId: m.id,
        name: m.title,
        imagePath: m.coverPath,
        mediaType: m.mediaType
      }))
    case 'person':
      return r.people.map((p) => ({
        entityId: p.id,
        name: p.name,
        imagePath: p.photoPath,
        mediaType: null
      }))
    case 'character':
      return r.characters.map((c) => ({
        entityId: c.id,
        name: c.name,
        imagePath: c.imagePath,
        mediaType: null
      }))
    case 'company':
      return r.companies.map((c) => ({
        entityId: c.id,
        name: c.name,
        imagePath: c.logoPath,
        mediaType: null
      }))
    default:
      return []
  }
}

// Type-to-search combobox over the library, scoped to one entity kind. Clears
// after each pick so several items can be added in a row.
export default function UniversalPicker({
  kind,
  placeholder,
  onPick,
  autoFocus,
  excludeIds = [],
  mediaTypes
}: Props) {
  const resultsId = useId()
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<PickedEntity[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const { panelRef, triggerRef } = usePopover<HTMLInputElement>(open, () => setOpen(false))
  const exclude = new Set(excludeIds)
  // Only hit the search IPC after typing pauses, not on every keystroke.
  const query = useDebouncedValue(text, 200)

  useEffect(() => {
    let alive = true
    if (!query.trim()) {
      setResults([])
      return
    }
    search(kind, query.trim()).then((r) => {
      if (!alive) return
      const typed = mediaTypes
        ? r.filter((e) => e.mediaType != null && mediaTypes.includes(e.mediaType))
        : r
      setResults(typed.filter((e) => !exclude.has(e.entityId)).slice(0, 8))
      setActiveIndex(0)
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, query, excludeIds.length, mediaTypes?.join(',')])

  function pick(e: PickedEntity) {
    onPick(e)
    setText('')
    setResults([])
    setOpen(false)
  }

  return (
    <div className="relative">
      <Field label={`Search for a ${KIND_NOUN[kind]}`} hiddenLabel className="contents">
        <input
          ref={triggerRef}
          className="input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open && results.length > 0}
          aria-controls={open && results.length > 0 ? resultsId : undefined}
          aria-activedescendant={
            open && results[activeIndex] ? `${resultsId}-option-${activeIndex}` : undefined
          }
          value={text}
          placeholder={placeholder ?? `Search a ${KIND_NOUN[kind]} to add…`}
          autoFocus={autoFocus}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setText(e.target.value)
            setOpen(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' && results.length) {
              e.preventDefault()
              setOpen(true)
              setActiveIndex((index) => (index + 1) % results.length)
            } else if (e.key === 'ArrowUp' && results.length) {
              e.preventDefault()
              setOpen(true)
              setActiveIndex((index) => (index - 1 + results.length) % results.length)
            } else if (e.key === 'Home' && open && results.length) {
              e.preventDefault()
              setActiveIndex(0)
            } else if (e.key === 'End' && open && results.length) {
              e.preventDefault()
              setActiveIndex(results.length - 1)
            } else if (e.key === 'Enter' && open && results[activeIndex]) {
              e.preventDefault()
              pick(results[activeIndex])
            }
          }}
        />
      </Field>
      {open && results.length > 0 && (
        <div
          ref={panelRef}
          id={resultsId}
          role="listbox"
          aria-label={`${KIND_NOUN[kind]} results`}
          className="absolute z-20 mt-1 w-full max-h-72 overflow-y-auto rounded-md border border-base-500 bg-base-800 shadow-lg"
        >
          {results.map((r, index) => (
            <button
              key={r.entityId}
              id={`${resultsId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              tabIndex={-1}
              className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm hover:bg-base-700 ${index === activeIndex ? 'bg-base-700' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => pick(r)}
            >
              <CoverImage path={r.imagePath} alt={r.name} className="h-8 w-8 shrink-0" />
              <span className="truncate">{r.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
