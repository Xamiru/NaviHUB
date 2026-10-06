import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '11101', title: 'Stalingrad', year: 1993 },
  links: [
    { target: 'event:second-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
