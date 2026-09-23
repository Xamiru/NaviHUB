import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
let db: Database.Database
let root: string
const m = vi.hoisted(() => ({ pick: vi.fn(), open: vi.fn(), stat: vi.fn(), window: { id: 1 } }))
vi.mock('electron', () => ({ BrowserWindow: { getFocusedWindow: () => m.window }, dialog: { showOpenDialog: m.pick }, shell: { openPath: m.open } }))
vi.mock('fs', async () => ({ ...await vi.importActual<typeof import('fs')>('fs'), statSync: m.stat }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: () => root, set: (_key: string, value: string) => { root = value } }))
vi.mock('../src/main/files', () => ({ absoluteMediaPath: (path: string) => `${root}/${path.replace(/^wrestling\//, '')}` }))
import * as journeys from '../src/main/repos/wrestlingJourneyRepo'
import * as files from '../src/main/wrestling/journeyFiles'
let journeyId: number
let stepId: number
beforeEach(() => {
  vi.clearAllMocks()
  db = createTestDb()
  root = '/library'
  m.stat.mockReturnValue({ isFile: () => true })
  m.open.mockResolvedValue('')
  m.pick.mockResolvedValue({ canceled: false, filePaths: ['/library/clip.mkv'] })
  journeyId = journeys.save(null, { title: 'Story', description: '' })
  stepId = journeys.saveStep(journeyId, null, { title: 'Challenge', kind: 'segment', linkedId: null, stepDate: null, notes: '', sourceUrl: '' })
})
afterEach(() => db.close())
describe('journey local file boundary', () => {
  it('parents the picker and stores a relative path, then opens through the system player', async () => {
    await files.pick(journeyId, stepId)
    expect(m.pick).toHaveBeenCalledWith(m.window, expect.objectContaining({ properties: ['openFile'] }))
    expect(files.detail(journeyId).entries[0]).toMatchObject({ filePath: 'clip.mkv', hasLocalFile: true })
    await files.open(journeyId, stepId)
    expect(m.open).toHaveBeenCalledWith('/library/clip.mkv')
    files.detach(journeyId, stepId)
    await expect(files.open(journeyId, stepId)).rejects.toThrow(/unavailable/)
  })
  it('rejects paths outside the configured root and foreign step ownership', async () => {
    m.pick.mockResolvedValue({ canceled: false, filePaths: ['/elsewhere/clip.mkv'] })
    await expect(files.pick(journeyId, stepId)).rejects.toThrow(/inside the Wrestling folder/)
    expect(files.detail(journeyId).entries[0].filePath).toBeNull()
    const other = journeys.save(null, { title: 'Other', description: '' })
    await expect(files.pick(other, stepId)).rejects.toThrow(/belong/)
  })
  it('reports an unplugged copy as unavailable and rechecks ownership after the dialog', async () => {
    await files.pick(journeyId, stepId)
    m.stat.mockImplementation(() => { throw new Error('ENOENT') })
    expect(files.detail(journeyId).entries[0].hasLocalFile).toBe(false)
    await expect(files.open(journeyId, stepId)).rejects.toThrow(/unavailable/)
    m.stat.mockReturnValue({ isFile: () => true })
    m.pick.mockImplementation(async () => { journeys.removeStep(journeyId, stepId); return { canceled: false, filePaths: ['/library/clip.mkv'] } })
    await expect(files.pick(journeyId, stepId)).rejects.toThrow(/belong/)
    expect(journeys.detail(journeyId).entries).toEqual([])
  })
})
