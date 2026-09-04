import Dialog from '../Dialog'

export interface ShortcutRow {
  keys: string[]
  label: string
}

// Keyboard-shortcut overlay for the chrome-free readers, opened with ?.
// The shared dialog owns focus, Escape and backdrop dismissal; the reader page
// only owns whether it is mounted.
export default function ShortcutHelp({
  title,
  rows,
  onClose
}: {
  title: string
  rows: ShortcutRow[]
  onClose: () => void
}) {
  const titleId = 'reader-shortcuts-title'

  return (
    <Dialog
      labelledBy={titleId}
      onClose={onClose}
      overlayClassName="absolute inset-0 z-40 bg-black/70"
      panelClassName="card max-h-[80vh] w-96 max-w-[calc(100vw-2rem)] overflow-y-auto p-5"
    >
        <div className="mb-3 flex items-center">
          <h2
            id={titleId}
            className="flex-1 text-sm font-semibold uppercase tracking-widest text-gray-500"
          >
            {title}
          </h2>
          <button className="btn-ghost py-0.5 px-2 text-xs" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="space-y-1.5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3 text-sm">
              <span className="flex w-24 shrink-0 flex-wrap gap-1">
                {r.keys.map((k) => (
                  <kbd key={k} className="kbd">
                    {k}
                  </kbd>
                ))}
              </span>
              <span className="text-gray-300">{r.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Press <kbd className="kbd">?</kbd> anytime to show this again.
        </p>
    </Dialog>
  )
}
