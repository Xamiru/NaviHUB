import { memo, useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import EntityHeader from '../components/EntityHeader'
import BackButton from '../components/BackButton'
import AddToListMenu from '../components/AddToListMenu'
import CoverImage from '../components/CoverImage'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import EditorialDetailFrame, { RelationshipTrail } from '../components/EditorialDetailFrame'
import { pathForMedia, MEDIA_CONFIGS } from '../lib/mediaConfig'
import { chronologicalYear, formatBirthday } from '../lib/archiveDisplay'
import { buildCareerTimeline } from '../lib/personCareer'
import { crewRoleLabel } from '../lib/creatorCredits'
import { usePlayerControls } from '../lib/player'
import { useLeaveDeleted, usePersistedState } from '../lib/navState'
import { themeSongToTrack } from '../lib/themeTracks'
import { PauseIcon, PlayIcon } from '../components/PlayerIcons'
import type { PersonCredit, MediaType, ThemeSongEntry, ThemeSongFilter } from '@shared/types'

export default function PersonDetailPage() {
  const { id } = useParams()
  const personId = Number(id)
  const leaveDeleted = useLeaveDeleted()
  const qc = useQueryClient()
  const [typeFilter, setTypeFilter] = usePersistedState<MediaType | 'all'>('personCreditType', 'all')
  // Where the user came from: person lists and crew sections append ?role=…
  // (EntityListView, MediaDetailPage). Keep a selected crew role prominent
  // within its own list without moving that list above the picture-led roles.
  const [searchParams] = useSearchParams()
  const contextRole = searchParams.get('role')
  const prioritizeCrewRole =
    !!contextRole && contextRole !== 'actor' && contextRole !== 'voice_actor'

  const { data: person } = useQuery({
    queryKey: qk.people.get(personId),
    queryFn: () => api.people.get(personId)
  })
  const { data: credits = [] } = useQuery({
    queryKey: qk.people.credits(personId),
    queryFn: () => api.people.credits(personId)
  })
  // Theme-song artists: the songs they performed, listed under each anime in
  // the career chronology.
  const isArtist = credits.some((c) => c.role === 'artist')
  const songFilter: ThemeSongFilter = {
    media: { mediaType: 'anime' },
    artistId: personId,
    playableOnly: false
  }
  const { data: songs = [] } = useQuery({
    queryKey: qk.themes.list(songFilter),
    queryFn: () => api.themes.list(songFilter),
    enabled: isArtist
  })
  const player = usePlayerControls()

  // Group credits into acting (character-bearing) blocks per medium + a flat crew
  // list. This double-Map build runs over the whole credit list, so memoize it on
  // `credits` — otherwise it recomputes on every unrelated re-render. Declared
  // before the early return below so the hook order stays stable.
  const { staffRoles, actingByType, actingTypes, totalActing } = useMemo(() => {
    // Acting/voicing roles carry a character; crew roles don't. Splitting this
    // way works for anyone — a voice actor, a film actor, or a director — and a
    // person who does both shows up correctly in each section.
    const staffRoles = credits.filter((c) => !c.character)

    // Acting roles are grouped by medium (Anime vs Visual Novels vs Movies…) so a
    // seiyuu's anime and VN work read as separate blocks. Within each medium the
    // same character is collapsed (a role played across multiple seasons repeats
    // once, with a "+N" hint); since credits arrive importance-sorted the first is
    // the most prominent. Groups are ordered by MEDIA_CONFIGS, so a new media type
    // (e.g. games) slots in automatically once its config exists.
    const actingByType = new Map<MediaType, Map<number, { credit: PersonCredit; titles: number }>>()
    for (const c of credits) {
      if (!c.character) continue
      const type = c.media.mediaType
      let group = actingByType.get(type)
      if (!group) {
        group = new Map()
        actingByType.set(type, group)
      }
      const seen = group.get(c.character.id)
      if (seen) seen.titles++
      else group.set(c.character.id, { credit: c, titles: 1 })
    }
    const knownOrder = MEDIA_CONFIGS.map((cfg) => cfg.key)
    const actingTypes: MediaType[] = [
      ...knownOrder.filter((k) => actingByType.has(k)),
      ...[...actingByType.keys()].filter((k) => !knownOrder.includes(k))
    ]
    const totalActing = [...actingByType.values()].reduce((n, g) => n + g.size, 0)
    return { staffRoles, actingByType, actingTypes, totalActing }
  }, [credits])

  if (!person) return <PageStatus>Loading…</PageStatus>

  const typeLabel = (t: MediaType): string =>
    MEDIA_CONFIGS.find((cfg) => cfg.key === t)?.plural ?? t.replace(/_/g, ' ')

  // When arriving via a crew role, float that role's rows to the top of the
  // crew list (a director's directing above their writing/staff credits).
  // Stable sort, so within each half the importance order is preserved.
  const orderedStaff = prioritizeCrewRole
    ? [...staffRoles].sort(
        (a, b) => Number(b.role === contextRole) - Number(a.role === contextRole)
      )
    : staffRoles

  const chronology = buildCareerTimeline(credits)
  const birthday = formatBirthday(person.birthday)
  const chronologyTypes = [...new Set(chronology.map(({ media }) => media.mediaType))]
  // A remembered type this person no longer has credits in falls back to All.
  const activeType = typeFilter !== 'all' && chronologyTypes.includes(typeFilter) ? typeFilter : 'all'
  const shownChronology =
    activeType === 'all' ? chronology : chronology.filter(({ media }) => media.mediaType === activeType)
  const libraryBreakdown = chronologyTypes
    .map((t) => {
      const n = chronology.filter(({ media }) => media.mediaType === t).length
      // "1 game", not "1 games"; anime reads the same either way.
      const cfg = MEDIA_CONFIGS.find((c) => c.key === t)
      const label = n === 1 && cfg ? cfg.singular : typeLabel(t)
      return `${n} ${label.toLowerCase()}`
    })
    .join(' · ')

  // Known for: the user's own highest-scored titles this person worked on, so
  // the strip reflects their library rather than a global popularity rank.
  // One card per title and per character: a role played across several
  // seasons shows once, from its highest-scored title.
  const seenTitles = new Set<number>()
  const seenCharacters = new Set<number>()
  const knownFor = credits
    .filter((c) => c.media.score != null && prominentRole(c))
    .sort(
      (a, b) =>
        (b.media.score ?? 0) - (a.media.score ?? 0) ||
        (b.media.releaseDate ?? '').localeCompare(a.media.releaseDate ?? '')
    )
    .filter((c) => {
      if (seenTitles.has(c.media.id) || (c.character && seenCharacters.has(c.character.id))) return false
      seenTitles.add(c.media.id)
      if (c.character) seenCharacters.add(c.character.id)
      return true
    })
    .slice(0, 6)

  const songsByMedia = new Map<number, ThemeSongEntry[]>()
  for (const s of songs) {
    const list = songsByMedia.get(s.mediaId)
    if (list) list.push(s)
    else songsByMedia.set(s.mediaId, [s])
  }
  // Play queues every playable song in chronology order, so next/prev walk
  // the artist's career.
  const playable = chronology
    .flatMap(({ media }) => songsByMedia.get(media.id) ?? [])
    .filter((s) => s.audioPath || s.audioUrl)
  const playSong = (s: ThemeSongEntry): void => {
    player.playQueue(playable.map(themeSongToTrack), playable.indexOf(s))
  }

  const actingSection =
    totalActing > 0 &&
    actingTypes.map((type) => {
      const group = [...actingByType.get(type)!.values()]
      return (
        <Section key={type} title={`${typeLabel(type)} · ${group.length}`}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
            {group.map(({ credit, titles }) => (
              <RoleCard key={credit.character!.id} c={credit} titles={titles} />
            ))}
          </div>
        </Section>
      )
    })

  const crewSection = staffRoles.length > 0 && (
    <Section title={`Crew roles · ${staffRoles.length}`} className="mb-0">
      <div className="space-y-1.5">
        {orderedStaff.map((c) => (
          <Link
            key={c.creditId}
            to={pathForMedia(c.media)}
            className="flex items-center gap-2 text-sm bg-base-800 rounded-md px-3 py-2 hover:bg-base-700"
          >
            <span className="text-gray-500 capitalize w-20">{c.role}</span>
            <span className="font-medium">{c.media.title}</span>
          </Link>
        ))}
      </div>
    </Section>
  )

  return (
    <EditorialDetailFrame width="wide">
      <BackButton />
      <RelationshipTrail>
        <Link to="/people" className="hover:text-accent">People</Link>
        <span className="text-gray-600" aria-hidden="true">›</span>
        <span>{person.name}</span>
      </RelationshipTrail>
      <EntityHeader
        longTextLabel="Biography"
        initial={{
          name: person.name,
          native: person.nameNative ?? '',
          longText: person.bio ?? '',
          imgPath: person.photoPath
        }}
        facts={[
          ...(birthday ? [{ label: 'Born', value: birthday }] : []),
          {
            label: 'In your library',
            value: (
              <>
                {credits.length} credits
                {libraryBreakdown && <span className="block text-xs text-gray-400">{libraryBreakdown}</span>}
              </>
            )
          }
        ]}
        onSave={async (f) => {
          await api.people.upsert({
            id: personId,
            name: f.name,
            nameNative: f.native || null,
            bio: f.longText || null,
            photoPath: f.imgPath
          })
          await qc.invalidateQueries({ queryKey: qk.people.all })
        }}
        imageOverride={{
          kind: 'person',
          id: personId,
          onReverted: () => qc.invalidateQueries({ queryKey: qk.people.all })
        }}
        onDelete={async () => {
          await api.people.remove(personId)
          qc.invalidateQueries({ queryKey: qk.people.all })
          // Back to wherever the user came from (an actors/directors/artists
          // list, or a title's cast) — '/people' is specifically Voice Actors.
          leaveDeleted((path) => path === `/people/${personId}`, '/people')
        }}
        actions={<AddToListMenu kind="person" entityId={personId} />}
      >
        {knownFor.length > 0 && (
          <Section title="Known for" subtitle="Your highest-scored titles">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {knownFor.map((c) => (
                <Link key={c.media.id} to={pathForMedia(c.media)} className="group block min-w-0">
                  {/* A voiced role leads with the character, the title's cover
                      inset; live-action credits store the actor's headshot as
                      the character image, so they keep the poster alone. */}
                  {c.character && c.role !== 'actor' ? (
                    <div className="relative">
                      <CoverImage
                        path={c.character.imagePath ?? c.media.coverPath}
                        alt=""
                        thumbWidth={240}
                        rounded="rounded-lg"
                        className="aspect-[2/3] w-full transition-transform group-hover:scale-[1.03]"
                      />
                      <CoverImage
                        path={c.media.coverPath}
                        alt=""
                        thumbWidth={80}
                        rounded="rounded"
                        className="absolute bottom-1.5 right-1.5 aspect-[2/3] w-1/3 shadow-lg ring-2 ring-base-900"
                      />
                    </div>
                  ) : (
                    <CoverImage
                      path={c.media.coverPath}
                      alt=""
                      thumbWidth={240}
                      rounded="rounded-lg"
                      className="aspect-[2/3] w-full transition-transform group-hover:scale-[1.03]"
                    />
                  )}
                  <p className="mt-1.5 truncate text-sm text-white group-hover:text-accent">{c.media.title}</p>
                  <p className={`truncate text-xs text-gray-400 ${c.character || c.roleNote ? '' : 'capitalize'}`}>
                    {c.character ? `as ${c.character.name}` : crewRoleLabel(c)}
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {totalActing === 0 && staffRoles.length === 0 && (
          <Section title="Roles">
            <p className="text-sm text-gray-400">
              No roles yet. Add this person to a title&apos;s cast from its page.
            </p>
          </Section>
        )}

        {actingSection}

        {chronology.length > 0 && (
          <Section
            title={`Career chronology · ${shownChronology.length}`}
            subtitle="Oldest to newest"
            className={crewSection ? undefined : 'mb-0'}
            actions={
              chronologyTypes.length > 1 && (
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
                  {(['all', ...chronologyTypes] as const).map((t) => (
                    <button
                      key={t}
                      className={`pill !py-0.5 !text-xs ${activeType === t ? 'pill-active' : ''}`}
                      aria-pressed={activeType === t}
                      onClick={() => setTypeFilter(t)}
                    >
                      {t === 'all' ? 'All' : typeLabel(t)}
                    </button>
                  ))}
                </div>
              )
            }
          >
            <div className="card overflow-hidden p-0">
              {shownChronology.map(({ media, roleLabels }) => (
                <div key={media.id} className="border-t border-line-subtle first:border-t-0">
                  <Link
                    to={pathForMedia(media)}
                    className="group/timeline grid min-w-0 grid-cols-[48px_52px_minmax(0,1fr)] items-center gap-3 px-3 py-3 transition-colors hover:bg-surface-raised sm:grid-cols-[64px_56px_minmax(0,1fr)_minmax(160px,0.65fr)] sm:gap-4 sm:px-4"
                  >
                    <span className="text-xs font-medium tabular-nums text-ink-muted sm:text-sm">
                      {chronologicalYear(media.releaseDate)}
                    </span>
                    <CoverImage
                      path={media.coverPath}
                      alt=""
                      thumbWidth={112}
                      className="aspect-[2/3] h-[72px] w-12 transition-transform group-hover/timeline:scale-[1.03] sm:h-20 sm:w-14"
                    />
                    <span className="min-w-0 self-center">
                      <span className="block line-clamp-2 text-sm font-semibold text-ink-primary group-hover/timeline:text-accent">
                        {media.title}
                      </span>
                      <span className="mt-1 block text-xs capitalize text-ink-muted">
                        {typeLabel(media.mediaType)}
                      </span>
                      <span className="mt-1 block line-clamp-2 text-xs capitalize text-ink-secondary sm:hidden">
                        {roleLabels.join(' · ')}
                      </span>
                    </span>
                    <span className="hidden line-clamp-3 text-sm capitalize leading-5 text-ink-secondary sm:block">
                      {roleLabels.join(' · ')}
                    </span>
                  </Link>
                  {songsByMedia.has(media.id) && (
                    <ul className="space-y-1 pb-3 pl-[136px] pr-3 sm:pl-[168px] sm:pr-4">
                      {songsByMedia.get(media.id)!.map((s) => (
                        <ArtistSongRow key={s.themeId} song={s} onPlay={() => playSong(s)} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
        {crewSection}
      </EntityHeader>
    </EditorialDetailFrame>
  )
}

function ArtistSongRow({ song, onPlay }: { song: ThemeSongEntry; onPlay: () => void }) {
  const player = usePlayerControls()
  const hasAudio = !!(song.audioPath || song.audioUrl)
  const isCurrent = player.track?.id === `theme-${song.themeId}`
  const isPlaying = isCurrent && player.isPlaying
  const name = song.title ?? 'Untitled'
  return (
    <li className="flex min-w-0 items-center gap-2">
      <button
        onClick={() => (isCurrent ? player.toggle() : onPlay())}
        disabled={!hasAudio}
        title={!hasAudio ? 'No audio available' : isPlaying ? 'Pause' : 'Play'}
        aria-label={isPlaying ? `Pause ${name}` : `Play ${name}`}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs text-accent hover:bg-accent/30 disabled:opacity-30 disabled:hover:bg-accent/15"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      {song.slug && (
        <span className="chip shrink-0 bg-accent/20 px-1.5 py-0.5 text-[11px] text-accent">
          {song.slug}
        </span>
      )}
      <span className={`truncate text-sm ${isCurrent ? 'text-accent' : 'text-ink-secondary'}`}>
        {name}
      </span>
    </li>
  )
}

// Known for skips minor roles: a voiced character counts only when it sits in
// the top third of its title's cast (top ten for a small cast). Crew credits
// and casts with no order always count. castPosition is 0-based.
function prominentRole(c: PersonCredit): boolean {
  if (!c.character || c.castPosition == null) return true
  return c.castPosition < Math.max(10, Math.ceil(c.castSize / 3))
}

const RoleCard = memo(function RoleCard({ c, titles = 1 }: { c: PersonCredit; titles?: number }) {
  // Animated media shows the character's portrait (the role itself). For
  // live-action 'actor' credits TMDB has no character art — the stored
  // character image is just the actor's own headshot — so show the film/show
  // poster instead (otherwise a filmography is a wall of identical headshots).
  const liveAction = c.role === 'actor'
  const roleImage = liveAction ? c.media.coverPath : (c.character?.imagePath ?? c.media.coverPath)
  const altText = c.character?.name ?? c.media.title
  // The image links to what it shows: poster → the film, portrait → the
  // character; the title text below always links to the show.
  const imageTo =
    !liveAction && c.character ? `/characters/${c.character.id}` : pathForMedia(c.media)
  return (
    <div className="group">
      <Link to={imageTo}>
        <div className="aspect-[2/3] rounded-lg overflow-hidden">
          <CoverImage
            path={roleImage}
            alt={altText}
            rounded="rounded-lg"
            className="h-full w-full transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      {c.character && (
        <Link to={`/characters/${c.character.id}`}>
          <p className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-accent">
            {c.character.name}
          </p>
        </Link>
      )}
      <Link to={pathForMedia(c.media)}>
        <p className="text-xs text-gray-500 hover:text-accent line-clamp-1">
          {c.media.title}
          {titles > 1 && <span className="text-gray-400"> +{titles - 1}</span>}
        </p>
      </Link>
    </div>
  )
})
