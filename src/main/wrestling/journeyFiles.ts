import { BrowserWindow, dialog, shell } from 'electron'
import { statSync } from 'fs'
import { dirname, extname, isAbsolute, relative } from 'path'
import { getSqlite } from '../db/connection'
import { absoluteMediaPath } from '../files'
import * as settings from '../repos/settingsRepo'
import * as repo from '../repos/wrestlingJourneyRepo'
import { VIDEO_EXTS } from '../video/names'

function available(path: string): boolean {
  try {
    return statSync(absoluteMediaPath(`wrestling/${path}`)).isFile()
  } catch {
    return false
  }
}
export function detail(id: number) {
  const data = repo.detail(id)
  for (const step of data.entries) step.hasLocalFile = !!step.filePath && available(step.filePath)
  return data
}
export async function pick(journeyId: number, stepId: number): Promise<void> {
  repo.requireStep(journeyId, stepId)
  const window = BrowserWindow.getFocusedWindow()
  const options = {
    title: 'Choose this journey step’s video',
    properties: ['openFile'] as ['openFile'],
    filters: [{ name: 'Video', extensions: [...VIDEO_EXTS].map((e) => e.slice(1)) }]
  }
  const result = window
    ? await dialog.showOpenDialog(window, options)
    : await dialog.showOpenDialog(options)
  if (result.canceled || !result.filePaths[0]) return
  const file = result.filePaths[0]
  if (!VIDEO_EXTS.has(extname(file).toLowerCase()) || !statSync(file).isFile())
    throw new Error('Choose a video file')
  const root = settings.get('wrestling.dir')?.trim() || dirname(file)
  const rel = relative(root, file)
  if (!rel || rel.startsWith('..') || isAbsolute(rel))
    throw new Error('Choose a file inside the Wrestling folder configured in Settings')
  repo.requireStep(journeyId, stepId)
  if (!settings.get('wrestling.dir')?.trim()) settings.set('wrestling.dir', root)
  getSqlite()
    .prepare('UPDATE wrestling_journey_step SET file_path=? WHERE id=? AND journey_id=?')
    .run(rel.split('\\').join('/'), stepId, journeyId)
}
export function detach(journeyId: number, stepId: number): void {
  repo.requireStep(journeyId, stepId)
  getSqlite().prepare('UPDATE wrestling_journey_step SET file_path=NULL WHERE id=?').run(stepId)
}
export async function open(journeyId: number, stepId: number): Promise<void> {
  repo.requireStep(journeyId, stepId)
  const row = getSqlite()
    .prepare('SELECT file_path FROM wrestling_journey_step WHERE id=?')
    .get(stepId) as { file_path: string | null }
  if (!row.file_path || !available(row.file_path))
    throw new Error('Local file is unavailable. Reconnect the drive or attach another copy.')
  const error = await shell.openPath(absoluteMediaPath(`wrestling/${row.file_path}`))
  if (error) throw new Error(error)
}
