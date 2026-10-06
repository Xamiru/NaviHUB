import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '255387', title: 'Adwa', year: 1999 },
  links: [
    { target: 'event:battle-of-adwa', kind: 'documentary-about' }
  ],
  researched: '2026-10-06'
})
