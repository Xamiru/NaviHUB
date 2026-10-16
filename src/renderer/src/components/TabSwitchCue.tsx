import { useEffect, useState } from 'react'
import { getTabsSnapshot, useBrowserTabs } from '../lib/browserTabs'

// The readers and the video player hide the tab strip, so a switch that lands
// there (Ctrl+Tab, Ctrl+W, Ctrl+1..9) briefly names the tab now in front.
// Mounted in both App branches so every switch is seen: one made into a normal
// page is consumed silently, and only a switch into a reader shows the cue.
let lastSeq = getTabsSnapshot().switchSeq

const CUE_MS = 1500

export default function TabSwitchCue({ show }: { show: boolean }) {
  const { tabs, activeId, switchSeq } = useBrowserTabs()
  // The switch being shown. The text is read live, so a tab opened in the
  // background picks up its reader's title as soon as the page names it.
  const [cueSeq, setCueSeq] = useState<number | null>(null)

  useEffect(() => {
    if (switchSeq === lastSeq) return
    lastSeq = switchSeq
    if (show && getTabsSnapshot().tabs.length > 1) setCueSeq(switchSeq)
  }, [switchSeq, show])

  useEffect(() => {
    if (cueSeq == null) return
    const timer = setTimeout(() => setCueSeq(null), CUE_MS)
    return () => clearTimeout(timer)
  }, [cueSeq])

  if (!show) return null
  const at = tabs.findIndex((tab) => tab.id === activeId)
  const cue = cueSeq != null && at >= 0 ? `Tab ${at + 1} of ${tabs.length} · ${tabs[at].title}` : null
  return (
    <div role="status" className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      {cue ? (
        <span className="media-contrast max-w-full truncate rounded bg-black/75 px-3 py-1.5 text-xs">
          {cue}
        </span>
      ) : null}
    </div>
  )
}
