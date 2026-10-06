import { useId, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { gregorianToJulian, julianToGregorian, parseDate } from '@shared/history/calendars'
import {
  NAME_ROLES,
  PROVENANCE_VIA,
  parseRef,
  type Cite,
  type Claim,
  type EntityKind,
  type HistDate,
  type Locator,
  type NameRole,
  type NameVariant,
  type Quote
} from '@shared/history/schema'
import { Field, Fieldset } from '../Field'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDebouncedValue } from '../../lib/hooks'

// Form pieces for the personal-entity editor. They edit the content schema's
// own shapes, so a saved entity passes through exactly the validator that
// committed research content does: every quote and dated claim needs a
// source, a locator and a note of how the text was copied.

export function today(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function newQuoteId(): string {
  return `q${Math.random().toString(36).slice(2, 8)}`
}

export function emptyQuote(): Quote {
  return { id: newQuoteId(), text: '', lang: 'en', cite: { source: '', loc: { page: '' } }, provenance: { via: 'print', at: today() } }
}

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" className="btn-ghost h-8 shrink-0 px-2 text-xs" onClick={onClick} aria-label={label} title={label}>
      ✕
    </button>
  )
}

export function SourcePicker({ value, onChange, label = 'Source' }: { value: string; onChange: (id: string) => void; label?: string }) {
  const { data = [] } = useQuery({ queryKey: qk.history.sources, queryFn: () => api.history.sources() })
  const sorted = useMemo(() => [...data].sort((a, b) => a.title.localeCompare(b.title)), [data])
  return (
    <div className="flex items-end gap-2">
      <Field label={label} className="min-w-0 flex-1">
        <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose a source</option>
          {sorted.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
              {s.date ? ` (${s.date.slice(0, 4)})` : ''}
              {s.personal ? ' · yours' : ''}
            </option>
          ))}
        </select>
      </Field>
      <Link to="/history/new/source" className="btn-ghost h-9 shrink-0 text-xs">
        New source
      </Link>
    </div>
  )
}

export function LocatorFields({ value, onChange }: { value: Locator; onChange: (l: Locator) => void }) {
  const set = (k: keyof Locator, v: string): void => onChange({ ...value, [k]: v || undefined })
  return (
    <div className="grid grid-cols-3 gap-2">
      <Field label="Page">
        <input className="input" value={value.page ?? ''} onChange={(e) => set('page', e.target.value)} placeholder="e.g. 155" />
      </Field>
      <Field label="Section">
        <input className="input" value={value.section ?? ''} onChange={(e) => set('section', e.target.value)} />
      </Field>
      <Field label="Time code">
        <input className="input" value={value.time ?? ''} onChange={(e) => set('time', e.target.value)} placeholder="00:12:40" />
      </Field>
    </div>
  )
}

export function CiteEditor({ value, onChange }: { value: Cite; onChange: (c: Cite) => void }) {
  return (
    <div className="space-y-2">
      <SourcePicker value={value.source} onChange={(source) => onChange({ ...value, source })} />
      <LocatorFields value={value.loc} onChange={(loc) => onChange({ ...value, loc })} />
    </div>
  )
}

export function CitesEditor({ value, onChange, legend = 'Citations' }: { value: Cite[]; onChange: (c: Cite[]) => void; legend?: string }) {
  return (
    <Fieldset legend={legend} className="space-y-3 rounded-md border border-line-subtle p-3">
      {value.map((c, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <CiteEditor value={c} onChange={(next) => onChange(value.map((x, j) => (j === i ? next : x)))} />
          </div>
          <RemoveButton label="Remove citation" onClick={() => onChange(value.filter((_, j) => j !== i))} />
        </div>
      ))}
      <button type="button" className="btn-ghost h-8 text-xs" onClick={() => onChange([...value, { source: '', loc: { page: '' } }])}>
        Add citation
      </button>
    </Fieldset>
  )
}

/** A date stored as Gregorian; Old Style input converts on entry. */
export function DateEditor({ value, onChange, label }: { value: HistDate; onChange: (d: HistDate) => void; label: string }) {
  const id = useId()
  const parsed = parseDate(value.d)
  const os =
    value.julian && parsed?.precision === 'day'
      ? (() => {
          const j = gregorianToJulian({ y: parsed.y, m: parsed.m!, d: parsed.d! })
          return `${j.y}-${String(j.m).padStart(2, '0')}-${String(j.d).padStart(2, '0')}`
        })()
      : ''
  const [osInput, setOsInput] = useState(os)
  return (
    <Fieldset legend={label} className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <Field label="Date (Gregorian)" description="YYYY, YYYY-MM or YYYY-MM-DD" error={value.d && !parsed ? 'Not a valid date' : undefined}>
          <input className="input tabular-nums" value={value.d} onChange={(e) => onChange({ ...value, d: e.target.value.trim() })} placeholder="1979-02-11" />
        </Field>
        <Field label="Not after (if uncertain)">
          <input
            className="input tabular-nums"
            value={value.notAfter ?? ''}
            onChange={(e) => onChange({ ...value, notAfter: e.target.value.trim() || undefined })}
          />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
        <label className="flex items-center gap-2" htmlFor={`${id}-approx`}>
          <input id={`${id}-approx`} type="checkbox" checked={!!value.approx} onChange={(e) => onChange({ ...value, approx: e.target.checked || undefined })} />
          Approximate (shown as c.)
        </label>
        <label className="flex items-center gap-2" htmlFor={`${id}-os`}>
          <input id={`${id}-os`} type="checkbox" checked={!!value.julian} onChange={(e) => onChange({ ...value, julian: e.target.checked || undefined })} />
          The source dates it Old Style
        </label>
      </div>
      {value.julian && (
        <Field label="Old Style date as the source gives it" description="Converted to Gregorian when you enter a full date">
          <input
            className="input tabular-nums"
            value={osInput}
            onChange={(e) => {
              const v = e.target.value.trim()
              setOsInput(v)
              const p = parseDate(v)
              if (p?.precision === 'day') {
                const g = julianToGregorian({ y: p.y, m: p.m!, d: p.d! })
                onChange({ ...value, d: `${g.y}-${String(g.m).padStart(2, '0')}-${String(g.d).padStart(2, '0')}` })
              }
            }}
            placeholder="1917-10-25"
          />
        </Field>
      )}
    </Fieldset>
  )
}

/** A dated claim: one value or several sourced alternatives, each cited. */
export function DateClaimEditor({
  value,
  onChange,
  label
}: {
  value: Claim<HistDate> | undefined
  onChange: (c: Claim<HistDate> | undefined) => void
  label: string
}) {
  const alts = value?.alts ?? []
  if (alts.length === 0) {
    return (
      <div>
        <p className="label mb-2">{label}</p>
        <button type="button" className="btn-ghost h-8 text-xs" onClick={() => onChange({ alts: [{ value: { d: '' }, cites: [{ source: '', loc: { page: '' } }] }] })}>
          Add {label.toLowerCase()}
        </button>
      </div>
    )
  }
  const setAlt = (i: number, patch: Partial<(typeof alts)[number]>): void =>
    onChange({ alts: alts.map((a, j) => (j === i ? { ...a, ...patch } : a)) })
  return (
    <div className="space-y-3">
      {alts.map((a, i) => (
        <div key={i} className="rounded-md border border-line-subtle p-3">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1 space-y-3">
              <DateEditor label={alts.length > 1 ? `${label}, value ${i + 1}` : label} value={a.value} onChange={(v) => setAlt(i, { value: v })} />
              <CitesEditor value={a.cites} onChange={(cites) => setAlt(i, { cites })} />
            </div>
            <RemoveButton
              label={`Remove ${label.toLowerCase()} value`}
              onClick={() => {
                const next = alts.filter((_, j) => j !== i)
                onChange(next.length ? { alts: next } : undefined)
              }}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn-ghost h-8 text-xs"
        onClick={() => onChange({ alts: [...alts, { value: { d: '' }, cites: [{ source: '', loc: { page: '' } }] }] })}
      >
        Add a disputed alternative
      </button>
    </div>
  )
}

export function QuoteEditor({ value, onChange, onRemove }: { value: Quote; onChange: (q: Quote) => void; onRemove: () => void }) {
  return (
    <div className="rounded-md border border-line-subtle p-3">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1 space-y-3">
          <Field label="Quote, word for word" description="Copy the text exactly as printed. Mark any omission with […].">
            <textarea className="input min-h-[96px]" dir="auto" lang={value.lang} value={value.text} onChange={(e) => onChange({ ...value, text: e.target.value })} />
          </Field>
          <div className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)]">
            <Field label="Language" description="e.g. en, fa, fr">
              <input className="input" value={value.lang} onChange={(e) => onChange({ ...value, lang: e.target.value.trim() })} />
            </Field>
            <div />
          </div>
          <CiteEditor value={value.cite} onChange={(cite) => onChange({ ...value, cite })} />
          <div className="grid gap-2 sm:grid-cols-3">
            <Field label="Copied from">
              <select
                className="input"
                value={value.provenance.via}
                onChange={(e) => onChange({ ...value, provenance: { ...value.provenance, via: e.target.value as Quote['provenance']['via'] } })}
              >
                {Object.entries(PROVENANCE_VIA).map(([k, l]) => (
                  <option key={k} value={k}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="On">
              <input
                className="input tabular-nums"
                value={value.provenance.at}
                onChange={(e) => onChange({ ...value, provenance: { ...value.provenance, at: e.target.value.trim() } })}
              />
            </Field>
            <Field label="Web address" description={value.provenance.via === 'web' ? 'Required for web copies' : undefined}>
              <input
                className="input"
                value={value.provenance.url ?? ''}
                onChange={(e) => onChange({ ...value, provenance: { ...value.provenance, url: e.target.value.trim() || undefined } })}
              />
            </Field>
          </div>
        </div>
        <RemoveButton label="Remove quote" onClick={onRemove} />
      </div>
    </div>
  )
}

export function QuotesEditor({ value, onChange, legend }: { value: Quote[]; onChange: (q: Quote[]) => void; legend: string }) {
  return (
    <Fieldset legend={legend} className="space-y-3">
      {value.map((q, i) => (
        <QuoteEditor
          key={q.id}
          value={q}
          onChange={(next) => onChange(value.map((x, j) => (j === i ? next : x)))}
          onRemove={() => onChange(value.filter((_, j) => j !== i))}
        />
      ))}
      <button type="button" className="btn-ghost h-8 text-xs" onClick={() => onChange([...value, emptyQuote()])}>
        Add quote
      </button>
    </Fieldset>
  )
}

const OTHER_NAME_ROLES: NameRole[] = ['alternative', 'official', 'contested', 'former']

export function NamesEditor({ value, onChange }: { value: NameVariant[]; onChange: (n: NameVariant[]) => void }) {
  const primary = value.find((n) => n.role === 'primary') ?? { text: '', lang: 'en', role: 'primary' as const }
  const native = value.find((n) => n.role === 'native')
  const others = value.filter((n) => n.role !== 'primary' && n.role !== 'native')
  const rebuild = (p: NameVariant, nat: NameVariant | undefined, rest: NameVariant[]): void =>
    onChange([p, ...(nat && nat.text ? [nat] : []), ...rest])
  return (
    <Fieldset legend="Names" className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_8rem]">
        <Field label="Name">
          <input className="input" value={primary.text} onChange={(e) => rebuild({ ...primary, text: e.target.value }, native, others)} />
        </Field>
        <Field label="Language">
          <input className="input" value={primary.lang} onChange={(e) => rebuild({ ...primary, lang: e.target.value.trim() }, native, others)} />
        </Field>
      </div>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_8rem]">
        <Field label="Native-script name (optional)">
          <input
            className="input"
            dir="auto"
            value={native?.text ?? ''}
            onChange={(e) => rebuild(primary, { text: e.target.value, lang: native?.lang ?? 'fa', role: 'native' }, others)}
          />
        </Field>
        <Field label="Its language">
          <input
            className="input"
            value={native?.lang ?? 'fa'}
            onChange={(e) => rebuild(primary, { text: native?.text ?? '', lang: e.target.value.trim(), role: 'native' }, others)}
          />
        </Field>
      </div>
      {others.map((n, i) => (
        <div key={i} className="rounded-md border border-line-subtle p-3">
          <div className="flex items-start gap-2">
            <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-[minmax(0,1fr)_8rem_10rem]">
              <Field label="Other name">
                <input
                  className="input"
                  dir="auto"
                  value={n.text}
                  onChange={(e) => rebuild(primary, native, others.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                />
              </Field>
              <Field label="Language">
                <input
                  className="input"
                  value={n.lang}
                  onChange={(e) => rebuild(primary, native, others.map((x, j) => (j === i ? { ...x, lang: e.target.value.trim() } : x)))}
                />
              </Field>
              <Field label="Kind">
                <select
                  className="input"
                  value={n.role}
                  onChange={(e) => rebuild(primary, native, others.map((x, j) => (j === i ? { ...x, role: e.target.value as NameRole } : x)))}
                >
                  {OTHER_NAME_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {NAME_ROLES[r]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <RemoveButton label="Remove name" onClick={() => rebuild(primary, native, others.filter((_, j) => j !== i))} />
          </div>
          {(n.role === 'official' || n.role === 'contested') && (
            <div className="mt-2">
              <CitesEditor
                legend="Who uses this name (cited)"
                value={n.cites ?? []}
                onChange={(cites) => rebuild(primary, native, others.map((x, j) => (j === i ? { ...x, cites } : x)))}
              />
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn-ghost h-8 text-xs"
        onClick={() => rebuild(primary, native, [...others, { text: '', lang: 'en', role: 'alternative' }])}
      >
        Add another name
      </button>
    </Fieldset>
  )
}

/** Search History for an entity of the allowed kinds. */
export function RefPicker({
  kinds,
  value,
  onChange,
  label
}: {
  kinds: EntityKind[]
  value: string | null
  onChange: (ref: string | null) => void
  label: string
}) {
  const [q, setQ] = useState('')
  const debounced = useDebouncedValue(q, 200)
  const { data = [] } = useQuery({
    queryKey: qk.history.search(debounced),
    queryFn: () => api.history.search(debounced),
    enabled: debounced.trim().length > 1
  })
  const hits = data.filter((h) => kinds.includes(h.kind)).slice(0, 8)
  if (value) {
    const p = parseRef(value)
    return (
      <div>
        <p className="label mb-1">{label}</p>
        <div className="flex items-center gap-2 rounded-md border border-line-subtle px-3 py-2 text-sm">
          <span className="min-w-0 flex-1 truncate text-ink">{p ? `${p.kind}: ${p.id}` : value}</span>
          <button type="button" className="btn-ghost h-7 text-xs" onClick={() => onChange(null)}>
            Change
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Field label={label}>
        <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search History" />
      </Field>
      {hits.length > 0 && (
        <ul className="mt-1 max-h-56 overflow-y-auto rounded-md border border-line-subtle">
          {hits.map((h) => (
            <li key={h.ref}>
              <button type="button" className="w-full px-3 py-2 text-left text-sm hover:bg-base-700/60" onClick={() => onChange(h.ref)}>
                <span className="text-ink">{h.title}</span>
                {h.subtitle && <span className="ml-2 text-xs text-ink-muted">{h.subtitle}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ChipChoices<K extends string>({
  legend,
  options,
  value,
  onChange
}: {
  legend: string
  options: Array<{ key: K; label: string }>
  value: K[]
  onChange: (v: K[]) => void
}) {
  return (
    <Fieldset legend={legend}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.key)
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={on}
              className={`chip-toggle ${on ? 'chip-toggle-active' : ''}`}
              onClick={() => onChange(on ? value.filter((v) => v !== o.key) : [...value, o.key])}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </Fieldset>
  )
}

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card space-y-4 p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">{title}</h2>
      {children}
    </section>
  )
}
