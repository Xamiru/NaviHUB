import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '403390',
    title: 'Bitter Harvest',
    year: 2017
  },
  links: [
    { target: 'event:soviet-famine-of-1932-1933', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
