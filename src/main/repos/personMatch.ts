// One seiyuu, one person row, whichever source met them first. AniList, VNDB
// and Bangumi number their people independently, so the only shared key is
// the name: the kanji name with spaces removed, then the romaji name.
//
// Kanji full-name homonyms among voice actors are rare; romanization variants
// (Yūki / Yuuki / Yuki, family-first vs given-first) are common. So a romaji
// comparison can only ever VETO a kanji match, and only when both sides have a
// romaji name that still disagrees after folding those variants.

type Db = { prepare: (sql: string) => any }

export const stripSpaces = (s: string | null | undefined): string =>
  (s ?? '').replace(/[\s　]/g, '')

// Order-free, long-vowel-free romaji key: "Fukuyama Jun" = "Jun Fukuyama",
// "Yūki Kaji" = "Kaji Yuuki" = "Kaji Yuki". Repeated tokens count once (a
// name listed with two spellings). Empty when the name has no Latin.
export function romajiKey(name: string | null | undefined): string {
  if (!name) return ''
  const tokens = name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((t) =>
      t
        .replace(/oh(?=[^aeiou]|$)/g, 'o')
        .replace(/ou/g, 'o')
        .replace(/oo/g, 'o')
        .replace(/uu/g, 'u')
        .replace(/aa/g, 'a')
        .replace(/ii/g, 'i')
        .replace(/ee/g, 'e')
    )
  return [...new Set(tokens)].sort().join(' ')
}

// True unless both names are romanized and still disagree.
export function romajiAgrees(a: string | null | undefined, b: string | null | undefined): boolean {
  const ka = romajiKey(a)
  const kb = romajiKey(b)
  return !ka || !kb || ka === kb
}

export interface SharedPersonInput {
  source: string
  externalId: string
  name: string | null // romaji / display name
  nameNative: string | null // kanji
  photoPath?: string | null
}

interface Candidate {
  id: number
  name: string | null
}

function firstAgreeing(rows: Candidate[], romaji: string | null): number | null {
  for (const r of rows) if (romajiAgrees(r.name, romaji)) return r.id
  return null
}

// Reuse an existing person instead of creating a duplicate:
//   1. same source id already imported            -> reuse
//   2. space-normalized kanji (name_native) match  -> reuse, AniList rows first
//   3. exact romaji name, unless both rows know     -> reuse, AniList rows first
//      different kanji
//   4. otherwise                                   -> create a person for `source`
// A reused row keeps its own external_source and simply gains credits. People
// are never pruned, so this stays safe across re-imports.
export function upsertSharedPerson(db: Db, p: SharedPersonInput): number {
  const byId = db
    .prepare('SELECT id FROM person WHERE external_source=? AND external_id=?')
    .get(p.source, p.externalId) as { id: number } | undefined
  if (byId) {
    if (p.photoPath) {
      db.prepare('UPDATE person SET photo_path=COALESCE(photo_path, ?) WHERE id=?').run(p.photoPath, byId.id)
    }
    return byId.id
  }

  const kanji = stripSpaces(p.nameNative)
  if (kanji) {
    const rows = db
      .prepare(
        `SELECT id, name FROM person
         WHERE REPLACE(REPLACE(name_native, ' ', ''), char(12288), '') = ?
         ORDER BY (external_source = 'anilist') DESC, id ASC`
      )
      .all(kanji) as Candidate[]
    const hit = firstAgreeing(rows, p.name)
    if (hit != null) return fill(db, hit, p.photoPath)
  }

  if (p.name) {
    // Romaji alone never overrides kanji: when both sides know their native
    // name, a different one is a different person (斎藤 vs 斉藤).
    const byName = db
      .prepare(
        `SELECT id FROM person WHERE name = ? COLLATE NOCASE
           AND (? IS NULL OR COALESCE(REPLACE(REPLACE(name_native, ' ', ''), char(12288), ''), '') = '')
         ORDER BY (external_source = 'anilist') DESC, id ASC LIMIT 1`
      )
      .get(p.name, kanji || null) as { id: number } | undefined
    if (byName) return fill(db, byName.id, p.photoPath)
  }

  const info = db
    .prepare(
      'INSERT INTO person (name, name_native, photo_path, external_source, external_id) VALUES (?, ?, ?, ?, ?)'
    )
    .run(p.name || p.nameNative || 'Unknown', p.nameNative ?? null, p.photoPath ?? null, p.source, p.externalId)
  return Number(info.lastInsertRowid)
}

function fill(db: Db, id: number, photo: string | null | undefined): number {
  if (photo) db.prepare('UPDATE person SET photo_path=COALESCE(photo_path, ?) WHERE id=?').run(photo, id)
  return id
}

// Sources whose people AniList may take over (see adoptForAniList).
const ADOPTABLE_SOURCES = ['vndb', 'bangumi']

// When AniList meets a seiyuu that a VN or game import created first, it takes
// over that row instead of inserting a second person: the row becomes the
// AniList person (source + id), keeping its credits. Kanji must match and the
// romaji must not disagree. Returns the adopted row id, or null.
export function adoptForAniList(
  db: Db,
  anilistId: string,
  name: string | null,
  nameNative: string | null
): number | null {
  const kanji = stripSpaces(nameNative)
  if (!kanji) return null
  const rows = db
    .prepare(
      `SELECT id, name FROM person
       WHERE external_source IN (${ADOPTABLE_SOURCES.map(() => '?').join(', ')})
         AND REPLACE(REPLACE(name_native, ' ', ''), char(12288), '') = ?
       ORDER BY id ASC`
    )
    .all(...ADOPTABLE_SOURCES, kanji) as Candidate[]
  const id = firstAgreeing(rows, name)
  if (id == null) return null
  db.prepare("UPDATE person SET external_source='anilist', external_id=? WHERE id=?").run(anilistId, id)
  return id
}
