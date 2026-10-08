import { ffInputArg } from '../video/playability'

// Pure half of the clip still: where to seek and the ffmpeg argv. Both paths
// go through ffInputArg (absolute, not option-like, `file:`-prefixed) because
// ffmpeg has no `--` terminator.

// About a tenth of the way in skips cold opens and black leaders without
// running into a short clip's end; capped so a documentary does not seek far.
export function frameSeekSeconds(durationSec: number | null): number {
  if (!durationSec || !Number.isFinite(durationSec) || durationSec <= 0) return 5
  return Math.round(Math.min(durationSec * 0.1, 120) * 10) / 10
}

export function frameArgs(inputAbs: string, outputAbs: string, seekSec: number): string[] {
  return [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-ss',
    String(Math.max(0, seekSec)),
    '-i',
    ffInputArg(inputAbs),
    '-frames:v',
    '1',
    '-vf',
    'scale=640:-2',
    '-q:v',
    '4',
    ffInputArg(outputAbs)
  ]
}
