import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '24060', title: 'Darfur Now', year: 2007 },
  links: [
    { target: 'event:war-in-darfur', kind: 'documentary-about' }
  ],
  researched: '2026-10-12'
})
