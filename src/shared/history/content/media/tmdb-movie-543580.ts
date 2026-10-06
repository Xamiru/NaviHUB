import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '543580',
    title: 'They Shall Not Grow Old',
    year: 2018
  },
  links: [
    { target: 'event:first-world-war', kind: 'documentary-about' }
  ],
  researched: '2026-10-06'
})
