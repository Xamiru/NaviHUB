import { afterEach, expect, it, vi } from 'vitest'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const root = mkdtempSync(join(tmpdir(), 'navihub-download-audit-'))
let process: ReturnType<typeof fakeProcess>
function fakeProcess() {
  return Object.assign(new EventEmitter(), {
    stdout: new PassThrough(), stderr: new PassThrough(), exitCode: null,
    kill: vi.fn(() => true)
  })
}
vi.mock('child_process', async (importOriginal) => ({
  ...await importOriginal<typeof import('child_process')>(),
  spawn: vi.fn(() => { process = fakeProcess(); return process })
}))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: (key: string) => key === 'music.dir' ? root : null }))
vi.mock('../src/main/files', () => ({ musicRootDir: () => root }))
vi.mock('../src/main/music', () => ({ startScan: vi.fn() }))
vi.mock('../src/main/musicSpotify', () => ({ clearStatus: vi.fn(), killActive: vi.fn() }))
import { startScan } from '../src/main/music'
import { startDownload, getStatus, killActive } from '../src/main/musicDownload'
import { musicMaintenanceOwner } from '../src/main/musicMaintenance'

afterEach(() => {
  killActive()
  rmSync(root, { recursive: true, force: true })
})

it('reports saved audio with failed indexing as an error and releases the download slot', async () => {
  vi.mocked(startScan).mockRejectedValueOnce(new Error('folder unreadable'))
  startDownload({ url: 'https://youtu.be/example', artist: 'Artist', album: 'Album', format: 'opus' })
  process.emit('close', 0)
  await vi.waitFor(() => expect(getStatus()?.status).toBe('error'))
  expect(getStatus()?.message).toContain('folder unreadable')
  expect(getStatus()?.message).toContain('Scan library')
  expect(musicMaintenanceOwner()).toBeNull()
  expect(() => startDownload({ url: 'https://youtu.be/next', artist: 'Artist', album: 'Next', format: 'opus' })).not.toThrow()
})
