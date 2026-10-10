import { Link } from 'react-router-dom'
import {
  DISCIPLINES,
  HOLDER_KINDS,
  INTERPRETATION_TOPICS,
  POSITION_CATEGORIES,
  STANDING_LABELS,
  type HistoryInterpretation,
  type PositionCategory
} from '@shared/history/schema'
import Tabs, { TabPanel } from '../Tabs'
import { usePersistedState } from '../../lib/navState'
import { historyPath } from '../../lib/historyUi'
import { QuoteBlock } from './Citations'

// Every notable reading of an event, side by side: each position names who
// holds it and is stated in their own quoted words. A category label is
// always shown; a standing label (mainstream, minority...) appears only when a
// quoted source supports it, and fringe or revisionist views carry the
// quoted reception that places them.

const CATEGORY_TONE: Record<PositionCategory, string> = {
  contemporary: 'bg-accent/15 text-accent',
  scholarly: 'bg-signal-link/15 text-signal-link',
  official: 'bg-signal-caution/15 text-signal-caution',
  popular: 'bg-base-600 text-ink-secondary',
  revisionist: 'bg-signal-anomaly/10 text-signal-anomaly',
  fringe: 'bg-signal-anomaly/15 text-signal-anomaly'
}

export default function InterpretationsPanel({ items, pageKey }: { items: HistoryInterpretation[]; pageKey: string }) {
  const [active, setActive] = usePersistedState(`history.interp.${pageKey}`, items[0]?.id ?? '')
  if (items.length === 0) return <p className="text-sm text-ink-muted">No interpretations recorded yet.</p>
  const current = items.find((i) => i.id === active) ?? items[0]
  const tabsId = `interp-${pageKey}`
  return (
    <div>
      {items.length > 1 && (
        <Tabs
          id={tabsId}
          label="Interpretation topics"
          value={current.id}
          onChange={setActive}
          tabs={items.map((i) => ({ key: i.id, label: INTERPRETATION_TOPICS[i.topic], count: i.positions.length }))}
          className="mb-4"
        />
      )}
      <Panel tabsId={tabsId} item={current} tabbed={items.length > 1} />
    </div>
  )
}

function Panel({ tabsId, item, tabbed }: { tabsId: string; item: HistoryInterpretation; tabbed: boolean }) {
  const body = (
    <>
      {!tabbed && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">{INTERPRETATION_TOPICS[item.topic]}</p>
      )}
      {item.framing && <QuoteBlock quote={item.framing} size="sm" className="mb-4" />}
      <div className="grid gap-4 md:grid-cols-2">
        {item.positions.map((p) => (
          <div key={p.id} className={`card flex flex-col p-5 ${p.category === 'fringe' ? 'border-signal-anomaly/40' : ''}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${CATEGORY_TONE[p.category]}`}>
                {POSITION_CATEGORIES[p.category]}
              </span>
              {p.standing && (
                <span className="rounded border border-signal-affirmative/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal-affirmative">
                  {STANDING_LABELS[p.standing.label]}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm font-medium text-ink">
              {p.holders.map((h, j) => (
                <span key={j}>
                  {j > 0 && ', '}
                  {h.ref && historyPath(h.ref) ? (
                    <Link to={historyPath(h.ref)!} className="hover:text-accent">
                      {h.name}
                    </Link>
                  ) : (
                    h.name
                  )}{' '}
                  <span className="font-normal text-ink-muted">
                    {h.discipline ? DISCIPLINES[h.discipline] : HOLDER_KINDS[h.kind].toLowerCase()}
                  </span>
                </span>
              ))}
            </p>
            <div className="mt-3 flex-1 space-y-3">
              {p.statements.map((q) => (
                <QuoteBlock key={q.id} quote={q} size="sm" />
              ))}
            </div>
            {p.standing && (
              <div className="mt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">Why “{STANDING_LABELS[p.standing.label].toLowerCase()}”</p>
                <QuoteBlock quote={p.standing.quote} size="sm" className="mt-1" />
              </div>
            )}
            {p.reception && p.reception.length > 0 && (
              <div className="mt-3 rounded-md border border-line-subtle bg-base-800/70 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {p.category === 'official' ? 'Independent assessment' : 'How scholars received it'}
                </p>
                <div className="mt-2 space-y-2">
                  {p.reception.map((q) => (
                    <QuoteBlock key={q.id} quote={q} size="sm" />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
  return tabbed ? (
    <TabPanel tabsId={tabsId} value={item.id}>
      {body}
    </TabPanel>
  ) : (
    body
  )
}
