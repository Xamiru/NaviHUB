import { closeSync, openSync, readSync } from 'fs'

// Pixel dimensions from an image's header bytes, for the Pictures gallery's
// justified rows (file and URL adds arrive without width/height). Pure parser
// plus one thin read, so no decoder or native module is involved.

export interface ImageDims {
  width: number
  height: number
}

// Every format but JPEG answers from its first bytes. JPEG keeps its frame
// header after EXIF and embedded thumbnails, which can run to a few hundred KB
// on camera files, so a miss there retries with the larger read.
const HEAD_BYTES = 64 * 1024
const JPEG_HEAD_BYTES = 1024 * 1024

function dims(width: number, height: number): ImageDims | null {
  return width > 0 && height > 0 ? { width, height } : null
}

export function readImageDims(buf: Buffer): ImageDims | null {
  if (buf.length < 10) return null
  // PNG: signature, then the IHDR chunk.
  if (buf.readUInt32BE(0) === 0x89504e47 && buf.length >= 24) {
    return dims(buf.readUInt32BE(16), buf.readUInt32BE(20))
  }
  // GIF87a / GIF89a: logical screen size, little-endian.
  if (buf.toString('ascii', 0, 3) === 'GIF') return dims(buf.readUInt16LE(6), buf.readUInt16LE(8))
  // BMP: BITMAPINFOHEADER; a negative height means top-down rows.
  if (buf.toString('ascii', 0, 2) === 'BM' && buf.length >= 26) {
    return dims(buf.readInt32LE(18), Math.abs(buf.readInt32LE(22)))
  }
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    return webpDims(buf)
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) return jpegDims(buf)
  return null
}

function webpDims(buf: Buffer): ImageDims | null {
  if (buf.length < 30) return null
  const chunk = buf.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') {
    // Lossy: 14-bit sizes after the 3-byte start code at offset 23.
    return dims(buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff)
  }
  if (chunk === 'VP8L') {
    const bits = buf.readUInt32LE(21)
    return dims((bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1)
  }
  if (chunk === 'VP8X') {
    return dims(buf.readUIntLE(24, 3) + 1, buf.readUIntLE(27, 3) + 1)
  }
  return null
}

// EXIF orientations 5-8 rotate the stored pixels a quarter turn (phone portraits).
function exifTurnsQuarter(buf: Buffer, start: number, end: number): boolean {
  if (end - start < 14 || buf.toString('ascii', start, start + 6) !== 'Exif\0\0') return false
  const tiff = start + 6
  const order = buf.toString('ascii', tiff, tiff + 2)
  if (order !== 'II' && order !== 'MM') return false
  const u16 = (at: number): number => (order === 'II' ? buf.readUInt16LE(at) : buf.readUInt16BE(at))
  const u32 = (at: number): number => (order === 'II' ? buf.readUInt32LE(at) : buf.readUInt32BE(at))
  const ifd = tiff + u32(tiff + 4)
  if (ifd + 2 > end) return false
  const count = u16(ifd)
  for (let n = 0; n < count; n++) {
    const entry = ifd + 2 + n * 12
    if (entry + 12 > end) return false
    if (u16(entry) === 0x0112) return u16(entry + 8) >= 5 && u16(entry + 8) <= 8
  }
  return false
}

function jpegDims(buf: Buffer): ImageDims | null {
  let i = 2
  let quarterTurn = false
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) return null
    const marker = buf[i + 1]
    // Fill bytes and standalone markers carry no length.
    if (marker === 0xff) {
      i += 1
      continue
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2
      continue
    }
    const len = buf.readUInt16BE(i + 2)
    // Start-of-frame markers, excluding DHT (c4), JPG (c8) and DAC (cc).
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const width = buf.readUInt16BE(i + 7)
      const height = buf.readUInt16BE(i + 5)
      return quarterTurn ? dims(height, width) : dims(width, height)
    }
    if (len < 2) return null
    if (marker === 0xe1) quarterTurn ||= exifTurnsQuarter(buf, i + 4, Math.min(i + 2 + len, buf.length))
    i += 2 + len
  }
  return null
}

// Never throws: a missing or unreadable file just has unknown dimensions.
export function probeImageDims(absPath: string): ImageDims | null {
  let fd: number | null = null
  try {
    fd = openSync(absPath, 'r')
    const read = (size: number): Buffer => {
      const buf = Buffer.alloc(size)
      return buf.subarray(0, readSync(fd as number, buf, 0, size, 0))
    }
    const head = read(HEAD_BYTES)
    const found = readImageDims(head)
    if (found || head[0] !== 0xff || head[1] !== 0xd8 || head.length < HEAD_BYTES) return found
    return readImageDims(read(JPEG_HEAD_BYTES))
  } catch {
    return null
  } finally {
    if (fd != null) closeSync(fd)
  }
}
