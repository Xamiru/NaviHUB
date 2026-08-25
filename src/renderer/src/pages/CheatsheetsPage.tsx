import { Link, useSearchParams } from 'react-router-dom'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import { CHEAT_SHEETS } from '@shared/programming/cheatsheets'
import type { CheatEntry, CheatSheet } from '@shared/programming/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'

// Command-line cheatsheets: one sheet at a time (pill switcher — 13 sheets need
// a wrapping row, which the underline Tabs rail can't do), or a cross-sheet
// filter when searching. Pure static content from the code catalog — no queries.
export default function CheatsheetsPage() {
  // `?sheet=<key>` seeds the tab (the quiz summary's "Review" link) — the
  // MediaDetailPage `?tab=` idiom: read once as the initial value.
  const [params] = useSearchParams()
  const seeded = params.get('sheet')
  const [sheetKey, setSheetKey] = usePersistedState(
    'cheatSheetTab',
    seeded && CHEAT_SHEETS.some((s) => s.key === seeded) ? seeded : CHEAT_SHEETS[0].key
  )
  const [search, setSearch] = usePersistedState('cheatSheetSearch', '')

  const q = search.trim().toLowerCase()
  const active = CHEAT_SHEETS.find((s) => s.key === sheetKey) ?? CHEAT_SHEETS[0]

  const matches = (e: CheatEntry): boolean =>
    e.cmd.toLowerCase().includes(q) ||
    e.desc.toLowerCase().includes(q) ||
    (e.example?.toLowerCase().includes(q) ?? false)

  return (
    <EditorialDetailFrame width="full">
      <PageHeader
        back={{ to: '/programming', label: 'Programming' }}
        title="Command-line cheatsheets"
        subtitle="Command reference. Search cuts across every sheet."
        actions={
          <Link to="/programming/practice" className="btn-primary shrink-0">
            Practice these
          </Link>
        }
      />

      <div className="grid min-w-0 gap-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)_260px]">
        <aside className="min-w-0">
          <div className="card sticky top-6 p-3">
            <label className="label" htmlFor="cheatsheet-search">Search reference</label>
            <input
              id="cheatsheet-search"
              className="input mb-4 w-full"
              placeholder="Search commands…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <nav className="space-y-1" aria-label="Cheatsheets">
              {CHEAT_SHEETS.map((sheet) => {
                const hitCount = q ? sheet.entries.filter(matches).length : sheet.entries.length
                return (
                  <button
                    key={sheet.key}
                    className={`flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                      sheet.key === active.key
                        ? 'border-accent/50 bg-accent/10 text-accent'
                        : 'border-transparent text-gray-400 hover:border-base-700 hover:bg-base-700 hover:text-white'
                    }`}
                    onClick={() => {
                      setSheetKey(sheet.key)
                      setSearch('')
                    }}
                  >
                    <span className="truncate">{sheet.title}</span>
                    <span className="text-xs tabular-nums text-gray-600">{hitCount}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0">
          {q ? (
            <div className="space-y-6">
              {CHEAT_SHEETS.map((sheet) => {
                const hits = sheet.entries.filter(matches)
                if (hits.length === 0) return null
                return <SheetBlock key={sheet.key} sheet={sheet} entries={hits} />
              })}
              {CHEAT_SHEETS.every((sheet) => sheet.entries.filter(matches).length === 0) && (
                <p className="text-sm text-gray-500">Nothing matches “{search.trim()}”.</p>
              )}
            </div>
          ) : (
            <Section title={active.title} subtitle={`${active.entries.length} reference entries`}>
              <Entries entries={active.entries} />
            </Section>
          )}
        </main>

        <aside className="hidden xl:block">
          <div className="card sticky top-6 p-5">
            <p className="label">Selected sheet</p>
            <p className="text-lg font-semibold text-white">{active.title}</p>
            <p className="mt-3 text-sm text-gray-400">
              {active.entries.filter((entry) => entry.answers?.length).length} commands can enter the typed practice pool.
            </p>
            <p className="mt-4 border-t border-base-700 pt-4 text-xs leading-5 text-gray-500">
              Search reads every local sheet. Selecting a sheet clears the search and keeps that reference active when you return.
            </p>
          </div>
        </aside>
      </div>
    </EditorialDetailFrame>
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
  if (showTitle) {
    return (
      <Section title={sheet.title} className="mb-6">
        <Entries entries={entries} />
      </Section>
    )
  }
  return <Entries entries={entries} />
}

function Entries({ entries }: { entries: CheatEntry[] }) {
  return (
    <div>
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
