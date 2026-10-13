import { createHash } from 'crypto'
import { existsSync, mkdirSync, statSync } from 'fs'
import { readFile, rename, rm, stat, writeFile } from 'fs/promises'
import { join } from 'path'
import { mediaUrl } from '@shared/mediaUrl'
import { videoCacheDir } from '../files'
import { hasFfmpeg, runFfmpegOnce } from './ffmpeg'
import { buildAttachmentDumpArgs, safeFontFileName } from './playability'
import { fontAttachments, type MediaProbe } from './probeParse'
import * as cache from './cache'

// Fonts a fansub MKV attaches for its ASS styles, extracted once per source
// file and served over navimg, so the styled subtitle layer renders the track
// as authored. Without ffmpeg or without attachments the list is empty and
// libass falls back to system fonts.
//
// Layout under userData/videocache/fonts/:
//   <sha1>.<ext>        one file per distinct font, shared by every episode
//                       that attaches it (a season repeats the same set)
//   <sourceKey>.json    the font files one source uses, written last
//   <sourceKey>.partial staging for a dump in progress; never served
// A dump lands in staging and is renamed into place only after ffmpeg reports
// success, so a quit or crash mid-dump can never leave a truncated font that
// a later open would trust. Settings → Storage counts and clears this folder
// with the extracted subtitles.

export const EXPECTED_DUMP_ERROR = /at least one output file must be specified/i

export function fontsCacheDir(): string {
  return join(videoCacheDir(), 'fonts')
}

// One dump per source at a time: a second caller waits for the first.
const pending = new Map<string, Promise<string[]>>()

export async function ensureFonts(absVideo: string, probe: MediaProbe | null): Promise<string[]> {
  const fonts = probe ? fontAttachments(probe) : []
  if (fonts.length === 0) return []

  let key: string
  try {
    const st = statSync(absVideo)
    key = cache.sourceKey(absVideo, st.mtimeMs, st.size)
  } catch {
    return []
  }
  let run = pending.get(key)
  if (!run) {
    run = extract(absVideo, key, fonts).finally(() => pending.delete(key))
    pending.set(key, run)
  }
  return run
}

async function extract(
  absVideo: string,
  key: string,
  fonts: { index: number; filename: string }[]
): Promise<string[]> {
  const root = fontsCacheDir()
  const manifest = join(root, `${key}.json`)
  const known = await readManifest(manifest)
  if (known && known.every((name) => existsSync(join(root, name)))) return urlsOf(known)
  if (!(await hasFfmpeg())) return []

  const staging = join(root, `${key}.partial`)
  await rm(staging, { recursive: true, force: true })
  mkdirSync(staging, { recursive: true })
  try {
    const planned = fonts.map((f) => ({ index: f.index, name: safeFontFileName(f.filename, f.index) }))
    const err = await runFfmpegOnce(
      buildAttachmentDumpArgs({
        input: absVideo,
        attachments: planned.map((f) => ({ index: f.index, output: join(staging, f.name) }))
      }),
      2 * 60_000
    )
    // ffmpeg dumps the attachments and then exits non-zero with "At least one
    // output file must be specified", so that one message is success. Any
    // other failure (a timeout kill, a read error) may have left truncated
    // files: nothing from that run is kept, so the next open tries again.
    if (err != null && !EXPECTED_DUMP_ERROR.test(err)) return []
    const names: string[] = []
    for (const f of planned) {
      const staged = join(staging, f.name)
      const size = await stat(staged).then((s) => s.size).catch(() => 0)
      if (size === 0) continue
      const name = `${createHash('sha1').update(await readFile(staged)).digest('hex')}.${f.name.split('.').pop()}`
      if (!existsSync(join(root, name))) await rename(staged, join(root, name))
      if (!names.includes(name)) names.push(name)
    }
    await writeFile(`${manifest}.tmp`, JSON.stringify(names))
    await rename(`${manifest}.tmp`, manifest)
    return urlsOf(names)
  } catch {
    // The cache was cleared under a running dump, or a write failed: serve
    // nothing this time and extract again on the next open.
    return []
  } finally {
    await rm(staging, { recursive: true, force: true }).catch(() => undefined)
  }
}

async function readManifest(path: string): Promise<string[] | null> {
  try {
    const value: unknown = JSON.parse(await readFile(path, 'utf8'))
    return Array.isArray(value) && value.every((n) => typeof n === 'string' && /^[0-9a-f]{40}\.\w+$/.test(n))
      ? (value as string[])
      : null
  } catch {
    return null
  }
}

function urlsOf(names: string[]): string[] {
  return names.map((name) => mediaUrl(`videocache/fonts/${name}`) as string)
}

