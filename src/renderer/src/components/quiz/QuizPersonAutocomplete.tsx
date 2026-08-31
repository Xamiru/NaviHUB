import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { QuizCareerPerson } from '@shared/types'
import { searchCareerPeople } from '@shared/mysteryCareer'

interface Props {
  people: QuizCareerPerson[]
  excludedKeys?: string[]
  disabled?: boolean
  resetKey?: string | number
  onSubmit: (person: QuizCareerPerson) => void
}

export default function QuizPersonAutocomplete({
  people,
  excludedKeys = [],
  disabled = false,
  resetKey,
  onSubmit
}: Props) {
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<QuizCareerPerson | null>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const suggestions = useMemo(
    () => searchCareerPeople(people, query, excludedKeys),
    [people, query, excludedKeys]
  )

  useEffect(() => {
    setQuery('')
    setSelected(null)
    setOpen(false)
    setActive(0)
    if (!disabled) inputRef.current?.focus()
  }, [resetKey, disabled])

  function choose(person: QuizCareerPerson) {
    setSelected(person)
    setQuery(person.label)
    setOpen(false)
  }

  function submit() {
    if (selected && !disabled) onSubmit(selected)
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
            placeholder="Search actors and directors"
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
              {suggestions.map((person, index) => (
                <button
                  id={`${listId}-${person.key}`}
                  key={person.key}
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm ${
                    index === active ? 'bg-base-600 text-white' : 'text-gray-300 hover:bg-base-700'
                  }`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(person)}
                >
                  <span className="truncate">{person.label}</span>
                  <span className="shrink-0 text-xs capitalize text-gray-500">
                    {person.roles.join(' / ')}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button type="button" className="btn-primary sm:min-w-28" disabled={!selected || disabled} onClick={submit}>
          Submit
        </button>
      </div>
      {query && !selected && suggestions.length === 0 && (
        <p className="mt-2 text-xs text-gray-400">No eligible person matches that search.</p>
      )}
    </div>
  )
}
