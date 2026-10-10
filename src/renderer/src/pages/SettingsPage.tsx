import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Tabs, { TabPanel } from '../components/Tabs'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import LibraryExportSettings from '../components/LibraryExportSettings'
import { api } from '../lib/api'
import { useSecretStorage, useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import { resolveAppTheme } from '../lib/theme'
import {
  SETTINGS_CATALOG,
  SETTINGS_TABS,
  resolveSettingsTab,
  searchSettings,
  settingSlug,
  settingsTabLabel,
  type SettingsTab
} from '../lib/settingsCatalog'
import { APP_THEME_SETTING } from '@shared/appTheme'
import { OpenSettingProvider, type SaveFn } from './settings/shared'
import {
  ThemeSettings,
  SignalClaritySettings,
  UiScaleSettings,
  MenuBarSettings,
  SidebarSettings
} from './settings/AppearanceSettings'
import {
  KnownBaselineSettings,
  DictionarySettings,
  EnglishDictionarySettings
} from './settings/LearningSettings'
import { ScoreSettings, TimeStatsSettings, StatusEditor } from './settings/LibrarySettings'
import { ApiKeysSettings } from './settings/KeySettings'
import { FoldersSettings } from './settings/FolderSettings'
import { MaintenanceSettings, StorageUsageSettings } from './settings/StorageSettings'
import {
  AiSettings,
  YtdlpSettings,
  MusicDownloadSettings,
  MokuroSettings,
  VideoSubtitleToolsSettings,
  TorrentSettings
} from './settings/ToolSettings'
import { AboutSettings, ShortcutSettings, UpdateSettings } from './settings/AboutSettings'
import { BackupSettings } from './settings/BackupSettings'
import {
  BookReaderDefaultsSettings,
  JapaneseDefaultsSettings,
  ListDefaultsSettings,
  MangaReaderDefaultsSettings,
  QuizDefaultsSettings
} from './settings/DefaultsSettings'

// Scroll a card into view and outline it briefly, once its tab has rendered.
function revealCard(title: string): void {
  const el = document.querySelector<HTMLElement>(`[data-setting="${settingSlug(title)}"]`)
  if (!el) return
  const disclosure = el.closest('details')
  if (disclosure) disclosure.open = true
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  el.scrollIntoView?.({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  el.classList.add('setting-flash')
  window.setTimeout(() => el.classList.remove('setting-flash'), 1600)
}

export default function SettingsPage() {
  const settingsQueryResult = useSettings()
  const secretStorageQueryResult = useSecretStorage()
  const { data } = settingsQueryResult
  const { data: secretStorage } = secretStorageQueryResult
  const qc = useQueryClient()
  // ?tab= deep-links a section (old keys such as ?tab=japanese still resolve);
  // one-shot seed of history-scoped state, the MediaDetailPage idiom — Back
  // into an old Settings entry still restores what it had.
  const [params] = useSearchParams()
  const [storedTab, setTab] = usePersistedState<string>(
    'settingsTab',
    resolveSettingsTab(params.get('tab')) ?? 'appearance'
  )
  const tab: SettingsTab = resolveSettingsTab(storedTab) ?? 'appearance'
  const [settingsQuery, setSettingsQuery] = usePersistedState('settingsSearch', '')
  const [reveal, setReveal] = useState<string | null>(null)
  const results = searchSettings(settingsQuery)

  const openTab = useCallback(
    (next: SettingsTab) => {
      setTab(next)
      setSettingsQuery('')
    },
    [setTab, setSettingsQuery]
  )

  const openSetting = useCallback(
    (title: string) => {
      const card = SETTINGS_CATALOG.find((entry) => entry.title === title)
      if (!card) return
      openTab(card.tab)
      setReveal(title)
    },
    [openTab]
  )

  // Runs after the target tab has rendered its cards.
  useEffect(() => {
    if (!reveal) return
    // Cleared inside the frame: clearing it here would re-run this effect and
    // its cleanup would cancel the frame before it fires.
    const frame = window.requestAnimationFrame(() => {
      revealCard(reveal)
      setReveal(null)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [reveal, tab])

  const setKey: SaveFn = async (key, value) => {
    await api.settings.set(key, value)
    await qc.invalidateQueries({ queryKey: qk.settings.all })
    if (key.endsWith('.statuses')) {
      await qc.invalidateQueries({ queryKey: qk.media.homeOverview })
    }
    toast('Saved', 'success')
  }

  if (settingsQueryResult.isPending || secretStorageQueryResult.isPending) {
    return <PageStatus>Loading settings…</PageStatus>
  }
  if (settingsQueryResult.isError || secretStorageQueryResult.isError) {
    return (
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <PageHeader title="Settings" className="mb-6" />
        <EmptyState
          title="Settings could not be loaded"
          body="The saved settings or protected storage state is unavailable. Retry before changing a setting."
          action={
            <button
              className="btn-primary"
              onClick={() => {
                void settingsQueryResult.refetch()
                void secretStorageQueryResult.refetch()
              }}
            >
              Retry
            </button>
          }
        />
      </div>
    )
  }

  const searching = settingsQuery.trim() !== ''

  return (
    <OpenSettingProvider value={openSetting}>
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <PageHeader
          title="Settings"
          subtitle="Search for any setting, or adjust one group at a time."
          className="mb-6"
        />
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Section nav — sticky on desktop, wrapping row on narrow screens. */}
          <nav className="shrink-0 md:w-56" aria-label="Settings">
            <div className="md:sticky md:top-6">
              <label className="block">
                <span className="label">Find a setting</span>
                <input
                  className="input w-full"
                  type="search"
                  placeholder="Theme, TMDB, folders, backup…"
                  value={settingsQuery}
                  onChange={(e) => setSettingsQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && results[0]) {
                      e.preventDefault()
                      openSetting(results[0].title)
                    }
                  }}
                />
              </label>
              <div className="mt-4 border-t border-base-700 pt-4">
                {searching ? (
                  <SearchResults
                    results={results}
                    onOpen={openSetting}
                    onClear={() => setSettingsQuery('')}
                  />
                ) : (
                  <Tabs
                    id="settings-sections"
                    label="Settings section"
                    orientation="vertical"
                    tabs={SETTINGS_TABS.map((t) => ({ key: t.key, label: t.label }))}
                    value={tab}
                    onChange={openTab}
                  />
                )}
              </div>
            </div>
          </nav>

          <div className="min-w-0 flex-1">
            <TabPanel tabsId="settings-sections" value={tab}>
              {tab === 'appearance' && (
                <>
                  <ThemeSettings data={data} onSave={setKey} />
                  {resolveAppTheme(data?.[APP_THEME_SETTING]) === 'lain' && (
                    <SignalClaritySettings data={data} onSave={setKey} />
                  )}
                  <UiScaleSettings data={data} onSave={setKey} />
                  <MenuBarSettings data={data} onSave={setKey} />
                  <SidebarSettings data={data} onSave={setKey} />
                </>
              )}
              {tab === 'library' && (
                <>
                  <ScoreSettings data={data} onSave={setKey} />
                  <TimeStatsSettings data={data} onSave={setKey} />
                  <ListDefaultsSettings />
                  {/* Six long editors: collapsed so the tab stays scannable;
                      search opens it when it targets one of them. */}
                  <details className="group mb-6">
                    <summary className="card cursor-pointer select-none px-5 py-4 text-lg font-semibold text-ink">
                      Statuses
                      <span className="ml-2 text-sm font-normal text-ink-muted">
                        {MEDIA_CONFIGS.map((cfg) => cfg.plural).join(', ')}
                      </span>
                    </summary>
                    <div className="mt-4">
                      {MEDIA_CONFIGS.map((cfg) => (
                        <StatusEditor key={cfg.key} cfg={cfg} data={data} onSave={setKey} />
                      ))}
                    </div>
                  </details>
                </>
              )}
              {tab === 'keys' && (
                <ApiKeysSettings data={data} secretStorage={secretStorage} onSave={setKey} />
              )}
              {tab === 'storage' && (
                <>
                  <FoldersSettings data={data} onSave={setKey} />
                  <StorageUsageSettings />
                  <MaintenanceSettings />
                </>
              )}
              {tab === 'learning' && (
                <>
                  <KnownBaselineSettings data={data} onSave={setKey} />
                  <JapaneseDefaultsSettings />
                  <DictionarySettings />
                  <EnglishDictionarySettings />
                </>
              )}
              {tab === 'defaults' && (
                <>
                  <MangaReaderDefaultsSettings />
                  <BookReaderDefaultsSettings />
                  <QuizDefaultsSettings />
                </>
              )}
              {tab === 'tools' && (
                <>
                  <AiSettings data={data} secretStorage={secretStorage} onSave={setKey} />
                  <YtdlpSettings data={data} onSave={setKey} />
                  <MusicDownloadSettings data={data} onSave={setKey} />
                  <VideoSubtitleToolsSettings data={data} onSave={setKey} />
                  <MokuroSettings data={data} onSave={setKey} />
                  <TorrentSettings data={data} secretStorage={secretStorage} onSave={setKey} />
                </>
              )}
              {tab === 'about' && (
                <>
                  <BackupSettings />
                  <LibraryExportSettings />
                  <UpdateSettings secretStorage={secretStorage} onSave={setKey} />
                  <AboutSettings />
                  <ShortcutSettings />
                </>
              )}
            </TabPanel>
          </div>
        </div>
      </div>
    </OpenSettingProvider>
  )
}

function SearchResults({
  results,
  onOpen,
  onClear
}: {
  results: ReturnType<typeof searchSettings>
  onOpen: (title: string) => void
  onClear: () => void
}) {
  if (results.length === 0) {
    return (
      <div>
        <p className="text-sm text-ink-secondary">No matching settings.</p>
        <p className="mt-1 text-xs text-ink-muted">
          Try a feature or service name, such as video, dictionary, TMDB or backup.
        </p>
        <button className="mt-3 text-sm text-accent hover:underline" onClick={onClear}>
          Clear search
        </button>
      </div>
    )
  }
  return (
    <div>
      <p className="text-xs text-ink-muted" role="status">
        {results.length} matching setting{results.length === 1 ? '' : 's'}
      </p>
      <ul className="mt-2 space-y-1">
        {results.map((card) => (
          <li key={card.title}>
            <button
              type="button"
              className="w-full rounded px-2 py-1.5 text-left hover:bg-surface-raised/70"
              onClick={() => onOpen(card.title)}
            >
              <span className="block text-sm text-ink">{card.title}</span>
              <span className="block text-xs text-ink-muted">{settingsTabLabel(card.tab)}</span>
            </button>
          </li>
        ))}
      </ul>
      <button className="mt-3 text-sm text-accent hover:underline" onClick={onClear}>
        Clear search
      </button>
    </div>
  )
}
