import { useEffect, useState } from 'react'
import Pager from '../components/Pager'
import StatTile, { StatInline } from '../components/StatTile'
import ActionMenu from '../components/ActionMenu'
import Tabs, { type TabDef } from '../components/Tabs'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useScoreMax } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { usePlayer, type Track } from '../lib/player'
import {
  CAST_ROLES,
  fmtMinutesAsHours,
  isCompletedStatus,
  pathForMedia,
  type MediaConfig
} from '../lib/mediaConfig'
import { toast, toastError } from '../lib/toast'
import CoverImage from '../components/CoverImage'
import BackButton from '../components/BackButton'
import AddToListMenu from '../components/AddToListMenu'
import MangaChaptersSection from '../components/MangaChaptersSection'
import VideoEpisodesSection from '../components/VideoEpisodesSection'
import CoverageSection from '../components/japanese/CoverageSection'
import MediaImagesSection from '../components/MediaImagesSection'
import TorrentSearchDialog from '../components/TorrentSearchDialog'
import { torznabCategoriesFor } from '@shared/torrents'
import Section from '../components/Section'
import type {
  MediaDetail,
  MediaCharacterEntry,
  ThemeSong,
  MediaRelation,
  HltbTimes
} from '@shared/types'

type DetailTab = 'overview' | 'cast' | 'video' | 'media' | 'art'

export default function MediaDetailPage({ cfg }: { cfg: MediaConfig }) {
  const { id } = useParams()
  const mediaId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const scoreMax = useScoreMax()
  const [torrentsOpen, setTorrentsOpen] = useState(false)

  // The type's tab set. `mediaTabLabel` names the type-specific middle tab
  // (Theme Songs / Chapters / Playtime); absent = the type has no media tab
  // (movies, TV). ?tab= deep-links a tab (the Comprehension page uses
  // ?tab=media); the one-shot read seeds history-scoped state so Back from a
  // reader chapter still restores where you were.
  const tabs: TabDef<DetailTab>[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'cast', label: cfg.castSectionTitle },
    ...(cfg.hasVideoLibrary
      ? [{ key: 'video' as DetailTab, label: cfg.videoTabLabel ?? 'Video' }]
      : []),
    ...(cfg.mediaTabLabel ? [{ key: 'media' as DetailTab, label: cfg.mediaTabLabel }] : []),
    { key: 'art', label: 'Art' }
  ]
  const [params] = useSearchParams()
  const requested = params.get('tab') as DetailTab | null
  const [tab, setTab] = usePersistedState<DetailTab>(
    'detailTab',
    requested && tabs.some((t) => t.key === requested) ? requested : 'overview'
  )

  const { data: m, isLoading } = useQuery({
    queryKey: qk.media.detail(mediaId),
    queryFn: () => api.media.get(mediaId)
  })

  const refresh = () => qc.invalidateQueries({ queryKey: qk.media.detail(mediaId) })

  async function del() {
    if (!confirm(`Delete this ${cfg.singular.toLowerCase()} from your library? This cannot be undone.`))
      return
    await api.media.remove(mediaId)
    await qc.invalidateQueries({ queryKey: qk.media.all })
    await qc.invalidateQueries({ queryKey: qk.mediaCounts.all })
    navigate(cfg.basePath)
  }

  if (isLoading) return <div className="p-6 text-gray-500">Loading…</div>
  if (!m) return <div className="p-6 text-gray-500">Not found.</div>

  // Community scores captured into metadata at import time. AniList's averageScore
  // is 0–100, IMDb's is 0–10 — both scaled to the user's score range so they read
  // beside their own score (e.g. 8.5 / 10). Rotten Tomatoes stays a percentage.
  const meta = m.metadata as Record<string, unknown> | null
  const metaNum = (k: string): number | null => {
    const n = Number(meta?.[k])
    return Number.isFinite(n) && n > 0 ? n : null
  }
  const aniRaw = metaNum('averageScore')
  const anilistAvg = aniRaw != null ? ((aniRaw / 100) * scoreMax).toFixed(1) : null
  const imdbRaw = metaNum('imdbRating')
  const imdb = imdbRaw != null ? ((imdbRaw / 10) * scoreMax).toFixed(1) : null
  const rottenTomatoes = metaNum('rottenTomatoes')
  // VNDB rating is 0–100 like AniList's, scaled to the user's score range.
  const vndbRaw = metaNum('vndbRating')
  const vndbScore = vndbRaw != null ? ((vndbRaw / 100) * scoreMax).toFixed(1) : null
  // Metacritic (games, via RAWG) stays its familiar 0–100 score.
  const metacritic = metaNum('metacritic')
  // Open Library rating stored pre-scaled to 0–100 (stars × 20) at import.
  const olRaw = metaNum('olRating')
  const olScore = olRaw != null ? ((olRaw / 100) * scoreMax).toFixed(1) : null

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <BackButton />

      <div className="grid grid-cols-[220px_1fr] gap-7">
        <div>
          <CoverImage
            path={m.coverPath}
            alt={m.title}
            rounded="rounded-xl"
            className="w-full aspect-[2/3]"
          />
          {/* One filled action per screen: logging progress is the everyday
              one. Delete lives behind More, away from Edit's elbow. */}
          <div className="mt-3 space-y-2">
            <LogProgressButton cfg={cfg} m={m} />
            <Link to={`${cfg.basePath}/${m.id}/edit`} className="btn-ghost w-full">
              Edit
            </Link>
            <AddToListMenu kind="media" entityId={mediaId} fullWidth />
            <button className="btn-ghost w-full" onClick={() => setTorrentsOpen(true)}>
              Find torrents
            </button>
            <ActionMenu
              buttonClassName="btn-ghost w-full"
              items={[{ label: 'Delete…', danger: true, onSelect: del }]}
            />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-start gap-2">
            <h1 className="text-2xl font-bold">{m.title}</h1>
            {m.favorite && (
              <span className="text-yellow-400 text-xl" title="Favorite">
                ★
              </span>
            )}
          </div>
          {m.titleOriginal && <p className="text-gray-500 mb-4">{m.titleOriginal}</p>}

          <div className="flex flex-wrap gap-6 my-5">
            <StatInline label="Status" value={m.status ?? '—'} />
            <StatInline label="My Score" value={m.score != null ? `${m.score} / ${scoreMax}` : '—'} />
            {anilistAvg != null && (
              <StatInline label="AniList Avg" value={`${anilistAvg} / ${scoreMax}`} />
            )}
            {vndbScore != null && <StatInline label="VNDB" value={`${vndbScore} / ${scoreMax}`} />}
            {imdb != null && <StatInline label="IMDb" value={`${imdb} / ${scoreMax}`} />}
            {rottenTomatoes != null && (
              <StatInline label="Rotten Tomatoes" value={`${rottenTomatoes}%`} />
            )}
            {metacritic != null && <StatInline label="Metacritic" value={`${metacritic} / 100`} />}
            {olScore != null && <StatInline label="Open Library" value={`${olScore} / ${scoreMax}`} />}
            <StatInline label={cfg.progressStatLabel} value={cfg.formatProgressStat(m)} />
            <StatInline label={cfg.timesConsumedLabel} value={String(m.rewatchCount)} />
            <StatInline label="Released" value={m.releaseDate ?? '—'} />
          </div>

          {m.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {m.tags.map((t) => (
                <Link key={t.id} to={`/tags/${t.id}`} className="chip hover:text-accent">
                  {t.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Tabs className="mt-4 mb-6" value={tab} onChange={setTab} tabs={tabs} />

      {tab === 'overview' && (
        <>
          {m.synopsis && (
            <Section className="mb-6" title="Synopsis">
              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                {m.synopsis}
              </p>
            </Section>
          )}
          {m.notes && (
            <Section className="mb-6" title="My notes">
              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{m.notes}</p>
            </Section>
          )}
          <CompaniesSection cfg={cfg} m={m} onChange={refresh} />
          <RelatedSection m={m} />
        </>
      )}

      {tab === 'cast' && (
        <>
          <CastSection cfg={cfg} m={m} onChange={refresh} />
          {cfg.hasCrew !== false && <StaffSection cfg={cfg} m={m} onChange={refresh} />}
        </>
      )}

      {tab === 'video' && (
        <>
          <VideoEpisodesSection m={m} />
          {/* Subtitle text feeds the same comprehension scan / prep deck as
              manga OCR (seriesText.ts:seriesCorpus), so anime gets it free —
              but only where a Japanese track is plausible. */}
          {cfg.key === 'anime' && <CoverageSection m={m} />}
        </>
      )}

      {tab === 'media' && (
        <>
          {cfg.hasPlaytimes && <PlaytimeSection m={m} onChange={refresh} />}
          {cfg.hasLocalReader && <MangaChaptersSection m={m} />}
          {/* Comprehension coverage is a Japanese-learning feature — manga only,
              not every type with a local reader (books are English reading). */}
          {cfg.key === 'manga' && <CoverageSection m={m} />}
          {cfg.hasThemes && <ThemesSection m={m} onChange={refresh} />}
        </>
      )}

      {tab === 'art' && (
        <>
          <MediaImagesSection m={m} kind="wallpaper" />
          {cfg.hasFanArt && <MediaImagesSection m={m} kind="fanart" />}
        </>
      )}

      {torrentsOpen && (
        <TorrentSearchDialog
          heading={m.title}
          query={m.title}
          categories={torznabCategoriesFor(m.mediaType)}
          onClose={() => setTorrentsOpen(false)}
        />
      )}
    </div>
  )
}

/* ---------------- Companies (studios / production) ---------------- */
// HowLongToBeat-style time formatting, with "—" for missing values.
// One-click "I watched/read another one". Main owns the rules
// (@shared/mediaProgress): progress + status promotion, and a finished title
// wraps into a fresh pass rather than running past its total. If a checklist
// item covers this media type, the same call credits today's board.
function LogProgressButton({ cfg, m }: { cfg: MediaConfig; m: MediaDetail }) {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)

  const finished = isCompletedStatus(m.status) || (!!m.totalUnits && m.progress >= m.totalUnits)
  const label = finished
    ? 'Log another pass'
    : cfg.logUnitLabel
      ? `+1 ${cfg.logUnitLabel}`
      : `Mark ${(cfg.defaultStatuses[1] ?? 'completed').toLowerCase()}`

  async function log(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.media.logProgress(m.id)
      await qc.invalidateQueries({ queryKey: qk.media.all })
      await qc.invalidateQueries({ queryKey: qk.checklist.all })
      if (res.startedRewatch) toast(`${res.title} — pass #${res.rewatchCount} started`, 'success')
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      className="btn-ghost w-full mt-2"
      onClick={log}
      disabled={busy}
      title={
        finished
          ? 'Starts a new pass and counts it in your times-consumed tally'
          : 'Advances progress, and ticks a matching checklist item if you have one'
      }
    >
      {label}
    </button>
  )
}

function fmtPlaytime(minutes: number | null | undefined): string {
  if (minutes == null || minutes <= 0) return '—'
  return fmtMinutesAsHours(minutes)
}

// Play-time estimates for games + VNs (cfg.hasPlaytimes): VNDB's average for
// VNs, HowLongToBeat's Main / Main+Extras / Completionist boxes for both.
// Games get HLTB filled automatically at import; the button covers items
// imported before that existed, failed lookups, and refreshes.
function PlaytimeSection({ m, onChange }: { m: MediaDetail; onChange: () => void }) {
  const meta = (m.metadata ?? {}) as Record<string, unknown>
  const hltb = (meta.hltb as HltbTimes | undefined) ?? null
  const isVn = m.mediaType === 'visual_novel'
  const vndbVotes = typeof meta.vndbLengthVotes === 'number' ? meta.vndbLengthVotes : null
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchTimes() {
    setBusy(true)
    setError(null)
    try {
      const res = await api.hltb.fetch(m.id)
      if (res) onChange()
      else setError('No matching entry found on HowLongToBeat.')
    } catch {
      setError('HowLongToBeat lookup failed — try again in a bit.')
    } finally {
      setBusy(false)
    }
  }

  const boxes: { label: string; minutes: number | null; sub?: string }[] = []
  // VN average play time comes from VNDB votes (stored in totalUnits, minutes).
  if (isVn && m.totalUnits != null && m.totalUnits > 0) {
    boxes.push({
      label: 'Average',
      minutes: m.totalUnits,
      sub: vndbVotes ? `VNDB · ${vndbVotes} votes` : 'VNDB'
    })
  }
  if (hltb) {
    const polled = (n?: number) => (n ? `${n} polled` : undefined)
    boxes.push(
      { label: 'Main Story', minutes: hltb.main, sub: polled(hltb.mainCount) },
      { label: 'Main + Extras', minutes: hltb.mainExtra, sub: polled(hltb.mainExtraCount) },
      { label: 'Completionist', minutes: hltb.completionist, sub: polled(hltb.completionistCount) },
      { label: 'All Styles', minutes: hltb.allStyles, sub: polled(hltb.allStylesCount) }
    )
  }

  return (
    <Section className="mb-6" title="How long to beat">
      {boxes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {boxes.map((b) => (
            <StatTile
              key={b.label}
              label={b.label}
              value={fmtPlaytime(b.minutes)}
              sub={b.sub ?? undefined}
              accent={!!b.minutes}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No play-time estimates yet.</p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
        <button className="btn-ghost text-xs" onClick={fetchTimes} disabled={busy}>
          {busy
            ? 'Fetching…'
            : hltb
              ? 'Refresh from HowLongToBeat'
              : '⏱ Fetch from HowLongToBeat'}
        </button>
        {/* Surface the matched entry so a wrong match is easy to catch */}
        {hltb && hltb.name && hltb.name.toLowerCase() !== m.title.toLowerCase() && (
          <span className="text-gray-500">Matched: “{hltb.name}”</span>
        )}
        {error && <span className="text-red-400">{error}</span>}
      </div>
    </Section>
  )
}

function CompaniesSection({
  cfg,
  m,
  onChange
}: {
  cfg: MediaConfig
  m: MediaDetail
  onChange: () => void
}) {
  // Imported titles get their companies from the source (and re-import prunes/
  // refreshes them), so manual removal doesn't apply — hide the × on those.
  const imported = !!m.externalSource
  const qc = useQueryClient()

  async function remove(linkId: number) {
    await api.mediaCompanies.remove(linkId)
    qc.invalidateQueries({ queryKey: qk.companies.all })
    onChange()
  }

  return (
    <Section className="mb-6" title={cfg.companyTitle}>
      <div className="flex flex-wrap gap-2">
        {m.companies.length === 0 && <span className="text-sm text-gray-400">None yet</span>}
        {m.companies.map((c) => (
          <span key={c.id} className="chip">
            <Link to={`/studios/${c.company.id}`} className="hover:text-accent">
              {c.company.name}
            </Link>
            <span className="text-gray-500">· {c.role.replace(/_/g, ' ')}</span>
            {!imported && (
              <button className="text-gray-500 hover:text-red-400" onClick={() => remove(c.id)}>
                ×
              </button>
            )}
          </span>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Cast (person + character) ---------------- */
function CastSection({
  cfg,
  m,
  onChange
}: {
  cfg: MediaConfig
  m: MediaDetail
  onChange: () => void
}) {
  const [page, setPage] = usePersistedState('castPage', 0)
  const imported = !!m.externalSource
  const qc = useQueryClient()

  const list = m.characters
  const PAGE_SIZE = 24
  const pageCount = Math.ceil(list.length / PAGE_SIZE)
  const current = Math.min(page, Math.max(0, pageCount - 1))
  const shown = list.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE)

  async function removeChar(cid: number) {
    await api.media.removeCharacter(m.id, cid)
    // The repo also drops the character's voice credits on this work.
    qc.invalidateQueries({ queryKey: qk.characters.all })
    qc.invalidateQueries({ queryKey: qk.people.all })
    onChange()
  }

  return (
    <Section className="mb-6" title={`${cfg.castSectionTitle}${list.length ? ` · ${list.length}` : ''}`}>
      {list.length === 0 ? (
        <p className="text-sm text-gray-400 mb-3">Nothing here yet</p>
      ) : (
        <>
          <div
            className={`grid gap-3 mb-3 ${
              cfg.castLayout === 'character-only' ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2'
            }`}
          >
            {shown.map((e) =>
              cfg.castLayout === 'actor' ? (
                <ActorCard
                  key={e.character.id}
                  entry={e}
                  onRemove={imported ? undefined : () => removeChar(e.character.id)}
                />
              ) : cfg.castLayout === 'character-only' ? (
                <CharacterOnlyCard
                  key={e.character.id}
                  entry={e}
                  onRemove={imported ? undefined : () => removeChar(e.character.id)}
                />
              ) : (
                <CharacterCard
                  key={e.character.id}
                  entry={e}
                  showLanguage={cfg.castShowLanguage}
                  onRemove={imported ? undefined : () => removeChar(e.character.id)}
                />
              )
            )}
          </div>
          <div className="mb-4 flex justify-center">
            <Pager page={current} pageCount={pageCount} onChange={setPage} />
          </div>
        </>
      )}
    </Section>
  )
}

// Actor-centric card (movies/TV): a single actor portrait, the actor's name,
// and the role they play as a subtitle. The "character" entity here is just the
// actor's credit, so its image is the actor's photo — showing two would be
// redundant. Falls back to the character if no actor is cast.
function ActorCard({
  entry,
  onRemove
}: {
  entry: MediaCharacterEntry
  onRemove?: () => void
}) {
  const { character, voices } = entry
  const actor = voices[0]?.person
  const photo = actor?.photoPath ?? character.imagePath
  return (
    <div className="group relative flex items-stretch bg-base-800 rounded-md overflow-hidden h-24">
      <Link
        to={actor ? `/people/${actor.id}` : `/characters/${character.id}`}
        className="flex items-center gap-3 flex-1 min-w-0 hover:bg-base-700 transition-colors"
      >
        <CoverImage
          path={photo}
          alt={actor?.name ?? character.name}
          rounded="rounded-none"
          className="w-[72px] h-24 shrink-0"
        />
        <div className="min-w-0 pr-2">
          <p className="text-[15px] font-semibold truncate leading-tight">
            {actor?.name ?? character.name}
          </p>
          {actor && (
            <p className="text-[13px] text-gray-500 truncate leading-tight mt-0.5">
              as{' '}
              <Link to={`/characters/${character.id}`} className="hover:text-accent">
                {character.name}
              </Link>
            </p>
          )}
        </div>
      </Link>
      {onRemove && (
        <button
          className="absolute top-1 right-1 hidden group-hover:flex items-center justify-center w-5 h-5 rounded-full bg-black/70 text-gray-300 hover:text-red-400 text-sm leading-none"
          onClick={onRemove}
          title="Remove cast member"
        >
          ×
        </button>
      )}
    </div>
  )
}

// Character card: portrait + name on the left, the person(s) who play/voice them
// on the right. A character with more than one (young/adult) lists them all.
function CharacterCard({
  entry,
  showLanguage,
  onRemove
}: {
  entry: MediaCharacterEntry
  showLanguage: boolean
  onRemove?: () => void
}) {
  const { character, voices } = entry
  const primary = voices[0]
  return (
    <div className="group relative flex items-stretch bg-base-800 rounded-md overflow-hidden h-24">
      <Link
        to={`/characters/${character.id}`}
        className="flex items-center gap-3 flex-1 min-w-0 hover:bg-base-700 transition-colors"
      >
        <CoverImage
          path={character.imagePath}
          alt={character.name}
          rounded="rounded-none"
          className="w-[72px] h-24 shrink-0"
        />
        <span className="text-[15px] font-semibold truncate pr-1 leading-tight">
          {character.name}
        </span>
      </Link>
      <div className="flex items-center gap-3 flex-1 min-w-0 justify-end text-right">
        <div className="min-w-0 pl-1">
          {voices.length === 0 ? (
            <span className="text-xs text-gray-400">No one cast</span>
          ) : (
            voices.map((v) => (
              <p key={v.creditId} className="text-[14px] truncate leading-tight">
                <Link to={`/people/${v.person.id}`} className="hover:text-accent">
                  {v.person.name}
                </Link>
                {showLanguage && v.language && (
                  <span className="text-xs text-gray-500"> · {v.language}</span>
                )}
              </p>
            ))
          )}
        </div>
        {primary && (
          <Link to={`/people/${primary.person.id}`} className="shrink-0">
            <CoverImage
              path={primary.person.photoPath}
              alt={primary.person.name}
              rounded="rounded-none"
              className="w-[72px] h-24"
            />
          </Link>
        )}
      </div>
      {onRemove && (
        <button
          className="absolute top-1 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center justify-center w-5 h-5 rounded-full bg-black/70 text-gray-300 hover:text-red-400 text-sm leading-none"
          onClick={onRemove}
          title="Remove character"
        >
          ×
        </button>
      )}
    </div>
  )
}

// Character-only card (manga): just the character portrait + name. Manga
// characters have no one voicing/playing them, so there's no person column.
function CharacterOnlyCard({
  entry,
  onRemove
}: {
  entry: MediaCharacterEntry
  onRemove?: () => void
}) {
  const { character } = entry
  return (
    <div className="group relative bg-base-800 rounded-md overflow-hidden">
      <Link to={`/characters/${character.id}`} className="block hover:bg-base-700 transition-colors">
        <CoverImage
          path={character.imagePath}
          alt={character.name}
          rounded="rounded-none"
          className="w-full aspect-[3/4]"
        />
        <p className="text-[13px] font-medium truncate px-2 py-1.5 leading-tight">
          {character.name}
        </p>
      </Link>
      {onRemove && (
        <button
          className="absolute top-1 right-1 hidden group-hover:flex items-center justify-center w-5 h-5 rounded-full bg-black/70 text-gray-300 hover:text-red-400 text-sm leading-none"
          onClick={onRemove}
          title="Remove character"
        >
          ×
        </button>
      )}
    </div>
  )
}

/* ---------------- Theme songs (anime OP/ED) ---------------- */
const THEMES_PAGE_SIZE = 10
function ThemesSection({ m, onChange }: { m: MediaDetail; onChange: () => void }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [page, setPage] = usePersistedState('themePage', 0)
  // Themes come from AnimeThemes matched on the AniList id.
  const canFetch = m.externalSource === 'anilist' && !!m.externalId

  async function fetchThemes() {
    setBusy(true)
    setError(null)
    setNote(null)
    try {
      const s = await api.themes.import(m.id)
      setNote(
        s.songs === 0
          ? 'No theme songs catalogued for this anime on AnimeThemes.'
          : `Imported ${s.songs} song${s.songs === 1 ? '' : 's'} · ${s.artists} artist${s.artists === 1 ? '' : 's'}.`
      )
      onChange()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Theme import failed')
    } finally {
      setBusy(false)
    }
  }

  const themes = m.themes
  const pageCount = Math.ceil(themes.length / THEMES_PAGE_SIZE)
  const current = Math.min(page, Math.max(0, pageCount - 1))
  const shown = themes.slice(current * THEMES_PAGE_SIZE, current * THEMES_PAGE_SIZE + THEMES_PAGE_SIZE)

  // Playing any theme queues the whole anime's playable OP/EDs (across pages),
  // so the bar's next/prev walk this anime's songs. Src resolution is lazy in
  // the player, so this is just a cheap mapping.
  const player = usePlayer()
  const playable = themes.filter((t) => t.audioPath || t.audioUrl)
  function playTheme(theme: ThemeSong) {
    const start = playable.findIndex((t) => t.id === theme.id)
    if (start < 0) return
    const tracks: Track[] = playable.map((t) => ({
      id: `theme-${t.id}`,
      audioPath: t.audioPath,
      audioUrl: t.audioUrl,
      title: t.slug ? `${t.slug} · ${t.title ?? 'Untitled'}` : (t.title ?? 'Untitled'),
      subtitle: t.artists.map((a) => a.name).join(', ') || null,
      context: m.title,
      coverPath: m.coverPath,
      mediaId: m.id
    }))
    player.playQueue(tracks, start)
  }

  return (
    <Section className="mb-6" title={`Theme Songs${themes.length ? ` · ${themes.length}` : ''}`}>
      <div className="space-y-2 mb-2">
        {themes.length === 0 && (
          <p className="text-sm text-gray-400">
            {canFetch ? 'None imported yet.' : 'No theme songs.'}
          </p>
        )}
        {shown.map((t) => (
          <ThemeRow key={t.id} theme={t} onPlay={() => playTheme(t)} />
        ))}
      </div>
      <div className="mb-3 flex justify-center">
        <Pager
          page={current}
          pageCount={pageCount}
          onChange={setPage}
          label={`${current * THEMES_PAGE_SIZE + 1}–${current * THEMES_PAGE_SIZE + shown.length} of ${themes.length}`}
        />
      </div>
      {canFetch && (
        <div className="flex items-center gap-3">
          <button className="btn-ghost py-1 px-3 text-sm" disabled={busy} onClick={fetchThemes}>
            {busy ? 'Fetching…' : themes.length ? 'Refresh from AnimeThemes' : 'Fetch theme songs'}
          </button>
          {note && <span className="text-xs text-gray-500">{note}</span>}
          {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
      )}
    </Section>
  )
}

function ThemeRow({ theme, onPlay }: { theme: ThemeSong; onPlay: () => void }) {
  // The player resolves local-vs-remote audio lazily when the track starts, so
  // the row no longer pre-checks the local file (one IPC per row saved).
  const hasAudio = !!(theme.audioPath || theme.audioUrl)
  const player = usePlayer()
  const qc = useQueryClient()
  const id = `theme-${theme.id}`
  const isCurrent = player.track?.id === id
  const isPlaying = isCurrent && player.isPlaying

  // Same heart as the Songs page (/anime/songs), optimistic then invalidated.
  const [favorite, setFavorite] = useState(theme.favorite)
  useEffect(() => setFavorite(theme.favorite), [theme.favorite])
  async function toggleFavorite(): Promise<void> {
    const next = !favorite
    setFavorite(next)
    await api.themes.setFavorite(theme.id, next)
    qc.invalidateQueries({ queryKey: qk.themes.all })
  }

  return (
    <div
      className={`group flex items-center gap-3 bg-base-800 rounded-md px-3 py-2.5 ${
        isCurrent ? 'ring-1 ring-accent/50' : ''
      }`}
    >
      <button
        onClick={() => (isCurrent ? player.toggle() : onPlay())}
        disabled={!hasAudio}
        title={!hasAudio ? 'No audio available' : isPlaying ? 'Pause' : 'Play'}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs bg-accent/15 text-accent hover:bg-accent/30 disabled:opacity-30 disabled:hover:bg-accent/15"
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {theme.slug && (
            <span className="chip bg-accent/20 text-accent text-[11px] px-1.5 py-0.5 shrink-0">
              {theme.slug}
            </span>
          )}
          <span className="text-sm font-medium truncate">{theme.title ?? 'Untitled'}</span>
        </div>
        {theme.artists.length > 0 && (
          <p className="text-xs text-gray-500 truncate mt-0.5">
            by{' '}
            {theme.artists.map((a, i) => (
              <span key={a.id}>
                {i > 0 && ', '}
                <Link to={`/people/${a.id}`} className="hover:text-accent">
                  {a.name}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
      <button
        className={`px-1 text-sm ${
          favorite ? 'text-accent' : 'text-gray-600 opacity-0 group-hover:opacity-100'
        } hover:text-accent`}
        title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={toggleFavorite}
      >
        {favorite ? '♥' : '♡'}
      </button>
    </div>
  )
}

/* ---------------- Related titles (seasons + manga source) ---------------- */
const RELATION_LABELS: Record<string, string> = {
  PREQUEL: 'Prequel',
  SEQUEL: 'Sequel',
  PARENT: 'Parent story',
  SIDE_STORY: 'Side story',
  ALTERNATIVE: 'Alternative',
  SPIN_OFF: 'Spin-off',
  SOURCE: 'Source',
  ADAPTATION: 'Adaptation'
}

// Logical reading order for the season chain, then side material, then source.
const RELATION_ORDER = [
  'PREQUEL',
  'SEQUEL',
  'PARENT',
  'SIDE_STORY',
  'SPIN_OFF',
  'ALTERNATIVE',
  'SOURCE',
  'ADAPTATION'
]

// Un-imported relations are only hints, so cap them — big franchises (One Piece
// has 42) would otherwise bury the page. Every in-library relation is always
// shown; the cap trims only the greyed ones, with a "+N more" note.
const GREYED_CAP = 8

function RelatedSection({ m }: { m: MediaDetail }) {
  if (m.relations.length === 0) return null
  // Order each group by relation type so the season chain reads top-to-bottom
  // instead of following AniList's arbitrary edge order.
  const byType = (a: MediaRelation, b: MediaRelation) =>
    RELATION_ORDER.indexOf(a.relationType) - RELATION_ORDER.indexOf(b.relationType)
  const inLibrary = m.relations.filter((r) => r.media).sort(byType)
  const greyed = m.relations.filter((r) => !r.media).sort(byType)
  const shown = [...inLibrary, ...greyed.slice(0, GREYED_CAP)]
  const hidden = greyed.length - Math.min(greyed.length, GREYED_CAP)
  return (
    <Section className="mb-6" title={`Related · ${shown.length}`}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
        {shown.map((r, i) => (
          <RelatedCard key={i} r={r} />
        ))}
      </div>
      {hidden > 0 && (
        <p className="mt-2 text-xs text-gray-400">+{hidden} more not in your library</p>
      )}
    </Section>
  )
}

// A related title: links to the local item when imported, otherwise a greyed,
// non-clickable placeholder that hints at what to import next.
function RelatedCard({ r }: { r: MediaRelation }) {
  const label = RELATION_LABELS[r.relationType] ?? r.relationType.toLowerCase().replace(/_/g, ' ')
  const body = (
    <>
      <div className="aspect-[2/3] rounded-lg overflow-hidden">
        <CoverImage
          path={r.media?.coverPath ?? null}
          alt={r.title}
          rounded="rounded-lg"
          className="h-full w-full transition-transform group-hover:scale-105"
        />
      </div>
      <p className="mt-1.5 text-[10px] uppercase tracking-widest text-accent/80">{label}</p>
      <p className="text-xs font-medium line-clamp-2 leading-tight group-hover:text-accent">
        {r.title}
      </p>
    </>
  )
  if (r.media) {
    return (
      <Link to={pathForMedia(r.media)} className="group block">
        {body}
      </Link>
    )
  }
  return (
    <div className="opacity-45" title="Not in your library yet">
      {body}
    </div>
  )
}

/* ---------------- Staff / Crew ---------------- */
function StaffSection({
  cfg,
  m,
  onChange
}: {
  cfg: MediaConfig
  m: MediaDetail
  onChange: () => void
}) {
  // Artists (theme-song singers) have their own Theme Songs section, so keep them
  // out of the generic staff/crew list even though they're credits too.
  const staff = m.cast.filter((c) => !CAST_ROLES.includes(c.role) && c.role !== 'artist')
  const imported = !!m.externalSource
  const qc = useQueryClient()

  async function remove(creditId: number) {
    await api.credits.remove(creditId)
    qc.invalidateQueries({ queryKey: qk.people.all })
    onChange()
  }

  return (
    <Section className="mb-6" title={cfg.crewTitle}>
      <div className="space-y-1.5 mb-3">
        {staff.length === 0 && <span className="text-sm text-gray-400">No one yet</span>}
        {staff.map((c) => (
          <div
            key={c.creditId}
            className="flex items-center gap-2 text-sm bg-base-800 rounded-md px-3 py-2"
          >
            <span className="flex-1">
              <span className="text-gray-500 capitalize">{c.role}</span>
              {' · '}
              {/* ?role= makes the person page lead with crew work, not acting */}
              <Link
                to={`/people/${c.person.id}?role=${c.role}`}
                className="hover:text-accent font-medium"
              >
                {c.person.name}
              </Link>
            </span>
            {!imported && (
              <button
                className="text-gray-500 hover:text-red-400"
                onClick={() => remove(c.creditId)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- small helpers ---------------- */


