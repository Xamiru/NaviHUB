import { Link } from 'react-router-dom'
import { usePersistedState } from '../lib/navState'
import { CHEAT_SHEETS } from '@shared/programming/cheatsheets'
import type { CheatEntry, CheatSheet } from '@shared/programming/types'

// Command-line cheatsheets: one tab per sheet, or a cross-sheet filter when
// searching. Pure static content from the code catalog — no queries at all.
export default function CheatsheetsPage() {
  const [sheetKey, setSheetKey] = usePersistedState('cheatSheetTab', CHEAT_SHEETS[0].key)
  const [search, setSearch] = usePersistedState('cheatSheetSearch', '')

  const q = search.trim().toLowerCase()
  const active = CHEAT_SHEETS.find((s) => s.key === sheetKey) ?? CHEAT_SHEETS[0]

  const matches = (e: CheatEntry): boolean =>
    e.cmd.toLowerCase().includes(q) ||
    e.desc.toLowerCase().includes(q) ||
    (e.example?.toLowerCase().includes(q) ?? false)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <Link to="/programming" className="text-sm text-gray-500 hover:text-white">
            ← Programming
          </Link>
          <h1 className="mt-1 text-2xl font-bold">Command-line cheatsheets</h1>
          <p className="text-sm text-gray-500">
            The commands worth having in your fingers. Search cuts across every sheet.
          </p>
        </div>
        <Link to="/programming/practice" className="btn-primary shrink-0">
          Practice these
        </Link>
      </div>

      <input
        className="input mb-4 w-full"
        placeholder="Search commands…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {q ? (
        <div className="space-y-6">
          {CHEAT_SHEETS.map((sheet) => {
            const hits = sheet.entries.filter(matches)
            if (hits.length === 0) return null
            return <SheetBlock key={sheet.key} sheet={sheet} entries={hits} />
          })}
          {CHEAT_SHEETS.every((s) => s.entries.filter(matches).length === 0) && (
            <p className="text-sm text-gray-500">Nothing matches “{search.trim()}”.</p>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {CHEAT_SHEETS.map((s) => (
              <button
                key={s.key}
                className={`chip ${
                  s.key === active.key
                    ? 'bg-accent/15 text-accent'
                    : 'bg-base-700 text-gray-400 hover:text-white'
                }`}
                onClick={() => setSheetKey(s.key)}
              >
                {s.title}
              </button>
            ))}
          </div>
          <SheetBlock sheet={active} entries={active.entries} showTitle={false} />
        </>
      )}
    </div>
  )
}

function SheetBlock({
  sheet,
  entries,
  showTitle = true
}: {
  sheet: CheatSheet
  entries: CheatEntry[]
  showTitle?: boolean
}) {
  return (
    <div>
      {showTitle && (
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
          {sheet.title}
        </h2>
      )}
      <ul className="space-y-1.5">
        {entries.map((e) => (
          <li key={e.cmd} className="card p-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <code className="rounded bg-base-700 px-1.5 py-0.5 text-sm text-gray-100">
                {e.cmd}
              </code>
              <span className="min-w-0 flex-1 text-sm text-gray-300">{e.desc}</span>
            </div>
            {e.example && (
              <pre className="mt-1.5 overflow-x-auto rounded bg-base-900 px-2 py-1 text-xs text-gray-400">
                {e.example}
              </pre>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
