// Justified rows for the Pictures gallery: every row spans the full width and
// every image keeps its aspect ratio, so 16:9 wallpapers and tall fan art sit
// side by side uncropped. Greedy: fill a row at the target height until it
// overflows, then scale the row down to fit exactly. The last row keeps the
// target height rather than stretching a lone image across the page.

export interface JustifiedRow {
  // Indexes into the input, in order.
  items: number[]
  height: number
  // Pixel widths, matching items.
  widths: number[]
}

export interface JustifiedOptions {
  containerWidth: number
  targetHeight: number
  gap: number
}

export function justifiedRows(aspects: number[], opts: JustifiedOptions): JustifiedRow[] {
  const { containerWidth, targetHeight, gap } = opts
  if (containerWidth <= 0) return []
  const rows: JustifiedRow[] = []
  let current: number[] = []
  let aspectSum = 0

  const close = (last: boolean): void => {
    if (current.length === 0) return
    const gaps = gap * (current.length - 1)
    // A full row closes only once it overflows, so fit <= targetHeight; the
    // last row may be short and keeps the target height instead.
    const fit = (containerWidth - gaps) / aspectSum
    const height = last ? Math.min(targetHeight, fit) : fit
    rows.push({
      items: current,
      height,
      widths: current.map((i) => aspects[i] * height)
    })
    current = []
    aspectSum = 0
  }

  aspects.forEach((aspect, i) => {
    current.push(i)
    aspectSum += aspect
    const rowWidth = aspectSum * targetHeight + gap * (current.length - 1)
    if (rowWidth >= containerWidth) close(false)
  })
  close(true)
  return rows
}

// Unknown dimensions fall back to the usual shape of the kind; extreme
// panoramas and strips are clamped so one image cannot own a whole row.
export function aspectOf(
  width: number | null,
  height: number | null,
  kind: 'wallpaper' | 'fanart'
): number {
  const raw = width && height ? width / height : kind === 'wallpaper' ? 16 / 9 : 2 / 3
  return Math.min(3, Math.max(0.4, raw))
}
