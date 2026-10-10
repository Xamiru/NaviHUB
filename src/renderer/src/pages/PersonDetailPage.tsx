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
import { FilterPills } from '../components/PillGroup'
import Tabs, { TabPanel } from '../components/Tabs'
import EditorialDetailFrame, { RelationshipTrail } from '../components/EditorialDetailFrame'
import { pathForMedia, MEDIA_CONFIGS } from '../lib/mediaConfig'
import { chronologicalYear, formatBirthday } from '../lib/archiveDisplay'
import {
  buildCareerTimeline,
  groupActingRoles,
  pickKnownFor,
  type CareerTimelineEntry,
  type RoleGroupEntry,
  type RoleSort
} from '../lib/personCareer'
import { crewRoleLabel } from '../lib/creatorCredits'
import { usePlayerControls } from '../lib/player'
import { useLeaveDeleted, usePersistedState } from '../lib/navState'
import { completedStatusByType, useIncrementalList, useSettings } from '../lib/hooks'
import { themeSongToTrack } from '../lib/themeTracks'
import { PauseIcon, PlayIcon } from '../components/PlayerIcons'
import type { PersonCredit, MediaType, ThemeSongEntry, ThemeSongFilter } from '@shared/types'

type PersonView = 'roles' | 'chronology'

const ROLE_SORTS: { key: RoleSort; label: string }[] = [
  { key: 'prominence', label: 'Biggest roles' },
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' }
]

const typeLabel = (t: MediaType): string =>
  MEDIA_CONFIGS.find((cfg) => cfg.key === t)?.plural ?? t.replace(/_/g, ' ')

export default function PersonDetailPage() {
  const { id } = useParams()
  const personId = Number(id)
  const leaveDeleted = useLeaveDeleted()
  const qc = useQueryClient()
  const { data: settings } = useSettings()
  const [typeFilter, setTypeFilter] = usePersistedState<MediaType | 'all'>('personCreditType', 'all')
  const [langFilter, setLangFilter] = usePersistedState<string>('personCreditLang', 'all')
  const [viewChoice, setView] = usePersistedState<PersonView | null>('personView', null)
  const [roleSort, setRoleSort] = usePersistedState<RoleSort>('personRoleSort', 'prominence')
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
  const hasActing = credits.some((c) => c.character)
  const { data: costars = [] } = useQuery({
    queryKey: qk.people.costars(personId),
    queryFn: () => api.people.costars(personId),
    enabled: hasActing
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

  // Whole-career facts, independent of the page filter. Everything here walks
  // the full credit list, so it is memoized on the inputs that change it.
  const career = useMemo(() => {
    const chronology = buildCareerTimeline(credits)
    const types = [...new Set(chronology.map(({ media }) => media.mediaType))]
    // Dub language matters only for character credits (Japanese vs English
    // voices); offered as a filter when this person has more than one.
    const languages = [
      ...new Set(credits.filter((c) => c.character && c.language).map((c) => c.language!))
    ].sort()
    const breakdown = types
      .map((t) => {
        const n = chronology.filter(({ media }) => media.mediaType === t).length
        // "1 game", not "1 games"; anime reads the same either way.
        const cfg = MEDIA_CONFIGS.find((c) => c.key === t)
        const label = n === 1 && cfg ? cfg.singular : typeLabel(t)
        return `${n} ${label.toLowerCase()}`
      })
      .join(' · ')
    return { chronology, types, languages, breakdown, knownFor: pickKnownFor(credits) }
  }, [credits])

  // Titles the user has finished.
  const completed = useMemo(() => {
    const done = completedStatusByType(settings)
    return career.chronology.filter(
      ({ media }) => media.status != null && media.status === done.get(media.mediaType)
    ).length
  }, [career.chronology, settings])

  // A remembered filter this person has no credits in falls back to All.
  const activeType = typeFilter !== 'all' && career.types.includes(typeFilter) ? typeFilter : 'all'
  const activeLang = langFilter !== 'all' && career.languages.includes(langFilter) ? langFilter : 'all'

  const view = useMemo(() => {
    const shown = credits.filter(
      (c) =>
        (activeType === 'all' || c.media.mediaType === activeType) &&
        // A language filter narrows character credits only; crew stay.
        (activeLang === 'all' || !c.character || c.language === activeLang)
    )
    const acting = groupActingRoles(
      shown,
      MEDIA_CONFIGS.map((cfg) => cfg.key),
      roleSort
    )
    const staff = shown.filter((c) => !c.character)
    // When arriving via a crew role, float that role's rows to the top of the
    // crew list (a director's directing above their writing/staff credits).
    // Stable sort, so within each half the importance order is preserved.
    const orderedStaff = prioritizeCrewRole
      ? [...staff].sort((a, b) => Number(b.role === contextRole) - Number(a.role === contextRole))
      : staff
    return { acting, staff: orderedStaff, chronology: buildCareerTimeline(shown) }
  }, [credits, activeType, activeLang, roleSort, prioritizeCrewRole, contextRole])

  const songsByMedia = useMemo(() => {
    const map = new Map<number, ThemeSongEntry[]>()
    for (const s of songs) {
      const list = map.get(s.mediaId)
      if (list) list.push(s)
      else map.set(s.mediaId, [s])
    }
    return map
  }, [songs])

  if (!person) return <PageStatus>Loading…</PageStatus>

  // Play queues every playable song in chronology order, so next/prev walk
  // the artist's career.
  const playable = career.chronology
    .flatMap(({ media }) => songsByMedia.get(media.id) ?? [])
    .filter((s) => s.audioPath || s.audioUrl)
  const playSong = (s: ThemeSongEntry): void => {
    player.playQueue(playable.map(themeSongToTrack), playable.indexOf(s))
  }

  // No death date is stored, so an age would be wrong for anyone who has died.
  const born = formatBirthday(person.birthday)
  const anyScored = career.knownFor.some((c) => c.media.score != null)
  // The role grid is the picture-led view of an actor; a crew-only career
  // (director, mangaka, theme artist) reads best as its chronology.
  const activeView: PersonView = viewChoice ?? (hasActing ? 'roles' : 'chronology')
  const actingCount = view.acting.reduce((n, g) => n + g.entries.length, 0)

  const filters = (career.types.length > 1 || career.languages.length > 1) && (
    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
      {career.types.length > 1 && (
        <FilterPills
          label="Filter by type"
          options={[
            { key: 'all', label: 'All' },
            ...career.types.map((t) => ({ key: t, label: typeLabel(t) }))
          ]}
          value={activeType}
          onChange={(t) => setTypeFilter(t as MediaType | 'all')}
        />
      )}
      {career.languages.length > 1 && (
        <FilterPills
          label="Filter by language"
          options={[
            { key: 'all', label: 'Any language' },
            ...career.languages.map((l) => ({ key: l, label: l }))
          ]}
          value={activeLang}
          onChange={setLangFilter}
        />
      )}
    </div>
  )

  const crewList = view.staff.length > 0 && (
    <Section title={`Crew roles · ${view.staff.length}`} className="mb-0">
      <div className="card overflow-hidden p-0">
        {view.staff.map((c) => (
          <Link
            key={c.creditId}
            to={pathForMedia(c.media)}
            className="grid min-w-0 grid-cols-[minmax(0,10rem)_minmax(0,1fr)] items-center gap-3 border-t border-line-subtle px-3 py-2 text-sm first:border-t-0 hover:bg-surface-raised"
          >
            <span className="truncate capitalize text-ink-muted" title={crewRoleLabel(c)}>
              {crewRoleLabel(c)}
            </span>
            <span className="truncate font-medium text-ink-primary">{c.media.title}</span>
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
          ...(born ? [{ label: 'Born', value: born }] : []),
          {
            label: 'In your library',
            value: (
              <>
                {credits.length} credits
                {career.breakdown && (
                  <span className="block text-xs text-gray-400">{career.breakdown}</span>
                )}
              </>
            )
          },
          ...(career.chronology.length > 0
            ? [
                {
                  label: 'Completed',
                  value: `${completed} of ${career.chronology.length} titles`
                }
              ]
            : [])
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
        {career.knownFor.length > 0 && (
          <Section
            title="Known for"
            subtitle={anyScored ? 'Your highest-scored titles first' : 'Their biggest roles in your library, newest first'}
          >
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {career.knownFor.map((c) => (
                <KnownForCard key={c.media.id} c={c} />
              ))}
            </div>
          </Section>
        )}

        {credits.length === 0 && (
          <Section title="Roles">
            <p className="text-sm text-gray-400">
              No roles yet. Add this person to a title&apos;s cast from its page.
            </p>
          </Section>
        )}

        {credits.length > 0 && (
          <>
            <Tabs
              id="person-view"
              label="Career view"
              tabs={[
                { key: 'roles', label: 'Roles', count: actingCount + view.staff.length },
                { key: 'chronology', label: 'Chronology', count: view.chronology.length }
              ]}
              value={activeView}
              onChange={setView}
              className="mb-4"
            />
            {filters}
            <TabPanel tabsId="person-view" value={activeView} className={costars.length ? 'mb-8' : ''}>
              {activeView === 'roles' ? (
                <>
                  {view.acting.length > 0 && (
                    <FilterPills
                      label="Sort roles"
                      className="mb-4"
                      options={ROLE_SORTS}
                      value={roleSort}
                      onChange={(s) => setRoleSort(s as RoleSort)}
                    />
                  )}
                  {view.acting.map(({ type, entries }) => (
                    <RoleGrid key={type} title={`${typeLabel(type)} · ${entries.length}`} entries={entries} />
                  ))}
                  {crewList}
                  {view.acting.length === 0 && view.staff.length === 0 && (
                    <p className="text-sm text-gray-400">No roles match this filter.</p>
                  )}
                </>
              ) : (
                <Chronology
                  entries={view.chronology}
                  songsByMedia={songsByMedia}
                  onPlaySong={playSong}
                />
              )}
            </TabPanel>
          </>
        )}

        {costars.length > 0 && (
          <Section title="Often appears with" subtitle="Shared titles in your library" className="mb-0">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
              {costars.map(({ person: p, shared }) => (
                <Link
                  key={p.id}
                  to={`/people/${p.id}`}
                  className="group flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-raised"
                >
                  <CoverImage
                    path={p.photoPath}
                    alt=""
                    thumbWidth={80}
                    rounded="rounded-full"
                    className="h-11 w-11 shrink-0 object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ink-primary group-hover:text-accent">
                      {p.name}
                    </span>
                    <span className="block text-xs text-ink-muted">{shared} shared titles</span>
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </EntityHeader>
    </EditorialDetailFrame>
  )
}

function KnownForCard({ c }: { c: PersonCredit }) {
  return (
    <Link to={pathForMedia(c.media)} className="group block min-w-0">
      {/* A voiced role leads with the character, the title's cover inset;
          live-action credits store the actor's headshot as the character
          image, so they keep the poster alone. */}
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
  )
}

// One medium's role grid. A prolific seiyuu has hundreds of roles, so cards
// render in batches as the sentinel scrolls into view.
function RoleGrid({ title, entries }: { title: string; entries: RoleGroupEntry[] }) {
  const { visible, sentinelRef, hasMore } = useIncrementalList(entries, 48)
  return (
    <Section title={title}>
      {/* Denser than Known for, which stays the one large row on the page. */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-3">
        {visible.map(({ credit, titles }) => (
          <RoleCard key={credit.character!.id} c={credit} titles={titles} />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} />}
    </Section>
  )
}

function Chronology({
  entries,
  songsByMedia,
  onPlaySong
}: {
  entries: CareerTimelineEntry[]
  songsByMedia: Map<number, ThemeSongEntry[]>
  onPlaySong: (s: ThemeSongEntry) => void
}) {
  const { visible, sentinelRef, hasMore } = useIncrementalList(entries, 60)
  if (entries.length === 0) return <p className="text-sm text-gray-400">No titles match this filter.</p>
  return (
    <>
      <p className="mb-2 text-xs text-ink-muted">Oldest to newest</p>
      <div className="card overflow-hidden p-0">
        {visible.map(({ media, roleLabels }) => (
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
                  <ArtistSongRow key={s.themeId} song={s} onPlay={() => onPlaySong(s)} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} />}
    </>
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

const RoleCard = memo(function RoleCard({ c, titles }: { c: PersonCredit; titles: string[] }) {
  // Animated media shows the character's portrait (the role itself). For
  // live-action 'actor' credits TMDB has no character art — the stored
  // character image is just the actor's own headshot — so show the film/show
  // poster instead (otherwise a filmography is a wall of identical headshots).
  const liveAction = c.role === 'actor'
  const roleImage = liveAction ? c.media.coverPath : (c.character?.imagePath ?? c.media.coverPath)
  // The image links to what it shows: poster → the film, portrait → the
  // character; the title text below always links to the show. The image link
  // repeats a text link, so it is skipped by keyboard and screen readers.
  const imageTo =
    !liveAction && c.character ? `/characters/${c.character.id}` : pathForMedia(c.media)
  const others = titles.slice(1)
  return (
    <div className="group">
      <Link to={imageTo} tabIndex={-1} aria-hidden="true">
        <div className="aspect-[2/3] rounded-lg overflow-hidden">
          <CoverImage
            path={roleImage}
            alt=""
            thumbWidth={160}
            rounded="rounded-lg"
            className="h-full w-full transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      {c.character && (
        <Link to={`/characters/${c.character.id}`}>
          <p className="mt-1.5 text-xs font-medium leading-4 line-clamp-2 group-hover:text-accent">
            {c.character.name}
          </p>
        </Link>
      )}
      <p className="flex min-w-0 gap-1 text-xs text-gray-400">
        <Link to={pathForMedia(c.media)} className="truncate hover:text-accent">
          {c.media.title}
        </Link>
        {others.length > 0 && (
          <span className="shrink-0" title={`Also in: ${others.join(', ')}`}>
            +{others.length}
            <span className="sr-only"> more: {others.join(', ')}</span>
          </span>
        )}
      </p>
    </div>
  )
})
