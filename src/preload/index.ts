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
    setStatusCounts: (mediaType) => ipcRenderer.invoke('media:statusCounts', mediaType)
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
    upsert: (input) => ipcRenderer.invoke('tags:upsert', input),
    remove: (id) => ipcRenderer.invoke('tags:remove', id)
  },
  search: {
    global: (query) => ipcRenderer.invoke('search:global', query)
  },
  quiz: {
    songPool: (filter) => ipcRenderer.invoke('quiz:songPool', filter)
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
    stats: () => ipcRenderer.invoke('japanese:stats'),
    ensureMiningInbox: () => ipcRenderer.invoke('japanese:ensureMiningInbox'),
    jishoLookup: (term) => ipcRenderer.invoke('japanese:jishoLookup', term),
    tokenize: (text) => ipcRenderer.invoke('japanese:tokenize', text),
    minedFronts: (fronts) => ipcRenderer.invoke('japanese:minedFronts', fronts)
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
