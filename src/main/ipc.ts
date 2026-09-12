import * as spotifyRecovery from './musicSpotifyRecovery'
import { ipcMain, shell, BrowserWindow } from 'electron'
import { clampUiScale, parseUiScale } from '@shared/uiScale'
import * as mediaRepo from './repos/mediaRepo'
import * as tvRepo from './repos/tvRepo'
import * as libraryRefresh from './libraryRefresh'
import * as peopleRepo from './repos/peopleRepo'
import * as companyRepo from './repos/companyRepo'
import * as characterRepo from './repos/characterRepo'
import * as linkRepo from './repos/linkRepo'
import * as tagRepo from './repos/tagRepo'
import * as settingsRepo from './repos/settingsRepo'
import * as secretStorage from './secretStorage'
import { isSecretSettingKey } from '@shared/secretSettings'
import * as searchRepo from './repos/searchRepo'
import * as quizRepo from './repos/quizRepo'
import * as themeRepo from './repos/themeRepo'
import * as tournamentRepo from './repos/tournamentRepo'
import * as listRepo from './repos/listRepo'
import * as tierListRepo from './repos/tierListRepo'
import * as checklistRepo from './repos/checklistRepo'
import * as japaneseRepo from './repos/japaneseRepo'
import * as english from './english'
import * as wordnet from './dict/wordnet'
import * as enFreq from './dict/enFreq'
import * as englishDrills from './englishDrills'
import * as dictKanjium from './dict/kanjium'
import * as dictKrad from './dict/krad'
import * as dictGrammar from './dict/grammar'
import * as dictNames from './dict/names'
import * as dictPairs from './dict/minimalPairs'
import * as dictAudio from './dict/tatoebaAudio'
import * as jpDrills from './jpDrills'
import * as jpConfusables from './jpConfusables'
import * as jpFeed from './jpFeed'
import * as jpListening from './jpListening'
import * as jpGrammarDeck from './jpGrammarDeck'
import * as dictSimilarKanji from './dict/similarKanji'
import * as imeCandidates from './dict/imeCandidates'
import * as englishRepo from './repos/englishRepo'
import * as sqlSandbox from './sqlSandbox'
import * as englishDeck from './englishDeck'
import * as jpSentenceGames from './jpSentenceGames'
import * as jpJlpt from './jpJlpt'
import * as anilist from './anilist'
import * as tmdb from './tmdb'
import * as vndb from './vndb'
import * as rawg from './rawg'
import * as igdb from './igdb'
import * as steam from './steam'
import * as gamesCatalog from './gamesCatalog'
import * as bulkImport from './bulkImport'
import * as openlibrary from './openlibrary'
import * as themes from './themes'
import * as pictures from './pictures'
import * as franchiseArt from './franchiseArt'
import * as jackett from './jackett'
import * as qbittorrent from './qbittorrent'
import * as hltb from './hltb'
import * as gameLaunch from './gameLaunch'
import * as gameSessionRepo from './repos/gameSessionRepo'
import * as achievements from './achievements'
import * as achievementWatcher from './achievementWatcher'
import * as achievementRepo from './repos/achievementRepo'
import * as files from './files'
import * as manga from './manga'
import * as video from './video'
import * as openFile from './openFile'
import { getActivity, withActivity } from './progress'
import * as logBus from './logBus'
import * as logFile from './logFile'
import * as libraryExport from './libraryExport'
import * as tasks from './tasks'
import * as appMenu from './appMenu'
import * as updater from './updater'
import * as music from './music'
import * as musicRepo from './repos/musicRepo'
import * as musicDownload from './musicDownload'
import * as musicSpotify from './musicSpotify'
import * as musicSpotifyRepo from './repos/musicSpotifyRepo'
import * as musicArt from './musicArt'
import * as mokuro from './mokuro'
import * as mokuroRun from './mokuroRun'
import * as gacha from './gacha'
import * as gachaRepo from './repos/gachaRepo'
import * as atlas from './atlas'
import * as chaldea from './chaldea'
import * as gachaCoach from './gachaCoach'
import * as coachRepo from './repos/coachRepo'
import * as wrestlingRepo from './repos/wrestlingRepo'
import * as wrestlingImport from './wrestling/importRun'
import * as playerBridge from './playerBridge'
import * as widget from './widget'
import * as looseMatch from './wrestling/looseMatch'
import * as footballRepo from './repos/footballRepo'
import * as footballSync from './football/sync'
import * as footballMedia from './football/media'
import * as scan from './video/scan'
import type { VideoFileRef } from '@shared/types'
import { VIDEO_SCOPES, type VideoScope } from './video/scope'
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

// These feature modules carry large offline content catalogs. Their IPC
// channels are always registered, but the implementation is parsed only on
// first use. import() is module-cached, so later calls reuse the same instance.
const loadEnglishWriting = (): Promise<typeof import('./englishWriting')> =>
  import('./englishWriting')
const loadProgrammingRepo = (): Promise<typeof import('./repos/programmingRepo')> =>
  import('./repos/programmingRepo')

// Each channel name mirrors the NaviApi surface in src/shared/api.ts.
// Handlers are thin: validate nothing exotic, delegate to a repo, return data.
export function registerIpc(): void {
  // Hands the video scanner its real ffprobe implementation. scan.ts keeps the
  // injectable seam (the music.ts:TagReader pattern) so its tests never spawn
  // a binary; this is the one place the two halves meet.
  video.installProber()
  musicSpotify.initializeDownloadQueue()

  // The app's one "today": the LOCAL calendar day. Recurring features (gacha
  // goals, checklist periods) take it as a parameter so the renderer never
  // derives a date and tests can pin one.
  const todayLocal = (): string => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  // ---- media ----
  ipcMain.handle('media:list', (_e, filter) => mediaRepo.list(filter))
  ipcMain.handle('media:listPage', (_e, request) => mediaRepo.listPage(request))
  ipcMain.handle('media:homeOverview', () => mediaRepo.homeOverview())
  ipcMain.handle('media:get', (_e, id) => mediaRepo.get(id))
  ipcMain.handle('media:create', (_e, input) => mediaRepo.create(input))
  ipcMain.handle('media:update', (_e, id, input) => mediaRepo.update(id, input))
  ipcMain.handle('media:logProgress', (_e, id) => checklistRepo.logProgress(id, todayLocal()))
  ipcMain.handle('media:remove', (_e, id) => {
    // The image rows cascade, but their copies in the desktop-slideshow folder
    // do not — Windows would keep showing wallpapers for a deleted title.
    pictures.forgetSlideshowForMedia(id)
    return mediaRepo.remove(id)
  })
  ipcMain.handle('media:removeCharacter', (_e, mediaId, characterId) =>
    linkRepo.removeMediaCharacter(mediaId, characterId)
  )
  ipcMain.handle('media:statusCounts', (_e, mediaType) => mediaRepo.statusCounts(mediaType))
  ipcMain.handle('media:facets', (_e, mediaType) => mediaRepo.facets(mediaType))
  ipcMain.handle('media:timeStats', () => mediaRepo.timeStats())
  ipcMain.handle('media:jpMilestones', () => mediaRepo.jpMilestones())
  ipcMain.handle('media:resumePoints', () => mediaRepo.resumePoints())
  ipcMain.handle('media:activityHeatmap', () => mediaRepo.activityHeatmap())

  // ---- tv episode catalogue ----
  // Ticking an episode is a media-progress event, so a FIRST-time watch goes
  // through checklistRepo.logProgress — the app's one "I watched another one"
  // write — exactly as video:markWatched does. tvRepo itself never touches
  // media_item.progress. A season toggle logs once per newly-watched episode,
  // so ticking a season credits the same as ticking each episode by hand.
  ipcMain.handle('tv:seasons', (_e, mediaId: number) => tvRepo.listSeasons(mediaId, todayLocal()))
  ipcMain.handle('tv:setWatched', (_e, episodeId: number, watched: boolean) => {
    const res = tvRepo.setWatched(episodeId, watched)
    if (res?.firstTime) checklistRepo.logProgress(res.mediaId, todayLocal())
  })
  ipcMain.handle(
    'tv:setSeasonWatched',
    (_e, mediaId: number, season: number, watched: boolean) => {
      const today = todayLocal()
      const { firstTime } = tvRepo.setSeasonWatched(mediaId, season, watched, today)
      // noRewatch: a season toggle back-fills a catalogue, so it must not wrap
      // an already-finished show into a fresh pass. Ticking ONE episode by hand
      // still does — that is a deliberate "I just watched this".
      for (let i = 0; i < firstTime; i++) {
        checklistRepo.logProgress(mediaId, today, undefined, { noRewatch: true })
      }
    }
  )

  // ---- library refresh ----
  ipcMain.handle('refresh:preview', (_e, req) => libraryRefresh.preview(req))
  ipcMain.handle('refresh:start', (_e, req) => libraryRefresh.start(req))
  ipcMain.handle('refresh:status', () => libraryRefresh.getStatus())
  ipcMain.handle('refresh:cancel', () => libraryRefresh.cancel())
  ipcMain.handle('refresh:one', (_e, mediaId: number, aspects) =>
    withActivity('Refreshing title', () => libraryRefresh.refreshMedia(mediaId, aspects))
  )

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
  ipcMain.handle('characters:roles', (_e, id) => characterRepo.roles(id))
  ipcMain.handle('characters:upsert', (_e, input) => characterRepo.upsert(input))
  ipcMain.handle('characters:remove', (_e, id) => characterRepo.remove(id))

  // ---- credits & media-company links ----
  ipcMain.handle('credits:remove', (_e, id) => linkRepo.removeCredit(id))
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
  ipcMain.handle('quiz:availability', (_e, request) => quizRepo.availability(request))
  ipcMain.handle('quiz:challengePool', (_e, request) => quizRepo.challengePool(request))
  ipcMain.handle('quiz:songPool', (_e, filter) => quizRepo.songPool(filter))
  ipcMain.handle('quiz:castPool', (_e, filter) => quizRepo.castPool(filter))
  ipcMain.handle('quiz:vaPool', (_e, filter) => quizRepo.vaPool(filter))
  ipcMain.handle('quiz:synopsisPool', (_e, filter) => quizRepo.synopsisPool(filter))
  ipcMain.handle('quiz:mangaPanelPool', (_e, filter, length) =>
    manga.panelPool(filter, length ?? 10)
  )
  ipcMain.handle('quiz:tournamentPool', (_e, source) => tournamentRepo.tournamentPool(source))
  ipcMain.handle('quiz:logSession', (_e, input) => quizRepo.logSession(input))
  ipcMain.handle('quiz:history', (_e, kind, limit, playMode) =>
    quizRepo.history(kind, limit ?? 15, playMode)
  )

  // ---- HowLongToBeat times (games + VNs) ----
  ipcMain.handle('hltb:fetch', (_e, mediaId) => hltb.fetchForMedia(mediaId))

  // ---- games (launch + playtime) ----
  ipcMain.handle('games:overview', (_e, mediaId) => ({
    supported: process.platform === 'win32',
    ...gameSessionRepo.overview(mediaId)
  }))
  ipcMain.handle('games:pickExe', (_e, mediaId) => gameLaunch.pickExeFor(mediaId))
  ipcMain.handle('games:clearExe', (_e, mediaId) => gameLaunch.clearExe(mediaId))
  ipcMain.handle('games:launch', (_e, mediaId) => gameLaunch.startSession(mediaId))
  ipcMain.handle('games:sessionStatus', () => gameLaunch.getLaunchStatus())
  ipcMain.handle('games:installed', () => achievementRepo.installedGames())

  // ---- achievements ----
  // Steam sets come from the Web API and their unlocks off disk (whatever
  // emulator the crack ships); retro sets and unlocks both come from a
  // RetroAchievements account. Setup/refresh run inside withActivity so the
  // import pill covers the icon downloads.
  ipcMain.handle('achievements:list', (_e, mediaId) => achievementRepo.listPayload(mediaId))
  ipcMain.handle('achievements:resolveSteam', (_e, mediaId) =>
    achievements.resolveSteamCandidates(mediaId)
  )
  ipcMain.handle('achievements:setupSteam', (_e, mediaId, appid) =>
    withActivity('Fetching achievements', () => achievements.fetchSteamSchema(mediaId, appid))
  )
  ipcMain.handle('achievements:raConsoles', async () =>
    (await import('./retroAchievements')).consoles()
  )
  ipcMain.handle('achievements:raSearch', async (_e, query, consoleId) =>
    (await import('./retroAchievements')).searchGames(query, consoleId)
  )
  ipcMain.handle('achievements:setupRa', (_e, mediaId, raGameId) =>
    withActivity('Fetching achievements', async () =>
      (await import('./retroAchievements')).fetchRaGame(mediaId, raGameId)
    )
  )
  ipcMain.handle('achievements:refresh', (_e, mediaId) =>
    withActivity('Refreshing achievements', () => achievements.refresh(mediaId))
  )
  ipcMain.handle('achievements:importEmu', (_e, mediaId) => achievements.sweepEmuFiles(mediaId))
  ipcMain.handle('achievements:toggleManual', (_e, achievementId, unlocked) =>
    achievements.toggleManual(achievementId, unlocked)
  )
  ipcMain.handle('achievements:disable', (_e, mediaId) => achievements.disableTracking(mediaId))
  ipcMain.handle('achievements:watchStatus', () => achievementWatcher.getWatchStatus())
  ipcMain.handle('achievements:testPopup', () => achievementWatcher.requestPopupTest())
  ipcMain.handle('achievements:overview', () => achievementRepo.overview())
  ipcMain.handle('achievements:recent', (_e, limit) => achievementRepo.recentUnlocks(limit ?? 12))
  ipcMain.handle('achievements:cardSummaries', () => achievementRepo.cardSummaries())
  ipcMain.handle('achievements:generateGoldberg', (_e, mediaId) =>
    achievements.generateGoldbergConfig(mediaId)
  )

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

  // ---- tierlists (TierMaker-style boards) ----
  ipcMain.handle('tierLists:list', (_e, kind) => tierListRepo.list(kind))
  ipcMain.handle('tierLists:get', (_e, id) => tierListRepo.get(id))
  ipcMain.handle('tierLists:create', (_e, input) => tierListRepo.create(input))
  ipcMain.handle('tierLists:update', (_e, id, input) => tierListRepo.update(id, input))
  ipcMain.handle('tierLists:remove', (_e, id) => tierListRepo.remove(id))
  ipcMain.handle('tierLists:setRows', (_e, listId, rows) => tierListRepo.setRows(listId, rows))
  ipcMain.handle('tierLists:persistBoard', (_e, listId, placements) =>
    tierListRepo.persistBoard(listId, placements)
  )
  ipcMain.handle('tierLists:addItem', (_e, listId, entityId) =>
    tierListRepo.addItem(listId, entityId)
  )
  ipcMain.handle('tierLists:removeItem', (_e, itemId) => tierListRepo.removeItem(itemId))

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
  ipcMain.handle('japanese:jlptLadder', () => japaneseRepo.jlptLadder())
  ipcMain.handle('japanese:statsDetail', () => japaneseRepo.statsDetail())
  ipcMain.handle('japanese:saveTutorDebrief', (_e, input) => japaneseRepo.saveTutorDebrief(input))
  ipcMain.handle('japanese:tutorDays', (_e, limit) => japaneseRepo.listTutorDays(limit))
  ipcMain.handle('japanese:addTutorError', (_e, input) => japaneseRepo.addTutorError(input))
  ipcMain.handle('japanese:tutorErrors', (_e, limit) => japaneseRepo.listTutorErrors(limit))
  ipcMain.handle('japanese:resolveTutorError', (_e, id, resolved) =>
    japaneseRepo.resolveTutorError(id, resolved)
  )
  ipcMain.handle('japanese:ensureMiningInbox', () => japaneseRepo.ensureMiningInbox())
  ipcMain.handle('japanese:markWordsKnown', (_e, words) => japaneseRepo.markWordsKnown(words))
  ipcMain.handle('japanese:addGrammarPoints', (_e, ids) => jpGrammarDeck.addGrammarPoints(ids))
  ipcMain.handle('japanese:addGrammarLevel', (_e, level) => jpGrammarDeck.addGrammarLevel(level))
  ipcMain.handle('japanese:tokenize', (_e, text) => tokenizer.tokenize(text))
  ipcMain.handle('japanese:minedFronts', (_e, fronts) => japaneseRepo.minedFronts(fronts))
  ipcMain.handle('japanese:pitchQuizPool', (_e, req) => jpDrills.pitchQuizPool(req))
  ipcMain.handle('japanese:componentQuizPool', (_e, req) => jpDrills.componentQuizPool(req))
  ipcMain.handle('japanese:lookalikePool', (_e, req) => jpDrills.lookalikePool(req))
  ipcMain.handle('japanese:homophonePool', (_e, req) => jpDrills.homophonePool(req))
  ipcMain.handle('japanese:confusables', () => jpConfusables.listConfusables())
  ipcMain.handle('japanese:ghostQueue', (_e, limit) => japaneseRepo.ghostQueue(limit))
  ipcMain.handle('japanese:ghostAnswer', (_e, cardId, correct) =>
    japaneseRepo.ghostAnswer(cardId, correct)
  )
  ipcMain.handle('japanese:feed', (_e, req) => jpFeed.getFeed(req))
  ipcMain.handle('japanese:listeningPool', (_e, req) => jpListening.listeningPool(req))
  ipcMain.handle('japanese:particlePool', (_e, req) => jpSentenceGames.particlePool(req))
  ipcMain.handle('japanese:scramblePool', (_e, req) => jpSentenceGames.scramblePool(req))
  ipcMain.handle('japanese:contextReadingPool', (_e, req) => jpSentenceGames.contextReadingPool(req))
  ipcMain.handle('japanese:readingRacePool', (_e, req) => jpDrills.readingRacePool(req))
  ipcMain.handle('japanese:jlptTestPool', (_e, req) => jpJlpt.jlptTestPool(req))

  // ---- offline dictionaries ----
  ipcMain.handle('dict:list', () => dictImporter.listDictionaries())
  ipcMain.handle('dict:lookup', (_e, query) => dictLookup.lookupWord(query))
  ipcMain.handle('dict:kanji', (_e, text) => dictLookup.lookupKanji(text))
  // Any change to the installed dictionaries can change the frequency bank the
  // known-word baseline is built from, and that bank is not part of its cache
  // key — so drop it and let the next read rebuild.
  ipcMain.handle('dict:importPreset', async (_e, key) => {
    const res = await dictImporter.importPreset(key)
    coverageRepo.invalidateBaseline()
    return res
  })
  ipcMain.handle('dict:importZip', () => dictImporter.importZipViaDialog())
  ipcMain.handle('dict:importStatus', () => dictImporter.getImportStatus())
  ipcMain.handle('dict:remove', (_e, id) => {
    const res = dictImporter.removeDictionary(id)
    coverageRepo.invalidateBaseline()
    return res
  })
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
  ipcMain.handle('dict:similarKanji', (_e, char) => dictSimilarKanji.similarKanji(char))
  ipcMain.handle('dict:readingCandidates', (_e, kana) => imeCandidates.readingCandidates(kana))
  ipcMain.handle('dict:transitivityPool', (_e, req) => jpDrills.transitivityPool(req))
  ipcMain.handle('dict:loanwordSample', (_e, req) => jpDrills.loanwordSample(req))
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
  ipcMain.handle('english:saveWords', (_e, inputs) => englishRepo.saveWords(inputs))
  ipcMain.handle('english:listWords', (_e, search) => englishRepo.listWords(search))
  ipcMain.handle('english:removeWord', (_e, id) => englishRepo.removeWord(id))
  ipcMain.handle('english:reviewQueue', (_e, newLimit) => englishRepo.reviewQueue(newLimit))
  ipcMain.handle('english:submitReview', (_e, wordId, grade) =>
    englishRepo.submitReview(wordId, grade)
  )
  ipcMain.handle('english:srsStats', () => englishRepo.srsStats())
  ipcMain.handle('english:vocabPool', (_e, req) => englishDrills.vocabQuizPool(req))
  ipcMain.handle('english:spellingPool', (_e, req) => englishDrills.spellingPool(req))
  ipcMain.handle('english:freqInfo', () => enFreq.getEnFreqInfo())
  ipcMain.handle('english:importFreq', () => enFreq.importEnFreq())
  ipcMain.handle('english:removeFreq', () => enFreq.removeEnFreq())
  ipcMain.handle('english:writingFeedback', async (_e, req) =>
    (await loadEnglishWriting()).getWritingFeedback(req)
  )
  ipcMain.handle('english:listWritings', () => englishRepo.listWritings())
  ipcMain.handle('english:removeWriting', (_e, id) => englishRepo.removeWriting(id))
  ipcMain.handle('english:errorTally', () => englishRepo.writingErrorTally())
  ipcMain.handle('english:deck', () => englishDeck.deckOverview())
  ipcMain.handle('english:listLeeches', () => englishRepo.listLeeches())
  ipcMain.handle('english:removeWords', (_e, ids) => englishRepo.removeWords(ids))

  // ---- programming (learn section; content is code, only completion is data) ----
  ipcMain.handle('programming:progress', async () => (await loadProgrammingRepo()).progress())
  ipcMain.handle('programming:complete', async (_e, lessonKey) =>
    (await loadProgrammingRepo()).complete(lessonKey)
  )
  ipcMain.handle('programming:uncomplete', async (_e, lessonKey) =>
    (await loadProgrammingRepo()).uncomplete(lessonKey)
  )
  ipcMain.handle('programming:recordAttempt', async (_e, input) =>
    (await loadProgrammingRepo()).recordAttempt(input)
  )
  ipcMain.handle('programming:attempts', async () => (await loadProgrammingRepo()).attempts())
  ipcMain.handle('programming:recordCliRound', async (_e, input) =>
    (await loadProgrammingRepo()).recordCliRound(input)
  )
  ipcMain.handle('programming:cliMisses', async () => (await loadProgrammingRepo()).cliMisses())
  ipcMain.handle('programming:solves', async () => (await loadProgrammingRepo()).solves())
  ipcMain.handle('programming:recordSolve', async (_e, input) =>
    (await loadProgrammingRepo()).recordSolve(input)
  )
  ipcMain.handle('programming:sqlRun', (_e, input) => sqlSandbox.runExercise(input))
  ipcMain.handle('programming:sqlExpected', (_e, key) => sqlSandbox.expectedTable(key))

  // ---- local manga reader ----
  ipcMain.handle('manga:attachFolder', (_e, mediaId) => manga.attachFolder(mediaId))
  ipcMain.handle('manga:rescan', (_e, mediaId) => manga.rescan(mediaId))
  ipcMain.handle('manga:detach', (_e, mediaId) => manga.detach(mediaId))
  ipcMain.handle('manga:chapters', (_e, mediaId) => manga.chapters(mediaId))
  ipcMain.handle('manga:pages', (_e, chapterId) => manga.pages(chapterId))
  // Finishing a chapter credits the checklist, but does NOT log progress:
  // manga.ts owns media_item.progress via its monotonic sync, and logProgress
  // would additionally wrap a finished series into a fresh pass — silently, on
  // an autosave the user never asked for. See manga.ts:markProgress.
  ipcMain.handle('manga:markProgress', (_e, chapterId, page) => {
    const res = manga.markProgress(chapterId, page)
    if (res?.firstTime) checklistRepo.creditMediaLog(res.mediaId, todayLocal())
  })
  ipcMain.handle('manga:markChapterRead', (_e, chapterId, read) => {
    const res = manga.markChapterRead(chapterId, read)
    if (res?.firstTime) checklistRepo.creditMediaLog(res.mediaId, todayLocal())
  })
  ipcMain.handle('manga:ocrStatus', (_e, chapterId) => mokuro.status(chapterId))
  ipcMain.handle('manga:ocrPage', (_e, chapterId, pageIndex) => mokuro.page(chapterId, pageIndex))
  ipcMain.handle('manga:ocrRun', (_e, mediaId) => mokuroRun.startOcr(mediaId))
  ipcMain.handle('manga:ocrRunStatus', () => mokuroRun.getOcrStatus())
  ipcMain.handle('manga:ocrRunCancel', (_e, id) => mokuroRun.cancelOcr(id))
  ipcMain.handle('manga:ocrDetect', () => mokuroRun.detectBinary())
  ipcMain.handle('manga:ocrOverview', (_e, mediaId) => mokuroRun.ocrOverview(mediaId))
  ipcMain.handle('manga:adhocPages', (_e, token) => manga.adhocPages(token))

  // ---- linked local videos ----
  const videoScopeFor = (ref: VideoFileRef): VideoScope =>
    ref.kind === 'file' ? VIDEO_SCOPES.video : VIDEO_SCOPES.wrestling

  ipcMain.handle('video:attachFolder', (_e, mediaId) => video.attachFolder(mediaId))
  ipcMain.handle('video:rescan', (_e, mediaId) => video.rescan(mediaId))
  ipcMain.handle('video:detach', (_e, mediaId) => video.detach(mediaId))
  ipcMain.handle('video:files', (_e, mediaId) => video.files(mediaId))
  ipcMain.handle('video:openExternal', (_e, ref) => video.openExternal(ref))
  ipcMain.handle('video:tools', () => video.detectTools())
  // Finishing an episode is a media-progress event, so the FIRST time a file
  // becomes watched it goes through checklistRepo.logProgress — the app's one
  // "I watched another one" write (status promotion, rewatch wrap, checklist
  // credit). markWatched itself never touches media_item.progress.
  //
  // The scope guard is load-bearing: a wrestling row's owner is an EVENT id,
  // and handing that to logProgress would silently advance whatever media_item
  // happens to share the number. Wrestling events are not media items and log
  // nothing.
  ipcMain.handle('video:markWatched', (_e, ref, watched) => {
    const scope = videoScopeFor(ref)
    const res = video.markWatchedIn(scope, ref.fileId, watched)
    if (res?.firstTime && scope.id === 'video') {
      checklistRepo.logProgress(res.ownerId, todayLocal())
    }
  })

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
  ipcMain.handle('steam:search', (_e, query) => steam.search(query))
  ipcMain.handle('steam:import', (_e, appId) =>
    withActivity('Importing from Steam', () => steam.importGame(appId))
  )
  ipcMain.handle('steam:backfillMetacritic', () =>
    withActivity('Filling Metacritic scores from Steam', () => steam.backfillMetacritic())
  )
  // ---- offline games catalog (RAWG's final dump; console coverage) ----
  ipcMain.handle('rawgCatalog:search', (_e, query) => gamesCatalog.search(query))
  ipcMain.handle('rawgCatalog:import', (_e, catalogId) =>
    withActivity('Importing from the games catalog', () => gamesCatalog.importGame(catalogId))
  )
  ipcMain.handle('rawgCatalog:status', () => gamesCatalog.status())
  ipcMain.handle('rawgCatalog:install', () =>
    withActivity('Downloading the games catalog', () => gamesCatalog.install())
  )
  ipcMain.handle('igdb:search', (_e, query) => igdb.search(query))
  ipcMain.handle('igdb:import', (_e, igdbId) =>
    withActivity('Importing from IGDB', () => igdb.importGame(igdbId))
  )
  ipcMain.handle('rawg:search', (_e, query) => rawg.search(query))
  ipcMain.handle('rawg:import', (_e, rawgId) =>
    withActivity('Importing from RAWG', () => rawg.importGame(rawgId))
  )

  // ---- Open Library import (books) ----
  ipcMain.handle('openlibrary:search', (_e, query) => openlibrary.search(query))
  ipcMain.handle('openlibrary:import', (_e, olId) =>
    withActivity('Importing from Open Library', () => openlibrary.importBook(olId))
  )

  // ---- bulk import (/bulk — top-N lists per media type) ----
  // start is NOT withActivity: the run has its own polled status (with cancel),
  // and each title's importer still feeds the activity pill on its own.
  ipcMain.handle('bulk:preview', (_e, params) => bulkImport.preview(params))
  ipcMain.handle('bulk:start', (_e, payload) => bulkImport.start(payload))
  ipcMain.handle('bulk:status', () => bulkImport.getStatus())
  ipcMain.handle('bulk:cancel', () => bulkImport.cancel())

  // ---- AnimeThemes import (anime OP/ED songs) + the Songs library ----
  ipcMain.handle('themes:import', (_e, mediaId) =>
    withActivity('Fetching theme songs', () => themes.importThemes(mediaId))
  )
  ipcMain.handle('themes:list', (_e, filter) => themeRepo.list(filter))
  ipcMain.handle('themes:counts', () => themeRepo.counts())
  ipcMain.handle('themes:favorite', (_e, themeId) => themeRepo.favorite(themeId))
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
  ipcMain.handle('pictures:toggleSlideshow', (_e, imageId) => pictures.toggleSlideshow(imageId))
  ipcMain.handle('pictures:setBackground', (_e, mediaId, imageId) =>
    pictures.setBackground(mediaId, imageId)
  )
  ipcMain.handle('pictures:openSlideshowFolder', async () => {
    await shell.openPath(files.ensureSlideshowDir())
  })

  // ---- franchise (curated pages' art cache) ----
  ipcMain.handle('franchise:ensureArt', (_e, franchiseId) => franchiseArt.ensureArt(franchiseId))
  ipcMain.handle('franchise:artMap', (_e, franchiseId) => franchiseArt.artMap(franchiseId))
  ipcMain.handle('franchise:ensureHeroes', () => franchiseArt.ensureHeroes())
  ipcMain.handle('franchise:heroMap', () => franchiseArt.heroMap())
  ipcMain.handle('franchise:artStatus', () => franchiseArt.getArtStatus())

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

  // ---- tasks ----
  // Every long-running main-process job in one list. list() IS the tick: it
  // pulls each subsystem's projection and prunes finished rows, so there is no
  // timer behind this. Rich per-feature detail still lives on that feature's
  // own *Status channel — this is the normalized view plus the controls.
  ipcMain.handle('tasks:list', () => tasks.list())
  ipcMain.handle('tasks:get', (_e, id) => tasks.get(String(id)))
  ipcMain.handle('tasks:cancel', (_e, id) => tasks.cancel(String(id)))
  // No-ops unless the snapshot says canPause; pauseNote says why not.
  ipcMain.handle('tasks:pause', (_e, id) => tasks.pause(String(id)))
  ipcMain.handle('tasks:resume', (_e, id) => tasks.resume(String(id)))
  ipcMain.handle('tasks:clearFinished', () => tasks.clearFinished())

  // ---- logs ----
  // Cursor-paged tail of the main-process log ring (src/main/logBus.ts). No
  // push channel, so the viewer polls with the previous page's nextSeq.
  ipcMain.handle('logs:tail', (_e, req) => logBus.readLog(req ?? {}))
  ipcMain.handle('logs:reveal', () => shell.openPath(logFile.logDir()))

  // ---- sanitized library export ----
  ipcMain.handle('libraryExport:preview', (_e, options) => libraryExport.preview(options))
  ipcMain.handle('libraryExport:start', (event, options) =>
    libraryExport.start(options, BrowserWindow.fromWebContents(event.sender))
  )
  ipcMain.handle('libraryExport:status', () => libraryExport.getStatus())
  ipcMain.handle('libraryExport:cancel', () => libraryExport.cancel())
  ipcMain.handle('libraryExport:reveal', () => libraryExport.reveal())

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
  ipcMain.handle('music:trackPage', (_e, request) => musicRepo.listTrackPage(request))
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
  ipcMain.handle('music:spotifySearchAudio', (_e, query) => withActivity('Finding audio', () => spotifyRecovery.searchAudio(query)))
  ipcMain.handle('music:spotifyPreviewAudio', (_e, url) => withActivity('Preparing audio preview', () => spotifyRecovery.previewAudio(url)))
  ipcMain.handle('music:spotifyPickLocalAudio', () => spotifyRecovery.pickLocalAudio())
  ipcMain.handle('music:spotifySkipItem', (_e, itemId, skipped) => musicSpotify.skipPlaylistDownload(itemId, skipped))
  ipcMain.handle('music:spotifyRefreshPlaylist', (_e, playlistId) => withActivity('Refreshing Spotify playlist', () => musicSpotify.refreshPlaylist(playlistId)))
  ipcMain.handle('music:spotifyLoadRelease', (_e, snapshotId, releaseId) => musicSpotify.loadReleaseTracks(snapshotId, releaseId))
  ipcMain.handle('music:spotifyImportPlaylist', (_e, url) =>
    withActivity('Importing Spotify playlist', () => musicSpotify.importPlaylist(url))
  )
  ipcMain.handle('music:spotifyDownloadPlaylist', (_e, input) =>
    musicSpotify.startPlaylistDownload(input)
  )
  ipcMain.handle('music:spotifyEntityState', (_e, input) => musicSpotify.entityState(input))
  ipcMain.handle('music:spotifyFindEntityCandidates', (_e, input) =>
    musicSpotify.findEntityCandidates(input)
  )
  ipcMain.handle('music:spotifyStartEntityInspection', (_e, input) =>
    musicSpotify.inspectEntity(input)
  )
  ipcMain.handle('music:spotifyInspectionStatus', () => musicSpotify.getInspectionStatus())
  ipcMain.handle('music:spotifyCancelInspection', (_e, jobId) => musicSpotify.cancelInspection(jobId))
  ipcMain.handle('music:spotifyDownloadEntity', (_e, input) =>
    musicSpotify.startEntityDownload(input)
  )
  ipcMain.handle('music:spotifyDownloadQueue', () => musicSpotify.getDownloadQueue())
  ipcMain.handle('music:spotifyQueueAddEntity', (_e, input) =>
    musicSpotify.addEntityDownloadQueue(input)
  )
  ipcMain.handle('music:spotifyQueueAddPlaylist', (_e, input) =>
    musicSpotify.addPlaylistDownloadQueue(input)
  )
  ipcMain.handle('music:spotifyQueueReorder', (_e, orderedCardIds) =>
    musicSpotify.reorderDownloadQueue(orderedCardIds)
  )
  ipcMain.handle('music:spotifyQueueRemoveCard', (_e, cardId) =>
    musicSpotify.removeDownloadQueueCard(cardId)
  )
  ipcMain.handle('music:spotifyQueueRemoveSelection', (_e, selectionId) =>
    musicSpotify.removeDownloadQueueSelection(selectionId)
  )
  ipcMain.handle('music:spotifyQueueStart', (_e, input) =>
    musicSpotify.startDownloadQueue(input)
  )
  ipcMain.handle('music:spotifyQueueClearCompleted', () =>
    musicSpotify.clearCompletedDownloadQueue()
  )
  ipcMain.handle('music:spotifySetTrackDownloadOptions', (_e, input) =>
    musicSpotify.setTrackDownloadOptions(input)
  )
  ipcMain.handle('music:spotifyMatchPlaylistItem', (_e, input) =>
    musicSpotifyRepo.matchPlaylistItemToLocalTrack(input)
  )
  ipcMain.handle('music:spotifyConfirmDownloadCandidate', (_e, input) =>
    musicSpotifyRepo.confirmDownloadCandidate(input)
  )
  ipcMain.handle('music:spotifyRejectDownloadCandidate', (_e, input) =>
    musicSpotifyRepo.rejectDownloadCandidate(input.sourceKind, input.trackId)
  )
  ipcMain.handle('music:spotifyForgetEntitySource', (_e, input) =>
    musicSpotify.forgetEntitySource(input)
  )
  ipcMain.handle('music:spotifyRemoveItem', (_e, itemId) =>
    musicSpotifyRepo.removeSpotifyItem(itemId)
  )
  ipcMain.handle('music:spotifyDetect', () => musicSpotify.detectBinary())
  ipcMain.handle('music:spotifyPickCookieFile', () => musicSpotify.pickCookieFile())
  ipcMain.handle('music:spotifyTestYouTubeAccess', (_e, force) => musicSpotify.testYoutubeAccess(Boolean(force)))
  ipcMain.handle('music:spotifyInstallDeno', () => musicSpotify.installDeno())
  ipcMain.handle('music:playlistsForTrack', (_e, trackId) => musicRepo.playlistsForTrack(trackId))
  ipcMain.handle('music:setLiked', (_e, trackId, liked) => musicRepo.setLiked(trackId, liked))
  ipcMain.handle('music:logPlay', (_e, trackId) => musicRepo.logPlay(trackId))
  ipcMain.handle('music:recent', (_e, limit) => musicRepo.recentlyPlayed(limit))
  ipcMain.handle('music:statsDetail', (_e, days) => musicRepo.statsDetail(days))
  ipcMain.handle('music:downloadStart', (_e, input) => musicDownload.startDownload(input))
  ipcMain.handle('music:downloadCancel', (_e, id) => {
    musicDownload.cancelDownload(id)
    musicSpotify.cancelDownload(id)
  })
  ipcMain.handle('music:downloadStatus', () => musicSpotify.getStatus() ?? musicDownload.getStatus())
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

  // ---- wrestling (Wikipedia-sourced wiki + per-event local video) ----
  // Standalone section: NOT media_item rows. startImport is fire-and-forget and
  // deliberately NOT withActivity — the run needs a cancel button and a
  // readable done state, so it brackets itself with begin/endActivity instead.
  ipcMain.handle('wrestling:overview', () => wrestlingRepo.overview())
  ipcMain.handle('wrestling:events', (_e, filter) => wrestlingRepo.listEvents(filter ?? {}))
  ipcMain.handle('wrestling:event', (_e, id) => wrestlingRepo.getEvent(id))
  ipcMain.handle('wrestling:eventIdOfMatch', (_e, id) => wrestlingRepo.eventIdOfMatch(id))
  ipcMain.handle('wrestling:chronology', (_e, id) => wrestlingRepo.chronology(id))
  ipcMain.handle('wrestling:yearCounts', (_e, promotion) => wrestlingRepo.yearCounts(promotion))
  ipcMain.handle('wrestling:allYears', () => wrestlingRepo.allYears())
  ipcMain.handle('wrestling:wrestler', (_e, id) => wrestlingRepo.getWrestlerDetail(id))
  ipcMain.handle('wrestling:wrestlerMatches', (_e, id, opts) =>
    wrestlingRepo.wrestlerMatches(id, opts ?? {})
  )
  ipcMain.handle('wrestling:searchWrestlers', (_e, q) => wrestlingRepo.searchWrestlers(q))
  ipcMain.handle('wrestling:topRatedMatches', (_e, limit) =>
    wrestlingRepo.topRatedMatches(limit ?? 50)
  )
  ipcMain.handle('wrestling:resolveLinks', (_e, titles) => wrestlingRepo.resolveLinks(titles ?? []))
  ipcMain.handle('wrestling:rateMatch', (_e, matchId, stars) =>
    wrestlingRepo.rateMatch(matchId, stars)
  )
  ipcMain.handle('wrestling:setFavorite', (_e, kind, id, favorite) =>
    wrestlingRepo.setFavorite(kind, id, favorite)
  )
  // The collection half: per-event folder attach, straight into the generalized
  // scanner. There is no wrestling-specific file code.
  ipcMain.handle('wrestling:files', (_e, eventId) => ({
    localDir: scan.localDirFor(VIDEO_SCOPES.wrestling, eventId),
    files: wrestlingRepo.videosFor(eventId)
  }))
  ipcMain.handle('wrestling:attachFolder', (_e, eventId) =>
    scan.attachFolderIn(VIDEO_SCOPES.wrestling, eventId)
  )
  ipcMain.handle('wrestling:rescan', (_e, eventId) =>
    scan.rescanIn(VIDEO_SCOPES.wrestling, eventId)
  )
  ipcMain.handle('wrestling:detach', (_e, eventId) =>
    scan.detachIn(VIDEO_SCOPES.wrestling, eventId)
  )
  ipcMain.handle('wrestling:looseMatches', () => wrestlingRepo.looseMatches())
  ipcMain.handle('wrestling:addLooseMatch', (_e, input) => looseMatch.pickAndCreate(input))
  ipcMain.handle('wrestling:updateLooseMatch', (_e, id, input) =>
    wrestlingRepo.updateLooseMatch(id, input)
  )
  ipcMain.handle('wrestling:removeLooseMatch', (_e, id) => wrestlingRepo.removeLooseMatch(id))
  ipcMain.handle('wrestling:recentlyAdded', () => wrestlingRepo.recentlyAdded())
  ipcMain.handle('wrestling:startImport', (_e, opts) => wrestlingImport.start(opts ?? {}))
  ipcMain.handle('wrestling:importStatus', () => wrestlingImport.getStatus())
  ipcMain.handle('wrestling:cancelImport', () => wrestlingImport.cancel())

  // ---- football (local archive + current snapshots + private journal) ----
  // Every long operation goes through the one footballSync singleton and is
  // polled. FotMob is stored/opened only as a validated user-pasted link.
  ipcMain.handle('football:overview', () => footballRepo.overview())
  ipcMain.handle('football:competitions', () => footballRepo.listCompetitions())
  ipcMain.handle('football:competition', (_e, key) => footballRepo.getCompetition(key))
  ipcMain.handle('football:seasons', (_e, key) => footballRepo.listSeasons(key))
  ipcMain.handle('football:season', (_e, id) => footballRepo.getSeason(id))
  ipcMain.handle('football:teams', (_e, filter) => footballRepo.listTeams(filter ?? {}))
  ipcMain.handle('football:team', (_e, id) => footballRepo.getTeam(id))
  ipcMain.handle('football:people', (_e, filter) => footballRepo.listPeople(filter ?? {}))
  ipcMain.handle('football:person', (_e, id) => footballRepo.getPerson(id))
  ipcMain.handle('football:matches', (_e, filter) => footballRepo.listMatches(filter ?? {}))
  ipcMain.handle('football:match', (_e, id) => footballRepo.getMatch(id))
  ipcMain.handle('football:current', (_e, key, from, to) =>
    footballRepo.currentSnapshot(key, from, to)
  )
  ipcMain.handle('football:search', (_e, query) => footballRepo.search(query))
  ipcMain.handle('football:setFavorite', (_e, kind, entityId, favorite) =>
    footballRepo.setFavorite(kind, entityId, favorite)
  )
  ipcMain.handle('football:saveJournal', (_e, matchId, input) =>
    footballRepo.saveJournal(matchId, input)
  )
  ipcMain.handle('football:media', (_e, filter) => footballRepo.listMedia(filter ?? {}))
  ipcMain.handle('football:mediaFor', (_e, kind, entityId) =>
    footballRepo.mediaForEntity(kind, entityId)
  )
  ipcMain.handle('football:saveMedia', (_e, input) => footballRepo.saveMedia(input))
  ipcMain.handle('football:removeMedia', (_e, id) => footballRepo.removeMedia(id))
  ipcMain.handle('football:pickMediaFile', () => footballMedia.pickFile())
  ipcMain.handle('football:openMedia', (_e, localPath) => footballMedia.openLocal(localPath))
  ipcMain.handle('football:externalLinks', (_e, kind, entityId) =>
    footballRepo.listExternalLinks(kind, entityId)
  )
  ipcMain.handle('football:saveExternalLink', (_e, input) =>
    footballRepo.saveExternalLink(input)
  )
  ipcMain.handle('football:removeExternalLink', (_e, id) =>
    footballRepo.removeExternalLink(id)
  )
  ipcMain.handle('football:openExternalLink', (_e, provider, url) =>
    footballMedia.openExternal(provider, url)
  )
  ipcMain.handle('football:syncOverview', () => footballSync.getOverview())
  ipcMain.handle('football:startSync', (_e, request) => footballSync.start(request))
  ipcMain.handle('football:syncStatus', () => footballSync.getStatus())
  ipcMain.handle('football:pauseSync', () => footballSync.pause())
  ipcMain.handle('football:resumeSync', () => footballSync.resume())
  ipcMain.handle('football:cancelSync', () => footballSync.cancel())
  ipcMain.handle('football:resolveConflict', (_e, id, status, resolution) =>
    footballRepo.resolveConflict(id, status, resolution)
  )

  // ---- player (remote transport: thumbbar + pop-out widget) ----
  ipcMain.handle('player:publishState', (_e, snapshot) => playerBridge.publishState(snapshot))
  ipcMain.handle('player:getState', () => playerBridge.getState())
  ipcMain.handle('player:command', (_e, cmd) => playerBridge.dispatchCommand(cmd))
  ipcMain.handle('player:showMain', () => playerBridge.activateMainWindow())
  ipcMain.handle('player:openWidget', () => widget.openWidget(playerBridge.getState))
  ipcMain.handle('player:closeWidget', () => widget.closeWidget())

  // ---- app (system browser for external links + text-file picker) ----
  ipcMain.handle('app:openExternal', (_e, url) => {
    if (!/^https?:\/\//i.test(String(url))) throw new Error('Only http(s) links can be opened')
    return shell.openExternal(String(url))
  })
  ipcMain.handle('app:pickTextFile', () => files.pickTextFile())
  // Applies the UI scale live to every window. Persisting it is the caller's
  // job (settings:set 'ui.scale'); index.ts re-applies the stored value on load.
  ipcMain.handle('app:pendingOpen', () => openFile.takePending())
  // Navigation parked by the native Tools menu. Same returns-AND-clears
  // contract as pendingOpen, and drained by the same poll in OpenFileHandler —
  // a menu item cannot push to the renderer (tests/pushBridge.test.ts).
  ipcMain.handle('app:pendingRoute', () => appMenu.takePendingRoute())
  ipcMain.handle('app:setUiScale', (_e, scale) => {
    const factor = clampUiScale(Number(scale))
    // The pop-out player widget is excluded from UI zoom (and the menu bar
    // below): its 320x64 pill is fixed-size, so scaling would clip it.
    for (const win of BrowserWindow.getAllWindows())
      if (win !== widget.getWidgetWindow()) win.webContents.setZoomFactor(factor)
    return factor
  })
  // Ctrl+wheel UI zoom (App.tsx global listener): steps the SAME persisted
  // ui.scale the Settings pills write — applied live AND persisted here, so
  // the two controls can't drift and the zoom survives a restart.
  ipcMain.handle('app:bumpUiScale', (_e, direction) => {
    const cur = parseUiScale(settingsRepo.get('ui.scale'))
    const next = clampUiScale(Math.round((cur + (Number(direction) > 0 ? 0.1 : -0.1)) * 100) / 100)
    for (const win of BrowserWindow.getAllWindows())
      if (win !== widget.getWidgetWindow()) win.webContents.setZoomFactor(next)
    settingsRepo.set('ui.scale', String(next))
    return next
  })
  // Native menu bar (File/Edit/View…), hidden by default — the menu object
  // stays the application menu either way, so its accelerators (Ctrl+R, F11,
  // Ctrl+Shift+I, Ctrl+= / Ctrl+-) keep working while the bar is invisible.
  // Persisting ui.menuBar is the caller's job (the setUiScale contract).
  ipcMain.handle('app:setMenuBarVisible', (_e, visible) => {
    for (const win of BrowserWindow.getAllWindows())
      if (win !== widget.getWidgetWindow()) win.setMenuBarVisibility(!!visible)
  })

  // ---- settings ----
  ipcMain.handle('settings:all', () => secretStorage.settingsForRenderer())
  ipcMain.handle('settings:secretStorage', () => secretStorage.secretStorageState())
  ipcMain.handle('settings:set', (_e, key: string, value: string) =>
    isSecretSettingKey(key) ? secretStorage.setSecret(key, value) : settingsRepo.set(key, value)
  )

  // ---- files ----
  ipcMain.handle('files:pickImage', () => files.pickImage())
  ipcMain.handle('files:resolveUrl', (_e, relPath) => files.resolveUrl(relPath))
  ipcMain.handle('files:saveBytes', (_e, bytes, ext, subdir) =>
    files.saveMediaBytes(bytes, ext, subdir)
  )
  ipcMain.handle('files:saveImageAs', (_e, bytes, defaultName) =>
    files.saveImageAs(BrowserWindow.fromWebContents(_e.sender), bytes, defaultName)
  )
}
