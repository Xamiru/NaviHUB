import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse
} from 'node:http'
import type { Socket } from 'node:net'
import { networkInterfaces } from 'node:os'
import { createHash, randomBytes, randomInt, timingSafeEqual } from 'node:crypto'
import { createReadStream } from 'fs'
import { readdir, stat, unlink } from 'fs/promises'
import { join } from 'path'
import { app } from 'electron'
import { getDbPath, getSqlite } from './db/connection'
import { get as getSetting, set as setSetting } from './repos/settingsRepo'
import { absoluteMediaPath } from './files'
import { mimeFor } from './archive'
import { parseByteRange } from './httpRange'
import { applyOpsBatch, validateOpsRequest } from './syncOps'
import { SYNC_PROTOCOL_VERSION } from '@shared/types'
import type { SyncInfo, SyncManifest, SyncManifestEntry, SyncStatus } from '@shared/types'

// LAN sync server for the Android companion app. Button-only, like every other
// online feature: it listens ONLY between "Start" and "Stop" in Settings (and
// dies with the app via stopSyncServer in before-quit). The phone pushes its
// personal-state oplog (POST /ops → syncOps.ts), then pulls a fresh DB snapshot
// (GET /snapshot) plus any cover files it's missing (GET /manifest + /file).
//
// Trust model: single user on home Wi-Fi. Every route except pairing requires
// the bearer token minted at pairing time (settings sync.token); pairing itself
// is armed explicitly in the UI, shows a 6-digit code on the PC screen, and
// disarms after 5 wrong attempts. Served file paths go through the same
// absoluteMediaPath '..' guard as the navimg protocol.

// ---------------------------------------------------------------------------
// Pure helpers (exported for tests — no electron/network side effects).
// ---------------------------------------------------------------------------

function digestEquals(a: string, b: string): boolean {
  // Hash both sides to fixed length so timingSafeEqual accepts any input size.
  return timingSafeEqual(
    createHash('sha256').update(a).digest(),
    createHash('sha256').update(b).digest()
  )
}

// Validates "Authorization: Bearer <token>" against the stored token.
export function tokenMatches(
  header: string | string[] | undefined,
  token: string | null | undefined
): boolean {
  // A short/empty stored token means "never paired" — nothing can match it.
  if (!token || token.length < 16) return false
  const raw = Array.isArray(header) ? header[0] : header
  const m = /^Bearer\s+(\S{1,512})$/.exec(raw ?? '')
  if (!m) return false
  return digestEquals(m[1], token)
}

// Normalizes and allowlists a GET /file?path=… value. Phase 1 serves covers
// only — widen the prefix list as later phases add manga/music transfer.
export function fileRoutePath(raw: string | null): string | null {
  if (!raw) return null
  const norm = raw.split('\\').join('/')
  if (!norm.startsWith('media/')) return null
  const segs = norm.split('/')
  if (segs.some((s) => s === '' || s === '.' || s === '..')) return null
  return norm
}

export function newPairingCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, '0')
}

// ---------------------------------------------------------------------------
// Module state — one server, polled via sync:status like the music scanner.
// ---------------------------------------------------------------------------

const DEFAULT_PORT = 38517
const MAX_OPS_BODY_BYTES = 16 * 1024 * 1024
const MAX_PAIR_ATTEMPTS = 5
const COVER_EXT_RE = /\.(png|jpe?g|webp|gif|bmp)$/i

let server: Server | null = null
const sockets = new Set<Socket>()
let pairing: { code: string; attempts: number } | null = null
let snapshotBusy = false
let lastSync: SyncStatus['lastSync'] = null
let lastError: string | null = null

export function getSyncStatus(): SyncStatus {
  const addr = server?.address()
  const port = addr && typeof addr === 'object' ? addr.port : null
  return {
    running: server != null,
    port,
    addresses: port != null ? lanAddresses(port) : [],
    pairingCode: pairing?.code ?? null,
    pairedDevice: getSetting('sync.device') || null,
    lastSync,
    error: lastError
  }
}

function lanAddresses(port: number): string[] {
  const out: string[] = []
  for (const infos of Object.values(networkInterfaces())) {
    for (const info of infos ?? []) {
      if (info.family === 'IPv4' && !info.internal) out.push(`http://${info.address}:${port}`)
    }
  }
  return out
}

function syncPort(): number {
  const raw = Number(getSetting('sync.port') ?? '')
  // 0 = OS-assigned ephemeral port (used by tests; harmless if a user sets it).
  return Number.isInteger(raw) && ((raw >= 1024 && raw <= 65535) || raw === 0)
    ? raw
    : DEFAULT_PORT
}

// Starts the server (or, when already running, arms pairing mode on it).
export async function startSyncServer(pairingMode: boolean): Promise<SyncStatus> {
  if (pairingMode) pairing = { code: newPairingCode(), attempts: 0 }
  if (server) return getSyncStatus()

  lastError = null
  const srv = createServer((req, res) => {
    void handleRequest(req, res).catch((e) => {
      if (!res.headersSent) {
        json(res, 500, { error: e instanceof Error ? e.message : String(e) })
      } else {
        res.destroy()
      }
    })
  })
  srv.on('connection', (socket) => {
    sockets.add(socket)
    socket.on('close', () => sockets.delete(socket))
  })

  await new Promise<void>((resolve, reject) => {
    const onError = (e: Error): void => {
      srv.close()
      reject(new Error(`Sync server could not start: ${e.message}`))
    }
    srv.once('error', onError)
    srv.listen(syncPort(), '0.0.0.0', () => {
      srv.off('error', onError)
      // Post-listen errors shouldn't crash main — record and shut down.
      srv.on('error', (e) => {
        lastError = e.message
        void stopSyncServer()
      })
      resolve()
    })
  })
  server = srv
  return getSyncStatus()
}

export async function stopSyncServer(): Promise<SyncStatus> {
  pairing = null
  const srv = server
  server = null
  if (srv) {
    for (const socket of sockets) socket.destroy()
    sockets.clear()
    await new Promise<void>((resolve) => srv.close(() => resolve()))
  }
  return getSyncStatus()
}

// Forgets the paired phone: its token stops matching immediately (tokenMatches
// rejects short tokens) and the next pairing mints a fresh one.
export function unpair(): SyncStatus {
  setSetting('sync.token', '')
  setSetting('sync.device', '')
  return getSyncStatus()
}

// ---------------------------------------------------------------------------
// HTTP surface.
// ---------------------------------------------------------------------------

type Req = IncomingMessage
type Res = ServerResponse

function json(res: Res, code: number, body: unknown): void {
  const buf = Buffer.from(JSON.stringify(body))
  res.writeHead(code, { 'content-type': 'application/json', 'content-length': buf.length })
  res.end(buf)
}

function readBody(req: Req, maxBytes: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > maxBytes) {
        req.destroy()
        reject(new Error('request body too large'))
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

async function handleRequest(req: Req, res: Res): Promise<void> {
  const url = new URL(req.url ?? '/', 'http://sync.local')
  const route = `${req.method} ${url.pathname}`

  if (route === 'POST /pair') return handlePair(req, res)

  if (!tokenMatches(req.headers.authorization, getSetting('sync.token'))) {
    json(res, 401, { error: 'not paired (or wrong token)' })
    return
  }

  switch (route) {
    case 'GET /info':
      return handleInfo(res)
    case 'POST /ops':
      return handleOps(req, res)
    case 'GET /snapshot':
      return handleSnapshot(res)
    case 'GET /manifest':
      return handleManifest(url, res)
    case 'GET /file':
      return handleFile(req, url, res)
    default:
      json(res, 404, { error: `no route ${route}` })
  }
}

async function handlePair(req: Req, res: Res): Promise<void> {
  if (!pairing) {
    json(res, 403, { error: 'pairing mode is not armed on the PC' })
    return
  }
  const body = JSON.parse((await readBody(req, 4096)).toString() || '{}') as {
    code?: unknown
    device?: unknown
  }
  const code = typeof body.code === 'string' ? body.code.trim() : ''
  const device = typeof body.device === 'string' ? body.device.trim().slice(0, 64) : ''
  if (!device) {
    json(res, 400, { error: 'device name is required' })
    return
  }
  if (!code || !digestEquals(code, pairing.code)) {
    pairing.attempts += 1
    if (pairing.attempts >= MAX_PAIR_ATTEMPTS) {
      pairing = null // brute-force guard: re-arm from the PC to try again
      json(res, 403, { error: 'too many wrong codes — pairing disarmed' })
      return
    }
    json(res, 403, { error: 'wrong pairing code' })
    return
  }
  const token = randomBytes(32).toString('hex')
  setSetting('sync.token', token)
  setSetting('sync.device', device)
  pairing = null
  json(res, 200, { token, protocol: SYNC_PROTOCOL_VERSION, app: 'navihub' })
}

async function handleInfo(res: Res): Promise<void> {
  let dbBytes = 0
  try {
    dbBytes = (await stat(getDbPath())).size
  } catch {
    dbBytes = 0
  }
  const info: SyncInfo = {
    app: 'navihub',
    protocol: SYNC_PROTOCOL_VERSION,
    appVersion: app.getVersion(),
    device: getSetting('sync.device') || null,
    dbBytes
  }
  json(res, 200, info)
}

async function handleOps(req: Req, res: Res): Promise<void> {
  const raw = (await readBody(req, MAX_OPS_BODY_BYTES)).toString()
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    json(res, 400, { error: 'body is not valid JSON' })
    return
  }
  let request
  try {
    request = validateOpsRequest(parsed)
  } catch (e) {
    json(res, 400, { error: e instanceof Error ? e.message : String(e) })
    return
  }
  const result = applyOpsBatch(request)
  lastSync = {
    at: new Date().toISOString(),
    device: request.device,
    applied: result.applied,
    skipped: result.skipped.length
  }
  json(res, 200, result)
}

// Consistent copy of the live DB via better-sqlite3's online backup API
// (WAL-safe — same call the library exporter uses). One at a time; the temp
// file is deleted as soon as the response finishes.
async function handleSnapshot(res: Res): Promise<void> {
  if (snapshotBusy) {
    json(res, 503, { error: 'a snapshot is already being served — retry shortly' })
    return
  }
  snapshotBusy = true
  const tmp = join(app.getPath('temp'), `navihub-sync-snapshot-${process.pid}.db`)
  try {
    await unlink(tmp).catch(() => undefined)
    await getSqlite().backup(tmp)
    const size = (await stat(tmp)).size
    res.writeHead(200, {
      'content-type': 'application/octet-stream',
      'content-length': size,
      'x-navihub-protocol': String(SYNC_PROTOCOL_VERSION)
    })
    const stream = createReadStream(tmp)
    stream.pipe(res)
    await new Promise<void>((resolve) => {
      stream.on('close', resolve)
      stream.on('error', () => {
        res.destroy()
        resolve()
      })
    })
  } finally {
    snapshotBusy = false
    void unlink(tmp).catch(() => undefined)
  }
}

// Recursive walk (hand-rolled — readdir{recursive} changed shape across Node
// minors) of userData/media, filtered to images: covers, gacha art and
// extracted album art, but NOT theme audio (audio.dir can fall back into this
// folder). Paths come back in stored-relative form, ready for GET /file.
async function listCoverFiles(): Promise<SyncManifestEntry[]> {
  const root = join(app.getPath('userData'), 'media')
  const out: SyncManifestEntry[] = []
  const walk = async (dir: string, rel: string): Promise<void> => {
    let entries
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return // missing dir = empty manifest
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      const abs = join(dir, entry.name)
      const relPath = rel ? `${rel}/${entry.name}` : entry.name
      if (entry.isDirectory()) await walk(abs, relPath)
      else if (entry.isFile() && COVER_EXT_RE.test(entry.name)) {
        try {
          out.push({ path: `media/${relPath}`, size: (await stat(abs)).size })
        } catch {
          // raced deletion — skip
        }
      }
    }
  }
  await walk(root, '')
  return out
}

async function handleManifest(url: URL, res: Res): Promise<void> {
  if (url.searchParams.get('scope') !== 'covers') {
    json(res, 400, { error: 'scope must be "covers"' })
    return
  }
  const manifest: SyncManifest = { scope: 'covers', files: await listCoverFiles() }
  json(res, 200, manifest)
}

// Serves one stored file, with Range support so the phone can resume a big
// transfer. Path allowlist in fileRoutePath + the absoluteMediaPath '..' guard.
async function handleFile(req: Req, url: URL, res: Res): Promise<void> {
  const relPath = fileRoutePath(url.searchParams.get('path'))
  if (!relPath) {
    json(res, 400, { error: 'path must be a stored media/ path' })
    return
  }
  const abs = absoluteMediaPath(relPath)
  let size: number
  try {
    const st = await stat(abs)
    if (!st.isFile()) throw new Error('not a file')
    size = st.size
  } catch {
    json(res, 404, { error: 'file not found' })
    return
  }
  const baseHeaders = { 'content-type': mimeFor(abs), 'accept-ranges': 'bytes' }
  const range = parseByteRange(req.headers.range ?? null, size)
  if (range === 'unsatisfiable') {
    res.writeHead(416, { ...baseHeaders, 'content-range': `bytes */${size}` })
    res.end()
    return
  }
  res.writeHead(range ? 206 : 200, {
    ...baseHeaders,
    ...(range
      ? {
          'content-range': `bytes ${range.start}-${range.end}/${size}`,
          'content-length': range.end - range.start + 1
        }
      : { 'content-length': size })
  })
  const stream = range
    ? createReadStream(abs, { start: range.start, end: range.end })
    : createReadStream(abs)
  stream.pipe(res)
  stream.on('error', () => res.destroy())
}
