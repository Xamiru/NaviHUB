import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import type { MediaSummary } from '@shared/types'
import { api } from '../lib/api'
import { getTabsSnapshot, MAX_TABS, openTab } from '../lib/browserTabs'
import { contextMenuPoint, installContextMenuKeyTracking } from '../lib/contextMenuPoint'
import { useSettings } from '../lib/hooks'
import { internalLinkElement } from '../lib/internalLink'
import { useLogProgress } from '../lib/logProgress'
import { mediaRouteFor } from '../lib/mediaConfig'
import { mediaQuickActions } from '../lib/mediaQuickActions'
import { qk } from '../lib/queryKeys'
import ContextMenu, { type ContextMenuItem } from './ContextMenu'

// The right-click menu for any in-app link, app-wide: open it here or in a new
// tab, and for a link to a title, the palette's title actions too. Mounted in
// App's shell branch only, so the readers and the video player keep none.
//
// It listens on window in the BUBBLE phase, after React's root listener, so a
// component with its own menu (music rows, Gallery and Art images, the tab
// strip) has already claimed the event with preventDefault(). Text is left to
// the operating system's menu in main/index.ts: editable fields and selected
// text never get this one, so cut/copy/paste stay native and IME-safe.

interface OpenMenu {
  seq: number
  x: number
  y: number
  items: ContextMenuItem[]
}

const EDITABLE = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]'

export function linkMenuItems(path: string, currentPath: string): ContextMenuItem[] {
  const full = getTabsSnapshot().tabs.length >= MAX_TABS
  return [
    ...(path === currentPath ? [] : [{ label: 'Open', to: path }]),
    { label: 'Open in new tab', disabled: full, onSelect: () => void openTab(path, { activate: false }) },
    { label: 'Open in new tab and switch', disabled: full, onSelect: () => void openTab(path) }
  ]
}

export default function GlobalContextMenu() {
  const qc = useQueryClient()
  const { data: settings } = useSettings()
  const logProgress = useLogProgress()
  const location = useLocation()
  const [menu, setMenu] = useState<OpenMenu | null>(null)
  // The listener is installed once; it reads the latest render's values here.
  const latest = useRef({ settings, logProgress, currentPath: '' })
  latest.current = { settings, logProgress, currentPath: `${location.pathname}${location.search}` }

  useEffect(() => {
    installContextMenuKeyTracking()
    let seq = 0

    const titleItems = (m: MediaSummary): ContextMenuItem[] =>
      mediaQuickActions(m, latest.current.settings).map((action, i): ContextMenuItem => {
        const separatorBefore = i === 0
        if (action.to != null) return { label: action.label, to: action.to, separatorBefore }
        return {
          label: action.label,
          separatorBefore,
          // After the menu has handed focus back to the link, so the progress
          // tick appears on the card rather than on a removed menu item.
          onSelect: () => {
            requestAnimationFrame(() => void latest.current.logProgress(m, { announce: true }))
          }
        }
      })

    const onContextMenu = (e: MouseEvent): void => {
      if (e.defaultPrevented) return
      const link = internalLinkElement(e.target)
      if (!link) return
      if (e.target instanceof Element && e.target.closest(EDITABLE)) return
      if (window.getSelection()?.toString().trim()) return
      if (document.querySelector('[aria-modal="true"]')) return
      e.preventDefault()

      const path = link.getAttribute('href')!.slice(1)
      const point = contextMenuPoint({ clientX: e.clientX, clientY: e.clientY, currentTarget: link, target: e.target })
      const items = linkMenuItems(path, latest.current.currentPath)
      const mine = ++seq
      // The menu restores focus to whatever held it when it opened.
      link.focus({ preventScroll: true })

      const route = mediaRouteFor(path.split(/[?#]/)[0])
      if (!route) {
        setMenu({ seq: mine, ...point, items })
        return
      }
      void qc
        .fetchQuery({
          queryKey: qk.media.detail(route.id),
          queryFn: () => api.media.get(route.id),
          staleTime: 30_000
        })
        .catch(() => null)
        .then((media) => {
          if (mine !== seq) return
          setMenu({ seq: mine, ...point, items: media ? [...items, ...titleItems(media)] : items })
        })
    }

    window.addEventListener('contextmenu', onContextMenu)
    return () => window.removeEventListener('contextmenu', onContextMenu)
  }, [qc])

  if (!menu) return null
  return <ContextMenu key={menu.seq} x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />
}
