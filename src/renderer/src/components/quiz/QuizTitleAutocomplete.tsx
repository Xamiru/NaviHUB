import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { QuizScreenTitle } from '@shared/types'
import { searchScreenTitles } from '@shared/libraryGrid'

interface QuizTitleAutocompleteProps {
  titles: QuizScreenTitle[]
  excludedKeys?: string[]
  disabled?: boolean
  resetKey?: string | number
  placeholder?: string
  submitLabel?: string
  onSubmit: (title: QuizScreenTitle) => void
}

export default function QuizTitleAutocomplete({
  titles,
  excludedKeys = [],
  disabled = false,
  resetKey,
  placeholder = 'Search your library',
  submitLabel = 'Submit',
  onSubmit
}: QuizTitleAutocompleteProps) {
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<QuizScreenTitle | null>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const suggestions = useMemo(
    () => searchScreenTitles(titles, query, excludedKeys, 8),
    [titles, query, excludedKeys]
  )

  useEffect(() => {
    setQuery('')
    setSelected(null)
    setOpen(false)
    setActive(0)
    if (!disabled) inputRef.current?.focus()
  }, [resetKey, disabled])

  function choose(title: QuizScreenTitle) {
    setSelected(title)
    setQuery(title.label)
    setOpen(false)
  }

  function submit() {
    if (!selected || disabled) return
    onSubmit(selected)
  }

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            className="input w-full"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open && suggestions.length > 0}
            aria-controls={listId}
            aria-activedescendant={open && suggestions[active] ? `${listId}-${suggestions[active].key}` : undefined}
            autoComplete="off"
            disabled={disabled}
            placeholder={placeholder}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelected(null)
              setOpen(true)
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
              {suggestions.map((title, index) => (
                <button
                  id={`${listId}-${title.key}`}
                  key={title.key}
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm ${
                    index === active ? 'bg-base-600 text-white' : 'text-gray-300 hover:bg-base-700'
                  }`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(title)}
                >
                  <span className="truncate">{title.label}</span>
                  <span className="shrink-0 text-xs text-gray-500">
                    {title.releaseYear ?? 'Year unknown'} · {title.mediaType === 'movie' ? 'Movie' : 'TV'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button type="button" className="btn-primary sm:min-w-28" disabled={!selected || disabled} onClick={submit}>
          {submitLabel}
        </button>
      </div>
      {query && !selected && suggestions.length === 0 && (
        <p className="mt-2 text-xs text-gray-400">No eligible title matches that search.</p>
      )}
    </div>
  )
}
