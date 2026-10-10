import Database from 'better-sqlite3'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/main/logBus', () => ({ logInfo: () => {}, logWarn: () => {}, logError: () => {} }))

import {
  BACKUP_KIND,
  MACHINE_LOCAL_SETTING_KEYS,
  RESTORE_MARKER,
  backupEntryTarget,
  compareVersions,
  planSettingsMerge,
  validateManifest,
  type BackupManifest
} from '../src/main/libraryBackupCore'
import {
  copyBackupFiles,
  extractDb,
  filesToRestore,
  openBackupSource,
  removePartialsSync,
  writeBackupZip
} from '../src/main/libraryBackupFiles'
import { runStartupMaintenance, takeStartupNotices } from '../src/main/startupMaintenance'

let dir = ''
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'navihub-backup-'))
  takeStartupNotices()
})
afterEach(() => rmSync(dir, { recursive: true, force: true }))

function put(path: string, content: string): void {
  mkdirSync(join(path, '..'), { recursive: true })
  writeFileSync(path, content)
}

function makeDb(path: string, label: string): void {
  const db = new Database(path)
  db.exec('CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT); CREATE TABLE media_item (id INTEGER PRIMARY KEY, title TEXT)')
  db.prepare('INSERT INTO media_item (title) VALUES (?)').run(label)
  db.close()
}

function titleIn(path: string): string {
  const db = new Database(path, { readonly: true })
  try {
    return (db.prepare('SELECT title FROM media_item').get() as { title: string }).title
  } finally {
    db.close()
  }
}

const manifest = (over: Partial<BackupManifest> = {}): BackupManifest => ({
  kind: BACKUP_KIND,
  formatVersion: 1,
  appVersion: '0.2.0',
  createdAt: '2026-10-10T10:00:00.000Z',
  machine: 'pc',
  includes: { media: true, history: true, pictures: false, jpaudio: true, audio: false },
  counts: { titles: 1, files: 2, bytes: 10 },
  ...over
})

describe('backup rules', () => {
  it('accepts backups from this or an older version only', () => {
    expect(validateManifest(manifest(), '0.2.0').ok).toBe(true)
    expect(validateManifest(manifest({ appVersion: '0.1.9' }), '0.2.0').ok).toBe(true)
    expect(validateManifest(manifest({ appVersion: '0.3.0' }), '0.2.0')).toMatchObject({ ok: false })
    expect(validateManifest(manifest({ formatVersion: 2 }), '0.2.0')).toMatchObject({ ok: false })
    // A library export's manifest is not a backup.
    expect(validateManifest({ schemaVersion: 1, appVersion: '0.2.0' }, '0.2.0')).toMatchObject({ ok: false })
    expect(compareVersions('0.10.0', '0.9.9')).toBe(1)
    expect(compareVersions('1.0.0-beta.2', '1.0.0')).toBe(0)
  })

  it('maps only safe paths inside the backup roots', () => {
    expect(backupEntryTarget('media/dl-abc.jpg')).toEqual({ root: 'media', rel: 'dl-abc.jpg' })
    expect(backupEntryTarget('jpaudio/mining/a.mp3')).toEqual({ root: 'jpaudio', rel: 'mining/a.mp3' })
    expect(backupEntryTarget('pictures/Berserk (manga)/a.png')).toEqual({ root: 'pictures', rel: 'Berserk (manga)/a.png' })
    for (const bad of ['navihub.db', 'manifest.json', 'media/../x', 'media//x', 'other/x', 'media/', 'media/C:/x']) {
      expect(backupEntryTarget(bad), bad).toBeNull()
    }
  })

  it('keeps this machine’s folders and readable keys', () => {
    const backup = new Map([
      ['music.dir', 'D:\\Music'],
      ['video.dir', 'D:\\Video'],
      ['score.max', '100'],
      ['tmdb.api_key', 'envelope-from-pc'],
      ['omdb.api_key', 'envelope-pc-omdb']
    ])
    const current = new Map([
      ['music.dir', '/home/me/Music'],
      ['tmdb.api_key', 'envelope-here'],
      ['omdb.api_key', 'envelope-here-omdb']
    ])
    const writes = planSettingsMerge(
      backup,
      current,
      (key) => key === 'omdb.api_key', // only the OMDb envelope decrypts here
      () => true
    )
    expect(writes).toEqual(
      expect.arrayContaining([
        { key: 'music.dir', value: '/home/me/Music' },
        { key: 'video.dir', value: null },
        { key: 'tmdb.api_key', value: 'envelope-here' }
      ])
    )
    expect(writes.find((w) => w.key === 'omdb.api_key')).toBeUndefined()
    expect(writes.find((w) => w.key === 'score.max')).toBeUndefined()
  })

  it('lists every path-like setting main reads as machine-local', () => {
    const files = readdirSync('src/main', { recursive: true }) as string[]
    const keys = new Set<string>()
    for (const file of files.filter((f) => f.endsWith('.ts'))) {
      const src = readFileSync(join('src/main', file), 'utf8')
      for (const m of src.matchAll(/(?:getSetting|settingsRepo\.get|\bget)\('([a-zA-Z0-9_.]+)'\)/g)) keys.add(m[1])
    }
    const pathLike = [...keys].filter((k) => /\.dir$|path$|Path$|cookieFile$|start_cmd$|\.url$/.test(k))
    expect(pathLike.length).toBeGreaterThan(10)
    const missing = pathLike.filter((k) => !(MACHINE_LOCAL_SETTING_KEYS as readonly string[]).includes(k))
    expect(missing).toEqual([])
  })
})

describe('backup files', () => {
  it('round-trips a ZIP and restores only the images this machine lacks', async () => {
    const live = join(dir, 'live.db')
    makeDb(live, 'from the backup')
    put(join(dir, 'src-media/dl-1.jpg'), 'one')
    put(join(dir, 'src-media/picked/2.png'), 'two')
    put(join(dir, 'src-history/ev/a.pdf'), 'pdf')
    const zip = join(dir, 'out/backup.zip')
    mkdirSync(join(dir, 'out'))

    const written = await writeBackupZip({
      outputZip: zip,
      roots: { media: join(dir, 'src-media'), history: join(dir, 'src-history') },
      totalBytes: 100,
      snapshot: async (dbPath) => {
        const db = new Database(live, { readonly: true })
        await db.backup(dbPath)
        db.close()
      },
      manifest: () => manifest()
    })
    expect(written.kind).toBe(BACKUP_KIND)
    expect(readdirSync(join(dir, 'out'))).toEqual(['backup.zip'])

    const source = await openBackupSource(zip)
    expect(validateManifest(await source.readManifest(), '0.2.0').ok).toBe(true)
    await extractDb(source, join(dir, 'staged/navihub.db'))
    expect(titleIn(join(dir, 'staged/navihub.db'))).toBe('from the backup')

    const roots = {
      media: join(dir, 'here-media'),
      history: join(dir, 'here-history'),
      pictures: join(dir, 'here-pics'),
      jpaudio: join(dir, 'here-jpaudio'),
      audio: join(dir, 'here-audio')
    }
    put(join(roots.media, 'dl-1.jpg'), 'one') // already here, same size
    put(join(roots.media, 'mine.jpg'), 'only on this machine')
    const todo = await filesToRestore(source, roots)
    expect(todo.map((t) => t.file.name).sort()).toEqual(['history/ev/a.pdf', 'media/picked/2.png'])
    expect(await copyBackupFiles(source, todo)).toBe(2)
    source.close()
    expect(readFileSync(join(roots.media, 'picked/2.png'), 'utf8')).toBe('two')
    expect(readFileSync(join(roots.media, 'mine.jpg'), 'utf8')).toBe('only on this machine')
    expect(readdirSync(roots.media).some((n) => n.endsWith('.restoring'))).toBe(false)
  })

  it('never overwrites an existing file, whatever its size', async () => {
    put(join(dir, 'b/manifest.json'), JSON.stringify(manifest()))
    put(join(dir, 'b/pictures/Berserk (manga)/01.jpg'), 'the backup’s different picture')
    put(join(dir, 'b/jpaudio/mining/clip.mp3'), 'clip')
    const roots = {
      media: join(dir, 'm'),
      history: join(dir, 'h'),
      pictures: join(dir, 'p'),
      jpaudio: join(dir, 'j'),
      audio: join(dir, 'a')
    }
    put(join(roots.pictures, 'Berserk (manga)/01.jpg'), 'mine')
    const source = await openBackupSource(join(dir, 'b'))
    const todo = await filesToRestore(source, roots)
    expect(todo.map((t) => t.file.name)).toEqual(['jpaudio/mining/clip.mp3'])
    await copyBackupFiles(source, todo)
    expect(readFileSync(join(roots.pictures, 'Berserk (manga)/01.jpg'), 'utf8')).toBe('mine')
    expect(readFileSync(join(roots.jpaudio, 'mining/clip.mp3'), 'utf8')).toBe('clip')
  })

  it('matches roots saved with a trailing or doubled slash', async () => {
    put(join(dir, 'b/manifest.json'), JSON.stringify(manifest()))
    put(join(dir, 'b/media/dl-1.jpg'), 'x')
    const media = join(dir, 'm')
    const roots = { media: `${media}/`, history: `${dir}//h`, pictures: join(dir, 'p'), jpaudio: join(dir, 'j'), audio: join(dir, 'a') }
    const source = await openBackupSource(join(dir, 'b'))
    const todo = await filesToRestore(source, roots)
    expect(todo.map((t) => t.target)).toEqual([join(media, 'dl-1.jpg')])
  })

  it('removes a running backup’s partial files synchronously at quit', async () => {
    const live = join(dir, 'live.db')
    makeDb(live, 'x')
    mkdirSync(join(dir, 'out'))
    const zip = join(dir, 'out/backup.zip')
    const controller = new AbortController()
    let release = (): void => {}
    const running = writeBackupZip({
      outputZip: zip,
      roots: {},
      totalBytes: 1,
      signal: controller.signal,
      snapshot: async (dbPath) => {
        writeFileSync(dbPath, 'snapshot')
        await new Promise<void>((resolve) => (release = resolve))
      },
      manifest: () => manifest()
    })
    await vi.waitFor(() => expect(existsSync(`${zip}.partial-db`)).toBe(true))
    controller.abort()
    removePartialsSync()
    expect(readdirSync(join(dir, 'out'))).toEqual([])
    release()
    await expect(running).rejects.toThrow()
  })

  it('reads a backup folder chosen by its manifest', async () => {
    put(join(dir, 'b/manifest.json'), JSON.stringify(manifest()))
    makeDb(join(dir, 'b/navihub.db'), 'folder backup')
    put(join(dir, 'b/media/x.jpg'), 'x')
    const source = await openBackupSource(join(dir, 'b/manifest.json'))
    expect(source.files().map((f) => f.name).sort()).toEqual(['manifest.json', 'media/x.jpg', 'navihub.db'])
    await extractDb(source, join(dir, 's/navihub.db'))
    expect(titleIn(join(dir, 's/navihub.db'))).toBe('folder backup')
  })
})

describe('restore at startup', () => {
  function stage(content: 'db' | 'garbage'): { dbPath: string; safetyDir: string } {
    const dbPath = join(dir, 'navihub.db')
    makeDb(dbPath, 'current library')
    const staged = join(dir, 'restore-staging/navihub.db')
    mkdirSync(join(dir, 'restore-staging'))
    if (content === 'db') makeDb(staged, 'restored library')
    else writeFileSync(staged, 'not a database at all, just bytes')
    const safetyDir = join(dir, 'backups/before-restore-1')
    writeFileSync(join(dir, RESTORE_MARKER), JSON.stringify({ stagedDb: staged, safetyDir, label: 'the backup from Monday' }))
    return { dbPath, safetyDir }
  }

  it('swaps the staged database in and keeps the old one as a safety copy', () => {
    const { dbPath, safetyDir } = stage('db')
    runStartupMaintenance(dir, dbPath)
    expect(titleIn(dbPath)).toBe('restored library')
    expect(titleIn(join(safetyDir, 'navihub.db'))).toBe('current library')
    expect(JSON.parse(readFileSync(join(safetyDir, 'safety.json'), 'utf8')).replacedBy).toBe('the backup from Monday')
    expect(existsSync(join(dir, RESTORE_MARKER))).toBe(false)
    expect(existsSync(join(dir, 'restore-staging'))).toBe(false)
    expect(takeStartupNotices()).toEqual([expect.objectContaining({ ok: true })])
  })

  it('never throws when the marker cannot be read', () => {
    const dbPath = join(dir, 'navihub.db')
    makeDb(dbPath, 'current library')
    mkdirSync(join(dir, RESTORE_MARKER)) // a folder: reading it fails
    expect(() => runStartupMaintenance(dir, dbPath)).not.toThrow()
    expect(titleIn(dbPath)).toBe('current library')
    expect(takeStartupNotices()).toEqual([expect.objectContaining({ ok: false })])
  })

  it('leaves the library untouched when the staged database is damaged', () => {
    const { dbPath, safetyDir } = stage('garbage')
    runStartupMaintenance(dir, dbPath)
    expect(titleIn(dbPath)).toBe('current library')
    expect(existsSync(safetyDir)).toBe(false)
    expect(existsSync(join(dir, RESTORE_MARKER))).toBe(false)
    expect(takeStartupNotices()).toEqual([expect.objectContaining({ ok: false })])
  })
})
