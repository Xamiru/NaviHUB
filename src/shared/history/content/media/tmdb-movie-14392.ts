import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '14392',
    title: 'The Warlords',
    year: 2007
  },
  links: [
    { target: 'event:taiping-rebellion', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
