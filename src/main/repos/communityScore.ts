import { COMMUNITY_SCORE_SOURCES } from '@shared/communityScore'

// The 0-100 community score as SQL, for every reader: the media list, filters
// and detail page (mediaRepo) and the quiz pools (quizRepo, which runs in the
// quiz pool process and so must not import mediaRepo or the main connection).
// The sources and their order live in @shared/communityScore, and the rule
// matches communityScoreFromMeta: a source counts only as a positive number.
export function communityScoreSql(alias: string): string {
  const parts = COMMUNITY_SCORE_SOURCES.map(({ key, scale }) => {
    const value = `json_extract(${alias}.metadata, '$.${key}')`
    const scaled = scale === 1 ? value : `${value} * ${scale}`
    return `CASE WHEN json_type(${alias}.metadata, '$.${key}') IN ('integer','real') AND ${value} > 0 THEN ${scaled} END`
  })
  return `COALESCE(\n  ${parts.join(',\n  ')}\n)`
}
