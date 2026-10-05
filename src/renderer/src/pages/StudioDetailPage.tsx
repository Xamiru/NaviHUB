import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import EntityHeader from '../components/EntityHeader'
import BackButton from '../components/BackButton'
import CoverImage from '../components/CoverImage'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import EditorialDetailFrame, { RelationshipTrail } from '../components/EditorialDetailFrame'
import { pathForMedia } from '../lib/mediaConfig'
import { chronologicalYear } from '../lib/archiveDisplay'
import { useLeaveDeleted } from '../lib/navState'
import { Field } from '../components/Field'
import type { CompanyType } from '@shared/types'

const TYPES: CompanyType[] = ['studio', 'publisher', 'developer', 'other']

export default function StudioDetailPage() {
  const { id } = useParams()
  const companyId = Number(id)
  const leaveDeleted = useLeaveDeleted()
  const qc = useQueryClient()
  // The Edit dialog's type choice, applied with its Save.
  const [typeDraft, setTypeDraft] = useState<CompanyType | null>(null)

  const { data: company } = useQuery({
    queryKey: qk.companies.get(companyId),
    queryFn: () => api.companies.get(companyId)
  })
  const { data: works = [] } = useQuery({
    queryKey: qk.companies.media(companyId),
    queryFn: () => api.companies.media(companyId)
  })

  if (!company) return <PageStatus>Loading…</PageStatus>
  const type = typeDraft ?? company.type

  const chronologicalWorks = [...works].sort((a, b) =>
    (b.releaseDate ?? '').localeCompare(a.releaseDate ?? '')
  )

  return (
    <EditorialDetailFrame width="wide">
      <BackButton />
      <RelationshipTrail>
        <Link to="/studios" className="hover:text-accent">Studios</Link>
        <span className="text-gray-600" aria-hidden="true">›</span>
        <span>{company.name}</span>
      </RelationshipTrail>
      <EntityHeader
        imageShape="logo"
        initial={{
          name: company.name,
          native: company.nameNative ?? '',
          longText: '',
          imgPath: company.logoPath
        }}
        facts={[
          { label: 'Type', value: <span className="capitalize">{company.type}</span> },
          { label: 'In your library', value: `${works.length} ${works.length === 1 ? 'work' : 'works'}` }
        ]}
        editFields={
          <Field label="Type">
            <select className="input capitalize" value={type} onChange={(e) => setTypeDraft(e.target.value as CompanyType)}>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        }
        onSave={async (f) => {
          await api.companies.upsert({
            id: companyId,
            name: f.name,
            nameNative: f.native || null,
            type,
            logoPath: f.imgPath
          })
          await qc.invalidateQueries({ queryKey: qk.companies.all })
        }}
        onEditReset={() => setTypeDraft(null)}
        onDelete={async () => {
          await api.companies.remove(companyId)
          qc.invalidateQueries({ queryKey: qk.companies.all })
          leaveDeleted((path) => path === `/studios/${companyId}`, '/studios')
        }}
      >
        <Section title={`Works · ${works.length}`} subtitle="Newest first">
          {works.length === 0 ? (
            <p className="text-sm text-gray-400">
              No works linked yet. Add this company from a title&apos;s page.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
              {chronologicalWorks.map((m) => (
                <Link key={m.id} to={pathForMedia(m)} className="group relative">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden">
                    <CoverImage
                      path={m.coverPath}
                      alt={m.title}
                      rounded="rounded-lg"
                      className="h-full w-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-accent">
                    {m.title}
                  </p>
                  <p className="mt-1 text-xs tabular-nums text-gray-500">
                    {chronologicalYear(m.releaseDate)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Section>
      </EntityHeader>
    </EditorialDetailFrame>
  )
}
