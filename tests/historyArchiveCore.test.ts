import { describe, expect, it } from 'vitest'
import {
  DOWNLOAD_CAPS,
  archiveFolder,
  archiveKindForFile,
  fileNameFromUrl,
  safeFileName,
  titleFromFileName,
  uniqueName
} from '../src/main/history/historyArchiveCore'

describe('History archive file rules', () => {
  it('classifies attachable files by extension and refuses the rest', () => {
    expect(archiveKindForFile('/x/Speech 1979.MP3')).toBe('audio')
    expect(archiveKindForFile('newsreel.mkv')).toBe('video')
    expect(archiveKindForFile('crowd.jpeg')).toBe('image')
    expect(archiveKindForFile('decree.pdf')).toBe('document')
    expect(archiveKindForFile('setup.exe')).toBeNull()
    expect(archiveKindForFile('noext')).toBeNull()
  })

  it('keeps one folder per entity and never escapes it', () => {
    expect(archiveFolder('event:1953-iranian-coup')).toBe('event-1953-iranian-coup')
    expect(archiveFolder('person:my-grandfather')).toBe('person-my-grandfather')
    expect(archiveFolder('../../etc:passwd')).toBe('etc-passwd')
    expect(() => archiveFolder('::')).toThrow()
  })

  it('makes names safe on Windows and Linux and unique in their folder', () => {
    expect(safeFileName('C:\\Users\\me\\Speech: "Day 1"?.MP3')).toBe('Speech Day 1.mp3')
    expect(safeFileName('../..')).toBe('file')
    expect(safeFileName('سخنرانی.ogg')).toBe('سخنرانی.ogg')
    expect(uniqueName(new Set(['a.mp3', 'a (2).mp3']), 'A.mp3')).toBe('A (3).mp3')
    expect(uniqueName(new Set(), 'b.pdf')).toBe('b.pdf')
  })

  it('names downloads from the URL and caps them by kind', () => {
    expect(fileNameFromUrl('https://archive.org/download/x/Tehran%201979.mp4', 'fallback')).toBe('Tehran 1979.mp4')
    expect(fileNameFromUrl('https://example.org/', 'Newsreel')).toBe('Newsreel')
    expect(titleFromFileName('Tehran_1979.mp4')).toBe('Tehran 1979')
    expect(DOWNLOAD_CAPS.image).toBeLessThan(DOWNLOAD_CAPS.video)
  })
})
