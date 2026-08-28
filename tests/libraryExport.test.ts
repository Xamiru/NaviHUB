import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import Database from 'better-sqlite3'
import AdmZip from 'adm-zip'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestDb } from './helpers'
import type { LibraryExportOptions } from '../src/shared/types'

const env = vi.hoisted(() => ({
  db: null as Database.Database | null,
  root: '',
  userData: '',
  destination: '',
  audioRoot: '',
  pickerCancelled: false,
  revealed: [] as string[]
}))

vi.mock('electron', () => ({
  app: {
    getPath: (name: string) => (name === 'userData' ? env.userData : env.root),
    getVersion: () => '9.9.9'
  },
  BrowserWindow: class {},
  dialog: {
    showOpenDialog: async () => ({
      canceled: env.pickerCancelled,
      filePaths: env.pickerCancelled ? [] : [env.destination]
    })
  },
  shell: {
    showItemInFolder: (path: string) => env.revealed.push(path),
    openPath: async (path: string) => {
      env.revealed.push(path)
      return ''
    }
  }
}))

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => env.db!,
  getDbPath: () => join(env.userData, 'navihub.db')
}))
vi.mock('../src/main/repos/settingsRepo', () => ({
  get: (key: string) => (key === 'audio.dir' ? env.audioRoot : null)
}))

import * as exporter from '../src/main/libraryExport'
import * as tasks from '../src/main/tasks'

const OPTIONS: LibraryExportOptions = {
  sections: ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv', 'book', 'wrestling'],
  includeAssets: true,
  includeThemeAudio: true,
  includeSpotifyPlaylists: false,
  includeProgress: false,
  includeRatings: false,
  includeLists: false,
  format: 'folder'
}

async function settle(): Promise<void> {
  for (let i = 0; i < 200 && exporter.getStatus().running; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10))
  }
  expect(exporter.getStatus().running).toBe(false)
}

beforeEach(() => {
  env.root = mkdtempSync(join(tmpdir(), 'navihub-export-test-'))
  env.userData = join(env.root, 'userdata')
  env.destination = join(env.root, 'destination')
  env.audioRoot = ''
  mkdirSync(join(env.userData, 'media'), { recursive: true })
  mkdirSync(env.destination, { recursive: true })
  writeFileSync(join(env.userData, 'navihub.db'), 'estimate')
  env.db = createTestDb()
  env.db.exec(`
    INSERT INTO media_item (id, media_type, title, cover_path, status, score, progress)
    VALUES (1, 'anime', 'Cowboy Bebop', 'media/cover.jpg', 'Completed', 9, 26)
  `)
  writeFileSync(join(env.userData, 'media', 'cover.jpg'), Buffer.alloc(64, 1))
  env.pickerCancelled = false
  env.revealed.length = 0
  tasks.__reset()
  exporter.__reset()
})

afterEach(() => {
  exporter.__reset()
  env.db?.close()
  rmSync(env.root, { recursive: true, force: true })
})

describe('library export core', () => {
  it('validates selections and detects unsafe nested destinations', () => {
    expect(() => exporter.validateOptions({ ...OPTIONS, sections: [] })).toThrow('at least one')
    expect(exporter.isInsidePath('/tmp/navihub', '/tmp/navihub/export')).toBe(true)
    expect(exporter.isInsidePath('/tmp/navihub', '/tmp/elsewhere')).toBe(false)
  })

  it('chooses a unique timestamped output without overwriting', () => {
    const now = new Date(2026, 7, 28, 12, 34, 56)
    const first = exporter.uniqueOutputPath(env.destination, 'zip', now)
    writeFileSync(first, 'existing')
    expect(exporter.uniqueOutputPath(env.destination, 'zip', now)).toMatch(/ \(2\)\.zip$/)
  })

  it('rejects destinations inside managed data and configured audio', async () => {
    env.destination = join(env.userData, 'nested')
    mkdirSync(env.destination, { recursive: true })
    await expect(exporter.start(OPTIONS, null)).rejects.toThrow('data folder')
    exporter.__reset()

    env.audioRoot = join(env.root, 'audio')
    env.destination = join(env.audioRoot, 'nested')
    mkdirSync(env.destination, { recursive: true })
    await expect(exporter.start(OPTIONS, null)).rejects.toThrow('theme audio folder')
  })

  it('previews selected counts and referenced asset bytes', async () => {
    const preview = await exporter.preview(OPTIONS)
    expect(preview.sectionCounts.anime).toBe(1)
    expect(preview.selectedCount).toBe(1)
    expect(preview.assetFileCount).toBe(1)
    expect(preview.estimatedBytes).toBeGreaterThanOrEqual(64)
  })

  it('creates an atomic sanitized folder bundle', async () => {
    expect((await exporter.start(OPTIONS, null)).started).toBe(true)
    await settle()
    const status = exporter.getStatus()
    expect(status.phase).toBe('done')
    const copy = new Database(join(status.outputPath!, 'navihub.db'), { readonly: true })
    expect(copy.prepare('SELECT title, status, score, progress FROM media_item').get()).toEqual({
      title: 'Cowboy Bebop',
      status: null,
      score: null,
      progress: 0
    })
    copy.close()
    expect(readdirSync(status.outputPath!).sort()).toEqual([
      'README.txt',
      'manifest.json',
      'media',
      'navihub.db'
    ])
    expect(readdirSync(env.destination).some((name) => name.includes('.partial'))).toBe(false)
    expect(tasks.list().find((task) => task.kind === 'libraryExport')?.state).toBe('done')
    await exporter.reveal()
    expect(env.revealed).toEqual([status.outputPath])
  })

  it('creates a portable ZIP with bundle files at its root', async () => {
    expect((await exporter.start({ ...OPTIONS, format: 'zip' }, null)).started).toBe(true)
    await settle()
    const status = exporter.getStatus()
    expect(status.phase).toBe('done')
    expect(status.outputPath).toMatch(/\.zip$/)
    const entries = new AdmZip(status.outputPath!).getEntries().map((entry) => entry.entryName)
    expect(entries).toContain('navihub.db')
    expect(entries).toContain('manifest.json')
    expect(entries).toContain('media/cover.jpg')
  })

  it('leaves no partial output when cancelled', async () => {
    for (let n = 0; n < 200; n += 1) {
      writeFileSync(join(env.userData, 'media', `asset-${n}.jpg`), Buffer.alloc(4096, n))
      env.db!.prepare('UPDATE media_item SET banner_path=? WHERE id=1').run(`media/asset-${n}.jpg`)
    }
    await exporter.start({ ...OPTIONS, format: 'zip' }, null)
    exporter.cancel()
    await settle()
    expect(exporter.getStatus().phase).toBe('cancelled')
    expect(readdirSync(env.destination).some((name) => name.includes('.partial'))).toBe(false)
    expect(tasks.list().find((task) => task.kind === 'libraryExport')?.state).toBe('cancelled')
  })

  it('treats cancelling the destination picker as a no-op', async () => {
    env.pickerCancelled = true
    expect(await exporter.start(OPTIONS, null)).toEqual({ started: false, id: null })
    expect(exporter.getStatus().phase).toBe('idle')
  })
})
