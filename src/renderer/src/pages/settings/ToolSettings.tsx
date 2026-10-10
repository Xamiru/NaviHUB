import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import {
  type TorrentServiceTestResult,
  type SecretStorageState,
  type VideoToolsResult,
  type YtDlpDetectResult,
  type MusicToolsCheck,
  type MokuroDetectResult
} from '@shared/types'
import StartJackettButton from '../../components/StartJackettButton'
import { confirmDialog } from '../../lib/confirm'
import { Field } from '../../components/Field'
import type { SecretSettingKey } from '@shared/secretSettings'
import { SecretStateLine } from '../../components/SecretField'
import { type SaveFn, SettingCard, useOpenSetting } from './shared'

// ---- AI ---------------------------------------------------------------------

export function AiSettings({
  data,
  secretStorage,
  onSave
}: {
  data?: Record<string, string>
  secretStorage?: SecretStorageState
  onSave: SaveFn
}) {
  const [aiProvider, setAiProvider] = useState('gemini')
  const [aiModel, setAiModel] = useState('gemini-2.5-flash')
  const [vertexProject, setVertexProject] = useState('')
  const [vertexRegion, setVertexRegion] = useState('')
  const [vertexCreds, setVertexCreds] = useState('')

  const savedAiProvider = data?.['coach.provider']
  const savedAiModel = data?.['coach.model']
  const savedVertexProject = data?.['vertex.project_id']
  const savedVertexRegion = data?.['vertex.region']
  const savedVertexCreds = data?.['vertex.credentials_path']
  useEffect(() => setAiProvider(savedAiProvider ?? 'gemini'), [savedAiProvider])
  useEffect(() => setAiModel(savedAiModel ?? 'gemini-2.5-flash'), [savedAiModel])
  useEffect(() => setVertexProject(savedVertexProject ?? ''), [savedVertexProject])
  useEffect(() => setVertexRegion(savedVertexRegion ?? ''), [savedVertexRegion])
  useEffect(() => setVertexCreds(savedVertexCreds ?? ''), [savedVertexCreds])

  return (
    <SettingCard
      title="AI model"
      description={
        <>
          Powers English writing feedback. The default is Google Gemini — a free API key
          from <span className="text-gray-400">aistudio.google.com</span>, no credit card. Claude
          (via a paid Anthropic key or Google Cloud Vertex AI) is available too. The keys themselves
          live under Accounts &amp; keys.
        </>
      }
    >
      <label className="label" htmlFor="ai-provider">Provider</label>
      <div className="mb-4 flex items-center gap-2">
        <select
          id="ai-provider"
          className="input"
          value={aiProvider}
          onChange={(e) => {
            const p = e.target.value
            setAiProvider(p)
            // Keep the model list coherent with the chosen provider.
            if (p === 'gemini' && aiModel.startsWith('claude')) setAiModel('gemini-2.5-flash')
            if (p !== 'gemini' && aiModel.startsWith('gemini')) setAiModel('claude-opus-4-8')
          }}
        >
          <option value="gemini">Google Gemini (free — AI Studio)</option>
          <option value="anthropic">Anthropic API (Claude)</option>
          <option value="vertex">Google Cloud Vertex AI (Claude)</option>
        </select>
        <button className="btn-ghost shrink-0" onClick={() => onSave('coach.provider', aiProvider)}>
          Save
        </button>
      </div>

      <label className="label" htmlFor="ai-model">Model</label>
      <div className="mb-4 flex items-center gap-2">
        <select id="ai-model" className="input" value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
          {aiProvider === 'gemini' ? (
            <>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (free, recommended)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (smarter, tighter free limit)</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
            </>
          ) : (
            <>
              <option value="claude-opus-4-8">Claude Opus 4.8 (best)</option>
              <option value="claude-sonnet-5">Claude Sonnet 5 (cheaper)</option>
              <option value="claude-haiku-4-5">Claude Haiku 4.5 (cheapest)</option>
            </>
          )}
        </select>
        <button className="btn-ghost shrink-0" onClick={() => onSave('coach.model', aiModel)}>
          Save
        </button>
      </div>

      {aiProvider === 'gemini' ? (
        <AiKeyStatus title="Gemini API key" settingKey="gemini.api_key" state={secretStorage} />
      ) : aiProvider === 'vertex' ? (
        <div className="space-y-3">
          <div>
            <label className="label" htmlFor="vertex-project">Google Cloud project id</label>
            <div className="flex items-center gap-2">
              <input
                id="vertex-project"
                className="input"
                type="text"
                value={vertexProject}
                onChange={(e) => setVertexProject(e.target.value)}
                placeholder="my-gcp-project-123456"
              />
              <button
                className="btn-ghost shrink-0"
                onClick={() => onSave('vertex.project_id', vertexProject.trim())}
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="vertex-region">Region (optional, defaults to global)</label>
            <div className="flex items-center gap-2">
              <input
                id="vertex-region"
                className="input"
                type="text"
                value={vertexRegion}
                onChange={(e) => setVertexRegion(e.target.value)}
                placeholder="global"
              />
              <button
                className="btn-ghost shrink-0"
                onClick={() => onSave('vertex.region', vertexRegion.trim())}
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="vertex-credentials">Service-account key file (optional)</label>
            <div className="flex items-center gap-2">
              <input
                id="vertex-credentials"
                className="input"
                type="text"
                value={vertexCreds}
                onChange={(e) => setVertexCreds(e.target.value)}
                placeholder="/home/you/gcp-service-account.json"
              />
              <button
                className="btn-ghost shrink-0"
                onClick={() => onSave('vertex.credentials_path', vertexCreds.trim())}
              >
                Save
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Leave blank if you've run{' '}
              <span className="text-gray-400">gcloud auth application-default login</span> on this
              machine.
            </p>
          </div>
        </div>
      ) : (
        <AiKeyStatus title="Anthropic API key" settingKey="anthropic.api_key" state={secretStorage} />
      )}
    </SettingCard>
  )
}

// The AI card shows whether its provider's key is set and links to it; the key
// itself is edited with every other key under Accounts & keys.
function AiKeyStatus({
  title,
  settingKey,
  state
}: {
  title: string
  settingKey: SecretSettingKey
  state?: SecretStorageState
}) {
  const openSetting = useOpenSetting()
  const unreadable = state?.unreadable.includes(settingKey) ?? false
  const saved = state?.configured[settingKey] ?? false
  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className={`text-sm ${unreadable || !saved ? 'text-amber-300' : 'text-ink-secondary'}`}>
        {title}: {unreadable ? 'saved but unreadable on this system' : saved ? 'set' : 'not set'}
      </p>
      <button type="button" className="btn-ghost" onClick={() => openSetting(title)}>
        {saved && !unreadable ? 'Change key' : 'Set key'}
      </button>
    </div>
  )
}

// ---- Tools ------------------------------------------------------------------

export function YtdlpSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [ytdlpPath, setYtdlpPath] = useState('')
  const [ytdlpCheck, setYtdlpCheck] = useState<YtDlpDetectResult | null>(null)
  useEffect(() => setYtdlpPath(data?.['ytdlp.path'] ?? ''), [data])

  async function testYtdlp() {
    setYtdlpCheck(null)
    await onSave('ytdlp.path', ytdlpPath.trim())
    setYtdlpCheck(await api.music.downloadDetect())
  }

  return (
    <SettingCard
      title="yt-dlp (music downloads)"
      description={
        <>
          Used by the Music page&apos;s Download button. Install yt-dlp and ffmpeg yourself (e.g.{' '}
          <span className="text-gray-400">pipx install yt-dlp</span> or your package manager) and
          keep yt-dlp updated — YouTube changes often. Leave blank to use{' '}
          <span className="text-gray-400">yt-dlp</span> from PATH, or set a full binary path.
        </>
      }
    >
      <div className="flex items-center gap-2">
        <Field label="yt-dlp executable path" hiddenLabel className="contents">
          <input
            className="input"
            type="text"
            value={ytdlpPath}
            onChange={(e) => setYtdlpPath(e.target.value)}
            placeholder="yt-dlp"
          />
        </Field>
        <button className="btn-ghost shrink-0" onClick={testYtdlp}>
          Save &amp; test
        </button>
      </div>
      {ytdlpCheck && (
        <p className={`mt-3 text-sm ${ytdlpCheck.ok ? 'text-green-400' : 'text-red-400'}`}>
          {ytdlpCheck.ok
            ? `✓ yt-dlp ${ytdlpCheck.version} · ffmpeg found`
            : (ytdlpCheck.error ?? 'yt-dlp not found')}
          {ytdlpCheck.ok && ytdlpCheck.versionOld && (
            <span className="block text-yellow-400">
              This yt-dlp is over 3 months old — update it (yt-dlp -U or your package manager) if
              downloads fail.
            </span>
          )}
        </p>
      )}
    </SettingCard>
  )
}

export function MusicDownloadSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [cookieFile, setCookieFile] = useState('')
  const [workers, setWorkers] = useState('4')
  const [ffmpegPath, setFfmpegPath] = useState('')
  const [check, setCheck] = useState<MusicToolsCheck | null>(null)
  const [testingYouTube, setTestingYouTube] = useState(false)
  const [installingDeno, setInstallingDeno] = useState(false)
  useEffect(() => setCookieFile(data?.['spotdl.cookieFile'] ?? ''), [data])
  useEffect(() => setWorkers(data?.['music.downloadWorkers'] ?? '4'), [data])
  useEffect(() => setFfmpegPath(data?.['music.ffmpegPath'] ?? ''), [data])

  async function test(): Promise<void> {
    setCheck(null)
    await onSave('spotdl.cookieFile', cookieFile.trim())
    await onSave('music.downloadWorkers', workers)
    await onSave('music.ffmpegPath', ffmpegPath.trim())
    setCheck(await api.music.spotifyDetect())
  }

  async function installDeno(): Promise<void> {
    setInstallingDeno(true)
    try {
      setCheck(await api.music.spotifyInstallDeno())
    } finally {
      setInstallingDeno(false)
    }
  }

  async function chooseCookieFile(): Promise<void> {
    const chosen = await api.music.spotifyPickCookieFile()
    if (!chosen) return
    setCookieFile(chosen)
    await onSave('spotdl.cookieFile', chosen)
    setCheck(await api.music.spotifyDetect())
  }

  async function testYouTube(): Promise<void> {
    setTestingYouTube(true)
    try {
      const nextCookieFile = cookieFile.trim()
      if (nextCookieFile !== (data?.['spotdl.cookieFile'] ?? '')) {
        await onSave('spotdl.cookieFile', nextCookieFile)
      }
      const result = await api.music.spotifyTestYouTubeAccess(true)
      setCheck(await api.music.spotifyDetect())
      if (!result.ok) throw new Error(result.message)
    } finally {
      setTestingYouTube(false)
    }
  }

  return (
    <SettingCard
      title="Playlist and catalogue downloads"
      description={
        <>
          Spotify playlists, albums and artists are read directly with no account or extra tool.
          Missing songs are found on YouTube Music and saved in their original Opus or AAC
          quality with Spotify&apos;s tags and cover, using the yt-dlp and ffmpeg set above.
        </>
      }
    >
      <Field label="Concurrent music downloads" description="One shared limit for the queue; lower it if your connection is throttled.">
        <select className="input" value={workers} onChange={(event) => setWorkers(event.target.value)}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}</select>
      </Field>
      <Field label="ffmpeg executable path (optional)"><input className="input w-full" value={ffmpegPath} onChange={(event) => setFfmpegPath(event.target.value)} placeholder="ffmpeg" /></Field>
      <label className="label mt-4" htmlFor="music-cookie-file">YouTube cookies.txt (optional)</label>
      <div className="flex gap-2">
        <input
          id="music-cookie-file"
          className="input min-w-0 flex-1"
          type="text"
          value={cookieFile}
          onChange={(event) => setCookieFile(event.target.value)}
          placeholder={'C:\\Users\\you\\Documents\\youtube-cookies.txt'}
        />
        <button className="btn-ghost shrink-0" onClick={() => void chooseCookieFile()}>Choose…</button>
      </div>
      <p className="mt-2 text-xs text-gray-400">
        A YouTube Music Premium session can unlock the 256 kbps AAC stream. Export from a
        fresh private session and keep the same VPN connection. Treat this file like a password;
        NaviHUB never copies it into a library export.
      </p>
      <button className="btn-ghost mt-3" onClick={() => void test()}>
        Save &amp; test
      </button>
      {check && (
        <div className="mt-3 text-sm">
          <p className={check.ok ? 'text-green-400' : 'text-red-400'}>
            {check.ok ? `Ready: yt-dlp ${check.ytdlpVersion ?? ''} and ffmpeg` : (check.error ?? 'Download tools are not ready')}
          </p>
          <p className="mt-1 text-gray-400">
            JavaScript runtime: {check.jsRuntime ?? 'missing'} · Opus cover art: {check.coverArt ? 'embedded' : 'saved as the album folder cover'}
            {check.cookieConfigured && ` · cookies file: ${check.cookieValid ? 'readable' : 'invalid'}`}
          </p>
          <p className="mt-1 text-gray-400">
            YouTube: {check.youtubeAccess?.state === 'ready'
              ? `working with cookies${check.youtubeAccess.bitrate ? ` · ${Math.round(check.youtubeAccess.bitrate)} kbps available` : ''}`
              : check.youtubeAccess?.state === 'anonymous' ? 'working without cookies'
                : check.youtubeAccess?.state === 'untested' ? 'not tested' : (check.youtubeAccess?.message ?? 'not available')}
          </p>
          <button className="btn-ghost mt-3" disabled={testingYouTube} onClick={() => void testYouTube()}>
            {testingYouTube ? 'Testing YouTube…' : 'Save cookies & test YouTube access'}
          </button>
          {!check.jsRuntime && (
            <button className="btn-ghost mt-3 ml-2" disabled={installingDeno} onClick={() => void installDeno()}>
              {installingDeno ? 'Installing Deno…' : 'Install Deno'}
            </button>
          )}
        </div>
      )}
    </SettingCard>
  )
}

export function MokuroSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [mokuroPath, setMokuroPath] = useState('')
  const [check, setCheck] = useState<MokuroDetectResult | null>(null)
  useEffect(() => setMokuroPath(data?.['mokuro.path'] ?? ''), [data])

  async function test() {
    setCheck(null)
    await onSave('mokuro.path', mokuroPath.trim())
    setCheck(await api.manga.ocrDetect())
  }

  return (
    <SettingCard
      title="mokuro (manga OCR)"
      description={
        <>
          Powers the Run OCR button on a manga&apos;s Chapters tab: mokuro reads speech bubbles so
          the reader can overlay tappable text for dictionary lookups and mining. Install it
          yourself (<span className="text-gray-400">pipx install mokuro</span>); its first run
          downloads ~450 MB of OCR models. Leave blank to use{' '}
          <span className="text-gray-400">mokuro</span> from PATH, or set a full binary path.
        </>
      }
    >
      <div className="flex items-center gap-2">
        <Field label="mokuro executable path" hiddenLabel className="contents">
          <input
            className="input"
            type="text"
            value={mokuroPath}
            onChange={(e) => setMokuroPath(e.target.value)}
            placeholder="mokuro"
          />
        </Field>
        <button className="btn-ghost shrink-0" onClick={test}>
          Save &amp; test
        </button>
      </div>
      {check && (
        <p className={`mt-3 text-sm ${check.ok ? 'text-green-400' : 'text-red-400'}`}>
          {check.ok ? `✓ mokuro ${check.version}` : (check.error ?? 'mokuro not found')}
        </p>
      )}
    </SettingCard>
  )
}

// ffmpeg/ffprobe remain optional helpers for linked-video metadata and offline
// Japanese subtitle-corpus extraction. Playback is external and never uses
// either binary.
export function VideoSubtitleToolsSettings({
  data,
  onSave
}: {
  data?: Record<string, string>
  onSave: SaveFn
}) {
  const [ffmpegPath, setFfmpegPath] = useState('')
  const [ffprobePath, setFfprobePath] = useState('')
  const [check, setCheck] = useState<VideoToolsResult | null>(null)
  const savedFfmpegPath = data?.['ffmpeg.path']
  const savedFfprobePath = data?.['ffprobe.path']
  useEffect(() => setFfmpegPath(savedFfmpegPath ?? ''), [savedFfmpegPath])
  useEffect(() => setFfprobePath(savedFfprobePath ?? ''), [savedFfprobePath])

  async function test() {
    setCheck(null)
    await onSave('ffmpeg.path', ffmpegPath.trim())
    await onSave('ffprobe.path', ffprobePath.trim())
    setCheck(await api.video.tools())
  }

  return (
    <SettingCard
      title="ffmpeg (video library tools)"
      description={
        <>
          Optional: ffprobe reads duration and codec metadata, while ffmpeg extracts embedded text
          subtitles for offline Japanese coverage and prep decks. Files always open in your system
          video player, whether these tools are installed or not. Leave the fields blank to use PATH.
        </>
      }
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            className="input"
            type="text"
            value={ffmpegPath}
            onChange={(e) => setFfmpegPath(e.target.value)}
            placeholder="ffmpeg"
            aria-label="ffmpeg path"
          />
          <input
            className="input"
            type="text"
            value={ffprobePath}
            onChange={(e) => setFfprobePath(e.target.value)}
            placeholder="ffprobe"
            aria-label="ffprobe path"
          />
          <button className="btn-ghost shrink-0" onClick={test}>
            Save &amp; test
          </button>
        </div>
        {check && (
          <p className={`text-sm ${check.ffmpeg && check.ffprobe ? 'text-green-400' : 'text-red-400'}`}>
            {check.ffmpeg && check.ffprobe
              ? `✓ ${check.ffmpegVersion ?? 'ffmpeg found'}`
              : `${check.ffmpeg ? 'ffmpeg found' : 'ffmpeg not found'} · ${check.ffprobe ? 'ffprobe found' : 'ffprobe not found'}`}
          </p>
        )}
      </div>
    </SettingCard>
  )
}

// Jackett (torrent search) + qBittorrent (hand-off) — both user-installed
// local services, like yt-dlp. "Save & test" saves every field first, then
// probes the service; the probe never rejects, so results render inline.
export function TorrentSettings({
  data,
  secretStorage,
  onSave
}: {
  data?: Record<string, string>
  secretStorage?: SecretStorageState
  onSave: SaveFn
}) {
  const [jackettUrl, setJackettUrl] = useState('')
  const [jackettKey, setJackettKey] = useState('')
  const [jackettStart, setJackettStart] = useState('')
  const [jackettCheck, setJackettCheck] = useState<TorrentServiceTestResult | null>(null)
  const [qbUrl, setQbUrl] = useState('')
  const [qbUser, setQbUser] = useState('')
  const [qbPass, setQbPass] = useState('')
  const [qbCheck, setQbCheck] = useState<TorrentServiceTestResult | null>(null)

  const savedJackettUrl = data?.['jackett.url']
  const savedJackettStart = data?.['jackett.start_cmd']
  const savedQbUrl = data?.['qbittorrent.url']
  const savedQbUser = data?.['qbittorrent.username']
  useEffect(() => setJackettUrl(savedJackettUrl ?? ''), [savedJackettUrl])
  useEffect(() => setJackettStart(savedJackettStart ?? ''), [savedJackettStart])
  useEffect(() => setQbUrl(savedQbUrl ?? ''), [savedQbUrl])
  useEffect(() => setQbUser(savedQbUser ?? ''), [savedQbUser])

  async function testJackett() {
    setJackettCheck(null)
    await onSave('jackett.url', jackettUrl.trim())
    if (jackettKey.trim()) {
      await onSave('jackett.api_key', jackettKey.trim())
      setJackettKey('')
    }
    await onSave('jackett.start_cmd', jackettStart.trim())
    setJackettCheck(await api.torrents.testJackett())
  }

  async function testQb() {
    setQbCheck(null)
    await onSave('qbittorrent.url', qbUrl.trim())
    await onSave('qbittorrent.username', qbUser.trim())
    if (qbPass) {
      await onSave('qbittorrent.password', qbPass)
      setQbPass('')
    }
    setQbCheck(await api.torrents.testQbittorrent())
  }

  const field = 'grid grid-cols-[110px_1fr] items-center gap-2'
  return (
    <>
      <SettingCard
        title="Jackett (torrent search)"
        description="Powers the Find torrents button on media pages and the Torrents page. Run Jackett yourself; the API key is shown on its dashboard."
      >
        <div className="space-y-2">
          <div className={field}>
            <label className="label" htmlFor="jackett-url">URL</label>
            <input
              id="jackett-url"
              className="input"
              value={jackettUrl}
              onChange={(e) => setJackettUrl(e.target.value)}
              placeholder="http://localhost:9117"
            />
          </div>
          <div className={field}>
            <label className="label" htmlFor="jackett-api-key">API key</label>
            <div className="flex items-center gap-2">
              <input
                id="jackett-api-key"
                className="input"
                type="password"
                value={jackettKey}
                onChange={(e) => setJackettKey(e.target.value)}
                placeholder={secretStorage?.configured['jackett.api_key'] ? 'Saved — enter a replacement' : undefined}
              />
              {secretStorage?.configured['jackett.api_key'] && (
                <button
                  className="btn-ghost shrink-0"
                  onClick={async () => {
                    if (!(await confirmDialog('Clear the saved Jackett API key?', { confirmLabel: 'Clear', danger: true }))) return
                    await onSave('jackett.api_key', '')
                    setJackettKey('')
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <SecretStateLine settingKey="jackett.api_key" state={secretStorage} />
          <div className={field}>
            <label className="label" htmlFor="jackett-start-command">Start command</label>
            <input
              id="jackett-start-command"
              className="input"
              value={jackettStart}
              onChange={(e) => setJackettStart(e.target.value)}
              placeholder="systemctl start --no-ask-password jackett.service"
            />
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Run by the Start Jackett button when Jackett isn&apos;t answering. Leave blank for the
          default shown above. Run directly, not through a shell — no pipes or quoting.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            className="btn-ghost"
            disabled={!!jackettKey.trim() && !secretStorage?.available}
            onClick={testJackett}
          >
            Save &amp; test
          </button>
          <StartJackettButton />
        </div>
        {jackettCheck && (
          <p className={`mt-3 text-sm ${jackettCheck.ok ? 'text-green-400' : 'text-red-400'}`}>
            {jackettCheck.message}
          </p>
        )}
      </SettingCard>

      <SettingCard
        title="qBittorrent (torrent hand-off)"
        description={
          <>
            Where the Add button sends torrents. Username/password can stay blank if
            qBittorrent&apos;s{' '}
            <span className="text-gray-400">Bypass authentication for clients on localhost</span> is
            enabled (Options → Web UI).
          </>
        }
      >
        <div className="space-y-2">
          <div className={field}>
            <label className="label" htmlFor="qbittorrent-url">URL</label>
            <input
              id="qbittorrent-url"
              className="input"
              value={qbUrl}
              onChange={(e) => setQbUrl(e.target.value)}
              placeholder="http://localhost:8080"
            />
          </div>
          <div className={field}>
            <label className="label" htmlFor="qbittorrent-username">Username</label>
            <input id="qbittorrent-username" className="input" value={qbUser} onChange={(e) => setQbUser(e.target.value)} />
          </div>
          <div className={field}>
            <label className="label" htmlFor="qbittorrent-password">Password</label>
            <div className="flex items-center gap-2">
              <input
                id="qbittorrent-password"
                className="input"
                type="password"
                value={qbPass}
                onChange={(e) => setQbPass(e.target.value)}
                placeholder={secretStorage?.configured['qbittorrent.password'] ? 'Saved — enter a replacement' : undefined}
              />
              {secretStorage?.configured['qbittorrent.password'] && (
                <button
                  className="btn-ghost shrink-0"
                  onClick={async () => {
                    if (!(await confirmDialog('Clear the saved qBittorrent password?', { confirmLabel: 'Clear', danger: true }))) return
                    await onSave('qbittorrent.password', '')
                    setQbPass('')
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <SecretStateLine settingKey="qbittorrent.password" state={secretStorage} />
        </div>
        <button
          className="btn-ghost mt-3"
          disabled={!!qbPass && !secretStorage?.available}
          onClick={testQb}
        >
          Save &amp; test
        </button>
        {qbCheck && (
          <p className={`mt-3 text-sm ${qbCheck.ok ? 'text-green-400' : 'text-red-400'}`}>
            {qbCheck.message}
          </p>
        )}
      </SettingCard>
    </>
  )
}

// Offline Japanese dictionaries: install JMdict/KANJIDIC with one click, import
// any other Yomitan .zip, watch import progress, and remove installed ones.
