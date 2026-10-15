import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { MediaType } from '@shared/types'
import { searchTitleChoices, type TitleChoice } from '@shared/titleSearch'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'

interface TypedTitleAnswerProps {
  mediaType: MediaType
  disabled?: boolean
  resetKey: string | number
  onSubmit: (choice: TitleChoice) => void
  onGiveUp: () => void
}

/**
 * Answers a title quiz by searching the whole library of one media type. The
 * suggestions read the same per-type list as Home, Seasonal and Franchises
 * (`qk.media.home` with a byte-identical `{ mediaType }`), so it is usually
 * cached already. The list opens only for typed text and closes on blur.
 */
export default function TypedTitleAnswer({
  mediaType,
  disabled = false,
  resetKey,
  onSubmit,
  onGiveUp
}: TypedTitleAnswerProps) {
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<TitleChoice | null>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const { data: items, isLoading } = useQuery({
    queryKey: qk.media.home(mediaType),
    queryFn: () => api.media.list({ mediaType })
  })
  const choices = useMemo<TitleChoice[]>(
    () =>
      (items ?? []).map((item) => ({
        key: String(item.id),
        label: item.title,
        aliases: item.titleOriginal ? [item.titleOriginal] : [],
        detail: item.releaseDate?.slice(0, 4) ?? null
      })),
    [items]
  )
  const suggestions = useMemo(() => searchTitleChoices(choices, query, 8), [choices, query])

  useEffect(() => {
    setQuery('')
    setSelected(null)
    setOpen(false)
    setActive(0)
    if (!disabled) inputRef.current?.focus()
  }, [resetKey, disabled])

  function choose(choice: TitleChoice) {
    setSelected(choice)
    setQuery(choice.label)
    setOpen(false)
  }

  function submit() {
    if (selected && !disabled) onSubmit(selected)
  }

  return (
    <div>
      <label htmlFor={`${listId}-input`} className="label mb-2 block">
        Type the title
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <input
            id={`${listId}-input`}
            ref={inputRef}
            className="input w-full"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open && suggestions.length > 0}
            aria-controls={listId}
            aria-activedescendant={
              open && suggestions[active] ? `${listId}-${suggestions[active].key}` : undefined
            }
            autoComplete="off"
            disabled={disabled || isLoading}
            placeholder={isLoading ? 'Loading titles…' : 'Search your library'}
            value={query}
            onFocus={() => setOpen(query.trim() !== '' && !selected)}
            onBlur={() => setOpen(false)}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelected(null)
              setOpen(event.target.value.trim() !== '')
              setActive(0)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' && suggestions.length > 0) {
                event.preventDefault()
                setOpen(true)
                setActive((value) => (value + 1) % suggestions.length)
              } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
                event.preventDefault()
                setOpen(true)
                setActive((value) => (value - 1 + suggestions.length) % suggestions.length)
              } else if (event.key === 'Escape') {
                setOpen(false)
              } else if (event.key === 'Enter') {
                event.preventDefault()
                if (open && suggestions[active]) choose(suggestions[active])
                else submit()
              }
            }}
          />
          {open && suggestions.length > 0 && (
            <div
              id={listId}
              role="listbox"
              className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-lg border border-base-600 bg-base-800 p-1 shadow-2xl"
            >
              {suggestions.map((choice, index) => (
                <button
                  id={`${listId}-${choice.key}`}
                  key={choice.key}
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm ${
                    index === active ? 'bg-base-600 text-white' : 'text-gray-300 hover:bg-base-700'
                  }`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(choice)}
                >
                  <span className="truncate">{choice.label}</span>
                  {choice.detail && <span className="shrink-0 text-xs text-gray-500">{choice.detail}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn-primary sm:min-w-28"
          disabled={!selected || disabled}
          onClick={submit}
        >
          Submit
        </button>
        <button type="button" className="btn-ghost" disabled={disabled} onClick={onGiveUp}>
          Give up
        </button>
      </div>
      {query && !selected && suggestions.length === 0 && !isLoading && (
        <p className="mt-2 text-xs text-gray-400">No title in your library matches that search.</p>
      )}
    </div>
  )
}
