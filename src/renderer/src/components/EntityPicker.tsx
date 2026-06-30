import { useEffect, useRef, useState } from 'react'
import { api } from '../lib/api'

type Kind = 'person' | 'character' | 'company'

interface Entity {
  id: number
  name: string
}

const SOURCE: Record<
  Kind,
  { list: (s?: string) => Promise<Entity[]>; create: (name: string) => Promise<number> }
> = {
  person: {
    list: (s) => api.people.list(s),
    create: (name) => api.people.upsert({ name })
  },
  character: {
    list: (s) => api.characters.list(s),
    create: (name) => api.characters.upsert({ name })
  },
  company: {
    list: (s) => api.companies.list(s),
    create: (name) => api.companies.upsert({ name })
  }
}

interface Props {
  kind: Kind
  placeholder?: string
  // Called with the chosen entity. The picker clears itself after selection so
  // it can be reused to add several rows.
  onPick: (id: number, name: string) => void
  autoFocus?: boolean
}

// Type-to-search combobox with an inline "Create" option.
export default function EntityPicker({ kind, placeholder, onPick, autoFocus }: Props) {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<Entity[]>([])
  const [busy, setBusy] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let alive = true
    SOURCE[kind].list(text.trim() || undefined).then((r) => {
      if (alive) setResults(r.slice(0, 8))
    })
    return () => {
      alive = false
    }
  }, [kind, text])

  // Close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const exactExists = results.some((r) => r.name.toLowerCase() === text.trim().toLowerCase())
  const canCreate = text.trim().length > 0 && !exactExists

  async function pick(id: number, name: string) {
    onPick(id, name)
    setText('')
    setOpen(false)
  }

  async function create() {
    const name = text.trim()
    if (!name) return
    setBusy(true)
    const id = await SOURCE[kind].create(name)
    setBusy(false)
    pick(id, name)
  }

  return (
    <div ref={boxRef} className="relative">
      <input
        className="input"
        value={text}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setText(e.target.value)
          setOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (results.length && exactExists) {
              const m = results.find((r) => r.name.toLowerCase() === text.trim().toLowerCase())!
              pick(m.id, m.name)
            } else if (canCreate) {
              create()
            }
          }
        }}
      />
      {open && (results.length > 0 || canCreate) && (
        <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-md border border-base-500 bg-base-800 shadow-lg">
          {results.map((r) => (
            <button
              key={r.id}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-base-700"
              onClick={() => pick(r.id, r.name)}
            >
              {r.name}
            </button>
          ))}
          {canCreate && (
            <button
              className="block w-full text-left px-3 py-2 text-sm text-accent hover:bg-base-700 border-t border-base-700"
              onClick={create}
              disabled={busy}
            >
              + Create “{text.trim()}”
            </button>
          )}
        </div>
      )}
    </div>
  )
}
