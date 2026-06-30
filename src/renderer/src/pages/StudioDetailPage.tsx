import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import EntityHeader from '../components/EntityHeader'
import CoverImage from '../components/CoverImage'
import { pathForMedia } from '../lib/mediaConfig'
import type { CompanyType } from '@shared/types'

const TYPES: CompanyType[] = ['studio', 'publisher', 'developer', 'other']

export default function StudioDetailPage() {
  const { id } = useParams()
  const companyId = Number(id)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: company } = useQuery({
    queryKey: ['companies', 'get', companyId],
    queryFn: () => api.companies.get(companyId)
  })
  const { data: works = [] } = useQuery({
    queryKey: ['companies', 'media', companyId],
    queryFn: () => api.companies.media(companyId)
  })

  if (!company) return <div className="p-6 text-gray-500">Loading…</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EntityHeader
        longTextLabel="Notes"
        initial={{
          name: company.name,
          native: company.nameNative ?? '',
          longText: '',
          imgPath: company.logoPath
        }}
        extra={
          <div>
            <label className="label">Type</label>
            <select
              className="input"
              defaultValue={company.type}
              onChange={(e) =>
                api.companies
                  .upsert({ id: companyId, name: company.name, type: e.target.value as CompanyType })
                  .then(() => qc.invalidateQueries({ queryKey: ['companies'] }))
              }
            >
              {TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </select>
          </div>
        }
        onSave={async (f) => {
          await api.companies.upsert({
            id: companyId,
            name: f.name,
            nameNative: f.native || null,
            type: company.type,
            logoPath: f.imgPath
          })
          qc.invalidateQueries({ queryKey: ['companies'] })
        }}
        onDelete={async () => {
          await api.companies.remove(companyId)
          qc.invalidateQueries({ queryKey: ['companies'] })
          navigate('/studios')
        }}
      />

      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
        Works · {works.length}
      </h2>
      {works.length === 0 ? (
        <p className="text-sm text-gray-600">
          No works linked yet. Add this company from a title&apos;s page.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
          {works.map((m) => (
            <Link key={m.id} to={pathForMedia(m)} className="group">
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
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
