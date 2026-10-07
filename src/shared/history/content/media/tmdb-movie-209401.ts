import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '209401',
    title: 'Half of a Yellow Sun',
    year: 2013
  },
  links: [
    { target: 'event:nigerian-civil-war', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
