import { useState } from 'react'
import { Field } from '../Field'
import { api } from '../../lib/api'
import { confirmDialog } from '../../lib/confirm'
import type {
  FootballEntityKind,
  FootballExternalLink,
  FootballExternalProvider
} from '@shared/types'

export default function FootballExternalLinks({
  entityKind,
  entityId,
  links,
  onChanged
}: {
  entityKind: FootballEntityKind
  entityId: number
  links: FootballExternalLink[]
  onChanged: () => Promise<void> | void
}) {
  const [editingId, setEditingId] = useState<number | undefined>()
  const [provider, setProvider] = useState<FootballExternalProvider>('fotmob')
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')
  const [saving, setSaving] = useState(false)

  function reset(): void {
    setEditingId(undefined)
    setProvider('fotmob')
    setLabel('')
    setUrl('')
  }

  function edit(link: FootballExternalLink): void {
    setEditingId(link.id)
    setProvider(link.provider)
    setLabel(link.label ?? '')
    setUrl(link.url)
  }

  async function save(): Promise<void> {
    if (!url.trim()) return
    setSaving(true)
    try {
      await api.football.saveExternalLink({
        id: editingId,
        entityKind,
        entityId,
        provider,
        label,
        url: url.trim()
      })
      reset()
      await onChanged()
    } finally {
      setSaving(false)
    }
  }

  async function remove(link: FootballExternalLink): Promise<void> {
    const confirmed = await confirmDialog(`Remove the saved link "${link.label ?? link.url}"?`, {
      confirmLabel: 'Remove',
      danger: true
    })
    if (!confirmed) return
    await api.football.removeExternalLink(link.id)
    if (editingId === link.id) reset()
    await onChanged()
  }

  return (
    <div>
      <div className="divide-y divide-line-subtle">
        {links.map((link) => (
          <div key={link.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
            <button
              className="min-w-0 flex-1 truncate text-left text-sm text-signal-link hover:underline"
              onClick={() => api.football.openExternalLink(link.provider, link.url)}
            >
              {link.label ?? link.provider}
            </button>
            <div className="flex gap-2">
              <button className="btn-ghost" onClick={() => edit(link)}>Edit</button>
              <button className="btn-ghost text-signal-anomaly" onClick={() => remove(link)}>Remove</button>
            </div>
          </div>
        ))}
        {!links.length && <p className="py-3 text-sm text-ink-muted">No external links saved.</p>}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[150px_minmax(0,1fr)]">
        <Field label="Provider">
          <select className="input" value={provider} onChange={(event) => setProvider(event.target.value as FootballExternalProvider)}>
            <option value="fotmob">FotMob</option>
            <option value="website">Website</option>
          </select>
        </Field>
        <Field label="Link label">
          <input className="input" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Optional label" />
        </Field>
      </div>
      <Field
        label="Web address"
        className="mt-3"
        description={provider === 'fotmob' ? 'Use a FotMob match, team, player, or league page.' : undefined}
      >
        <input className="input" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://..." />
      </Field>
      <div className="mt-3 flex gap-2">
        <button className="btn-ghost" disabled={saving || !url.trim()} onClick={save}>
          {editingId == null ? 'Save link' : 'Update link'}
        </button>
        {editingId != null && <button className="btn-ghost" onClick={reset}>Cancel edit</button>}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
        Links are stored exactly as references. NaviHUB does not scrape, cache or embed them.
      </p>
    </div>
  )
}
