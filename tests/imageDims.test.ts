import { describe, expect, it } from 'vitest'
import { readImageDims } from '../src/main/imageDims'

// Header-only dimension reads for the Pictures gallery's justified rows.

function png(width: number, height: number): Buffer {
  const b = Buffer.alloc(33)
  b.writeUInt32BE(0x89504e47, 0)
  b.writeUInt32BE(0x0d0a1a0a, 4)
  b.writeUInt32BE(13, 8)
  b.write('IHDR', 12, 'ascii')
  b.writeUInt32BE(width, 16)
  b.writeUInt32BE(height, 20)
  return b
}

function jpeg(width: number, height: number, exifBytes = 0, orientation = 0): Buffer {
  const app1 = Buffer.alloc(4 + exifBytes)
  app1.writeUInt16BE(0xffe1, 0)
  app1.writeUInt16BE(2 + exifBytes, 2)
  if (orientation) {
    // Exif header, big-endian TIFF, IFD0 with one Orientation entry.
    app1.write('Exif\0\0MM', 4, 'ascii')
    app1.writeUInt16BE(42, 12)
    app1.writeUInt32BE(8, 14)
    app1.writeUInt16BE(1, 18)
    app1.writeUInt16BE(0x0112, 20)
    app1.writeUInt16BE(3, 22)
    app1.writeUInt32BE(1, 24)
    app1.writeUInt16BE(orientation, 28)
  }
  // A DHT segment before the frame must not be read as one (c4 is in range).
  const dht = Buffer.from([0xff, 0xc4, 0x00, 0x04, 0x00, 0x00])
  const sof = Buffer.alloc(19)
  sof.writeUInt16BE(0xffc2, 0) // progressive
  sof.writeUInt16BE(17, 2)
  sof[4] = 8
  sof.writeUInt16BE(height, 5)
  sof.writeUInt16BE(width, 7)
  return Buffer.concat([Buffer.from([0xff, 0xd8]), app1, dht, sof])
}

function webp(chunk: string, body: Buffer): Buffer {
  const head = Buffer.alloc(20)
  head.write('RIFF', 0, 'ascii')
  head.write('WEBP', 8, 'ascii')
  head.write(chunk, 12, 'ascii')
  return Buffer.concat([head, body, Buffer.alloc(16)])
}

describe('readImageDims', () => {
  it('reads PNG, GIF and BMP headers', () => {
    expect(readImageDims(png(1920, 1080))).toEqual({ width: 1920, height: 1080 })
    const gif = Buffer.alloc(16)
    gif.write('GIF89a', 0, 'ascii')
    gif.writeUInt16LE(320, 6)
    gif.writeUInt16LE(240, 8)
    expect(readImageDims(gif)).toEqual({ width: 320, height: 240 })
    const bmp = Buffer.alloc(30)
    bmp.write('BM', 0, 'ascii')
    bmp.writeInt32LE(640, 18)
    bmp.writeInt32LE(-480, 22) // top-down
    expect(readImageDims(bmp)).toEqual({ width: 640, height: 480 })
  })

  it('walks JPEG segments past EXIF and DHT to the frame header', () => {
    expect(readImageDims(jpeg(3000, 4000, 5000))).toEqual({ width: 3000, height: 4000 })
    // Frame beyond the bytes read: unknown, so the caller can retry larger.
    expect(readImageDims(jpeg(3000, 4000, 5000).subarray(0, 2000))).toBeNull()
  })

  it('swaps JPEG sides for EXIF quarter-turn orientations', () => {
    expect(readImageDims(jpeg(4000, 3000, 64, 6))).toEqual({ width: 3000, height: 4000 })
    expect(readImageDims(jpeg(4000, 3000, 64, 3))).toEqual({ width: 4000, height: 3000 })
  })

  it('reads the three WebP flavours', () => {
    const lossy = Buffer.alloc(10)
    lossy.writeUInt16LE(1280, 6)
    lossy.writeUInt16LE(720, 8)
    expect(readImageDims(webp('VP8 ', lossy))).toEqual({ width: 1280, height: 720 })

    const lossless = Buffer.alloc(5)
    lossless[0] = 0x2f
    lossless.writeUInt32LE((800 - 1) | ((600 - 1) << 14), 1)
    expect(readImageDims(webp('VP8L', lossless))).toEqual({ width: 800, height: 600 })

    const extended = Buffer.alloc(10)
    extended.writeUIntLE(2560 - 1, 4, 3)
    extended.writeUIntLE(1440 - 1, 7, 3)
    expect(readImageDims(webp('VP8X', extended))).toEqual({ width: 2560, height: 1440 })
  })

  it('returns null for anything else', () => {
    expect(readImageDims(Buffer.from('not an image at all'))).toBeNull()
    expect(readImageDims(Buffer.alloc(4))).toBeNull()
    expect(readImageDims(png(0, 100))).toBeNull()
  })
})
