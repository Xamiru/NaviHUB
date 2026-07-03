import { app, BrowserWindow, Menu, protocol, net } from 'electron'
import { join } from 'path'
import { pathToFileURL } from 'url'
import { initDatabase, closeDatabase } from './db/connection'
import { registerIpc } from './ipc'
import { absoluteMediaPath } from './files'
import { splitArchivePath, readArchiveEntry, mimeFor } from './archive'
import { killActive as killActiveMusicDownload } from './musicDownload'

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
    backgroundColor: '#0f1115',
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
    return net.fetch(pathToFileURL(absoluteMediaPath(relPath)).toString())
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closeDatabase()
    app.quit()
  }
})

app.on('before-quit', () => {
  // Don't let a half-finished yt-dlp outlive the app; its .part files survive
  // and resume on the next try.
  killActiveMusicDownload()
  closeDatabase()
})
