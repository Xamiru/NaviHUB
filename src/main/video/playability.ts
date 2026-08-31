import { isAbsolute } from 'path'

// ffmpeg and ffprobe have no `--` option terminator. Paths must be absolute to
// prevent option injection, and `file:` disambiguates filenames containing a
// colon (including every Windows drive path) from ffmpeg protocols.
export function assertSafeArgPath(path: string): void {
  if (!path) throw new Error('Empty path')
  if (path.startsWith('-')) throw new Error(`Refusing an option-like path: ${path}`)
  if (!isAbsolute(path)) throw new Error(`ffmpeg path must be absolute: ${path}`)
  if (path.includes('\u0000')) throw new Error('Path contains a NUL byte')
}

export function ffInputArg(absPath: string): string {
  assertSafeArgPath(absPath)
  return `file:${absPath}`
}

export function buildProbeArgs(absPath: string): string[] {
  return [
    '-v',
    'error',
    '-hide_banner',
    '-print_format',
    'json',
    '-show_format',
    '-show_streams',
    '-i',
    ffInputArg(absPath)
  ]
}

// Pulls one textual subtitle stream out for the offline Japanese corpus.
// typeIndex (not the absolute stream index) is what -map 0:s:N expects.
export function buildSubtitleExtractArgs(input: {
  input: string
  output: string
  typeIndex: number
  format: 'ass' | 'srt' | 'vtt'
}): string[] {
  return [
    '-nostdin',
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    ffInputArg(input.input),
    '-map',
    `0:s:${input.typeIndex}`,
    '-c:s',
    input.format === 'vtt' ? 'webvtt' : 'copy',
    '-f',
    input.format === 'vtt' ? 'webvtt' : input.format,
    ffInputArg(input.output)
  ]
}
