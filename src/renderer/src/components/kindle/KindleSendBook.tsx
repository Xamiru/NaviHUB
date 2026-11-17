import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { isBookChapter } from '../../lib/readerPath'
import { qk } from '../../lib/queryKeys'
import KindleSendDialog from './KindleSendDialog'

const FACT = 'text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500'

// The book page's Send to Kindle: offered when the book has local EPUB
// volumes (the books folder), all of which the dialog lists before sending.
export default function KindleSendBook({ mediaId, title }: { mediaId: number; title: string }) {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const { data } = useQuery({
    queryKey: qk.manga.chapters(mediaId),
    queryFn: () => api.manga.chapters(mediaId)
  })
  const epubs = (data?.chapters ?? []).filter(isBookChapter)
  if (epubs.length === 0) return null
  return (
    <div>
      <p className={FACT}>Kindle</p>
      <button type="button" className="btn-ghost mt-1 text-xs" onClick={() => setOpen(true)}>
        Send to Kindle…
      </button>
      {open && (
        <KindleSendDialog
          title={title}
          items={epubs.map((c) => ({ kind: 'chapter' as const, chapterId: c.id }))}
          onClose={() => {
            setOpen(false)
            void qc.invalidateQueries({ queryKey: qk.kindle.all })
            void qc.invalidateQueries({ queryKey: qk.media.kindleReading(mediaId) })
          }}
        />
      )}
    </div>
  )
}
