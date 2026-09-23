import { getSqlite } from './db/connection'
import { vndbPost } from './vndb'
import { requireVn } from './repos/vnReadingRepo'
import { textValue } from './repos/hobbyValidation'
import type {
  VnDiscoverFilter,
  VnDiscoverPage,
  VnTagResult,
  VnRelease,
  VnEditionDetail
} from '@shared/types'

export function discoverBody(input: VnDiscoverFilter): Record<string, unknown> {
  const filters: unknown[] = []
  const query = textValue(input.query, 'Search', 200)
  if (query) filters.push(['search', '=', query])
  for (const [field, value] of [
    ['lang', input.language],
    ['platform', input.platform]
  ]) {
    if (value && !/^[a-zA-Z0-9_-]{2,15}$/.test(value))
      throw new Error('Invalid language or platform')
    if (value) filters.push([field, '=', value])
  }
  if (input.length !== null) {
    if (!Number.isInteger(input.length) || input.length < 1 || input.length > 5)
      throw new Error('Invalid length')
    filters.push(['length', '=', input.length])
  }
  if (input.minRating !== null) {
    if (!Number.isFinite(input.minRating) || input.minRating < 10 || input.minRating > 100)
      throw new Error('Rating must be between 10 and 100')
    filters.push(['rating', '>=', input.minRating])
  }
  if (
    !Array.isArray(input.tags) ||
    input.tags.length > 10 ||
    input.tags.some((t) => !/^g[1-9][0-9]*$/.test(t))
  )
    throw new Error('Choose up to ten VNDB tags')
  for (const tag of new Set(input.tags)) filters.push(['tag', '=', [tag, 2, 0]])
  if (!Number.isInteger(input.page) || input.page < 1 || input.page > 100)
    throw new Error('Page out of range')
  return {
    filters: filters.length > 1 ? ['and', ...filters] : (filters[0] ?? []),
    fields: 'id,title,released,rating,length_minutes,image.url',
    sort: query ? 'searchrank' : 'rating',
    reverse: !query,
    results: 24,
    page: input.page
  }
}
export async function discover(input: VnDiscoverFilter): Promise<VnDiscoverPage> {
  const response = await vndbPost('/vn', discoverBody(input))
  const db = getSqlite()
  return {
    more: !!response.more,
    results: (response.results ?? []).map((v: any) => {
      const id = Number(String(v.id).slice(1))
      const owned = db
        .prepare(
          "SELECT id FROM media_item WHERE external_source='vndb' AND external_id=? AND media_type='visual_novel'"
        )
        .get(String(id)) as { id: number } | undefined
      return {
        id,
        title: v.title,
        released: v.released ?? null,
        rating: v.rating ?? null,
        minutes: v.length_minutes ?? null,
        coverUrl: v.image?.url ?? null,
        mediaId: owned?.id ?? null
      }
    })
  }
}
export async function tags(query: string): Promise<VnTagResult[]> {
  const q = textValue(query, 'Tag search', 100)
  if (!q) return []
  const response = await vndbPost('/tag', {
    filters: ['search', '=', q],
    fields: 'id,name',
    results: 20
  })
  return (response.results ?? []).map((t: any) => ({ id: t.id, name: t.name }))
}
export function edition(mediaId: number): VnEditionDetail {
  requireVn(mediaId)
  const db = getSqlite()
  const media = db
    .prepare('SELECT title,external_source,external_id,metadata FROM media_item WHERE id=?')
    .get(mediaId) as {
    title: string
    external_source: string | null
    external_id: string | null
    metadata: string | null
  }
  const cached = db
    .prepare('SELECT fetched_at,releases_json FROM vn_release_cache WHERE media_id=?')
    .get(mediaId) as { fetched_at: string; releases_json: string } | undefined
  const personal = db
    .prepare('SELECT snapshot_json,notes FROM vn_edition WHERE media_id=?')
    .get(mediaId) as { snapshot_json: string | null; notes: string } | undefined
  const meta = JSON.parse(media.metadata || '{}')
  return {
    title: media.title,
    sourceId: media.external_source === 'vndb' ? Number(media.external_id) : null,
    languages: meta.vndbLanguages ?? [],
    platforms: meta.vndbPlatforms ?? [],
    fetchedAt: cached?.fetched_at ?? null,
    releases: cached ? JSON.parse(cached.releases_json) : [],
    selected: personal?.snapshot_json ? JSON.parse(personal.snapshot_json) : null,
    notes: personal?.notes ?? ''
  }
}
export async function refreshReleases(mediaId: number): Promise<void> {
  const sourceId = edition(mediaId).sourceId
  if (!sourceId) throw new Error('Import this title from VNDB to fetch releases')
  const releases: VnRelease[] = []
  for (let page = 1; page <= 30; page++) {
    const response = await vndbPost('/release', {
      filters: ['vn', '=', ['id', '=', `v${sourceId}`]],
      fields:
        'id,title,released,languages{lang,mtl},platforms,producers{name,publisher},official,patch,vns{id,rtype}',
      sort: 'released',
      reverse: true,
      results: 100,
      page
    })
    for (const r of response.results ?? [])
      releases.push({
        id: r.id,
        title: r.title,
        released: r.released ?? null,
        languages: r.languages ?? [],
        platforms: r.platforms ?? [],
        publishers: (r.producers ?? []).filter((p: any) => p.publisher).map((p: any) => p.name),
        official: !!r.official,
        patch: !!r.patch,
        completeness: r.vns?.find((v: any) => v.id === `v${sourceId}`)?.rtype ?? null
      })
    if (!response.more) {
      requireVn(mediaId)
      if (edition(mediaId).sourceId !== sourceId)
        throw new Error('The VN source changed during refresh. Try again.')
      getSqlite()
        .prepare(
          `INSERT INTO vn_release_cache(media_id,fetched_at,releases_json) VALUES(?,datetime('now'),?) ON CONFLICT(media_id) DO UPDATE SET fetched_at=excluded.fetched_at,releases_json=excluded.releases_json`
        )
        .run(mediaId, JSON.stringify(releases))
      return
    }
  }
  throw new Error('Release list exceeded the import limit; the previous cache was retained')
}
export function saveEdition(mediaId: number, releaseId: string | null, notes: string): void {
  const current = edition(mediaId)
  const snapshot =
    releaseId === null
      ? null
      : (current.releases.find((r) => r.id === releaseId) ??
        (current.selected?.id === releaseId ? current.selected : null))
  if (releaseId !== null && !snapshot)
    throw new Error('Select a cached release for this visual novel')
  getSqlite()
    .prepare(
      `INSERT INTO vn_edition(media_id,release_id,snapshot_json,notes) VALUES(?,?,?,?) ON CONFLICT(media_id) DO UPDATE SET release_id=excluded.release_id,snapshot_json=excluded.snapshot_json,notes=excluded.notes`
    )
    .run(
      mediaId,
      releaseId,
      snapshot ? JSON.stringify(snapshot) : null,
      textValue(notes, 'Edition notes', 10000)
    )
}
