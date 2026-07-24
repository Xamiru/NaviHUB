import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDialog } from '../../lib/hooks'
import { toastError } from '../../lib/toast'
import { gachaUnitKind, type GachaGameCfg } from '@shared/gacha'
import type { GachaUnit } from '@shared/types'
import GachaImageField from './GachaImageField'

// Add/edit a roster entry. Fields are config-driven: element/role/dupes only
// render when the selected kind labels them.
export default function GachaUnitDialog({
  game,
  kind,
  unit,
  onClose
}: {
  game: GachaGameCfg
  kind?: string // preselected kind for new entries
  unit?: GachaUnit // edit mode
  onClose: () => void
}) {
  const qc = useQueryClient()
  const panelRef = useDialog(onClose)

  const [kindKey, setKindKey] = useState(unit?.kind ?? kind ?? game.unitKinds[0].key)
  const [name, setName] = useState(unit?.name ?? '')
  const [rarity, setRarity] = useState(unit?.rarity ? String(unit.rarity) : '')
  const [element, setElement] = useState(unit?.element ?? '')
  const [role, setRole] = useState(unit?.role ?? '')
  const [level, setLevel] = useState(unit?.level != null ? String(unit.level) : '')
  const [dupes, setDupes] = useState(unit?.dupes ? String(unit.dupes) : '')
  const [obtainedAt, setObtainedAt] = useState(unit?.obtainedAt ?? '')
  const [notes, setNotes] = useState(unit?.notes ?? '')
  const [imagePath, setImagePath] = useState<string | null>(unit?.imagePath ?? null)
  const [saving, setSaving] = useState(false)

  const kindCfg = gachaUnitKind(game, kindKey) ?? game.unitKinds[0]
  // Claiming a catalog row (owned=0): the dialog reads "Add to roster" and the
  // save flips ownership on. Editing an owned unit leaves `owned` untouched.
  const claiming = !!unit && !unit.owned

  async function save(): Promise<void> {
    if (!name.trim()) return
    setSaving(true)
    try {
      const input = {
        game: game.id,
        kind: kindKey,
        name: name.trim(),
        rarity: rarity ? Number(rarity) : null,
        element: element.trim() || null,
        role: role.trim() || null,
        imagePath,
        level: level ? Number(level) : null,
        dupes: dupes ? Number(dupes) : 0,
        obtainedAt: obtainedAt || null,
        notes: notes.trim() || null,
        ...(claiming ? { owned: true } : {})
      }
      if (unit) await api.gacha.updateUnit(unit.id, input)
      else await api.gacha.createUnit(input)
      await qc.invalidateQueries({ queryKey: qk.gacha.all })
      onClose()
    } catch (e) {
      toastError(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={
          claiming
            ? `Add ${kindCfg.label.toLowerCase()} to roster`
            : unit
              ? `Edit ${kindCfg.label.toLowerCase()}`
              : `Add ${kindCfg.label.toLowerCase()}`
        }
        tabIndex={-1}
        className="card max-h-full w-full max-w-lg overflow-y-auto p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {claiming
              ? 'Add to roster'
              : unit
                ? `Edit ${kindCfg.label.toLowerCase()}`
                : `Add ${kindCfg.label.toLowerCase()}`}
          </h2>
          <button className="px-2 text-gray-500 hover:text-white" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="label">Type</label>
              <select className="input" value={kindKey} onChange={(e) => setKindKey(e.target.value)}>
                {game.unitKinds.map((k) => (
                  <option key={k.key} value={k.key}>
                    {k.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="label">Rarity</label>
              <select className="input" value={rarity} onChange={(e) => setRarity(e.target.value)}>
                <option value="">—</option>
                {Array.from({ length: kindCfg.rarityMax }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {'★'.repeat(n)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Name</label>
            <input
              className="input"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
              }}
            />
          </div>

          {(kindCfg.elementLabel || kindCfg.roleLabel) && (
            <div className="flex gap-3">
              {kindCfg.elementLabel && (
                <div className="flex-1">
                  <label className="label">{kindCfg.elementLabel}</label>
                  <input className="input" value={element} onChange={(e) => setElement(e.target.value)} />
                </div>
              )}
              {kindCfg.roleLabel && (
                <div className="flex-1">
                  <label className="label">{kindCfg.roleLabel}</label>
                  <input className="input" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="label">Level</label>
              <input
                className="input"
                type="number"
                min={0}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
            {kindCfg.dupesLabel && (
              <div className="flex-1">
                <label className="label">{kindCfg.dupesLabel}</label>
                <input
                  className="input"
                  type="number"
                  min={0}
                  value={dupes}
                  onChange={(e) => setDupes(e.target.value)}
                />
              </div>
            )}
            <div className="flex-1">
              <label className="label">Obtained</label>
              <input
                className="input"
                type="date"
                value={obtainedAt}
                onChange={(e) => setObtainedAt(e.target.value)}
              />
            </div>
          </div>

          <GachaImageField value={imagePath} onChange={setImagePath} />

          <div>
            <label className="label">Notes</label>
            <textarea
              className="input min-h-[64px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" disabled={saving || !name.trim()} onClick={save}>
            {saving ? 'Saving…' : claiming ? 'Add to roster' : unit ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
