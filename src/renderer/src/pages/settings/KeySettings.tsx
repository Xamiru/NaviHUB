import { type SecretStorageState } from '@shared/types'
import { type SaveFn, TextSetting } from './shared'

// ---- Import API keys --------------------------------------------------------

export function ApiKeysSettings({
  data,
  secretStorage,
  onSave
}: {
  data?: Record<string, string>
  secretStorage?: SecretStorageState
  onSave: SaveFn
}) {
  return (
    <>
      <TextSetting
        settingKey="tmdb.api_key"
        data={data}
        onSave={onSave}
        title="TMDB API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your TMDB API key…"
        description={
          <>
            Required to import movies. Get a free key at{' '}
            <span className="text-gray-400">themoviedb.org → Settings → API</span> (the v3 “API
            Key”). Stored locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="omdb.api_key"
        data={data}
        onSave={onSave}
        title="OMDb API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your OMDb API key…"
        description={
          <>
            Optional. Adds IMDb rating + Rotten Tomatoes to movies/TV on import. Get a free key at{' '}
            <span className="text-gray-400">omdbapi.com → API Key</span> (1,000 lookups/day). Stored
            locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="hardcover.token"
        data={data}
        onSave={onSave}
        title="Hardcover API token"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your Hardcover API token…"
        description={
          <>
            Required to import books from Hardcover (series, characters, genres, editions). Create a
            free account, then <span className="text-gray-400">hardcover.app → Settings → Hardcover
            API → New API Key</span>; read-only permissions are enough, and you choose when it
            expires. Open Library stays available without a token. Stored locally on this machine
            only.
          </>
        }
      />
      <TextSetting
        settingKey="fanarttv.api_key"
        data={data}
        onSave={onSave}
        title="fanart.tv API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your fanart.tv API key…"
        description={
          <>
            Optional. Adds fanart.tv backgrounds to the Art tab of movies and TV shows. Get a free
            key at <span className="text-gray-400">fanart.tv → Profile → API Keys</span>. Stored
            locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="football.api_key"
        data={data}
        onSave={onSave}
        title="API-Football key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your API-Football key…"
        description="Optional. Enables manual current-season refreshes for Football. The key is sent only in API-Football's authorization header and stays on this machine. History installation uses keyless bulk datasets."
      />
      {/* Games IMPORT runs on Steam's keyless storefront API — no key needed.
          The key below is only for achievement lists, which come from the
          separate Web API. (RAWG and IGDB both remain in code but need
          keys/2FA the user can't get; their settings keys stay in the sanitize
          wipe list.) */}
      <TextSetting
        settingKey="steam.web_api_key"
        data={data}
        onSave={onSave}
        title="Steam Web API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your Steam Web API key…"
        description={
          <>
            Optional, and most people can skip it: achievement lists come from the game’s own
            steam_settings folder or Steam’s public stats page without one. Steam only issues keys
            to accounts that have spent money. Stored locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="steamgriddb.api_key"
        data={data}
        onSave={onSave}
        title="SteamGridDB API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your SteamGridDB API key…"
        description={
          <>
            Optional. Adds SteamGridDB hero banners to the Art tab of games. Sign in at{' '}
            <span className="text-gray-400">steamgriddb.com → Preferences → API</span> for a free
            key. Stored locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="ra.username"
        data={data}
        onSave={onSave}
        title="RetroAchievements username"
        placeholder="Your RA account name…"
        description={
          <>
            Optional. Enables achievements for emulated games. Play through an RA-enabled emulator
            signed into this account and unlocks sync here.
          </>
        }
      />
      <TextSetting
        settingKey="ra.api_key"
        data={data}
        onSave={onSave}
        title="RetroAchievements Web API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your RA Web API key…"
        description={
          <>
            Found on <span className="text-gray-400">retroachievements.org → Settings → Keys</span>.
            Stored locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="gemini.api_key"
        data={data}
        onSave={onSave}
        title="Gemini API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="AIza…"
        description={
          <>
            Used by English writing feedback when the AI provider is Gemini. Free at{' '}
            <span className="text-gray-400">aistudio.google.com</span> → “Get API key”; no credit
            card, rate-limited but $0.
          </>
        }
      />
      <TextSetting
        settingKey="anthropic.api_key"
        data={data}
        onSave={onSave}
        title="Anthropic API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="sk-ant-…"
        description={
          <>
            Used by English writing feedback when the AI provider is the Anthropic API. Get one at{' '}
            <span className="text-gray-400">platform.claude.com</span> (needs prepaid credit,
            separate from a Claude.ai subscription).
          </>
        }
      />
    </>
  )
}
