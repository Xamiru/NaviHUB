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
import { stopSyncServer } from './sync'
import { killActiveUpdate } from './updater'

// Custom scheme for serving locally-stored cover/photo images to the renderer.
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'navimg',
    privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true }
  }
])

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
    const archived = relPath.startsWith('manga/') ? splitArchivePath(relPath) : null
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
    const baseHeaders = { 'content-type': mimeFor(absPath), 'accept-ranges': 'bytes' }
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

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closeDatabase()
    closeDictDb()
    app.quit()
  }
})

app.on('before-quit', () => {
  // Don't let a half-finished yt-dlp outlive the app; its .part files survive
  // and resume on the next try.
  killActiveMusicDownload()
  abortActiveCoachTurn()
  // Sockets are destroyed synchronously — the LAN socket can't outlive the app.
  void stopSyncServer()
  // A half-downloaded update is resumable; don't let it outlive the app.
  killActiveUpdate()
  closeDatabase()
  closeDictDb()
})
