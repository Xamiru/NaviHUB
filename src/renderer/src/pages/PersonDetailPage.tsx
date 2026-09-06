import { memo, useMemo } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import { chronologicalYear } from '../lib/archiveDisplay'
import { buildCareerTimeline } from '../lib/personCareer'
import type { PersonCredit, MediaType } from '@shared/types'

export default function PersonDetailPage() {
  const { id } = useParams()
  const personId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()
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
    <Section title={`Crew roles · ${staffRoles.length}`}>
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
        <span className="ml-auto tabular-nums text-gray-500">{credits.length} credits</span>
      </RelationshipTrail>
      <EntityHeader
        rounded="rounded-full"
        longTextLabel="Biography"
        initial={{
          name: person.name,
          native: person.nameNative ?? '',
          longText: person.bio ?? '',
          imgPath: person.photoPath
        }}
        onSave={async (f) => {
          await api.people.upsert({
            id: personId,
            name: f.name,
            nameNative: f.native || null,
            bio: f.longText || null,
            photoPath: f.imgPath
          })
          qc.invalidateQueries({ queryKey: qk.people.all })
        }}
        onDelete={async () => {
          await api.people.remove(personId)
          qc.invalidateQueries({ queryKey: qk.people.all })
          // Return to wherever the user came from (an actors/directors/artists
          // list, or a title's cast) rather than a hardcoded '/people' — that
          // route is specifically Voice Actors, wrong for a movie actor etc.
          navigate(-1)
        }}
        actions={<AddToListMenu kind="person" entityId={personId} />}
      />

      {totalActing === 0 && staffRoles.length === 0 && (
        <Section title="Roles">
          <p className="text-sm text-gray-400">
            No roles yet. Add this person to a title&apos;s cast from its page.
          </p>
        </Section>
      )}

      {actingSection}
      {crewSection}

      {chronology.length > 0 && (
        <Section
          title={`Career chronology · ${chronology.length}`}
          subtitle="Oldest to newest across every medium"
          className="mb-0"
        >
          <div className="card overflow-hidden p-0">
            {chronology.map(({ media, roleLabels }) => (
              <Link
                key={media.id}
                to={pathForMedia(media)}
                className="group/timeline grid min-w-0 grid-cols-[48px_52px_minmax(0,1fr)] items-center gap-3 border-t border-line-subtle px-3 py-3 transition-colors first:border-t-0 hover:bg-surface-raised sm:grid-cols-[64px_56px_minmax(0,1fr)_minmax(160px,0.65fr)] sm:gap-4 sm:px-4"
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
            ))}
          </div>
        </Section>
      )}
    </EditorialDetailFrame>
  )
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
