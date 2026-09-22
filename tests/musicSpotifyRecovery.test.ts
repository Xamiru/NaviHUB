import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
const access = vi.hoisted(() => ({ key: 'settings-one' }))
vi.mock('electron', () => ({ BrowserWindow: {}, dialog: {} }))
vi.mock('../src/main/music', () => ({ indexMusicFiles: vi.fn() }))
vi.mock('../src/main/files', () => ({ musicRootDir: () => '/tmp/music' }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: vi.fn() }))
vi.mock('../src/main/musicTools', async (original) => ({
  ...await original<typeof import('../src/main/musicTools')>(),
  musicAccessKey: () => access.key,
  musicToolOptions: () => ({ ytdlp: 'yt-dlp' }),
  musicYtDlpArgs: () => []
}))
vi.mock('child_process', () => ({ execFile: vi.fn() }))
import { execFile } from 'child_process'
import { audioSourceInspection, forgetAudioSource, inspectAudio, previewAudio } from '../src/main/musicSpotifyRecovery'

const first = 'https://www.youtube.com/watch?v=abcdefghijk'
const second = 'https://www.youtube.com/watch?v=lmnopqrstuv'
const row = (id = 'abcdefghijk') => ({ id, title: 'Song', artist: 'Artist', duration: 180,
  url: 'https://audio.example/temporary?signature=private', formats: [{ vcodec: 'none', acodec: 'opus' }] })
beforeEach(() => {
  forgetAudioSource(first); forgetAudioSource(second)
  access.key = 'settings-one'
  vi.mocked(execFile).mockReset()
  vi.mocked(execFile).mockImplementation(((_bin: string, args: string[], _options: unknown, callback: Function) => {
    callback(null, JSON.stringify(row(new URL(args.at(-1)!).searchParams.get('v')!)), '')
  }) as typeof execFile)
})
afterEach(() => vi.restoreAllMocks())

describe('source inspection diagnostics', () => {
  it('never copies another source warning onto a missing result', () => {
    const batch = audioSourceInspection([first, second])
    batch.observe('WARNING: [youtube] lmnopqrstuv: requires a GVS PO Token; may yield HTTP Error 403')
    const result = batch.finish()
    expect(result.errors.get(first)).toContain('No usable audio metadata returned for this source')
    expect(result.errors.get(first)).not.toContain('PO Token')
    expect(result.errors.get(second)).toContain('requires a GVS PO Token')
  })
  it('retains each validation failure and prefers a source error over a warning', () => {
    const batch = audioSourceInspection([first, second])
    batch.observe(JSON.stringify({ ...row(), formats: [] }))
    batch.observe('ERROR: [youtube] lmnopqrstuv: Video unavailable')
    batch.observe('WARNING: [youtube] lmnopqrstuv: requires a PO Token; may yield HTTP Error 403')
    const result = batch.finish()
    expect(result.errors.get(first)).toContain('no compatible native audio')
    expect(result.errors.get(first)).not.toContain('lmnopqrstuv')
    expect(result.errors.get(second)).toContain('Video unavailable')
    expect(result.errors.get(second)).not.toContain('PO Token')
  })
  it('keeps valid results despite warnings and makes their evidence reusable', async () => {
    const batch = audioSourceInspection([first])
    batch.observe('WARNING: [youtube] abcdefghijk: some formats skipped')
    batch.observe(JSON.stringify(row()))
    expect(batch.finish().errors.size).toBe(0)
    expect(await inspectAudio(first)).toMatchObject({ title: 'Song', url: first })
    expect(execFile).not.toHaveBeenCalled()
  })
})

describe('fresh exact-source evidence', () => {
  it('uses one subprocess for preview followed by approval inspection, without retaining a stream URL', async () => {
    expect(await previewAudio(first)).toContain('https://audio.example/')
    const inspected = await inspectAudio('https://youtu.be/abcdefghijk')
    expect(inspected).toMatchObject({ url: first, title: 'Song', format: 'opus' })
    expect(JSON.stringify(inspected)).not.toContain('signature')
    inspected.title = 'Caller mutation'
    expect((await inspectAudio(first)).title).toBe('Song')
    expect(execFile).toHaveBeenCalledOnce()
    await inspectAudio(second)
    expect(execFile).toHaveBeenCalledTimes(2)
  })
  it('rechecks expired evidence, changed access settings and failed acquisition', async () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(1000)
    await previewAudio(first)
    now.mockReturnValue(301000)
    await inspectAudio(first)
    expect(execFile).toHaveBeenCalledTimes(2)
    access.key = 'cookies-replaced'
    await inspectAudio(first)
    expect(execFile).toHaveBeenCalledTimes(3)
    forgetAudioSource(first)
    await inspectAudio(first)
    expect(execFile).toHaveBeenCalledTimes(4)
  })
  it('does not treat playable but unvalidated preview metadata as approval evidence', async () => {
    vi.mocked(execFile).mockImplementation(((_bin: string, _args: string[], _options: unknown, callback: Function) => {
      callback(null, JSON.stringify({ ...row(), formats: [] }), '')
    }) as typeof execFile)
    await previewAudio(first)
    await expect(inspectAudio(first)).rejects.toThrow('no compatible native audio')
    expect(execFile).toHaveBeenCalledTimes(2)
  })
})
