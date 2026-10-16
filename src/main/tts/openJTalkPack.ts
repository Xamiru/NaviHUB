import { createHash } from 'crypto'
import { createReadStream, existsSync } from 'fs'
import { mkdir, rename, rm } from 'fs/promises'
import { join } from 'path'
import {
  currentImportSignal,
  downloadToTemp,
  runImport,
  setImportPhase,
  setImportTitle
} from '../dict/importer'
import { extractTarGz } from './tarExtract'
import { packSubdir, TTS_ARCHIVES, TTS_MAX_UNPACKED_BYTES, type TtsArchive } from './ttsCore'

// The voice pack: the Open JTalk dictionary and one HTS voice, downloaded once
// at setup (the only network use) into <userData>/openjtalk/{dic,voice}.
// Each archive is capped at its own size while downloading, checked against
// its pinned SHA-256 before a byte is extracted, extracted to a staging folder
// with only whitelisted names, and swapped in with the old folder moved aside
// first, so a failed or cancelled install never leaves a half pack or no pack.
// Runs through the dictionary import gate: one task row, cancel, one at a time.

async function sha256(file: string): Promise<string> {
  const hash = createHash('sha256')
  for await (const chunk of createReadStream(file)) hash.update(chunk as Buffer)
  return hash.digest('hex')
}

export async function installArchive(
  packDir: string,
  archive: TtsArchive,
  file: string,
  signal?: AbortSignal
): Promise<void> {
  const got = await sha256(file)
  if (got !== archive.sha256) throw new Error(`${archive.key} download does not match its pinned checksum`)
  const staging = join(packDir, `.staging-${archive.key}`)
  const aside = join(packDir, `.previous-${archive.key}`)
  const final = join(packDir, packSubdir(archive.key))
  await rm(staging, { recursive: true, force: true })
  await mkdir(staging, { recursive: true })
  try {
    const written = await extractTarGz(file, staging, archive, TTS_MAX_UNPACKED_BYTES[archive.key], signal)
    const missing = archive.files.filter((f) => !written.includes(f))
    if (missing.length) throw new Error(`${archive.key} archive is missing ${missing.join(', ')}`)
    // Old pack aside, new pack in, old pack gone — a failed second rename puts
    // the old one back, so the user is never left with neither.
    await rm(aside, { recursive: true, force: true })
    if (existsSync(final)) await rename(final, aside)
    try {
      await rename(staging, final)
    } catch (err) {
      if (existsSync(aside) && !existsSync(final)) await rename(aside, final)
      throw err
    }
    await rm(aside, { recursive: true, force: true })
  } finally {
    await rm(staging, { recursive: true, force: true })
  }
}

export function installVoicePack(packDir: string): Promise<void> {
  return runImport(async () => {
    setImportTitle('Japanese voice (Open JTalk)')
    await mkdir(packDir, { recursive: true })
    for (const archive of TTS_ARCHIVES) {
      const tmp = await downloadToTemp(archive.url, 'tar.gz', archive.maxBytes)
      try {
        setImportPhase('audio')
        await installArchive(packDir, archive, tmp, currentImportSignal())
      } finally {
        await rm(tmp, { force: true })
      }
    }
  })
}

export async function removeVoicePack(packDir: string, cacheDir: string): Promise<void> {
  await rm(packDir, { recursive: true, force: true })
  await rm(cacheDir, { recursive: true, force: true })
}
