import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '403357',
    title: '1898, Our Last Men in the Philippines',
    year: 2016
  },
  links: [
    { target: 'event:philippine-revolution', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
