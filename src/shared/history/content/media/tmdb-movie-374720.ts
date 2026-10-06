import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '374720', title: 'Dunkirk', year: 2017 },
  links: [
    { target: 'event:second-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
