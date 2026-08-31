import { existsSync, readdirSync, statSync } from 'fs'
import { basename, dirname, extname, join } from 'path'
import { createHash } from 'crypto'
import { mediaUrl } from '@shared/mediaUrl'
import { detectSubFormat, parseSubtitleFileName, type SubFormat } from '@shared/subtitles'
import { buildSubtitleExtractArgs } from './playability'
import { isTextualSubtitle, subtitleStreams, type MediaProbe, type ProbeStream } from './probeParse'
import { runFfmpegOnce, hasFfmpeg } from './ffmpeg'
import * as cache from './cache'
import type { VideoSubtitleTrack } from '@shared/types'

// Finding subtitle tracks for a video, from two very different places, and
// delivering them IDENTICALLY: every track ends up as a file on disk with a
// navimg:// URL the renderer fetches and parses with @shared/subtitles. One
// code path, and no cues-over-IPC.
//
// A native <track> element is deliberately never used — it renders text the
// renderer cannot reach, which defeats the entire point of the feature.

const SUB_EXTS = new Set(['.srt', '.ass', '.ssa', '.vtt'])
// Listed-but-refused: Blu-ray rips carry these constantly, and claiming "no
// subtitles" when a bitmap track exists is more confusing than saying why.
const BITMAP_EXTS = new Set(['.sup', '.idx', '.sub'])

function shortHash(s: string): string {
  return createHash('sha1').update(s).digest('hex').slice(0, 12)
}

function trackFromSidecar(videoStem: string, absPath: string, relPath: string): VideoSubtitleTrack {
  const name = basename(absPath)
  const meta = parseSubtitleFileName(name)
  const ext = extname(name).toLowerCase()
  const textual = SUB_EXTS.has(ext)
  // Strip the stem so the label is the distinguishing part, not the filename.
  const tail = name.startsWith(videoStem) ? name.slice(videoStem.length).replace(/^[.\-_\s]+/, '') : name
  return {
    id: `sidecar:${shortHash(relPath)}`,
    label: tail.replace(/\.[^.]+$/, '') || (meta.lang === 'ja' ? 'Japanese' : 'Subtitles'),
    lang: meta.lang,
    format: (detectSubFormat(name) ?? 'srt') as SubFormat,
    url: textual ? mediaUrl(relPath) : null,
    signs: meta.signs,
    forced: meta.forced,
    textual
  }
}

// Sidecars, in the layouts releases actually use (the mokuro.ts findSidecar
// idiom: sibling stem match → a Subs/ folder → a lone file beside a lone video).
function discoverSidecars(absVideo: string, relVideo: string): VideoSubtitleTrack[] {
  const dir = dirname(absVideo)
  const relDir = relVideo.slice(0, relVideo.length - basename(relVideo).length)
  const stem = basename(absVideo, extname(absVideo))
  const out: VideoSubtitleTrack[] = []
  const seen = new Set<string>()

  const add = (absFile: string, relFile: string): void => {
    if (seen.has(relFile)) return
    const ext = extname(absFile).toLowerCase()
    if (!SUB_EXTS.has(ext) && !BITMAP_EXTS.has(ext)) return
    seen.add(relFile)
    out.push(trackFromSidecar(stem, absFile, relFile))
  }

  let siblings: string[] = []
  try {
    siblings = readdirSync(dir)
  } catch {
    return out
  }

  // 1. Same directory, same stem, any dotted tags: "S01E03.ja.forced.ass".
  for (const name of siblings) {
    if (name.startsWith(stem) && name.length > stem.length) add(join(dir, name), `${relDir}${name}`)
  }

  // 2. A Subs/ sibling folder, both layouts: flat stem-matched files, and the
  //    per-episode folder anime groups use (Subs/<stem>/2_Japanese.ass).
  for (const name of siblings) {
    if (!/^(subs?|subtitles)$/i.test(name)) continue
    const subsAbs = join(dir, name)
    let entries: string[] = []
    try {
      if (!statSync(subsAbs).isDirectory()) continue
      entries = readdirSync(subsAbs)
    } catch {
      continue
    }
    for (const entry of entries) {
      const abs = join(subsAbs, entry)
      try {
        if (statSync(abs).isDirectory()) {
          if (entry !== stem) continue
          for (const inner of readdirSync(abs)) {
            add(join(abs, inner), `${relDir}${name}/${entry}/${inner}`)
          }
        } else if (entry.startsWith(stem)) {
          add(abs, `${relDir}${name}/${entry}`)
        }
      } catch {
        continue
      }
    }
  }

  // 3. A lone subtitle beside a lone video (the film-in-a-folder case).
  if (out.length === 0) {
    const videos = siblings.filter((n) => /\.(mkv|mp4|avi|m4v|mov|webm)$/i.test(n))
    if (videos.length === 1) {
      for (const name of siblings) {
        if (SUB_EXTS.has(extname(name).toLowerCase())) add(join(dir, name), `${relDir}${name}`)
      }
    }
  }

  return out
}

function embeddedFormat(codec: string): SubFormat {
  const c = codec.toLowerCase()
  if (c === 'ass' || c === 'ssa') return 'ass'
  if (c === 'webvtt' || c === 'mov_text') return 'vtt'
  return 'srt'
}

function embeddedLabel(s: ProbeStream): string {
  const lang = s.language ? s.language.toUpperCase() : 'Track'
  return s.title ? `${lang} — ${s.title}` : `${lang} (${s.codec})`
}

function langOf(raw: string | null): 'ja' | 'en' | 'other' {
  const l = (raw ?? '').toLowerCase()
  if (['ja', 'jpn', 'jp'].includes(l)) return 'ja'
  if (['en', 'eng'].includes(l)) return 'en'
  return 'other'
}

// Tracks inside the container. Extraction is lazy: a track is listed as soon as
// ffprobe sees it, and only pulled out (into videocache/subs) the first time
// its cues are actually wanted.
function discoverEmbedded(absVideo: string, probe: MediaProbe | null): VideoSubtitleTrack[] {
  if (!probe) return []
  return subtitleStreams(probe).map((s) => {
    const textual = isTextualSubtitle(s.codec)
    return {
      id: `embedded:${s.typeIndex}`,
      label: embeddedLabel(s),
      lang: langOf(s.language),
      format: embeddedFormat(s.codec),
      url: null, // filled in by ensureExtracted
      signs: /sign|song/i.test(s.title ?? ''),
      forced: s.isForced,
      textual
    }
  })
}

// Sidecars come FIRST: a file the user put there by hand is almost always what
// they want over whatever the release muxed in.
export function listTracks(
  absVideo: string,
  relVideo: string,
  probe: MediaProbe | null
): VideoSubtitleTrack[] {
  return [...discoverSidecars(absVideo, relVideo), ...discoverEmbedded(absVideo, probe)]
}

// Pulls an embedded track out to disk and fills in its URL. Runs through
// execFile rather than the prepare session, so a subtitle can be extracted
// while a conversion is running.
export async function ensureExtracted(
  absVideo: string,
  track: VideoSubtitleTrack
): Promise<VideoSubtitleTrack> {
  if (track.url || !track.id.startsWith('embedded:')) return track
  if (!track.textual) return track
  if (!(await hasFfmpeg())) return track

  const typeIndex = Number(track.id.slice('embedded:'.length))
  if (!Number.isFinite(typeIndex)) return track

  let st: { mtimeMs: number; size: number }
  try {
    const s = statSync(absVideo)
    st = { mtimeMs: s.mtimeMs, size: s.size }
  } catch {
    return track
  }

  // Keyed by source identity so an unchanged file reuses its extracted track.
  const base = cache.sourceKey(absVideo, st.mtimeMs, st.size)
  const fileName = `${base}-s${typeIndex}.${track.format}`
  const absOut = join(cache.subsDir(), fileName)
  const relOut = `videocache/subs/${fileName}`

  if (!existsSync(absOut)) {
    const err = await runFfmpegOnce(
      buildSubtitleExtractArgs({
        input: absVideo,
        output: absOut,
        typeIndex,
        format: track.format
      })
    )
    if (err || !existsSync(absOut)) return track
  }
  return { ...track, url: mediaUrl(relOut) }
}

export async function extractAll(
  absVideo: string,
  tracks: VideoSubtitleTrack[]
): Promise<VideoSubtitleTrack[]> {
  const out: VideoSubtitleTrack[] = []
  for (const t of tracks) out.push(await ensureExtracted(absVideo, t))
  return out
}
