import { mediaUrl } from '@shared/mediaUrl'
import type { TierBoard, TierEntry } from '@shared/types'

// Renders a tier board onto a canvas in the tiermaker share-image style: a
// title bar, one colored band per row (label cell left, cover tiles right),
// and an "Unranked" band for the pool. Returns the PNG blob.
//
// Covers load through navimg:// with crossOrigin='anonymous' — the protocol
// handler sends the ACAO header (the same contract the video player's mining
// screenshot relies on), so drawing them cannot taint the canvas. A cover that
// fails to load draws as its initial letter instead.

const TILE_H = 96
const TILE_W = 64 // 2:3-ish portrait covers
const GAP = 6
const PAD = 8
const LABEL_W = 132
const TITLE_H = 64
const MAX_COLS = 10

const BG = '#17171f'
const BAND_BG = '#1f1f2a'
const POOL_COLOR = '#8a8a96' // mid-gray so the dark 'Unranked' label reads

interface Placed {
  entry: TierEntry
  img: HTMLImageElement | null // null = draw the initial-letter placeholder
}

function loadCover(entry: TierEntry): Promise<HTMLImageElement | null> {
  if (!entry.imagePath) return Promise.resolve(null)
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img.naturalWidth > 0 ? img : null)
    img.onerror = () => resolve(null)
    img.src = mediaUrl(entry.imagePath) ?? ''
  })
}

// Center-cropped "object-cover" blit inside a rounded rect.
function drawTile(
  ctx: CanvasRenderingContext2D,
  placed: Placed,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.clip()
  const img = placed.img
  if (img) {
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight)
    const sw = w / s
    const sh = h / s
    ctx.drawImage(
      img,
      (img.naturalWidth - sw) / 2,
      (img.naturalHeight - sh) / 2,
      sw,
      sh,
      x,
      y,
      w,
      h
    )
  } else {
    ctx.fillStyle = '#26262f'
    ctx.fillRect(x, y, w, h)
    ctx.fillStyle = '#5c5c6b'
    ctx.font = `bold ${Math.round(h * 0.4)}px system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const initial = placed.entry.name.trim().charAt(0).toUpperCase() || '?'
    ctx.fillText(initial, x + w / 2, y + h / 2 + 1)
  }
  ctx.restore()
}

function drawBand(
  ctx: CanvasRenderingContext2D,
  opts: {
    x: number
    y: number
    w: number
    color: string
    label: string
    placed: Placed[]
    cols: number
  }
): void {
  const { x, y, w, color, label, placed, cols } = opts
  const innerW = cols * TILE_W + (cols + 1) * PAD
  const h = TILE_H + PAD * 2

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.roundRect(x, y, LABEL_W, h, 8)
  ctx.fill()

  ctx.fillStyle = BAND_BG
  ctx.beginPath()
  ctx.roundRect(x + LABEL_W + GAP, y, w - LABEL_W - GAP, h, 8)
  ctx.fill()

  ctx.fillStyle = '#111118'
  ctx.font = 'bold 30px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // Long labels shrink before they overflow the cell.
  const maxLabelW = LABEL_W - 16
  let size = 30
  while (ctx.measureText(label).width > maxLabelW && size > 12) {
    size -= 2
    ctx.font = `bold ${size}px system-ui, sans-serif`
  }
  ctx.fillText(label, x + LABEL_W / 2, y + h / 2 + 1)

  placed.forEach((p, i) => {
    const col = i % cols
    const rowIdx = Math.floor(i / cols)
    drawTile(ctx, p, x + LABEL_W + GAP + PAD + col * (TILE_W + PAD), y + PAD + rowIdx * (TILE_H + PAD), TILE_W, TILE_H, 6)
  })
}

export async function renderTierBoard(board: TierBoard): Promise<Blob> {
  // Resolve every unique cover once (an entity appears on exactly one container,
  // but keep it by imagePath anyway — cheap and safe).
  const all: TierEntry[] = [...board.rows.flatMap((g) => g.items), ...board.pool]
  const imgs = await Promise.all(all.map(loadCover))
  const imgByItemId = new Map<number, HTMLImageElement | null>()
  all.forEach((e, i) => imgByItemId.set(e.itemId, imgs[i]))

  const toPlaced = (items: TierEntry[]): Placed[] =>
    items.map((e) => ({ entry: e, img: imgByItemId.get(e.itemId) ?? null }))

  const bands = board.rows.map((g) => ({
    color: g.row.color,
    label: g.row.label,
    placed: toPlaced(g.items)
  }))
  if (board.pool.length > 0) {
    bands.push({ color: POOL_COLOR, label: 'Unranked', placed: toPlaced(board.pool) })
  }

  const maxCols = Math.min(
    MAX_COLS,
    Math.max(4, ...bands.map((b) => b.placed.length))
  )
  const width = Math.max(720, LABEL_W + GAP + maxCols * (TILE_W + PAD) + PAD * 2)
  const rowsNeeded = bands.map((b) => Math.max(1, Math.ceil(b.placed.length / maxCols)))
  const height =
    TITLE_H +
    bands.reduce((acc, _, i) => acc + rowsNeeded[i] * (TILE_H + PAD * 2) + GAP, 0)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#f5f5f7'
  ctx.font = 'bold 28px system-ui, sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(board.title, 20, 34)
  ctx.fillStyle = '#9a9aa8'
  ctx.font = '15px system-ui, sans-serif'
  ctx.fillText('Ranked with NaviHUB', 20, 54)

  let y = TITLE_H
  bands.forEach((b, i) => {
    for (let r = 0; r < rowsNeeded[i]; r++) {
      drawBand(ctx, {
        x: 12,
        y,
        w: width - 24,
        color: b.color,
        label: r === 0 ? b.label : '',
        placed: b.placed.slice(r * maxCols, (r + 1) * maxCols),
        cols: maxCols
      })
      y += TILE_H + PAD * 2 + GAP
    }
  })

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) throw new Error('PNG export failed')
  return blob
}
