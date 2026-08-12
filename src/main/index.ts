import { app, BrowserWindow, Menu, protocol } from 'electron'
import { join } from 'path'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import { Readable } from 'stream'
import { initDatabase, closeDatabase } from './db/connection'
import { closeDictDb } from './dict/dictDb'
import { registerIpc } from './ipc'
import { absoluteMediaPath } from './files'
import { splitArchivePath, readArchiveEntry, mimeFor } from './archive'
import { parseByteRange } from './httpRange'
import { killActive as killActiveMusicDownload } from './musicDownload'
import { get as getSetting } from './repos/settingsRepo'
import { parseUiScale } from '@shared/uiScale'
import { abortActiveCoachTurn } from './gachaCoach'
import { killActiveUpdate } from './updater'
import { killActivePrepare } from './video/session'
import { killActiveOcr } from './mokuroRun'
import { finalizeActiveGameSession } from './gameLaunch'
import { closeCatalogDb } from './gamesCatalogDb'
import { parseArgvFiles, queueOpen } from './openFile'

// Custom scheme for serving locally-stored cover/photo images to the renderer.
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'navimg',
    privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true }
  }
])

// SINGLE INSTANCE — load-bearing, not politeness. Everything about this app is
// one better-sqlite3 connection to one WAL database plus process-lifetime state
// (the video prepare session, the dictionary handle, the ad-hoc token map). A
// second process opening the same DB is a corruption risk and would silently
// run its own conversions. It matters now because file associations mean the OS
// launches the app again for every double-clicked file.
//
// The loser hands its argv to the winner via 'second-instance' and exits before
// touching the database.
//
// app.exit(0), NOT app.quit(): quit() is graceful and asynchronous, so module
// evaluation carries straight on into whenReady → initDatabase() → a window —
// the losing instance opens the database and flashes a window before dying,
// which is indistinguishable from a crash. exit() terminates now. The guard at
// the top of whenReady is the belt to this braces.
const isPrimaryInstance = app.requestSingleInstanceLock()
if (!isPrimaryInstance) {
  app.exit(0)
}

let mainWindow: BrowserWindow | null = null

// Brings the running window forward and puts the files it was given in the
// queue the renderer polls.
function receiveOpen(paths: string[]): void {
  const accepted = queueOpen(paths)
  if (accepted === 0) return
  if (!mainWindow) return
  if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.show()
  mainWindow.focus()
}

app.on('second-instance', (_event, argv, workingDirectory) => {
  receiveOpen(parseArgvFiles(argv, workingDirectory || process.cwd()))
})

// macOS delivers opens as an event rather than argv, and can fire it BEFORE the
// app is ready. queueOpen just parks the target, so an early one is fine — the
// renderer collects it whenever it first polls.
app.on('open-file', (event, filePath) => {
  event.preventDefault()
  receiveOpen([filePath])
})

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 940,
    minHeight: 600,
    show: false,
    // Pre-paint window fill = the theme's base-900 (styles.css :root).
    backgroundColor: '#0a0f0b',
    title: 'NaviHUB',
    icon: app.isPackaged
      ? join(process.resourcesPath, 'assets', 'icon.png')
      : join(__dirname, '../../assets/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow = win
  win.on('closed', () => {
    if (mainWindow === win) mainWindow = null
  })

  // Native menu bar hidden unless opted in (Settings → General). The default
  // menu STAYS the application menu, so its accelerators (Ctrl+R, F11,
  // Ctrl+Shift+I, zoom keys) work either way; Ctrl+wheel zoom is the app's
  // own (App.tsx → app:bumpUiScale).
  try {
    win.setMenuBarVisibility(getSetting('ui.menuBar') === '1')
  } catch {
    /* a bad setting must never block the window */
  }

  win.on('ready-to-show', () => win.show())

  // Apply the saved UI scale. Zoom is per-webContents and resets on (re)load,
  // so set it on every did-finish-load rather than once at startup. Guarded:
  // a zoom failure must never stop the window from coming up.
  win.webContents.on('did-finish-load', () => {
    try {
      win.webContents.setZoomFactor(parseUiScale(getSetting('ui.scale')))
    } catch {
      /* fall back to 100% */
    }
  })

  // No code path may spawn a child BrowserWindow — external links go through
  // the guarded app:openExternal IPC (system browser) instead.
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))

  // Right-click text menu (Electron ships none by default): cut/copy/paste in
  // inputs, copy for selected page text. Roles delegate to Chromium's native
  // clipboard actions, so keyboard shortcuts and IME text behave correctly.
  win.webContents.on('context-menu', (_e, params) => {
    const items: Electron.MenuItemConstructorOptions[] = []
    if (params.isEditable) {
      items.push(
        { role: 'cut', enabled: params.editFlags.canCut },
        { role: 'copy', enabled: params.editFlags.canCopy },
        { role: 'paste', enabled: params.editFlags.canPaste },
        { type: 'separator' },
        { role: 'selectAll', enabled: params.editFlags.canSelectAll }
      )
    } else if (params.selectionText.trim()) {
      items.push({ role: 'copy' })
    }
    if (items.length > 0) Menu.buildFromTemplate(items).popup()
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // A second instance must never reach the database. app.exit(0) above should
  // already have ended this process; this makes it impossible rather than
  // merely likely.
  if (!isPrimaryInstance) return

  initDatabase()
  registerIpc()

  // navimg://media/<file> -> the real file under userData/media.
  // navimg://manga/<...>.cbz/<entry> -> a page streamed out of the archive.
  // Plain files are streamed by hand (not net.fetch) so Range requests get a
  // real 206 — that's what makes <audio> seekable and lets Chromium read
  // trailing metadata (m4a moov, VBR mp3 length) without downloading it all.
  protocol.handle('navimg', async (request) => {
    const url = new URL(request.url)
    const relPath = decodeURIComponent(url.host + url.pathname)
    // Entry streaming is limited to the prefixes that can legitimately hold a
    // container: the manga and books libraries, and a file the OS handed us via
    // "open with" (open/<token>.cbz — the token keeps its extension precisely
    // so splitArchivePath can still find the container segment).
    const archived =
      relPath.startsWith('manga/') || relPath.startsWith('books/') || relPath.startsWith('open/')
        ? splitArchivePath(relPath)
        : null
    if (archived) {
      const data = await readArchiveEntry(absoluteMediaPath(archived.archiveRel), archived.entryName)
      if (!data) return new Response('Not found', { status: 404 })
      // Buffer is a valid Response body at runtime; TS's dom BodyInit just
      // doesn't admit Node's Buffer/Uint8Array<ArrayBufferLike> generics.
      return new Response(data as unknown as BodyInit, {
        headers: { 'content-type': mimeFor(archived.entryName) }
      })
    }

    const absPath = absoluteMediaPath(relPath)
    let size: number
    try {
      const st = await stat(absPath)
      if (!st.isFile()) return new Response('Not found', { status: 404 })
      size = st.size
    } catch {
      return new Response('Not found', { status: 404 })
    }
    const baseHeaders = {
      'content-type': mimeFor(absPath),
      'accept-ranges': 'bytes',
      // navimg:// is a different origin from the renderer page, so a <video>
      // loaded from it TAINTS a canvas and the video player's frame-grab
      // (screenshot-on-a-mined-card) throws SecurityError. With this header and
      // crossOrigin="anonymous" on the element the read is allowed. Safe: the
      // scheme is privileged, local-only, and already supportFetchAPI.
      'access-control-allow-origin': '*',
      'access-control-expose-headers': 'content-length, content-range'
    }
    const range = parseByteRange(request.headers.get('range'), size)
    if (range === 'unsatisfiable') {
      return new Response(null, {
        status: 416,
        headers: { ...baseHeaders, 'content-range': `bytes */${size}` }
      })
    }
    const stream = range
      ? createReadStream(absPath, { start: range.start, end: range.end })
      : createReadStream(absPath)
    // Readable.toWeb's ReadableStream generics don't line up with dom's BodyInit.
    return new Response(Readable.toWeb(stream) as unknown as BodyInit, {
      status: range ? 206 : 200,
      headers: range
        ? {
            ...baseHeaders,
            'content-range': `bytes ${range.start}-${range.end}/${size}`,
            'content-length': String(range.end - range.start + 1)
          }
        : { ...baseHeaders, 'content-length': String(size) }
    })
  })

  createWindow()

  // A cold start FROM a double-click: the file is in our own argv. Queued (not
  // pushed) like every other open — the renderer collects it on first poll.
  queueOpen(parseArgvFiles(process.argv, process.cwd()))

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  // Teardown belongs to before-quit ALONE, which app.quit() fires below. This
  // handler used to close both databases first, and before-quit then ran the
  // whole list again — including finalizeActiveGameSession(), whose comment
  // says it must run BEFORE closeDatabase(). It only worked because
  // closeDatabase() nulls the handle and getSqlite() lazily re-runs init.sql +
  // migrations + seeds to insert one row. The day that stops reopening, every
  // normal quit silently drops the final play session.
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
  // Don't let a half-finished yt-dlp outlive the app; its .part files survive
  // and resume on the next try.
  killActiveMusicDownload()
  abortActiveCoachTurn()
  // A half-downloaded update is resumable; don't let it outlive the app.
  killActiveUpdate()
  // A half-converted video is NOT resumable — kill it and drop the .part, or a
  // truncated file could be mistaken for a cache hit next launch.
  killActivePrepare()
  // A killed mokuro run loses nothing durable — finished volumes keep their
  // sidecars, and mokuro's own _ocr cache resumes the interrupted one.
  killActiveOcr()
  // The one child that is NOT killed: record the in-flight play session and
  // let the game outlive the app (it was spawned detached for exactly this).
  // Must run before closeDatabase() — it writes the session row.
  finalizeActiveGameSession()
  closeDatabase()
  closeCatalogDb()
  closeDictDb()
})
