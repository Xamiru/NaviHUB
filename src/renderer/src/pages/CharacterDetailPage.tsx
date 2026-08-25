import { Link, useNavigate, useParams } from 'react-router-dom'
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
import { pathForMedia } from '../lib/mediaConfig'
import { chronologicalYear } from '../lib/archiveDisplay'

export default function CharacterDetailPage() {
  const { id } = useParams()
  const characterId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: character } = useQuery({
    queryKey: qk.characters.get(characterId),
    queryFn: () => api.characters.get(characterId)
  })
  const { data: roles = [] } = useQuery({
    queryKey: qk.characters.roles(characterId),
    queryFn: () => api.characters.roles(characterId)
  })

  if (!character) return <PageStatus>Loading…</PageStatus>

  const chronologicalRoles = [...roles].sort((a, b) =>
    (b.media.releaseDate ?? '').localeCompare(a.media.releaseDate ?? '')
  )

  return (
    <EditorialDetailFrame width="reading">
      <BackButton />
      <RelationshipTrail>
        <span>Characters</span>
        <span className="text-gray-600" aria-hidden="true">›</span>
        <span>{character.name}</span>
        <span className="ml-auto tabular-nums text-gray-500">{roles.length} appearances</span>
      </RelationshipTrail>
      <EntityHeader
        rounded="rounded-full"
        longTextLabel="Description"
        initial={{
          name: character.name,
          native: character.nameNative ?? '',
          longText: character.description ?? '',
          imgPath: character.imagePath
        }}
        onSave={async (f) => {
          await api.characters.upsert({
            id: characterId,
            name: f.name,
            nameNative: f.native || null,
            description: f.longText || null,
            imagePath: f.imgPath
          })
          qc.invalidateQueries({ queryKey: qk.characters.all })
        }}
        onDelete={async () => {
          await api.characters.remove(characterId)
          qc.invalidateQueries({ queryKey: qk.characters.all })
          // No /characters index exists — return to wherever the user came from.
          navigate(-1)
        }}
        actions={<AddToListMenu kind="character" entityId={characterId} />}
      />

      <Section title={`Appears in · ${roles.length}`}>
        {roles.length === 0 ? (
          <p className="text-sm text-gray-400">
            No appearances yet. Add this character to a title&apos;s cast.
          </p>
        ) : (
          <div className="space-y-2">
            {chronologicalRoles.map((r) => (
              <div
                key={r.media.id}
                className="flex items-center gap-3 bg-base-800 rounded-md px-3 py-2"
              >
                <Link to={pathForMedia(r.media)} className="shrink-0">
                  <CoverImage
                    path={r.media.coverPath}
                    alt={r.media.title}
                    rounded="rounded"
                    className="w-10 h-14"
                  />
                </Link>
                <div className="text-sm flex-1 min-w-0">
                  <Link to={pathForMedia(r.media)} className="font-medium hover:text-accent">
                    {r.media.title}
                  </Link>
                  <div className="text-gray-500">
                    {r.media.mediaType === 'movie' ? 'played by' : 'voiced by'}{' '}
                    {r.voices.map((v, i) => (
                      <span key={v.creditId}>
                        {i > 0 && ', '}
                        <Link to={`/people/${v.person.id}`} className="hover:text-accent">
                          {v.person.name}
                        </Link>
                        {v.language && ` · ${v.language}`}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs tabular-nums text-gray-500">
                  {chronologicalYear(r.media.releaseDate)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>
    </EditorialDetailFrame>
  )
}
