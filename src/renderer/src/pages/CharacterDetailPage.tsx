import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import EntityHeader from '../components/EntityHeader'
import CoverImage from '../components/CoverImage'
import { pathForMedia } from '../lib/mediaConfig'

export default function CharacterDetailPage() {
  const { id } = useParams()
  const characterId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: character } = useQuery({
    queryKey: ['characters', 'get', characterId],
    queryFn: () => api.characters.get(characterId)
  })
  const { data: roles = [] } = useQuery({
    queryKey: ['characters', 'roles', characterId],
    queryFn: () => api.characters.roles(characterId)
  })

  if (!character) return <div className="p-6 text-gray-500">Loading…</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
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
          qc.invalidateQueries({ queryKey: ['characters'] })
        }}
        onDelete={async () => {
          await api.characters.remove(characterId)
          qc.invalidateQueries({ queryKey: ['characters'] })
          navigate('/characters')
        }}
      />

      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
        Appears in · {roles.length}
      </h2>
      {roles.length === 0 ? (
        <p className="text-sm text-gray-600">
          No appearances yet. Add this character to a title&apos;s cast.
        </p>
      ) : (
        <div className="space-y-2">
          {roles.map((r) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
