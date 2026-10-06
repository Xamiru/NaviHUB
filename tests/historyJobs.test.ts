import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { createTestDb } from './helpers'

// History archive jobs against a real temporary folder: concurrent attaches
// get distinct names, a duplicate download starts once, and removal deletes
// the file before forgetting its row.

let db: Database.Database
const io = vi.hoisted(() => ({
  root: '',
  picked: '',
  fetches: 0,
  release: null as null | (() => void)
}))

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({
  app: { getPath: () => io.root },
  BrowserWindow: { getFocusedWindow: () => null },
  dialog: { showOpenDialog: async () => ({ canceled: false, filePaths: [io.picked] }) },
  shell: { openPath: async () => '' }
}))
vi.mock('../src/main/files', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  historyRootDir: () => join(io.root, 'history'),
  absoluteMediaPath: (rel: string) => join(io.root, rel)
}))
vi.mock('../src/main/history/historyService', () => ({
  suggestion: (_ref: string, id: string) => ({
    id,
    title: 'Speech',
    url: 'https://archive.org/download/speech.mp3',
    mediaKind: 'audio',
    bytes: 4,
    credit: { creator: 'A', institution: null },
    license: { id: 'pd' }
  })
}))
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async () => {
    io.fetches += 1
    await new Promise<void>((r) => (io.release = r))
    return new Response('data', { status: 200 })
  }
}))

import * as jobs from '../src/main/history/historyJobs'
import * as repo from '../src/main/repos/historyRepo'

async function settle(): Promise<void> {
  for (let i = 0; i < 200 && jobs.archiveJobs().some((j) => j.state === 'running'); i++) {
    await new Promise((r) => setTimeout(r, 5))
  }
}

beforeEach(() => {
  db = createTestDb()
  io.root = mkdtempSync(join(tmpdir(), 'navihub-history-jobs-'))
  io.picked = join(io.root, 'speech.mp3')
  writeFileSync(io.picked, 'x'.repeat(1 << 16))
  io.fetches = 0
})

afterEach(() => {
  rmSync(io.root, { recursive: true, force: true })
})

describe('History archive jobs', () => {
  it('gives two attaches of the same name to one page distinct files', async () => {
    await Promise.all([jobs.attachFile('event:x'), jobs.attachFile('event:x')])
    await settle()
    const rows = repo.archiveForRef('event:x')
    expect(rows).toHaveLength(2)
    expect(new Set(rows.map((r) => r.relPath)).size).toBe(2)
    expect(readdirSync(join(io.root, 'history', 'event-x')).sort()).toEqual(['speech (2).mp3', 'speech.mp3'])
  })

  it('starts a suggestion download once when asked twice at the same time', async () => {
    const [a, b] = await Promise.all([jobs.downloadSuggestion('event:x', 's1'), jobs.downloadSuggestion('event:x', 's1')])
    expect([a.started, b.started].sort()).toEqual([false, true])
    for (let i = 0; i < 100 && !io.release; i++) await new Promise((r) => setTimeout(r, 5))
    io.release?.()
    await settle()
    expect(io.fetches).toBe(1)
    expect(repo.archiveForRef('event:x')).toHaveLength(1)
    // Already in the archive: a later request does not download it again.
    expect(await jobs.downloadSuggestion('event:x', 's1')).toEqual({ started: false })
  })

  it('keeps the row when the file cannot be deleted', async () => {
    const rel = 'history/event-x/locked.mp4'
    mkdirSync(join(io.root, rel), { recursive: true })
    writeFileSync(join(io.root, rel, 'inner'), 'x')
    const id = repo.addArchive({
      ref: 'event:x', kind: 'video', relPath: rel, title: 'Locked', credit: null, license: null,
      page: null, suggestionKey: null, sha256: null, bytes: 1
    })
    await expect(jobs.removeArchive(id, true)).rejects.toThrow()
    expect(repo.archiveRow(id)).not.toBeNull()
  })

  it('removes every archive row and file of a page', async () => {
    await jobs.attachFile('event:my-coup')
    await settle()
    const [row] = repo.archiveForRef('event:my-coup')
    expect(existsSync(join(io.root, row.relPath))).toBe(true)
    await jobs.removeArchiveForRef('event:my-coup')
    expect(repo.archiveForRef('event:my-coup')).toEqual([])
    expect(existsSync(join(io.root, row.relPath))).toBe(false)
  })
})
