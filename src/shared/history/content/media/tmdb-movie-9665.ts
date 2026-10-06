import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '9665', title: 'Glory', year: 1989 },
  links: [
    { target: 'event:american-civil-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
