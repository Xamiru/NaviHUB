import { Link, useParams } from 'react-router-dom'
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
import { useLeaveDeleted } from '../lib/navState'
import { useIncrementalList } from '../lib/hooks'
import type { CharacterAppearance, MediaType, Person } from '@shared/types'

// Titles whose cast is played on screen rather than voiced.
const LIVE_ACTION = new Set<MediaType>(['movie', 'tv'])

export default function CharacterDetailPage() {
  const { id } = useParams()
  const characterId = Number(id)
  const leaveDeleted = useLeaveDeleted()
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

  // Oldest first, so the list reads as the character's history.
  const chronologicalRoles = [...roles].sort((a, b) =>
    (a.media.releaseDate ?? '').localeCompare(b.media.releaseDate ?? '')
  )
  // Everyone who voiced or played the character, once each, with the work
  // they first did it in.
  const cast = new Map<number, { person: Person; language: string | null; firstYear: string; works: number }>()
  for (const r of chronologicalRoles) {
    for (const v of r.voices) {
      const seen = cast.get(v.person.id)
      if (seen) seen.works++
      else cast.set(v.person.id, { person: v.person, language: v.language, firstYear: chronologicalYear(r.media.releaseDate), works: 1 })
    }
  }
  const liveAction = roles.length > 0 && roles.every((r) => LIVE_ACTION.has(r.media.mediaType))

  return (
    <EditorialDetailFrame width="wide">
      <BackButton />
      <RelationshipTrail>
        <span>Characters</span>
        <span className="text-gray-600" aria-hidden="true">›</span>
        <span>{character.name}</span>
      </RelationshipTrail>
      <EntityHeader
        longTextLabel="Description"
        initial={{
          name: character.name,
          native: character.nameNative ?? '',
          longText: character.description ?? '',
          imgPath: character.imagePath
        }}
        facts={[
          ...(character.gender ? [{ label: 'Gender', value: character.gender }] : []),
          { label: 'In your library', value: `${roles.length} ${roles.length === 1 ? 'appearance' : 'appearances'}` }
        ]}
        onSave={async (f) => {
          await api.characters.upsert({
            id: characterId,
            name: f.name,
            nameNative: f.native || null,
            description: f.longText || null,
            imagePath: f.imgPath
          })
          await qc.invalidateQueries({ queryKey: qk.characters.all })
        }}
        imageOverride={{
          kind: 'character',
          id: characterId,
          onReverted: () => qc.invalidateQueries({ queryKey: qk.characters.all })
        }}
        onDelete={async () => {
          await api.characters.remove(characterId)
          qc.invalidateQueries({ queryKey: qk.characters.all })
          // No /characters index exists — return to wherever the user came from.
          leaveDeleted((path) => path === `/characters/${characterId}`, '/')
        }}
        actions={<AddToListMenu kind="character" entityId={characterId} />}
      >
        {cast.size > 0 && (
          <Section title={liveAction ? 'Played by' : 'Voiced by'}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[...cast.values()].map(({ person, language, firstYear, works }) => (
                <Link
                  key={person.id}
                  to={`/people/${person.id}`}
                  className="card flex items-center gap-3 p-2.5 transition-colors hover:border-accent/60"
                >
                  <CoverImage path={person.photoPath} alt="" rounded="rounded-full" className="h-14 w-14 shrink-0" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-white">{person.name}</span>
                    <span className="block truncate text-xs text-gray-400">
                      {[language, firstYear !== 'Undated' ? `from ${firstYear}` : null, works > 1 ? `${works} works` : null].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <Section title={`Appears in · ${roles.length}`} subtitle="Oldest first">
          {roles.length === 0 ? (
            <p className="text-sm text-gray-400">
              No appearances yet. Add this character to a title&apos;s cast.
            </p>
          ) : (
            <AppearanceGrid roles={chronologicalRoles} />
          )}
        </Section>
      </EntityHeader>
    </EditorialDetailFrame>
  )
}

// A generic character (a narrator, a mascot) can appear in hundreds of titles,
// so covers render in batches, at the same density as the person role grid.
function AppearanceGrid({ roles }: { roles: CharacterAppearance[] }) {
  const { visible, sentinelRef, hasMore } = useIncrementalList(roles, 48)
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-3">
        {visible.map((r) => (
          <Link key={r.media.id} to={pathForMedia(r.media)} className="group block min-w-0">
            <CoverImage
              path={r.media.coverPath}
              alt=""
              thumbWidth={160}
              rounded="rounded-lg"
              className="aspect-[2/3] w-full transition-transform group-hover:scale-[1.03]"
            />
            <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-4 text-white group-hover:text-accent">
              {r.media.title}
            </p>
            <p className="truncate text-xs text-gray-400">
              {[chronologicalYear(r.media.releaseDate), r.media.status].filter(Boolean).join(' · ')}
            </p>
          </Link>
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} />}
    </>
  )
}
