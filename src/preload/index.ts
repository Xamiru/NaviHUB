import { contextBridge, ipcRenderer } from 'electron'
import type { NaviApi } from '@shared/api'

// Implements the NaviApi surface by forwarding to main over IPC.
const api: NaviApi = {
  playthroughs: {
    list: (mediaId) => ipcRenderer.invoke('playthroughs:list', mediaId),
    save: (mediaId, id, input) => ipcRenderer.invoke('playthroughs:save', mediaId, id, input),
    remove: (mediaId, id) => ipcRenderer.invoke('playthroughs:remove', mediaId, id),
    history: (mediaId, runId, page) => ipcRenderer.invoke('playthroughs:history', mediaId, runId, page),
    assignSession: (mediaId, sessionId, runId) => ipcRenderer.invoke('playthroughs:assignSession', mediaId, sessionId, runId),
    saveNote: (mediaId, runId, id, input) => ipcRenderer.invoke('playthroughs:saveNote', mediaId, runId, id, input),
    removeNote: (mediaId, runId, id) => ipcRenderer.invoke('playthroughs:removeNote', mediaId, runId, id)
  },
  musicJournal: {
    track: (id) => ipcRenderer.invoke('musicJournal:track', id),
    saveTrack: (input) => ipcRenderer.invoke('musicJournal:saveTrack', input),
    standouts: (albumId) => ipcRenderer.invoke('musicJournal:standouts', albumId),
    tags: () => ipcRenderer.invoke('musicJournal:tags')
  },
  musicSmart: {
    list: () => ipcRenderer.invoke('musicSmart:list'),
    save: (id, input) => ipcRenderer.invoke('musicSmart:save', id, input),
    remove: (id) => ipcRenderer.invoke('musicSmart:remove', id),
    preview: (rules, page) => ipcRenderer.invoke('musicSmart:preview', rules, page),
    queue: (id) => ipcRenderer.invoke('musicSmart:queue', id)
  },
  vnExplore: {
    discover: (input) => ipcRenderer.invoke('vnExplore:discover', input),
    tags: (query) => ipcRenderer.invoke('vnExplore:tags', query),
    edition: (mediaId) => ipcRenderer.invoke('vnExplore:edition', mediaId),
    refreshReleases: (mediaId) => ipcRenderer.invoke('vnExplore:refreshReleases', mediaId),
    saveEdition: (mediaId, releaseId, notes) => ipcRenderer.invoke('vnExplore:saveEdition', mediaId, releaseId, notes)
  },
  vnCapture: {
    list: (mediaId) => ipcRenderer.invoke('vnCapture:list', mediaId),
    get: (mediaId, id) => ipcRenderer.invoke('vnCapture:get', mediaId, id),
    save: (mediaId, id, input) => ipcRenderer.invoke('vnCapture:save', mediaId, id, input),
    remove: (mediaId, id) => ipcRenderer.invoke('vnCapture:remove', mediaId, id)
  },
  journeys: {
    list: () => ipcRenderer.invoke('journeys:list'),
    detail: (id) => ipcRenderer.invoke('journeys:detail', id),
    save: (id, input) => ipcRenderer.invoke('journeys:save', id, input),
    remove: (id) => ipcRenderer.invoke('journeys:remove', id),
    saveStep: (journeyId, id, input) => ipcRenderer.invoke('journeys:saveStep', journeyId, id, input),
    removeStep: (journeyId, id) => ipcRenderer.invoke('journeys:removeStep', journeyId, id),
    reorder: (journeyId, ids) => ipcRenderer.invoke('journeys:reorder', journeyId, ids),
    logViewing: (journeyId, stepId, watchedOn, notes) => ipcRenderer.invoke('journeys:logViewing', journeyId, stepId, watchedOn, notes),
    removeViewing: (journeyId, viewingId) => ipcRenderer.invoke('journeys:removeViewing', journeyId, viewingId),
    instantiate: (key) => ipcRenderer.invoke('journeys:instantiate', key),
    targets: (kind, search) => ipcRenderer.invoke('journeys:targets', kind, search),
    pickFile: (journeyId, stepId) => ipcRenderer.invoke('journeys:pickFile', journeyId, stepId),
    detachFile: (journeyId, stepId) => ipcRenderer.invoke('journeys:detachFile', journeyId, stepId),
    openFile: (journeyId, stepId) => ipcRenderer.invoke('journeys:openFile', journeyId, stepId)
  },
  vnReading: {
    overview: (mediaId) => ipcRenderer.invoke('vnReading:overview', mediaId),
    saveNode: (mediaId, id, input) => ipcRenderer.invoke('vnReading:saveNode', mediaId, id, input),
    removeNode: (mediaId, id) => ipcRenderer.invoke('vnReading:removeNode', mediaId, id),
    reorder: (mediaId, ids) => ipcRenderer.invoke('vnReading:reorder', mediaId, ids),
    saveResume: (mediaId, input) => ipcRenderer.invoke('vnReading:saveResume', mediaId, input),
    notes: (mediaId, page) => ipcRenderer.invoke('vnReading:notes', mediaId, page),
    saveNote: (mediaId, id, input) => ipcRenderer.invoke('vnReading:saveNote', mediaId, id, input),
    removeNote: (mediaId, id) => ipcRenderer.invoke('vnReading:removeNote', mediaId, id)
  },
  media: {
    list: (filter) => ipcRenderer.invoke('media:list', filter),
    listPage: (request) => ipcRenderer.invoke('media:listPage', request),
    homeOverview: () => ipcRenderer.invoke('media:homeOverview'),
    seasonalAnime: (year, includeUnknown) =>
      ipcRenderer.invoke('media:seasonalAnime', year, includeUnknown),
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
    list: (search, role, mediaType, limit) =>
      ipcRenderer.invoke('people:list', search, role, mediaType, limit),
    get: (id) => ipcRenderer.invoke('people:get', id),
    credits: (id) => ipcRenderer.invoke('people:credits', id),
    costars: (id, limit) => ipcRenderer.invoke('people:costars', id, limit),
    directory: (query) => ipcRenderer.invoke('people:directory', query),
    upsert: (input) => ipcRenderer.invoke('people:upsert', input),
    remove: (id) => ipcRenderer.invoke('people:remove', id)
  },
  companies: {
    list: (search, mediaType, limit) =>
      ipcRenderer.invoke('companies:list', search, mediaType, limit),
    get: (id) => ipcRenderer.invoke('companies:get', id),
    media: (id) => ipcRenderer.invoke('companies:media', id),
    collaborators: (id, limit) => ipcRenderer.invoke('companies:collaborators', id, limit),
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
  images: {
    overrideState: (kind, id) => ipcRenderer.invoke('images:overrideState', kind, id),
    setManual: (kind, id, path) => ipcRenderer.invoke('images:setManual', kind, id, path),
    revert: (kind, id) => ipcRenderer.invoke('images:revert', kind, id),
    fromUrl: (url) => ipcRenderer.invoke('images:fromUrl', url),
    fromArt: (imageId) => ipcRenderer.invoke('images:fromArt', imageId)
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
    vaQuestions: (filter, count, seed) => ipcRenderer.invoke('quiz:vaQuestions', filter, count, seed),
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
  gameCatalog: {
    search: (query) => ipcRenderer.invoke('gameCatalog:search', query),
    import: (workId) => ipcRenderer.invoke('gameCatalog:import', workId),
    status: () => ipcRenderer.invoke('gameCatalog:status'),
    install: () => ipcRenderer.invoke('gameCatalog:install')
  },
  gameLinks: {
    get: (mediaId) => ipcRenderer.invoke('gameLinks:get', mediaId),
    searchWorks: (query) => ipcRenderer.invoke('gameLinks:searchWorks', query),
    setWork: (mediaId, workId) => ipcRenderer.invoke('gameLinks:setWork', mediaId, workId),
    unlinkWork: (mediaId) => ipcRenderer.invoke('gameLinks:unlinkWork', mediaId),
    searchBangumi: (query) => ipcRenderer.invoke('gameLinks:searchBangumi', query),
    setBangumi: (mediaId, subjectId) => ipcRenderer.invoke('gameLinks:setBangumi', mediaId, subjectId),
    unlinkBangumi: (mediaId) => ipcRenderer.invoke('gameLinks:unlinkBangumi', mediaId),
    reset: (mediaId, source) => ipcRenderer.invoke('gameLinks:reset', mediaId, source),
    refreshCast: (mediaId) => ipcRenderer.invoke('gameLinks:refreshCast', mediaId)
  },
  gameUpgrade: {
    plan: () => ipcRenderer.invoke('gameUpgrade:plan'),
    start: () => ipcRenderer.invoke('gameUpgrade:start'),
    status: () => ipcRenderer.invoke('gameUpgrade:status'),
    cancel: () => ipcRenderer.invoke('gameUpgrade:cancel')
  },
  bulk: {
    preview: (params) => ipcRenderer.invoke('bulk:preview', params),
    start: (payload) => ipcRenderer.invoke('bulk:start', payload),
    status: () => ipcRenderer.invoke('bulk:status'),
    cancel: () => ipcRenderer.invoke('bulk:cancel'),
    retryFailed: () => ipcRenderer.invoke('bulk:retryFailed'),
    undoLast: () => ipcRenderer.invoke('bulk:undoLast')
  },
  hardcover: {
    search: (query) => ipcRenderer.invoke('hardcover:search', query),
    import: (bookId) => ipcRenderer.invoke('hardcover:import', bookId)
  },
  books: {
    editions: (mediaId) => ipcRenderer.invoke('books:editions', mediaId),
    edition: (mediaId) => ipcRenderer.invoke('books:edition', mediaId),
    chooseEdition: (mediaId, editionId) => ipcRenderer.invoke('books:chooseEdition', mediaId, editionId),
    clearEdition: (mediaId) => ipcRenderer.invoke('books:clearEdition', mediaId)
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
    sources: (mediaId, kind) => ipcRenderer.invoke('pictures:sources', mediaId, kind),
    search: (mediaId, source, query, page) =>
      ipcRenderer.invoke('pictures:search', mediaId, source, query, page),
    addFromSearch: (mediaId, kind, result) =>
      ipcRenderer.invoke('pictures:addFromSearch', mediaId, kind, result),
    addFromUrl: (mediaId, kind, url) =>
      ipcRenderer.invoke('pictures:addFromUrl', mediaId, kind, url),
    addFromFiles: (mediaId, kind) => ipcRenderer.invoke('pictures:addFromFiles', mediaId, kind),
    remove: (imageId) => ipcRenderer.invoke('pictures:remove', imageId),
    toggleSlideshow: (imageId) => ipcRenderer.invoke('pictures:toggleSlideshow', imageId),
    setBackground: (mediaId, imageId) =>
      ipcRenderer.invoke('pictures:setBackground', mediaId, imageId),
    openSlideshowFolder: () => ipcRenderer.invoke('pictures:openSlideshowFolder'),
    gallery: (filter) => ipcRenderer.invoke('pictures:gallery', filter),
    homePick: () => ipcRenderer.invoke('pictures:homePick'),
    setFavorite: (imageIds, favorite) => ipcRenderer.invoke('pictures:setFavorite', imageIds, favorite),
    move: (imageIds, mediaId, kind) => ipcRenderer.invoke('pictures:move', imageIds, mediaId, kind),
    albums: () => ipcRenderer.invoke('pictures:albums'),
    album: (albumId) => ipcRenderer.invoke('pictures:album', albumId),
    albumCreate: (name, imageIds) => ipcRenderer.invoke('pictures:albumCreate', name, imageIds),
    albumRename: (albumId, name) => ipcRenderer.invoke('pictures:albumRename', albumId, name),
    albumDelete: (albumId) => ipcRenderer.invoke('pictures:albumDelete', albumId),
    albumAdd: (albumId, imageIds) => ipcRenderer.invoke('pictures:albumAdd', albumId, imageIds),
    albumRemove: (albumId, imageIds) => ipcRenderer.invoke('pictures:albumRemove', albumId, imageIds),
    albumReorder: (albumId, orderedIds) =>
      ipcRenderer.invoke('pictures:albumReorder', albumId, orderedIds),
    tags: () => ipcRenderer.invoke('pictures:tags'),
    tag: (imageIds, name) => ipcRenderer.invoke('pictures:tag', imageIds, name),
    untag: (imageIds, tagId) => ipcRenderer.invoke('pictures:untag', imageIds, tagId),
    tagRename: (tagId, name) => ipcRenderer.invoke('pictures:tagRename', tagId, name),
    tagDelete: (tagId) => ipcRenderer.invoke('pictures:tagDelete', tagId),
    slideshowSource: () => ipcRenderer.invoke('pictures:slideshowSource'),
    setSlideshowSource: (source) => ipcRenderer.invoke('pictures:setSlideshowSource', source)
  },
  franchise: {
    ensureArt: (franchiseId) => ipcRenderer.invoke('franchise:ensureArt', franchiseId),
    artMap: (franchiseId) => ipcRenderer.invoke('franchise:artMap', franchiseId),
    ensureHeroes: () => ipcRenderer.invoke('franchise:ensureHeroes'),
    heroMap: () => ipcRenderer.invoke('franchise:heroMap'),
    artStatus: () => ipcRenderer.invoke('franchise:artStatus')
  },
  history: {
    overview: () => ipcRenderer.invoke('history:overview'),
    borders: () => ipcRenderer.invoke('history:borders'),
    mapPins: () => ipcRenderer.invoke('history:mapPins'),
    mapPolities: () => ipcRenderer.invoke('history:mapPolities'),
    themes: () => ipcRenderer.invoke('history:themes'),
    onThisDay: (month, day) => ipcRenderer.invoke('history:onThisDay', month, day),
    decade: (start) => ipcRenderer.invoke('history:decade', start),
    article: (ref) => ipcRenderer.invoke('history:article', ref),
    sources: () => ipcRenderer.invoke('history:sources'),
    source: (id) => ipcRenderer.invoke('history:source', id),
    search: (query) => ipcRenderer.invoke('history:search', query),
    backlinks: (mediaId) => ipcRenderer.invoke('history:backlinks', mediaId),
    setMark: (ref, field, value) => ipcRenderer.invoke('history:setMark', ref, field, value),
    saveNote: (ref, body, kind) => ipcRenderer.invoke('history:saveNote', ref, body, kind),
    notes: (kind) => ipcRenderer.invoke('history:notes', kind),
    linkMedia: (ref, mediaId, kind) => ipcRenderer.invoke('history:linkMedia', ref, mediaId, kind),
    unlinkMedia: (id) => ipcRenderer.invoke('history:unlinkMedia', id),
    userEntities: () => ipcRenderer.invoke('history:userEntities'),
    userEntity: (id) => ipcRenderer.invoke('history:userEntity', id),
    saveUserEntity: (entity) => ipcRenderer.invoke('history:saveUserEntity', entity),
    removeUserEntity: (id) => ipcRenderer.invoke('history:removeUserEntity', id),
    imageStatus: () => ipcRenderer.invoke('history:imageStatus'),
    attachFile: (ref) => ipcRenderer.invoke('history:attachFile', ref),
    downloadSuggestion: (ref, suggestionId) => ipcRenderer.invoke('history:downloadSuggestion', ref, suggestionId),
    archiveJobs: () => ipcRenderer.invoke('history:archiveJobs'),
    cancelArchiveJob: (id) => ipcRenderer.invoke('history:cancelArchiveJob', id),
    openArchive: (rowId) => ipcRenderer.invoke('history:openArchive', rowId),
    removeArchive: (rowId, deleteFile) => ipcRenderer.invoke('history:removeArchive', rowId, deleteFile)
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
    saveTutorDebrief: (input) => ipcRenderer.invoke('japanese:saveTutorDebrief', input),
    tutorDays: (limit) => ipcRenderer.invoke('japanese:tutorDays', limit),
    addTutorError: (input) => ipcRenderer.invoke('japanese:addTutorError', input),
    tutorErrors: (limit) => ipcRenderer.invoke('japanese:tutorErrors', limit),
    resolveTutorError: (id, resolved) =>
      ipcRenderer.invoke('japanese:resolveTutorError', id, resolved),
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
    openExternal: (ref) => ipcRenderer.invoke('video:openExternal', ref),
    tools: () => ipcRenderer.invoke('video:tools'),
    markWatched: (ref, watched) => ipcRenderer.invoke('video:markWatched', ref, watched)
  },
  music: {
    pickRoot: () => ipcRenderer.invoke('music:pickRoot'),
    scan: () => ipcRenderer.invoke('music:scan'),
    scanStatus: () => ipcRenderer.invoke('music:scanStatus'),
    artists: (search) => ipcRenderer.invoke('music:artists', search),
    albums: (search, scope) => ipcRenderer.invoke('music:albums', search, scope),
    genres: () => ipcRenderer.invoke('music:genres'),
    decades: () => ipcRenderer.invoke('music:decades'),
    lyrics: (trackId) => ipcRenderer.invoke('music:lyrics', trackId),
    fetchLyrics: (trackId) => ipcRenderer.invoke('music:fetchLyrics', trackId),
    lyricsFetchMissing: () => ipcRenderer.invoke('music:lyricsFetchMissing'),
    lyricsCancel: () => ipcRenderer.invoke('music:lyricsCancel'),
    lyricsStatus: () => ipcRenderer.invoke('music:lyricsStatus'),
    artist: (id) => ipcRenderer.invoke('music:artist', id),
    album: (id) => ipcRenderer.invoke('music:album', id),
    tracks: (filter) => ipcRenderer.invoke('music:tracks', filter),
    trackPage: (request) => ipcRenderer.invoke('music:trackPage', request),
    playbackQueue: (shuffle, scope) => ipcRenderer.invoke('music:playbackQueue', shuffle, scope),
    artistTracks: (artistId) => ipcRenderer.invoke('music:artistTracks', artistId),
    search: (query) => ipcRenderer.invoke('music:search', query),
    searchLyrics: (query) => ipcRenderer.invoke('music:searchLyrics', query),
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
    queueAdd: (input) => ipcRenderer.invoke('music:queueAdd', input),
    spotifySearchAudio: (query) => ipcRenderer.invoke('music:spotifySearchAudio', query),
    spotifyPreviewAudio: (url) => ipcRenderer.invoke('music:spotifyPreviewAudio', url),
    spotifyPickLocalAudio: () => ipcRenderer.invoke('music:spotifyPickLocalAudio'),
    spotifySkipItem: (itemId, skipped) => ipcRenderer.invoke('music:spotifySkipItem', itemId, skipped),
    spotifyRefreshPlaylist: (playlistId) => ipcRenderer.invoke('music:spotifyRefreshPlaylist', playlistId),
    spotifyLoadRelease: (snapshotId, releaseId) => ipcRenderer.invoke('music:spotifyLoadRelease', snapshotId, releaseId),
    spotifyImportPlaylist: (url) => ipcRenderer.invoke('music:spotifyImportPlaylist', url),
    spotifyDownloadPlaylist: (input) =>
      ipcRenderer.invoke('music:spotifyDownloadPlaylist', input),
    spotifyEntityState: (input) => ipcRenderer.invoke('music:spotifyEntityState', input),
    spotifyFindEntityCandidates: (input) =>
      ipcRenderer.invoke('music:spotifyFindEntityCandidates', input),
    spotifyStartEntityInspection: (input) =>
      ipcRenderer.invoke('music:spotifyStartEntityInspection', input),
    spotifyInspectionStatus: () => ipcRenderer.invoke('music:spotifyInspectionStatus'),
    spotifyCancelInspection: (jobId) => ipcRenderer.invoke('music:spotifyCancelInspection', jobId),
    spotifyDownloadQueue: () => ipcRenderer.invoke('music:spotifyDownloadQueue'),
    spotifyQueueAddEntity: (input) => ipcRenderer.invoke('music:spotifyQueueAddEntity', input),
    spotifyQueueAddPlaylist: (input) => ipcRenderer.invoke('music:spotifyQueueAddPlaylist', input),
    spotifyQueueReorder: (orderedCardIds) =>
      ipcRenderer.invoke('music:spotifyQueueReorder', orderedCardIds),
    spotifyQueueRemoveCard: (cardId) =>
      ipcRenderer.invoke('music:spotifyQueueRemoveCard', cardId),
    spotifyQueueRemoveSelection: (selectionId) =>
      ipcRenderer.invoke('music:spotifyQueueRemoveSelection', selectionId),
    spotifyQueueStart: (input) => ipcRenderer.invoke('music:spotifyQueueStart', input),
    spotifyQueueClearCompleted: () =>
      ipcRenderer.invoke('music:spotifyQueueClearCompleted'),
    spotifySetTrackDownloadOptions: (input) =>
      ipcRenderer.invoke('music:spotifySetTrackDownloadOptions', input),
    spotifyMatchPlaylistItem: (input) =>
      ipcRenderer.invoke('music:spotifyMatchPlaylistItem', input),
    spotifyConfirmDownloadCandidate: (input) =>
      ipcRenderer.invoke('music:spotifyConfirmDownloadCandidate', input),
    spotifyRejectDownloadCandidate: (input) =>
      ipcRenderer.invoke('music:spotifyRejectDownloadCandidate', input),
    spotifyForgetEntitySource: (input) =>
      ipcRenderer.invoke('music:spotifyForgetEntitySource', input),
    spotifyRemoveItem: (itemId) => ipcRenderer.invoke('music:spotifyRemoveItem', itemId),
    spotifyDetect: () => ipcRenderer.invoke('music:spotifyDetect'),
    spotifyPickCookieFile: () => ipcRenderer.invoke('music:spotifyPickCookieFile'),
    spotifyTestYouTubeAccess: (force) =>
      ipcRenderer.invoke('music:spotifyTestYouTubeAccess', force),
    spotifyInstallDeno: () => ipcRenderer.invoke('music:spotifyInstallDeno'),
    playlistsForTrack: (trackId) => ipcRenderer.invoke('music:playlistsForTrack', trackId),
    setLiked: (trackId, liked) => ipcRenderer.invoke('music:setLiked', trackId, liked),
    logPlay: (trackId) => ipcRenderer.invoke('music:logPlay', trackId),
    recent: (limit) => ipcRenderer.invoke('music:recent', limit),
    statsDetail: (days) => ipcRenderer.invoke('music:statsDetail', days),
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
  wrestling: {
    overview: () => ipcRenderer.invoke('wrestling:overview'),
    events: (filter) => ipcRenderer.invoke('wrestling:events', filter),
    event: (id) => ipcRenderer.invoke('wrestling:event', id),
    chronology: (id) => ipcRenderer.invoke('wrestling:chronology', id),
    matchLocation: (matchId) => ipcRenderer.invoke('wrestling:matchLocation', matchId),
    yearCounts: (promotion) => ipcRenderer.invoke('wrestling:yearCounts', promotion),
    allYears: () => ipcRenderer.invoke('wrestling:allYears'),
    wrestler: (id) => ipcRenderer.invoke('wrestling:wrestler', id),
    wrestlerMatches: (id, opts) => ipcRenderer.invoke('wrestling:wrestlerMatches', id, opts),
    searchWrestlers: (query) => ipcRenderer.invoke('wrestling:searchWrestlers', query),
    topRatedMatches: (limit) => ipcRenderer.invoke('wrestling:topRatedMatches', limit),
    favorites: (limit) => ipcRenderer.invoke('wrestling:favorites', limit),
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
    clips: (filter) => ipcRenderer.invoke('wrestling:clips', filter),
    clipsFor: (kind, id) => ipcRenderer.invoke('wrestling:clipsFor', kind, id),
    recentClips: (limit) => ipcRenderer.invoke('wrestling:recentClips', limit),
    saveClip: (input) => ipcRenderer.invoke('wrestling:saveClip', input),
    removeClip: (id) => ipcRenderer.invoke('wrestling:removeClip', id),
    setClipFavorite: (id, favorite) => ipcRenderer.invoke('wrestling:setClipFavorite', id, favorite),
    clipTags: () => ipcRenderer.invoke('wrestling:clipTags'),
    clipTargets: (query) => ipcRenderer.invoke('wrestling:clipTargets', query),
    pickClipFile: () => ipcRenderer.invoke('wrestling:pickClipFile'),
    openClip: (id) => ipcRenderer.invoke('wrestling:openClip', id),
    startImport: (opts) => ipcRenderer.invoke('wrestling:startImport', opts),
    importStatus: () => ipcRenderer.invoke('wrestling:importStatus'),
    cancelImport: () => ipcRenderer.invoke('wrestling:cancelImport')
  },
  football: {
    overview: () => ipcRenderer.invoke('football:overview'),
    competitions: () => ipcRenderer.invoke('football:competitions'),
    competitionLogos: () => ipcRenderer.invoke('football:competitionLogos'),
    competition: (key) => ipcRenderer.invoke('football:competition', key),
    seasons: (key) => ipcRenderer.invoke('football:seasons', key),
    season: (id) => ipcRenderer.invoke('football:season', id),
    teams: (filter) => ipcRenderer.invoke('football:teams', filter),
    team: (id) => ipcRenderer.invoke('football:team', id),
    people: (filter) => ipcRenderer.invoke('football:people', filter),
    person: (id) => ipcRenderer.invoke('football:person', id),
    matches: (filter) => ipcRenderer.invoke('football:matches', filter),
    match: (id) => ipcRenderer.invoke('football:match', id),
    current: (competitionKey, dateFrom, dateTo) =>
      ipcRenderer.invoke('football:current', competitionKey, dateFrom, dateTo),
    search: (query) => ipcRenderer.invoke('football:search', query),
    setFavorite: (kind, entityId, favorite) =>
      ipcRenderer.invoke('football:setFavorite', kind, entityId, favorite),
    saveJournal: (matchId, input) => ipcRenderer.invoke('football:saveJournal', matchId, input),
    media: (filter) => ipcRenderer.invoke('football:media', filter),
    mediaFor: (kind, entityId) => ipcRenderer.invoke('football:mediaFor', kind, entityId),
    saveMedia: (input) => ipcRenderer.invoke('football:saveMedia', input),
    removeMedia: (id) => ipcRenderer.invoke('football:removeMedia', id),
    pickMediaFile: () => ipcRenderer.invoke('football:pickMediaFile'),
    openMedia: (localPath) => ipcRenderer.invoke('football:openMedia', localPath),
    externalLinks: (kind, entityId) =>
      ipcRenderer.invoke('football:externalLinks', kind, entityId),
    saveExternalLink: (input) => ipcRenderer.invoke('football:saveExternalLink', input),
    removeExternalLink: (id) => ipcRenderer.invoke('football:removeExternalLink', id),
    openExternalLink: (provider, url) =>
      ipcRenderer.invoke('football:openExternalLink', provider, url),
    syncOverview: () => ipcRenderer.invoke('football:syncOverview'),
    startSync: (request) => ipcRenderer.invoke('football:startSync', request),
    syncStatus: () => ipcRenderer.invoke('football:syncStatus'),
    pauseSync: () => ipcRenderer.invoke('football:pauseSync'),
    resumeSync: () => ipcRenderer.invoke('football:resumeSync'),
    cancelSync: () => ipcRenderer.invoke('football:cancelSync'),
    resolveConflict: (id, resolution) =>
      ipcRenderer.invoke('football:resolveConflict', id, resolution),
    repairIdentities: () => ipcRenderer.invoke('football:repairIdentities')
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
  storage: {
    paths: () => ipcRenderer.invoke('storage:paths'),
    status: () => ipcRenderer.invoke('storage:status'),
    chooseFolder: (root) => ipcRenderer.invoke('storage:chooseFolder', root),
    move: (root, to) => ipcRenderer.invoke('storage:move', root, to),
    open: (root) => ipcRenderer.invoke('storage:open', root)
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
    install: () => ipcRenderer.invoke('update:install')
  },
  settings: {
    all: () => ipcRenderer.invoke('settings:all'),
    secretStorage: () => ipcRenderer.invoke('settings:secretStorage'),
    set: (key, value) => ipcRenderer.invoke('settings:set', key, value)
  },
  refresh: {
    preview: (req) => ipcRenderer.invoke('refresh:preview', req),
    start: (req) => ipcRenderer.invoke('refresh:start', req),
    status: () => ipcRenderer.invoke('refresh:status'),
    cancel: () => ipcRenderer.invoke('refresh:cancel'),
    retryFailed: () => ipcRenderer.invoke('refresh:retryFailed'),
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
