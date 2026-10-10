import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  CONTRIBUTOR_ROLES,
  EVENT_TYPES,
  HOLDER_KINDS,
  INTERPRETATION_TOPICS,
  PERIOD_TYPES,
  PERSON_ROLES,
  POSITION_CATEGORIES,
  RECEPTION_REQUIRED,
  REGIONS,
  SECTION_KINDS,
  SOURCE_TYPES,
  type HistoryEvent,
  type HistoryInterpretation,
  type HistoryPeriod,
  type HistoryPerson,
  type HistorySource,
  type Holder,
  type Position,
  type Section,
  type SectionKind
} from '@shared/history/schema'
import type { HistorySaveResult, HistoryUserEntity } from '@shared/types'
import BackButton from '../components/BackButton'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import ActionMenu from '../components/ActionMenu'
import { Field, Fieldset } from '../components/Field'
import {
  ChipChoices,
  DateClaimEditor,
  FormSection,
  NamesEditor,
  QuotesEditor,
  RefPicker
} from '../components/history/HistoryEditors'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import { useEditLeaveGuard } from '../lib/browserTabs'
import { useLeaveDeleted } from '../lib/navState'

// The in-app editor for the user's own History entities. Content written here
// lives in this machine's database, is marked Personal everywhere, and must
// pass the same validator as researched content: sources, locators and
// verbatim quotes are required, so the no-AI-text rule holds for the user's
// own additions too.

type EditKind = 'event' | 'person' | 'period' | 'source' | 'interpretation'

const KIND_LABEL: Record<EditKind, string> = {
  event: 'event',
  person: 'person',
  period: 'period',
  source: 'source',
  interpretation: 'interpretation'
}

const noName = [{ text: '', lang: 'en', role: 'primary' as const }]

function blank(kind: EditKind): HistoryUserEntity {
  switch (kind) {
    case 'event':
      return {
        v: 1,
        kind,
        id: '',
        names: noName,
        researched: '',
        type: 'other',
        start: { alts: [{ value: { d: '' }, cites: [{ source: '', loc: { page: '' } }] }] },
        regions: ['iran'],
        prominence: 2,
        sections: [{ kind: 'overview', quotes: [] }]
      }
    case 'person':
      return { v: 1, kind, id: '', names: noName, researched: '', regions: ['iran'], roles: ['other'], sections: [{ kind: 'overview', quotes: [] }] }
    case 'period':
      return {
        v: 1,
        kind,
        id: '',
        names: noName,
        researched: '',
        periodType: 'era',
        start: { alts: [{ value: { d: '' }, cites: [{ source: '', loc: { page: '' } }] }] },
        regions: ['iran'],
        prominence: 2,
        sections: [{ kind: 'overview', quotes: [] }]
      }
    case 'source':
      return { v: 1, kind, id: '', type: 'book', title: '', lang: 'en', contributors: [{ name: '', role: 'author' }], date: '' }
    case 'interpretation':
      return {
        v: 1,
        kind,
        id: '',
        about: [],
        topic: 'causes',
        researched: '',
        positions: [{ id: 'p1', category: 'scholarly', holders: [{ kind: 'scholar', name: '' }], statements: [] }]
      }
  }
}

/** Drops empty optional parts so a half-filled form validates cleanly. */
function clean(e: HistoryUserEntity): HistoryUserEntity {
  const sections = (s: Section[] | undefined): Section[] => (s ?? []).filter((x) => x.quotes.length > 0)
  if (e.kind === 'event' || e.kind === 'period') {
    const end = e.end?.alts.filter((a) => a.value.d) ?? []
    return { ...e, sections: sections(e.sections), end: end.length ? { alts: end } : undefined } as HistoryUserEntity
  }
  if (e.kind === 'person') {
    const born = e.born?.alts.filter((a) => a.value.d) ?? []
    const died = e.died?.alts.filter((a) => a.value.d) ?? []
    return {
      ...e,
      sections: sections(e.sections),
      born: born.length ? { alts: born } : undefined,
      died: died.length ? { alts: died } : undefined
    }
  }
  if (e.kind === 'source') {
    return { ...e, contributors: e.contributors.filter((c) => c.name.trim()) }
  }
  return e
}

function viewPath(kind: EditKind, id: string): string {
  return kind === 'source' ? `/history/source/${id}` : kind === 'interpretation' ? '/history/my' : `/history/${kind}/${id}`
}

function SectionsEditor({ value, onChange }: { value: Section[]; onChange: (s: Section[]) => void }) {
  return (
    <div className="space-y-5">
      {value.map((s, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-end gap-2">
            <Field label="Section" className="w-56">
              <select className="input" value={s.kind} onChange={(e) => onChange(value.map((x, j) => (j === i ? { ...x, kind: e.target.value as SectionKind } : x)))}>
                {Object.entries(SECTION_KINDS).map(([k, l]) => (
                  <option key={k} value={k}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            {value.length > 1 && (
              <button type="button" className="btn-ghost h-9 text-xs" onClick={() => onChange(value.filter((_, j) => j !== i))}>
                Remove section
              </button>
            )}
          </div>
          <QuotesEditor legend={`${SECTION_KINDS[s.kind]} quotes`} value={s.quotes} onChange={(quotes) => onChange(value.map((x, j) => (j === i ? { ...x, quotes } : x)))} />
        </div>
      ))}
      <button type="button" className="btn-ghost h-8 text-xs" onClick={() => onChange([...value, { kind: 'background', quotes: [] }])}>
        Add section
      </button>
    </div>
  )
}

const regionOptions = REGIONS.map((r) => ({ key: r.key, label: r.label }))

function EventForm({ value, onChange }: { value: HistoryEvent; onChange: (v: HistoryEvent) => void }) {
  return (
    <>
      <FormSection title="Event">
        <NamesEditor value={value.names} onChange={(names) => onChange({ ...value, names })} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Type">
            <select className="input" value={value.type} onChange={(e) => onChange({ ...value, type: e.target.value as HistoryEvent['type'] })}>
              {Object.entries(EVENT_TYPES).map(([k, l]) => (
                <option key={k} value={k}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Prominence on the timeline" description="1 is always labelled">
            <select className="input" value={value.prominence} onChange={(e) => onChange({ ...value, prominence: Number(e.target.value) as 1 | 2 | 3 })}>
              <option value={1}>1, major</option>
              <option value={2}>2</option>
              <option value={3}>3, minor</option>
            </select>
          </Field>
        </div>
        <ChipChoices legend="Regions (the first is its timeline lane)" options={regionOptions} value={value.regions} onChange={(regions) => onChange({ ...value, regions })} />
        <RefPicker
          kinds={['event', 'period']}
          label="Part of (optional)"
          value={value.partOf?.[0]?.ref ?? null}
          onChange={(ref) => onChange({ ...value, partOf: ref ? [{ ref }] : undefined })}
        />
      </FormSection>
      <FormSection title="Dates">
        <DateClaimEditor label="Start" value={value.start} onChange={(start) => onChange({ ...value, start: start ?? { alts: [] } })} />
        <DateClaimEditor label="End" value={value.end} onChange={(end) => onChange({ ...value, end })} />
      </FormSection>
      <FormSection title="Quoted text">
        <SectionsEditor value={value.sections} onChange={(sections) => onChange({ ...value, sections })} />
      </FormSection>
    </>
  )
}

function PersonForm({ value, onChange }: { value: HistoryPerson; onChange: (v: HistoryPerson) => void }) {
  return (
    <>
      <FormSection title="Person">
        <NamesEditor value={value.names} onChange={(names) => onChange({ ...value, names })} />
        <ChipChoices
          legend="Roles"
          options={Object.entries(PERSON_ROLES).map(([key, label]) => ({ key: key as HistoryPerson['roles'][number], label }))}
          value={value.roles}
          onChange={(roles) => onChange({ ...value, roles })}
        />
        <ChipChoices legend="Regions" options={regionOptions} value={value.regions} onChange={(regions) => onChange({ ...value, regions })} />
      </FormSection>
      <FormSection title="Life">
        <DateClaimEditor label="Born" value={value.born} onChange={(born) => onChange({ ...value, born })} />
        <DateClaimEditor label="Died" value={value.died} onChange={(died) => onChange({ ...value, died })} />
      </FormSection>
      <FormSection title="Quoted text">
        <SectionsEditor value={value.sections} onChange={(sections) => onChange({ ...value, sections })} />
      </FormSection>
    </>
  )
}

function PeriodForm({ value, onChange }: { value: HistoryPeriod; onChange: (v: HistoryPeriod) => void }) {
  return (
    <>
      <FormSection title="Period">
        <NamesEditor value={value.names} onChange={(names) => onChange({ ...value, names })} />
        <Field label="Type">
          <select className="input" value={value.periodType} onChange={(e) => onChange({ ...value, periodType: e.target.value as HistoryPeriod['periodType'] })}>
            {Object.entries(PERIOD_TYPES).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <ChipChoices legend="Regions (Global draws it as a band over every lane)" options={regionOptions} value={value.regions} onChange={(regions) => onChange({ ...value, regions })} />
        <RefPicker kinds={['period']} label="Within a larger period (optional)" value={value.parent ?? null} onChange={(parent) => onChange({ ...value, parent: parent ?? undefined })} />
      </FormSection>
      <FormSection title="Dates">
        <DateClaimEditor label="Start" value={value.start} onChange={(start) => onChange({ ...value, start: start ?? { alts: [] } })} />
        <DateClaimEditor label="End" value={value.end} onChange={(end) => onChange({ ...value, end })} />
      </FormSection>
      <FormSection title="Quoted text">
        <SectionsEditor value={value.sections} onChange={(sections) => onChange({ ...value, sections })} />
      </FormSection>
    </>
  )
}

function SourceForm({ value, onChange }: { value: HistorySource; onChange: (v: HistorySource) => void }) {
  const set = <K extends keyof HistorySource>(k: K, v: HistorySource[K]): void => onChange({ ...value, [k]: v })
  const text = (k: 'container' | 'publisher' | 'place' | 'url' | 'accessed' | 'pages' | 'edition' | 'localCopy', label: string, description?: string): JSX.Element => (
    <Field label={label} description={description}>
      <input className="input" value={(value[k] as string | undefined) ?? ''} onChange={(e) => set(k, e.target.value || undefined)} />
    </Field>
  )
  return (
    <FormSection title="Source">
      <div className="grid gap-3 sm:grid-cols-[12rem_minmax(0,1fr)_7rem]">
        <Field label="Type">
          <select className="input" value={value.type} onChange={(e) => set('type', e.target.value as HistorySource['type'])}>
            {Object.entries(SOURCE_TYPES).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Title">
          <input className="input" dir="auto" value={value.title} onChange={(e) => set('title', e.target.value)} />
        </Field>
        <Field label="Language">
          <input className="input" value={value.lang} onChange={(e) => set('lang', e.target.value.trim())} />
        </Field>
      </div>
      <Fieldset legend="Contributors" className="space-y-2">
        {value.contributors.map((c, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_10rem_auto]">
            <Field label="Name" hiddenLabel>
              <input
                className="input"
                placeholder="Name"
                value={c.name}
                onChange={(e) => set('contributors', value.contributors.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
              />
            </Field>
            <Field label="Role" hiddenLabel>
              <select
                className="input"
                value={c.role}
                onChange={(e) =>
                  set('contributors', value.contributors.map((x, j) => (j === i ? { ...x, role: e.target.value as typeof c.role } : x)))
                }
              >
                {Object.entries(CONTRIBUTOR_ROLES).map(([k, l]) => (
                  <option key={k} value={k}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <button type="button" className="btn-ghost h-9 text-xs" onClick={() => set('contributors', value.contributors.filter((_, j) => j !== i))}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn-ghost h-8 text-xs" onClick={() => set('contributors', [...value.contributors, { name: '', role: 'author' }])}>
          Add contributor
        </button>
      </Fieldset>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Date" description="YYYY or YYYY-MM-DD">
          <input className="input tabular-nums" value={value.date} onChange={(e) => set('date', e.target.value.trim())} />
        </Field>
        {text('publisher', 'Publisher')}
        {text('place', 'Place')}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {text('container', 'In (book or journal)')}
        {text('pages', 'Pages')}
        {text('edition', 'Edition')}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {text('url', 'Web address', 'Never Wikipedia or Wikidata')}
        {text('accessed', 'Accessed', 'YYYY-MM-DD, for web sources')}
        {text('localCopy', 'Your copy', 'File name in your books folder')}
      </div>
    </FormSection>
  )
}

function HoldersEditor({ value, onChange }: { value: Holder[]; onChange: (h: Holder[]) => void }) {
  return (
    <Fieldset legend="Held by" className="space-y-2">
      {value.map((h, i) => (
        <div key={i} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_12rem_auto]">
          <Field label="Holder name" hiddenLabel>
            <input className="input" placeholder="Name of the scholar, state or group" value={h.name} onChange={(e) => onChange(value.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          </Field>
          <Field label="Holder kind" hiddenLabel>
            <select className="input" value={h.kind} onChange={(e) => onChange(value.map((x, j) => (j === i ? { ...x, kind: e.target.value as Holder['kind'] } : x)))}>
              {Object.entries(HOLDER_KINDS).map(([k, l]) => (
                <option key={k} value={k}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <button type="button" className="btn-ghost h-9 text-xs" onClick={() => onChange(value.filter((_, j) => j !== i))}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn-ghost h-8 text-xs" onClick={() => onChange([...value, { kind: 'scholar', name: '' }])}>
        Add holder
      </button>
    </Fieldset>
  )
}

function InterpretationForm({ value, onChange }: { value: HistoryInterpretation; onChange: (v: HistoryInterpretation) => void }) {
  const setPos = (i: number, p: Position): void => onChange({ ...value, positions: value.positions.map((x, j) => (j === i ? p : x)) })
  return (
    <>
      <FormSection title="Question">
        <RefPicker kinds={['event', 'person', 'period', 'place']} label="About" value={value.about[0] ?? null} onChange={(ref) => onChange({ ...value, about: ref ? [ref] : [] })} />
        <Field label="Topic">
          <select className="input" value={value.topic} onChange={(e) => onChange({ ...value, topic: e.target.value as HistoryInterpretation['topic'] })}>
            {Object.entries(INTERPRETATION_TOPICS).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
        </Field>
      </FormSection>
      {value.positions.map((p, i) => (
        <FormSection key={p.id} title={`Position ${i + 1}`}>
          <div className="flex items-end gap-2">
            <Field label="Category" className="w-60">
              <select className="input" value={p.category} onChange={(e) => setPos(i, { ...p, category: e.target.value as Position['category'] })}>
                {Object.entries(POSITION_CATEGORIES).map(([k, l]) => (
                  <option key={k} value={k}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            {value.positions.length > 1 && (
              <button type="button" className="btn-ghost h-9 text-xs" onClick={() => onChange({ ...value, positions: value.positions.filter((_, j) => j !== i) })}>
                Remove position
              </button>
            )}
          </div>
          <HoldersEditor value={p.holders} onChange={(holders) => setPos(i, { ...p, holders })} />
          <QuotesEditor legend="In their words" value={p.statements} onChange={(statements) => setPos(i, { ...p, statements })} />
          {(RECEPTION_REQUIRED.has(p.category) || p.category === 'official' || (p.reception?.length ?? 0) > 0) && (
            <QuotesEditor
              legend={p.category === 'official' ? 'Independent assessment (required for government claims)' : 'How scholars received it (required for fringe and revisionist views)'}
              value={p.reception ?? []}
              onChange={(reception) => setPos(i, { ...p, reception })}
            />
          )}
        </FormSection>
      ))}
      <button
        type="button"
        className="btn-ghost"
        onClick={() =>
          onChange({
            ...value,
            positions: [...value.positions, { id: `p${Date.now().toString(36)}`, category: 'scholarly', holders: [{ kind: 'scholar', name: '' }], statements: [] }]
          })
        }
      >
        Add position
      </button>
    </>
  )
}

export default function HistoryEditPage() {
  const params = useParams()
  const editingId = params.id ?? null
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const leaveDeleted = useLeaveDeleted()
  const { data: existing, isLoading } = useQuery({
    queryKey: qk.history.userEntity(editingId ?? ''),
    queryFn: () => api.history.userEntity(editingId!),
    enabled: !!editingId
  })
  const kind = (existing?.kind ?? params.kind ?? 'event') as EditKind
  const [draft, setDraft] = useState<HistoryUserEntity | null>(editingId ? null : blank(kind))
  const [result, setResult] = useState<HistorySaveResult | null>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => {
    if (existing && !draft) setDraft(structuredClone(existing))
  }, [existing, draft])
  useEditLeaveGuard(draft, !!draft)

  if (!KIND_LABEL[kind]) return <PageStatus>Unknown kind.</PageStatus>
  if (editingId && isLoading) return <PageStatus>Loading…</PageStatus>
  if (editingId && !existing) return <PageStatus>That entry no longer exists.</PageStatus>
  if (!draft) return <PageStatus>Loading…</PageStatus>

  const save = async (): Promise<void> => {
    setSaving(true)
    try {
      const r = await api.history.saveUserEntity(clean(draft))
      setResult(r)
      if (r.ok && r.id) {
        await queryClient.invalidateQueries({ queryKey: qk.history.all })
        navigate(viewPath(kind, r.id), { replace: true })
      }
    } finally {
      setSaving(false)
    }
  }

  const remove = async (): Promise<void> => {
    if (!editingId) return
    if (!(await confirmDialog('Delete this entry of yours? Files attached to it are deleted from the History folder. Its notes and links stay but point at nothing.', { confirmLabel: 'Delete', danger: true }))) return
    await api.history.removeUserEntity(editingId)
    await queryClient.invalidateQueries({ queryKey: qk.history.all })
    leaveDeleted((p) => p.split(/[/?#]/).includes(editingId), '/history/my')
  }

  const errors = result?.issues.filter((i) => i.severity === 'error') ?? []
  return (
    <div className="mx-auto max-w-4xl p-6">
      <BackButton fallback="/history/my" />
      <PageHeader
        title={editingId ? `Edit your ${KIND_LABEL[kind]}` : `New ${KIND_LABEL[kind]}`}
        subtitle="Your own entries are saved on this machine and marked Personal. Like researched entries, every passage must be a quote copied word for word from a source you cite."
        actions={
          <>
            {editingId && <ActionMenu items={[{ label: 'Delete', danger: true, onSelect: remove }]} />}
            <button type="button" className="btn-primary" disabled={saving} onClick={() => void save()}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </>
        }
        className="mb-6"
      />
      {errors.length > 0 && (
        <div role="alert" className="card mb-6 border-signal-anomaly/50 p-4">
          <p className="text-sm font-semibold text-signal-anomaly">Not saved: fix these first</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-secondary">
            {errors.map((i, n) => (
              <li key={n}>{i.message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-6">
        {draft.kind === 'event' && <EventForm value={draft} onChange={setDraft} />}
        {draft.kind === 'person' && <PersonForm value={draft} onChange={setDraft} />}
        {draft.kind === 'period' && <PeriodForm value={draft} onChange={setDraft} />}
        {draft.kind === 'source' && <SourceForm value={draft} onChange={setDraft} />}
        {draft.kind === 'interpretation' && <InterpretationForm value={draft} onChange={setDraft} />}
      </div>
    </div>
  )
}
