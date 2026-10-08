import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import { useDebouncedValue } from '../lib/hooks'
import type { BangumiCandidate, ExternalLinkMethod, GameWorkSummary } from '@shared/types'
import Dialog from './Dialog'
import { Field } from './Field'
import Section from './Section'

// Where a game's box art, platforms and cast come from: its games-catalog work
// and its Bangumi entry. Automatic matching only links what it is sure of; this
// panel is where the user corrects or completes it. A choice made here is
// never overridden by the upgrade or a refresh.

const METHOD_LABEL: Record<ExternalLinkMethod, string> = {
  xref: 'matched by id',
  wikidata: 'matched through Wikidata',
  exact: 'matched by exact title',
  manual: 'chosen by you'
}

export default function GameLinksPanel({ mediaId, title }: { mediaId: number; title: string }): React.JSX.Element | null {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [picking, setPicking] = useState<'work' | 'bangumi' | null>(null)
  const { data: state } = useQuery({
    queryKey: qk.gameLinks.get(mediaId),
    queryFn: () => api.gameLinks.get(mediaId)
  })
  if (!state) return null

  const bangumi = state.links.find((l) => l.source === 'bangumi') ?? null
  const workLink = state.links.find((l) => l.source === 'launchbox') ?? null
  const noWork = state.unlinked.includes('launchbox')
  const noBangumi = state.unlinked.includes('bangumi')

  async function run(action: () => Promise<unknown>, done?: string): Promise<void> {
    setBusy(true)
    try {
      await action()
      await qc.invalidateQueries({ queryKey: qk.gameLinks.all })
      await qc.invalidateQueries({ queryKey: qk.media.all })
      if (done) toast(done, 'success')
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Section title="Sources" className="mb-6">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="card p-4">
          <h3 className="text-sm font-semibold">Games catalog</h3>
          {!state.catalogInstalled ? (
            <p className="mt-1 text-sm text-gray-400">
              Install the games catalog from the import dialog to get box art and platforms.
            </p>
          ) : state.work ? (
            <WorkLine work={state.work} method={workLink?.method ?? null} />
          ) : (
            <p className="mt-1 text-sm text-gray-400">
              {noWork ? 'You marked this game as not in the catalog.' : 'Not matched to a catalog game yet.'}
            </p>
          )}
          {state.catalogInstalled && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn-ghost text-xs" disabled={busy} onClick={() => setPicking('work')}>
                {state.work ? 'Change…' : 'Find in catalog…'}
              </button>
              {workLink && (
                <button
                  className="btn-ghost text-xs"
                  disabled={busy}
                  onClick={() => run(() => api.gameLinks.unlinkWork(mediaId))}
                >
                  Not this game
                </button>
              )}
              {(noWork || workLink?.method === 'manual') && (
                <button
                  className="btn-ghost text-xs"
                  disabled={busy}
                  onClick={() => run(() => api.gameLinks.reset(mediaId, 'launchbox'))}
                >
                  Let matching decide
                </button>
              )}
            </div>
          )}
        </div>

        <div className="card p-4">
          <h3 className="text-sm font-semibold">Cast (Bangumi)</h3>
          {bangumi ? (
            <p className="mt-1 text-sm text-gray-300">
              Bangumi entry {bangumi.externalId}{' '}
              <span className="text-gray-400">· {METHOD_LABEL[bangumi.method]}</span>
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-400">
              {noBangumi
                ? 'You marked this game as having no Bangumi entry.'
                : 'No Bangumi entry linked, so there is no cast to read.'}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn-ghost text-xs" disabled={busy} onClick={() => setPicking('bangumi')}>
              {bangumi ? 'Change…' : 'Find on Bangumi…'}
            </button>
            {bangumi && (
              <>
                <button
                  className="btn-ghost text-xs"
                  disabled={busy}
                  onClick={() =>
                    run(async () => {
                      const r = await api.gameLinks.refreshCast(mediaId)
                      toast(`Cast read: ${r.cast} voice credits, ${r.staff} staff.`, 'success')
                    })
                  }
                >
                  Read cast again
                </button>
                <button
                  className="btn-ghost text-xs"
                  disabled={busy}
                  onClick={() => run(() => api.gameLinks.unlinkBangumi(mediaId), 'Bangumi link and its cast removed.')}
                >
                  Not this game
                </button>
              </>
            )}
            {(noBangumi || bangumi?.method === 'manual') && (
              <button
                className="btn-ghost text-xs"
                disabled={busy}
                onClick={() => run(() => api.gameLinks.reset(mediaId, 'bangumi'))}
              >
                Let matching decide
              </button>
            )}
          </div>
        </div>
      </div>

      {picking === 'work' && (
        <LinkSearchDialog
          kind="work"
          initial={title}
          onClose={() => setPicking(null)}
          onPick={(id) => {
            setPicking(null)
            void run(() => api.gameLinks.setWork(mediaId, id), 'Linked to the catalog.')
          }}
        />
      )}
      {picking === 'bangumi' && (
        <LinkSearchDialog
          kind="bangumi"
          initial={title}
          onClose={() => setPicking(null)}
          onPick={(id) => {
            setPicking(null)
            void run(async () => {
              const r = await api.gameLinks.setBangumi(mediaId, id)
              toast(`Linked. Cast read: ${r.cast} voice credits, ${r.staff} staff.`, 'success')
            })
          }}
        />
      )}
    </Section>
  )
}

function WorkLine({ work, method }: { work: GameWorkSummary; method: ExternalLinkMethod | null }): React.JSX.Element {
  return (
    <div className="mt-2 flex gap-3">
      {work.coverUrl && <img src={work.coverUrl} alt="" className="h-20 w-14 shrink-0 rounded object-cover" />}
      <div className="min-w-0 text-sm">
        <p className="font-medium text-gray-200">{work.title}</p>
        {work.titleJa && <p className="text-gray-400">{work.titleJa}</p>}
        <p className="text-xs text-gray-400">
          {[work.year, work.platforms.slice(0, 4).join(' · ')].filter(Boolean).join(' · ')}
        </p>
        {method && <p className="text-xs text-gray-500">{METHOD_LABEL[method]}</p>}
      </div>
    </div>
  )
}

interface Hit {
  id: number
  title: string
  sub: string
  coverUrl: string | null
}

function LinkSearchDialog({
  kind,
  initial,
  onPick,
  onClose
}: {
  kind: 'work' | 'bangumi'
  initial: string
  onPick: (id: number) => void
  onClose: () => void
}): React.JSX.Element {
  const [query, setQuery] = useState(initial)
  const q = useDebouncedValue(query.trim(), 350)
  const { data: hits = [], isFetching, isError } = useQuery({
    queryKey: kind === 'work' ? qk.gameLinks.works(q) : qk.gameLinks.bangumi(q),
    queryFn: async (): Promise<Hit[]> =>
      kind === 'work'
        ? (await api.gameLinks.searchWorks(q)).map((w: GameWorkSummary) => ({
            id: w.workId,
            title: w.title,
            sub: [w.titleJa, w.year, w.platforms.slice(0, 3).join(' · ')].filter(Boolean).join(' · '),
            coverUrl: w.coverUrl
          }))
        : (await api.gameLinks.searchBangumi(q)).map((b: BangumiCandidate) => ({
            id: b.id,
            title: b.name,
            sub: [b.date, `entry ${b.id}`].filter(Boolean).join(' · '),
            coverUrl: b.coverUrl
          })),
    enabled: q.length > 0
  })
  const heading = kind === 'work' ? 'Find in the games catalog' : 'Find on Bangumi'

  return (
    <Dialog
      labelledBy="game-link-search-title"
      onClose={onClose}
      panelClassName="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-lg bg-base-800 p-5 shadow-xl"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id="game-link-search-title" className="text-lg font-semibold">
          {heading}
        </h2>
        <button className="btn-ghost px-2" aria-label="Close" title="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      <Field label={kind === 'work' ? 'Title' : 'Title (Japanese titles match best)'}>
        <input className="input w-full" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
      </Field>
      <div className="mt-4 space-y-2" aria-live="polite">
        {isFetching && <p className="text-sm text-gray-400">Searching…</p>}
        {isError && <p className="text-sm text-gray-400">The search failed. Check the connection and try again.</p>}
        {!isFetching && !isError && q && hits.length === 0 && <p className="text-sm text-gray-400">No matches.</p>}
        {hits.map((h) => (
          <button
            key={h.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-base-700"
            onClick={() => onPick(h.id)}
          >
            {h.coverUrl ? (
              <img src={h.coverUrl} alt="" loading="lazy" className="h-16 w-11 shrink-0 rounded object-cover" />
            ) : (
              <div className="h-16 w-11 shrink-0 rounded bg-base-700" />
            )}
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-gray-200">{h.title}</span>
              <span className="block truncate text-xs text-gray-400">{h.sub}</span>
            </span>
          </button>
        ))}
      </div>
    </Dialog>
  )
}
