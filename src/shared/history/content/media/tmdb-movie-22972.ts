import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '22972', title: 'Green Zone', year: 2010 },
  links: [
    { target: 'event:iraq-war', kind: 'set-during' }
  ],
  researched: '2026-10-13'
})
