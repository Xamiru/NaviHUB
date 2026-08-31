import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { confirmDialog } from '../lib/confirm'
import { FOOTBALL_MEDIA_KINDS } from '@shared/football'
import type { FootballEntityKind, FootballMediaKind } from '@shared/types'

interface LinkDraft {
  entityKind: FootballEntityKind
  entityId: number
  label: string
}

export default function FootballMediaPage() {
  const [params] = useSearchParams()
  const qc = useQueryClient()
  const [showAttach, setShowAttach] = useState(() => params.has('match'))
  const [filterKind, setFilterKind] = usePersistedState<FootballMediaKind | null>('footballMediaKind', null)
  const [filterSearch, setFilterSearch] = usePersistedState('footballMediaSearch', '')
  const filter = useMemo(() => ({ kind: filterKind, search: filterSearch || null }), [filterKind, filterSearch])
  const { data = [] } = useQuery({ queryKey: qk.football.media(filter), queryFn: () => api.football.media(filter) })
  const [title, setTitle] = useState('')
  const [kind, setKind] = useState<FootballMediaKind>('highlight')
  const [localPath, setLocalPath] = useState<string | null>(null)
  const [url, setUrl] = useState('')
  const [note, setNote] = useState('')
  const [links, setLinks] = useState<LinkDraft[]>([])
  const [linkSearch, setLinkSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const query = useDebouncedValue(linkSearch, 200)
  const { data: results } = useQuery({
    queryKey: qk.football.search(query),
    queryFn: () => api.football.search(query),
    enabled: query.trim().length >= 2
  })

  useEffect(() => {
    const matchId = Number(params.get('match'))
    if (!Number.isInteger(matchId) || matchId < 1 || links.length) return
    setShowAttach(true)
    api.football.match(matchId).then((match) => {
      if (!match) return
      setLinks([{ entityKind: 'match', entityId: match.id, label: `${match.home.name} vs ${match.away.name}` }])
      if (!title) setTitle(`${match.home.name} vs ${match.away.name}`)
    })
  }, [params, links.length, title])

  const suggestions: LinkDraft[] = results ? [
    ...results.competitions.map((item) => ({ entityKind: 'competition' as const, entityId: item.id, label: item.name })),
    ...results.teams.map((item) => ({ entityKind: 'team' as const, entityId: item.id, label: item.name })),
    ...results.people.map((item) => ({ entityKind: 'person' as const, entityId: item.id, label: item.name })),
    ...results.matches.map((item) => ({ entityKind: 'match' as const, entityId: item.id, label: `${item.home.name} vs ${item.away.name} / ${item.matchDate}` }))
  ].filter((item) => !links.some((link) => link.entityKind === item.entityKind && link.entityId === item.entityId)).slice(0, 10) : []

  function reset() {
    setTitle('')
    setKind('highlight')
    setLocalPath(null)
    setUrl('')
    setNote('')
    setLinks([])
    setLinkSearch('')
  }
  async function pick() {
    const path = await api.football.pickMediaFile()
    if (path) {
      setLocalPath(path)
      setUrl('')
      if (!title) setTitle(path.split('/').at(-1)?.replace(/\.[^.]+$/, '') ?? '')
    }
  }
  async function save() {
    setSaving(true)
    try {
      await api.football.saveMedia({
        title,
        kind,
        localPath,
        url: localPath ? null : url,
        note,
        links: links.map(({ entityKind, entityId }) => ({ entityKind, entityId }))
      })
      reset()
      setShowAttach(false)
      qc.invalidateQueries({ queryKey: qk.football.all })
    } finally {
      setSaving(false)
    }
  }
  async function remove(id: number, mediaTitle: string) {
    const ok = await confirmDialog(`Remove the attachment record for "${mediaTitle}"? The underlying file or link is not deleted.`, { confirmLabel: 'Remove', danger: true })
    if (!ok) return
    await api.football.removeMedia(id)
    qc.invalidateQueries({ queryKey: qk.football.all })
  }

  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <PageHeader
        title="My football archive"
        subtitle="Clips, highlights, full matches, interviews and documentaries collected around the history record. Files stay where you put them."
        back={{ to: '/football', label: 'Football Archive' }}
        actions={<button className={showAttach ? 'btn-ghost' : 'btn-primary'} onClick={() => setShowAttach((value) => !value)}>{showAttach ? 'Close form' : 'Add media'}</button>}
      />

      {showAttach && <section className="mb-10 border-y border-line-subtle py-6">
        <h2 className="text-xl font-semibold text-ink">Attach media</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="block"><span className="label mb-1 block">Title</span><input className="input" value={title} onChange={(event) => setTitle(event.target.value)} /></label>
            <div><span className="label mb-2 block">Shelf</span><div className="flex flex-wrap gap-2">{FOOTBALL_MEDIA_KINDS.map((value) => <Pill key={value} active={kind === value} onClick={() => setKind(value)} label={value === 'fullMatch' ? 'Full match' : value} />)}</div></div>
            <div>
              <span className="label mb-1 block">Source</span>
              {localPath ? <div className="flex items-center gap-2"><p className="input min-w-0 flex-1 truncate text-sm">{localPath}</p><button className="btn-ghost" onClick={() => setLocalPath(null)}>Clear</button></div> : <div className="flex gap-2"><input className="input" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://... or choose a local file" aria-label="Media web address" /><button className="btn-ghost shrink-0" onClick={pick}>Choose file</button></div>}
            </div>
            <label className="block"><span className="label mb-1 block">Note</span><textarea className="input min-h-24 resize-y" value={note} onChange={(event) => setNote(event.target.value)} /></label>
          </div>
          <div>
            <span className="label mb-1 block">Linked archive entries</span>
            <input className="input" value={linkSearch} onChange={(event) => setLinkSearch(event.target.value)} placeholder="Search competitions, teams, people or matches..." aria-label="Search Football entries to link" />
            {suggestions.length > 0 && <div className="mt-1 max-h-48 overflow-y-auto border border-line-subtle bg-surface-raised">{suggestions.map((item) => <button key={`${item.entityKind}-${item.entityId}`} className="block w-full border-b border-line-subtle px-3 py-2 text-left text-sm hover:bg-surface-overlay" onClick={() => { setLinks((current) => [...current, item]); setLinkSearch('') }}><span className="text-ink">{item.label}</span><span className="ml-2 text-xs text-ink-muted">{item.entityKind}</span></button>)}</div>}
            <div className="mt-4 flex flex-wrap gap-2">{links.map((link) => <button key={`${link.entityKind}-${link.entityId}`} className="chip" title="Remove link" onClick={() => setLinks((current) => current.filter((item) => item !== link))}>{link.label} / remove</button>)}</div>
            {!links.length && <p className="mt-3 text-sm text-ink-muted">One attachment can link to several archive entries. Match footage rolls up to both teams and the competition automatically.</p>}
          </div>
        </div>
        <button className="btn-primary mt-5" disabled={saving || !title.trim() || (!localPath && !url.trim()) || !links.length} onClick={save}>Save attachment</button>
      </section>}

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-3 text-xs uppercase tracking-[0.14em] text-ink-muted">{data.length} saved records</p><Group label="Shelf"><Pill active={filterKind == null} onClick={() => setFilterKind(null)} label="All" />{FOOTBALL_MEDIA_KINDS.map((value) => <Pill key={value} active={filterKind === value} onClick={() => setFilterKind(value)} label={value === 'fullMatch' ? 'Full matches' : value} />)}</Group></div>
        <input className="input max-w-sm" value={filterSearch} onChange={(event) => setFilterSearch(event.target.value)} placeholder="Filter saved media..." aria-label="Filter saved Football media" />
      </div>
      <div className="divide-y divide-line-subtle border-y border-line-subtle">
        {data.map((item) => (
          <div key={item.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.8fr)_auto] sm:items-center">
            <div className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3"><span className="border-r border-line-subtle pr-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">{item.kind === 'fullMatch' ? 'match' : item.kind}</span><span><span className="block font-medium text-ink">{item.title}</span><span className="mt-1 block text-xs text-ink-muted">{item.localPath ? 'Local file' : 'Web link'}</span></span></div>
            <p className="truncate text-sm text-ink-muted">{item.links.map((link) => link.label).filter(Boolean).join(', ')}</p>
            <div className="flex gap-2"><button className="btn-ghost" onClick={() => item.localPath ? api.football.openMedia(item.localPath) : item.url && api.football.openExternalLink('website', item.url)}>Open</button><button className="btn-ghost text-signal-anomaly" onClick={() => remove(item.id, item.title)}>Remove</button></div>
          </div>
        ))}
        {!data.length && <p className="py-8 text-sm text-ink-muted">No media attachments match this shelf.</p>}
      </div>
    </div>
  )
}
