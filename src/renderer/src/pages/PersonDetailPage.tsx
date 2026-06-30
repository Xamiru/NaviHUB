import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import EntityHeader from '../components/EntityHeader'
import CoverImage from '../components/CoverImage'
import { pathForMedia } from '../lib/mediaConfig'
import type { PersonCredit } from '@shared/types'

export default function PersonDetailPage() {
  const { id } = useParams()
  const personId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: person } = useQuery({
    queryKey: ['people', 'get', personId],
    queryFn: () => api.people.get(personId)
  })
  const { data: credits = [] } = useQuery({
    queryKey: ['people', 'credits', personId],
    queryFn: () => api.people.credits(personId)
  })

  if (!person) return <div className="p-6 text-gray-500">Loading…</div>

  // Acting/voicing roles carry a character; crew roles don't. Splitting this way
  // works for anyone — a voice actor, a film actor, or a director — and a person
  // who does both (e.g. acts and directs) shows up correctly in each section.
  const actingRoles = credits.filter((c) => c.character)
  const staffRoles = credits.filter((c) => !c.character)

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
          qc.invalidateQueries({ queryKey: ['people'] })
        }}
        onDelete={async () => {
          await api.people.remove(personId)
          qc.invalidateQueries({ queryKey: ['people'] })
          navigate('/people')
        }}
      />

      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
        Roles · {actingRoles.length}
      </h2>
      {actingRoles.length === 0 ? (
        <p className="text-sm text-gray-600 mb-8">
          No roles yet. Add this person to a title&apos;s cast from its page.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 mb-8">
          {actingRoles.map((c) => (
            <RoleCard key={c.creditId} c={c} />
          ))}
        </div>
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

function RoleCard({ c }: { c: PersonCredit }) {
  // Show the character's portrait (the role) rather than the show's cover.
  // Fall back to the show cover when the character has no image.
  const roleImage = c.character?.imagePath ?? c.media.coverPath
  const altText = c.character?.name ?? c.media.title
  // Clicking the character portrait goes to the character; the title below
  // still links to the show.
  const imageTo = c.character ? `/characters/${c.character.id}` : pathForMedia(c.media)
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
        <p className="text-xs text-gray-500 hover:text-accent line-clamp-1">{c.media.title}</p>
      </Link>
    </div>
  )
}
