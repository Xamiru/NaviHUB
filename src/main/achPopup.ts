import { BrowserWindow, Notification, nativeImage, screen } from 'electron'
import { join } from 'path'
import type { AchievementUnlockEvent } from '@shared/types'
import { POPUP_SIZE, anchorPos } from '@shared/achievements'
import { absoluteMediaPath } from './files'
import { logWarn } from './logBus'

// The in-game achievement popup: an Xbox-360-style toast overlay that floats
// over the game the user is playing. It exists because OS notifications are
// suppressed during fullscreen apps on Windows (Focus Assist / fullscreen
// optimization) — the old notify() path was invisible exactly when it
// mattered. This module is a sanctioned owner of a child BrowserWindow,
// beside widget.ts.
//
// The popup page polls achievements:watchStatus over invoke — NO new push
// channel (the push surface stays frozen at player:cmd/player:state). The
// watcher only guarantees the window exists and is showing; the page diffs
// `seq` itself and renders/chimes each fresh unlock.
//
// Window flags do the work:
//  - alwaysOnTop('screen-saver') floats above borderless-windowed games
//    (exclusive fullscreen bypasses the compositor and cannot be overlaid).
//  - setIgnoreMouseEvents(true) makes every click fall through to the game;
//    a stray click mid-fight must never land on our invisible glass.
//  - focusable:false + showInactive: opening must not steal focus/alt-tab.
//  - backgroundThrottling:false keeps its poll ticking while hidden.

const IDLE_CLOSE_MS = 45_000

let win: BrowserWindow | null = null
let idleCloseTimer: NodeJS.Timeout | null = null

export function getAchPopupWindow(): BrowserWindow | null {
  return win && !win.isDestroyed() ? win : null
}

function load(win2: BrowserWindow): void {
  const devUrl = process.env['ELECTRON_RENDERER_URL']
  if (devUrl) void win2.loadURL(`${devUrl}#/achpop`)
  else void win2.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/achpop' })
}

function currentAnchor(): { x: number; y: number } {
  let workArea = screen.getPrimaryDisplay().workArea
  try {
    workArea = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).workArea
  } catch {
    // No cursor position (headless, locked session) — primary is the fallback.
  }
  return anchorPos(workArea)
}

function create(): BrowserWindow | null {
  try {
    // Anchor to the display the USER is on (cursor), not blindly the primary:
    // a game fullscreened on a secondary monitor must not get its popups
    // delivered to a screen they cannot see. Single-monitor setups resolve to
    // the same display either way.
    const pos = currentAnchor()
    const w = new BrowserWindow({
      ...pos,
      width: POPUP_SIZE.width,
      height: POPUP_SIZE.height,
      useContentSize: true,
      frame: false,
      transparent: true,
      resizable: false,
      movable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      skipTaskbar: true,
      show: false,
      focusable: false,
      hasShadow: false,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        contextIsolation: true,
        // Popups arrive while a fullscreen game owns focus; this window must
        // keep polling even when it sits hidden between sessions.
        backgroundThrottling: false
      }
    })
    w.setAlwaysOnTop(true, 'screen-saver')
    w.setMenuBarVisibility(false)
    w.setIgnoreMouseEvents(true)
    w.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
    load(w)
    return w
  } catch {
    return null
  }
}

// Called from startWatch: preloads the overlay BEFORE the first unlock so the
// page's seq seed lands on an empty recent list. Stays hidden — raise() shows
// it only when there is something to display.
export function sessionStarted(): void {
  if (idleCloseTimer) {
    clearTimeout(idleCloseTimer)
    idleCloseTimer = null
  }
  if (!getAchPopupWindow()) {
    const w = create()
    if (w) win = w
  }
}

// Created eagerly at session start (sessionStarted) so the page is loaded and
// polling BEFORE the first unlock lands — a lazily-created window would seed
// past whatever triggered its creation. Reused across sessions; hidden rather
// than destroyed while idle so repeat sessions don't reload the bundle.
function raise(): boolean {
  if (idleCloseTimer) {
    clearTimeout(idleCloseTimer)
    idleCloseTimer = null
  }
  let w = getAchPopupWindow()
  if (!w) {
    w = create()
    if (!w) {
      logWarn('app', 'achievement popup: window creation failed; falling back to OS notifications')
      return false
    }
    win = w
  }
  try {
    const pos = currentAnchor()
    w.setPosition(pos.x, pos.y)
    if (!w.isVisible()) w.showInactive()
    // Fullscreen games on Windows can knock a topmost window down the z-order
    // (and Electron has known races where alwaysOnTop silently lapses after a
    // show). Re-assert both every raise — cheap, and the difference between a
    // popup that appears once and one that appears every time.
    w.setAlwaysOnTop(true, 'screen-saver')
    w.moveTop()
  } catch (err) {
    logWarn('app', `achievement popup: could not raise overlay: ${String(err)}`)
    return false
  }
  return true
}

// Called from achievementWatcher.publish per unlock. Returns false when the
// overlay could not be raised (no display, hardened profile), which sends the
// caller to the OS-notification fallback. The event itself is NOT the data
// path — the popup page picks unlocks up by polling watchStatus; this call
// only guarantees the glass is on screen.
export function showUnlock(): boolean {
  return raise()
}

// Same posture for a burst summary. The overlay page collapses its own poll
// batches into one card.
export function showBurst(): boolean {
  return raise()
}

// Called from stopWatch once the final sweep has published. The close is
// delayed because the sweep's popups may still be on screen; a sessionStarted
// inside the window cancels it.
export function sessionEnded(): void {
  if (!getAchPopupWindow()) return
  if (idleCloseTimer) clearTimeout(idleCloseTimer)
  idleCloseTimer = setTimeout(() => {
    idleCloseTimer = null
    closeAchPopup()
  }, IDLE_CLOSE_MS)
  idleCloseTimer.unref?.()
}

// Satellite of the main window (index.ts closes it beside closeWidget()).
export function closeAchPopup(): void {
  if (idleCloseTimer) {
    clearTimeout(idleCloseTimer)
    idleCloseTimer = null
  }
  const w = getAchPopupWindow()
  if (w) w.destroy()
  win = null
}

// ---- OS-notification fallback ------------------------------------------------
// The pre-overlay path, kept for environments where creating the window fails
// (headless session, locked-down profile). Same never-throw posture as before.

export function fallbackNotify(event: AchievementUnlockEvent): void {
  try {
    if (!Notification.isSupported()) return
    const options: Electron.NotificationConstructorOptions = {
      title: `Achievement unlocked — ${event.name}`,
      body: event.description ?? event.mediaTitle,
      silent: false
    }
    if (event.iconPath) {
      const icon = nativeImage.createFromPath(absoluteMediaPath(event.iconPath))
      if (!icon.isEmpty()) options.icon = icon
    }
    new Notification(options).show()
  } catch {
    // No notification service either: the in-app toast and the list still show
    // the unlock.
  }
}

export function fallbackNotifySummary(count: number, mediaTitle: string): void {
  try {
    if (!Notification.isSupported()) return
    new Notification({
      title: `${count} achievements unlocked`,
      body: mediaTitle,
      silent: false
    }).show()
  } catch {
    // See fallbackNotify().
  }
}
