import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import ThemedFailure from '../components/theme/ThemedFailure'
import CoverImage from '../components/CoverImage'
import { Field } from '../components/Field'

// Picture albums: named collections across titles, each with its own order.
export default function PictureAlbumsPage(): React.JSX.Element {
  const qc = useQueryClient()
  const albums = useQuery({ queryKey: qk.pictures.albums, queryFn: () => api.pictures.albums() })
  const [name, setName] = useState('')

  async function create(): Promise<void> {
    if (!name.trim()) return
    try {
      await api.pictures.albumCreate(name, [])
      setName('')
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
    } catch (e) {
      toastError(e)
    }
  }

  const list = albums.data ?? []
  const createForm = (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        void create()
      }}
    >
      <Field label="New album name" hiddenLabel className="contents">
        <input
          className="input w-56"
          placeholder="New album name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>
      <button className="btn-primary" type="submit" disabled={!name.trim()}>
        Create album
      </button>
    </form>
  )

  return (
    <div className="mx-auto max-w-[1760px] p-5 sm:p-6 xl:p-8">
      <PageHeader
        title="Albums"
        subtitle="Pictures gathered across titles, in your own order"
        actions={list.length > 0 ? createForm : undefined}
      />
      {albums.isError ? (
        <ThemedFailure message="Could not load your albums." onRetry={() => void albums.refetch()} />
      ) : albums.isPending ? (
        <PageStatus>Loading albums…</PageStatus>
      ) : list.length === 0 ? (
        <EmptyState
          title="No albums yet"
          body="Create one here, or right-click pictures in the gallery and choose Add to album."
          action={<div className="flex justify-center">{createForm}</div>}
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {list.map((a) => (
            <Link
              key={a.id}
              to={`/pictures/albums/${a.id}`}
              className="card group overflow-hidden p-0 hover:border-accent"
            >
              <div className="aspect-video overflow-hidden">
                <CoverImage
                  path={a.coverPath}
                  alt={a.name}
                  thumbWidth={480}
                  rounded="rounded-none"
                  className="h-full w-full transition-transform group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-3">
                <p className="truncate font-medium text-ink">{a.name}</p>
                <p className="text-xs text-gray-400">
                  {a.count} image{a.count === 1 ? '' : 's'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
