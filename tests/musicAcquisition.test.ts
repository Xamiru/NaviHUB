import { describe, expect, it } from 'vitest'
import {
  expectedRecording,
  rankYtmSources,
  safePathComponent,
  sourceSearchLocales,
  sourceSearchQueries,
  stagedOutputTemplate,
  taggedInfoJson,
  ytdlpAcquisitionArgs,
  ytdlpHasMutagen
} from '../src/main/musicAcquisition'
import { parseYtmSearch, type YtmSong } from '../src/main/youtubeMusic'

const raw = {
  name: 'Eyes Without A Face - Remastered 1999', artists: ['Billy Idol'], album_name: 'Rebel Yell (Expanded Edition)',
  album_artist: 'Billy Idol', duration: 297.4, disc_number: 1, track_number: 3, year: 1983, date: '1983-11-10',
  song_id: 'spotifyId1', cover_url: 'https://i.scdn.co/image/cover'
}
const song = (overrides: Partial<YtmSong>): YtmSong => ({
  url: 'https://www.youtube.com/watch?v=aaaaaaaaaaa', videoId: 'aaaaaaaaaaa', title: 'Eyes Without A Face (Remastered 1999)',
  artists: ['Billy Idol'], album: 'Greatest Hits', duration: 298, ...overrides
})

describe('YouTube Music source choice', () => {
  it('parses song shelf rows into title, artists, album and duration', () => {
    const run = (text: string, pageType?: string) => ({
      text,
      ...(pageType ? { navigationEndpoint: { browseEndpoint: { browseEndpointContextSupportedConfigs: { browseEndpointContextMusicConfig: { pageType } } } } } : {})
    })
    const body = { contents: { tabbedSearchResultsRenderer: { tabs: [{ tabRenderer: { content: { sectionListRenderer: { contents: [{ musicShelfRenderer: { contents: [{
      musicResponsiveListItemRenderer: {
        playlistItemData: { videoId: 'WOBHXxiZyZM' },
        flexColumns: [
          { musicResponsiveListItemFlexColumnRenderer: { text: { runs: [run("Arthur's Theme (Best That You Can Do)")] } } },
          { musicResponsiveListItemFlexColumnRenderer: { text: { runs: [
            run('Christopher Cross', 'MUSIC_PAGE_TYPE_ARTIST'), run(' & '), run('Burt Bacharach', 'MUSIC_PAGE_TYPE_ARTIST'), run(' • '),
            run('Arthur - The Album', 'MUSIC_PAGE_TYPE_ALBUM'), run(' • '), run('3:55')
          ] } } }
        ]
      }
    }] } }] } } } }] } } }
    expect(parseYtmSearch(body)).toEqual([{
      url: 'https://www.youtube.com/watch?v=WOBHXxiZyZM', videoId: 'WOBHXxiZyZM', title: "Arthur's Theme (Best That You Can Do)",
      artists: ['Christopher Cross', 'Burt Bacharach'], album: 'Arthur - The Album', duration: 235
    }])
    expect(parseYtmSearch({})).toEqual([])
  })

  it('prefers a strong same-recording match and never ranks a variant as strong', () => {
    const expected = expectedRecording(raw)
    const ranked = rankYtmSources(expected, [
      song({ videoId: 'live', title: 'Eyes Without A Face (Live)' }),
      song({ videoId: 'cover', artists: ['Someone Else'] }),
      song({ videoId: 'match' }),
      song({ videoId: 'album', album: 'Rebel Yell (Expanded Edition)', duration: 297 })
    ])
    expect(ranked.map((row) => [row.source.videoId, row.strong])).toEqual([
      ['album', true], ['match', true], ['cover', false], ['live', false]
    ])
    expect(ranked.at(-1)?.reasons).toContain('Recording variant differs')
  })

  it('keeps a Japanese credit separator out of the artist list', () => {
    const row = (runs: string[]) => ({ contents: { tabbedSearchResultsRenderer: { tabs: [{ tabRenderer: { content: { sectionListRenderer: { contents: [{ musicShelfRenderer: { contents: [{
      musicResponsiveListItemRenderer: { playlistItemData: { videoId: 'aaaaaaaaaaa' }, flexColumns: [
        { musicResponsiveListItemFlexColumnRenderer: { text: { runs: [{ text: 'veil' }] } } },
        { musicResponsiveListItemFlexColumnRenderer: { text: { runs: runs.map((text) => ({ text })) } } }
      ] }
    }] } }] } } } }] } } })
    expect(parseYtmSearch(row(['フレデリック', '、', '須田景凪', ' • ', '3:28']))[0].artists).toEqual(['フレデリック', '須田景凪'])
  })

  it('combines one video seen from several catalogue languages', () => {
    const expected = { title: 'We love sweets', artist: '花冷え。', duration: 160, albumTitle: "Girl's Reform Manifest" }
    const english = song({ videoId: 'sweets00001', title: '我甘党 - We love sweets', artists: ['HANABIE.'], duration: 160 })
    const japanese = song({ videoId: 'sweets00001', title: '我甘党', artists: ['花冷え。'], duration: 160 })
    expect(rankYtmSources(expected, [english]).map((row) => row.strong)).toEqual([false])
    const ranked = rankYtmSources(expected, [english, japanese])
    expect(ranked).toHaveLength(1)
    expect(ranked[0].strong).toBe(true)
    expect(ranked[0].source.videoId).toBe('sweets00001')
  })

  it('searches the native catalogues only for songs written in their scripts', () => {
    const locales = (title: string, artist: string) => sourceSearchLocales({ title, artist, duration: null, albumTitle: '' })
    expect(locales('Blinding Lights', 'The Weeknd')).toEqual(['en'])
    expect(locales('ひとりぼっち東京', '結束バンド')).toEqual(['en', 'ja'])
    expect(locales('春雷', 'Kenshi Yonezu')).toEqual(['en', 'ja', 'zh'])
    expect(locales('봄날', 'BTS')).toEqual(['en', 'ko'])
    expect(locales('Группа крови', 'Кино')).toEqual(['en', 'ru'])
  })

  it('accepts the primary artist inside a joined collaboration credit', () => {
    const ranked = rankYtmSources({ title: 'Under Pressure', artist: 'Queen', duration: 248, albumTitle: 'Hot Space' },
      [song({ title: 'Under Pressure', artists: ['Queen', 'David Bowie'], duration: 248 })])
    expect(ranked[0].strong).toBe(true)
  })

  it('retries without a version suffix only when one exists', () => {
    expect(sourceSearchQueries(expectedRecording(raw))).toEqual([
      'Billy Idol Eyes Without A Face - Remastered 1999', 'Billy Idol Eyes Without A Face'
    ])
    expect(sourceSearchQueries({ title: 'Take on Me', artist: 'a-ha', duration: 225, albumTitle: '' })).toEqual(['a-ha Take on Me'])
  })
})

describe('native acquisition output', () => {
  it('stages a Windows-safe artist/album/track path with run and source markers', () => {
    expect(safePathComponent('AC/DC: Live?  ', 'x')).toBe('AC_DC_ Live_')
    expect(safePathComponent('CON', 'Fallback')).toBe('Fallback')
    expect(safePathComponent('...', 'Fallback')).toBe('Fallback')
    const template = stagedOutputTemplate('/music/.spotdl/navihub-downloads', { ...raw, name: '100% Pure Love' }, 'run-1')
    expect(template).toBe('/music/.spotdl/navihub-downloads/Billy Idol/Rebel Yell (Expanded Edition)/1-03 - 100%% Pure Love [navirun-run-1] [navihub-spotifyId1].%(ext)s')
    expect(stagedOutputTemplate('/s', { ...raw, track_number: null }, 'r')).toMatch(/\/Eyes Without A Face - Remastered 1999 \[navirun-r\]/)
  })

  it('writes the Spotify identity and cover over the source metadata', () => {
    const tagged = taggedInfoJson({ id: 'vid', title: 'YouTube title', formats: [1], description: 'long text', thumbnails: [{ url: 'yt.jpg' }],
      timestamp: 1532908800, categories: ['Music'] }, raw)
    expect(tagged).toMatchObject({
      id: 'vid', formats: [1], title: raw.name, track: raw.name, artist: 'Billy Idol', album: raw.album_name,
      album_artist: 'Billy Idol', track_number: 3, disc_number: 1, release_year: 1983, release_date: '19831110',
      description: null, thumbnails: [{ url: raw.cover_url }], upload_date: '19831110', timestamp: null, categories: null
    })
    // yt-dlp's date filter throws on a non-YYYYMMDD upload_date ("time data '1983' does not match format").
    expect(taggedInfoJson({}, { ...raw, date: '1983' })).toMatchObject({ upload_date: null, meta_date: '1983' })
  })

  it('selects the observed codec exactly so audio is copied, not transcoded', () => {
    const args = ytdlpAcquisitionArgs({ base: ['--ignore-config'], infoFile: '/tmp/i.json', outputTemplate: '/o.%(ext)s', format: 'm4a', embedThumbnail: true })
    expect(args.slice(0, 3)).toEqual(['--ignore-config', '--load-info-json', '/tmp/i.json'])
    expect(args[args.indexOf('--format') + 1]).toBe('bestaudio[acodec^=mp4a]')
    expect(args).toContain('--extract-audio')
    expect(args).not.toContain('--audio-format')
    expect(args).toContain('--embed-thumbnail')
    expect(ytdlpAcquisitionArgs({ base: [], infoFile: 'i', outputTemplate: 'o', format: 'opus', embedThumbnail: false }))
      .not.toContain('--embed-thumbnail')
    expect(ytdlpHasMutagen('[debug] Optional libraries: mutagen-1.48.1, sqlite3-3.45.1')).toBe(true)
    expect(ytdlpHasMutagen('[debug] Optional libraries: sqlite3-3.45.1')).toBe(false)
  })
})
