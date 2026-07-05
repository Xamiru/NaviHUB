import { ipcMain } from 'electron'
import * as mediaRepo from './repos/mediaRepo'
import * as peopleRepo from './repos/peopleRepo'
import * as companyRepo from './repos/companyRepo'
import * as characterRepo from './repos/characterRepo'
import * as linkRepo from './repos/linkRepo'
import * as tagRepo from './repos/tagRepo'
import * as settingsRepo from './repos/settingsRepo'
import * as searchRepo from './repos/searchRepo'
import * as quizRepo from './repos/quizRepo'
import * as listRepo from './repos/listRepo'
import * as japaneseRepo from './repos/japaneseRepo'
import * as anilist from './anilist'
import * as tmdb from './tmdb'
import * as vndb from './vndb'
import * as rawg from './rawg'
import * as themes from './themes'
import * as hltb from './hltb'
import * as files from './files'
import * as manga from './manga'
import { getActivity, withActivity } from './progress'
import * as music from './music'
import * as musicRepo from './repos/musicRepo'
import * as musicDownload from './musicDownload'
import * as musicArt from './musicArt'
import * as mokuro from './mokuro'
import * as tokenizer from './tokenizer'
import * as dictImporter from './dict/importer'
import * as dictLookup from './dict/lookup'

// Each channel name mirrors the NaviApi surface in src/shared/api.ts.
// Handlers are thin: validate nothing exotic, delegate to a repo, return data.
export function registerIpc(): void {
  // ---- media ----
  ipcMain.handle('media:list', (_e, filter) => mediaRepo.list(filter))
  ipcMain.handle('media:get', (_e, id) => mediaRepo.get(id))
  ipcMain.handle('media:create', (_e, input) => mediaRepo.create(input))
  ipcMain.handle('media:update', (_e, id, input) => mediaRepo.update(id, input))
  ipcMain.handle('media:remove', (_e, id) => mediaRepo.remove(id))
  ipcMain.handle('media:removeCharacter', (_e, mediaId, characterId) =>
    linkRepo.removeMediaCharacter(mediaId, characterId)
  )
  ipcMain.handle('media:statusCounts', (_e, mediaType) => mediaRepo.statusCounts(mediaType))
  ipcMain.handle('media:timeStats', () => mediaRepo.timeStats())

  // ---- people ----
  ipcMain.handle('people:list', (_e, search, role, mediaType) =>
    peopleRepo.list(search, role, mediaType)
  )
  ipcMain.handle('people:get', (_e, id) => peopleRepo.get(id))
  ipcMain.handle('people:credits', (_e, id) => peopleRepo.credits(id))
  ipcMain.handle('people:upsert', (_e, input) => peopleRepo.upsert(input))
  ipcMain.handle('people:remove', (_e, id) => peopleRepo.remove(id))

  // ---- companies ----
  ipcMain.handle('companies:list', (_e, search, mediaType) => companyRepo.list(search, mediaType))
  ipcMain.handle('companies:get', (_e, id) => companyRepo.get(id))
  ipcMain.handle('companies:media', (_e, id) => companyRepo.media(id))
  ipcMain.handle('companies:upsert', (_e, input) => companyRepo.upsert(input))
  ipcMain.handle('companies:remove', (_e, id) => companyRepo.remove(id))

  // ---- characters ----
  ipcMain.handle('characters:list', (_e, search) => characterRepo.list(search))
  ipcMain.handle('characters:get', (_e, id) => characterRepo.get(id))
  ipcMain.handle('characters:cast', (_e, id) => characterRepo.cast(id))
  ipcMain.handle('characters:roles', (_e, id) => characterRepo.roles(id))
  ipcMain.handle('characters:upsert', (_e, input) => characterRepo.upsert(input))
  ipcMain.handle('characters:remove', (_e, id) => characterRepo.remove(id))

  // ---- credits & media-company links ----
  ipcMain.handle('credits:add', (_e, input) => linkRepo.addCredit(input))
  ipcMain.handle('credits:remove', (_e, id) => linkRepo.removeCredit(id))
  ipcMain.handle('mediaCompanies:add', (_e, input) => linkRepo.addMediaCompany(input))
  ipcMain.handle('mediaCompanies:remove', (_e, id) => linkRepo.removeMediaCompany(id))

  // ---- tags ----
  ipcMain.handle('tags:list', () => tagRepo.list())
  ipcMain.handle('tags:upsert', (_e, input) => tagRepo.upsert(input))
  ipcMain.handle('tags:remove', (_e, id) => tagRepo.remove(id))

  // ---- global search ----
  ipcMain.handle('search:global', (_e, query) => searchRepo.global(query))

  // ---- quiz ----
  ipcMain.handle('quiz:songPool', (_e, filter) => quizRepo.songPool(filter))

  // ---- HowLongToBeat times (games + VNs) ----
  ipcMain.handle('hltb:fetch', (_e, mediaId) => hltb.fetchForMedia(mediaId))

  // ---- lists ----
  ipcMain.handle('lists:list', (_e, kind) => listRepo.list(kind))
  ipcMain.handle('lists:get', (_e, id) => listRepo.get(id))
  ipcMain.handle('lists:create', (_e, input) => listRepo.create(input))
  ipcMain.handle('lists:update', (_e, id, input) => listRepo.update(id, input))
  ipcMain.handle('lists:remove', (_e, id) => listRepo.remove(id))
  ipcMain.handle('lists:addItem', (_e, listId, entityId, note) =>
    listRepo.addItem(listId, entityId, note)
  )
  ipcMain.handle('lists:removeItem', (_e, itemId) => listRepo.removeItem(itemId))
  ipcMain.handle('lists:removeItemByEntity', (_e, listId, entityId) =>
    listRepo.removeItemByEntity(listId, entityId)
  )
  ipcMain.handle('lists:updateItem', (_e, itemId, patch) => listRepo.updateItem(itemId, patch))
  ipcMain.handle('lists:reorder', (_e, listId, orderedItemIds) =>
    listRepo.reorder(listId, orderedItemIds)
  )
  ipcMain.handle('lists:forEntity', (_e, kind, entityId) => listRepo.forEntity(kind, entityId))

  // ---- Japanese learning ----
  ipcMain.handle('japanese:listCourses', () => japaneseRepo.listCourses())
  ipcMain.handle('japanese:getCourse', (_e, id) => japaneseRepo.getCourse(id))
  ipcMain.handle('japanese:createCourse', (_e, input) => japaneseRepo.createCourse(input))
  ipcMain.handle('japanese:updateCourse', (_e, id, input) => japaneseRepo.updateCourse(id, input))
  ipcMain.handle('japanese:removeCourse', (_e, id) => japaneseRepo.removeCourse(id))
  ipcMain.handle('japanese:getLesson', (_e, id) => japaneseRepo.getLesson(id))
  ipcMain.handle('japanese:createLesson', (_e, input) => japaneseRepo.createLesson(input))
  ipcMain.handle('japanese:updateLesson', (_e, id, patch) => japaneseRepo.updateLesson(id, patch))
  ipcMain.handle('japanese:removeLesson', (_e, id) => japaneseRepo.removeLesson(id))
  ipcMain.handle('japanese:setLessonLearned', (_e, id, learned) =>
    japaneseRepo.setLessonLearned(id, learned)
  )
  ipcMain.handle('japanese:createCard', (_e, lessonId, input) =>
    japaneseRepo.createCard(lessonId, input)
  )
  ipcMain.handle('japanese:updateCard', (_e, id, patch) => japaneseRepo.updateCard(id, patch))
  ipcMain.handle('japanese:removeCard', (_e, id) => japaneseRepo.removeCard(id))
  ipcMain.handle('japanese:reviewQueue', (_e, newLimit) => japaneseRepo.reviewQueue(newLimit))
  ipcMain.handle('japanese:submitReview', (_e, cardId, grade) =>
    japaneseRepo.submitReview(cardId, grade)
  )
  ipcMain.handle('japanese:quizPool', (_e, scope) => japaneseRepo.quizPool(scope))
  ipcMain.handle('japanese:stats', () => japaneseRepo.stats())
  ipcMain.handle('japanese:ensureMiningInbox', () => japaneseRepo.ensureMiningInbox())
  ipcMain.handle('japanese:tokenize', (_e, text) => tokenizer.tokenize(text))
  ipcMain.handle('japanese:minedFronts', (_e, fronts) => japaneseRepo.minedFronts(fronts))

  // ---- offline dictionaries ----
  ipcMain.handle('dict:list', () => dictImporter.listDictionaries())
  ipcMain.handle('dict:lookup', (_e, query) => dictLookup.lookupWord(query))
  ipcMain.handle('dict:kanji', (_e, text) => dictLookup.lookupKanji(text))
  ipcMain.handle('dict:importPreset', (_e, key) => dictImporter.importPreset(key))
  ipcMain.handle('dict:importZip', () => dictImporter.importZipViaDialog())
  ipcMain.handle('dict:importStatus', () => dictImporter.getImportStatus())
  ipcMain.handle('dict:remove', (_e, id) => dictImporter.removeDictionary(id))

  // ---- local manga reader ----
  ipcMain.handle('manga:attachFolder', (_e, mediaId) => manga.attachFolder(mediaId))
  ipcMain.handle('manga:rescan', (_e, mediaId) => manga.rescan(mediaId))
  ipcMain.handle('manga:detach', (_e, mediaId) => manga.detach(mediaId))
  ipcMain.handle('manga:chapters', (_e, mediaId) => manga.chapters(mediaId))
  ipcMain.handle('manga:pages', (_e, chapterId) => manga.pages(chapterId))
  ipcMain.handle('manga:markProgress', (_e, chapterId, page) =>
    manga.markProgress(chapterId, page)
  )
  ipcMain.handle('manga:markChapterRead', (_e, chapterId, read) =>
    manga.markChapterRead(chapterId, read)
  )
  ipcMain.handle('manga:ocrStatus', (_e, chapterId) => mokuro.status(chapterId))
  ipcMain.handle('manga:ocrPage', (_e, chapterId, pageIndex) => mokuro.page(chapterId, pageIndex))

  // ---- AniList import (anime + manga) ----
  // Imports run inside withActivity so the renderer can poll activity:status
  // for a live progress bar (phases: fetching → images → writing).
  ipcMain.handle('anilist:search', (_e, query) => anilist.search(query))
  ipcMain.handle('anilist:import', (_e, anilistId) =>
    withActivity('Importing from AniList', () => anilist.importAnime(anilistId))
  )
  ipcMain.handle('anilistManga:search', (_e, query) => anilist.searchManga(query))
  ipcMain.handle('anilistManga:import', (_e, anilistId) =>
    withActivity('Importing from AniList', () => anilist.importManga(anilistId))
  )

  // ---- TMDB import (movies + TV) ----
  ipcMain.handle('tmdb:search', (_e, query) => tmdb.search(query))
  ipcMain.handle('tmdb:import', (_e, tmdbId) =>
    withActivity('Importing from TMDB', () => tmdb.importMovie(tmdbId))
  )
  ipcMain.handle('tmdbTv:search', (_e, query) => tmdb.searchTv(query))
  ipcMain.handle('tmdbTv:import', (_e, tmdbId) =>
    withActivity('Importing from TMDB', () => tmdb.importTv(tmdbId))
  )

  // ---- VNDB import (visual novels) ----
  ipcMain.handle('vndb:search', (_e, query) => vndb.search(query))
  ipcMain.handle('vndb:import', (_e, vndbId) =>
    withActivity('Importing from VNDB', () => vndb.importVisualNovel(vndbId))
  )

  // ---- RAWG import (games) ----
  ipcMain.handle('rawg:search', (_e, query) => rawg.search(query))
  ipcMain.handle('rawg:import', (_e, rawgId) =>
    withActivity('Importing from RAWG', () => rawg.importGame(rawgId))
  )

  // ---- AnimeThemes import (anime OP/ED songs) ----
  ipcMain.handle('themes:import', (_e, mediaId) =>
    withActivity('Fetching theme songs', () => themes.importThemes(mediaId))
  )

  // ---- global activity (import progress, polled by the Topbar pill) ----
  ipcMain.handle('activity:status', () => getActivity())

  // ---- music library ----
  ipcMain.handle('music:pickRoot', () => music.pickRootAndScan())
  ipcMain.handle('music:scan', () => music.startScan())
  ipcMain.handle('music:scanStatus', () => music.getScanStatus())
  ipcMain.handle('music:artists', (_e, search) => musicRepo.listArtists(search))
  ipcMain.handle('music:albums', (_e, search) => musicRepo.listAlbums(search))
  ipcMain.handle('music:artist', (_e, id) => musicRepo.getArtist(id))
  ipcMain.handle('music:album', (_e, id) => musicRepo.getAlbum(id))
  ipcMain.handle('music:tracks', (_e, filter) => musicRepo.listTracks(filter))
  ipcMain.handle('music:artistTracks', (_e, artistId) => musicRepo.artistTracks(artistId))
  ipcMain.handle('music:search', (_e, query) => musicRepo.searchAll(query))
  ipcMain.handle('music:stats', () => musicRepo.stats())
  ipcMain.handle('music:playlists', () => musicRepo.listPlaylists())
  ipcMain.handle('music:playlist', (_e, id) => musicRepo.getPlaylist(id))
  ipcMain.handle('music:createPlaylist', (_e, input) => musicRepo.createPlaylist(input))
  ipcMain.handle('music:updatePlaylist', (_e, id, patch) => musicRepo.updatePlaylist(id, patch))
  ipcMain.handle('music:removePlaylist', (_e, id) => musicRepo.removePlaylist(id))
  ipcMain.handle('music:addPlaylistTracks', (_e, playlistId, trackIds) =>
    musicRepo.addPlaylistTracks(playlistId, trackIds)
  )
  ipcMain.handle('music:removePlaylistTrack', (_e, itemId) =>
    musicRepo.removePlaylistTrack(itemId)
  )
  ipcMain.handle('music:removePlaylistTrackByTrack', (_e, playlistId, trackId) =>
    musicRepo.removePlaylistTrackByTrack(playlistId, trackId)
  )
  ipcMain.handle('music:reorderPlaylist', (_e, playlistId, orderedItemIds) =>
    musicRepo.reorderPlaylist(playlistId, orderedItemIds)
  )
  ipcMain.handle('music:playlistsForTrack', (_e, trackId) => musicRepo.playlistsForTrack(trackId))
  ipcMain.handle('music:setLiked', (_e, trackId, liked) => musicRepo.setLiked(trackId, liked))
  ipcMain.handle('music:logPlay', (_e, trackId) => musicRepo.logPlay(trackId))
  ipcMain.handle('music:recent', (_e, limit) => musicRepo.recentlyPlayed(limit))
  ipcMain.handle('music:statsDetail', (_e, days) => musicRepo.statsDetail(days))
  ipcMain.handle('music:downloadStart', (_e, input) => musicDownload.startDownload(input))
  ipcMain.handle('music:downloadCancel', (_e, id) => musicDownload.cancelDownload(id))
  ipcMain.handle('music:downloadStatus', () => musicDownload.getStatus())
  ipcMain.handle('music:downloadDetect', () => musicDownload.detectBinary())
  ipcMain.handle('music:artFetchAlbum', (_e, albumId) => musicArt.fetchAlbumArt(albumId))
  ipcMain.handle('music:artFetchArtist', (_e, artistId) => musicArt.fetchArtistImage(artistId))
  ipcMain.handle('music:artClearAlbum', (_e, albumId) => musicArt.clearAlbumArt(albumId))
  ipcMain.handle('music:artClearArtist', (_e, artistId) => musicArt.clearArtistArt(artistId))
  ipcMain.handle('music:artFetchMissing', () => musicArt.fetchMissingArt())
  ipcMain.handle('music:artCancel', () => musicArt.cancelArtFetch())
  ipcMain.handle('music:artStatus', () => musicArt.getArtStatus())

  // ---- settings ----
  ipcMain.handle('settings:all', () => settingsRepo.all())
  ipcMain.handle('settings:get', (_e, key) => settingsRepo.get(key))
  ipcMain.handle('settings:set', (_e, key, value) => settingsRepo.set(key, value))

  // ---- files ----
  ipcMain.handle('files:pickImage', () => files.pickImage())
  ipcMain.handle('files:resolveUrl', (_e, relPath) => files.resolveUrl(relPath))
}
