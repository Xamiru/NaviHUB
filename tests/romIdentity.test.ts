import { describe, expect, it } from 'vitest'
import {
  discHeaderId,
  firstCueTrack,
  identifyRom,
  nspTitleId,
  serialFromSystemCnf,
  titleIdFromFileName,
  type ByteSource
} from '../src/main/romIdentity'

// Synthetic images: only the bytes the reader looks at are filled in.

function source(buf: Buffer): ByteSource {
  return { size: buf.length, read: async (o, l) => buf.subarray(o, o + l) }
}

const noOpen = async (): Promise<ByteSource | null> => null

function gcHeader(id: string, wii = false): Buffer {
  const h = Buffer.alloc(0x80)
  h.write(id, 0, 'latin1')
  if (wii) h.writeUInt32BE(0x5d1c9ea3, 0x18)
  else h.writeUInt32BE(0xc2339f3d, 0x1c)
  return h
}

// A 2048-byte-sector ISO9660 image whose root holds one SYSTEM.CNF.
function isoWithCnf(cnf: string, raw?: 'mode2'): Buffer {
  const sectors = 24
  const cooked = Buffer.alloc(sectors * 2048)
  const pvd = 16 * 2048
  cooked[pvd] = 1
  cooked.write('CD001', pvd + 1, 'latin1')
  const rootLba = 20
  cooked.writeUInt32LE(rootLba, pvd + 156 + 2)
  cooked.writeUInt32LE(2048, pvd + 156 + 10)
  const dir = rootLba * 2048
  const name = 'SYSTEM.CNF;1'
  const recLen = 33 + name.length + 1
  cooked[dir] = recLen
  cooked.writeUInt32LE(22, dir + 2)
  cooked.writeUInt32LE(cnf.length, dir + 10)
  cooked[dir + 32] = name.length
  cooked.write(name, dir + 33, 'latin1')
  cooked.write(cnf, 22 * 2048, 'latin1')
  if (!raw) return cooked
  // Mode 2 form 1 raw sectors: 12-byte sync, 4-byte header, 8-byte subheader.
  const out = Buffer.alloc(sectors * 2352)
  for (let s = 0; s < sectors; s++) {
    const base = s * 2352
    out[base] = 0
    out.fill(0xff, base + 1, base + 11)
    out[base + 11] = 0
    out[base + 15] = 2
    cooked.copy(out, base + 24, s * 2048, (s + 1) * 2048)
  }
  return out
}

describe('GameCube / Wii', () => {
  it('reads the id and console from a plain disc header', () => {
    expect(discHeaderId(gcHeader('GZ2E01'))).toEqual({ code: 'GZ2E01', platform: 'gc' })
    expect(discHeaderId(gcHeader('RZDE01', true))).toEqual({ code: 'RZDE01', platform: 'wii' })
    expect(discHeaderId(Buffer.alloc(0x80))).toBeNull()
  })

  it('finds the header inside RVZ, WBFS and CISO containers', async () => {
    const rvz = Buffer.alloc(0x200)
    rvz.write('RVZ\x01', 0, 'latin1')
    gcHeader('GZLE01').copy(rvz, 0x58)
    expect(await identifyRom('C:\\g\\ww.rvz', 'rvz', source(rvz), noOpen)).toEqual({
      code: 'GZLE01',
      platform: 'gc'
    })

    const wbfs = Buffer.alloc(0x400)
    wbfs.write('WBFS', 0, 'latin1')
    gcHeader('SOUE01', true).copy(wbfs, 0x200)
    expect(await identifyRom('C:\\g\\ss.wbfs', 'wbfs', source(wbfs), noOpen)).toEqual({
      code: 'SOUE01',
      platform: 'wii'
    })

    const ciso = Buffer.alloc(0x8100)
    ciso.write('CISO', 0, 'latin1')
    gcHeader('G4SE01').copy(ciso, 0x8000)
    expect((await identifyRom('C:\\g\\fsa.ciso', 'ciso', source(ciso), noOpen))?.code).toBe('G4SE01')
  })

  it('never throws on a truncated file', async () => {
    expect(await identifyRom('C:\\g\\x.rvz', 'rvz', source(Buffer.from('RVZ\x01')), noOpen)).toBeNull()
    expect(await identifyRom('C:\\g\\x.iso', 'iso', source(Buffer.alloc(10)), noOpen)).toBeNull()
  })
})

describe('PlayStation', () => {
  it('turns BOOT2 into the PCSX2 serial and BOOT into a PS1 serial', () => {
    expect(serialFromSystemCnf('BOOT2 = cdrom0:\\SCUS_972.03;1\r\nVER = 1.00')).toEqual({
      code: 'SCUS-97203',
      platform: 'ps2'
    })
    expect(serialFromSystemCnf('BOOT = cdrom:\\SLUS_007.07;1\nTCB = 4')).toEqual({
      code: 'SLUS-00707',
      platform: 'ps1'
    })
    expect(serialFromSystemCnf('VMODE = NTSC')).toBeNull()
  })

  it('reads SYSTEM.CNF from a cooked ISO', async () => {
    const iso = isoWithCnf('BOOT2 = cdrom0:\\SLUS_203.12;1\n')
    expect(await identifyRom('C:\\g\\gt.iso', 'iso', source(iso), noOpen)).toEqual({
      code: 'SLUS-20312',
      platform: 'ps2'
    })
  })

  it('reads SYSTEM.CNF from a raw mode-2 BIN through its CUE sheet', async () => {
    const bin = isoWithCnf('BOOT = cdrom:\\SCUS_944.26;1\n', 'mode2')
    const cue = Buffer.from('FILE "Spyro (USA).bin" BINARY\n  TRACK 01 MODE2/2352\n')
    const opened: string[] = []
    const result = await identifyRom('C:\\PS1\\Spyro (USA).cue', 'cue', source(cue), async (p) => {
      opened.push(p)
      return source(bin)
    })
    expect(opened).toEqual(['C:\\PS1\\Spyro (USA).bin'])
    expect(result).toEqual({ code: 'SCUS-94426', platform: 'ps1' })
    expect(firstCueTrack('FILE track.bin BINARY')).toBe('track.bin')
  })
})

describe('Switch', () => {
  function nsp(names: string[]): Buffer {
    const table = Buffer.from(names.map((n) => n + '\0').join(''), 'latin1')
    const head = Buffer.alloc(0x10 + names.length * 0x18)
    head.write('PFS0', 0, 'latin1')
    head.writeUInt32LE(names.length, 4)
    head.writeUInt32LE(table.length, 8)
    let offset = 0
    names.forEach((n, i) => {
      head.writeUInt32LE(offset, 0x10 + i * 0x18 + 16)
      offset += n.length + 1
    })
    return Buffer.concat([head, table])
  }

  it('reads the title id from the ticket name', async () => {
    const buf = nsp(['a1b2c3.nca', '0100f2c0115b60000000000000000005.tik', 'x.cert'])
    expect(await nspTitleId(source(buf))).toBe('0100F2C0115B6000')
  })

  it('falls back to the id in the file name, and gives up quietly', async () => {
    const buf = nsp(['a1b2c3.nca'])
    expect(await identifyRom('C:\\sw\\Zelda [0100F2C0115B6000][v0].nsp', 'nsp', source(buf), noOpen)).toEqual({
      code: '0100F2C0115B6000',
      platform: 'switch'
    })
    expect(await identifyRom('C:\\sw\\Zelda.xci', 'xci', source(buf), noOpen)).toBeNull()
    expect(titleIdFromFileName('Mario (0100000000010000).xci')).toBe('0100000000010000')
  })
})
