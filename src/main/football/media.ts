import { BrowserWindow, dialog, shell } from 'electron'
import { existsSync, realpathSync } from 'fs'
import { relative, resolve, sep } from 'path'
import { absoluteMediaPath, footballRootDir } from '../files'
import { validateFootballExternalLink, validateFootballRelativePath } from '@shared/football'
import type { FootballExternalProvider } from '@shared/types'

function insideRoot(absPath: string): string {
  const root = footballRootDir()
  if (!existsSync(root)) throw new Error('Configure an existing Football folder first')
  const realRoot = realpathSync(root)
  const realFile = realpathSync(absPath)
  const rel = relative(realRoot, realFile)
  if (rel === '..' || rel.startsWith(`..${sep}`) || resolve(realRoot, rel) !== realFile) {
    throw new Error('The file must be inside the configured Football folder')
  }
  return validateFootballRelativePath(rel)
}

export async function pickFile(): Promise<string | null> {
  const options: Electron.OpenDialogOptions = {
    title: 'Choose Football media',
    defaultPath: footballRootDir(),
    properties: ['openFile']
  }
  const parent = BrowserWindow.getFocusedWindow()
  const result = parent
    ? await dialog.showOpenDialog(parent, options)
    : await dialog.showOpenDialog(options)
  if (result.canceled || !result.filePaths[0]) return null
  return insideRoot(result.filePaths[0])
}

// The one way a stored Football path becomes an absolute one: validated, then
// realpath-contained in the Football root. Shared by external open and the
// in-app player so neither can follow a link out of the folder.
export function resolveLocal(localPath: string): { relPath: string; absPath: string } {
  const relativePath = validateFootballRelativePath(localPath)
  const abs = absoluteMediaPath(`football/${relativePath}`)
  insideRoot(abs)
  return { relPath: `football/${relativePath}`, absPath: abs }
}

export async function openLocal(localPath: string): Promise<void> {
  const { absPath } = resolveLocal(localPath)
  const error = await shell.openPath(absPath)
  if (error) throw new Error(error)
}

export async function openExternal(provider: FootballExternalProvider, url: string): Promise<void> {
  await shell.openExternal(validateFootballExternalLink(provider, url))
}
