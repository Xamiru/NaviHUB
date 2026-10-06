import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'tv', source: 'tmdb', externalId: '751', title: 'The World at War', year: 1973 },
  links: [
    { target: 'event:second-world-war', kind: 'documentary-about' }
  ],
  researched: '2026-10-06'
})
