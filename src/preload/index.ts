import { contextBridge, ipcRenderer } from 'electron'
import type { NaviApi } from '@shared/api'

// Implements the NaviApi surface by forwarding to main over IPC.
const api: NaviApi = {
  media: {
    list: (filter) => ipcRenderer.invoke('media:list', filter),
    get: (id) => ipcRenderer.invoke('media:get', id),
    create: (input) => ipcRenderer.invoke('media:create', input),
    update: (id, input) => ipcRenderer.invoke('media:update', id, input),
    logProgress: (id) => ipcRenderer.invoke('media:logProgress', id),
    remove: (id) => ipcRenderer.invoke('media:remove', id),
    removeCharacter: (mediaId, characterId) =>
      ipcRenderer.invoke('media:removeCharacter', mediaId, characterId),
    statusCounts: (mediaType) => ipcRenderer.invoke('media:statusCounts', mediaType),
    facets: (mediaType) => ipcRenderer.invoke('media:facets', mediaType),
    timeStats: () => ipcRenderer.invoke('media:timeStats'),
    jpMilestones: () => ipcRenderer.invoke('media:jpMilestones'),
    resumePoints: () => ipcRenderer.invoke('media:resumePoints'),
    activityHeatmap: () => ipcRenderer.invoke('media:activityHeatmap')
  },
  tv: {
    seasons: (mediaId) => ipcRenderer.invoke('tv:seasons', mediaId),
    setWatched: (episodeId, watched) => ipcRenderer.invoke('tv:setWatched', episodeId, watched),
    setSeasonWatched: (mediaId, season, watched) =>
      ipcRenderer.invoke('tv:setSeasonWatched', mediaId, season, watched)
  },
  people: {
    list: (search, role, mediaType) => ipcRenderer.invoke('people:list', search, role, mediaType),
    get: (id) => ipcRenderer.invoke('people:get', id),
    credits: (id) => ipcRenderer.invoke('people:credits', id),
    upsert: (input) => ipcRenderer.invoke('people:upsert', input),
    remove: (id) => ipcRenderer.invoke('people:remove', id)
  },
  companies: {
    list: (search, mediaType) => ipcRenderer.invoke('companies:list', search, mediaType),
    get: (id) => ipcRenderer.invoke('companies:get', id),
    media: (id) => ipcRenderer.invoke('companies:media', id),
    upsert: (input) => ipcRenderer.invoke('companies:upsert', input),
    remove: (id) => ipcRenderer.invoke('companies:remove', id)
  },
  characters: {
    list: (search) => ipcRenderer.invoke('characters:list', search),
    get: (id) => ipcRenderer.invoke('characters:get', id),
    roles: (id) => ipcRenderer.invoke('characters:roles', id),
    upsert: (input) => ipcRenderer.invoke('characters:upsert', input),
    remove: (id) => ipcRenderer.invoke('characters:remove', id)
  },
  credits: {
    remove: (creditId) => ipcRenderer.invoke('credits:remove', creditId)
  },
  mediaCompanies: {
    remove: (id) => ipcRenderer.invoke('mediaCompanies:remove', id)
  },
  tags: {
    list: () => ipcRenderer.invoke('tags:list'),
    get: (id) => ipcRenderer.invoke('tags:get', id),
    listWithCounts: () => ipcRenderer.invoke('tags:listWithCounts'),
    media: (id) => ipcRenderer.invoke('tags:media', id),
    upsert: (input) => ipcRenderer.invoke('tags:upsert', input),
    remove: (id) => ipcRenderer.invoke('tags:remove', id)
  },
  search: {
    global: (query) => ipcRenderer.invoke('search:global', query)
  },
  quiz: {
    availability: (request) => ipcRenderer.invoke('quiz:availability', request),
    challengePool: (request) => ipcRenderer.invoke('quiz:challengePool', request),
    songPool: (filter) => ipcRenderer.invoke('quiz:songPool', filter),
    castPool: (filter) => ipcRenderer.invoke('quiz:castPool', filter),
    vaPool: (filter) => ipcRenderer.invoke('quiz:vaPool', filter),
    synopsisPool: (filter) => ipcRenderer.invoke('quiz:synopsisPool', filter),
    mangaPanelPool: (filter, length) => ipcRenderer.invoke('quiz:mangaPanelPool', filter, length),
    tournamentPool: (source) => ipcRenderer.invoke('quiz:tournamentPool', source),
    logSession: (input) => ipcRenderer.invoke('quiz:logSession', input),
    history: (kind, limit, playMode) => ipcRenderer.invoke('quiz:history', kind, limit, playMode)
  },
  hltb: {
    fetch: (mediaId) => ipcRenderer.invoke('hltb:fetch', mediaId)
  },
  games: {
    overview: (mediaId) => ipcRenderer.invoke('games:overview', mediaId),
    pickExe: (mediaId) => ipcRenderer.invoke('games:pickExe', mediaId),
    clearExe: (mediaId) => ipcRenderer.invoke('games:clearExe', mediaId),
    launch: (mediaId) => ipcRenderer.invoke('games:launch', mediaId),
    sessionStatus: () => ipcRenderer.invoke('games:sessionStatus'),
    installed: () => ipcRenderer.invoke('games:installed')
  },
  achievements: {
    list: (mediaId) => ipcRenderer.invoke('achievements:list', mediaId),
    resolveSteam: (mediaId) => ipcRenderer.invoke('achievements:resolveSteam', mediaId),
    setupSteam: (mediaId, appid) => ipcRenderer.invoke('achievements:setupSteam', mediaId, appid),
    raConsoles: () => ipcRenderer.invoke('achievements:raConsoles'),
    raSearch: (query, consoleId) => ipcRenderer.invoke('achievements:raSearch', query, consoleId),
    setupRa: (mediaId, raGameId) => ipcRenderer.invoke('achievements:setupRa', mediaId, raGameId),
    refresh: (mediaId) => ipcRenderer.invoke('achievements:refresh', mediaId),
    importEmu: (mediaId) => ipcRenderer.invoke('achievements:importEmu', mediaId),
    toggleManual: (achievementId, unlocked) =>
      ipcRenderer.invoke('achievements:toggleManual', achievementId, unlocked),
    disable: (mediaId) => ipcRenderer.invoke('achievements:disable', mediaId),
    watchStatus: () => ipcRenderer.invoke('achievements:watchStatus'),
    testPopup: () => ipcRenderer.invoke('achievements:testPopup'),
    overview: () => ipcRenderer.invoke('achievements:overview'),
    recent: (limit) => ipcRenderer.invoke('achievements:recent', limit),
    cardSummaries: () => ipcRenderer.invoke('achievements:cardSummaries'),
    generateGoldberg: (mediaId) => ipcRenderer.invoke('achievements:generateGoldberg', mediaId)
  },
  lists: {
    list: (kind) => ipcRenderer.invoke('lists:list', kind),
    get: (id) => ipcRenderer.invoke('lists:get', id),
    create: (input) => ipcRenderer.invoke('lists:create', input),
    update: (id, input) => ipcRenderer.invoke('lists:update', id, input),
    remove: (id) => ipcRenderer.invoke('lists:remove', id),
    addItem: (listId, entityId, note) =>
      ipcRenderer.invoke('lists:addItem', listId, entityId, note),
    removeItem: (itemId) => ipcRenderer.invoke('lists:removeItem', itemId),
    removeItemByEntity: (listId, entityId) =>
      ipcRenderer.invoke('lists:removeItemByEntity', listId, entityId),
    updateItem: (itemId, patch) => ipcRenderer.invoke('lists:updateItem', itemId, patch),
    reorder: (listId, orderedItemIds) =>
      ipcRenderer.invoke('lists:reorder', listId, orderedItemIds),
    forEntity: (kind, entityId) => ipcRenderer.invoke('lists:forEntity', kind, entityId)
  },
  tierLists: {
    list: (kind) => ipcRenderer.invoke('tierLists:list', kind),
    get: (id) => ipcRenderer.invoke('tierLists:get', id),
    create: (input) => ipcRenderer.invoke('tierLists:create', input),
    update: (id, input) => ipcRenderer.invoke('tierLists:update', id, input),
    remove: (id) => ipcRenderer.invoke('tierLists:remove', id),
    setRows: (listId, rows) => ipcRenderer.invoke('tierLists:setRows', listId, rows),
    persistBoard: (listId, placements) =>
      ipcRenderer.invoke('tierLists:persistBoard', listId, placements),
    addItem: (listId, entityId) => ipcRenderer.invoke('tierLists:addItem', listId, entityId),
    removeItem: (itemId) => ipcRenderer.invoke('tierLists:removeItem', itemId)
  },
  checklist: {
    status: () => ipcRenderer.invoke('checklist:status'),
    addTask: (key, cadence) => ipcRenderer.invoke('checklist:addTask', key, cadence),
    removeTask: (id) => ipcRenderer.invoke('checklist:removeTask', id),
    setTarget: (id, target) => ipcRenderer.invoke('checklist:setTarget', id, target),
    reorder: (cadence, orderedIds) =>
      ipcRenderer.invoke('checklist:reorder', cadence, orderedIds),
    logMedia: (taskKey, cadence, mediaId) =>
      ipcRenderer.invoke('checklist:logMedia', taskKey, cadence, mediaId),
    undoLog: (logId) => ipcRenderer.invoke('checklist:undoLog', logId),
    tick: (taskKey, cadence) => ipcRenderer.invoke('checklist:tick', taskKey, cadence),
    untick: (taskKey, cadence) => ipcRenderer.invoke('checklist:untick', taskKey, cadence),
    credit: (taskKey, cadence) => ipcRenderer.invoke('checklist:credit', taskKey, cadence)
  },
  anilist: {
    search: (query) => ipcRenderer.invoke('anilist:search', query),
    import: (anilistId) => ipcRenderer.invoke('anilist:import', anilistId)
  },
  anilistManga: {
    search: (query) => ipcRenderer.invoke('anilistManga:search', query),
    import: (anilistId) => ipcRenderer.invoke('anilistManga:import', anilistId)
  },
  tmdb: {
    search: (query) => ipcRenderer.invoke('tmdb:search', query),
    import: (tmdbId) => ipcRenderer.invoke('tmdb:import', tmdbId)
  },
  tmdbTv: {
    search: (query) => ipcRenderer.invoke('tmdbTv:search', query),
    import: (tmdbId) => ipcRenderer.invoke('tmdbTv:import', tmdbId)
  },
  vndb: {
    search: (query) => ipcRenderer.invoke('vndb:search', query),
    import: (vndbId) => ipcRenderer.invoke('vndb:import', vndbId)
  },
  rawg: {
    search: (query) => ipcRenderer.invoke('rawg:search', query),
    import: (rawgId) => ipcRenderer.invoke('rawg:import', rawgId)
  },
  igdb: {
    search: (query) => ipcRenderer.invoke('igdb:search', query),
    import: (igdbId) => ipcRenderer.invoke('igdb:import', igdbId)
  },
  steam: {
    search: (query) => ipcRenderer.invoke('steam:search', query),
    import: (appId) => ipcRenderer.invoke('steam:import', appId),
    backfillMetacritic: () => ipcRenderer.invoke('steam:backfillMetacritic')
  },
  rawgCatalog: {
    search: (query) => ipcRenderer.invoke('rawgCatalog:search', query),
    import: (catalogId) => ipcRenderer.invoke('rawgCatalog:import', catalogId),
    status: () => ipcRenderer.invoke('rawgCatalog:status'),
    install: () => ipcRenderer.invoke('rawgCatalog:install')
  },
  bulk: {
    preview: (params) => ipcRenderer.invoke('bulk:preview', params),
    start: (payload) => ipcRenderer.invoke('bulk:start', payload),
    status: () => ipcRenderer.invoke('bulk:status'),
    cancel: () => ipcRenderer.invoke('bulk:cancel')
  },
  openlibrary: {
    search: (query) => ipcRenderer.invoke('openlibrary:search', query),
    import: (olId) => ipcRenderer.invoke('openlibrary:import', olId)
  },
  themes: {
    import: (mediaId) => ipcRenderer.invoke('themes:import', mediaId),
    list: (filter) => ipcRenderer.invoke('themes:list', filter),
    counts: () => ipcRenderer.invoke('themes:counts'),
    favorite: (themeId) => ipcRenderer.invoke('themes:favorite', themeId),
    setFavorite: (themeId, favorite) =>
      ipcRenderer.invoke('themes:setFavorite', themeId, favorite)
  },
  pictures: {
    list: (mediaId, kind) => ipcRenderer.invoke('pictures:list', mediaId, kind),
    searchWallhaven: (query, page) => ipcRenderer.invoke('pictures:searchWallhaven', query, page),
    searchTmdb: (mediaId) => ipcRenderer.invoke('pictures:searchTmdb', mediaId),
    addFromSearch: (mediaId, kind, result) =>
      ipcRenderer.invoke('pictures:addFromSearch', mediaId, kind, result),
    addFromUrl: (mediaId, kind, url) =>
      ipcRenderer.invoke('pictures:addFromUrl', mediaId, kind, url),
    addFromFiles: (mediaId, kind) => ipcRenderer.invoke('pictures:addFromFiles', mediaId, kind),
    remove: (imageId) => ipcRenderer.invoke('pictures:remove', imageId),
    toggleSlideshow: (imageId) => ipcRenderer.invoke('pictures:toggleSlideshow', imageId),
    setBackground: (mediaId, imageId) =>
      ipcRenderer.invoke('pictures:setBackground', mediaId, imageId),
    openSlideshowFolder: () => ipcRenderer.invoke('pictures:openSlideshowFolder')
  },
  franchise: {
    ensureArt: (franchiseId) => ipcRenderer.invoke('franchise:ensureArt', franchiseId),
    artMap: (franchiseId) => ipcRenderer.invoke('franchise:artMap', franchiseId),
    ensureHeroes: () => ipcRenderer.invoke('franchise:ensureHeroes'),
    heroMap: () => ipcRenderer.invoke('franchise:heroMap'),
    artStatus: () => ipcRenderer.invoke('franchise:artStatus')
  },
  torrents: {
    startSearch: (query, categories) =>
      ipcRenderer.invoke('torrents:startSearch', query, categories),
    searchStatus: (offset) => ipcRenderer.invoke('torrents:searchStatus', offset),
    cancelSearch: (id) => ipcRenderer.invoke('torrents:cancelSearch', id),
    add: (input) => ipcRenderer.invoke('torrents:add', input),
    testJackett: () => ipcRenderer.invoke('torrents:testJackett'),
    testQbittorrent: () => ipcRenderer.invoke('torrents:testQbittorrent'),
    ensureJackett: () => ipcRenderer.invoke('torrents:ensureJackett')
  },
  japanese: {
    listCourses: () => ipcRenderer.invoke('japanese:listCourses'),
    getCourse: (id) => ipcRenderer.invoke('japanese:getCourse', id),
    createCourse: (input) => ipcRenderer.invoke('japanese:createCourse', input),
    updateCourse: (id, input) => ipcRenderer.invoke('japanese:updateCourse', id, input),
    removeCourse: (id) => ipcRenderer.invoke('japanese:removeCourse', id),
    getLesson: (id) => ipcRenderer.invoke('japanese:getLesson', id),
    createLesson: (input) => ipcRenderer.invoke('japanese:createLesson', input),
    updateLesson: (id, patch) => ipcRenderer.invoke('japanese:updateLesson', id, patch),
    removeLesson: (id) => ipcRenderer.invoke('japanese:removeLesson', id),
    setLessonLearned: (id, learned) => ipcRenderer.invoke('japanese:setLessonLearned', id, learned),
    createCard: (lessonId, input) => ipcRenderer.invoke('japanese:createCard', lessonId, input),
    updateCard: (id, patch) => ipcRenderer.invoke('japanese:updateCard', id, patch),
    removeCard: (id) => ipcRenderer.invoke('japanese:removeCard', id),
    reviewQueue: (newLimit) => ipcRenderer.invoke('japanese:reviewQueue', newLimit),
    submitReview: (cardId, grade) => ipcRenderer.invoke('japanese:submitReview', cardId, grade),
    quizPool: (scope) => ipcRenderer.invoke('japanese:quizPool', scope),
    lessonQuizPool: (lessonId) => ipcRenderer.invoke('japanese:lessonQuizPool', lessonId),
    buildPrepDeck: (mediaId) => ipcRenderer.invoke('japanese:buildPrepDeck', mediaId),
    prepDeckStatus: () => ipcRenderer.invoke('japanese:prepDeckStatus'),
    roadmap: () => ipcRenderer.invoke('japanese:roadmap'),
    listLeeches: () => ipcRenderer.invoke('japanese:listLeeches'),
    resetCard: (id) => ipcRenderer.invoke('japanese:resetCard', id),
    buildCoreDeck: (limit) => ipcRenderer.invoke('japanese:buildCoreDeck', limit),
    coreDeckStatus: () => ipcRenderer.invoke('japanese:coreDeckStatus'),
    scanCoverage: (mediaId) => ipcRenderer.invoke('japanese:scanCoverage', mediaId),
    coverageScanStatus: () => ipcRenderer.invoke('japanese:coverageScanStatus'),
    coverage: (mediaId) => ipcRenderer.invoke('japanese:coverage', mediaId),
    coverageList: () => ipcRenderer.invoke('japanese:coverageList'),
    analyzeText: (text) => ipcRenderer.invoke('japanese:analyzeText', text),
    stats: () => ipcRenderer.invoke('japanese:stats'),
    jlptLadder: () => ipcRenderer.invoke('japanese:jlptLadder'),
    statsDetail: () => ipcRenderer.invoke('japanese:statsDetail'),
    addGrammarPoints: (ids) => ipcRenderer.invoke('japanese:addGrammarPoints', ids),
    addGrammarLevel: (level) => ipcRenderer.invoke('japanese:addGrammarLevel', level),
    ensureMiningInbox: () => ipcRenderer.invoke('japanese:ensureMiningInbox'),
    markWordsKnown: (words) => ipcRenderer.invoke('japanese:markWordsKnown', words),
    tokenize: (text) => ipcRenderer.invoke('japanese:tokenize', text),
    minedFronts: (fronts) => ipcRenderer.invoke('japanese:minedFronts', fronts),
    pitchQuizPool: (req) => ipcRenderer.invoke('japanese:pitchQuizPool', req),
    componentQuizPool: (req) => ipcRenderer.invoke('japanese:componentQuizPool', req),
    lookalikePool: (req) => ipcRenderer.invoke('japanese:lookalikePool', req),
    homophonePool: (req) => ipcRenderer.invoke('japanese:homophonePool', req),
    confusables: () => ipcRenderer.invoke('japanese:confusables'),
    ghostQueue: (limit) => ipcRenderer.invoke('japanese:ghostQueue', limit),
    ghostAnswer: (cardId, correct) => ipcRenderer.invoke('japanese:ghostAnswer', cardId, correct),
    feed: (req) => ipcRenderer.invoke('japanese:feed', req),
    listeningPool: (req) => ipcRenderer.invoke('japanese:listeningPool', req),
    particlePool: (req) => ipcRenderer.invoke('japanese:particlePool', req),
    scramblePool: (req) => ipcRenderer.invoke('japanese:scramblePool', req),
    contextReadingPool: (req) => ipcRenderer.invoke('japanese:contextReadingPool', req),
    readingRacePool: (req) => ipcRenderer.invoke('japanese:readingRacePool', req),
    jlptTestPool: (req) => ipcRenderer.invoke('japanese:jlptTestPool', req)
  },
  dict: {
    list: () => ipcRenderer.invoke('dict:list'),
    lookup: (query) => ipcRenderer.invoke('dict:lookup', query),
    kanji: (text) => ipcRenderer.invoke('dict:kanji', text),
    importPreset: (key) => ipcRenderer.invoke('dict:importPreset', key),
    importZip: () => ipcRenderer.invoke('dict:importZip'),
    importStatus: () => ipcRenderer.invoke('dict:importStatus'),
    remove: (id) => ipcRenderer.invoke('dict:remove', id),
    sentences: (term, limit) => ipcRenderer.invoke('dict:sentences', term, limit),
    importSentences: () => ipcRenderer.invoke('dict:importSentences'),
    sentenceBank: () => ipcRenderer.invoke('dict:sentenceBank'),
    removeSentences: () => ipcRenderer.invoke('dict:removeSentences'),
    strokes: (char) => ipcRenderer.invoke('dict:strokes', char),
    importStrokes: () => ipcRenderer.invoke('dict:importStrokes'),
    strokeSet: () => ipcRenderer.invoke('dict:strokeSet'),
    removeStrokes: () => ipcRenderer.invoke('dict:removeStrokes'),
    importKanjium: () => ipcRenderer.invoke('dict:importKanjium'),
    importKrad: () => ipcRenderer.invoke('dict:importKrad'),
    kradSet: () => ipcRenderer.invoke('dict:kradSet'),
    removeKrad: () => ipcRenderer.invoke('dict:removeKrad'),
    kradComponents: () => ipcRenderer.invoke('dict:kradComponents'),
    kradSearch: (parts) => ipcRenderer.invoke('dict:kradSearch', parts),
    importGrammar: () => ipcRenderer.invoke('dict:importGrammar'),
    grammarBank: () => ipcRenderer.invoke('dict:grammarBank'),
    removeGrammar: () => ipcRenderer.invoke('dict:removeGrammar'),
    grammarList: () => ipcRenderer.invoke('dict:grammarList'),
    grammarGet: (id) => ipcRenderer.invoke('dict:grammarGet', id),
    grammarRandom: (count, levels) => ipcRenderer.invoke('dict:grammarRandom', count, levels),
    nameSample: (req) => ipcRenderer.invoke('dict:nameSample', req),
    shiritoriNext: (req) => ipcRenderer.invoke('dict:shiritoriNext', req),
    similarKanji: (char) => ipcRenderer.invoke('dict:similarKanji', char),
    readingCandidates: (kana) => ipcRenderer.invoke('dict:readingCandidates', kana),
    transitivityPool: (req) => ipcRenderer.invoke('dict:transitivityPool', req),
    loanwordSample: (req) => ipcRenderer.invoke('dict:loanwordSample', req),
    importPairs: () => ipcRenderer.invoke('dict:importPairs'),
    pairSet: () => ipcRenderer.invoke('dict:pairSet'),
    removePairs: () => ipcRenderer.invoke('dict:removePairs'),
    minimalPairs: () => ipcRenderer.invoke('dict:minimalPairs'),
    importSentenceAudio: () => ipcRenderer.invoke('dict:importSentenceAudio'),
    sentenceAudioBank: () => ipcRenderer.invoke('dict:sentenceAudioBank'),
    removeSentenceAudio: () => ipcRenderer.invoke('dict:removeSentenceAudio'),
    audioSample: (req) => ipcRenderer.invoke('dict:audioSample', req)
  },
  english: {
    lookup: (query) => ipcRenderer.invoke('english:lookup', query),
    dictInfo: () => ipcRenderer.invoke('english:dictInfo'),
    importDict: () => ipcRenderer.invoke('english:importDict'),
    removeDict: () => ipcRenderer.invoke('english:removeDict'),
    saveWord: (input) => ipcRenderer.invoke('english:saveWord', input),
    saveWords: (inputs) => ipcRenderer.invoke('english:saveWords', inputs),
    listWords: (search) => ipcRenderer.invoke('english:listWords', search),
    removeWord: (id) => ipcRenderer.invoke('english:removeWord', id),
    reviewQueue: (newLimit) => ipcRenderer.invoke('english:reviewQueue', newLimit),
    submitReview: (wordId, grade) => ipcRenderer.invoke('english:submitReview', wordId, grade),
    srsStats: () => ipcRenderer.invoke('english:srsStats'),
    vocabPool: (req) => ipcRenderer.invoke('english:vocabPool', req),
    spellingPool: (req) => ipcRenderer.invoke('english:spellingPool', req),
    freqInfo: () => ipcRenderer.invoke('english:freqInfo'),
    importFreq: () => ipcRenderer.invoke('english:importFreq'),
    removeFreq: () => ipcRenderer.invoke('english:removeFreq'),
    writingFeedback: (req) => ipcRenderer.invoke('english:writingFeedback', req),
    listWritings: () => ipcRenderer.invoke('english:listWritings'),
    removeWriting: (id) => ipcRenderer.invoke('english:removeWriting', id),
    errorTally: () => ipcRenderer.invoke('english:errorTally'),
    deck: () => ipcRenderer.invoke('english:deck'),
    listLeeches: () => ipcRenderer.invoke('english:listLeeches'),
    removeWords: (ids) => ipcRenderer.invoke('english:removeWords', ids)
  },
  programming: {
    progress: () => ipcRenderer.invoke('programming:progress'),
    complete: (lessonKey) => ipcRenderer.invoke('programming:complete', lessonKey),
    uncomplete: (lessonKey) => ipcRenderer.invoke('programming:uncomplete', lessonKey),
    recordAttempt: (input) => ipcRenderer.invoke('programming:recordAttempt', input),
    attempts: () => ipcRenderer.invoke('programming:attempts'),
    recordCliRound: (input) => ipcRenderer.invoke('programming:recordCliRound', input),
    cliMisses: () => ipcRenderer.invoke('programming:cliMisses'),
    solves: () => ipcRenderer.invoke('programming:solves'),
    recordSolve: (input) => ipcRenderer.invoke('programming:recordSolve', input),
    sqlRun: (input) => ipcRenderer.invoke('programming:sqlRun', input),
    sqlExpected: (exerciseKey) => ipcRenderer.invoke('programming:sqlExpected', exerciseKey)
  },
  manga: {
    attachFolder: (mediaId) => ipcRenderer.invoke('manga:attachFolder', mediaId),
    rescan: (mediaId) => ipcRenderer.invoke('manga:rescan', mediaId),
    detach: (mediaId) => ipcRenderer.invoke('manga:detach', mediaId),
    chapters: (mediaId) => ipcRenderer.invoke('manga:chapters', mediaId),
    pages: (chapterId) => ipcRenderer.invoke('manga:pages', chapterId),
    markProgress: (chapterId, page) => ipcRenderer.invoke('manga:markProgress', chapterId, page),
    markChapterRead: (chapterId, read) =>
      ipcRenderer.invoke('manga:markChapterRead', chapterId, read),
    ocrStatus: (chapterId) => ipcRenderer.invoke('manga:ocrStatus', chapterId),
    ocrPage: (chapterId, pageIndex) => ipcRenderer.invoke('manga:ocrPage', chapterId, pageIndex),
    ocrRun: (mediaId) => ipcRenderer.invoke('manga:ocrRun', mediaId),
    ocrRunStatus: () => ipcRenderer.invoke('manga:ocrRunStatus'),
    ocrRunCancel: (id) => ipcRenderer.invoke('manga:ocrRunCancel', id),
    ocrDetect: () => ipcRenderer.invoke('manga:ocrDetect'),
    ocrOverview: (mediaId) => ipcRenderer.invoke('manga:ocrOverview', mediaId),
    adhocPages: (token) => ipcRenderer.invoke('manga:adhocPages', token)
  },
  video: {
    attachFolder: (mediaId) => ipcRenderer.invoke('video:attachFolder', mediaId),
    rescan: (mediaId) => ipcRenderer.invoke('video:rescan', mediaId),
    detach: (mediaId) => ipcRenderer.invoke('video:detach', mediaId),
    files: (mediaId) => ipcRenderer.invoke('video:files', mediaId),
    source: (ref, opts) => ipcRenderer.invoke('video:source', ref, opts),
    pickFile: () => ipcRenderer.invoke('video:pickFile'),
    prepare: (ref, opts) => ipcRenderer.invoke('video:prepare', ref, opts),
    prepareStatus: () => ipcRenderer.invoke('video:prepareStatus'),
    prepareCancel: (id) => ipcRenderer.invoke('video:prepareCancel', id),
    tools: () => ipcRenderer.invoke('video:tools'),
    cacheStats: () => ipcRenderer.invoke('video:cacheStats'),
    clearCache: () => ipcRenderer.invoke('video:clearCache'),
    clipAudio: (req) => ipcRenderer.invoke('video:clipAudio', req),
    markProgress: (ref, seconds) => ipcRenderer.invoke('video:markProgress', ref, seconds),
    markWatched: (ref, watched) => ipcRenderer.invoke('video:markWatched', ref, watched)
  },
  music: {
    pickRoot: () => ipcRenderer.invoke('music:pickRoot'),
    scan: () => ipcRenderer.invoke('music:scan'),
    scanStatus: () => ipcRenderer.invoke('music:scanStatus'),
    artists: (search) => ipcRenderer.invoke('music:artists', search),
    albums: (search) => ipcRenderer.invoke('music:albums', search),
    artist: (id) => ipcRenderer.invoke('music:artist', id),
    album: (id) => ipcRenderer.invoke('music:album', id),
    tracks: (filter) => ipcRenderer.invoke('music:tracks', filter),
    artistTracks: (artistId) => ipcRenderer.invoke('music:artistTracks', artistId),
    search: (query) => ipcRenderer.invoke('music:search', query),
    stats: () => ipcRenderer.invoke('music:stats'),
    deleteTracks: (trackIds) => ipcRenderer.invoke('music:deleteTracks', trackIds),
    deleteAlbum: (albumId) => ipcRenderer.invoke('music:deleteAlbum', albumId),
    deleteArtist: (artistId) => ipcRenderer.invoke('music:deleteArtist', artistId),
    playlists: () => ipcRenderer.invoke('music:playlists'),
    playlist: (id) => ipcRenderer.invoke('music:playlist', id),
    createPlaylist: (input) => ipcRenderer.invoke('music:createPlaylist', input),
    updatePlaylist: (id, patch) => ipcRenderer.invoke('music:updatePlaylist', id, patch),
    removePlaylist: (id) => ipcRenderer.invoke('music:removePlaylist', id),
    addPlaylistTracks: (playlistId, trackIds) =>
      ipcRenderer.invoke('music:addPlaylistTracks', playlistId, trackIds),
    removePlaylistTrack: (itemId) => ipcRenderer.invoke('music:removePlaylistTrack', itemId),
    removePlaylistTrackByTrack: (playlistId, trackId) =>
      ipcRenderer.invoke('music:removePlaylistTrackByTrack', playlistId, trackId),
    reorderPlaylist: (playlistId, orderedItemIds) =>
      ipcRenderer.invoke('music:reorderPlaylist', playlistId, orderedItemIds),
    spotifyImportPlaylist: (url) => ipcRenderer.invoke('music:spotifyImportPlaylist', url),
    spotifyDownloadPlaylist: (input) =>
      ipcRenderer.invoke('music:spotifyDownloadPlaylist', input),
    spotifyInspectEntity: (input) => ipcRenderer.invoke('music:spotifyInspectEntity', input),
    spotifyInspectionStatus: () => ipcRenderer.invoke('music:spotifyInspectionStatus'),
    spotifyCancelInspection: () => ipcRenderer.invoke('music:spotifyCancelInspection'),
    spotifyDownloadEntity: (input) => ipcRenderer.invoke('music:spotifyDownloadEntity', input),
    spotifyForgetEntitySource: (input) =>
      ipcRenderer.invoke('music:spotifyForgetEntitySource', input),
    spotifyRemoveItem: (itemId) => ipcRenderer.invoke('music:spotifyRemoveItem', itemId),
    spotifyDetect: () => ipcRenderer.invoke('music:spotifyDetect'),
    playlistsForTrack: (trackId) => ipcRenderer.invoke('music:playlistsForTrack', trackId),
    setLiked: (trackId, liked) => ipcRenderer.invoke('music:setLiked', trackId, liked),
    logPlay: (trackId) => ipcRenderer.invoke('music:logPlay', trackId),
    recent: (limit) => ipcRenderer.invoke('music:recent', limit),
    statsDetail: (days) => ipcRenderer.invoke('music:statsDetail', days),
    downloadStart: (input) => ipcRenderer.invoke('music:downloadStart', input),
    downloadCancel: (id) => ipcRenderer.invoke('music:downloadCancel', id),
    downloadStatus: () => ipcRenderer.invoke('music:downloadStatus'),
    downloadDetect: () => ipcRenderer.invoke('music:downloadDetect'),
    artFetchAlbum: (albumId) => ipcRenderer.invoke('music:artFetchAlbum', albumId),
    artFetchArtist: (artistId) => ipcRenderer.invoke('music:artFetchArtist', artistId),
    artClearAlbum: (albumId) => ipcRenderer.invoke('music:artClearAlbum', albumId),
    artClearArtist: (artistId) => ipcRenderer.invoke('music:artClearArtist', artistId),
    artFetchMissing: () => ipcRenderer.invoke('music:artFetchMissing'),
    artCancel: () => ipcRenderer.invoke('music:artCancel'),
    artStatus: () => ipcRenderer.invoke('music:artStatus')
  },
  gacha: {
    overview: () => ipcRenderer.invoke('gacha:overview'),
    units: (game, filter) => ipcRenderer.invoke('gacha:units', game, filter),
    unit: (id) => ipcRenderer.invoke('gacha:unit', id),
    createUnit: (input) => ipcRenderer.invoke('gacha:createUnit', input),
    updateUnit: (id, patch) => ipcRenderer.invoke('gacha:updateUnit', id, patch),
    removeUnit: (id) => ipcRenderer.invoke('gacha:removeUnit', id),
    createBuild: (unitId, input) => ipcRenderer.invoke('gacha:createBuild', unitId, input),
    updateBuild: (id, patch) => ipcRenderer.invoke('gacha:updateBuild', id, patch),
    removeBuild: (id) => ipcRenderer.invoke('gacha:removeBuild', id),
    currencies: (game) => ipcRenderer.invoke('gacha:currencies', game),
    setCurrency: (game, key, amount) => ipcRenderer.invoke('gacha:setCurrency', game, key, amount),
    banners: (game) => ipcRenderer.invoke('gacha:banners', game),
    createBanner: (input) => ipcRenderer.invoke('gacha:createBanner', input),
    updateBanner: (id, patch) => ipcRenderer.invoke('gacha:updateBanner', id, patch),
    removeBanner: (id) => ipcRenderer.invoke('gacha:removeBanner', id),
    news: (game) => ipcRenderer.invoke('gacha:news', game),
    fetchNews: (game) => ipcRenderer.invoke('gacha:fetchNews', game),
    downloadImage: (url) => ipcRenderer.invoke('gacha:downloadImage', url),
    setGameImage: (game, relPath) => ipcRenderer.invoke('gacha:setGameImage', game, relPath),
    importCatalog: (game) => ipcRenderer.invoke('gacha:importCatalog', game),
    importChaldea: (game) => ipcRenderer.invoke('gacha:importChaldea', game),
    coachStatus: () => ipcRenderer.invoke('gacha:coachStatus'),
    coachSend: (game, text, attachments) =>
      ipcRenderer.invoke('gacha:coachSend', game, text, attachments),
    coachCancel: () => ipcRenderer.invoke('gacha:coachCancel'),
    coachThread: (game) => ipcRenderer.invoke('gacha:coachThread', game),
    coachThreads: (game) => ipcRenderer.invoke('gacha:coachThreads', game),
    coachNewThread: (game) => ipcRenderer.invoke('gacha:coachNewThread', game),
    coachMessages: (threadId) => ipcRenderer.invoke('gacha:coachMessages', threadId),
    saveAttachment: (bytes, ext) => ipcRenderer.invoke('gacha:saveAttachment', bytes, ext),
    goals: (game) => ipcRenderer.invoke('gacha:goals', game),
    createGoal: (game, input) => ipcRenderer.invoke('gacha:createGoal', game, input),
    updateGoal: (id, patch) => ipcRenderer.invoke('gacha:updateGoal', id, patch),
    completeGoal: (id) => ipcRenderer.invoke('gacha:completeGoal', id),
    dropGoal: (id) => ipcRenderer.invoke('gacha:dropGoal', id),
    dueCounts: () => ipcRenderer.invoke('gacha:dueCounts'),
    coachNotes: (game) => ipcRenderer.invoke('gacha:coachNotes', game),
    removeCoachNote: (id) => ipcRenderer.invoke('gacha:removeCoachNote', id),
    coachDocs: (game) => ipcRenderer.invoke('gacha:coachDocs', game),
    importCoachDoc: (game, input) => ipcRenderer.invoke('gacha:importCoachDoc', game, input),
    removeCoachDoc: (id) => ipcRenderer.invoke('gacha:removeCoachDoc', id)
  },
  wrestling: {
    overview: () => ipcRenderer.invoke('wrestling:overview'),
    events: (filter) => ipcRenderer.invoke('wrestling:events', filter),
    event: (id) => ipcRenderer.invoke('wrestling:event', id),
    chronology: (id) => ipcRenderer.invoke('wrestling:chronology', id),
    eventIdOfMatch: (matchId) => ipcRenderer.invoke('wrestling:eventIdOfMatch', matchId),
    yearCounts: (promotion) => ipcRenderer.invoke('wrestling:yearCounts', promotion),
    allYears: () => ipcRenderer.invoke('wrestling:allYears'),
    wrestler: (id) => ipcRenderer.invoke('wrestling:wrestler', id),
    wrestlerMatches: (id, opts) => ipcRenderer.invoke('wrestling:wrestlerMatches', id, opts),
    searchWrestlers: (query) => ipcRenderer.invoke('wrestling:searchWrestlers', query),
    topRatedMatches: (limit) => ipcRenderer.invoke('wrestling:topRatedMatches', limit),
    resolveLinks: (titles) => ipcRenderer.invoke('wrestling:resolveLinks', titles),
    rateMatch: (matchId, stars) => ipcRenderer.invoke('wrestling:rateMatch', matchId, stars),
    setFavorite: (kind, id, favorite) =>
      ipcRenderer.invoke('wrestling:setFavorite', kind, id, favorite),
    files: (eventId) => ipcRenderer.invoke('wrestling:files', eventId),
    attachFolder: (eventId) => ipcRenderer.invoke('wrestling:attachFolder', eventId),
    rescan: (eventId) => ipcRenderer.invoke('wrestling:rescan', eventId),
    detach: (eventId) => ipcRenderer.invoke('wrestling:detach', eventId),
    looseMatches: () => ipcRenderer.invoke('wrestling:looseMatches'),
    addLooseMatch: (input) => ipcRenderer.invoke('wrestling:addLooseMatch', input),
    updateLooseMatch: (id, input) => ipcRenderer.invoke('wrestling:updateLooseMatch', id, input),
    removeLooseMatch: (id) => ipcRenderer.invoke('wrestling:removeLooseMatch', id),
    recentlyAdded: () => ipcRenderer.invoke('wrestling:recentlyAdded'),
    startImport: (opts) => ipcRenderer.invoke('wrestling:startImport', opts),
    importStatus: () => ipcRenderer.invoke('wrestling:importStatus'),
    cancelImport: () => ipcRenderer.invoke('wrestling:cancelImport')
  },
  player: {
    publishState: (snapshot) => ipcRenderer.invoke('player:publishState', snapshot),
    getState: () => ipcRenderer.invoke('player:getState'),
    command: (cmd) => ipcRenderer.invoke('player:command', cmd),
    showMain: () => ipcRenderer.invoke('player:showMain'),
    openWidget: () => ipcRenderer.invoke('player:openWidget'),
    closeWidget: () => ipcRenderer.invoke('player:closeWidget'),
    // The app's only push channels (see tests/pushBridge.test.ts before adding
    // another). Both return unsubscribers so effects can clean up.
    onCommand: (cb) => {
      const listener = (_e: Electron.IpcRendererEvent, cmd: Parameters<typeof cb>[0]): void =>
        cb(cmd)
      ipcRenderer.on('player:cmd', listener)
      return () => ipcRenderer.removeListener('player:cmd', listener)
    },
    onState: (cb) => {
      const listener = (_e: Electron.IpcRendererEvent, snap: Parameters<typeof cb>[0]): void =>
        cb(snap)
      ipcRenderer.on('player:state', listener)
      return () => ipcRenderer.removeListener('player:state', listener)
    }
  },
  app: {
    openExternal: (url) => ipcRenderer.invoke('app:openExternal', url),
    pickTextFile: () => ipcRenderer.invoke('app:pickTextFile'),
    setUiScale: (scale) => ipcRenderer.invoke('app:setUiScale', scale),
    bumpUiScale: (direction) => ipcRenderer.invoke('app:bumpUiScale', direction),
    setMenuBarVisible: (visible) => ipcRenderer.invoke('app:setMenuBarVisible', visible),
    pendingOpen: () => ipcRenderer.invoke('app:pendingOpen'),
    pendingRoute: () => ipcRenderer.invoke('app:pendingRoute')
  },
  activity: {
    status: () => ipcRenderer.invoke('activity:status')
  },
  tasks: {
    list: () => ipcRenderer.invoke('tasks:list'),
    get: (id) => ipcRenderer.invoke('tasks:get', id),
    cancel: (id) => ipcRenderer.invoke('tasks:cancel', id),
    pause: (id) => ipcRenderer.invoke('tasks:pause', id),
    resume: (id) => ipcRenderer.invoke('tasks:resume', id),
    clearFinished: () => ipcRenderer.invoke('tasks:clearFinished')
  },
  logs: {
    tail: (req) => ipcRenderer.invoke('logs:tail', req),
    reveal: () => ipcRenderer.invoke('logs:reveal')
  },
  libraryExport: {
    preview: (options) => ipcRenderer.invoke('libraryExport:preview', options),
    start: (options) => ipcRenderer.invoke('libraryExport:start', options),
    status: () => ipcRenderer.invoke('libraryExport:status'),
    cancel: () => ipcRenderer.invoke('libraryExport:cancel'),
    reveal: () => ipcRenderer.invoke('libraryExport:reveal')
  },
  updates: {
    status: () => ipcRenderer.invoke('update:status'),
    check: () => ipcRenderer.invoke('update:check'),
    download: () => ipcRenderer.invoke('update:download'),
    cancel: () => ipcRenderer.invoke('update:cancel'),
    install: () => ipcRenderer.invoke('update:install'),
    testToken: () => ipcRenderer.invoke('update:testToken')
  },
  settings: {
    all: () => ipcRenderer.invoke('settings:all'),
    set: (key, value) => ipcRenderer.invoke('settings:set', key, value)
  },
  refresh: {
    preview: (req) => ipcRenderer.invoke('refresh:preview', req),
    start: (req) => ipcRenderer.invoke('refresh:start', req),
    status: () => ipcRenderer.invoke('refresh:status'),
    cancel: () => ipcRenderer.invoke('refresh:cancel'),
    one: (mediaId, aspects) => ipcRenderer.invoke('refresh:one', mediaId, aspects)
  },
  files: {
    pickImage: () => ipcRenderer.invoke('files:pickImage'),
    resolveUrl: (relPath) => ipcRenderer.invoke('files:resolveUrl', relPath),
    saveBytes: (bytes, ext, subdir) => ipcRenderer.invoke('files:saveBytes', bytes, ext, subdir),
    saveImageAs: (bytes, defaultName) => ipcRenderer.invoke('files:saveImageAs', bytes, defaultName)
  }
}

contextBridge.exposeInMainWorld('api', api)
