// Send to Kindle: copies a library book's local EPUB, or a book NaviHUB made,
// into documents/NaviHUB/ on a connected Kindle. Every step starts from a user
// action. The writing itself is kindleWrite.ts (the only module that writes to
// a device); this module picks the files, plans the names and space, keeps the
// ledger (kindle_send) and runs the send as a task.
//
// Only a connected device is ever written: the copied-folder fallback
// (kindle.folder) is not the Kindle, so it is left out of detection here.

import { promises as fsp } from 'fs'
import { basename, join } from 'path'
import type {
  KindleSendItem,
  KindleSendPreview,
  KindleSendStatus,
  KindleUnfinishedResult,
  KindleUnfinishedSend
} from '@shared/types'
import { logInfo, logWarn } from '../logBus'
import { bookFileForChapter } from '../manga'
import * as kindleRepo from '../repos/kindleRepo'
import * as tasks from '../tasks'
import { NAVIHUB_DEVICE_DIR, isNaviHubDevicePath } from './kindleCore'
import { detectDevices, type FilesystemDevice } from './kindleDevice'
import { DeviceWriter, IncompleteCopyError, cancelKindleWrites, uploaderFor } from './kindleWrite'
import { claimKindle, kindleBusyWith, releaseKindle } from './kindleBusy'
import { planSend, refusalText, type SendFile } from './kindleWriteCore'

interface ResolvedFile extends SendFile {
  key: string
  mediaId: number | null
}

const MAX_ITEMS = 200

let running = false
let quitting = false
let state: KindleSendStatus = {
  running: false,
  total: 0,
  done: 0,
  current: null,
  sent: [],
  failed: [],
  stopped: false,
  finishedAt: null
}

// Before-quit (through kindle.ts's cancelKindleJobs): the running upload is
// ended and its partial copy removed, and nothing new starts.
export function cancelSends(): void {
  quitting = true
  cancelKindleWrites()
}

// The one connected Kindle. With two Kindle-like devices attached, nothing is
// written: which one the user meant cannot be known.
async function connectedDevice(): Promise<FilesystemDevice | null> {
  const found = await detectDevices({
    platform: process.platform,
    uid: typeof process.getuid === 'function' ? process.getuid() : null,
    user: process.env.USER ?? null,
    folderSetting: null
  })
  if (found.length > 1) {
    throw new Error(
      `More than one Kindle is connected (${found.map((d) => d.label).join(', ')}); connect only the one to send to`
    )
  }
  return found[0] ?? null
}

function stem(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(0, dot) : name
}

// The IPC boundary: only known item shapes, each resolved to a real local
// file through its owning module's checks.
async function resolve(items: KindleSendItem[]): Promise<ResolvedFile[]> {
  if (!Array.isArray(items) || items.length === 0) return []
  if (items.length > MAX_ITEMS) throw new Error(`Send at most ${MAX_ITEMS} files at a time`)
  // Lazy: the book maker carries the graded-reading content.
  const books = items.some((i) => i?.kind === 'made') ? await import('./kindleBooks') : null
  const made = books ? await books.listBooks() : []
  const out: ResolvedFile[] = []
  const seen = new Set<string>()
  for (const item of items) {
    let abs: string
    let title: string
    let mediaId: number | null = null
    let key: string
    if (item?.kind === 'chapter' && Number.isSafeInteger(item.chapterId)) {
      const book = bookFileForChapter(item.chapterId)
      if (!book) throw new Error('That book has no local EPUB to send')
      abs = book.abs
      mediaId = book.mediaId
      title =
        book.chapterTitle && book.chapterTitle !== book.mediaTitle
          ? `${book.mediaTitle} - ${book.chapterTitle}`
          : book.mediaTitle
      key = `chapter:${item.chapterId}`
    } else if (item?.kind === 'made' && typeof item.fileName === 'string') {
      const found = made.find((b) => b.fileName === item.fileName)
      if (!found) throw new Error('That book is no longer in the generated folder')
      abs = join(books!.generatedDir(), found.fileName)
      title = stem(found.fileName)
      key = `made:${found.fileName}`
    } else {
      throw new Error('Unknown item to send')
    }
    if (seen.has(abs)) continue
    seen.add(abs)
    const st = await fsp.stat(abs)
    if (!st.isFile()) throw new Error(`${title} is not a file`)
    out.push({ key, localPath: abs, title, ext: 'epub', bytes: st.size, mediaId })
  }
  return out
}

// The names already in documents/NaviHUB/, for planning only: a folder that
// does not exist yet holds none. The send itself re-lists strictly.
async function plannedNames(writer: DeviceWriter): Promise<string[]> {
  try {
    return await writer.names()
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw err
  }
}

export async function preview(items: KindleSendItem[]): Promise<KindleSendPreview> {
  const files = await resolve(items)
  // Busy first: a check or send owns the device's one MTP session, so the
  // preview does not touch the device at all then.
  if (running || kindleBusyWith()) {
    return {
      device: null,
      files: files.map((f) => ({ key: f.key, title: f.title, bytes: f.bytes, deviceName: '' })),
      freeAfter: null,
      refusal: 'The Kindle is busy with a check or another send; try again when it finishes.'
    }
  }
  let device: FilesystemDevice | null
  try {
    device = await connectedDevice()
  } catch (err) {
    return {
      device: null,
      files: files.map((f) => ({ key: f.key, title: f.title, bytes: f.bytes, deviceName: '' })),
      freeAfter: null,
      refusal: err instanceof Error ? err.message : String(err)
    }
  }
  if (!device) {
    return {
      device: null,
      files: files.map((f) => ({ key: f.key, title: f.title, bytes: f.bytes, deviceName: '' })),
      freeAfter: null,
      refusal: 'No Kindle is connected. Plug it in, unlock it, and try again.'
    }
  }
  const space = await device.freeSpace()
  const info = {
    label: device.label,
    freeBytes: space?.free ?? null,
    totalBytes: space?.total ?? null
  }

  const plan = planSend(
    files,
    await plannedNames(new DeviceWriter(uploaderFor(device.location))),
    space
  )
  if (!plan.ok) {
    return {
      device: info,
      files: files.map((f) => ({ key: f.key, title: f.title, bytes: f.bytes, deviceName: '' })),
      freeAfter: null,
      refusal: refusalText(plan.refusal)
    }
  }
  return {
    device: info,
    files: plan.files.map((p, i) => ({
      key: files[i].key,
      title: files[i].title,
      bytes: p.bytes,
      deviceName: basename(p.devicePath)
    })),
    freeAfter: plan.freeAfter,
    refusal: null
  }
}

export function status(): KindleSendStatus {
  return { ...state, sent: [...state.sent], failed: [...state.failed] }
}

// Starts the send and returns at once; the page polls status(). The device
// is claimed before the first await, so a double click or a check started
// meanwhile is refused instead of racing.
export async function start(items: KindleSendItem[]): Promise<KindleSendStatus> {
  if (running) throw new Error('A send is already running')
  if (quitting) throw new Error('NaviHUB is quitting')
  claimKindle('send')
  running = true
  let files: ResolvedFile[]
  let writer: DeviceWriter
  let deviceLabel: string
  let plan: Extract<ReturnType<typeof planSend>, { ok: true }>
  try {
    files = await resolve(items)
    const device = await connectedDevice()
    if (!device) throw new Error('No Kindle is connected')
    writer = new DeviceWriter(uploaderFor(device.location))
    deviceLabel = device.label
    const planned = planSend(files, await plannedNames(writer), await device.freeSpace())
    if (!planned.ok) throw new Error(refusalText(planned.refusal))
    plan = planned
  } catch (err) {
    running = false
    releaseKindle('send')
    throw err
  }

  state = {
    running: true,
    total: plan.files.length,
    done: 0,
    current: null,
    sent: [],
    failed: [],
    stopped: false,
    finishedAt: null
  }
  const job = tasks.runTask(
    {
      kind: 'kindleSend',
      label: `Sending ${plan.files.length === 1 ? files[0].title : `${plan.files.length} books`} to the Kindle`,
      route: '/books/kindle',
      controls: tasks.flagCancel('A send stops after removing the file it was copying'),
      project: () => ({ done: state.done, total: state.total, detail: state.current })
    },
    async (handle) => {
      const shouldStop = (): boolean => quitting || handle.cancelRequested()
      for (let i = 0; i < plan.files.length; i++) {
        if (shouldStop()) {
          state.stopped = true
          break
        }
        const p = plan.files[i]
        const f = files[i]
        state.current = f.title
        const ledger: { id: number | null } = { id: null }
        let sentOk = false
        try {
          await writer.sendOne(p, shouldStop, (h) => {
            ledger.id = kindleRepo.recordPendingSend({
              mediaId: f.mediaId,
              title: f.title,
              devicePath: p.devicePath,
              device: deviceLabel,
              bytes: p.bytes,
              sha256: h.sha256,
              partialMd5: h.partialMd5
            })
          })
          sentOk = true
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err)
          // At quit the database is about to close: the row stays 'pending',
          // and the next launch lists the file under Unfinished sends.
          if (quitting) {
            state.stopped = true
            break
          }
          if (ledger.id != null) {
            kindleRepo.markSendFailed(ledger.id, err instanceof IncompleteCopyError ? 'incomplete' : 'failed', message)
          }
          if (shouldStop()) {
            state.stopped = true
            break
          }
          state.failed.push({ title: f.title, error: message })
          logWarn('app', `Kindle send of ${f.title} failed: ${message}`)
        } finally {
          state.done = i + 1
        }
        if (!sentOk) continue
        // The book is verified on the Kindle. If recording that fails, the row
        // stays 'pending', so Unfinished sends finds the file whole and
        // records it then; it is never marked failed.
        state.sent.push(basename(p.devicePath))
        if (ledger.id != null && !quitting) {
          try {
            kindleRepo.markSent(ledger.id)
          } catch (err) {
            logWarn('app', `Kindle: ${f.title} is on the Kindle but was not recorded: ${String(err)}`)
          }
        }
      }
      if (state.stopped) throw new tasks.TaskCancelledError('Kindle send')
    }
  )
  void job
    .catch(() => undefined)
    .finally(() => {
      running = false
      releaseKindle('send')
      state = { ...state, running: false, current: null, finishedAt: new Date().toISOString() }
      logInfo(
        'app',
        `Kindle send: ${state.sent.length} sent, ${state.failed.length} failed${state.stopped ? ', stopped' : ''}`
      )
    })
  return status()
}

export function unfinished(): KindleUnfinishedSend[] {
  if (running) return []
  return kindleRepo.unfinishedSends().map((r) => ({
    id: r.id,
    title: r.title,
    devicePath: r.devicePath,
    bytes: r.bytes,
    createdAt: r.createdAt
  }))
}

// Checks an unfinished upload's file on the connected Kindle and settles it:
// whole after all (recorded as sent), gone, or a partial copy, which is
// removed. Nothing but that ledger file is touched, and not even that when a
// later send has since put a verified book under the same name: that file is
// the later send's, so the old row is settled without looking at the device.
export async function resolveUnfinished(id: number): Promise<KindleUnfinishedResult> {
  if (running) throw new Error('Wait for the send to finish')
  const row = kindleRepo.sendRow(id)
  if (!row || (row.status !== 'pending' && row.status !== 'incomplete')) {
    throw new Error('That send is already settled')
  }
  if (!isNaviHubDevicePath(row.devicePath)) throw new Error('That file is not in the NaviHUB folder')
  if (kindleRepo.laterSentTo(row.devicePath, id)) {
    kindleRepo.markSendRemoved(id)
    logInfo('app', `Kindle: unfinished send ${row.devicePath} was superseded by a later send`)
    return 'superseded'
  }
  claimKindle('cleanup')
  try {
    const device = await connectedDevice()
    if (!device) throw new Error('No Kindle is connected')
    // Only the Kindle the send went to: another one's file of the same name
    // is not this send's.
    if (row.device && row.device !== device.label) {
      throw new Error(`This send went to ${row.device}; connect that Kindle to clean it up`)
    }
    const writer = new DeviceWriter(uploaderFor(device.location))
    const name = row.devicePath.slice(NAVIHUB_DEVICE_DIR.length + 1)
    const result = await writer.removeIncomplete(name, row.bytes, row.sha256)
    if (result === 'complete') kindleRepo.markSent(id)
    else kindleRepo.markSendRemoved(id)
    logInfo('app', `Kindle: unfinished send ${row.devicePath} was ${result}`)
    return result
  } finally {
    releaseKindle('cleanup')
  }
}
