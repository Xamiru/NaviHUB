import { Menu, MenuItem, shell, type BrowserWindow, type MenuItemConstructorOptions } from 'electron'
import { logDir } from './logFile'

// The app's Tools menu.
//
// APPENDED to Electron's default application menu, never replacing it. The
// default menu is deliberately kept as THE application menu even while the bar
// is hidden (src/main/index.ts), because that is where Ctrl+R, F11,
// Ctrl+Shift+I and the zoom accelerators come from. Authoring a fresh
// File/Edit/View/Window template would mean re-listing every one of those roles
// by hand, and a single miss silently kills a shortcut the user relies on.
//
// No accelerators on these items, on purpose: a hidden menu keeps its
// accelerators, so a Ctrl+Shift+T here would fire inside the manga reader and
// the video player — both of which own their keyboards.

// Renderer routes parked for OpenFileHandler to collect. A menu item CANNOT
// push to the renderer (the push surface is frozen at player:cmd/player:state
// and tests/pushBridge.test.ts enforces it), so this is the same
// park-and-poll contract as openFile.ts's pendingOpen: returns AND clears.
let pendingRoute: string | null = null

export function takePendingRoute(): string | null {
  const out = pendingRoute
  pendingRoute = null
  return out
}

// Focuses the window too: the user picked a menu item, so they are looking at
// the app and the poll (which runs on focus) fires promptly.
function goTo(route: string, win: BrowserWindow | null): void {
  pendingRoute = route
  if (win && !win.isDestroyed()) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
}

export function installAppMenu(getWindow: () => BrowserWindow | null): void {
  const base = Menu.getApplicationMenu()
  // No default menu on this platform — leave it alone rather than inventing
  // one, which would be a bigger behaviour change than adding a submenu.
  if (!base) return

  const tools: MenuItemConstructorOptions = {
    label: 'Tools',
    submenu: [
      { label: 'Tasks', click: () => goTo('/tasks', getWindow()) },
      { label: 'Logs', click: () => goTo('/tasks/logs', getWindow()) },
      { type: 'separator' },
      { label: 'Open Logs Folder', click: () => void shell.openPath(logDir()) },
      { type: 'separator' },
      { role: 'toggleDevTools' }
    ]
  }

  // APPEND to the live menu rather than rebuilding a template from base.items.
  // A MenuItem is not a MenuItemConstructorOptions — spreading one and feeding
  // it back through buildFromTemplate relies on undocumented property overlap,
  // and anything it drops is a default accelerator silently gone. append()
  // touches nothing that already exists.
  base.append(new MenuItem(tools))
  Menu.setApplicationMenu(base)
}
