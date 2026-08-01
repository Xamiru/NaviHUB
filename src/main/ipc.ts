import { ipcMain, shell, BrowserWindow } from 'electron'
import { clampUiScale } from '@shared/uiScale'
import * as mediaRepo from './repos/mediaRepo'
import * as peopleRepo from './repos/peopleRepo'
import * as companyRepo from './repos/companyRepo'
import * as characterRepo from './repos/characterRepo'
import * as linkRepo from './repos/linkRepo'
import * as tagRepo from './repos/tagRepo'
import * as settingsRepo from './repos/settingsRepo'
import * as searchRepo from './repos/searchRepo'
import * as quizRepo from './repos/quizRepo'
import * as themeRepo from './repos/themeRepo'
import * as tournamentRepo from './repos/tournamentRepo'
import * as listRepo from './repos/listRepo'
import * as checklistRepo from './repos/checklistRepo'
import * as japaneseRepo from './repos/japaneseRepo'
import * as english from './english'
import * as wordnet from './dict/wordnet'
import * as dictKanjium from './dict/kanjium'
import * as dictKrad from './dict/krad'
import * as dictGrammar from './dict/grammar'
import * as dictNames from './dict/names'
import * as dictPairs from './dict/minimalPairs'
import * as dictAudio from './dict/tatoebaAudio'
import * as jpDrills from './jpDrills'
import * as englishRepo from './repos/englishRepo'
import * as programmingRepo from './repos/programmingRepo'
import * as anilist from './anilist'
import * as tmdb from './tmdb'
import * as vndb from './vndb'
import * as rawg from './rawg'
import * as themes from './themes'
import * as pictures from './pictures'
import * as jackett from './jackett'
import * as qbittorrent from './qbittorrent'
import * as hltb from './hltb'
import * as files from './files'
import * as manga from './manga'
import { getActivity, withActivity } from './progress'
import * as updater from './updater'
import * as music from './music'
import * as musicRepo from './repos/musicRepo'
import * as musicDownload from './musicDownload'
import * as musicArt from './musicArt'
import * as mokuro from './mokuro'
import * as gacha from './gacha'
import * as gachaRepo from './repos/gachaRepo'
import * as atlas from './atlas'
import * as chaldea from './chaldea'
import * as gachaCoach from './gachaCoach'
import * as coachRepo from './repos/coachRepo'
import * as tokenizer from './tokenizer'
import * as dictImporter from './dict/importer'
import * as dictLookup from './dict/lookup'
import * as dictSentences from './dict/sentences'
import * as dictStrokes from './dict/strokes'
import * as prepDeck from './prepDeck'
import * as coreDeck from './coreDeck'
import * as coverage from './coverage'
import * as coverageRepo from './repos/coverageRepo'
import * as analyzeText from './analyzeText'

// Each channel name mirrors the NaviApi surface in src/shared/api.ts.
// Handlers are thin: validate nothing exotic, delegate to a repo, return data.
export function registerIpc(): void {
  // The app's one "today": the LOCAL calendar day. Recurring features (gacha
  // goals, checklist periods) take it as a parameter so the renderer never
  // derives a date and tests can pin one.
  const todayLocal = (): string => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  // ---- media ----
  ipcMain.handle('media:list', (_e, filter) => mediaRepo.list(filter))
  ipcMain.handle('media:get', (_e, id) => mediaRepo.get(id))
  ipcMain.handle('media:create', (_e, input) => mediaRepo.create(input))
  ipcMain.handle('media:update', (_e, id, input) => mediaRepo.update(id, input))
  ipcMain.handle('media:logProgress', (_e, id) => checklistRepo.logProgress(id, todayLocal()))
  ipcMain.handle('media:remove', (_e, id) => mediaRepo.remove(id))
  ipcMain.handle('media:removeCharacter', (_e, mediaId, characterId) =>
    linkRepo.removeMediaCharacter(mediaId, characterId)
  )
  ipcMain.handle('media:statusCounts', (_e, mediaType) => mediaRepo.statusCounts(mediaType))
  ipcMain.handle('media:facets', (_e, mediaType) => mediaRepo.facets(mediaType))
  ipcMain.handle('media:timeStats', () => mediaRepo.timeStats())
  ipcMain.handle('media:jpMilestones', () => mediaRepo.jpMilestones())

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
  ipcMain.handle('tags:get', (_e, id) => tagRepo.get(id))
  ipcMain.handle('tags:listWithCounts', () => tagRepo.listWithCounts())
  ipcMain.handle('tags:media', (_e, id) => tagRepo.media(id))
  ipcMain.handle('tags:upsert', (_e, input) => tagRepo.upsert(input))
  ipcMain.handle('tags:remove', (_e, id) => tagRepo.remove(id))

  // ---- global search ----
  ipcMain.handle('search:global', (_e, query) => searchRepo.global(query))

  // ---- quiz ----
  ipcMain.handle('quiz:songPool', (_e, filter) => quizRepo.songPool(filter))
  ipcMain.handle('quiz:tournamentPool', (_e, source) => tournamentRepo.tournamentPool(source))
  ipcMain.handle('quiz:logSession', (_e, input) => quizRepo.logSession(input))
  ipcMain.handle('quiz:history', (_e, kind) => quizRepo.history(kind))

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

  // ---- checklist (daily / weekly recurring board) ----
  ipcMain.handle('checklist:status', () => checklistRepo.status(todayLocal()))
  ipcMain.handle('checklist:addTask', (_e, key, cadence) => checklistRepo.addTask(key, cadence))
  ipcMain.handle('checklist:removeTask', (_e, id) => checklistRepo.removeTask(id))
  ipcMain.handle('checklist:setTarget', (_e, id, target) => checklistRepo.setTarget(id, target))
  ipcMain.handle('checklist:reorder', (_e, cadence, orderedIds) =>
    checklistRepo.reorder(cadence, orderedIds)
  )
  ipcMain.handle('checklist:logMedia', (_e, taskKey, cadence, mediaId) =>
    checklistRepo.logProgress(mediaId, todayLocal(), { key: taskKey, cadence })
  )
  ipcMain.handle('checklist:undoLog', (_e, logId) => checklistRepo.undoLog(logId))
  ipcMain.handle('checklist:tick', (_e, taskKey, cadence) =>
    checklistRepo.tick(taskKey, cadence, todayLocal())
  )
  ipcMain.handle('checklist:untick', (_e, taskKey, cadence) =>
    checklistRepo.untick(taskKey, cadence, todayLocal())
  )
  ipcMain.handle('checklist:credit', (_e, taskKey, cadence) =>
    checklistRepo.credit(taskKey, cadence, todayLocal())
  )

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
  ipcMain.handle('japanese:lessonQuizPool', (_e, lessonId) =>
    japaneseRepo.lessonQuizPool(lessonId)
  )
  ipcMain.handle('japanese:buildPrepDeck', (_e, mediaId) => prepDeck.buildPrepDeck(mediaId))
  ipcMain.handle('japanese:prepDeckStatus', () => prepDeck.getPrepDeckStatus())
  ipcMain.handle('japanese:buildCoreDeck', (_e, limit) => coreDeck.buildCoreDeck(limit))
  ipcMain.handle('japanese:coreDeckStatus', () => coreDeck.getCoreDeckStatus())
  ipcMain.handle('japanese:scanCoverage', (_e, mediaId) => coverage.scanCoverage(mediaId))
  ipcMain.handle('japanese:coverageScanStatus', () => coverage.getCoverageScanStatus())
  ipcMain.handle('japanese:coverage', (_e, mediaId) => coverageRepo.coverageForMedia(mediaId))
  ipcMain.handle('japanese:coverageList', () => coverageRepo.coverageList())
  ipcMain.handle('japanese:analyzeText', (_e, text) => analyzeText.analyzeText(text))
  ipcMain.handle('japanese:roadmap', () => japaneseRepo.roadmap())
  ipcMain.handle('japanese:listLeeches', () => japaneseRepo.listLeeches())
  ipcMain.handle('japanese:resetCard', (_e, id) => japaneseRepo.resetCard(id))
  ipcMain.handle('japanese:stats', () => japaneseRepo.stats())
  ipcMain.handle('japanese:statsDetail', () => japaneseRepo.statsDetail())
  ipcMain.handle('japanese:ensureMiningInbox', () => japaneseRepo.ensureMiningInbox())
  ipcMain.handle('japanese:tokenize', (_e, text) => tokenizer.tokenize(text))
  ipcMain.handle('japanese:minedFronts', (_e, fronts) => japaneseRepo.minedFronts(fronts))
  ipcMain.handle('japanese:pitchQuizPool', (_e, req) => jpDrills.pitchQuizPool(req))
  ipcMain.handle('japanese:componentQuizPool', (_e, req) => jpDrills.componentQuizPool(req))

  // ---- offline dictionaries ----
  ipcMain.handle('dict:list', () => dictImporter.listDictionaries())
  ipcMain.handle('dict:lookup', (_e, query) => dictLookup.lookupWord(query))
  ipcMain.handle('dict:kanji', (_e, text) => dictLookup.lookupKanji(text))
  ipcMain.handle('dict:importPreset', (_e, key) => dictImporter.importPreset(key))
  ipcMain.handle('dict:importZip', () => dictImporter.importZipViaDialog())
  ipcMain.handle('dict:importStatus', () => dictImporter.getImportStatus())
  ipcMain.handle('dict:remove', (_e, id) => dictImporter.removeDictionary(id))
  ipcMain.handle('dict:sentences', (_e, term, limit) => dictSentences.querySentences(term, limit))
  ipcMain.handle('dict:importSentences', () => dictSentences.importSentences())
  ipcMain.handle('dict:sentenceBank', () => dictSentences.getSentenceBankInfo())
  ipcMain.handle('dict:removeSentences', () => dictSentences.removeSentenceBank())
  ipcMain.handle('dict:strokes', (_e, char) => dictStrokes.getStrokes(char))
  ipcMain.handle('dict:importStrokes', () => dictStrokes.importStrokes())
  ipcMain.handle('dict:strokeSet', () => dictStrokes.getStrokeSetInfo())
  ipcMain.handle('dict:removeStrokes', () => dictStrokes.removeStrokeSet())
  ipcMain.handle('dict:importKanjium', () => dictKanjium.importKanjium())
  ipcMain.handle('dict:importKrad', () => dictKrad.importKrad())
  ipcMain.handle('dict:kradSet', () => dictKrad.getKradSetInfo())
  ipcMain.handle('dict:removeKrad', () => dictKrad.removeKradSet())
  ipcMain.handle('dict:kradComponents', () => dictKrad.kradComponents())
  ipcMain.handle('dict:kradSearch', (_e, parts) => dictKrad.kradSearch(parts))
  ipcMain.handle('dict:importGrammar', () => dictGrammar.importGrammar())
  ipcMain.handle('dict:grammarBank', () => dictGrammar.getGrammarBankInfo())
  ipcMain.handle('dict:removeGrammar', () => dictGrammar.removeGrammarBank())
  ipcMain.handle('dict:grammarList', () => dictGrammar.listGrammar())
  ipcMain.handle('dict:grammarGet', (_e, id) => dictGrammar.getGrammarPoint(id))
  ipcMain.handle('dict:grammarRandom', (_e, count, levels) =>
    dictGrammar.randomGrammar(count, levels)
  )
  ipcMain.handle('dict:nameSample', (_e, req) => dictNames.nameSample(req))
  ipcMain.handle('dict:shiritoriNext', (_e, req) => jpDrills.shiritoriNext(req))
  ipcMain.handle('dict:importPairs', () => dictPairs.importPairs())
  ipcMain.handle('dict:pairSet', () => dictPairs.getPairSetInfo())
  ipcMain.handle('dict:removePairs', () => dictPairs.removePairSet())
  ipcMain.handle('dict:minimalPairs', () => dictPairs.listMinimalPairs())
  ipcMain.handle('dict:importSentenceAudio', () => dictAudio.importSentenceAudio())
  ipcMain.handle('dict:sentenceAudioBank', () => dictAudio.getAudioBankInfo())
  ipcMain.handle('dict:removeSentenceAudio', () => dictAudio.removeAudioBank())
  ipcMain.handle('dict:audioSample', (_e, req) => dictAudio.sampleAudioSentences(req))

  // ---- english dictionary ----
  ipcMain.handle('english:lookup', (_e, query) => english.lookup(query))
  ipcMain.handle('english:dictInfo', () => wordnet.getEnglishDictInfo())
  ipcMain.handle('english:importDict', () => wordnet.importEnglishDict())
  ipcMain.handle('english:removeDict', () => wordnet.removeEnglishDict())
  ipcMain.handle('english:saveWord', (_e, input) => englishRepo.saveWord(input))
  ipcMain.handle('english:listWords', (_e, search) => englishRepo.listWords(search))
  ipcMain.handle('english:removeWord', (_e, id) => englishRepo.removeWord(id))

  // ---- programming (learn section; content is code, only completion is data) ----
  ipcMain.handle('programming:progress', () => programmingRepo.progress())
  ipcMain.handle('programming:complete', (_e, lessonKey) => programmingRepo.complete(lessonKey))
  ipcMain.handle('programming:uncomplete', (_e, lessonKey) =>
    programmingRepo.uncomplete(lessonKey)
  )

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

  // ---- AnimeThemes import (anime OP/ED songs) + the Songs library ----
  ipcMain.handle('themes:import', (_e, mediaId) =>
    withActivity('Fetching theme songs', () => themes.importThemes(mediaId))
  )
  ipcMain.handle('themes:list', (_e, filter) => themeRepo.list(filter))
  ipcMain.handle('themes:counts', () => themeRepo.counts())
  ipcMain.handle('themes:setFavorite', (_e, themeId, favorite) =>
    themeRepo.setFavorite(themeId, favorite)
  )

  // ---- pictures (wallpapers + fan art) ----
  ipcMain.handle('pictures:list', (_e, mediaId, kind) => pictures.listImages(mediaId, kind))
  ipcMain.handle('pictures:searchWallhaven', (_e, query, page) =>
    pictures.searchWallhaven(query, page)
  )
  ipcMain.handle('pictures:searchTmdb', (_e, mediaId) => pictures.searchTmdbBackdrops(mediaId))
  ipcMain.handle('pictures:addFromSearch', (_e, mediaId, kind, result) =>
    pictures.addFromSearch(mediaId, kind, result)
  )
  ipcMain.handle('pictures:addFromUrl', (_e, mediaId, kind, url) =>
    pictures.addFromUrl(mediaId, kind, url)
  )
  ipcMain.handle('pictures:addFromFiles', (_e, mediaId, kind) =>
    pictures.addFromFiles(mediaId, kind)
  )
  ipcMain.handle('pictures:remove', (_e, imageId) => pictures.removeImage(imageId))

  // ---- torrents (Jackett search + qBittorrent hand-off) ----
  // Button-triggered quick fetches — deliberately NOT withActivity.
  // Progressive: start a fan-out job, then poll status (no push channel).
  ipcMain.handle('torrents:startSearch', (_e, query, categories) =>
    jackett.startSearch(query, categories)
  )
  ipcMain.handle('torrents:searchStatus', (_e, offset) => jackett.searchStatus(offset))
  ipcMain.handle('torrents:cancelSearch', (_e, id) => jackett.cancelSearch(id))
  ipcMain.handle('torrents:add', (_e, input) => qbittorrent.addTorrent(input))
  ipcMain.handle('torrents:testJackett', () => jackett.testJackett())
  ipcMain.handle('torrents:ensureJackett', () => jackett.ensureJackettRunning())
  ipcMain.handle('torrents:testQbittorrent', () => qbittorrent.testQbittorrent())

  // ---- global activity (import progress, polled by the Topbar pill) ----
  ipcMain.handle('activity:status', () => getActivity())

  // ---- in-app updates ----
  // Deliberately NOT withActivity: the shared slot has no terminal states and
  // clears on completion, but the updater must keep 'ready'/'error' readable
  // after the renderer stops polling. Own status channel, like music downloads.
  ipcMain.handle('update:status', () => updater.getStatus())
  ipcMain.handle('update:check', () => updater.checkForUpdate())
  ipcMain.handle('update:download', () => updater.downloadUpdate())
  ipcMain.handle('update:cancel', () => updater.cancelUpdate())
  ipcMain.handle('update:install', () => updater.installUpdate())
  ipcMain.handle('update:testToken', () => updater.testGithubToken())

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
  // Destructive deletes (rows + files on disk).
  ipcMain.handle('music:deleteTracks', (_e, ids: number[]) => music.deleteTracks(ids))
  ipcMain.handle('music:deleteAlbum', (_e, id: number) => music.deleteAlbum(id))
  ipcMain.handle('music:deleteArtist', (_e, id: number) => music.deleteArtist(id))
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

  // ---- gacha tracker ----
  ipcMain.handle('gacha:overview', () => gachaRepo.overview())
  ipcMain.handle('gacha:units', (_e, game, filter) => gachaRepo.listUnits(game, filter))
  ipcMain.handle('gacha:unit', (_e, id) => gachaRepo.getUnit(id))
  ipcMain.handle('gacha:createUnit', (_e, input) => gachaRepo.createUnit(input))
  ipcMain.handle('gacha:updateUnit', (_e, id, patch) => gachaRepo.updateUnit(id, patch))
  ipcMain.handle('gacha:removeUnit', (_e, id) => gachaRepo.removeUnit(id))
  ipcMain.handle('gacha:createBuild', (_e, unitId, input) => gachaRepo.createBuild(unitId, input))
  ipcMain.handle('gacha:updateBuild', (_e, id, patch) => gachaRepo.updateBuild(id, patch))
  ipcMain.handle('gacha:removeBuild', (_e, id) => gachaRepo.removeBuild(id))
  ipcMain.handle('gacha:currencies', (_e, game) => gachaRepo.listCurrencies(game))
  ipcMain.handle('gacha:setCurrency', (_e, game, key, amount) =>
    gachaRepo.setCurrency(game, key, amount)
  )
  ipcMain.handle('gacha:banners', (_e, game) => gachaRepo.listBanners(game))
  ipcMain.handle('gacha:createBanner', (_e, input) => gachaRepo.createBanner(input))
  ipcMain.handle('gacha:updateBanner', (_e, id, patch) => gachaRepo.updateBanner(id, patch))
  ipcMain.handle('gacha:removeBanner', (_e, id) => gachaRepo.removeBanner(id))
  ipcMain.handle('gacha:news', (_e, game) => gachaRepo.listNews(game))
  // Button-triggered, single quick request — deliberately NOT withActivity.
  ipcMain.handle('gacha:fetchNews', (_e, game) => gacha.fetchNews(game))
  ipcMain.handle('gacha:downloadImage', (_e, url) => files.downloadImage(url))
  ipcMain.handle('gacha:setGameImage', (_e, game, relPath) =>
    gachaRepo.setGameImage(game, relPath)
  )
  // Catalog import downloads ~2.5k faces — wrap in withActivity so the pill
  // shows image progress. Chaldea import is a quick local file read, no pill.
  ipcMain.handle('gacha:importCatalog', (_e, game) =>
    withActivity('Importing FGO catalog', () => atlas.importCatalog(game))
  )
  ipcMain.handle('gacha:importChaldea', (_e, game) => chaldea.importBackup(game))

  // ---- gacha coach (FGO LLM chat) ----
  // LLM calls only in coachSend / importCoachDoc; the rest are local DB ops.
  ipcMain.handle('gacha:coachStatus', () => gachaCoach.getCoachStatus())
  ipcMain.handle('gacha:coachSend', (_e, game, text, attachments) =>
    gachaCoach.coachSend(game, text, attachments ?? [])
  )
  ipcMain.handle('gacha:coachCancel', () => gachaCoach.coachCancel())
  ipcMain.handle('gacha:coachThread', (_e, game) => coachRepo.activeThread(game))
  ipcMain.handle('gacha:coachThreads', (_e, game) => coachRepo.listThreads(game))
  ipcMain.handle('gacha:coachNewThread', (_e, game) => coachRepo.newThread(game))
  ipcMain.handle('gacha:coachMessages', (_e, threadId) => coachRepo.listMessages(threadId))
  ipcMain.handle('gacha:saveAttachment', (_e, bytes, ext) => files.saveMediaBytes(bytes, ext))
  ipcMain.handle('gacha:goals', (_e, game) => coachRepo.listGoals(game))
  ipcMain.handle('gacha:createGoal', (_e, game, input) => coachRepo.createGoal(game, input))
  ipcMain.handle('gacha:updateGoal', (_e, id, patch) => coachRepo.updateGoal(id, patch))
  ipcMain.handle('gacha:completeGoal', (_e, id) => coachRepo.completeGoal(id, todayLocal()))
  ipcMain.handle('gacha:dropGoal', (_e, id) => coachRepo.dropGoal(id))
  ipcMain.handle('gacha:dueCounts', () => coachRepo.dueCounts(todayLocal()))
  ipcMain.handle('gacha:coachNotes', (_e, game) => coachRepo.listNotes(game))
  ipcMain.handle('gacha:removeCoachNote', (_e, id) => coachRepo.removeNote(id))
  ipcMain.handle('gacha:coachDocs', (_e, game) => coachRepo.listDocs(game))
  ipcMain.handle('gacha:importCoachDoc', (_e, game, input) =>
    gachaCoach.importDoc(game, input.title, input.content)
  )
  ipcMain.handle('gacha:removeCoachDoc', (_e, id) => coachRepo.removeDoc(id))

  // ---- app (system browser for external links + text-file picker) ----
  ipcMain.handle('app:openExternal', (_e, url) => {
    if (!/^https?:\/\//i.test(String(url))) throw new Error('Only http(s) links can be opened')
    return shell.openExternal(String(url))
  })
  ipcMain.handle('app:pickTextFile', () => files.pickTextFile())
  // Applies the UI scale live to every window. Persisting it is the caller's
  // job (settings:set 'ui.scale'); index.ts re-applies the stored value on load.
  ipcMain.handle('app:setUiScale', (_e, scale) => {
    const factor = clampUiScale(Number(scale))
    for (const win of BrowserWindow.getAllWindows()) win.webContents.setZoomFactor(factor)
    return factor
  })

  // ---- settings ----
  ipcMain.handle('settings:all', () => settingsRepo.all())
  ipcMain.handle('settings:get', (_e, key) => settingsRepo.get(key))
  ipcMain.handle('settings:set', (_e, key, value) => settingsRepo.set(key, value))

  // ---- files ----
  ipcMain.handle('files:pickImage', () => files.pickImage())
  ipcMain.handle('files:resolveUrl', (_e, relPath) => files.resolveUrl(relPath))
}
