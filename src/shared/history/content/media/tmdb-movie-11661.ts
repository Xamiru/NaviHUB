import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '11661', title: 'Joyeux Noël', year: 2005 },
  links: [
    { target: 'event:first-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
