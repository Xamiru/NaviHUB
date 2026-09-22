import { getSqlite } from '../db/connection'
import { ERAS } from '@shared/era'
import type {
  QuizAvailability,
  QuizAvailabilityRequest,
  QuizChallengeQuestion,
  QuizChallengeRequest,
  QuizCastItem,
  QuizHistory,
  QuizHigherLowerAvailability,
  QuizKind,
  QuizLibFilter,
  QuizPlayMode,
  QuizSession,
  QuizSessionInput,
  QuizSong,
  QuizSongFilter,
  QuizSynopsisFilter,
  QuizSynopsisItem,
  QuizVaItem
} from '@shared/types'
import { quizMinimumRecordSize, quizScorePolicy } from '@shared/quizCore'
import { countBuildableVaSources } from '@shared/vaQuiz'
import { countBuildableSynopsisSources, isLikelyFirstEntry } from '@shared/synopsisQuiz'
import { HIGHER_LOWER_MEDIA_TYPES, higherLowerValue } from '@shared/higherLowerQuiz'
import { movieChainEndpointCounts, type MovieChainCandidate } from '@shared/movieChain'
import { libraryleTargetCount, type LibraryleCandidate } from '@shared/libraryle'
import { mysteryCareerTargetCount, type MysteryCareerCandidate } from '@shared/mysteryCareer'
import {
  guessTrackIdentityCount,
  guessTrackMusicEntry,
  guessTrackThemeEntry
} from '@shared/guessTrack'
import {
  buildChallengeQuestions,
  type ChallengeCharacterCandidate,
  type ChallengeMediaCandidate
} from '@shared/quizChallenges'
import {
  buildFootballCareerQuestions,
  buildFootballChampionQuestions,
  buildFootballChronologyQuestions,
  buildFootballPlayerGrid,
  buildFootballScorelineQuestions,
  type FootballCareerCandidate,
  type FootballChampionCandidate,
  type FootballGridPool,
  type FootballScorelineCandidate
} from '@shared/footballQuiz'
import type { FootballCompetitionKey, QuizFootballGridClue } from '@shared/types'

function footballChampionCandidates(): FootballChampionCandidate[] {
  return getSqlite().prepare(`
    SELECT s.id AS seasonId,c.key AS competitionKey,c.name AS competitionName,
      s.label AS seasonLabel,CAST(substr(COALESCE(s.start_date,s.key),1,4) AS INTEGER) AS year,
      t.id AS teamId,t.name AS teamName,COALESCE(s.data_revision,'unknown') AS datasetRevision
    FROM football_season s
    JOIN football_competition c ON c.id=s.competition_id
    JOIN football_honour h ON h.season_id=s.id AND h.placement='winner'
      AND h.verified=1 AND h.shared=0
    JOIN football_team t ON t.id=h.team_id
    WHERE s.status='complete' AND s.champion_verified=1
      AND EXISTS(SELECT 1 FROM football_coverage cv
        WHERE cv.competition_id=c.id AND cv.season_id IS NULL
          AND cv.facet='honours' AND cv.state='complete')
      AND NOT EXISTS(SELECT 1 FROM football_conflict fc
        WHERE fc.status<>'resolved' AND ((fc.entity_kind='season' AND fc.entity_id=s.id)
          OR (fc.entity_kind='honour' AND fc.entity_id=h.id)))
    ORDER BY c.id,year,s.id
  `).all() as FootballChampionCandidate[]
}

function footballScorelineCandidates(): FootballScorelineCandidate[] {
  return getSqlite().prepare(`
    SELECT m.id AS matchId,c.key AS competitionKey,c.name AS competitionName,
      ht.name AS homeTeam,at.name AS awayTeam,m.match_date AS matchDate,
      st.name AS stage,m.home_score AS homeScore,m.away_score AS awayScore,
      m.home_extra_time AS homeExtraTime,m.away_extra_time AS awayExtraTime,
      m.home_penalties AS homePenalties,m.away_penalties AS awayPenalties,
      COALESCE(s.data_revision,'unknown') AS datasetRevision
    FROM football_match m
    JOIN football_season s ON s.id=m.season_id
    JOIN football_competition c ON c.id=s.competition_id
    JOIN football_team ht ON ht.id=m.home_team_id
    JOIN football_team at ON at.id=m.away_team_id
    LEFT JOIN football_stage st ON st.id=m.stage_id
    WHERE m.status='finished' AND m.home_score IS NOT NULL AND m.away_score IS NOT NULL
      AND m.awarded=0 AND m.conflicted=0
      AND EXISTS(SELECT 1 FROM football_coverage cv
        WHERE cv.season_id=s.id AND cv.facet='results' AND cv.state='complete')
      AND NOT EXISTS(SELECT 1 FROM football_conflict fc
        WHERE fc.status<>'resolved' AND fc.entity_kind='match' AND fc.entity_id=m.id)
    ORDER BY c.id,m.match_date,m.id
  `).all() as FootballScorelineCandidate[]
}

function footballCareerCandidates(): FootballCareerCandidate[] {
  const rows = getSqlite().prepare(`
    SELECT p.id AS personId,p.name,t.name AS team,ft.start_date AS start,
      ft.end_date AS end,ft.loan,COALESCE(MAX(sr.revision),'unknown') AS datasetRevision
    FROM football_person p
    JOIN football_tenure ft ON ft.person_id=p.id AND ft.role='player'
      AND ft.verified=1 AND ft.complete=1
    JOIN football_team t ON t.id=ft.team_id
    LEFT JOIN football_source_ref sr ON sr.entity_kind='person' AND sr.entity_id=p.id
    WHERE p.quiz_pack=1 AND p.role IN ('player','both')
      AND NOT EXISTS(SELECT 1 FROM football_tenure bad
        WHERE bad.person_id=p.id AND bad.role='player' AND (bad.verified=0 OR bad.complete=0))
      AND NOT EXISTS(SELECT 1 FROM football_conflict fc
        WHERE fc.status<>'resolved' AND fc.entity_kind='person' AND fc.entity_id=p.id)
    GROUP BY ft.id ORDER BY p.id,ft.sort_order,COALESCE(ft.start_date,''),ft.id
  `).all() as Array<{
    personId: number
    name: string
    team: string
    start: string | null
    end: string | null
    loan: number
    datasetRevision: string
  }>
  const grouped = new Map<number, FootballCareerCandidate>()
  for (const row of rows) {
    const current = grouped.get(row.personId) ?? {
      personId: row.personId,
      name: row.name,
      datasetRevision: row.datasetRevision,
      spells: []
    }
    current.spells.push({
      team: row.team,
      start: row.start,
      end: row.end,
      loan: !!row.loan
    })
    grouped.set(row.personId, current)
  }
  return [...grouped.values()]
}

function footballGridPool(): FootballGridPool {
  const db = getSqlite()
  const clues: QuizFootballGridClue[] = []
  const playerClues = new Map<number, Set<string>>()
  const players = new Map<number, { name: string; aliases: string[] }>()
  const add = (personId: number, name: string, key: string): void => {
    players.set(personId, players.get(personId) ?? { name, aliases: [] })
    const set = playerClues.get(personId) ?? new Set<string>()
    set.add(key)
    playerClues.set(personId, set)
  }
  const teamRows = db.prepare(`
    SELECT DISTINCT p.id AS personId,p.name,t.id AS teamId,t.name AS teamName,t.is_national AS national
    FROM football_person p JOIN football_tenure ft ON ft.person_id=p.id
    JOIN football_team t ON t.id=ft.team_id
    WHERE p.quiz_pack=1 AND ft.role='player' AND ft.verified=1 AND ft.complete=1
      AND NOT EXISTS(SELECT 1 FROM football_conflict fc
        WHERE fc.status<>'resolved' AND fc.entity_kind='person' AND fc.entity_id=p.id)
    UNION
    SELECT DISTINCT p.id AS personId,p.name,t.id AS teamId,t.name AS teamName,1 AS national
    FROM football_person p JOIN football_lineup fl ON fl.person_id=p.id AND fl.role='player'
    JOIN football_team t ON t.id=fl.team_id AND t.is_national=1
    JOIN football_match m ON m.id=fl.match_id AND m.lineup_coverage='complete' AND m.conflicted=0
    WHERE p.quiz_pack=1
      AND NOT EXISTS(SELECT 1 FROM football_conflict fc
        WHERE fc.status<>'resolved' AND fc.entity_kind='person' AND fc.entity_id=p.id)
  `).all() as Array<{
    personId: number
    name: string
    teamId: number
    teamName: string
    national: number
  }>
  const clueSeen = new Set<string>()
  for (const row of teamRows) {
    const key = `${row.national ? 'nation' : 'club'}:${row.teamId}`
    if (!clueSeen.has(key)) {
      clues.push({ key, kind: row.national ? 'nationalTeam' : 'club', label: row.teamName })
      clueSeen.add(key)
    }
    add(row.personId, row.name, key)
  }
  const editionRows = db.prepare(`
    SELECT DISTINCT p.id AS personId,p.name,s.id AS seasonId,
      c.name || ' ' || s.label AS label
    FROM football_person p JOIN football_lineup fl ON fl.person_id=p.id AND fl.role='player'
    JOIN football_match m ON m.id=fl.match_id
    JOIN football_season s ON s.id=m.season_id
    JOIN football_competition c ON c.id=s.competition_id
    WHERE p.quiz_pack=1 AND m.conflicted=0 AND m.lineup_coverage='complete'
      AND NOT EXISTS(SELECT 1 FROM football_conflict fc
        WHERE fc.status<>'resolved' AND fc.entity_kind='person' AND fc.entity_id=p.id)
  `).all() as Array<{ personId: number; name: string; seasonId: number; label: string }>
  for (const row of editionRows) {
    const key = `edition:${row.seasonId}`
    if (!clueSeen.has(key)) {
      clues.push({ key, kind: 'competitionEdition', label: row.label })
      clueSeen.add(key)
    }
    add(row.personId, row.name, key)
  }
  const aliases = db.prepare(`
    SELECT entity_id AS personId,alias FROM football_alias WHERE entity_kind='person'
  `).all() as Array<{ personId: number; alias: string }>
  for (const alias of aliases) {
    const player = players.get(alias.personId)
    if (player && alias.alias !== player.name && !player.aliases.includes(alias.alias)) {
      player.aliases.push(alias.alias)
    }
  }
  const revision = (db.prepare(`
    SELECT MAX(COALESCE(revision,fetched_at)) AS revision FROM football_source_ref
  `).get() as { revision: string | null }).revision ?? 'unknown'
  return {
    clues,
    players: [...players].map(([personId, player]) => ({
      personId,
      name: player.name,
      aliases: player.aliases,
      clueKeys: [...(playerClues.get(personId) ?? [])]
    })),
    datasetRevision: revision
  }
}

// An anime's year for era filtering: canonical AniList seasonYear from the
// metadata JSON when present (json_valid guards malformed blobs from throwing),
// else the release-date year — the same precedence as @shared/season.ts.
// Exported because every library quiz pool (manga panels included) needs the
// same two affinity expressions over a media_item aliased `mi`.
export const YEAR_EXPR = `CAST(COALESCE(
  CASE WHEN json_valid(mi.metadata) THEN json_extract(mi.metadata, '$.seasonYear') END,
  substr(mi.release_date, 1, 4)
) AS INTEGER)`

// Comma-joined tag names for the media aliased `mi` — distractor affinity.
export const GENRE_CSV_EXPR = `(SELECT GROUP_CONCAT(DISTINCT t.name) FROM media_tag mt
   JOIN tag t ON t.id = mt.tag_id WHERE mt.media_id = mi.id)`

function screenChallengeCandidates(statuses: readonly string[]): ChallengeMediaCandidate[] {
  const db = getSqlite()
  const statusSql = statuses.length
    ? `AND mi.status IN (${statuses.map(() => '?').join(',')})`
    : ''
  const rows = db.prepare(
    `SELECT mi.id, mi.title, mi.title_original, mi.media_type, mi.cover_path,
            mi.release_date, mi.total_units, mi.score
     FROM media_item mi
     WHERE mi.media_type IN ('movie','tv') AND mi.cover_path IS NOT NULL ${statusSql}
     ORDER BY mi.id`
  ).all(...statuses) as Array<Record<string, unknown>>
  const media = new Map<number, ChallengeMediaCandidate>()
  for (const row of rows) {
    media.set(row.id as number, {
      id: row.id as number,
      title: row.title as string,
      aliases: row.title_original && row.title_original !== row.title
        ? [row.title_original as string]
        : [],
      mediaType: row.media_type as string,
      coverPath: row.cover_path as string,
      artPaths: [],
      releaseDate: (row.release_date as string | null) ?? null,
      totalUnits: (row.total_units as number | null) ?? null,
      score: (row.score as number | null) ?? null,
      genres: [],
      relations: [],
      people: [],
      studios: []
    })
  }
  const ids = [...media.keys()]
  if (ids.length === 0) return []
  const slots = ids.map(() => '?').join(',')
  for (const row of db.prepare(
    `SELECT mt.media_id, t.name FROM media_tag mt JOIN tag t ON t.id=mt.tag_id
     WHERE mt.media_id IN (${slots}) AND t.category='genre' ORDER BY mt.media_id, t.name`
  ).all(...ids) as Array<{ media_id: number; name: string }>) {
    media.get(row.media_id)?.genres.push(row.name)
  }
  for (const row of db.prepare(
    `SELECT c.media_id, p.id, p.name, c.role, ch.name AS character_name,
            COALESCE(c.importance, mch.sort_order) AS billing_order
     FROM credit c JOIN person p ON p.id=c.person_id
     LEFT JOIN character ch ON ch.id=c.character_id
     LEFT JOIN media_character mch
       ON mch.media_id=c.media_id AND mch.character_id=c.character_id
     WHERE c.media_id IN (${slots}) AND c.role IN ('actor','director')
     ORDER BY c.media_id, COALESCE(c.importance, mch.sort_order, 999999), c.id`
  ).all(...ids) as Array<{
    media_id: number
    id: number
    name: string
    role: string
    character_name: string | null
    billing_order: number | null
  }>) {
    media.get(row.media_id)?.people.push({
      id: row.id,
      name: row.name,
      role: row.role,
      characterName: row.character_name,
      billingOrder: row.billing_order
    })
  }
  for (const row of db.prepare(
    `SELECT mc.media_id, co.id, co.name, mc.role FROM media_company mc
     JOIN company co ON co.id=mc.company_id WHERE mc.media_id IN (${slots})
     ORDER BY mc.media_id, mc.id`
  ).all(...ids) as Array<{ media_id: number; id: number; name: string; role: string }>) {
    media.get(row.media_id)?.studios.push({ id: row.id, name: row.name, role: row.role })
  }
  const parents = new Map(ids.map((id) => [id, id]))
  const root = (id: number): number => {
    const parent = parents.get(id) ?? id
    if (parent === id) return id
    const found = root(parent)
    parents.set(id, found)
    return found
  }
  for (const row of db.prepare(
    `SELECT mr.media_id, related.id AS related_id FROM media_relation mr
     JOIN media_item related ON related.external_source=mr.related_source
       AND related.external_id=mr.related_external_id
     WHERE mr.media_id IN (${slots}) AND related.id IN (${slots})`
  ).all(...ids, ...ids) as Array<{ media_id: number; related_id: number }>) {
    const left = root(row.media_id)
    const right = root(row.related_id)
    if (left !== right) parents.set(Math.max(left, right), Math.min(left, right))
  }
  const relationSizes = new Map<number, number>()
  for (const id of ids) relationSizes.set(root(id), (relationSizes.get(root(id)) ?? 0) + 1)
  for (const id of ids) {
    const component = root(id)
    if ((relationSizes.get(component) ?? 0) > 1) media.get(id)?.relations.push(String(component))
  }
  return [...media.values()]
}

export function availability(request: QuizAvailabilityRequest = {}): QuizAvailability {
  const db = getSqlite()
  const statuses = request.statuses?.filter(Boolean) ?? []
  const statusSql = statuses.length > 0 ? `AND mi.status IN (${statuses.map(() => '?').join(',')})` : ''
  const scalar = (sql: string, params: unknown[] = statuses): number =>
    (db.prepare(sql).get(...params) as { n: number }).n
  const song = scalar(
    `SELECT COUNT(DISTINCT mi.id) AS n FROM theme_song ts JOIN media_item mi ON mi.id=ts.media_id
     WHERE (ts.audio_url IS NOT NULL OR ts.audio_path IS NOT NULL) ${statusSql}`
  )
  const guessTrackThemes = guessTrackIdentityCount(
    songPool({ statuses: statuses.length ? statuses : null })
      .map(guessTrackThemeEntry)
      .filter((entry) => entry != null)
  )
  const musicRows = db
    .prepare(
      `SELECT t.id, t.album_id, t.artist_id, t.file_path, t.title, t.track_no, t.disc_no,
              t.duration, t.tag_artist, t.liked_at, t.play_count, t.last_played_at,
              al.title AS album_title, al.cover_path, ar.name AS artist_name
       FROM music_track t
       JOIN music_album al ON al.id=t.album_id
       JOIN music_artist ar ON ar.id=t.artist_id`
    )
    .all() as Array<Record<string, unknown>>
  const guessTrackMusic = guessTrackIdentityCount(
    musicRows
      .map((row) =>
        guessTrackMusicEntry({
          id: row.id as number,
          albumId: row.album_id as number,
          albumTitle: row.album_title as string,
          artistId: row.artist_id as number,
          artistName: row.artist_name as string,
          tagArtist: (row.tag_artist as string | null) ?? null,
          filePath: row.file_path as string,
          title: row.title as string,
          trackNo: (row.track_no as number | null) ?? null,
          discNo: (row.disc_no as number | null) ?? null,
          duration: (row.duration as number | null) ?? null,
          likedAt: (row.liked_at as string | null) ?? null,
          playCount: row.play_count as number,
          lastPlayedAt: (row.last_played_at as string | null) ?? null,
          coverPath: (row.cover_path as string | null) ?? null
        })
      )
      .filter((entry) => entry != null)
  )
  const character = scalar(
    `SELECT COUNT(DISTINCT ch.id) AS n FROM media_character mc
     JOIN character ch ON ch.id=mc.character_id JOIN media_item mi ON mi.id=mc.media_id
     WHERE ch.image_path IS NOT NULL AND mi.media_type='anime' ${statusSql}`
  )
  const cast = scalar(
    `SELECT COUNT(DISTINCT mi.id) AS n FROM credit c
     JOIN person p ON p.id=c.person_id JOIN media_item mi ON mi.id=c.media_id
     LEFT JOIN media_character mc ON mc.media_id=c.media_id AND mc.character_id=c.character_id
     WHERE c.role='actor' AND p.photo_path IS NOT NULL AND mi.cover_path IS NOT NULL
       AND mi.media_type IN ('movie','tv')
       AND (mi.media_type='tv' OR COALESCE(c.importance, mc.sort_order) BETWEEN 0 AND 9) ${statusSql}`
  )
  const va = countBuildableVaSources(vaPool({ statuses: statuses.length ? statuses : null }))
  const synopsis = countBuildableSynopsisSources(
    synopsisPool({
      mediaTypes: ['anime', 'movie', 'tv'],
      completedStatuses: statuses.length ? statuses : null,
      includeSafeUnseen: true,
      requireCover: true
    })
  )
  const mangaPanel = scalar(
    `SELECT COUNT(DISTINCT mi.id) AS n FROM manga_chapter mc JOIN media_item mi ON mi.id=mc.media_id
     WHERE mi.media_type='manga' AND LOWER(mc.dir_path) NOT LIKE '%.epub'
       AND (?='all' OR mc.read_at IS NOT NULL OR mc.last_read_page IS NOT NULL)`,
    [request.scope ?? 'consumed']
  )
  const imageReveal = scalar(
    `SELECT COUNT(*) AS n FROM media_item mi
     WHERE mi.cover_path IS NOT NULL ${statusSql}
       AND (SELECT COUNT(*) FROM media_item opt
            WHERE opt.media_type=mi.media_type
              ${statuses.length ? `AND opt.status IN (${statuses.map(() => '?').join(',')})` : ''}) >= 4`,
    [...statuses, ...statuses]
  )
  // Use the real deterministic builder so relation components, distinct-year
  // rules and duplicate-set rejection cannot drift from what Start can deal.
  const chronology = challengePool({
    kind: 'chronology',
    seed: 1,
    scope: request.scope ?? 'consumed',
    statuses: statuses.length ? statuses : null,
    length: 20
  }).length
  const connections = scalar(
    `WITH scoped_people AS (
       SELECT DISTINCT c.person_id, c.media_id, c.role,
              COALESCE(c.importance, mch.sort_order) AS billing_order
       FROM credit c JOIN media_item mi ON mi.id=c.media_id
       LEFT JOIN media_character mch
         ON mch.media_id=c.media_id AND mch.character_id=c.character_id
       WHERE c.role IN ('actor','director') AND mi.media_type IN ('movie','tv')
         AND mi.cover_path IS NOT NULL ${statusSql}
     ), eligible AS (
       SELECT person_id, media_id FROM scoped_people
       WHERE role='director' OR billing_order BETWEEN 0 AND 9
     ), person_count AS (
       SELECT COUNT(DISTINCT person_id) AS n FROM eligible
     ), pairs AS (
       SELECT left_credit.media_id AS left_id, right_credit.media_id AS right_id
       FROM eligible left_credit
       JOIN eligible right_credit ON right_credit.person_id=left_credit.person_id
         AND right_credit.media_id>left_credit.media_id
       GROUP BY left_credit.media_id, right_credit.media_id
     )
     SELECT COUNT(*) AS n FROM pairs
     WHERE (SELECT n FROM person_count) - (
       SELECT COUNT(DISTINCT left_cast.person_id)
       FROM scoped_people left_cast
       JOIN scoped_people right_cast ON right_cast.person_id=left_cast.person_id
       WHERE left_cast.media_id=pairs.left_id AND right_cast.media_id=pairs.right_id
         AND left_cast.person_id IN (SELECT person_id FROM eligible)
     ) >= 3`
  )
  const higherLowerRows = db.prepare(
    `SELECT mi.media_type, mi.release_date, mi.total_units, mi.score
     FROM media_item mi
     WHERE mi.cover_path IS NOT NULL ${statusSql}`
  ).all(...statuses) as Array<{
    media_type: QuizHigherLowerAvailability['mediaType']
    release_date: string | null
    total_units: number | null
    score: number | null
  }>
  const higherLowerOptions = HIGHER_LOWER_MEDIA_TYPES.map(({ key }) => {
    const rows = higherLowerRows.filter((row) => row.media_type === key)
    const count = (metric: 'releaseDate' | 'totalUnits' | 'personalScore') => {
      const values = rows
        .map((row) => higherLowerValue({
          releaseDate: row.release_date,
          totalUnits: row.total_units,
          score: row.score
        }, metric))
        .filter((value): value is number => value != null)
      return new Set(values).size >= 2 ? values.length : 0
    }
    return {
      mediaType: key,
      releaseDate: count('releaseDate'),
      totalUnits: count('totalUnits'),
      personalScore: count('personalScore')
    }
  })
  const higherLower = Math.max(
    0,
    ...higherLowerOptions.flatMap((option) => [
      option.releaseDate,
      option.totalUnits,
      option.personalScore
    ])
  )
  const screenCandidates = screenChallengeCandidates(statuses)
  const chainCandidates: MovieChainCandidate[] = screenCandidates.map((item) => ({
    key: String(item.id),
    label: item.title,
    aliases: item.aliases ?? [],
    imagePath: item.coverPath!,
    releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || null : null,
    mediaType: item.mediaType as 'movie' | 'tv',
    people: item.people
  }))
  const libraryleCandidates: LibraryleCandidate[] = screenCandidates.map((item) => ({
    key: String(item.id),
    label: item.title,
    aliases: item.aliases ?? [],
    imagePath: item.coverPath!,
    releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || null : null,
    mediaType: item.mediaType as 'movie' | 'tv',
    genres: item.genres.map((label) => ({ key: label.toLocaleLowerCase(), label })),
    companies: item.studios.map((company) => ({ key: String(company.id), label: company.name })),
    directors: item.people
      .filter((person) => person.role === 'director')
      .map((person) => ({ key: String(person.id), label: person.name })),
    cast: item.people
      .filter(
        (person) =>
          person.role === 'actor' &&
          person.billingOrder != null &&
          person.billingOrder >= 0 &&
          person.billingOrder < 10
      )
      .map((person) => ({ key: String(person.id), label: person.name }))
  }))
  const careerCandidates: MysteryCareerCandidate[] = screenCandidates.map((item) => ({
    key: String(item.id),
    label: item.title,
    aliases: item.aliases ?? [],
    imagePath: item.coverPath!,
    releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || null : null,
    mediaType: item.mediaType as 'movie' | 'tv',
    people: item.people
  }))
  const screenGameOptions = (['movie', 'tv', 'both'] as const).map((mediaMode) => {
    const libraryGrid = buildChallengeQuestions({
      kind: 'libraryGrid',
      seed: 1,
      scope: request.scope ?? 'consumed',
      statuses: statuses.length ? statuses : null,
      length: 1,
      options: { screenMediaMode: mediaMode }
    }, screenCandidates).length ? 9 : 0
    const linkWall = buildChallengeQuestions({
      kind: 'linkWall',
      seed: 1,
      scope: request.scope ?? 'consumed',
      statuses: statuses.length ? statuses : null,
      length: 1,
      options: { screenMediaMode: mediaMode }
    }, screenCandidates).length ? 16 : 0
    return {
      mediaMode,
      libraryGrid,
      movieChain: movieChainEndpointCounts(chainCandidates, mediaMode),
      libraryle: libraryleTargetCount(libraryleCandidates, mediaMode),
      mysteryCareer: mysteryCareerTargetCount(careerCandidates, mediaMode),
      linkWall
    }
  })
  const libraryGrid = Math.max(...screenGameOptions.map((option) => option.libraryGrid))
  const movieChain = Math.max(
    ...screenGameOptions.flatMap((option) => Object.values(option.movieChain))
  )
  const libraryle = Math.max(...screenGameOptions.map((option) => option.libraryle))
  const mysteryCareer = Math.max(...screenGameOptions.map((option) => option.mysteryCareer))
  const linkWall = Math.max(...screenGameOptions.map((option) => option.linkWall))
  const footballChampions = footballChampionCandidates()
  const footballScores = footballScorelineCandidates()
  const footballCareers = footballCareerCandidates()
  const footballGrid = footballGridPool()
  const footballGridReady = buildFootballPlayerGrid(footballGrid, 1).length > 0
  const footballRevision = [
    ...footballChampions.map((item) => item.datasetRevision),
    ...footballScores.map((item) => item.datasetRevision),
    ...footballCareers.map((item) => item.datasetRevision),
    footballGrid.datasetRevision
  ].filter((value) => value !== 'unknown').sort().at(-1) ?? null
  return {
    song,
    guessTrack: Math.max(guessTrackThemes, guessTrackMusic),
    guessTrackOptions: { themes: guessTrackThemes, music: guessTrackMusic },
    cast,
    va,
    synopsis,
    mangaPanel,
    imageReveal,
    silhouette: character,
    connections,
    chronology,
    higherLower,
    higherLowerOptions,
    libraryGrid,
    movieChain,
    libraryle,
    mysteryCareer,
    linkWall,
    football: {
      champion: footballChampions.length,
      scoreline: footballScores.length,
      careerPath: footballCareers.length,
      chronology: footballChampions.length,
      playerGrid: footballGridReady ? 1 : 0,
      playerGridPlayers: footballGrid.players.length,
      datasetRevision: footballRevision
    },
    screenGameOptions
  }
}

export function challengePool(request: QuizChallengeRequest): QuizChallengeQuestion[] {
  const db = getSqlite()
  const statuses = request.statuses?.filter(Boolean) ?? []
  const footballKeys = request.options?.footballCompetitionKeys
  const acceptsFootballKey = (key: FootballCompetitionKey): boolean =>
    !footballKeys?.length || footballKeys.includes(key)
  if (request.kind === 'footballChampion') {
    return buildFootballChampionQuestions(
      footballChampionCandidates().filter((item) => acceptsFootballKey(item.competitionKey)),
      request.length,
      request.seed
    )
  }
  if (request.kind === 'footballScoreline') {
    return buildFootballScorelineQuestions(
      footballScorelineCandidates().filter((item) => acceptsFootballKey(item.competitionKey)),
      request.length,
      request.seed
    )
  }
  if (request.kind === 'footballCareerPath') {
    return buildFootballCareerQuestions(footballCareerCandidates(), request.length, request.seed)
  }
  if (request.kind === 'footballChronology') {
    return buildFootballChronologyQuestions(
      footballChampionCandidates().filter((item) => acceptsFootballKey(item.competitionKey)),
      request.length,
      request.seed
    )
  }
  if (request.kind === 'footballPlayerGrid') {
    return buildFootballPlayerGrid(footballGridPool(), request.seed)
  }
  if (
    request.kind === 'libraryGrid' ||
    request.kind === 'movieChain' ||
    request.kind === 'libraryle' ||
    request.kind === 'mysteryCareer' ||
    request.kind === 'linkWall'
  ) {
    return buildChallengeQuestions(request, screenChallengeCandidates(statuses))
  }
  const mediaWhere: string[] = []
  if (statuses.length) mediaWhere.push(`mi.status IN (${statuses.map(() => '?').join(',')})`)
  if (request.kind === 'connections') {
    mediaWhere.push(`mi.media_type IN ('movie','tv')`)
    mediaWhere.push('mi.cover_path IS NOT NULL')
  }
  if (request.kind === 'higherLower') {
    mediaWhere.push('mi.cover_path IS NOT NULL')
    if (request.options?.higherLowerMediaType) {
      mediaWhere.push('mi.media_type = ?')
    }
  }
  const whereSql = mediaWhere.length ? `WHERE ${mediaWhere.join(' AND ')}` : ''
  const mediaParams: unknown[] = [
    ...statuses,
    ...(request.kind === 'higherLower' && request.options?.higherLowerMediaType
      ? [request.options.higherLowerMediaType]
      : [])
  ]
  const mediaRows = db.prepare(
    `SELECT mi.id, mi.title, mi.title_original, mi.media_type, mi.cover_path, mi.banner_path,
            mi.release_date, mi.total_units, mi.score
     FROM media_item mi ${whereSql} ORDER BY mi.id`
  ).all(...mediaParams) as Array<Record<string, unknown>>
  const mediaById = new Map<number, ChallengeMediaCandidate>()
  for (const row of mediaRows) {
    mediaById.set(row.id as number, {
      id: row.id as number,
      title: row.title as string,
      aliases: row.title_original && row.title_original !== row.title
        ? [row.title_original as string]
        : [],
      mediaType: row.media_type as string,
      coverPath: (row.cover_path as string | null) ?? null,
      artPaths: row.banner_path ? [row.banner_path as string] : [],
      releaseDate: (row.release_date as string | null) ?? null,
      totalUnits: (row.total_units as number | null) ?? null,
      score: (row.score as number | null) ?? null,
      genres: [],
      relations: [],
      people: [],
      studios: []
    })
  }
  if (mediaById.size === 0) return []
  if (request.kind === 'higherLower') {
    return buildChallengeQuestions(request, [...mediaById.values()])
  }
  const ids = [...mediaById.keys()]
  const slots = ids.map(() => '?').join(',')
  for (const row of db.prepare(
    `SELECT media_id, file_path FROM media_image WHERE media_id IN (${slots}) ORDER BY id`
  ).all(...ids) as Array<{ media_id: number; file_path: string }>) {
    mediaById.get(row.media_id)?.artPaths.push(row.file_path)
  }
  for (const row of db.prepare(
    `SELECT mt.media_id, t.name FROM media_tag mt JOIN tag t ON t.id=mt.tag_id
     WHERE mt.media_id IN (${slots}) ORDER BY mt.media_id, t.name`
  ).all(...ids) as Array<{ media_id: number; name: string }>) {
    mediaById.get(row.media_id)?.genres.push(row.name)
  }
  const parents = new Map(ids.map((id) => [id, id]))
  const root = (id: number): number => {
    const parent = parents.get(id) ?? id
    if (parent === id) return id
    const found = root(parent)
    parents.set(id, found)
    return found
  }
  for (const row of db.prepare(
    `SELECT mr.media_id, related.id AS related_id FROM media_relation mr
     JOIN media_item related ON related.external_source=mr.related_source
       AND related.external_id=mr.related_external_id
     WHERE mr.media_id IN (${slots}) AND related.id IN (${slots})`
  ).all(...ids, ...ids) as Array<{ media_id: number; related_id: number }>) {
    const a = root(row.media_id)
    const b = root(row.related_id)
    if (a !== b) parents.set(Math.max(a, b), Math.min(a, b))
  }
  const relationSizes = new Map<number, number>()
  for (const id of ids) relationSizes.set(root(id), (relationSizes.get(root(id)) ?? 0) + 1)
  for (const id of ids) {
    const component = root(id)
    if ((relationSizes.get(component) ?? 0) > 1) mediaById.get(id)?.relations.push(String(component))
  }
  const connectionCreditSql = request.kind === 'connections'
    ? `AND c.role IN ('actor','director')`
    : ''
  for (const row of db.prepare(
    `SELECT c.media_id, p.id, p.name, c.role, ch.name AS character_name,
            COALESCE(c.importance, mch.sort_order) AS billing_order
     FROM credit c JOIN person p ON p.id=c.person_id
     LEFT JOIN character ch ON ch.id=c.character_id
     LEFT JOIN media_character mch
       ON mch.media_id=c.media_id AND mch.character_id=c.character_id
     WHERE c.media_id IN (${slots}) ${connectionCreditSql}
     ORDER BY c.media_id, COALESCE(c.importance, mch.sort_order, 999999), c.id`
  ).all(...ids) as Array<{
    media_id: number
    id: number
    name: string
    role: string
    character_name: string | null
    billing_order: number | null
  }>) {
    mediaById.get(row.media_id)?.people.push({
      id: row.id,
      name: row.name,
      role: row.role,
      characterName: row.character_name,
      billingOrder: row.billing_order
    })
  }
  for (const row of db.prepare(
    `SELECT mc.media_id, co.id, co.name, mc.role FROM media_company mc
     JOIN company co ON co.id=mc.company_id WHERE mc.media_id IN (${slots})
     ORDER BY mc.media_id, mc.id`
  ).all(...ids) as Array<{ media_id: number; id: number; name: string; role: string }>) {
    mediaById.get(row.media_id)?.studios.push({ id: row.id, name: row.name, role: row.role })
  }
  const charactersById = new Map<number, ChallengeCharacterCandidate>()
  for (const row of db.prepare(
    `SELECT ch.id, ch.name, ch.gender, ch.image_path, mc.media_id, mi.title
     FROM media_character mc JOIN character ch ON ch.id=mc.character_id
     JOIN media_item mi ON mi.id=mc.media_id
     WHERE ch.image_path IS NOT NULL AND mc.media_id IN (${slots}) ORDER BY ch.id, mc.id`
  ).all(...ids) as Array<{ id: number; name: string; gender: string | null; image_path: string; media_id: number; title: string }>) {
    const found = charactersById.get(row.id)
    if (found) found.media.push({ id: row.media_id, title: row.title })
    else charactersById.set(row.id, {
      id: row.id,
      name: row.name,
      gender: row.gender,
      imagePath: row.image_path,
      media: [{ id: row.media_id, title: row.title }]
    })
  }
  return buildChallengeQuestions(request, [...mediaById.values()], [...charactersById.values()])
}

function statusClause(filter: QuizLibFilter, where: string[], params: unknown[]): void {
  const statuses = filter.statuses?.filter((s) => s)
  if (statuses && statuses.length > 0) {
    where.push(`mi.status IN (${statuses.map(() => '?').join(', ')})`)
    params.push(...statuses)
  }
}

function typeClause(filter: QuizLibFilter, where: string[], params: unknown[]): void {
  const types = filter.mediaTypes?.filter((t) => t)
  if (types && types.length > 0) {
    where.push(`mi.media_type IN (${types.map(() => '?').join(', ')})`)
    params.push(...types)
  }
}

// The song quiz pool: every anime theme that has playable audio (a local file or
// a remote stream), flattened with the anime it belongs to and its performers.
// Filtering happens here; the renderer does the shuffling, option-picking and
// scoring, so we return the whole matching set (a personal library is small).
export function songPool(filter: QuizSongFilter = {}): QuizSong[] {
  const db = getSqlite()

  const where: string[] = [
    `mi.media_type = 'anime'`,
    `(ts.audio_url IS NOT NULL OR ts.audio_path IS NOT NULL)`
  ]
  const params: unknown[] = []

  if (filter.songType) {
    where.push('ts.type = ?')
    params.push(filter.songType)
  }
  const statuses = filter.statuses?.filter((s) => s)
  if (statuses && statuses.length > 0) {
    where.push(`mi.status IN (${statuses.map(() => '?').join(', ')})`)
    params.push(...statuses)
  }

  // Era filter: OR together a year-range clause per selected decade. A NULL
  // year (unknown release) matches no range, so those anime drop out while a
  // filter is active — same as the Seasonal page's Unknown handling.
  const eras = filter.eras?.filter((k) => k)
  if (eras && eras.length > 0) {
    const clauses: string[] = []
    for (const key of eras) {
      const era = ERAS.find((e) => e.key === key)
      if (!era) continue
      const parts: string[] = []
      if (era.minYear != null) {
        parts.push(`${YEAR_EXPR} >= ?`)
        params.push(era.minYear)
      }
      if (era.maxYear != null) {
        parts.push(`${YEAR_EXPR} <= ?`)
        params.push(era.maxYear)
      }
      if (parts.length > 0) clauses.push(`(${parts.join(' AND ')})`)
    }
    if (clauses.length > 0) where.push(`(${clauses.join(' OR ')})`)
  }

  // One row per (theme, artist); artists are grouped in JS below, mirroring the
  // theme-loading block in mediaRepo.get(). year + genre_csv ride along so the
  // renderer can pick plausible distractors (@shared/quizDistractors).
  const rows = db
    .prepare(
      `SELECT ts.id AS ts_id, ts.slug, ts.type, ts.title,
              ts.audio_url, ts.audio_path, ts.sort_order,
              mi.id AS media_id, mi.title AS anime_title,
              mi.cover_path, mi.status,
              ${YEAR_EXPR} AS year,
              ${GENRE_CSV_EXPR} AS genre_csv,
              p.name AS artist_name, ta.sort_order AS ta_order
       FROM theme_song ts
       JOIN media_item mi ON mi.id = ts.media_id
       LEFT JOIN theme_artist ta ON ta.theme_song_id = ts.id
       LEFT JOIN person p ON p.id = ta.person_id
       WHERE ${where.join(' AND ')}
       ORDER BY mi.id ASC, COALESCE(ts.sort_order, 1000) ASC, ts.id ASC,
                COALESCE(ta.sort_order, 0) ASC`
    )
    .all(...params) as Record<string, unknown>[]

  const byId = new Map<number, QuizSong>()
  for (const r of rows) {
    const tid = r.ts_id as number
    let s = byId.get(tid)
    if (!s) {
      s = {
        themeId: tid,
        slug: (r.slug as string) ?? null,
        type: (r.type as string) ?? null,
        title: (r.title as string) ?? null,
        audioUrl: (r.audio_url as string) ?? null,
        audioPath: (r.audio_path as string) ?? null,
        mediaId: r.media_id as number,
        animeTitle: r.anime_title as string,
        coverPath: (r.cover_path as string) ?? null,
        status: (r.status as string) ?? null,
        artists: [],
        year: (r.year as number | null) ?? null,
        genres: r.genre_csv ? String(r.genre_csv).split(',') : []
      }
      byId.set(tid, s)
    }
    if (r.artist_name) s.artists.push(r.artist_name as string)
  }
  return [...byId.values()]
}

// ---- library MCQ pools (cast / VA / synopsis quizzes) ----
//
// Like songPool these return the WHOLE matching set — a personal library is
// small, and the renderer owns shuffling, option-picking and scoring. Each
// pools normalize in JS rather than with GROUP BY tricks, mirroring how
// songPool groups its artist rows.

// Photographed actors paired with eligible movie/TV credits. Movie questions
// use only TMDB billing positions 0-9; TV remains uncapped. Every screen credit
// in the selected scope still enters validMediaIds so a lower-billed movie role
// can never be offered as a factually-wrong distractor for that actor.
export function castPool(filter: QuizLibFilter = {}): QuizCastItem[] {
  const db = getSqlite()
  const where: string[] = [
    `c.role = 'actor'`,
    `mi.media_type IN ('movie', 'tv')`,
    'p.photo_path IS NOT NULL',
    'mi.cover_path IS NOT NULL'
  ]
  const params: unknown[] = []
  statusClause(filter, where, params)

  const rows = db
    .prepare(
      `SELECT c.id AS credit_id, COALESCE(c.importance, mc.sort_order) AS billing_order,
              p.id AS person_id,
              p.name AS person_name, p.photo_path,
              mi.id AS media_id, mi.media_type, mi.title AS media_title,
              mi.cover_path, ${YEAR_EXPR} AS year,
              ${GENRE_CSV_EXPR} AS genre_csv
       FROM credit c
       JOIN person p ON p.id = c.person_id
       JOIN media_item mi ON mi.id = c.media_id
       LEFT JOIN media_character mc ON mc.media_id=c.media_id AND mc.character_id=c.character_id
       WHERE ${where.join(' AND ')}
       ORDER BY p.id ASC, mi.id ASC, COALESCE(c.importance, mc.sort_order, 999999) ASC, c.id ASC`
    )
    .all(...params) as Record<string, unknown>[]

  const appearances = new Map<number, Set<number>>()
  const eligible = new Map<string, QuizCastItem>()
  for (const r of rows) {
    const personId = r.person_id as number
    const mediaId = r.media_id as number
    const mediaType = r.media_type as QuizCastItem['mediaType']
    const personAppearances = appearances.get(personId) ?? new Set<number>()
    personAppearances.add(mediaId)
    appearances.set(personId, personAppearances)

    const billingOrder = typeof r.billing_order === 'number' ? r.billing_order : null
    const canSeed = mediaType === 'tv' || (billingOrder != null && billingOrder >= 0 && billingOrder < 10)
    const pairKey = `${personId}:${mediaId}`
    if (!canSeed || eligible.has(pairKey)) continue
    eligible.set(pairKey, {
      personId,
      personName: r.person_name as string,
      photoPath: (r.photo_path as string) ?? null,
      mediaId,
      mediaTitle: r.media_title as string,
      mediaType,
      coverPath: (r.cover_path as string) ?? null,
      year: (r.year as number | null) ?? null,
      genres: r.genre_csv ? String(r.genre_csv).split(',') : [],
      billingOrder,
      validMediaIds: []
    })
  }
  for (const item of eligible.values()) {
    item.validMediaIds = [...(appearances.get(item.personId) ?? [])]
  }
  return [...eligible.values()]
}

// One row per imaged anime character/title appearance, carrying every Japanese
// VA for that exact role. The pure builder crosses those rows by person id and
// refuses same-title/same-character matches.
export function vaPool(filter: QuizLibFilter = {}): QuizVaItem[] {
  const db = getSqlite()
  const where: string[] = [
    `mi.media_type = 'anime'`,
    `c.role = 'voice_actor'`,
    `c.language = 'Japanese'`,
    'ch.image_path IS NOT NULL'
  ]
  const params: unknown[] = []
  statusClause(filter, where, params)

  const rows = db
    .prepare(
      `SELECT c.id AS credit_id, c.importance,
              p.id AS person_id, p.name AS person_name,
              ch.id AS character_id, ch.name AS character_name,
              ch.gender, ch.image_path AS char_image,
              mi.id AS media_id, mi.title AS media_title,
              ${YEAR_EXPR} AS year
       FROM credit c
       JOIN person p ON p.id = c.person_id
       JOIN character ch ON ch.id = c.character_id
       JOIN media_item mi ON mi.id = c.media_id
       WHERE ${where.join(' AND ')}
       ORDER BY mi.id ASC, ch.id ASC, c.id ASC`
    )
    .all(...params) as Record<string, unknown>[]

  const grouped = new Map<string, { item: QuizVaItem; voices: Map<number, string> }>()
  for (const row of rows) {
    const mediaId = row.media_id as number
    const characterId = row.character_id as number
    const key = `${mediaId}/${characterId}`
    let found = grouped.get(key)
    if (!found) {
      found = {
        item: {
          characterId,
          characterName: row.character_name as string,
          characterImagePath: (row.char_image as string) ?? null,
          gender: (row.gender as string) ?? null,
          mediaId,
          mediaTitle: row.media_title as string,
          year: (row.year as number | null) ?? null,
          importance: (row.importance as number | null) ?? null,
          personIds: [],
          personNames: []
        },
        voices: new Map()
      }
      grouped.set(key, found)
    }
    const importance = (row.importance as number | null) ?? null
    if (
      found.item.importance == null ||
      (importance != null && importance < found.item.importance)
    ) {
      found.item.importance = importance
    }
    found.voices.set(row.person_id as number, row.person_name as string)
  }
  return [...grouped.values()].map(({ item, voices }) => ({
    ...item,
    personIds: [...voices.keys()],
    personNames: [...voices.values()]
  }))
}

// Titles with enough synopsis to be recognizable but not trivially short.
export function synopsisPool(filter: QuizSynopsisFilter = {}): QuizSynopsisItem[] {
  const db = getSqlite()
  const where: string[] = [`mi.synopsis IS NOT NULL AND LENGTH(mi.synopsis) >= 120`]
  if (filter.requireCover !== false) where.push('mi.cover_path IS NOT NULL')
  const params: unknown[] = []
  if (!filter.completedStatuses) statusClause(filter, where, params)
  typeClause(filter, where, params)

  const rows = db
    .prepare(
      `SELECT mi.id AS media_id, mi.media_type, mi.title, mi.title_original,
              mi.cover_path, mi.synopsis, mi.status,
              EXISTS (
                SELECT 1 FROM media_relation earlier
                WHERE earlier.media_id=mi.id AND UPPER(earlier.relation_type)='PREQUEL'
              ) AS has_earlier_relation,
              ${YEAR_EXPR} AS year,
              ${GENRE_CSV_EXPR} AS genre_csv
       FROM media_item mi
       WHERE ${where.join(' AND ')}
       ORDER BY mi.id`
    )
    .all(...params) as Record<string, unknown>[]

  const items: QuizSynopsisItem[] = rows.map((r) => ({
    mediaId: r.media_id as number,
    mediaType: r.media_type as QuizSynopsisItem['mediaType'],
    title: r.title as string,
    titleOriginal: (r.title_original as string) ?? null,
    coverPath: (r.cover_path as string) ?? null,
    synopsis: r.synopsis as string,
    status: (r.status as string) ?? null,
    year: (r.year as number | null) ?? null,
    genres: r.genre_csv ? String(r.genre_csv).split(',') : [],
    relationAliases: [],
    characterNames: [],
    hasEarlierRelation: Boolean(r.has_earlier_relation)
  }))
  if (items.length === 0) return []

  const byId = new Map(items.map((item) => [item.mediaId, item]))
  const ids = items.map((item) => item.mediaId)
  const slots = ids.map(() => '?').join(',')
  for (const row of db.prepare(
    `SELECT media_id, related_title FROM media_relation
     WHERE media_id IN (${slots}) AND related_title IS NOT NULL
     ORDER BY media_id, sort_order, id`
  ).all(...ids) as Array<{ media_id: number; related_title: string }>) {
    const item = byId.get(row.media_id)
    if (item && !item.relationAliases.includes(row.related_title)) {
      item.relationAliases.push(row.related_title)
    }
  }
  for (const row of db.prepare(
    `SELECT mc.media_id, ch.name, ch.name_native
     FROM media_character mc JOIN character ch ON ch.id=mc.character_id
     WHERE mc.media_id IN (${slots}) ORDER BY mc.media_id, mc.sort_order, ch.id`
  ).all(...ids) as Array<{ media_id: number; name: string; name_native: string | null }>) {
    const item = byId.get(row.media_id)
    if (!item) continue
    for (const name of [row.name, row.name_native]) {
      if (name && !item.characterNames.includes(name)) item.characterNames.push(name)
    }
  }

  const completed = new Set(filter.completedStatuses?.filter(Boolean) ?? [])
  if (filter.completedStatuses) {
    return items.filter((item) =>
      completed.has(item.status ?? '') || (filter.includeSafeUnseen === true && isLikelyFirstEntry(item))
    )
  }
  return items
}

// ---- finished-round history (song + Japanese quizzes) ----

export function logSession(input: QuizSessionInput): number {
  const db = getSqlite()
  const res = db
    .prepare(
      `INSERT INTO quiz_session (kind, score, total, best_streak, settings)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      input.kind,
      input.score,
      input.total,
      input.bestStreak,
      input.settings ? JSON.stringify(input.settings) : null
    )
  return Number(res.lastInsertRowid)
}

function mapSession(r: Record<string, unknown>): QuizSession {
  let settings: Record<string, unknown> | null = null
  try {
    settings = r.settings ? JSON.parse(r.settings as string) : null
  } catch {
    settings = null
  }
  return {
    id: r.id as number,
    kind: r.kind as QuizKind,
    score: r.score as number,
    total: r.total as number,
    bestStreak: r.best_streak as number,
    settings,
    playedAt: r.played_at as string
  }
}

// Time-attack / points kinds: the record is the best SCORE, not the best
// accuracy — ranking those by ratio would reward slow, careful play (arcade
// speed points) or be meaningless (shiritori's score IS its chain length,
// which used to fake this by logging score = total; now it just ranks here).
export const SCORE_RANKED_KINDS: ReadonlySet<QuizKind> = new Set<QuizKind>([
  'kanaRace',
  'readingRace',
  'conjRace',
  'songArcade',
  'guessTrackTheme',
  'guessTrackMusic',
  'shiritori',
  'imageReveal',
  'higherLower',
  'libraryGrid',
  'movieChainEasy',
  'movieChainNormal',
  'movieChainHard',
  'libraryle',
  'mysteryCareer',
  'linkWall',
  'footballPlayerGrid'
])

// Recent rounds + the personal best. "Best" is the highest accuracy among
// rounds of at least 5 questions (a lucky 1/1 endless round is not a record);
// ties go to the longer round, then the newer one. Score-ranked kinds order
// by score first (then accuracy).
export function history(kind: QuizKind, limit = 15, playMode: QuizPlayMode = 'solo'): QuizHistory {
  const db = getSqlite()
  const modeSql = `COALESCE(
    CASE WHEN json_valid(settings) THEN json_extract(settings, '$.playMode') END,
    'solo'
  ) = ?`
  const recent = (
    db
      .prepare(
        `SELECT * FROM quiz_session WHERE kind = ? AND ${modeSql}
         ORDER BY played_at DESC, id DESC LIMIT ?`
      )
      .all(kind, playMode, Math.max(1, Math.min(500, Math.floor(limit)))) as Record<string, unknown>[]
  ).map(mapSession)
  const policy = quizScorePolicy(kind)
  const correctSql = `COALESCE(
    CASE WHEN json_valid(settings) THEN json_extract(settings, '$.correct') END,
    score
  )`
  const order = policy === 'points'
    ? `score DESC, CAST(${correctSql} AS REAL) / total DESC, played_at DESC, id DESC`
    : `CAST(${correctSql} AS REAL) / total DESC, total DESC, played_at DESC, id DESC`
  const bestRow = playMode === 'party' || policy === 'party' || policy === 'tournament'
    ? undefined
    : (db
        .prepare(
          `SELECT * FROM quiz_session
           WHERE kind = ? AND ${modeSql} AND total >= ?
           ORDER BY ${order}
           LIMIT 1`
        )
        .get(kind, playMode, quizMinimumRecordSize(kind)) as Record<string, unknown> | undefined)
  const agg = db
    .prepare(
      `SELECT COUNT(*) AS n, COALESCE(MAX(best_streak), 0) AS streak
       FROM quiz_session WHERE kind = ? AND ${modeSql}`
    )
    .get(kind, playMode) as { n: number; streak: number }
  return {
    recent,
    best: bestRow ? mapSession(bestRow) : null,
    bestStreak: agg.streak,
    totalSessions: agg.n
  }
}
