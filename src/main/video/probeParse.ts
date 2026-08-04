// Pure parsing of `ffprobe -print_format json -show_format -show_streams`.
// No electron / child_process / fs, so the playability tests run against real
// captured probe output with no binary anywhere (the coachTools.ts split).

export interface ProbeStream {
  index: number // absolute stream index — what `-map 0:<i>` takes
  typeIndex: number // index WITHIN its own type — what `-map 0:s:<n>` takes
  type: 'video' | 'audio' | 'subtitle' | 'other'
  codec: string
  language: string | null
  title: string | null
  width: number | null
  height: number | null
  channels: number | null
  pixFmt: string | null // 'yuv420p10le' etc — 10-bit detection
  colorTransfer: string | null // 'smpte2084'/'arib-std-b67' = true HDR
  isDefault: boolean
  isForced: boolean
  isAttachedPic: boolean
}

export interface MediaProbe {
  durationSec: number | null
  startTimeSec: number
  formatName: string
  sizeBytes: number | null
  streams: ProbeStream[]
}

interface RawStream {
  index?: number
  codec_type?: string
  codec_name?: string
  width?: number
  height?: number
  channels?: number
  pix_fmt?: string
  color_transfer?: string
  tags?: Record<string, string>
  disposition?: Record<string, number>
}

function num(v: unknown): number | null {
  const n = typeof v === 'string' ? parseFloat(v) : typeof v === 'number' ? v : NaN
  return Number.isFinite(n) ? n : null
}

function streamType(codecType: string | undefined): ProbeStream['type'] {
  if (codecType === 'video' || codecType === 'audio' || codecType === 'subtitle') return codecType
  return 'other'
}

export function parseProbeJson(raw: string): MediaProbe | null {
  let doc: { format?: Record<string, unknown>; streams?: RawStream[] }
  try {
    doc = JSON.parse(raw)
  } catch {
    return null
  }
  if (!doc || typeof doc !== 'object') return null
  const streams: ProbeStream[] = []
  // typeIndex is counted per codec_type in stream order. It is NOT the absolute
  // index, and `-map 0:s:N` wants this one — getting it wrong silently extracts
  // the wrong subtitle track.
  const counters: Record<string, number> = {}
  for (const s of doc.streams ?? []) {
    const type = streamType(s.codec_type)
    const key = s.codec_type ?? 'other'
    const typeIndex = counters[key] ?? 0
    counters[key] = typeIndex + 1
    const tags = s.tags ?? {}
    const disp = s.disposition ?? {}
    streams.push({
      index: typeof s.index === 'number' ? s.index : streams.length,
      typeIndex,
      type,
      codec: (s.codec_name ?? '').toLowerCase(),
      language: tags.language ?? tags.LANGUAGE ?? null,
      title: tags.title ?? tags.TITLE ?? null,
      width: num(s.width),
      height: num(s.height),
      channels: num(s.channels),
      pixFmt: s.pix_fmt ?? null,
      colorTransfer: s.color_transfer ?? null,
      isDefault: disp.default === 1,
      isForced: disp.forced === 1,
      isAttachedPic: disp.attached_pic === 1
    })
  }
  const fmt = doc.format ?? {}
  return {
    durationSec: num(fmt.duration),
    startTimeSec: num(fmt.start_time) ?? 0,
    formatName: typeof fmt.format_name === 'string' ? fmt.format_name : '',
    sizeBytes: num(fmt.size),
    streams
  }
}

// Cover art in an MKV/MP4 is a VIDEO stream. `-map 0:v:0` would grab the poster
// JPEG and produce a one-frame file that looks like a corrupt convert, so the
// picker skips attached pictures and still-image codecs.
const STILL_CODECS = new Set(['mjpeg', 'png', 'bmp', 'gif', 'webp'])

export function pickVideoStream(probe: MediaProbe): ProbeStream | null {
  const candidates = probe.streams.filter(
    (s) => s.type === 'video' && !s.isAttachedPic && !STILL_CODECS.has(s.codec)
  )
  return candidates[0] ?? null
}

const JA = new Set(['ja', 'jpn', 'jp', 'japanese'])

export function pickAudioStream(
  probe: MediaProbe,
  opts?: { preferLang?: string | null; override?: number | null }
): ProbeStream | null {
  const audio = probe.streams.filter((s) => s.type === 'audio')
  if (audio.length === 0) return null
  if (opts?.override != null) {
    const hit = audio.find((s) => s.index === opts.override)
    if (hit) return hit
  }
  const want = (opts?.preferLang ?? 'ja').toLowerCase()
  const wanted = audio.find((s) => {
    const lang = (s.language ?? '').toLowerCase()
    return lang === want || (JA.has(want) && JA.has(lang))
  })
  return wanted ?? audio.find((s) => s.isDefault) ?? audio[0]
}

// Subtitle codecs that carry TEXT. Everything else (Blu-ray PGS, DVD VobSub) is
// a bitmap and can never become clickable words — it gets listed and refused
// rather than silently omitted, because Blu-ray rips carry them constantly.
const TEXT_SUB_CODECS = new Set(['subrip', 'srt', 'ass', 'ssa', 'webvtt', 'mov_text', 'text'])

export function isTextualSubtitle(codec: string): boolean {
  return TEXT_SUB_CODECS.has(codec.toLowerCase())
}

export function subtitleStreams(probe: MediaProbe): ProbeStream[] {
  return probe.streams.filter((s) => s.type === 'subtitle')
}
