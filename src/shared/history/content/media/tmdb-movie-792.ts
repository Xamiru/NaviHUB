import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '792', title: 'Platoon', year: 1986 },
  links: [
    { target: 'event:vietnam-war', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
