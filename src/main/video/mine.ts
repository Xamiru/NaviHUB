import { createHash } from 'crypto'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { jpAudioDir } from '../files'
import { buildClipArgs } from './playability'
import { pickAudioStream } from './probeParse'
import { probeFile, runFfmpegOnce, hasFfmpeg } from './ffmpeg'

// Sentence audio for a mined card: the clip of the line you clicked.
//
// Lives under the EXISTING jpaudio/ prefix, which buys three things for free —
// no absoluteMediaPath change, no CSP change (media-src already covers navimg),
// and automatic exclusion from library exports, since jpaudio/ is never staged.
function miningAudioDir(): string {
  const dir = join(jpAudioDir(), 'mining')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return dir
}

export async function clipSentenceAudio(input: {
  absPath: string
  relPath: string
  startSec: number
  endSec: number
}): Promise<{ audioPath: string } | null> {
  if (!(await hasFfmpeg())) return null
  if (!(input.endSec > input.startSec)) return null

  // Content-addressed by intent (the dl-<sha1(url)> idiom), so re-mining the
  // same line is idempotent and a Japanese filename never has to be sanitized.
  const name = `mine-${createHash('sha1')
    .update(`${input.relPath}|${Math.round(input.startSec * 1000)}|${Math.round(input.endSec * 1000)}`)
    .digest('hex')
    .slice(0, 16)}.m4a`
  const absOut = join(miningAudioDir(), name)
  const relOut = `jpaudio/mining/${name}`
  if (existsSync(absOut)) return { audioPath: relOut }

  const probe = await probeFile(input.absPath)
  const audioStream = probe ? (pickAudioStream(probe, { preferLang: 'ja' })?.index ?? null) : null

  const err = await runFfmpegOnce(
    buildClipArgs({
      input: input.absPath,
      output: absOut,
      startSec: input.startSec,
      endSec: input.endSec,
      audioStream
    }),
    30_000
  )
  if (err || !existsSync(absOut)) return null
  return { audioPath: relOut }
}
