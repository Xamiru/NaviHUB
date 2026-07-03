import { useEffect, useRef, useState } from 'react'
import { api } from '../lib/api'
import { useDebouncedValue } from '../lib/hooks'
import { KIND_NOUN } from '../lib/listLinks'
import CoverImage from './CoverImage'
import type { ListKind, MediaType } from '@shared/types'

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
async function search(kind: ListKind, q: string): Promise<PickedEntity[]> {
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
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<PickedEntity[]>([])
  const boxRef = useRef<HTMLDivElement>(null)
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
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, query, excludeIds.length, mediaTypes?.join(',')])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  function pick(e: PickedEntity) {
    onPick(e)
    setText('')
    setResults([])
    setOpen(false)
  }

  return (
    <div ref={boxRef} className="relative">
      <input
        className="input"
        value={text}
        placeholder={placeholder ?? `Search a ${KIND_NOUN[kind]} to add…`}
        autoFocus={autoFocus}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setText(e.target.value)
          setOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results.length) {
            e.preventDefault()
            pick(results[0])
          }
        }}
      />
      {open && results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full max-h-72 overflow-y-auto rounded-md border border-base-500 bg-base-800 shadow-lg">
          {results.map((r) => (
            <button
              key={r.entityId}
              className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm hover:bg-base-700"
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
