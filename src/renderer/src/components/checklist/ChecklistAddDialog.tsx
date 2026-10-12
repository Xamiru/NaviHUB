import { useId, useState, type FormEvent } from 'react'
import Dialog from '../Dialog'
import Tabs, { TabPanel } from '../Tabs'
import { Field, Fieldset } from '../Field'
import WeekdayPicker from './WeekdayPicker'
import { CHECKLIST_DEFS, CHECKLIST_GROUPS } from '@shared/checklist'
import type { ChecklistCadence, ChecklistCustomInput } from '@shared/types'

type Mode = 'builtin' | 'custom'

// Add an item to a board: a built-in one (auto-tracked or logged from the
// library) or one of your own. The same built-in item can sit on both boards,
// so each cadence is filtered separately.
//
// `cadence` is CONTROLLED by the page: the dialog holds no copy of it, so the
// board you're looking at and the board an item lands on can't disagree (v1's
// local copy is what made daily and weekly appear swapped).
export default function ChecklistAddDialog({
  cadence,
  onCadence,
  enabledKeys,
  onAdd,
  onCreate,
  onClose
}: {
  cadence: ChecklistCadence
  onCadence: (cadence: ChecklistCadence) => void
  enabledKeys: { daily: string[]; weekly: string[] }
  onAdd: (key: string, cadence: ChecklistCadence) => void
  onCreate: (input: ChecklistCustomInput, cadence: ChecklistCadence, days: number | null) => void
  onClose: () => void
}) {
  const headingId = useId()
  const [mode, setMode] = useState<Mode>('builtin')
  const taken = new Set(enabledKeys[cadence])

  return (
    <Dialog
      labelledBy={headingId}
      onClose={onClose}
      panelClassName="card flex max-h-full w-full max-w-xl flex-col p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 id={headingId} className="text-lg font-semibold">
          Add to your {cadence} board
        </h2>
        <button className="px-2 text-gray-400 hover:text-white" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <Fieldset legend="Board" className="mb-3">
        <div className="flex gap-2">
          {(['daily', 'weekly'] as const).map((c) => (
            <button
              key={c}
              type="button"
              className={cadence === c ? 'pill pill-active' : 'pill'}
              aria-pressed={cadence === c}
              onClick={() => onCadence(c)}
            >
              {c === 'daily' ? 'Daily' : 'Weekly'}
            </button>
          ))}
        </div>
      </Fieldset>

      <Tabs
        id="checklist-add"
        label="Kind of item"
        value={mode}
        onChange={setMode}
        tabs={[
          { key: 'builtin', label: 'Built-in' },
          { key: 'custom', label: 'Your own' }
        ]}
        className="mb-3"
      />

      <TabPanel tabsId="checklist-add" value={mode} className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1">
        {mode === 'builtin' ? (
          <div className="space-y-4">
            {CHECKLIST_GROUPS.map((group) => {
              const items = CHECKLIST_DEFS.filter((d) => d.group === group.key && !taken.has(d.key))
              if (items.length === 0) return null
              return (
                <section key={group.key} aria-labelledby={`${headingId}-${group.key}`}>
                  <h3
                    id={`${headingId}-${group.key}`}
                    className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400"
                  >
                    {group.label}
                  </h3>
                  <ul>
                    {items.map((d) => (
                      <li key={d.key}>
                        <button
                          type="button"
                          className="block w-full rounded px-2 py-2 text-left hover:bg-base-700"
                          onClick={() => onAdd(d.key, cadence)}
                        >
                          <span className="flex items-baseline gap-2 text-sm">
                            {d.label}
                            {(d.target > 1 || d.unit) && (
                              <span className="text-gray-400">
                                {d.target}
                                {d.unit ? ` ${d.unit}` : '×'}
                              </span>
                            )}
                            {d.defaultCadence !== cadence && (
                              <span className="ml-auto text-xs text-gray-400">
                                usually {d.defaultCadence}
                              </span>
                            )}
                          </span>
                          <span className="block text-xs text-gray-400">{d.hint}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
            {CHECKLIST_DEFS.every((d) => taken.has(d.key)) && (
              <p className="text-sm text-gray-400">
                Every built-in item is already on your {cadence} board.
              </p>
            )}
          </div>
        ) : (
          <CustomForm cadence={cadence} onCreate={onCreate} />
        )}
      </TabPanel>
    </Dialog>
  )
}

function CustomForm({
  cadence,
  onCreate
}: {
  cadence: ChecklistCadence
  onCreate: (input: ChecklistCustomInput, cadence: ChecklistCadence, days: number | null) => void
}) {
  const [label, setLabel] = useState('')
  const [target, setTarget] = useState('1')
  const [unit, setUnit] = useState('')
  const [note, setNote] = useState('')
  const [days, setDays] = useState<number | null>(null)
  const [tried, setTried] = useState(false)

  const n = Math.floor(Number(target))
  const targetOk = Number.isFinite(n) && n >= 1
  const labelOk = label.trim() !== ''

  function submit(e: FormEvent): void {
    e.preventDefault()
    setTried(true)
    if (!labelOk || !targetOk) return
    onCreate(
      { label, target: n, unit: unit.trim() || null, note: note.trim() || null },
      cadence,
      cadence === 'daily' ? days : null
    )
  }

  return (
    <form className="space-y-3" onSubmit={submit} noValidate>
      <Field label="Name" error={tried && !labelOk ? 'Give the item a name.' : undefined}>
        <input
          className="input w-full"
          value={label}
          maxLength={80}
          autoFocus
          onChange={(e) => setLabel(e.target.value)}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={`Target per ${cadence === 'weekly' ? 'week' : 'day'}`}
          description="1 makes it a checkbox; more makes it a counter."
          error={tried && !targetOk ? 'Use a whole number of at least 1.' : undefined}
        >
          <input
            className="input w-full tabular-nums"
            inputMode="numeric"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </Field>
        <Field label="Unit (optional)" description="For example min, pages or sets.">
          <input
            className="input w-full"
            value={unit}
            maxLength={16}
            onChange={(e) => setUnit(e.target.value)}
          />
        </Field>
      </div>
      {cadence === 'daily' && <WeekdayPicker value={days} onChange={setDays} />}
      <Field label="Note (optional)" description="Shown under the item.">
        <input
          className="input w-full"
          value={note}
          maxLength={300}
          onChange={(e) => setNote(e.target.value)}
        />
      </Field>
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          Add to board
        </button>
      </div>
    </form>
  )
}
