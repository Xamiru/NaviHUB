import { useDialog } from '../../lib/hooks'
import { CHECKLIST_DEFS } from '@shared/checklist'
import type { ChecklistCadence } from '@shared/types'

// Add an item to a board. The catalog is code (@shared/checklist), so this
// lists what exists minus what's already on the chosen board — the same item
// can sit on both, so each cadence is filtered separately.
//
// `cadence` is CONTROLLED by the page: the dialog holds no copy of it, so the
// board you're looking at and the board an item lands on can't disagree.
export default function ChecklistAddDialog({
  cadence,
  onCadence,
  enabledKeys,
  onAdd,
  onClose
}: {
  cadence: ChecklistCadence
  onCadence: (cadence: ChecklistCadence) => void
  enabledKeys: { daily: string[]; weekly: string[] }
  onAdd: (key: string, cadence: ChecklistCadence) => void
  onClose: () => void
}) {
  const panelRef = useDialog(onClose)
  const taken = new Set(enabledKeys[cadence])
  const available = CHECKLIST_DEFS.filter((d) => !taken.has(d.key))

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Add a checklist item"
        tabIndex={-1}
        className="card flex max-h-full w-full max-w-lg flex-col p-5"
      >
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add to your {cadence} board</h2>
          <button
            className="px-2 text-gray-500 hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="mb-4 text-xs text-gray-500">
          New kinds of item are added in code — here you choose which ones are on the board.
        </p>

        <div className="mb-3 flex gap-2">
          {(['daily', 'weekly'] as const).map((c) => (
            <button
              key={c}
              className={cadence === c ? 'pill pill-active' : 'pill'}
              onClick={() => onCadence(c)}
            >
              {c === 'daily' ? 'Daily' : 'Weekly'}
            </button>
          ))}
        </div>

        <div className="-mx-1 flex-1 overflow-y-auto px-1">
          {available.length === 0 ? (
            <p className="text-sm text-gray-400">
              Every item is already on your {cadence} board.
            </p>
          ) : (
            available.map((d) => (
              <button
                key={d.key}
                className="block w-full rounded px-2 py-2 text-left hover:bg-base-700"
                onClick={() => onAdd(d.key, cadence)}
              >
                <span className="flex items-baseline gap-2 text-sm">
                  {d.label}
                  {d.target > 1 && <span className="text-gray-500">× {d.target}</span>}
                  {d.defaultCadence !== cadence && (
                    <span className="ml-auto text-[11px] text-gray-500">
                      usually {d.defaultCadence}
                    </span>
                  )}
                </span>
                <span className="block text-xs text-gray-500">{d.hint}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
