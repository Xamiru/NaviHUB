import { memo, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import EntityHeader from '../components/EntityHeader'
import AddToListMenu from '../components/AddToListMenu'
import CoverImage from '../components/CoverImage'
import { pathForMedia, MEDIA_CONFIGS } from '../lib/mediaConfig'
import type { PersonCredit, MediaType } from '@shared/types'

export default function PersonDetailPage() {
  const { id } = useParams()
  const personId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

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

  if (!person) return <div className="p-6 text-gray-500">Loading…</div>

  const typeLabel = (t: MediaType): string =>
    MEDIA_CONFIGS.find((cfg) => cfg.key === t)?.plural ?? t.replace(/_/g, ' ')

  return (
    <div className="p-6 max-w-4xl mx-auto">
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

      {totalActing === 0 ? (
        <>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Roles
          </h2>
          <p className="text-sm text-gray-400 mb-8">
            No roles yet. Add this person to a title&apos;s cast from its page.
          </p>
        </>
      ) : (
        actingTypes.map((type) => {
          const group = [...actingByType.get(type)!.values()]
          return (
            <div key={type} className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                {typeLabel(type)} · {group.length}
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                {group.map(({ credit, titles }) => (
                  <RoleCard key={credit.character!.id} c={credit} titles={titles} />
                ))}
              </div>
            </div>
          )
        })
      )}

      {staffRoles.length > 0 && (
        <>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Crew roles · {staffRoles.length}
          </h2>
          <div className="space-y-1.5">
            {staffRoles.map((c) => (
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
        </>
      )}
    </div>
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
