import { dialog } from 'electron'
import { basename, dirname, extname, isAbsolute, relative } from 'path'
import { get as getSetting, set as setSetting } from '../repos/settingsRepo'
import { VIDEO_EXTS, cleanTitle } from '../video/names'
import * as repo from '../repos/wrestlingRepo'
import type { WrestlingLooseMatchInput } from '@shared/types'

// Adding a loose match: a rip you own with no PPV behind it. The file is picked
// in main (the manga.attachFolder posture) and must live under the wrestling
// root so the stored path stays relative and the library stays relocatable —
// the same contract per-event attach follows.

export interface LoosePickResult {
  ok: boolean
  error?: string
  matchId?: number
}

export async function pickAndCreate(input?: Partial<WrestlingLooseMatchInput>): Promise<LoosePickResult> {
  const res = await dialog.showOpenDialog({
    title: 'Choose the match video file',
    defaultPath: getSetting('wrestling.dir')?.trim() || undefined,
    properties: ['openFile'],
    filters: [{ name: 'Video', extensions: [...VIDEO_EXTS].map((e) => e.replace(/^\./, '')) }]
  })
  if (res.canceled || res.filePaths.length === 0) return { ok: false }
  const picked = res.filePaths[0]
  if (!VIDEO_EXTS.has(extname(picked).toLowerCase())) {
    return { ok: false, error: 'That file is not a video.' }
  }

  // First pick bootstraps the root, exactly like the first folder attach.
  let root = getSetting('wrestling.dir')?.trim()
  if (!root) {
    root = dirname(picked)
    setSetting('wrestling.dir', root!)
  }
  const rel = relative(root!, picked)
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
    return {
      ok: false,
      error: `File must be inside the wrestling library root (${root} — change it in Settings)`
    }
  }

  const relPath = rel.split('\\').join('/')
  const fallback = cleanTitle(basename(picked))
  const videoId = repo.addLooseVideo(relPath, fallback)
  const matchId = repo.createLooseMatch(
    {
      title: input?.title?.trim() || fallback,
      showLabel: input?.showLabel ?? null,
      matchDate: input?.matchDate ?? null,
      stipulation: input?.stipulation ?? null,
      wrestlerIds: input?.wrestlerIds ?? [],
      winnerIds: input?.winnerIds ?? []
    },
    videoId
  )
  return { ok: true, matchId }
}
