import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '50797',
    title: 'Burnt by the Sun',
    year: 1994
  },
  links: [
    { target: 'event:great-purge', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
