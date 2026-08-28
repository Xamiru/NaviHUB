import { useState, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  LibraryExportOptions,
  LibraryExportSection,
  LibraryExportStatus
} from '@shared/types'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useDialog } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import QuietWorkspace from './QuietWorkspace'

const SECTION_LABELS: ReadonlyArray<[LibraryExportSection, string]> = [
  ['anime', 'Anime'],
  ['manga', 'Manga'],
  ['visual_novel', 'Visual Novels'],
  ['game', 'Games'],
  ['movie', 'Movies'],
  ['tv', 'TV'],
  ['book', 'Books'],
  ['wrestling', 'Wrestling']
]

const DEFAULT_OPTIONS: LibraryExportOptions = {
  sections: SECTION_LABELS.map(([key]) => key),
  includeAssets: true,
  includeThemeAudio: true,
  includeSpotifyPlaylists: false,
  includeProgress: false,
  includeRatings: false,
  includeLists: false,
  format: 'zip'
}

export default function LibraryExportSettings(): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const statusQuery = useQuery({
    queryKey: qk.libraryExport.status,
    queryFn: () => api.libraryExport.status(),
    refetchInterval: (query) => (query.state.data?.running ? 500 : false)
  })
  const status = statusQuery.data

  async function reveal(): Promise<void> {
    try {
      await api.libraryExport.reveal()
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <>
      <QuietWorkspace
        title="Library export"
        description="Create a portable, privacy-controlled copy of your imported library. Logs, credentials, machine paths and large local collections are always excluded."
        actions={
          <button className="btn-primary" onClick={() => setOpen(true)}>
            {status?.running ? 'View export' : 'Export library…'}
          </button>
        }
      >
        {status?.running ? (
          <ExportProgress status={status} compact />
        ) : status?.phase === 'done' && status.outputPath ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-gray-300">Last export completed this session</p>
              <p className="mt-1 break-all text-xs text-gray-500">{status.outputPath}</p>
            </div>
            <button className="btn-ghost shrink-0" onClick={reveal}>
              Open location
            </button>
          </div>
        ) : status?.phase === 'error' && status.error ? (
          <p className="text-sm text-red-300">Last export failed: {status.error}</p>
        ) : (
          <p className="text-sm text-gray-400">
            ZIP is the default. You choose the destination each time, and existing files are never
            overwritten.
          </p>
        )}
      </QuietWorkspace>
      {open && (
        <LibraryExportDialog
          initialStatus={status ?? null}
          onClose={() => setOpen(false)}
          onStatus={() => statusQuery.refetch()}
        />
      )}
    </>
  )
}

function LibraryExportDialog({
  initialStatus,
  onClose,
  onStatus
}: {
  initialStatus: LibraryExportStatus | null
  onClose: () => void
  onStatus: () => Promise<unknown>
}): React.JSX.Element {
  const panelRef = useDialog(onClose)
  const qc = useQueryClient()
  const [options, setOptions] = useState<LibraryExportOptions>(DEFAULT_OPTIONS)
  const [starting, setStarting] = useState(false)
  const [startedHere, setStartedHere] = useState(initialStatus?.running ?? false)
  const statusQuery = useQuery({
    queryKey: qk.libraryExport.status,
    queryFn: () => api.libraryExport.status(),
    initialData: initialStatus ?? undefined,
    refetchInterval: (query) => (query.state.data?.running || starting ? 500 : false)
  })
  const status = statusQuery.data
  const locked = starting || status?.running === true
  const personal = options.includeProgress || options.includeRatings || options.includeLists
  const previewQuery = useQuery({
    queryKey: qk.libraryExport.preview(options),
    queryFn: () => api.libraryExport.preview(options),
    enabled: options.sections.length > 0 && !locked
  })

  function toggleSection(section: LibraryExportSection): void {
    setOptions((current) => ({
      ...current,
      sections: current.sections.includes(section)
        ? current.sections.filter((item) => item !== section)
        : [...current.sections, section]
    }))
  }

  async function start(): Promise<void> {
    if (options.sections.length === 0) return
    if (personal) {
      const confirmed = await confirmDialog(
        'This export will include the personal tracking choices you selected. Anyone with the bundle can read that information. Continue?',
        { confirmLabel: 'Include personal data' }
      )
      if (!confirmed) return
    }
    setStarting(true)
    try {
      const result = await api.libraryExport.start(options)
      if (result.started) setStartedHere(true)
      await Promise.all([
        statusQuery.refetch(),
        onStatus(),
        qc.invalidateQueries({ queryKey: qk.libraryExport.all })
      ])
    } catch (error) {
      toastError(error)
      await statusQuery.refetch()
    } finally {
      setStarting(false)
    }
  }

  async function cancel(): Promise<void> {
    try {
      await api.libraryExport.cancel()
      await statusQuery.refetch()
    } catch (error) {
      toastError(error)
    }
  }

  async function reveal(): Promise<void> {
    try {
      await api.libraryExport.reveal()
    } catch (error) {
      toastError(error)
    }
  }

  const showCompleted = startedHere && status?.phase === 'done' && status.outputPath

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="library-export-title"
        tabIndex={-1}
        className="card max-h-[90vh] w-full max-w-3xl overflow-y-auto p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 border-b border-base-700 pb-4">
          <div>
            <h2 id="library-export-title" className="text-lg font-semibold text-white">
              Export library
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Build a portable database and only the small assets it still references.
            </p>
          </div>
          <button className="text-gray-400 hover:text-white" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>

        {showCompleted ? (
          <div className="py-6" aria-live="polite">
            <p className="text-base font-medium text-white">Export complete</p>
            <p className="mt-2 break-all text-sm text-gray-400">{status.outputPath}</p>
            {status.missingAssetCount > 0 && (
              <p className="mt-3 text-sm text-amber-300">
                {status.missingAssetCount} referenced file
                {status.missingAssetCount === 1 ? ' was' : 's were'} missing and could not be copied.
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button className="btn-ghost" onClick={onClose}>
                Close
              </button>
              <button className="btn-primary" onClick={reveal}>
                Open location
              </button>
            </div>
          </div>
        ) : (
          <>
            <fieldset className="mt-5" disabled={locked}>
              <legend className="label">Library sections</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SECTION_LABELS.map(([key, label]) => {
                  const selected = options.sections.includes(key)
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`chip-toggle text-left ${selected ? 'chip-toggle-active' : ''}`}
                      aria-pressed={selected}
                      onClick={() => toggleSection(key)}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
              {options.sections.length === 0 && (
                <p className="mt-2 text-sm text-red-300">Select at least one library section.</p>
              )}
            </fieldset>

            <div className="mt-5 grid gap-5 border-t border-base-700 pt-5 md:grid-cols-2">
              <OptionGroup title="Assets">
                <CheckOption
                  label="Downloaded covers and portraits"
                  detail="Copies only referenced files from NaviHUB's managed media folder."
                  checked={options.includeAssets}
                  disabled={locked}
                  onChange={(checked) => setOptions({ ...options, includeAssets: checked })}
                />
                <CheckOption
                  label="Anime theme audio"
                  detail="Keeps downloaded theme audio. Local videos and music are never copied."
                  checked={options.includeThemeAudio}
                  disabled={locked}
                  onChange={(checked) => setOptions({ ...options, includeThemeAudio: checked })}
                />
                <CheckOption
                  label="Imported Spotify playlists"
                  detail="Keeps playlist snapshots, but clears local matches so tracks start unavailable."
                  checked={options.includeSpotifyPlaylists}
                  disabled={locked}
                  onChange={(checked) =>
                    setOptions({ ...options, includeSpotifyPlaylists: checked })
                  }
                />
              </OptionGroup>

              <OptionGroup title="Personal tracking" warning={personal}>
                <CheckOption
                  label="Statuses and progress"
                  detail="Includes statuses, progress, rewatches and watched TV episodes."
                  checked={options.includeProgress}
                  disabled={locked}
                  onChange={(checked) => setOptions({ ...options, includeProgress: checked })}
                />
                <CheckOption
                  label="Ratings, favorites and notes"
                  detail="Includes your scores, favorites and written notes."
                  checked={options.includeRatings}
                  disabled={locked}
                  onChange={(checked) => setOptions({ ...options, includeRatings: checked })}
                />
                <CheckOption
                  label="Lists and tier lists"
                  detail="Only entries connected to exported entities are retained."
                  checked={options.includeLists}
                  disabled={locked}
                  onChange={(checked) => setOptions({ ...options, includeLists: checked })}
                />
              </OptionGroup>
            </div>

            <div className="mt-5 grid gap-5 border-t border-base-700 pt-5 sm:grid-cols-[auto_minmax(0,1fr)]">
              <fieldset disabled={locked}>
                <legend className="label">Output</legend>
                <div className="flex gap-2">
                  {(['zip', 'folder'] as const).map((format) => (
                    <button
                      key={format}
                      type="button"
                      className={
                        options.format === format ? 'pill pill-active' : 'pill'
                      }
                      aria-pressed={options.format === format}
                      onClick={() => setOptions({ ...options, format })}
                    >
                      {format === 'zip' ? 'ZIP' : 'Folder'}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="rounded-lg border border-base-700 bg-base-900/40 p-4" aria-live="polite">
                <p className="label">Live preview</p>
                {previewQuery.isLoading ? (
                  <p className="text-sm text-gray-400">Calculating…</p>
                ) : previewQuery.data ? (
                  <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm sm:grid-cols-4">
                    <PreviewValue label="Titles" value={String(previewQuery.data.selectedCount)} />
                    <PreviewValue label="Assets" value={String(previewQuery.data.assetFileCount)} />
                    <PreviewValue
                      label="Spotify lists"
                      value={String(previewQuery.data.spotifyPlaylistCount)}
                    />
                    <PreviewValue label="Approx. size" value={formatBytes(previewQuery.data.estimatedBytes)} />
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Select a section to calculate the export.</p>
                )}
                {!!previewQuery.data?.missingAssetCount && (
                  <p className="mt-3 text-xs text-amber-300">
                    {previewQuery.data.missingAssetCount} referenced file
                    {previewQuery.data.missingAssetCount === 1 ? ' is' : 's are'} already missing.
                  </p>
                )}
              </div>
            </div>

            {status?.running && <ExportProgress status={status} />}
            {!status?.running && status?.phase === 'error' && status.error && (
              <p className="mt-5 rounded-lg border border-red-900/60 bg-red-950/30 p-3 text-sm text-red-300" role="alert">
                {status.error}
              </p>
            )}
            {!status?.running && status?.phase === 'cancelled' && (
              <p className="mt-5 text-sm text-gray-400" role="status">
                Export cancelled. No incomplete bundle was kept.
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-base-700 pt-4">
              <p className="max-w-lg text-xs leading-relaxed text-gray-500">
                Logs, credentials, learning and play histories, achievements, local collections,
                wallpapers and slideshow state are always excluded.
              </p>
              {status?.running ? (
                <button className="btn-danger shrink-0" onClick={cancel}>
                  Cancel
                </button>
              ) : (
                <button
                  className="btn-primary shrink-0"
                  disabled={starting || options.sections.length === 0}
                  onClick={start}
                >
                  {starting ? 'Choosing destination…' : 'Choose destination and export'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function OptionGroup({
  title,
  warning = false,
  children
}: {
  title: string
  warning?: boolean
  children: ReactNode
}): React.JSX.Element {
  return (
    <fieldset
      className={`rounded-lg border p-4 ${warning ? 'border-amber-700/70 bg-amber-950/20' : 'border-base-700'}`}
    >
      <legend className="px-1 text-sm font-medium text-gray-200">{title}</legend>
      <div className="space-y-3">{children}</div>
    </fieldset>
  )
}

function CheckOption({
  label,
  detail,
  checked,
  disabled,
  onChange
}: {
  label: string
  detail: string
  checked: boolean
  disabled: boolean
  onChange: (checked: boolean) => void
}): React.JSX.Element {
  return (
    <label className="flex items-start gap-3">
      <input
        className="mt-1"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        <span className="block text-sm text-gray-200">{label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">{detail}</span>
      </span>
    </label>
  )
}

function PreviewValue({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-0.5 font-medium text-gray-200">{value}</p>
    </div>
  )
}

function ExportProgress({
  status,
  compact = false
}: {
  status: LibraryExportStatus
  compact?: boolean
}): React.JSX.Element {
  const percent = status.percent ?? 0
  return (
    <div className={compact ? '' : 'mt-5 rounded-lg border border-base-700 p-4'} aria-live="polite">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="text-gray-300">{status.message ?? phaseLabel(status.phase)}</span>
        {status.percent != null && <span className="shrink-0 text-gray-500">{percent}%</span>}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-base-700">
        <div className="h-full bg-accent transition-[width]" style={{ width: `${percent}%` }} />
      </div>
      {!compact && (
        <p className="mt-2 text-xs text-gray-500">
          You can close this dialog. The export will continue in Tasks.
        </p>
      )}
    </div>
  )
}

function phaseLabel(phase: LibraryExportStatus['phase']): string {
  return phase.charAt(0).toUpperCase() + phase.slice(1)
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB', 'TB']
  let value = bytes / 1024
  let unit = units[0]
  for (let index = 1; value >= 1024 && index < units.length; index += 1) {
    value /= 1024
    unit = units[index]
  }
  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${unit}`
}
