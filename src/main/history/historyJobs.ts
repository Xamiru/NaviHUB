// History archive IO: copying a file the user attaches into the history/ root,
// downloading a research suggestion, and opening or removing a stored file.
// Each job is a task with its own status entry (polled through
// history:archiveJobs); cancelHistoryJobs() is in the before-quit registry so
// a half-copied file never outlives the app. This module must not import the
// content catalog statically — index.ts imports it for the quit hook.

import { BrowserWindow, dialog, shell } from 'electron'
import { createHash } from 'crypto'
import { createReadStream, createWriteStream, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { rename, rm } from 'fs/promises'
import { basename, join, relative, resolve, sep } from 'path'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'
import type { ArchiveSuggestion } from '@shared/history/schema'
import type { HistoryArchiveJob } from '@shared/types'
import { absoluteMediaPath, historyRootDir } from '../files'
import { fetchWithRetry } from '../http'
import { logInfo } from '../logBus'
import { streamResponseToFile } from '../streamDownload'
import * as repo from '../repos/historyRepo'
import * as tasks from '../tasks'
import {
  ATTACHABLE_EXTENSIONS,
  DOWNLOAD_CAPS,
  archiveFolder,
  archiveKindForFile,
  fileNameFromUrl,
  safeFileName,
  titleFromFileName,
  uniqueName
} from './historyArchiveCore'
import { historyRequestHeaders } from './historyImages'

interface Job extends HistoryArchiveJob {
  controller: AbortController
}

const jobs = new Map<string, Job>()
let counter = 0
// Destinations claimed by running jobs (lower-cased absolute paths): the final
// file appears only at the end, so two jobs saving the same name to one page
// would otherwise pick the same destination and share a partial file.
const reserved = new Set<string>()
// Suggestion keys between the duplicate check and the job registration, which
// sit on either side of the catalog import.
const starting = new Set<string>()

export function archiveJobs(): HistoryArchiveJob[] {
  return [...jobs.values()].map(({ controller: _c, ...j }) => ({ ...j }))
}

function prune(): void {
  const finished = [...jobs.values()].filter((j) => j.state !== 'running')
  for (const j of finished.slice(0, Math.max(0, finished.length - 20))) jobs.delete(j.id)
}

/** Picks a free name and reserves it until `release` runs. */
function destinationFor(ref: string, fileName: string): { abs: string; rel: string; release: () => void } {
  const folder = archiveFolder(ref)
  const dir = join(historyRootDir(), folder)
  mkdirSync(dir, { recursive: true })
  const taken = new Set(readdirSync(dir).map((n) => n.toLowerCase()))
  const prefix = `${dir}${sep}`.toLowerCase()
  for (const r of reserved) if (r.startsWith(prefix)) taken.add(r.slice(prefix.length))
  const name = uniqueName(taken, fileName)
  const abs = join(dir, name)
  const key = abs.toLowerCase()
  reserved.add(key)
  return { abs, rel: `history/${folder}/${name}`, release: () => reserved.delete(key) }
}

function hashing(hash: ReturnType<typeof createHash>, onBytes: (n: number) => void): Transform {
  let total = 0
  return new Transform({
    transform(chunk: Buffer, _enc, cb) {
      hash.update(chunk)
      total += chunk.length
      onBytes(total)
      cb(null, chunk)
    }
  })
}

function startJob(init: Omit<HistoryArchiveJob, 'id' | 'state' | 'done' | 'total' | 'error'>, total: number): Job {
  prune()
  const job: Job = { ...init, id: `h${++counter}`, state: 'running', done: 0, total, error: null, controller: new AbortController() }
  jobs.set(job.id, job)
  return job
}

function finish(job: Job, err?: unknown): void {
  if (!err) job.state = 'done'
  else if (job.controller.signal.aborted) job.state = 'cancelled'
  else {
    job.state = 'error'
    job.error = err instanceof Error ? err.message : String(err)
  }
}

/** Copies a file the user picks into the history/ root and records it. */
export async function attachFile(ref: string): Promise<{ started: boolean }> {
  const options: Electron.OpenDialogOptions = {
    title: 'Attach a file to this History page',
    properties: ['openFile'],
    filters: [
      { name: 'Video, audio, photos and documents', extensions: ATTACHABLE_EXTENSIONS },
      { name: 'All files', extensions: ['*'] }
    ]
  }
  const parent = BrowserWindow.getFocusedWindow()
  const picked = parent ? await dialog.showOpenDialog(parent, options) : await dialog.showOpenDialog(options)
  const source = picked.filePaths[0]
  if (picked.canceled || !source) return { started: false }
  const kind = archiveKindForFile(source)
  if (!kind) throw new Error('Only video, audio, image, PDF, EPUB and text files can be attached')
  const size = statSync(source).size
  const fileName = safeFileName(basename(source))
  const job = startJob({ kind: 'attach', ref, key: null, title: titleFromFileName(fileName) }, size)
  const run = tasks.runTask(
    {
      kind: 'historyAttach',
      label: `Attaching ${fileName}`,
      route: null,
      controls: { cancel: () => job.controller.abort(), pauseNote: 'Copying cannot be paused' },
      project: () => ({ done: job.done, total: job.total })
    },
    async () => {
      const dest = destinationFor(ref, fileName)
      const tmp = `${dest.abs}.partial`
      const hash = createHash('sha256')
      try {
        try {
          await pipeline(
            createReadStream(source),
            hashing(hash, (n) => (job.done = n)),
            createWriteStream(tmp, { flags: 'wx' }),
            { signal: job.controller.signal }
          )
          await rename(tmp, dest.abs)
        } catch (err) {
          await rm(tmp, { force: true }).catch(() => {})
          throw err
        }
      } finally {
        dest.release()
      }
      repo.addArchive({
        ref,
        kind,
        relPath: dest.rel,
        title: job.title,
        credit: null,
        license: null,
        page: null,
        suggestionKey: null,
        sha256: hash.digest('hex'),
        bytes: size
      })
      logInfo('app', `history: attached ${dest.rel}`)
    }
  )
  void run.then(() => finish(job), (err) => finish(job, err))
  return { started: true }
}

/** Downloads one research-suggested public-domain item into the archive. */
export async function downloadSuggestion(ref: string, suggestionId: string): Promise<{ started: boolean }> {
  const key = `${ref}#${suggestionId}`
  if (starting.has(key) || [...jobs.values()].some((j) => j.key === key && j.state === 'running')) return { started: false }
  if (repo.archiveForRef(ref).some((r) => r.suggestionKey === key)) return { started: false }
  starting.add(key)
  let job: Job
  let s: ArchiveSuggestion
  try {
    const found = (await import('./historyService')).suggestion(ref, suggestionId)
    if (!found) throw new Error('That archive suggestion no longer exists')
    if (!found.url.startsWith('https://')) throw new Error('Archive downloads must use https')
    s = found
    job = startJob({ kind: 'download', ref, key, title: s.title }, s.bytes ?? 0)
  } finally {
    starting.delete(key)
  }
  const run = tasks.runTask(
    {
      kind: 'historyDownload',
      label: `Downloading ${s.title}`,
      route: null,
      controls: { cancel: () => job.controller.abort(), pauseNote: 'Downloads cannot be paused' },
      project: () => ({ done: job.done, total: job.total })
    },
    async () => {
      const res = await fetchWithRetry(s.url, {
        timeoutMs: 120_000,
        headers: historyRequestHeaders(s.url),
        taskSignal: job.controller.signal
      })
      if (!res.ok) throw new Error(`The archive answered ${res.status}`)
      const dest = destinationFor(ref, fileNameFromUrl(s.url, safeFileName(s.title)))
      const hash = createHash('sha256')
      const result = await streamResponseToFile(res, dest.abs, {
        label: s.title,
        maxInputBytes: DOWNLOAD_CAPS[s.mediaKind],
        transform: hashing(hash, () => {}),
        signal: job.controller.signal,
        onProgress: (done, total) => {
          job.done = done
          if (total > 0) job.total = total
        }
      }).finally(dest.release)
      repo.addArchive({
        ref,
        kind: s.mediaKind,
        relPath: dest.rel,
        title: s.title,
        credit: [s.credit.creator, s.credit.institution].filter(Boolean).join(', '),
        license: s.license.id,
        page: s.page ?? null,
        suggestionKey: key,
        sha256: hash.digest('hex'),
        bytes: result.outputBytes
      })
      logInfo('app', `history: downloaded ${dest.rel}`)
    }
  )
  void run.then(() => finish(job), (err) => finish(job, err))
  return { started: true }
}

export function cancelJob(id: string): void {
  jobs.get(id)?.controller.abort()
}

/** Before-quit: stop every copy and download; their temp files are removed. */
export function cancelHistoryJobs(): void {
  for (const j of jobs.values()) if (j.state === 'running') j.controller.abort()
}

function insideRoot(abs: string): void {
  const root = resolve(historyRootDir())
  const rel = relative(root, resolve(abs))
  if (rel === '' || rel === '..' || rel.startsWith(`..${sep}`)) throw new Error('That file is outside the History folder')
}

export async function openArchive(rowId: number): Promise<void> {
  const row = repo.archiveRow(rowId)
  if (!row) throw new Error('That archive file is no longer recorded')
  const abs = absoluteMediaPath(row.relPath)
  insideRoot(abs)
  if (!existsSync(abs)) throw new Error('The file is missing from the History folder')
  const error = await shell.openPath(abs)
  if (error) throw new Error(error)
}

/**
 * Forgets an archive row; with `deleteFile` also removes the copy first, so a
 * file that cannot be deleted (open in a player on Windows) keeps its row and
 * stays reachable from the page.
 */
export async function removeArchive(rowId: number, deleteFile: boolean): Promise<void> {
  const row = repo.archiveRow(rowId)
  if (!row) return
  if (deleteFile) await deleteArchiveFile(row.relPath)
  repo.removeArchive(rowId)
}

async function deleteArchiveFile(relPath: string): Promise<void> {
  const abs = absoluteMediaPath(relPath)
  insideRoot(abs)
  await rm(abs, { force: true })
}

/**
 * Removes every archive row and copied file of a page that is going away (a
 * personal entry being deleted): nothing could show or remove them afterwards.
 * Files go first; a failure stops before that row is forgotten.
 */
export async function removeArchiveForRef(ref: string): Promise<void> {
  for (const row of repo.archiveForRef(ref)) {
    await deleteArchiveFile(row.relPath)
    repo.removeArchive(row.id)
  }
}
