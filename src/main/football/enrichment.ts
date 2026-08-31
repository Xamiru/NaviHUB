import { getSqlite } from '../db/connection'
import { downloadImage } from '../files'
import { fetchWithRetry } from '../http'
import { normalizeFootballName } from '@shared/football'

interface PageCandidate {
  pageid: number
  title: string
  extract: string
  fullurl: string
  pageimage?: string
  pageprops?: { wikibase_item?: string }
  revisions?: Array<{ revid?: number }>
}

interface CareerSpell {
  teamQid: string
  teamName: string
  startDate: string | null
  endDate: string | null
}

export interface EnrichmentPayload {
  qid: string | null
  title: string
  body: string
  sourceUrl: string
  revision: string | null
  imagePath: string | null
  imageLicense: string | null
  birthDate: string | null
  foundedYear: number | null
  career: CareerSpell[]
}

async function json(url: string, signal: AbortSignal): Promise<any> {
  const response = await fetchWithRetry(url, {
    headers: { 'User-Agent': 'NaviHUB/FootballArchive (personal local archive)' },
    timeoutMs: 45_000,
    taskSignal: signal
  })
  if (!response.ok) throw new Error(`Wikimedia returned HTTP ${response.status}`)
  return response.json()
}

function exactCandidates(name: string, pages: PageCandidate[]): PageCandidate[] {
  const expected = normalizeFootballName(name)
  return pages.filter((page) => {
    const title = page.title.replace(/\s*\([^)]*\)\s*$/, '')
    return normalizeFootballName(title) === expected
  })
}

async function commonsImage(file: string | undefined, signal: AbortSignal): Promise<{
  path: string | null
  license: string | null
}> {
  if (!file) return { path: null, license: null }
  const params = new URLSearchParams({
    action: 'query',
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
    format: 'json',
    formatversion: '2',
    titles: `File:${file}`
  })
  const payload = await json(`https://commons.wikimedia.org/w/api.php?${params}`, signal)
  const info = payload.query?.pages?.[0]?.imageinfo?.[0]
  const license = String(info?.extmetadata?.LicenseShortName?.value ?? '').trim()
  const allowed = /^(?:CC|Public domain|PD)/i.test(license)
  if (!allowed || !info?.url) return { path: null, license: license || null }
  return { path: await downloadImage(String(info.url)), license }
}

async function careerForQid(qid: string, signal: AbortSignal): Promise<CareerSpell[]> {
  if (!/^Q\d+$/.test(qid)) return []
  const query = `SELECT ?team ?teamLabel ?start ?end WHERE {
    wd:${qid} p:P54 ?membership .
    ?membership ps:P54 ?team .
    OPTIONAL { ?membership pq:P580 ?start . }
    OPTIONAL { ?membership pq:P582 ?end . }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  } ORDER BY ?start ?end ?teamLabel`
  const payload = await json(
    `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(query)}`,
    signal
  )
  return (payload.results?.bindings ?? []).flatMap((row: any) => {
    const teamQid = String(row.team?.value ?? '').match(/Q\d+$/)?.[0]
    const teamName = String(row.teamLabel?.value ?? '').trim()
    if (!teamQid || !teamName) return []
    return [{
      teamQid,
      teamName,
      startDate: row.start?.value ? String(row.start.value).slice(0, 10) : null,
      endDate: row.end?.value ? String(row.end.value).slice(0, 10) : null
    }]
  })
}

async function entityFacts(qid: string | null, signal: AbortSignal): Promise<{
  birthDate: string | null
  foundedYear: number | null
}> {
  if (!qid) return { birthDate: null, foundedYear: null }
  const params = new URLSearchParams({
    action: 'wbgetentities',
    ids: qid,
    props: 'claims',
    format: 'json'
  })
  const entity = (await json(`https://www.wikidata.org/w/api.php?${params}`, signal)).entities?.[qid]
  const time = (property: string): string | null => {
    const value = entity?.claims?.[property]?.[0]?.mainsnak?.datavalue?.value?.time
    return typeof value === 'string' ? value.replace(/^\+/, '').slice(0, 10) : null
  }
  const founded = time('P571')
  return { birthDate: time('P569'), foundedYear: founded ? Number(founded.slice(0, 4)) : null }
}

export async function fetchEntityEnrichment(
  kind: 'team' | 'person',
  name: string,
  signal: AbortSignal,
  includeCareer: boolean,
  personRole: 'player' | 'manager' | 'both' = 'player'
): Promise<EnrichmentPayload> {
  const entityQualifier = kind === 'team'
    ? 'football club'
    : personRole === 'manager'
      ? 'football manager'
      : 'footballer'
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: `intitle:"${name.replace(/["\\]/g, ' ')}" ${entityQualifier}`,
    gsrnamespace: '0',
    gsrlimit: '8',
    prop: 'extracts|info|pageprops|pageimages|revisions',
    explaintext: '1',
    exintro: '1',
    inprop: 'url',
    piprop: 'name',
    rvprop: 'ids',
    format: 'json',
    formatversion: '2'
  })
  const pages = (await json(`https://en.wikipedia.org/w/api.php?${params}`, signal)).query?.pages ?? []
  const exact = exactCandidates(name, pages)
  if (exact.length !== 1) throw new Error(`Wikimedia identity is ambiguous for ${name}`)
  const page = exact[0]
  const qid = page.pageprops?.wikibase_item ?? null
  const [image, facts, career] = await Promise.all([
    commonsImage(page.pageimage, signal),
    entityFacts(qid, signal),
    includeCareer && qid ? careerForQid(qid, signal) : Promise.resolve([])
  ])
  return {
    qid,
    title: page.title,
    body: String(page.extract ?? '').trim(),
    sourceUrl: page.fullurl,
    revision: page.revisions?.[0]?.revid == null ? null : String(page.revisions[0].revid),
    imagePath: image.path,
    imageLicense: image.license,
    birthDate: facts.birthDate,
    foundedYear: facts.foundedYear,
    career
  }
}

function teamForQid(qid: string, name: string): number {
  const db = getSqlite()
  const existing = db.prepare(`
    SELECT entity_id FROM football_source_ref
    WHERE entity_kind='team' AND source='wikidata' AND external_id=?
  `).get(qid) as { entity_id: number } | undefined
  if (existing) return existing.entity_id
  const normalized = normalizeFootballName(name)
  const candidates = db.prepare(`
    SELECT DISTINCT entity_id AS id FROM football_alias WHERE entity_kind='team' AND normalized=?
  `).all(normalized) as { id: number }[]
  const id = candidates.length === 1
    ? candidates[0].id
    : Number(db.prepare(`INSERT INTO football_team (name) VALUES (?)`).run(name).lastInsertRowid)
  db.prepare(`INSERT OR IGNORE INTO football_alias
    (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('team',?,'wikidata',?,?,?)`).run(id, name, normalized, qid)
  db.prepare(`INSERT INTO football_source_ref
    (entity_kind,entity_id,source,external_id,fetched_at)
    VALUES ('team',?,'wikidata',?,datetime('now'))`).run(id, qid)
  return id
}

export function saveEntityEnrichment(
  kind: 'team' | 'person',
  entityId: number,
  payload: EnrichmentPayload,
  quizPack: boolean
): boolean {
  const db = getSqlite()
  return db.transaction(() => {
    const existingQid = payload.qid
      ? db.prepare(`
          SELECT entity_id FROM football_source_ref
          WHERE entity_kind=? AND source='wikidata' AND external_id=?
        `).get(kind, payload.qid) as { entity_id: number } | undefined
      : undefined
    const identityConflict = existingQid != null && existingQid.entity_id !== entityId
    if (identityConflict) {
      const alreadyOpen = db.prepare(`
        SELECT 1 FROM football_conflict WHERE entity_kind=? AND entity_id=?
          AND facet='identity' AND source_b='wikidata' AND value_b=? AND status='open'
      `).get(kind, entityId, payload.qid) as { 1: number } | undefined
      if (!alreadyOpen) {
        db.prepare(`
          INSERT INTO football_conflict
            (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
          VALUES (?,?,'identity','archive',?,'wikidata',?)
        `).run(
          kind,
          entityId,
          payload.title,
          `${payload.qid} already identifies ${kind} ${existingQid.entity_id}`
        )
      }
      db.prepare(`UPDATE ${kind === 'person' ? 'football_person' : 'football_team'}
        SET enrichment_state='error',updated_at=datetime('now') WHERE id=?`).run(entityId)
      if (kind === 'person') {
        db.prepare(`UPDATE football_person SET quiz_pack=0 WHERE id=?`).run(entityId)
      }
      return false
    }
    db.prepare(`
      INSERT INTO football_article
        (entity_kind,entity_id,title,body,source_url,revision,license,attribution,state,fetched_at)
      VALUES (?,?,?,?,?,?,'CC BY-SA 4.0','Wikipedia contributors','ready',datetime('now'))
      ON CONFLICT(entity_kind,entity_id,source_url) DO UPDATE SET
        title=excluded.title,body=excluded.body,revision=excluded.revision,
        license=excluded.license,attribution=excluded.attribution,state='ready',fetched_at=excluded.fetched_at
    `).run(kind, entityId, payload.title, payload.body, payload.sourceUrl, payload.revision)
    if (kind === 'person') {
      db.prepare(`UPDATE football_person SET bio=?,birth_date=COALESCE(?,birth_date),
        image_path=COALESCE(?,image_path),enrichment_state='ready',enriched_at=datetime('now'),
        updated_at=datetime('now') WHERE id=?`).run(payload.body, payload.birthDate, payload.imagePath, entityId)
    } else {
      db.prepare(`UPDATE football_team SET bio=?,founded_year=COALESCE(?,founded_year),
        image_path=COALESCE(?,image_path),enrichment_state='ready',enriched_at=datetime('now'),
        updated_at=datetime('now') WHERE id=?`).run(payload.body, payload.foundedYear, payload.imagePath, entityId)
    }
    if (payload.qid) {
      db.prepare(`
        INSERT INTO football_source_ref
          (entity_kind,entity_id,source,external_id,source_url,revision,fetched_at)
        VALUES (?,?,'wikidata',?,?,?,datetime('now'))
        ON CONFLICT(entity_kind,source,external_id) DO UPDATE SET
          entity_id=excluded.entity_id,source_url=excluded.source_url,
          revision=excluded.revision,fetched_at=excluded.fetched_at
      `).run(kind, entityId, payload.qid, payload.sourceUrl, payload.revision)
    }
    if (kind === 'person' && quizPack && payload.career.length >= 4) {
      db.prepare(`DELETE FROM football_tenure WHERE person_id=? AND role='player'`).run(entityId)
      const complete = payload.career.every((spell) => spell.startDate != null)
      const insert = db.prepare(`
        INSERT INTO football_tenure
          (person_id,team_id,role,start_date,end_date,loan,verified,complete,sort_order)
        VALUES (?,?,'player',?,?,0,1,?,?)
      `)
      payload.career.forEach((spell, index) => insert.run(
        entityId,
        teamForQid(spell.teamQid, spell.teamName),
        spell.startDate,
        spell.endDate,
        complete ? 1 : 0,
        index
      ))
      db.prepare(`UPDATE football_person SET quiz_pack=? WHERE id=?`).run(complete ? 1 : 0, entityId)
    }
    return true
  })()
}

export function noteEnrichmentConflict(kind: 'team' | 'person', entityId: number, name: string, message: string): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare(`INSERT INTO football_conflict
      (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
      VALUES (? ,?,'identity','archive',?,'wikimedia',?)`).run(kind, entityId, name, message)
    db.prepare(`UPDATE ${kind === 'person' ? 'football_person' : 'football_team'}
      SET enrichment_state='error',updated_at=datetime('now') WHERE id=?`).run(entityId)
  })()
}
