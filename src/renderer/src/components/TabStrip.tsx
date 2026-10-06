import { activateTab, closeTab, MAX_TABS, openTab, useBrowserTabs } from '../lib/browserTabs'

// The browser-tab strip across the top of the window. Hidden with a single tab,
// so the app looks exactly as it did before tabs existed; Ctrl+T, Ctrl+click
// and middle-click open more. Tabs switch views, so this is navigation (a named
// <nav> with aria-current), not an ARIA tablist.
export default function TabStrip() {
  const { tabs, activeId } = useBrowserTabs()
  if (tabs.length < 2) return null

  return (
    <nav
      aria-label="Open tabs"
      className="flex h-8 shrink-0 items-stretch border-b border-line-subtle bg-surface-canvas"
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId
        const title = tab.title || 'New tab'
        return (
          <div
            key={tab.id}
            className={`group relative flex min-w-0 max-w-56 flex-1 items-center border-r border-line-subtle/70 transition-colors after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-signal-live ${
              active
                ? 'bg-surface-panel text-ink after:opacity-100'
                : 'text-ink-muted after:opacity-0 hover:bg-surface-panel/60 hover:text-ink'
            }`}
            onAuxClick={(e) => {
              if (e.button !== 1) return
              e.preventDefault()
              void closeTab(tab.id)
            }}
          >
            <button
              type="button"
              className="h-full min-w-0 flex-1 truncate pl-3 pr-1 text-left text-xs"
              aria-current={active ? 'true' : undefined}
              title={title}
              onClick={() => void activateTab(tab.id)}
            >
              {title}
            </button>
            <button
              type="button"
              className="h-full shrink-0 px-2 text-xs text-ink-muted hover:text-ink"
              aria-label={`Close ${title}`}
              title={`Close ${title}`}
              onClick={() => void closeTab(tab.id)}
            >
              ✕
            </button>
          </div>
        )
      })}
      <button
        type="button"
        className="shrink-0 px-3 text-sm text-ink-muted hover:text-ink disabled:opacity-40 disabled:hover:text-ink-muted"
        aria-label="New tab"
        title="New tab (Ctrl+T)"
        disabled={tabs.length >= MAX_TABS}
        onClick={() => void openTab('/')}
      >
        +
      </button>
    </nav>
  )
}
