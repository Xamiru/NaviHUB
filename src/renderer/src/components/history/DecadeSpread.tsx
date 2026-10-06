import { Link } from 'react-router-dom'
import { regionLabel } from '@shared/history/schema'
import type { HistoryDecade, HistoryRefInfo } from '@shared/types'
import Section from '../Section'
import { historyPath } from '../../lib/historyUi'
import { HistoryImg, ImageCredit, NativeName, RefRow } from './HistoryBits'
import { MediaShelf } from './HistoryMediaCards'

// A decade's front page: its lead stories as large archival-photo cards, the
// rest grouped by region, events still running from earlier decades, who was
// born and who died, and the library titles linked to its events.

function LeadCard({ info, big }: { info: HistoryRefInfo; big?: boolean }) {
  const to = historyPath(info.ref) ?? '/history'
  return (
    <Link
      to={to}
      className={`group relative block overflow-hidden rounded-lg border border-line-subtle bg-gradient-to-br from-base-600 via-base-700 to-black ${
        big ? 'min-h-[320px]' : 'min-h-[150px]'
      }`}
    >
      <HistoryImg
        image={info.image}
        alt=""
        className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <ImageCredit image={info.image} className="absolute right-2 top-2 max-w-[70%] truncate" />
      <div className="media-contrast absolute inset-x-0 bottom-0 p-5">
        <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${big ? 'text-accent' : 'text-signal-link'}`}>
          {big ? 'Lead story · ' : ''}
          {info.region ? regionLabel(info.region) : info.sub}
        </p>
        <h3 className={`mt-1.5 font-semibold leading-tight text-white group-hover:text-accent ${big ? 'text-4xl' : 'text-xl'}`}>
          {info.title}
        </h3>
        <p className="mt-1 text-sm tabular-nums text-gray-300">
          {[info.sub, info.years].filter(Boolean).join(' · ')}
          {info.native && (
            <>
              {' · '}
              <NativeName native={info.native} />
            </>
          )}
        </p>
      </div>
    </Link>
  )
}

export default function DecadeSpread({ data }: { data: HistoryDecade }) {
  const [lead, ...second] = data.lead
  if (!lead && data.continuing.length === 0) {
    return <div className="card p-8 text-sm text-ink-muted">Nothing researched for the {data.start}s yet.</div>
  }
  const aside = data.continuing.length > 0 || data.born.length > 0 || data.died.length > 0
  return (
    <div>
      {lead && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <LeadCard info={lead} big />
          {second.length > 0 && (
            <div className="grid gap-4">
              {second.map((s) => (
                <LeadCard key={s.ref} info={s} />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">Around the world</p>
            <span className="text-xs tabular-nums text-ink-muted">
              Read {data.read} of {data.total}
            </span>
          </div>
          {data.byRegion.length === 0 ? (
            <p className="text-sm text-ink-muted">Only the lead stories so far.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {data.byRegion.map((g) => (
                <div key={g.region}>
                  <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${g.region === 'iran' ? 'text-accent' : 'text-signal-link'}`}>
                    {regionLabel(g.region)}
                  </p>
                  <ul className="space-y-2.5">
                    {g.items.map((i) => (
                      <li key={i.ref}>
                        <RefRow info={i} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {aside && (
          <div className="space-y-6">
            {data.continuing.length > 0 && (
              <div className="card p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">
                  Continuing from earlier
                </p>
                <ul className="space-y-2.5">
                  {data.continuing.map((i) => (
                    <li key={`c-${i.ref}`}>
                      <RefRow info={i} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(data.born.length > 0 || data.died.length > 0) && (
              <div className="card p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">Born and died</p>
                <ul className="space-y-2.5">
                  {data.died.map((p) => (
                    <li key={`d-${p.ref}`}>
                      <RefRow info={p} extra={<span className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">Died</span>} />
                    </li>
                  ))}
                  {data.born.map((p) => (
                    <li key={`b-${p.ref}`}>
                      <RefRow info={p} extra={<span className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">Born</span>} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {data.media.length > 0 && (
        <Section title="In your library" subtitle="Titles linked to this decade's events" className="mt-8">
          <MediaShelf cards={data.media} />
        </Section>
      )}
    </div>
  )
}
