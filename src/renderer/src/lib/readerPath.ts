import type { MangaChapter } from '@shared/types'

// A manga_chapter row is either an image chapter (folder/CBZ → MangaReaderPage)
// or an EPUB book (→ BookReaderPage). The dir_path suffix is the discriminator;
// every place that navigates into a chapter routes through here so prev/next
// navigation can cross freely between image volumes and novel volumes.
export function isBookChapter(ch: Pick<MangaChapter, 'dirPath'>): boolean {
  return ch.dirPath.toLowerCase().endsWith('.epub')
}

export function readerPath(mediaId: number, ch: Pick<MangaChapter, 'id' | 'dirPath'>): string {
  return isBookChapter(ch) ? `/manga/${mediaId}/book/${ch.id}` : `/manga/${mediaId}/read/${ch.id}`
}
