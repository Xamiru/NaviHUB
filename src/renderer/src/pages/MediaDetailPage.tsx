import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useScoreMax, useImageUrl } from '../lib/hooks'
import { usePlayer } from '../lib/player'
import { CAST_ROLES, type MediaConfig } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import type { MediaDetail, MediaCharacterEntry, ThemeSong } from '@shared/types'

export default function MediaDetailPage({ cfg }: { cfg: MediaConfig }) {
  const { id } = useParams()
  const mediaId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const scoreMax = useScoreMax()

  const { data: m, isLoading } = useQuery({
    queryKey: ['media', 'detail', mediaId],
    queryFn: () => api.media.get(mediaId)
  })

  const refresh = () => qc.invalidateQueries({ queryKey: ['media', 'detail', mediaId] })

  async function del() {
    if (!confirm(`Delete this ${cfg.singular.toLowerCase()} from your library? This cannot be undone.`))
      return
    await api.media.remove(mediaId)
    await qc.invalidateQueries({ queryKey: ['media'] })
    await qc.invalidateQueries({ queryKey: ['media-counts'] })
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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        className="text-sm text-gray-500 hover:text-gray-300 mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="grid grid-cols-[220px_1fr] gap-7">
        <div>
          <CoverImage
            path={m.coverPath}
            alt={m.title}
            rounded="rounded-xl"
            className="w-full aspect-[2/3]"
          />
          <div className="flex gap-2 mt-3">
            <Link to={`${cfg.basePath}/${m.id}/edit`} className="btn-ghost flex-1">
              Edit
            </Link>
            <button className="btn-danger" onClick={del}>
              Delete
            </button>
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
            <Stat label="Status" value={m.status ?? '—'} />
            <Stat label="My Score" value={m.score != null ? `${m.score} / ${scoreMax}` : '—'} />
            {anilistAvg != null && <Stat label="AniList Avg" value={`${anilistAvg} / ${scoreMax}`} />}
            {imdb != null && <Stat label="IMDb" value={`${imdb} / ${scoreMax}`} />}
            {rottenTomatoes != null && <Stat label="Rotten Tomatoes" value={`${rottenTomatoes}%`} />}
            <Stat label={cfg.progressStatLabel} value={cfg.formatProgressStat(m)} />
            <Stat label="Released" value={m.releaseDate ?? '—'} />
          </div>

          {m.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {m.tags.map((t) => (
                <span key={t.id} className="chip">
                  {t.name}
                </span>
              ))}
            </div>
          )}

          {m.synopsis && (
            <Section title="Synopsis">
              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                {m.synopsis}
              </p>
            </Section>
          )}

          {m.notes && (
            <Section title="My notes">
              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{m.notes}</p>
            </Section>
          )}

          <CompaniesSection cfg={cfg} m={m} onChange={refresh} />
        </div>
      </div>

      {/* Full-width below the cover/info, using the space under the Edit button */}
      <div className="mt-7">
        {cfg.hasThemes && <ThemesSection m={m} onChange={refresh} />}
        <CastSection cfg={cfg} m={m} onChange={refresh} />
        {cfg.hasCrew !== false && <StaffSection cfg={cfg} m={m} onChange={refresh} />}
      </div>
    </div>
  )
}

/* ---------------- Companies (studios / production) ---------------- */
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

  async function remove(linkId: number) {
    await api.mediaCompanies.remove(linkId)
    onChange()
  }

  return (
    <Section title={cfg.companyTitle}>
      <div className="flex flex-wrap gap-2">
        {m.companies.length === 0 && <span className="text-sm text-gray-600">None yet</span>}
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

  const list = m.characters
  const PAGE_SIZE = 24
  const pageCount = Math.ceil(list.length / PAGE_SIZE)
  const current = Math.min(page, Math.max(0, pageCount - 1))
  const shown = list.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE)

  async function removeChar(cid: number) {
    await api.media.removeCharacter(m.id, cid)
    onChange()
  }

  return (
    <Section title={`${cfg.castSectionTitle}${list.length ? ` · ${list.length}` : ''}`}>
      {list.length === 0 ? (
        <p className="text-sm text-gray-600 mb-3">Nothing here yet</p>
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
          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-3 mb-4 text-sm">
              <button
                className="btn-ghost py-1 px-3"
                disabled={current === 0}
                onClick={() => setPage(current - 1)}
              >
                ← Prev
              </button>
              <span className="text-gray-500">
                Page {current + 1} of {pageCount}
              </span>
              <button
                className="btn-ghost py-1 px-3"
                disabled={current >= pageCount - 1}
                onClick={() => setPage(current + 1)}
              >
                Next →
              </button>
            </div>
          )}
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
            <span className="text-xs text-gray-600">No one cast</span>
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

  return (
    <Section title={`Theme Songs${themes.length ? ` · ${themes.length}` : ''}`}>
      <div className="space-y-2 mb-2">
        {themes.length === 0 && (
          <p className="text-sm text-gray-600">
            {canFetch ? 'None imported yet.' : 'No theme songs.'}
          </p>
        )}
        {shown.map((t) => (
          <ThemeRow key={t.id} theme={t} animeTitle={m.title} />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-3 mb-3 text-sm">
          <button
            className="btn-ghost py-1 px-3"
            disabled={current === 0}
            onClick={() => setPage(current - 1)}
          >
            ← Prev
          </button>
          <span className="text-gray-500">
            {current * THEMES_PAGE_SIZE + 1}–{current * THEMES_PAGE_SIZE + shown.length} of{' '}
            {themes.length}
          </span>
          <button
            className="btn-ghost py-1 px-3"
            disabled={current >= pageCount - 1}
            onClick={() => setPage(current + 1)}
          >
            Next →
          </button>
        </div>
      )}
      {canFetch && (
        <div className="flex items-center gap-3">
          <button className="btn-ghost py-1 px-3 text-sm" disabled={busy} onClick={fetchThemes}>
            {busy ? 'Fetching…' : themes.length ? '↻ Refresh from AnimeThemes' : '⬇ Fetch theme songs'}
          </button>
          {note && <span className="text-xs text-gray-500">{note}</span>}
          {error && <span className="text-xs text-red-400">⚠ {error}</span>}
        </div>
      )}
    </Section>
  )
}

function ThemeRow({ theme, animeTitle }: { theme: ThemeSong; animeTitle: string }) {
  // Prefer the locally-downloaded copy; fall back to streaming the remote .ogg.
  const localUrl = useImageUrl(theme.audioPath)
  const src = localUrl ?? theme.audioUrl ?? undefined
  const player = usePlayer()
  const id = `theme-${theme.id}`
  const isCurrent = player.track?.id === id
  const isPlaying = isCurrent && player.isPlaying
  const artistNames = theme.artists.map((a) => a.name).join(', ')

  function onPlay() {
    if (!src) return
    player.play({
      id,
      src,
      title: theme.slug ? `${theme.slug} · ${theme.title ?? 'Untitled'}` : (theme.title ?? 'Untitled'),
      subtitle: artistNames || null,
      context: animeTitle
    })
  }

  return (
    <div
      className={`flex items-center gap-3 bg-base-800 rounded-md px-3 py-2.5 ${
        isCurrent ? 'ring-1 ring-accent/50' : ''
      }`}
    >
      <button
        onClick={onPlay}
        disabled={!src}
        title={!src ? 'No audio available' : isPlaying ? 'Pause' : 'Play'}
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

  async function remove(creditId: number) {
    await api.credits.remove(creditId)
    onChange()
  }

  return (
    <Section title={cfg.crewTitle}>
      <div className="space-y-1.5 mb-3">
        {staff.length === 0 && <span className="text-sm text-gray-600">No one yet</span>}
        {staff.map((c) => (
          <div
            key={c.creditId}
            className="flex items-center gap-2 text-sm bg-base-800 rounded-md px-3 py-2"
          >
            <span className="flex-1">
              <span className="text-gray-500 capitalize">{c.role}</span>
              {' · '}
              <Link to={`/people/${c.person.id}`} className="hover:text-accent font-medium">
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
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-gray-500">{label}</div>
      <div className="text-sm font-medium text-gray-200 mt-0.5">{value}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">{title}</h2>
      {children}
    </div>
  )
}
