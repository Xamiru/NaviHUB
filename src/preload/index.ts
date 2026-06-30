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
  themes: {
    import: (mediaId) => ipcRenderer.invoke('themes:import', mediaId)
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
