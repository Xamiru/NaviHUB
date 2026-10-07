import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'tv', source: 'tmdb', externalId: '918', title: 'M*A*S*H', year: 1972 },
  links: [
    { target: 'event:korean-war', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
