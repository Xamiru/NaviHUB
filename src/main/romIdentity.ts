import type { PlatformKey } from '@shared/emulation/platforms'

// What a game file says about itself, read from a few header bytes with no
// decryption keys: the 6-character GameCube/Wii id, the PS1/PS2 disc serial
// from SYSTEM.CNF, or a Switch title id from an NSP's ticket name. Mods and
// texture packs are filed under these codes. Pure over an injected reader so
// tests feed synthetic images; any malformed input returns null, never throws.

export interface ByteSource {
  size: number
  read(offset: number, length: number): Promise<Buffer>
}

// Opens another file by path (a CUE sheet's BIN); null when it cannot.
export type OpenSource = (path: string) => Promise<ByteSource | null>

export interface RomIdentity {
  code: string
  platform: PlatformKey | null // null when the header does not pin it down
}

const GC_MAGIC = 0xc2339f3d
const WII_MAGIC = 0x5d1c9ea3

async function readSafe(src: ByteSource, offset: number, length: number): Promise<Buffer | null> {
  if (offset < 0 || length <= 0 || offset + length > src.size) return null
  try {
    const buf = await src.read(offset, length)
    return buf.length === length ? buf : null
  } catch {
    return null
  }
}

// ---- GameCube / Wii ----

// A plain disc header: the id is bytes 0-5, the console comes from the magic
// words at 0x18 (Wii) and 0x1C (GameCube).
export function discHeaderId(header: Buffer): RomIdentity | null {
  if (header.length < 0x20) return null
  const wii = header.readUInt32BE(0x18) === WII_MAGIC
  const gc = header.readUInt32BE(0x1c) === GC_MAGIC
  if (!wii && !gc) return null
  const code = header.subarray(0, 6).toString('latin1')
  if (!/^[A-Z0-9]{6}$/.test(code)) return null
  return { code, platform: wii ? 'wii' : 'gc' }
}

// Where each Dolphin container keeps a copy of the disc header.
async function nintendoDiscHeader(src: ByteSource): Promise<Buffer | null> {
  const magic = await readSafe(src, 0, 4)
  if (!magic) return null
  const tag = magic.toString('latin1')
  // WIA/RVZ: a 0x48-byte header 1, then header 2 whose disc header copy
  // starts 0x10 bytes in.
  if (tag === 'WIA\x01' || tag === 'RVZ\x01') return readSafe(src, 0x58, 0x80)
  // WBFS: the disc header is stored at the start of the second 512-byte sector.
  if (tag === 'WBFS') return readSafe(src, 0x200, 0x80)
  // CISO: a 0x8000-byte block map, then the disc.
  if (tag === 'CISO') return readSafe(src, 0x8000, 0x80)
  return readSafe(src, 0, 0x80)
}

export async function nintendoDiscId(src: ByteSource): Promise<RomIdentity | null> {
  const header = await nintendoDiscHeader(src)
  return header ? discHeaderId(header) : null
}

// ---- PlayStation 1 / 2 (ISO9660 SYSTEM.CNF) ----

interface SectorLayout {
  sectorSize: number
  dataOffset: number
}

// A cooked ISO stores 2048-byte sectors. A raw BIN stores 2352-byte sectors
// that start with a 12-byte sync pattern; mode 1 data starts at 16, mode 2
// form 1 (every PlayStation disc) at 24.
async function sectorLayout(src: ByteSource): Promise<SectorLayout | null> {
  const head = await readSafe(src, 0, 16)
  if (!head) return null
  const sync = head.subarray(0, 12)
  const isRaw =
    sync[0] === 0 && sync[11] === 0 && sync.subarray(1, 11).every((byte) => byte === 0xff)
  if (!isRaw) return { sectorSize: 2048, dataOffset: 0 }
  return { sectorSize: 2352, dataOffset: head[15] === 1 ? 16 : 24 }
}

async function readSector(src: ByteSource, layout: SectorLayout, lba: number): Promise<Buffer | null> {
  return readSafe(src, lba * layout.sectorSize + layout.dataOffset, 2048)
}

const MAX_CNF_BYTES = 4096
const MAX_ROOT_SECTORS = 16

async function readSystemCnf(src: ByteSource): Promise<string | null> {
  const layout = await sectorLayout(src)
  if (!layout) return null
  const pvd = await readSector(src, layout, 16)
  if (!pvd || pvd[0] !== 1 || pvd.subarray(1, 6).toString('latin1') !== 'CD001') return null
  // The root directory record sits at byte 156 of the primary volume descriptor.
  const rootLba = pvd.readUInt32LE(156 + 2)
  const rootSize = pvd.readUInt32LE(156 + 10)
  const sectors = Math.min(MAX_ROOT_SECTORS, Math.ceil(rootSize / 2048))
  for (let s = 0; s < sectors; s++) {
    const dir = await readSector(src, layout, rootLba + s)
    if (!dir) return null
    let pos = 0
    while (pos < 2048) {
      const len = dir[pos]
      if (!len) break
      if (pos + 33 > 2048) break
      const nameLen = dir[pos + 32]
      const name = dir.subarray(pos + 33, pos + 33 + nameLen).toString('latin1')
      if (name.toUpperCase().replace(/;1$/, '') === 'SYSTEM.CNF') {
        const lba = dir.readUInt32LE(pos + 2)
        const size = Math.min(MAX_CNF_BYTES, dir.readUInt32LE(pos + 10))
        const parts: Buffer[] = []
        for (let read = 0, sector = lba; read < size; read += 2048, sector++) {
          const chunk = await readSector(src, layout, sector)
          if (!chunk) return null
          parts.push(chunk)
        }
        return Buffer.concat(parts).subarray(0, size).toString('latin1')
      }
      pos += len
    }
  }
  return null
}

// "BOOT2 = cdrom0:\SLUS_203.12;1" → { code: 'SLUS-20312', platform: 'ps2' }.
// PS1 discs carry "BOOT = cdrom:\SCUS_944.26;1" instead.
export function serialFromSystemCnf(text: string): RomIdentity | null {
  const boot2 = /^\s*BOOT2\s*=\s*(.+)$/im.exec(text)
  const boot = boot2 ?? /^\s*BOOT\s*=\s*(.+)$/im.exec(text)
  if (!boot) return null
  const file = boot[1].trim().split(/[\\/:]/).pop()?.replace(/;\d+$/, '') ?? ''
  const m = /^([A-Z]{4})[_-](\d{3})\.?(\d{2})/i.exec(file)
  if (!m) return null
  return { code: `${m[1].toUpperCase()}-${m[2]}${m[3]}`, platform: boot2 ? 'ps2' : 'ps1' }
}

export async function playstationSerial(src: ByteSource): Promise<RomIdentity | null> {
  const cnf = await readSystemCnf(src)
  return cnf ? serialFromSystemCnf(cnf) : null
}

// The first track file a CUE sheet names, resolved beside the sheet.
export function firstCueTrack(cueText: string): string | null {
  const m = /^\s*FILE\s+"([^"]+)"/im.exec(cueText) ?? /^\s*FILE\s+(\S+)/im.exec(cueText)
  return m ? m[1] : null
}

// ---- Switch ----

// An NSP is a PFS0 archive. When it carries a ticket, the ticket's file name
// is the rights id, whose first 16 hex digits are the title id.
export async function nspTitleId(src: ByteSource): Promise<string | null> {
  const head = await readSafe(src, 0, 0x10)
  if (!head || head.subarray(0, 4).toString('latin1') !== 'PFS0') return null
  const count = head.readUInt32LE(4)
  const stringSize = head.readUInt32LE(8)
  if (count === 0 || count > 4096 || stringSize > 0x10000) return null
  const entries = await readSafe(src, 0x10, count * 0x18)
  const strings = await readSafe(src, 0x10 + count * 0x18, stringSize)
  if (!entries || !strings) return null
  for (let i = 0; i < count; i++) {
    const nameOffset = entries.readUInt32LE(i * 0x18 + 16)
    if (nameOffset >= strings.length) continue
    const end = strings.indexOf(0, nameOffset)
    const name = strings.subarray(nameOffset, end < 0 ? strings.length : end).toString('latin1')
    const m = /^([0-9a-f]{16})[0-9a-f]{16}\.tik$/i.exec(name)
    if (m) return m[1].toUpperCase()
  }
  return null
}

// "Zelda TotK [0100F2C0115B6000][v0].nsp" → 0100F2C0115B6000. Release names
// carry the id often enough to be worth reading before asking.
export function titleIdFromFileName(path: string): string | null {
  const base = path.split(/[\\/]/).pop() ?? ''
  const m = /[[(]([0-9a-f]{16})[\])]/i.exec(base)
  return m ? m[1].toUpperCase() : null
}

// ---- dispatch ----

export async function identifyRom(
  path: string,
  ext: string,
  src: ByteSource,
  open: OpenSource
): Promise<RomIdentity | null> {
  try {
    switch (ext) {
      case 'iso':
      case 'gcm':
      case 'rvz':
      case 'wia':
      case 'wbfs':
      case 'ciso': {
        const nintendo = await nintendoDiscId(src)
        if (nintendo || ext !== 'iso') return nintendo
        return await playstationSerial(src)
      }
      case 'bin':
      case 'img':
        return await playstationSerial(src)
      case 'cue': {
        const head = await readSafe(src, 0, Math.min(src.size, 16384))
        const track = head ? firstCueTrack(head.toString('latin1')) : null
        if (!track) return null
        const sep = path.includes('\\') ? '\\' : '/'
        const dir = path.slice(0, path.lastIndexOf(sep) + 1)
        const bin = await open(/^([a-z]:)?[\\/]/i.test(track) ? track : dir + track)
        return bin ? await playstationSerial(bin) : null
      }
      case 'nsp':
      case 'nsz': {
        const id = (await nspTitleId(src)) ?? titleIdFromFileName(path)
        return id ? { code: id, platform: 'switch' } : null
      }
      case 'xci':
      case 'xcz': {
        const id = titleIdFromFileName(path)
        return id ? { code: id, platform: 'switch' } : null
      }
      default:
        return null
    }
  } catch {
    return null
  }
}
