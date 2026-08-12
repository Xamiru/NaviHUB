import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { gachaGame, gachaUnitKind } from '@shared/gacha'
import type { GachaBuild, GachaUnitDetail, GachaUnitInput } from '@shared/types'
import PageStatus from '../components/PageStatus'
import BackButton from '../components/BackButton'
import Section from '../components/Section'
import ActionMenu from '../components/ActionMenu'
import CoverImage from '../components/CoverImage'
import GachaUnitDialog from '../components/gacha/GachaUnitDialog'
import { confirmDialog } from '../lib/confirm'

export default function GachaUnitPage() {
  const { id } = useParams()
  const unitId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(false)

  const { data: unit, isLoading } = useQuery({
    queryKey: qk.gacha.unit(unitId),
    queryFn: () => api.gacha.unit(unitId)
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!unit) return <PageStatus>Not found.</PageStatus>
  const cfg = gachaGame(unit.game)
  if (!cfg) return <PageStatus>Unknown game.</PageStatus>
  const kind = gachaUnitKind(cfg, unit.kind)

  async function patch(input: Partial<GachaUnitInput>): Promise<void> {
    await api.gacha.updateUnit(unitId, input)
    await qc.invalidateQueries({ queryKey: qk.gacha.all })
  }

  async function remove(): Promise<void> {
    const ok = await confirmDialog(`Delete ${unit!.name}? Its builds go with it.`, {
      confirmLabel: 'Delete',
      danger: true
    })
    if (!ok) return
    await api.gacha.removeUnit(unitId)
    await qc.invalidateQueries({ queryKey: qk.gacha.all })
    navigate(`/gacha/${unit!.game}`, { replace: true })
  }

  // Catalog-sourced rows must not be truly deleted — a re-fetch would resurrect
  // them. Un-owning returns them to the Catalog tab (builds stay, harmlessly).
  async function unown(): Promise<void> {
    await api.gacha.updateUnit(unitId, { owned: false })
    await qc.invalidateQueries({ queryKey: qk.gacha.all })
    navigate(`/gacha/${unit!.game}`, { replace: true })
  }

  const facets = [unit.element, unit.role].filter(Boolean).join(' · ')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BackButton />

      <div className="flex flex-col gap-6 sm:flex-row">
        <CoverImage
          path={unit.imagePath}
          alt={unit.name}
          rounded="rounded-lg"
          className="aspect-[3/4] w-48 shrink-0 self-start"
        />

        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {cfg.name} · {kind?.label ?? unit.kind}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-2xl font-bold">{unit.name}</h1>
            <button
              className={`text-xl ${unit.favorite ? 'text-amber-400' : 'text-gray-600 hover:text-gray-400'}`}
              title={unit.favorite ? 'Unfavorite' : 'Favorite'}
              aria-label={unit.favorite ? 'Unfavorite' : 'Favorite'}
              onClick={() => patch({ favorite: !unit.favorite })}
            >
              ★
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            {unit.rarity ? <span className="text-amber-400">{'★'.repeat(unit.rarity)}</span> : null}
            {unit.rarity && facets ? ' · ' : ''}
            {facets}
          </p>
          {unit.obtainedAt && (
            <p className="mt-1 text-xs text-gray-500">Obtained {unit.obtainedAt}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-6">
            <InlineNumber label="Level" value={unit.level} onSave={(n) => patch({ level: n })} />
            {kind?.dupesLabel && (
              <InlineNumber
                label={kind.dupesLabel}
                value={unit.dupes}
                display={kind.formatDupes}
                onSave={(n) => patch({ dupes: n ?? 0 })}
              />
            )}
          </div>

          <div className="mt-5 flex gap-2">
            <button className="btn-ghost" onClick={() => setEditing(true)}>
              Edit
            </button>
            <ActionMenu
              items={[
                // Catalog rows get unowned (re-import would resurrect a delete);
                // manual rows get deleted outright.
                unit.externalSource
                  ? { label: 'Remove from roster…', onSelect: unown, danger: true }
                  : { label: 'Delete…', onSelect: remove, danger: true }
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Section title="Notes">
          <NotesEditor
            value={unit.notes}
            placeholder="Anything worth remembering about this one…"
            onSave={(v) => patch({ notes: v })}
          />
        </Section>

        {cfg.buildMode === 'full' && <BuildsSection unit={unit} />}
      </div>

      {editing && <GachaUnitDialog game={cfg} unit={unit} onClose={() => setEditing(false)} />}
    </div>
  )
}

// Click-to-edit number (playlist-rename idiom): save on blur/Enter, Escape
// cancels. `display` formats the stored value (e.g. eidolon 2 → "E2").
function InlineNumber({
  label,
  value,
  display,
  onSave
}: {
  label: string
  value: number | null
  display?: (n: number) => string
  onSave: (n: number | null) => void | Promise<void>
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  function save(): void {
    setEditing(false)
    if (draft === '' && value != null) {
      onSave(null)
      return
    }
    const n = Math.floor(Number(draft))
    if (!Number.isFinite(n) || n < 0 || n === value) return
    onSave(n)
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      {editing ? (
        <input
          className="input mt-0.5 w-24"
          type="number"
          min={0}
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            else if (e.key === 'Escape') setEditing(false)
          }}
        />
      ) : (
        <button
          className="mt-0.5 text-lg font-semibold hover:text-accent"
          title="Click to edit"
          onClick={() => {
            setDraft(value != null ? String(value) : '')
            setEditing(true)
          }}
        >
          {value != null ? (display?.(value) ?? value) : '—'}
        </button>
      )}
    </div>
  )
}

// Always-editable textarea that persists on blur (only when changed).
function NotesEditor({
  value,
  placeholder,
  onSave
}: {
  value: string | null
  placeholder: string
  onSave: (v: string | null) => void | Promise<void>
}) {
  const [draft, setDraft] = useState(value ?? '')
  return (
    <textarea
      className="input min-h-[80px]"
      placeholder={placeholder}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        const v = draft.trim()
        if (v !== (value ?? '')) onSave(v || null)
      }}
    />
  )
}

// ---- builds (hidden for buildMode 'levelOnly' games — FGO) ----

function BuildsSection({ unit }: { unit: GachaUnitDetail }) {
  const qc = useQueryClient()
  const [name, setName] = useState('')

  async function add(): Promise<void> {
    const t = name.trim()
    if (!t) return
    await api.gacha.createBuild(unit.id, { name: t })
    setName('')
    await qc.invalidateQueries({ queryKey: qk.gacha.all })
  }

  return (
    <Section title="Builds">
      <div className="mb-3 flex gap-2">
        <input
          className="input max-w-xs"
          placeholder="New build name (PvE, Boss, Speed…)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') add()
          }}
        />
        <button className="btn-primary" disabled={!name.trim()} onClick={add}>
          + Add
        </button>
      </div>
      {unit.builds.length === 0 ? (
        <p className="text-sm text-gray-500">No builds yet.</p>
      ) : (
        <div className="space-y-2">
          {unit.builds.map((b) => (
            <BuildCard key={b.id} build={b} />
          ))}
        </div>
      )}
    </Section>
  )
}

function BuildCard({ build }: { build: GachaBuild }) {
  const qc = useQueryClient()
  const [editingName, setEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState('')

  async function invalidate(): Promise<void> {
    await qc.invalidateQueries({ queryKey: qk.gacha.all })
  }

  async function saveName(): Promise<void> {
    setEditingName(false)
    const t = nameDraft.trim()
    if (!t || t === build.name) return
    await api.gacha.updateBuild(build.id, { name: t })
    await invalidate()
  }

  async function remove(): Promise<void> {
    const ok = await confirmDialog(`Delete build "${build.name}"?`, {
      confirmLabel: 'Delete',
      danger: true
    })
    if (!ok) return
    await api.gacha.removeBuild(build.id)
    await invalidate()
  }

  return (
    <div className="card p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        {editingName ? (
          <input
            className="input max-w-xs"
            autoFocus
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={saveName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveName()
              else if (e.key === 'Escape') setEditingName(false)
            }}
          />
        ) : (
          <button
            className="truncate font-medium hover:text-accent"
            title="Click to rename"
            onClick={() => {
              setNameDraft(build.name)
              setEditingName(true)
            }}
          >
            {build.name}
          </button>
        )}
        <button
          className="px-2 text-gray-500 hover:text-red-400"
          title="Delete build"
          aria-label="Delete build"
          onClick={remove}
        >
          ✕
        </button>
      </div>
      <NotesEditor
        value={build.notes}
        placeholder="Gear, stats, targets…"
        onSave={async (v) => {
          await api.gacha.updateBuild(build.id, { notes: v })
          await invalidate()
        }}
      />
    </div>
  )
}
