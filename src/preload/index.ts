import { contextBridge, ipcRenderer } from 'electron'
import type { NaviApi } from '@shared/api'

// Implements the NaviApi surface by forwarding to main over IPC.
const api: NaviApi = {
  media: {
    list: (filter) => ipcRenderer.invoke('media:list', filter),
    get: (id) => ipcRenderer.invoke('media:get', id),
    create: (input) => ipcRenderer.invoke('media:create', input),
    update: (id, input) => ipcRenderer.invoke('media:update', id, input),
    remove: (id) => ipcRenderer.invoke('media:remove', id),
    removeCharacter: (mediaId, characterId) =>
      ipcRenderer.invoke('media:removeCharacter', mediaId, characterId),
    statusCounts: (mediaType) => ipcRenderer.invoke('media:statusCounts', mediaType),
    facets: (mediaType) => ipcRenderer.invoke('media:facets', mediaType),
    timeStats: () => ipcRenderer.invoke('media:timeStats')
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
    cast: (id) => ipcRenderer.invoke('characters:cast', id),
    roles: (id) => ipcRenderer.invoke('characters:roles', id),
    upsert: (input) => ipcRenderer.invoke('characters:upsert', input),
    remove: (id) => ipcRenderer.invoke('characters:remove', id)
  },
  credits: {
    add: (input) => ipcRenderer.invoke('credits:add', input),
    remove: (creditId) => ipcRenderer.invoke('credits:remove', creditId)
  },
  mediaCompanies: {
    add: (input) => ipcRenderer.invoke('mediaCompanies:add', input),
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
    songPool: (filter) => ipcRenderer.invoke('quiz:songPool', filter),
    tournamentPool: (source) => ipcRenderer.invoke('quiz:tournamentPool', source),
    logSession: (input) => ipcRenderer.invoke('quiz:logSession', input),
    history: (kind) => ipcRenderer.invoke('quiz:history', kind)
  },
  hltb: {
    fetch: (mediaId) => ipcRenderer.invoke('hltb:fetch', mediaId)
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
  themes: {
    import: (mediaId) => ipcRenderer.invoke('themes:import', mediaId)
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
    remove: (imageId) => ipcRenderer.invoke('pictures:remove', imageId)
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
    stats: () => ipcRenderer.invoke('japanese:stats'),
    statsDetail: () => ipcRenderer.invoke('japanese:statsDetail'),
    ensureMiningInbox: () => ipcRenderer.invoke('japanese:ensureMiningInbox'),
    tokenize: (text) => ipcRenderer.invoke('japanese:tokenize', text),
    minedFronts: (fronts) => ipcRenderer.invoke('japanese:minedFronts', fronts)
  },
  dict: {
    list: () => ipcRenderer.invoke('dict:list'),
    lookup: (query) => ipcRenderer.invoke('dict:lookup', query),
    kanji: (text) => ipcRenderer.invoke('dict:kanji', text),
    importPreset: (key) => ipcRenderer.invoke('dict:importPreset', key),
    importZip: () => ipcRenderer.invoke('dict:importZip'),
    importStatus: () => ipcRenderer.invoke('dict:importStatus'),
    remove: (id) => ipcRenderer.invoke('dict:remove', id)
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
    ocrPage: (chapterId, pageIndex) => ipcRenderer.invoke('manga:ocrPage', chapterId, pageIndex)
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
  sync: {
    start: (pairing) => ipcRenderer.invoke('sync:start', pairing),
    stop: () => ipcRenderer.invoke('sync:stop'),
    status: () => ipcRenderer.invoke('sync:status'),
    unpair: () => ipcRenderer.invoke('sync:unpair')
  },
  app: {
    openExternal: (url) => ipcRenderer.invoke('app:openExternal', url),
    pickTextFile: () => ipcRenderer.invoke('app:pickTextFile'),
    setUiScale: (scale) => ipcRenderer.invoke('app:setUiScale', scale)
  },
  activity: {
    status: () => ipcRenderer.invoke('activity:status')
  },
  settings: {
    all: () => ipcRenderer.invoke('settings:all'),
    get: (key) => ipcRenderer.invoke('settings:get', key),
    set: (key, value) => ipcRenderer.invoke('settings:set', key, value)
  },
  files: {
    pickImage: () => ipcRenderer.invoke('files:pickImage'),
    resolveUrl: (relPath) => ipcRenderer.invoke('files:resolveUrl', relPath)
  }
}

contextBridge.exposeInMainWorld('api', api)
