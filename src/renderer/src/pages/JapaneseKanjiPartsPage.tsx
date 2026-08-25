import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useIncrementalList } from '../lib/hooks'
import EditorialDetailFrame from '../components/EditorialDetailFrame'

// Search-by-parts: toggle the components you can see in an unknown kanji and
// watch the grid narrow (the radkfile workflow, offline). Click a match to
// land in the dictionary. Needs the KRADFILE pack.

export default function JapaneseKanjiPartsPage() {
  const [params, setParams] = useSearchParams()
  const [selected, setSelected] = usePersistedState<string[]>('jpKanjiParts', [])

  const { data: components = [], isLoading } = useQuery({
    queryKey: qk.dict.kradComponents,
    queryFn: () => api.dict.kradComponents()
  })

  // ?c= (from a dictionary components chip) seeds the selection once.
  useEffect(() => {
    const c = params.get('c')
    if (!c) return
    setSelected(selected.includes(c) ? selected : [...selected, c])
    setParams({}, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sortedSelection = useMemo(() => [...selected].sort(), [selected])
  const { data: hits = [] } = useQuery({
    queryKey: qk.dict.kanjiByComponents(sortedSelection),
    queryFn: () => api.dict.kradSearch(sortedSelection),
    enabled: sortedSelection.length > 0
  })
  const { visible, sentinelRef, hasMore } = useIncrementalList(hits)

  // Group the picker by stroke count (the radical-table convention).
  const groups = useMemo(() => {
    const byStrokes = new Map<number, typeof components>()
    for (const c of components) {
      const key = c.strokes ?? 0
      const list = byStrokes.get(key) ?? []
      list.push(c)
      byStrokes.set(key, list)
    }
    return [...byStrokes.entries()].sort((a, b) => a[0] - b[0])
  }, [components])

  const selectedSet = new Set(selected)
  function toggle(component: string): void {
    setSelected(
      selectedSet.has(component) ? selected.filter((c) => c !== component) : [...selected, component]
    )
  }

  return (
    <EditorialDetailFrame width="wide">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Kanji by Parts"
        subtitle="Saw a kanji you can't type? Toggle the pieces you can see."
        actions={
          <Link to="/japanese/kanji/quiz" className="btn-ghost">
            Build-a-kanji drill
          </Link>
        }
      />

      {!isLoading && components.length === 0 ? (
        <EmptyState
          title="Components pack not installed"
          body="Download the kanji components (KRADFILE) pack in Settings → Dictionaries."
          action={
            <Link to="/settings" className="btn-primary">
              Open Settings
            </Link>
          }
        />
      ) : (
        <>
          <Section
            title={`Components${selected.length ? ` · ${selected.length} selected` : ''}`}
            className="mb-5"
            subtitle={
              selected.length > 0 && (
                <button
                  className="text-xs text-gray-500 hover:text-gray-300"
                  onClick={() => setSelected([])}
                >
                  clear
                </button>
              )
            }
          >
            <div className="space-y-2">
              {groups.map(([strokes, list]) => (
                <div key={strokes} className="flex items-start gap-2">
                  <span className="mt-1.5 w-6 shrink-0 text-right text-xs text-gray-600">
                    {strokes || '?'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {list.map((c) => (
                      <button
                        key={c.component}
                        onClick={() => toggle(c.component)}
                        title={`${c.kanjiCount} kanji`}
                        className={`min-w-[2.1rem] text-base ${
                          selectedSet.has(c.component)
                            ? 'chip-toggle chip-toggle-active'
                            : 'chip-toggle'
                        }`}
                      >
                        {c.component}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title={
              selected.length === 0
                ? 'Matches'
                : `Matches · ${hits.length.toLocaleString()} kanji`
            }
          >
            {selected.length === 0 ? (
              <p className="text-sm text-gray-500">
                Pick one or more components above — matches must contain ALL of them.
              </p>
            ) : hits.length === 0 ? (
              <p className="text-sm text-gray-500">No kanji contains all of those parts.</p>
            ) : (
              <>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1.5">
                  {visible.map((h) => (
                    <Link
                      key={h.character}
                      to={`/japanese/dictionary?q=${encodeURIComponent(h.character)}`}
                      className="card flex flex-col items-center p-2 hover:border-accent"
                    >
                      <span className="text-2xl">{h.character}</span>
                      <span className="text-xs text-gray-600">
                        {h.strokeCount != null ? `${h.strokeCount} parts` : ''}
                      </span>
                    </Link>
                  ))}
                </div>
                {hasMore && <div ref={sentinelRef} />}
              </>
            )}
          </Section>
        </>
      )}
    </EditorialDetailFrame>
  )
}
