import { nativeImage, type BrowserWindow, type NativeImage } from 'electron'
import type { PlayerCommand, PlayerSnapshot } from '@shared/types'
import { GLYPH_SIZE, glyphBitmap, type GlyphName } from './playerGlyphs'
import { sendWidgetState } from './widget'

// Main-process hub between the audio-owning main window and the remote
// transport surfaces (Windows taskbar thumbbar, the pop-out widget).
//
// The main window's provider publishes a display-masked PlayerSnapshot on
// every track/playing/hasNext/hasPrev change; this module stores it, redraws
// the thumbbar from it and mirrors it to the widget. Commands flow the other
// way: thumbbar clicks and widget buttons funnel into dispatchCommand, which
// forwards over 'player:cmd' — one of the app's two sanctioned push channels
// (tests/pushBridge.test.ts).

let mainWindow: BrowserWindow | null = null
let lastSnapshot: PlayerSnapshot | null = null
let lastThumbarKey: string | null = null

const iconCache = new Map<GlyphName, NativeImage>()

function glyphIcon(name: GlyphName): NativeImage {
  let icon = iconCache.get(name)
  if (!icon) {
    icon = nativeImage.createFromBitmap(glyphBitmap(name), {
      width: GLYPH_SIZE,
      height: GLYPH_SIZE
    })
    iconCache.set(name, icon)
  }
  return icon
}

// Only these fields change what the thumbbar draws — a volume drag publishes
// dozens of snapshots a second and must not rebuild the buttons each time.
function thumbarKey(s: PlayerSnapshot | null): string {
  return s ? `${s.isPlaying}|${s.hasNext}|${s.hasPrev}` : 'none'
}

// Windows-only taskbar hover controls. Rebuilt from the last snapshot on every
// publish AND on window show/restore — Windows drops thumbbar buttons across
// hide/show cycles, so a one-time setup would silently vanish. Those re-applies
// pass force, since the state hasn't changed but the buttons are gone.
function applyThumbar(force = false): void {
  if (process.platform !== 'win32') return
  const win = mainWindow
  if (!win || win.isDestroyed()) return
  const s = lastSnapshot
  const key = thumbarKey(s)
  if (!force && key === lastThumbarKey) return
  lastThumbarKey = key
  try {
    if (!s) {
      win.setThumbarButtons([])
      return
    }
    win.setThumbarButtons([
      {
        tooltip: 'Previous',
        icon: glyphIcon('prev'),
        flags: s.hasPrev ? undefined : ['disabled'],
        click: () => dispatchCommand({ kind: 'previous' })
      },
      {
        tooltip: s.isPlaying ? 'Pause' : 'Play',
        icon: glyphIcon(s.isPlaying ? 'pause' : 'play'),
        click: () => dispatchCommand({ kind: 'toggle' })
      },
      {
        tooltip: 'Next',
        icon: glyphIcon('next'),
        flags: s.hasNext ? undefined : ['disabled'],
        click: () => dispatchCommand({ kind: 'next' })
      }
    ])
  } catch {
    /* cosmetic — a thumbbar failure must never affect playback */
  }
}

export function setMainWindow(win: BrowserWindow): void {
  mainWindow = win
  win.on('show', () => applyThumbar(true))
  win.on('restore', () => applyThumbar(true))
  win.on('closed', () => {
    if (mainWindow === win) mainWindow = null
    lastThumbarKey = null
  })
}

// The widget's song title/cover is a way back into the app: raise the main
// window the way receiveOpen() does for a double-clicked file.
export function activateMainWindow(): void {
  const win = mainWindow
  if (!win || win.isDestroyed()) return
  if (win.isMinimized()) win.restore()
  win.show()
  win.focus()
}

export function publishState(snapshot: PlayerSnapshot | null): void {
  lastSnapshot = snapshot
  applyThumbar()
  sendWidgetState(snapshot)
}

export function getState(): PlayerSnapshot | null {
  return lastSnapshot
}

export function dispatchCommand(cmd: PlayerCommand): void {
  const win = mainWindow
  if (!win || win.isDestroyed()) return
  win.webContents.send('player:cmd', cmd)
}
