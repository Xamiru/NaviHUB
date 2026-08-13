import { BrowserWindow, screen } from 'electron'
import { join } from 'path'
import type { PlayerSnapshot } from '@shared/types'
import * as settingsRepo from './repos/settingsRepo'
import { clampWidgetPos, defaultWidgetPos, formatWidgetPos, parseWidgetPos } from './widgetCore'

// The pop-out mini player ("gaming widget"): a frameless always-on-top pill
// that mirrors the main window's player and sends transport commands back.
// This module is the ONE sanctioned owner of a child BrowserWindow — renderer
// window.open stays denied everywhere (see index.ts setWindowOpenHandler).
//
// The widget window is deliberately not part of the app lifecycle: it skips
// the taskbar, closes when the main window closes, and holds nothing the
// before-quit registry would need to tear down (its position is saved
// synchronously in its own 'close' handler).

const WIDGET_SIZE = { width: 320, height: 64 }
const POS_KEY = 'widget.pos'

let widgetWindow: BrowserWindow | null = null
let moveSaveTimer: NodeJS.Timeout | null = null

export function getWidgetWindow(): BrowserWindow | null {
  return widgetWindow && !widgetWindow.isDestroyed() ? widgetWindow : null
}

// Live state mirror — playerBridge calls this on every publish.
export function sendWidgetState(snapshot: PlayerSnapshot | null): void {
  const win = getWidgetWindow()
  if (win) win.webContents.send('player:state', snapshot)
}

function savePos(win: BrowserWindow): void {
  try {
    const b = win.getBounds()
    settingsRepo.set(POS_KEY, formatWidgetPos({ x: b.x, y: b.y }))
  } catch {
    /* a failed save must never break the widget */
  }
}

// currentState is injected (ipc.ts passes playerBridge.getState) so this
// module never imports playerBridge — the import points one way.
export function openWidget(currentState: () => PlayerSnapshot | null): void {
  const existing = getWidgetWindow()
  if (existing) {
    existing.showInactive()
    return
  }

  const areas = screen.getAllDisplays().map((d) => d.workArea)
  const saved = parseWidgetPos(settingsRepo.get(POS_KEY))
  const pos =
    (saved && clampWidgetPos(saved, WIDGET_SIZE, areas)) ??
    defaultWidgetPos(WIDGET_SIZE, screen.getPrimaryDisplay().workArea)

  const win = new BrowserWindow({
    x: pos.x,
    y: pos.y,
    width: WIDGET_SIZE.width,
    height: WIDGET_SIZE.height,
    useContentSize: true,
    frame: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    show: false,
    backgroundColor: '#0a0f0b',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      // Keep state updates flowing while a fullscreen game has focus.
      backgroundThrottling: false
    }
  })
  widgetWindow = win

  // 'screen-saver' is the highest z-level Electron offers — floats over
  // borderless-windowed games (exclusive fullscreen bypasses the compositor
  // and cannot be overlaid by any window).
  win.setAlwaysOnTop(true, 'screen-saver')
  win.setMenuBarVisibility(false)
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))

  win.on('move', () => {
    if (moveSaveTimer) clearTimeout(moveSaveTimer)
    moveSaveTimer = setTimeout(() => savePos(win), 400)
  })
  win.on('close', () => {
    if (moveSaveTimer) {
      clearTimeout(moveSaveTimer)
      moveSaveTimer = null
    }
    savePos(win)
  })
  win.on('closed', () => {
    if (widgetWindow === win) widgetWindow = null
  })

  // showInactive: opening the pill (or re-opening it mid-game) must not steal
  // keyboard focus from whatever the user is doing.
  win.once('ready-to-show', () => win.showInactive())
  win.webContents.on('did-finish-load', () => {
    // Mount-time state without a race: the page also pulls player:getState,
    // but a publish that lands between load and that first pull is covered.
    win.webContents.send('player:state', currentState())
  })

  const devUrl = process.env['ELECTRON_RENDERER_URL']
  if (devUrl) {
    void win.loadURL(`${devUrl}#/widget`)
  } else {
    void win.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/widget' })
  }
}

export function closeWidget(): void {
  const win = getWidgetWindow()
  if (win) win.close()
}
