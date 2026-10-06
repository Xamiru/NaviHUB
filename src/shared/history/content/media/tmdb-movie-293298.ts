import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '293298',
    title: 'The Sino-Japanese War at Sea 1894',
    year: 2012
  },
  links: [
    { target: 'event:first-sino-japanese-war', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
