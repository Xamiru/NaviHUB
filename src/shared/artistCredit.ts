// Splits a multi-artist credit ("A, B feat. C") into names that can each link
// to their own library artist. A name containing a separator ("Simon &
// Garfunkel", "AC/DC") still matches as one artist: the longest run of
// consecutive pieces that names a known artist wins.

export interface CreditPart {
  text: string
  artistId: number | null
}

// Captured so the separators keep their original spelling between the links.
const SEPARATOR = /(\s*(?:[,&/;+、×]|\b(?:feat|ft|vs)\b\.?|\b(?:featuring|with|and|x)\b)\s*)/i

export function artistKey(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

export function linkArtistCredit(
  credit: string,
  lookup: (key: string) => number | undefined
): CreditPart[] {
  // Odd indexes are separators, even indexes names (possibly empty).
  const pieces = credit.split(SEPARATOR)
  const parts: CreditPart[] = []
  const pushText = (text: string): void => {
    if (!text) return
    const last = parts[parts.length - 1]
    if (last && last.artistId == null) last.text += text
    else parts.push({ text, artistId: null })
  }
  let i = 0
  while (i < pieces.length) {
    if (i % 2 === 1 || !pieces[i].trim()) {
      pushText(pieces[i])
      i++
      continue
    }
    let matched = false
    for (let end = pieces.length - 1; end >= i; end -= 2) {
      if (!pieces[end].trim()) continue
      const text = pieces.slice(i, end + 1).join('')
      const id = lookup(artistKey(text))
      if (id != null) {
        parts.push({ text, artistId: id })
        i = end + 1
        matched = true
        break
      }
    }
    if (!matched) {
      pushText(pieces[i])
      i++
    }
  }
  return parts
}
