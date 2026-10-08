import { BrowserWindow, dialog, shell } from 'electron'
import { createHash } from 'crypto'
import { existsSync, mkdirSync, statSync, unlinkSync } from 'fs'
import { basename, dirname, extname, isAbsolute, join, relative } from 'path'
import { absoluteMediaPath, mediaRoot } from '../files'
import { logWarn } from '../logBus'
import * as settings from '../repos/settingsRepo'
import * as repo from '../repos/wrestlingClipRepo'
import { hasFfmpeg, probeFile, runFfmpegOnce } from '../video/ffmpeg'
import { VIDEO_EXTS } from '../video/names'
import { frameArgs, frameSeekSeconds } from './clipFrame'
import type {
  WrestlingClip,
  WrestlingClipEntityKind,
  WrestlingClipFilter,
  WrestlingClipInput
} from '@shared/types'

// File side of the wrestling clip shelf. Clips are references to files the user
// already keeps under wrestling.dir (stored relative, like wrestling_video and
// journey steps); NaviHUB never copies, moves or deletes the video itself.

const FRAME_DIR = 'wrestling-clips'

// Normalizes a stored relative path and refuses anything that could leave the
// wrestling root. absoluteMediaPath also blocks `..`; this is the early, clear error.
export function cleanRelative(path: string): string {
  const rel = (path ?? '').trim().split('\\').join('/').replace(/^\/+/, '')
  if (!rel || isAbsolute(path) || /^[a-zA-Z]:/.test(rel) || rel.split('/').includes('..'))
    throw new Error('Choose a file inside the Wrestling folder configured in Settings')
  return rel
}

function absolute(rel: string): string {
  return absoluteMediaPath(`wrestling/${rel}`)
}

function available(rel: string): boolean {
  try {
    return statSync(absolute(rel)).isFile()
  } catch {
    return false
  }
}

function withAvailability(clips: Omit<WrestlingClip, 'available'>[]): WrestlingClip[] {
  return clips.map((c) => ({ ...c, available: available(c.localPath) }))
}

export function list(filter: WrestlingClipFilter = {}): WrestlingClip[] {
  return withAvailability(repo.list(filter))
}

export function forEntity(kind: WrestlingClipEntityKind, id: number | string): WrestlingClip[] {
  return withAvailability(repo.forEntity(kind, id))
}

export function recent(limit = 12): WrestlingClip[] {
  return withAvailability(repo.list({ limit }))
}

// The picked file becomes a path relative to wrestling.dir. With no folder set
// yet, the file's own folder becomes it — the journeyFiles/looseMatch rule.
export async function pickFile(): Promise<{ localPath: string; title: string } | null> {
  const window = BrowserWindow.getFocusedWindow()
  const options = {
    title: 'Choose a clip',
    properties: ['openFile'] as ['openFile'],
    filters: [{ name: 'Video', extensions: [...VIDEO_EXTS].map((e) => e.slice(1)) }]
  }
  const result = window
    ? await dialog.showOpenDialog(window, options)
    : await dialog.showOpenDialog(options)
  if (result.canceled || !result.filePaths[0]) return null
  const file = result.filePaths[0]
  if (!VIDEO_EXTS.has(extname(file).toLowerCase()) || !statSync(file).isFile())
    throw new Error('Choose a video file')
  const root = settings.get('wrestling.dir')?.trim() || dirname(file)
  const rel = relative(root, file)
  if (!rel || rel.startsWith('..') || isAbsolute(rel))
    throw new Error('Choose a file inside the Wrestling folder configured in Settings')
  if (!settings.get('wrestling.dir')?.trim()) settings.set('wrestling.dir', root)
  return {
    localPath: rel.split('\\').join('/'),
    title: basename(file, extname(file)).replace(/[._]+/g, ' ').trim()
  }
}

export async function save(input: WrestlingClipInput): Promise<WrestlingClip> {
  const localPath = cleanRelative(input.localPath)
  if (!VIDEO_EXTS.has(extname(localPath).toLowerCase())) throw new Error('Choose a video file')
  if (!available(localPath))
    throw new Error('That file is not in the Wrestling folder. Reconnect the drive or pick it again.')
  const before = input.id != null ? repo.get(input.id) : null
  const id = repo.save({ ...input, localPath })
  // Saving a new path clears frame_path in the same UPDATE; drop the old still.
  if (before?.framePath && before.localPath !== localPath) deleteFrame(before.framePath)
  if (!repo.get(id)?.framePath) await grabFrame(id, localPath)
  const saved = repo.get(id)
  if (!saved) throw new Error('That clip no longer exists')
  return { ...saved, available: true }
}

// Best effort: no ffmpeg, an unreadable file or a seek past the end leaves the
// card on its fallback image. The name carries a hash of the source path so a
// re-pointed clip never reuses a cached thumbnail of the old still.
export async function grabFrame(id: number, localPath: string): Promise<void> {
  try {
    if (!(await hasFfmpeg())) return
    const input = absolute(localPath)
    const dir = join(mediaRoot(), FRAME_DIR)
    mkdirSync(dir, { recursive: true })
    const name = `${id}-${createHash('sha1').update(localPath).digest('hex').slice(0, 10)}.jpg`
    const output = join(dir, name)
    const probe = await probeFile(input)
    let err = await runFfmpegOnce(frameArgs(input, output, frameSeekSeconds(probe?.durationSec ?? null)), 30_000)
    if (err || !existsSync(output)) err = await runFfmpegOnce(frameArgs(input, output, 0), 30_000)
    if (err || !existsSync(output)) {
      logWarn('app', `clip frame failed for clip ${id}: ${err ?? 'no output'}`)
      return
    }
    repo.setFrame(id, `media/${FRAME_DIR}/${name}`)
  } catch (e) {
    logWarn('app', `clip frame failed for clip ${id}: ${(e as Error).message}`)
  }
}

function deleteFrame(framePath: string): void {
  if (!framePath.startsWith(`media/${FRAME_DIR}/`)) return
  try {
    unlinkSync(absoluteMediaPath(framePath))
  } catch {
    // already gone
  }
}

export function remove(id: number): void {
  const removed = repo.remove(id)
  if (removed?.framePath) deleteFrame(removed.framePath)
}

export async function open(id: number): Promise<void> {
  const clip = repo.get(id)
  if (!clip) throw new Error('That clip no longer exists')
  if (!available(clip.localPath))
    throw new Error('Local file is unavailable. Reconnect the drive or pick the file again.')
  const error = await shell.openPath(absolute(clip.localPath))
  if (error) throw new Error(error)
}
